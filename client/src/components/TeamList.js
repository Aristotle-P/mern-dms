import React from 'react';

const TeamList = ({ team, updateTeamInput }) => {
  if (team) {
    return (
      <li>
        <button onClick={updateTeamInput} value={team.teamName}>
          {team.teamName}
        </button>
      </li>
    );
  } else {
    return null;
  }
};

export default TeamList;
