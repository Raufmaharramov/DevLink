import React, { Fragment, useContext } from "react";
import Moment from "react-moment";
import Axios from "axios";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const Experience = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const handleClick = async id => {
    try {
      const response = await Axios.delete(`/profile/${id}`, {
        headers: {
          "x-auth-token": appState.user.token
        }
      });
      appDispatch({ type: "profile", data: response.data });
      appDispatch({ type: "flashMessage", value: "Experience has been deleted!" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const experience = appState.profile.experience.map(exp => {
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> {exp.to === null ? "Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </td>
        <td>
          <button onClick={() => handleClick(exp._id)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experience}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
