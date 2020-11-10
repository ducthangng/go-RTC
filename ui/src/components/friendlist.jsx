import React from "react";
import { useSelector } from "react-redux";
import UserTile from "./userTile";
const FriendList = () => {
  let userList = useSelector((state) => state.friends.friends);
  console.log("list:", userList);
  console.log(window.innerHeight);
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
          <UserTile user={user} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default FriendList;
