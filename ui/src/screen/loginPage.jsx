import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
class LoginPage extends Component {
  formRef = React.createRef();
  state = { username: "", password: "", redirect: false };
  handleSubmit = async (e) => {
    e.preventDefault();
    // validate stuff
    // then send http request
    console.log(this.formRef.current.value);
    const response = await fetch("localhost:4000", {
      redirect: "manual",
      method: "POST",
      body: this.formRef.current.value,
    });
    if (response.status === 200) {
      // store jwt in cache storage
      this.setState({ ...this.state, redirect: true });
    }
  };
  redirect() {
    if (this.state.redirect) {
      return <Redirect to="/home"></Redirect>;
    }
  }
  handleChange = ({ currentTarget }) => {
    console.log(currentTarget);
    let newState = { ...this.state };
    newState[currentTarget.name] = currentTarget.value;
    this.setState(newState);
  };
  render() {
    return (
      <div>
        {this.redirect()}
        <form ref={this.formRef} onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputName">Username</label>
            <input
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
              name="username"
              className="form-control"
              id="inputName"
              aria-describedby="nameHelp"
              placeholder="Enter name"
            />
            <small id="nameHelp" className="form-text text-muted">
              Bro trust me
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
