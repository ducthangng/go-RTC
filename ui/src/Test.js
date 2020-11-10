import React from "react";
import { render } from "react-dom";
import Scroll from "react-scroll";

var Link = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });

    scrollSpy.update();
  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }
  render() {
    return (
      <div>
        <Link
          activeClass="active"
          to="secondInsideContainer"
          spy={true}
          smooth={true}
          duration={250}
          containerId="containerElement"
          style={{ display: "inline-block", margin: "20px" }}
        >
          Go to second element inside container
        </Link>
        <Element
          name="test7"
          className="element"
          id="containerElement"
          style={{
            position: "relative",
            height: "200px",
            overflow: "scroll",
            marginBottom: "100px",
          }}
        >
          test 7 (duration and container)
          <Element>first element inside container</Element>
          <Element>second element inside container</Element>
          <Element>second element inside container</Element>
          <Element>second element inside container</Element>
          <Element>second element inside container</Element>
          <Element>second element inside container</Element>
          <Element>second element inside container</Element>
          <Element>second element inside container</Element>
          <Element>second element inside container</Element>
          <Element>second element inside container</Element>
          <Element>second element inside container</Element>
        </Element>

        <Element id="same" className="element">
          Two links point to this
        </Element>

        <a onClick={this.scrollToTop}>To the top!</a>
      </div>
    );
  }
}

function Test() {
  return <Section />;
}

export default Test;
