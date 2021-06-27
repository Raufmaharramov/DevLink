import React, { Fragment, useContext, useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/auth", { email, password }, { token: appState.user.token });
      if (response.data) {
        appDispatch({ type: "login", data: response.data });
        appDispatch({ type: "flashMessage", value: "You have successfully logged in!" });
      } else {
        appDispatch({ type: "flashMessage", value: "Incorrect username/password!" });
      }
    } catch (e) {
      console.log("incorrect username/password.");
    }
  }

  if (appState.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" action="create-profile.html" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" onChange={e => setEmail(e.target.value)} />
          <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
        </div>
        <div className="form-group">
          <label htmlFor="password-register" className="text-muted mb-1">
            <small>Password</small>
          </label>
          <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
        </div>
        <input type="submit" className="btn btn-primary" value="Sign In" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
