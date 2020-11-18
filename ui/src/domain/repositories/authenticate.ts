// this interface is responsible for
//- verifying if username already exist.
//- check if the credential is correct.
export default interface Authenticator {
  verifyExistingUser(username: string): Promise<Boolean>;
  authenticate(username: string, password: string): Promise<Boolean>;
}
