import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const Account = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: ""
  });

  const { name, email, password, age } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.patch("/users/me", formData, {
        headers: {
          "x-auth-token": appState.user.token,
          "Content-Type": "application/json"
        }
      });
      appDispatch({ type: "flashMessage", value: "Congrats, You have successfully updated your acount data!" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        <i className="fa fa-cog"></i> Settings
      </h1>
      <form className="form" action="create-profile.html" onSubmit={handleSubmit}>
        <div className="my-group">
          <label htmlFor="password-register" className="text-muted mb-1">
            <small>Name</small>
          </label>
          <input value={name} onChange={e => onChange(e)} id="name-register" name="name" className="form-control" type="name" placeholder="Change username" />
        </div>
        <div className="my-group">
          <label htmlFor="password-register" className="text-muted mb-1">
            <small>Age</small>
          </label>
          <input value={age} onChange={e => onChange(e)} id="name-register" name="age" className="form-control" type="age" placeholder="Change user age" />
        </div>
        <div className="my-group">
          <label htmlFor="password-register" className="text-muted mb-1">
            <small>Email</small>
          </label>
          <input value={email} onChange={e => onChange(e)} id="name-register" name="email" className="form-control" type="name" placeholder="Change email address" />
        </div>
        <div className="my-group">
          <label htmlFor="password-register" className="text-muted mb-1">
            <small>Password</small>
          </label>
          <input value={password} onChange={e => onChange(e)} id="name-register" name="password" className="form-control" type="name" placeholder="Change password" />
        </div>
        <input type="submit" className="btn btn-primary my-1" value="Submit Changes" />
      </form>
      <Link className="btn btn-light my-1" to="/dashboard">
        Back To Dashboard
      </Link>
    </Fragment>
  );
};

export default Account;
