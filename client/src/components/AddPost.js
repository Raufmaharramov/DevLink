import React, { useContext, useState } from "react";
import Axios from "axios";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

const AddPost = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [text, setText] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    const headers = {
      headers: {
        "x-auth-token": appState.user.token
      }
    };
    try {
      const response = await Axios.post("/post", { text }, headers);
      appDispatch({ type: "posted", data: response.data });
      setText("");
      appDispatch({ type: "flashMessage", value: "Congrats, You successfully posted!" });
    } catch (err) {
      console.log(err.message);
    }
  };

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

export default AddPost;
