import LoginInteractor from "../../../domain/usecase/loginInteractor";
import BaseAuth from "../authenticator";
import { addUser, call, deleteUser, disconnect } from "./sessionReducer";
import Redux from "redux";
import CallSession from "../WebRTC/peerConn";
export function login(username: string, password: string) {
  return async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    let auth = new BaseAuth("https", "localhost", 3000);
    let login = new LoginInteractor(auth);
    const response = await login.login(username, password);
    if (response === "ok") {
      dispatch(addUser({ username, password }));
    } else {
      return;
    }
  };
}
export function signup() {}

export function callFriend(calleeName: string) {
  return async (
    dispatch: (arg0: { payload: any; type: string }) => void,
    getState: Function
  ) => {
    dispatch(call({ calleeName: calleeName, isCalling: true }));
  };
}

export function hangup() {
  return (dispatch: Redux.Dispatch, getState: () => any) => {
    let state = getState();
    state.callSession.hangup();
    dispatch(disconnect());
  };
}

export function logout() {
  return (dispatch: Redux.Dispatch) => {
    dispatch(deleteUser());
  };
}
