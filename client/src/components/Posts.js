/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect } from "react";
import Axios from "axios";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import PostItem from "./PostItem";
import { withRouter } from "react-router";
import Spinner from "./Spinner";

const Posts = props => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  useEffect(() => {
    async function fetchPosts() {
      const response = await Axios.get("/post", {
        headers: {
          "x-auth-token": appState.user.token
        }
      });
      appDispatch({ type: "posts", data: response.data });
      appDispatch({ type: "notloading" });
    }
    fetchPosts();
  }, []);

  return appState.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <div className="posts">
        {appState.posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

export default withRouter(Posts);
