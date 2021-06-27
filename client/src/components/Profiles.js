/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect } from "react";
import Axios from "axios";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const Profiles = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    async function getProfiles() {
      try {
        const response = await Axios.get("/profile");
        appDispatch({ type: "profiles", data: response.data });
        appDispatch({ type: "notloading" });
      } catch (error) {
        console.log(error.message);
      }
    }
    getProfiles();
  }, []);

  return (
    <Fragment>
      {appState.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="larger text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>Browse and connect with developers
          </p>
          <div className="profiles">
            {appState.profiles.length > 0 ? (
              appState.profiles.map((profile, indexs) => (
                <div key={indexs} className="profile bg-light">
                  <img src={profile.user.avatar} alt="" className="round-img" />
                  <div>
                    <h2>{profile.user.name}</h2>
                    <p>
                      {profile.status} {profile.company && <span>at {profile.company}</span>}
                    </p>
                    <p className="my-1">{profile.location && <span>{profile.location}</span>}</p>
                    <Link to={`/profile/${profile.user._id}`} className="btn btn-primaty">
                      View Profile
                    </Link>
                  </div>
                  <ul>
                    {profile.skills.slice(0, 4).map((skill, index) => {
                      return (
                        <li key={index} className="text-primary">
                          <i className="fas fa-check" /> {skill}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            ) : (
              <h4>No Profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
