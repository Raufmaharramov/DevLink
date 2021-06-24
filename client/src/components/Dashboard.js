import React, { Fragment, useContext, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { useImmer } from "use-immer";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import { Spinner } from "reactstrap";
import DashboardOptions from "./DashboardOptions";

const Dashboard = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [state, setState] = useImmer({
    profiles: []
  });

  useEffect(() => {
    async function profile() {
      try {
        const response = await Axios.get("/profile/me", {
          headers: {
            "x-auth-token": appState.user.token
          }
        });
        // console.log(response.data);
        appDispatch({ type: "profile", data: response.data });
      } catch (error) {
        console.log(error.message);
      }
    }
    profile();
  }, []);

  return appState.profile === null ? (
    <Spinner /> && (
      <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {appState.user.username}
        </p>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-primary my-1">
          Create Profile
        </Link>
      </Fragment>
    )
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {appState.user.username}
      </p>
      <Fragment>
        <DashboardOptions />
      </Fragment>
    </Fragment>
  );
};

export default withRouter(Dashboard);
