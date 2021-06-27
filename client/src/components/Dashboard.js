/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import { Spinner } from "reactstrap";
import DashboardOptions from "./DashboardOptions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    async function profile() {
      try {
        const response = await Axios.get("/profile/me", {
          headers: {
            "x-auth-token": appState.user.token
          }
        });
        appDispatch({ type: "profile", data: response.data });
        if (!appState.loggedIn) return props.history.push("./login");
      } catch (error) {
        console.log(error.message);
      }
    }
    profile();
  }, []);

  const deleteAccount = async () => {
    if (window.confirm("Are you sure to Delete the account? This can Not be undone!")) {
      try {
        await Axios.delete("/profile", {
          headers: {
            "x-auth-token": appState.user.token
          }
        });
        appDispatch({ type: "noprofile" });
        appDispatch({ type: "logout" });
        props.history.push("/register");
        appDispatch({ type: "flashMessage", value: "Your account has been permanently deleted!" });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <Fragment>
      {appState.profile === null ? (
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
            <div className="my-2">
              <button className="btn btn-danger" onClick={deleteAccount}>
                <i className="fas fa-user-minus"></i>
                Delete Account
              </button>
            </div>
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
            <Experience />
            <Education />
          </Fragment>
          <div className="my-2">
            <button className="btn btn-danger" onClick={deleteAccount}>
              <i className="fas fa-user-minus"></i>
              Delete Account
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default withRouter(Dashboard);
