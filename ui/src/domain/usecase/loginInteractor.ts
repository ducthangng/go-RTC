import Auth from "../repositories/authenticate";
export default class LoginInteractor {
  auth: Auth;
  constructor(auth: Auth) {
    this.auth = auth;
  }
  async login(username: string, password: string) {
    let valid = await this.auth.authenticate(username, password);
    if (valid) {
      // this.store.storeUser({ username, password });
      return "ok";
    } else {
      return "invalid credentials";
    }
  }
}
