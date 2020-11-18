import React, { Component } from "react";
import FriendList from "../components/friendlist";
import NavBar from "../components/navbar";
import StreamWaiter from "../components/StreamWaiter";
class HomePage extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-1">
              <FriendList />
            </div>
            <div className="col center-block ">
              <StreamWaiter />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;