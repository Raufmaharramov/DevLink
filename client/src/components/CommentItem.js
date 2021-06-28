import React, { useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const CommentItem = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const deleteComment = async () => {
    try {
      await Axios.delete(`/post/comment/${props.post_id}/${props.comment._id}`, {
        headers: {
          "x-auth-token": appState.user.token
        }
      });
      appDispatch({ type: "nocomment", data: props.comment._id });
      appDispatch({ type: "flashMessage", value: "Post deleted!" });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${props.comment.user}`}>
          <img className="round-img" src={props.comment.avatar} alt="" />
          <h4>{props.comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{props.comment.text}</p>
        <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY">{props.comment.date}</Moment>
        </p>
        {props.comment.user === appState.user.id && (
          <button onClick={deleteComment} type="button" className="btn btn-danger">
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
