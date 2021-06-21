import React, { Fragment, useContext, useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import DispatchContext from "../DispatchContext";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [logIn, setLogIn] = useState(false);
  const appDispatch = useContext(DispatchContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/auth", { email, password });
      if (response.data) {
        appDispatch({ type: "login", value: response.data });
        appDispatch({ type: "flashMessage", value: "You have successfully logged in!" });
        setLogIn(true);
        console.log(response.data);
      } else {
        appDispatch({ type: "flashMessage", value: "Incorrect username/password!" });
      }
    } catch (e) {
      console.log("incorrect username/password.");
    }
  }

  if (logIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="create-profile.html" onSubmit={handleSubmit}>
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
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
