import Auth from "../repositories/authenticate";
import Store from "../repositories/store";
export default class SignUpInteractor {
  auth: Auth;
  constructor(auth: Auth, store: Store) {
    this.auth = auth;
  }
  // validation stage should not be here,since its framework-specific, instead, put it in Form component

  async SignUp(username: string, password: string) {
    try {
      let exist = await this.auth.verifyExistingUser(username);
      if (exist) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return error;
    }
  }
}
