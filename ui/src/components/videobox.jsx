import React, { Component } from "react";
import { connect } from "react-redux";

class VideoBox extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => this.handleVideo(stream))
      .catch((error) => this.handleError(error));
  }
  handleVideo(stream) {
    console.log(stream);
    this.videoRef.current.srcObject = stream;
  }
  handleError(error) {}
  initiateCallSession = (calleeName) => {};
  render() {
    let callee = this.props.callSession.calleeName;
    if (callee === "") {
      return <p> Tap on a user to start a video call</p>;
    }
    this.initiateCallSession(callee);
    return <video ref={this.videoRef} autoPlay={true}></video>;
  }
}
const mapStatetoProps = (state) => ({ session: state.callSession });
const mapDispatchtoProps = () => {};
export default connect(mapStatetoProps)(VideoBox);
