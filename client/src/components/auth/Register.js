/* eslint-disable no-duplicate-case */
/* eslint-disable default-case */
import React, { Fragment, useContext, useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import { CSSTransition } from "react-transition-group";

import DispatchContext from "../../DispatchContext";

const Register = () => {
  const appDispatch = useContext(DispatchContext);

  const initialState = {
    name: {
      value: "",
      message: "",
      hasErrors: false,
      checkCount: 0
    },
    email: {
      value: "",
      hasErrors: false,
      message: ""
    },
    password: {
      value: "",
      hasErrors: false,
      message: ""
    },
    submitCount: 0
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "nameImmediately":
        draft.name.value = action.value;
        draft.name.hasErrors = false;
        return;
      case "nameAfterDelay":
        if (!draft.name.value) {
          draft.name.hasErrors = true;
          draft.name.message = "Please provide a name";
        }
        return;
      case "emailImmediately":
        draft.email.hasErrors = false;
        draft.email.value = action.value;
        return;
      case "emailAfterDelay":
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true;
          draft.email.message = "You must provide a valid email address!";
        }
        return;
      case "passwordImmediately":
        draft.password.hasErrors = false;
        draft.password.value = action.value;
        if (!draft.password.value.length) {
          draft.password.hasErrors = true;
          draft.password.message = "Password must be!";
        }
        return;
      case "submitForm":
        if (!draft.password.hasErrors && !draft.email.hasErrors && !draft.name.hasErrors && draft.submitCount++) return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  // useEffect(() => {
  //   if (state.email.value) {
  //     const delay = setTimeout(() => {
  //       dispatch({ type: "emailAfterDelay" });
  //     }, 800);
  //     return () => clearTimeout(delay);
  //   }
  // }, [state.email.value]);

  useEffect(() => {
    if (state.submitCount) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await Axios.post("/users", { name: state.name.value, email: state.email.value, password: state.password.value }, { cancelToken: ourRequest.token });
          console.log(response.data);
        } catch (e) {
          console.error(e.message);
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [state.submitCount]);

  const handleSubmit = async e => {
    e.preventDefault();

    dispatch({ type: "nameImmediately", value: state.name.value });
    dispatch({ type: "nameAfterDelay", value: state.name.value });
    dispatch({ type: "emailImmediately", value: state.email.value });
    dispatch({ type: "emailAfterDelay", value: state.email.value });
    dispatch({ type: "passwordImmediately", value: state.password.value });
    dispatch({ type: "submitForm" });
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="create-profile.html" onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <input type="text" placeholder="Name" name="name" onChange={e => dispatch({ type: "nameImmediately", value: e.target.value })} />
          <CSSTransition in={state.name.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="alert alert-danger small liveValidateMessage">{state.name.message}</div>
          </CSSTransition>
        </div> */}
        <div className="form-group">
          <label htmlFor="username-register" className="text-muted mb-1">
            <small>Username</small>
          </label>
          <input onChange={e => dispatch({ type: "nameImmediately", value: e.target.value })} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
          <CSSTransition in={state.name.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="alert alert-danger small liveValidateMessage">{state.name.message}</div>
          </CSSTransition>
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" onChange={e => dispatch({ type: "emailImmediately", value: e.target.value })} />
          <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
          <CSSTransition in={state.email.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="alert alert-danger small liveValidateMessage">{state.email.message}</div>
          </CSSTransition>
        </div>
        <div className="form-group">
          <label htmlFor="password-register" className="text-muted mb-1">
            <small>Password</small>
          </label>
          <input onChange={e => dispatch({ type: "passwordImmediately", value: e.target.value })} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
          <CSSTransition in={state.password.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="alert alert-danger small liveValidateMessage">{state.password.message}</div>
          </CSSTransition>
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
