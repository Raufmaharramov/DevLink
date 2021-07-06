import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import StateContext from "../StateContext";

const Landing = () => {
  const appState = useContext(StateContext);
  if (appState.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus, fugit. Dignissimos assumenda magni voluptate pariatur quod eius voluptatem repudiandae! Perferendis quis veniam architecto illo totam harum at. Ad, praesentium iusto, odit similique ipsa, consequatur a non laborum dolores eum amet. Sapiente, quis asperiores? Cupiditate earum quidem, quas harum impedit autem accusantium, hic at tempore veniam voluptatibus ex similique commodi eligendi dolor saepe.</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
