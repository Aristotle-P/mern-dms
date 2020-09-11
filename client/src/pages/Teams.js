import React, { useState, useContext, useEffect, useRef } from 'react';
import Team from '../components/Team';
import Modal from '../components/Modal';
import Error from '../components/Error';
import UserContext from '../components/UserContext';
import MemberList from '../components/MemberList';
import TeamList from '../components/TeamList';

import axios from 'axios';

const Teams = () => {
  const { user } = useContext(UserContext);
  const [userList, setUserList] = useState();
  const [teamList, setTeamList] = useState();
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teams, setTeams] = useState();
  const [input, setInput] = useState({ memberName: '', teamName: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef();

  const openModal = () => {
    setSelectedUser('');
    setSelectedTeam('');
    setInput({ memberName: '', teamName: '' });
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
    // Check if person exists in a team
    let duplicate = false;
    teams.forEach((team) => {
      team.members.forEach((member) => {
        if (member.name === input.memberName) {
          duplicate = true;
        }
      });
    });

    if (duplicate === true) {
      setErrorMessage('Member already exists in a team');
      setShowError(true);
      setUserList(null);
      setTeamList(null);
      return closeModal();
    }

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
    setUserList(null);
    setTeamList(null);
    closeModal();
  };

  const createMarkup = () => {
    let markup;
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

  // Create member dropdown

  const updateInput = (e) => {
    e.preventDefault();
    setInput({ ...input, memberName: e.target.value });
    setSelectedUser(e.target.value);
  };

  const createUserList = () => {
    let newUserList;
    if (userList) {
      newUserList = userList.map((user) => (
        <MemberList updateInput={updateInput} user={user} key={user._id} />
      ));
    }
    return newUserList;
  };

  const getUsersWithRegex = async () => {
    const usersRes = await axios.get(
      `http://localhost:5000/user/regex/${input.memberName}`
    );
    setUserList(usersRes.data);
  };

  // Create Team Dropdown

  const updateTeamInput = (e) => {
    e.preventDefault();
    setInput({ ...input, teamName: e.target.value });
    setSelectedTeam(e.target.value);
  };

  const createTeamList = () => {
    let newTeamList;
    if (teamList) {
      newTeamList = teamList.map((team) => (
        <TeamList
          updateTeamInput={updateTeamInput}
          team={team}
          key={team._id}
        />
      ));
    }
    return newTeamList;
  };

  const getTeamsWithRegex = async () => {
    const teamsRes = await axios.get(
      `http://localhost:5000/team/regex/${input.teamName}`
    );
    setTeamList(teamsRes.data);
  };

  useEffect(() => {
    const getTeams = async () => {
      const res = await axios.get('http://localhost:5000/team');
      setTeams(res.data);
    };
    getTeams();
    setLoading(false);
  }, []);

  useEffect(() => {
    getUsersWithRegex();
  }, [input.memberName]);

  useEffect(() => {
    getTeamsWithRegex();
  }, [input.teamName]);

  useEffect(() => {
    createMarkup();
  }, [teams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Teams</h1>
      {showError ? <Error error={errorMessage} /> : null}
      <button onClick={openModal}>Add Member</button>
      <Modal ref={modalRef} setUserList={setUserList} setTeamList={setTeamList}>
        <h1>Hello World</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Member Name</label>
            <input
              type='text'
              name='name'
              id=''
              autoComplete='off'
              value={selectedUser ? selectedUser : input.memberName}
              onChange={(e) => {
                setInput({ ...input, memberName: e.target.value });
                setSelectedUser(null);
              }}
            />
            <div className='member-list-dropdown'>
              {userList ? <ul>{createUserList()}</ul> : null}
            </div>
            <label htmlFor='team'>Team Name</label>
            <input
              type='text'
              name='team'
              id=''
              autoComplete='off'
              value={selectedTeam ? selectedTeam : input.teamName}
              onChange={(e) => {
                setInput({ ...input, teamName: e.target.value });
                setSelectedTeam(null);
              }}
            />
            <div className='team-list-dropdown'>
              {teamList ? <ul>{createTeamList()}</ul> : null}
            </div>
            <input onClick={handleSubmit} type='submit' value='Add Member' />
          </form>
        </div>
      </Modal>
      {createMarkup()}
    </div>
  );
};

export default Teams;
