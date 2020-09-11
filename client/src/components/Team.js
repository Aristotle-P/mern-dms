import React, { useState, useEffect } from 'react'

import axios from 'axios';

const Team = ({ teamName, teamId, members, updateTeams }) => {
  const [teamMembers, setTeamMembers] = useState(members);
  const [sales, setSales] = useState([]);
  const [salesData, setSalesData] = useState({});

  const handleMemberClick = e => {
    e.preventDefault();

    const newMembers = teamMembers.filter(member => member.id !== e.target.id);
    axios.put(`http://localhost:5000/team/${teamId}`, {
      members: newMembers
    })
    const newTeam = {
      _id: teamId,
      teamName,
      members: newMembers
    }
    const newSales = sales.filter(sale => sale.salesperson !== e.target.id);
    setSales(newSales);
    updateTeams(newTeam);
  }

  useEffect(() => {
    setTeamMembers(members);
  }, [members])

  useEffect(() => {
    const getSales = () => {
      teamMembers.forEach(async (member) => {
        const res = await axios.get(`http://localhost:5000/sales/${member.id}`);
        setSales(sales.concat(res.data));
      })
    }
    getSales();
  }, [teamMembers]);

  useEffect(() => {
    let totalBackGross = 0;
    let totalFrontGross = 0;
    let newSales = 0;
    let usedSales = 0;
    sales.forEach(sale => {
      totalBackGross = sale.backGross + totalBackGross;
      totalFrontGross = sale.frontGross + totalFrontGross;
      if (sale.used) {
        usedSales++
      }
      newSales++
    })
    const totalGross = totalFrontGross + totalBackGross
    setSalesData({ frontGross: totalFrontGross / 100, backGross: totalBackGross / 100, totalGross: totalGross / 100, newSales, usedSales });
  }, [teamMembers, sales]);


  return (
    <div className="team-container">
      <h3>{teamName}</h3>
      {teamMembers.map(member =>
        <ul className="team-member" key={member.id}>
          <button onClick={handleMemberClick} id={member.id}>Remove Member</button>
          <li>{member.name}</li>
          <li>{member.email}</li>
          <li>{member.onlineSales ? "Online Sale Member" : "Floor Sale Member"}</li>
        </ul>
      )}
      <div>
        <ul>
          <li>Team New Sales: {salesData.newSales}</li>
          <li>Team Used Sales: {salesData.usedSales}</li>
          <li>Team Front Gross: {salesData.frontGross}</li>
          <li>Team Back Gross: {salesData.backGross}</li>
          <li>Team Total Gross: {salesData.totalGross}</li>
        </ul>
      </div>
    </div>
  )
}

export default Team
