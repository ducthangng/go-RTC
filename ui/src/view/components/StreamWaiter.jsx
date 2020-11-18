// the name describe it
// this component wait for a Media Stream, then it will show the video box
import VideoBox from "./videobox";
import React, { useEffect, useState } from "react";
import Async from "react-async";
import { useSelector } from "react-redux";
import CallSession from "../../adapter/repositories/WebRTC/peerConn";
const StreamWaiter = () => {
  let [isCalling, calleeName, userName] = useSelector((state) => {
    return [state.isCalling, state.calleeName, state.userName];
  });
  let localStream = null;
  let [session, getSession] = useState(new CallSession(userName, "localhost"));
  useEffect(() => {
    console.log("session changed", session);
    getSession(session);
  }, [session.localStream, session.remoteStream]);
  console.log("stream waiter", isCalling, calleeName, session);
  if (!isCalling) {
    return <p> Click a user to make a phone call</p>;
  } else {
    localStream = session.invite(calleeName);
    return (
      <Async promise={localStream}>
        <Async.Loading>Loading...</Async.Loading>
        <Async.Fulfilled>
          {(stream) => (
            <React.Fragment>
              <VideoBox stream={session.localStream} />
              <VideoBox stream={session.remoteStream} />
            </React.Fragment>
          )}
        </Async.Fulfilled>
        <Async.Rejected>{(error) => `error:${error}`}</Async.Rejected>
      </Async>
    );
  }
};

export default StreamWaiter;
