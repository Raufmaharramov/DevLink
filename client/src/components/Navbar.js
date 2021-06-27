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
    props.history.push("/login");
  }

  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <h1>
          {appState.loggedIn ? (
            <Link to="/dashboard">
              <i className="fas fa-code"></i> DevConnector
            </Link>
          ) : (
            <Link to="/">
              <i className="fas fa-code"></i> DevConnector
            </Link>
          )}
        </h1>
        {appState.loggedIn ? (
          <ul>
            <li>
              <Link to="/profiles">Developers</Link>
            </li>
            <li>
              <Link to="/dashboard">
                <i className="fas fa-user" />
                <span className="hide-sm">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link onClick={logout} to="#!">
                <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">LogOut</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/profiles">Developers</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </nav>
    </Fragment>
  );
};

export default withRouter(Navbar);
