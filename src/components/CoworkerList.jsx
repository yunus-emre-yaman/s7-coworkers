import React from "react";

const CoworkerList = ({ members }) => {
  return (
    <div>
      {members.map((member, index) => (
        <div key={index} className="p-2 mb-2 border rounded">
          <h5>{member.fullName}</h5>
          <p>{member.email}</p>
          {member.notes && <small>{member.notes}</small>}
        </div>
      ))}
    </div>
  );
};

export default CoworkerList;
