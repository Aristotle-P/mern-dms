import React, { useState, useContext } from 'react';
import axios from 'axios';

import UserContext from './UserContext';

const Home = () => {
  const [input, setInput] = useState({
    date: null,
    stockNumber: null,
    source: '',
    warranty: null,
    finance: null,
    maintenance: null,
    customer: '',
    vehicle: '',
    frontGross: null,
    backGross: null,
  });

  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/graphql',
        {
          query: `mutation createSale($date: String!, $stockNumber: Int!, $source: String, $warranty: Boolean, $maintenance: Boolean, $customer: String!, $vehicle: String!, $frontGross: Int!, $backGross: Int!, $salesperson: ID!) {
            createSale(date: $date, stockNumber: $stockNumber, source: $source, warranty: $warranty, maintenance: $maintenance, customer: $customer, vehicle: $vehicle, frontGross: $frontGross, backGross: $backGross, salesperson: $salesperson) {
              vehicle
            }
          }`,
          variables: {
            date: input.date,
            stockNumber: input.stockNumber,
            source: input.source,
            warranty: input.warranty,
            finance: input.finance,
            maintenance: input.maintenance,
            customer: input.customer,
            vehicle: input.vehicle,
            frontGross: input.frontGross,
            backGross: input.backGross,
            salesperson: user.id,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>You're logged in!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          onChange={(e) => setInput({ ...input, date: e.target.value })}
        />
        <label htmlFor="stocknumber">Stocknumber</label>
        <input
          type="number"
          name="stocknumber"
          id="stocknumber"
          onChange={(e) =>
            setInput({ ...input, stockNumber: parseInt(e.target.value) })
          }
        />
        <label htmlFor="source">Source</label>
        <input
          type="text"
          name="source"
          id="source"
          onChange={(e) => setInput({ ...input, source: e.target.value })}
        />
        <label htmlFor="warranty">Warranty</label>
        <input
          type="checkbox"
          name="warranty"
          id="warranty"
          onChange={(e) => setInput({ ...input, warranty: true })}
        />
        <label htmlFor="finance">Finance</label>
        <input
          type="checkbox"
          name="finance"
          id="finance"
          onChange={(e) => setInput({ ...input, finance: true })}
        />
        <label htmlFor="maintenance">Maintenance</label>
        <input
          type="checkbox"
          name="maintenance"
          id="maintenance"
          onChange={(e) => setInput({ ...input, maintenance: true })}
        />
        <label htmlFor="customer">Customer</label>
        <input
          type="text"
          name="customer"
          id="customer"
          onChange={(e) => setInput({ ...input, customer: e.target.value })}
        />
        <label htmlFor="vehicle">Vehicle</label>
        <input
          type="text"
          name="vehicle"
          id="vehicle"
          onChange={(e) => setInput({ ...input, vehicle: e.target.value })}
        />
        <label htmlFor="front-gross">Front Gross</label>
        <input
          type="number"
          name="front-gross"
          id="front-gross"
          onChange={(e) =>
            setInput({ ...input, frontGross: parseInt(e.target.value) })
          }
        />
        <label htmlFor="back-gross">Back Gross</label>
        <input
          type="number"
          name="back-gross"
          id="back-gross"
          onChange={(e) =>
            setInput({ ...input, backGross: parseInt(e.target.value) })
          }
        />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default Home;
