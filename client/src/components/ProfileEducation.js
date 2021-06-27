import React from "react";
import Moment from "react-moment";

const ProfileEducation = props => {
  const { school, degree, fieldofstudy, to, from, description } = props.education;
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="MM/DD/YYYY">{from}</Moment> - {!to ? "Now" : <Moment format="MM/DD/YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field OF Study: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

export default ProfileEducation;
