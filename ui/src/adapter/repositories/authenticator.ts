import { resolveModuleName } from "typescript";
import Authenticator from "../../domain/repositories/authenticate";

export default class BaseAuth implements Authenticator {
  scheme: string;
  host: string;
  port: number;
  address: string;
  constructor(scheme: string, host: string, port: number) {
    this.scheme = scheme;
    this.host = host;
    this.port = port;
    this.address = this.scheme + "://" + this.host + ":" + this.port;
  }
  async verifyExistingUser(username: string): Promise<Boolean> {
    let jsonMsg = JSON.stringify({ username: username });
    let response = await fetch(this.address, {
      method: "post",
      body: jsonMsg,
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      // save jwt key
      return true;
    } else {
      return false;
    }
  }
  async authenticate(username: string, password: string): Promise<Boolean> {
    let jsonMsg = JSON.stringify({ username: username, password: password });
    let response = await fetch(this.address, {
      method: "post",
      body: jsonMsg,
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      // save jwt key
      return true;
    } else {
      return false;
    }
  }
}
