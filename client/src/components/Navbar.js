import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

export const Navbar = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <a href="index.html">
            <i className="fas fa-code"></i> DevConnector
          </a>
        </h1>
        {appState.loggedIn ? (
          <ul>
            <li>
              <Link onClick={() => appDispatch({ type: "logout" })} to="#!">
                <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">LogOut</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="#!">Developers</Link>
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

export default Navbar;
