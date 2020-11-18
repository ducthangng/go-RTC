import React from "react";
import { useSelector } from "react-redux";
import UserTile from "./userTile";
const FriendList = () => {
  let userList = useSelector((state) => {
    console.log(state);
    return state.friends;
  });
  console.log("friend list:", userList);
  console.log("window height", window.innerHeight);
  return (
    <React.Fragment>
      <div
        style={{
          position: "fixed",
          height: `${window.innerHeight}px`,
          overflow: "scroll",
          marginBottom: "200px",
        }}
      >
        {userList.map((user) => (
          <UserTile key={user.name} user={user} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default FriendList;
