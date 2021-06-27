/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import Axios from "axios";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import Spinner from "./Spinner";

const ProfileGithub = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    async function getRepos() {
      try {
        const response = await Axios.get(`/profile/github/${props.username}`);
        appDispatch({ type: "gotrepos", data: response.data });
      } catch (error) {
        console.log(error.message);
      }
    }
    getRepos();
  }, []);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {appState.repos === null
        ? <Spinner /> && <h5>No github repository found...</h5>
        : appState.repos.map((repo, index) => (
            <div key={index} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                  <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                  <li className="badge badge-light">Forks: {repo.forks_count}</li>
                </ul>
              </div>
            </div>
          ))}
    </div>
  );
};

export default ProfileGithub;
