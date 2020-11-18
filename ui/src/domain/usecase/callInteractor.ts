import PeerConn from "../repositories/peerConn";

export default class CallInteractor {
  session!: PeerConn;
  constructor(session: PeerConn) {
    this.session = session;
  }

  call(targetUser: string) {
    this.session.invite(targetUser);
  }
  hangup() {
    this.session.hangup();
  }
}
