export default interface PeerConn {
  username: string;
  targetUsername: string;
  invite(targetUser: string): void;
  hangup(): void;
  //all these funcs below only accept dict, not string, as params
  handleICEMsg(candidate: any): void;
  handleOfferMsg(offer: any): void;
  handleAnswerMsg(answer: any): void;
  handleHangupMsg(): void;
}
