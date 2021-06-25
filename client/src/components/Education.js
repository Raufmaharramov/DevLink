import React, { Fragment, useContext } from "react";
import Moment from "react-moment";
import Axios from "axios";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const Education = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const handleClick = async id => {
    try {
      const response = await Axios.delete(`/profile/education/${id}`, {
        headers: {
          "x-auth-token": appState.user.token
        }
      });
      appDispatch({ type: "profile", data: response.data });
      appDispatch({ type: "flashMessage", value: "Education Program has been deleted!" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const education = appState.profile.education.map(edu => {
    return (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to === null ? "Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
        </td>
        <td>
          <button onClick={() => handleClick(edu._id)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{education}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
