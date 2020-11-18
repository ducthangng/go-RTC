export default interface SignallingConn {
  host: string;
  port: number;
  scheme: string;
  open(): void;
  sendToServer(obj: any): void;
  shutdown(): void;
}
