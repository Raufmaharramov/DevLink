/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

export const Navbar = props => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  function logout() {
    appDispatch({ type: "logout" });
    appDispatch({ type: "profile", data: null });
    props.history.push("/");
  }

  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark py-4 bg-dark">
        <div className="container unique">
          {appState.loggedIn ? (
            <Fragment>
              <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link className="navbar-brand text-white navbrand" to="/dashboard">
                <i className="fas fa-code"></i> DevConnector
              </Link>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item px-2">
                    <Link className="nav-link text-white" to="/profiles">
                      Developers
                    </Link>
                  </li>
                  <li className="nav-item px-2">
                    <Link className="nav-link text-white " to="/posts">
                      Posts
                    </Link>
                  </li>
                  <li className="nav-item px-2">
                    <Link className="nav-link text-white" to="/dashboard">
                      <i className="fas fa-user" /> <span className="hide-sm">Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item dropdown mr-3">
                    <a href="#" className="nav-link text-white dropdown-toggle" data-toggle="dropdown">
                      {!appState.user.avatar ? <img className="small-header-avatar" src="../img/avatar.png" /> : <img className="small-header-avatar" src={appState.user.avatar} />} {appState.user.username}
                    </a>
                    <div className="dropdown-menu text-white bg-dark">
                      <Link to="/account" className="dropdown-item text-light">
                        <i className="fas fa-user-circle"></i> Account
                      </Link>
                      <a href="#!" onClick={logout} className="dropdown-item text-light">
                        <i className="fas fa-sign-out-alt"></i> Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link className="navbar-brand text-white navbrand" to="/">
                <i className="fas fa-code"></i> DevConnector
              </Link>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item px-2">
                    <Link className="nav-link text-light" to="/profiles">
                      Developers
                    </Link>
                  </li>
                  <li className="nav-item px-2">
                    <Link className="nav-link text-light" to="/register">
                      <i className="fas fa-user"></i> Sign Up
                    </Link>
                  </li>
                  <li className="nav-item px-2">
                    <Link className="nav-link text-light" to="/login">
                      <i className="fas fa-user"></i> Sign In
                    </Link>
                  </li>
                </ul>
              </div>
            </Fragment>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default withRouter(Navbar);
