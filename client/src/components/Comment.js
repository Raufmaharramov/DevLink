import React, { useContext, useState } from "react";
import Axios from "axios";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const Comment = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [text, setText] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post(
        `/post/comment/${props.id}`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": appState.user.token
          }
        }
      );
      appDispatch({ type: "comment", data: response.data });
      setText("");
      appDispatch({ type: "flashMessage", value: "Congrats, You successfully added your comment!" });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea value={text} name="text" onChange={e => setText(e.target.value)} ecols="30" rows="5" placeholder="Create a post" required></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default Comment;
