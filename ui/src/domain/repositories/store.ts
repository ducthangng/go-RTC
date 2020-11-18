import User from "../entities/user";
export default interface Store {
  storeUser(user: User): void;
  deleteUser(): void;
}
