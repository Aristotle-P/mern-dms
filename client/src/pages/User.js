import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Sale from '../components/Sale';
import '../css/style.css';

const User = (props) => {
  const { userId } = props.match.params;
  const [currentUser, setCurrentUser] = useState({});
  const [sales, setSales] = useState([]);
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
          setSales(res[1].data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const salesMarkup = sales.map((sale) => {
    return (
      <Sale
        new={sale.new}
        date={sale.date}
        stockNumber={sale.stockNumber}
        warranty={sale.warranty}
        finance={sale.finance}
        maintenance={sale.maintenance}
        customer={sale.customer}
        vehicle={sale.vehicle}
        frontGross={sale.frontGross}
        backGross={sale.backGross}
        key={sale._id}
      />
    );
  });

  return (
    <div>
      <h1>
        {currentUser.name} | {currentUser.email}
      </h1>
      <div className="sale-data-header">
        <h3>New/Used</h3>
        <h3>Date</h3>
        <h3>Stock Number</h3>
        <h3>Warranty</h3>
        <h3>Finance</h3>
        <h3>Maintenance</h3>
        <h3>Customer</h3>
        <h3>Vehicle</h3>
        <h3>Front Gross</h3>
        <h3>Back Gross</h3>
      </div>
      <div>{salesMarkup}</div>
    </div>
  );
};

export default User;
