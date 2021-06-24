import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

/*
     company: !appState.profile.company ? "" : appState.profile.company,
      website: !appState.profile.website ? "" : appState.profile.website,
      location: !appState.profile.location ? "" : appState.profile.location,
      status: !appState.profile.status ? "" : appState.profile.status,
      skills: !appState.profile.skills ? "" : appState.profile.skills.join(","),
      githubusername: !appState.profile.githubusername ? "" : appState.profile.githubusername,
      bio: !appState.profile.bio ? "" : appState.profile.bio,
      twitter: !appState.profile.twitter ? "" : appState.profile.twitter,
      facebook: !appState.profile.facebook ? "" : appState.profile.facebook,
      linkedin: !appState.profile.linkedin ? "" : appState.profile.linkedin,
      youtube: !appState.profile.youtube ? "" : appState.profile.youtube,
      instagram: !appState.profile.instagram ? "" : appState.profile.instagram
*/
