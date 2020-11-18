import PeerConn from "../../../domain/repositories/peerConn";
import SocketConn from "./wsSignalling";

export default class CallSession implements PeerConn {
  mediaConstraints: MediaStreamConstraints = { video: true };
  peerConn!: RTCPeerConnection;
  signalConn!: SocketConn;
  username: string;
  targetUsername!: string;
  hostname: string;
  private _localStream!: MediaStream;
  private _remoteStream!: MediaStream;
  get localStream(): MediaStream {
    return this._localStream;
  }
  get remoteStream(): MediaStream {
    return this._remoteStream;
  }
  constructor(username: string, host: string) {
    this.username = username;
    this.hostname = host;
    this.signalConn = new SocketConn(host, 3000, "wss", this);
  }

  invite = async (targetUser: string) => {
    this.targetUsername = targetUser;
    this.createPeerConnection();
    console.log(this.peerConn);

    let webcamStream = await navigator.mediaDevices.getUserMedia(
      this.mediaConstraints
    );
    webcamStream.getTracks().forEach((track) => {
      this.peerConn.addTrack(track, webcamStream);
    });
    this._localStream = webcamStream;
    return webcamStream;
  };
  hangup = () => {
    this.closeVideoCall();
    this.signalConn.sendToServer({
      type: "hang-up",
      target: this.targetUsername,
      user: "ds",
    });
    this.targetUsername = "";
  };
  handleICEMsg = (candidate: any) => {
    candidate = new RTCIceCandidate(candidate);
    this.peerConn.addIceCandidate(candidate);
  };
  handleHangupMsg = () => {
    this.closeVideoCall();
  };
  createPeerConnection = () => {
    this.peerConn = new RTCPeerConnection({
      iceServers: [
        {
          urls: "turn://" + this.hostname,
          username: "default",
          credential: "default",
        },
      ],
    });
    this.peerConn.onicecandidate = this.handleICECandidateEvent;
    this.peerConn.ontrack = this.handleTrackEvent;
    this.peerConn.onnegotiationneeded = this.handleNegotiationNeededEvent;
  };

  //this is what happen when user accept the call
  handleOfferMsg = async (offer: RTCSessionDescriptionInit) => {
    this.createPeerConnection();
    let peerConn = this.peerConn;
    let webcamStream = await navigator.mediaDevices.getUserMedia(
      this.mediaConstraints
    );
    try {
      webcamStream.getTracks().forEach((track) => {
        peerConn.addTrack(track, webcamStream);
      });
    } catch (error) {}
    await peerConn.setRemoteDescription(offer);
    let answer = await peerConn.createAnswer();
    await peerConn.setLocalDescription(answer);
    this.signalConn.sendToServer({
      type: "answer",
      answer: answer,
      target: this.targetUsername,
    });
  };

  closeVideoCall = () => {
    let peerConn = this.peerConn;
    peerConn.ontrack = null;
    peerConn.onicecandidate = null;
    peerConn.onnegotiationneeded = null;
    // close local video src
    peerConn.close();
  };

  handleAnswerMsg = async (answer: RTCSessionDescriptionInit) => {
    await this.peerConn.setRemoteDescription(answer);
  };

  // fyi this is not a http request
  // this socket only accept JSON

  //this is called when our browser found an ICE candidate for us to send to the other end.
  handleICECandidateEvent = (ev: { candidate: any }) => {
    let candidate = ev.candidate;
    this.signalConn.sendToServer({
      type: "new-ice-candidate",
      target: this.targetUsername,
      candidate: candidate,
    });
  };
  // Called by the WebRTC layer to let us know when it's time to
  // begin, resume, or restart ICE negotiation.
  handleNegotiationNeededEvent = async () => {
    console.log(this.peerConn);
    let peerConn = this.peerConn;
    console.log("negotiation needed");
    const offer = await peerConn.createOffer();
    console.log("Check signalling");
    console.log(peerConn.signalingState);
    if (peerConn.signalingState !== "stable") {
      console.log("unstable connection ");
      return;
    }

    peerConn.setLocalDescription(offer);
    this.signalConn.sendToServer({
      id: "offer",
      target: this.targetUsername,
      offer: offer,
    });
    console.log("ok");
  };

  // this is called when the other side change their stream configuration
  // e.g: adding or removing a stream
  handleTrackEvent = (ev: RTCTrackEvent) => {
    let receivedStream = ev.streams[0];
    this._remoteStream = receivedStream;
    // assign stream to components
  };
}
