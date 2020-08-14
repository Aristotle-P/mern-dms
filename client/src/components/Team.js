import React, { useState, useEffect } from 'react'
import TeamModal from '../components/TeamModal';

import axios from 'axios';

const Team = ({ teamName, teamId, members, handleTeamModalDisplay, showTeamModal }) => {
  const [teamMembers, setTeamMembers] = useState(members);

  useEffect(() => {
    setTeamMembers(members);
  }, []);

  const handleMemberClick = e => {
    e.preventDefault();

    const newMembers = teamMembers.filter(member => member.id !== e.target.id);
    console.log(newMembers);
    axios.put(`http://localhost:5000/team/${teamId}`, {
      members: newMembers
    })
    setTeamMembers(newMembers);
  }

  const handleTeamClick = e => {
    e.preventDefault();
    handleTeamModalDisplay();
  }
  return (
    <div className="team-container">
      <ul>
        <button onClick={handleTeamClick} id={teamId}>Add Team Member</button>
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
      <TeamModal handleModalDisplay={handleTeamModalDisplay} showModal={showTeamModal} teamId={teamId} members={teamMembers} />
    </div>
  )
}

export default Team
