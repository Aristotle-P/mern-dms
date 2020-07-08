import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = ({ location }) => {
  const { userId } = location.state;
  const [currentUser, setCurrentUser] = useState({});
  const [sales, setSales] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const userRes = axios.get(`http://localhost:5000/user/${userId}`);
      const salesRes = axios.get(`http://localhost:5000/sales/${userId}`);
      const res = [await userRes, await salesRes];
      try {
        if (res[0]) {
          setCurrentUser({
            name: res[0].data.name,
            email: res[0].data.email,
          });
        }
      } catch (err) {
        console.log(err);
      }
      try {
        if (res[1]) {
          res[1].data.forEach((sale) => {
            setSales({
              source: sale.source,
              warranty: sale.warranty,
              finance: sale.finance,
              maintenance: sale.maintenance,
              new: sale.new,
              date: sale.date,
              stockNumber: sale.stockNumber,
              customer: sale.customer,
              vehicle: sale.vehicle,
              frontGross: sale.frontGross / 100,
              backGross: sale.backGross / 100,
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);
  return (
    <div>
      <h1>
        {currentUser.name} | {currentUser.email}
      </h1>
      <ul>
        <li>Date: {sales.date}</li>
        <li>Stocknumber: {sales.stockNumber}</li>
        <li>Source: {sales.source}</li>
        <li>Warranty: {sales.warranty}</li>
        <li>Finance: {sales.finance}</li>
        <li>Maintenance: {sales.maintenance}</li>
        <li>Customer: {sales.customer}</li>
        <li>Vehicle: {sales.vehicle}</li>
        <li>Front Gross: {sales.frontGross}</li>
        <li>Back Gross: {sales.backGross}</li>
      </ul>
    </div>
  );
};

export default User;
