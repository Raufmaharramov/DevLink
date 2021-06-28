import React, { useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const PostItem = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const { _id, name, text, avatar, user, likes, comments, date } = props.post;

  const addLike = async id => {
    try {
      const response = await Axios.put(`/post/like/${id}`, props.post, {
        headers: {
          "x-auth-token": appState.user.token
        }
      });
      appDispatch({ type: "like", data: { id, likes: response.data } });
    } catch (err) {
      console.log(err.message);
    }
  };

  const unLike = async id => {
    try {
      const response = await Axios.put(`/post/unlike/${id}`, props.post, {
        headers: {
          "x-auth-token": appState.user.token
        }
      });
      appDispatch({ type: "like", data: { id, likes: response.data } });
    } catch (err) {
      console.log(err.message);
    }
  };

  const deletePost = async id => {
    try {
      await Axios.delete(`/post/${id}`, {
        headers: {
          "x-auth-token": appState.user.token
        }
      });
      appDispatch({ type: "postDeleted", data: id });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>
        <button type="button" className="btn btn-light" onClick={() => addLike(_id)}>
          <i className="fas fa-thumbs-up"></i>
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button onClick={() => unLike(_id)} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion <span>{comments.length > 0 && <span className="comment-count">{comments.length}</span>}</span>
        </Link>
        {appState.user.id === user && (
          <button onClick={e => deletePost(_id)} type="button" className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
