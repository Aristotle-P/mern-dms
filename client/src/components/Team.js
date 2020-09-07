import React, { useState } from 'react'

import axios from 'axios';

const Team = ({ teamName, teamId, members, updateTeams }) => {
  const [teamMembers, setTeamMembers] = useState(members);

  const handleMemberClick = e => {
    e.preventDefault();

    const newMembers = teamMembers.filter(member => member.id !== e.target.id);
    console.log(newMembers);
    axios.put(`http://localhost:5000/team/${teamId}`, {
      members: newMembers
    })
    // setTeamMembers(newMembers);
    const newTeam = {
      teamId,
      teamName,
      members: [newMembers]
    }
    updateTeams(newTeam);
  }

  return (
    <div className="team-container">
      <ul>
        <li>{teamName}</li>
        {teamMembers.map(member =>
          <ul className="team-member" key={member.id}>
            <button onClick={handleMemberClick} id={member.id}>Remove Member</button>
            <li>{member.name}</li>
            <li>{member.email}</li>
            <li>{member.onlineSales ? "Online Sale Member" : "Floor Sale Member"}</li>
          </ul>
        )}
      </ul>
    </div>
  )
}

export default Team
