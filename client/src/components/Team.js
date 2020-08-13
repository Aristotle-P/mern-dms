import React from 'react'

const Team = ({ teamName, members }) => {
  return (
    <div className="team-container">
      <ul>
        <li>{teamName}</li>
        {members.map(member =>
          <ul className="team-member" key={member.id}>
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
