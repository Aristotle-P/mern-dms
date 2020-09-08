import React, { useState, useEffect, useRef } from 'react';
import Team from '../components/Team';
import Modal from '../components/Modal';
import Error from '../components/Error';

import axios from 'axios';

const Teams = () => {
  const [teams, setTeams] = useState();
  const [input, setInput] = useState({ memberName: '', teamName: '' });
  const [showError, setShowError] = useState(false);
  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  const closeModal = () => {
    modalRef.current.closeModal();
  };

  const updateTeams = (newTeam) => {
    const updatedTeams = JSON.parse(JSON.stringify(teams));
    updatedTeams.forEach((team) => {
      if (team.teamName === newTeam.teamName) {
        team.members = newTeam.members;
      }
    });
    setTeams(updatedTeams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedTeamArray = teams.filter(
      (team) => team.teamName === input.teamName
    );
    if (selectedTeamArray[0] === undefined) {
      closeModal();
      return setShowError(true);
    }
    const selectedTeam = selectedTeamArray[0];
    const { data } = await axios.get(
      `http://localhost:5000/user/${input.memberName}`
    );
    if (typeof data._id !== 'string') {
      return closeModal();
    }
    const newMember = {
      id: data._id,
      name: data.name,
      email: data.email,
      onlineSales: data.onlineSales,
    };

    const newTeams = JSON.parse(JSON.stringify(teams));
    console.log(newTeams);
    newTeams.forEach(async (team) => {
      if (team.teamName === selectedTeam.teamName) {
        team.members.push(newMember);
        await axios.put(`http://localhost:5000/team/${selectedTeam._id}`, {
          members: team.members,
        });
      }
      return team;
    });
    setTeams(newTeams);
    closeModal();
  };

  let markup;
  const createMarkup = () => {
    if (teams) {
      markup = teams.map((team) => (
        <Team
          key={team._id}
          teamName={team.teamName}
          teamId={team._id}
          members={team.members}
          updateTeams={updateTeams}
        />
      ));
    }
    return markup;
  };

  useEffect(() => {
    const getTeams = async () => {
      const res = await axios.get('http://localhost:5000/team');
      setTeams(res.data);
    };
    getTeams();
  }, []);

  useEffect(() => {
    createMarkup();
  }, [teams]);

  return (
    <div>
      <h1>Teams</h1>
      {showError ? <Error error={'Team does not exist'} /> : null}
      <button onClick={openModal}>Add Member</button>
      <Modal ref={modalRef}>
        <h1>Hello World</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Member Name</label>
            <input
              type='text'
              name='name'
              id=''
              onChange={(e) =>
                setInput({ ...input, memberName: e.target.value })
              }
            />
            <label htmlFor='team'>Team Name</label>
            <input
              type='text'
              name='team'
              id=''
              onChange={(e) => setInput({ ...input, teamName: e.target.value })}
            />
            <input type='submit' value='Add Member' />
          </form>
        </div>
      </Modal>
      {createMarkup()}
    </div>
  );
};

export default Teams;
