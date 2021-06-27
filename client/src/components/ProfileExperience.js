import React from "react";
import Moment from "react-moment";

const ProfileExperience = props => {
  const { company, title, location, to, from, description } = props.experience;
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format="MM/DD/YYYY">{from}</Moment> - {!to ? "Now" : <Moment format="MM/DD/YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Location: </strong> {location}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

export default ProfileExperience;
