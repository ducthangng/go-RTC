import React from "react";
const UserTile = ({ user }) => {
  return (
    <div className="row">
      <p1 className="col">{user.name}</p1>
      <hr></hr>
    </div>
  );
};

export default UserTile;
