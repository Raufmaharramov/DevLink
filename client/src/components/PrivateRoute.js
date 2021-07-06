import React, { useContext } from "react";
import StateContext from "../StateContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const appState = useContext(StateContext);

  return <Route {...rest} render={props => (!appState.loggedIn ? <Redirect to="/login" /> : <Component {...props} />)} />;
};

export default PrivateRoute;
