/* eslint-disable react-hooks/exhaustive-deps */
import Axios from "axios";
import React, { Fragment, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import ProfileData from "./ProfileData";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import Spinner from "./Spinner";

const Profile = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const id = useParams().user_id;
  useEffect(() => {
    async function getProfileByID() {
      try {
        const response = await Axios.get(`/profile/${id}`);
        appDispatch({ type: "profile", data: response.data });
        appDispatch({ type: "notloading" });
      } catch (error) {
        console.log(error.message);
      }
    }
    getProfileByID();
  }, []);

  return (
    <Fragment>
      {appState.profile === null || appState.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Developers
          </Link>
          {appState.loggedIn && appState.loading === false && appState.user.id === appState.profile.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileData />
            <ProfileAbout />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {appState.profile.experience.length > 0 ? (
                <Fragment>
                  {appState.profile.experience.map(experience => (
                    <ProfileExperience key={experience._id} experience={experience} />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {appState.profile.education.length > 0 ? (
                <Fragment>
                  {appState.profile.education.map(education => (
                    <ProfileEducation key={education._id} education={education} />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            {appState.profile.githubusername && <ProfileGithub username={appState.profile.githubusername} />}
          </div>
        </Fragment>
      )}{" "}
    </Fragment>
  );
};

export default Profile;
