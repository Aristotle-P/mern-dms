import React, { useState, useEffect } from 'react'
import Team from '../components/Team';

import axios from 'axios';

const Teams = () => {
  const [teams, setTeams] = useState();

  useEffect(() => {
    const getTeams = async () => {
      const res = await axios.get('http://localhost:5000/team');
      setTeams(res.data);
    }
    getTeams();
  }, []);
  let markup;
  if (teams) {
    markup = teams.map((team) =>
      <Team key={team._id} teamName={team.teamName} members={team.members} />
    )
  }
  return (
    <div>
      <h1>Teams</h1>
      {markup}
    </div>
  )
}

export default Teams
