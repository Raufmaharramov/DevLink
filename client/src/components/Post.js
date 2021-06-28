/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect } from "react";
import Axios from "axios";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import Spinner from "./Spinner";
import Comment from "./Comment";
import CommentItem from "./CommentItem";

const Post = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const id = useParams().id;

  useEffect(() => {
    async function getPost() {
      try {
        const response = await Axios.get(`/post/${id}`, { headers: { "x-auth-token": appState.user.token } });
        appDispatch({ type: "post", data: response.data });
        appDispatch({ type: "nocomment" });
      } catch (error) {
        console.log(error.message);
      }
    }
    getPost();
  }, []);

  return appState.post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts">Back To Posts</Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${appState.post.user}`}>
            <img className="round-img" src={appState.post.avatar} alt="" />
            <h4>{appState.post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{appState.post.text}</p>
          <p className="post-date">
            Posted on <Moment format="MM/DD/YYYY">{appState.post.date}</Moment>
          </p>
        </div>
      </div>
      <Comment id={id} />
      <div className="comments">
        {appState.post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} post_id={id} />
        ))}
      </div>
    </Fragment>
  );
};

export default Post;
