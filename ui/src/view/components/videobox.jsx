import React, { Component } from "react";

// represent a box that contain mediastream
// accept stream as argument
class VideoBox extends Component {
  constructor(props) {
    console.log("videobox props", props);
    super(props);
    this.videoRef = React.createRef();
  }
  stream = this.props.stream;
  connectToMedia(stream) {
    this.videoRef.current.srcObject = stream;
  }
  componentDidMount() {
    this.connectToMedia(this.stream);
  }
  disconnect() {
    this.videoRef.current.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
    this.videoRef.current.srcObject = null;
  }
  componentWillUnmount() {
    this.disconnect();
  }
  render() {
    return <video ref={this.videoRef} autoPlay={true}></video>;
  }
}

export default VideoBox;
