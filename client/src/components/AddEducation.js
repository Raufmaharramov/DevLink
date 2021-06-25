import React, { Fragment, useContext, useState } from "react";
import Axios from "axios";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const AddEducation = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [data, setData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const { school, degree, fieldofstudy, from, to, current, description } = data;

  const [dateDisable, setDateDisable] = useState(false);

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await Axios.patch("/profile/education", data, {
        headers: {
          "x-auth-token": appState.user.token
        }
      });
      appDispatch({ type: "profile", data: response.data });
      appDispatch({ type: "flashMessage", value: "Congrats, You have successfully added your education!" });
      props.history.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any education program that you have participated in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="* School Program" name="school" value={school} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={e => {
                setData({ ...data, current: !current });
                setDateDisable(!dateDisable);
              }}
            />{" "}
            Current Education
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={dateDisable ? "disabled" : ""} />
        </div>
        <div className="form-group">
          <textarea name="description" cols="30" rows="5" placeholder="Program Description" value={description} onChange={e => onChange(e)}></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default withRouter(AddEducation);
