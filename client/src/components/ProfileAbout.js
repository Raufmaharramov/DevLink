import React, { Fragment, useContext } from "react";
import StateContext from "../StateContext";

const ProfileAbout = () => {
  const appState = useContext(StateContext);
  const { bio, skills } = appState.profile;

  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 className="text-primary">{appState.profile.user.name.trim().split(",")[0]}'s Bio</h2>
          <p>{bio}</p>
          <div className="line" />
        </Fragment>
      )}
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fas fa-check" />
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
