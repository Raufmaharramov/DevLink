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
      <nav className="navbar navbar-expand-md navbar-light bg-dark">
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
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/profiles">Developers</Link>
              </li>
              <li className="nav-item">
                <Link to="/posts">Posts</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard">
                  <i className="fas fa-user" /> <span className="hide-sm">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <img className="small-header-avatar" src={appState.user.avatar} alt="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" />
                <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
                  <Link className="dropdown-item" to="/account">
                    Account
                  </Link>
                  <Link onClick={logout} to="#!">
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">LogOut</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
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
