import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { callFriend } from "../../adapter/repositories/reduxStore/Action";
const UserTile = ({ user }) => {
  const dispatch = useDispatch();
  let calleeName = useSelector((state) => state.calleeName);
  const handleUserCall = (ev) => {
    if (calleeName === "") {
      dispatch(callFriend(user.name));
      console.log(`calling ${user.name}`);
    } else {
      alert("already in a call");
    }
  };
  return (
    <div className="row" onClick={handleUserCall}>
      <p className="col">{user.name}</p>
      <hr></hr>
    </div>
  );
};

export default UserTile;
