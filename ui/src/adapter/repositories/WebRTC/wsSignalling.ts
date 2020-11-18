import SignallingConn from "../../../domain/repositories/signallingMethod";
import PeerConn from "../../../domain/repositories/peerConn";
export default class SocketConn implements SignallingConn {
  host: string;
  port: number;
  scheme: string;

  peerConn: PeerConn;
  conn!: WebSocket;
  constructor(host: string, port: number, scheme: string, rtcConn: PeerConn) {
    this.host = host;
    this.port = port;
    this.scheme = scheme;
    this.peerConn = rtcConn;
    this.open();
  }
  open = () => {
    this.conn = new WebSocket(
      this.scheme + "://" + this.host + ":" + `${this.port}`,
      "json"
    );
    this.conn.onmessage = (ev) => {
      let msg = JSON.parse(ev.data);
      switch (msg.type) {
        case "new-ice-candidate":
          this.peerConn.handleICEMsg(msg.candidate);
          break;
        case "offer":
          this.peerConn.handleOfferMsg(msg.offer);
          break;
        case "answer":
          this.peerConn.handleAnswerMsg(msg.answer);
          break;
        case "hang-up":
          this.peerConn.handleHangupMsg();
          break;
        default:
          console.log(msg);
          break;
      }
    };
  };
  sendToServer = (obj: any) => {
    let str = JSON.stringify(obj);
    this.conn.send(str);
  };
  shutdown = () => {
    this.conn.close(200, "user request to shutdown");
  };
}
