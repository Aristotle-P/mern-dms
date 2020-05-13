import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [input, setInput] = useState({
    date: null,
    stocknumber: null,
    source: '',
    warranty: null,
    finance: null,
    maintenance: null,
    customer: '',
    vehicle: '',
    frontGross: null,
    backGross: null
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/graphql',
        {
          query: `mutation createSale(
            $date: String!, 
            $stockNumber: String!, 
            $source: String, 
            $warranty: Boolean,
            $finance: Boolean,
            $maintenance: Boolean,
            $customer: String!,
            $vehicle: String!,
            $frontGross: Int!,
            $backGross: Int!,
            $salesperson: ID!) {
              $vehicle
            }`,
          variables: {
            date: input.date,
            stockNumber: input.stocknumber,
            source: input.source,
            warranty: input.warranty,
            finance: input.finance,
            maintenance: input.maintenance,
            customer: input.customer,
            vehicle: input.vehicle,
            frontGross: input.frontGross,
            backGross: input.backGross
            // salesperson: user.id
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>You're logged in!</h1>
      <form>
        <input
          type="date"
          onChange={e => setInput({ ...input, date: e.target.value })}
        />
        <label htmlFor="stocknumber">Stocknumber</label>
        <input
          type="number"
          name="stocknumber"
          id="stocknumber"
          onChange={e => setInput({ ...input, stocknumber: e.target.value })}
        />
        <label htmlFor="source">Source</label>
        <input
          type="text"
          name="source"
          id="source"
          onChange={e => setInput({ ...input, source: e.target.value })}
        />
        <label htmlFor="warranty">Warranty</label>
        <input
          type="checkbox"
          name="warranty"
          id="warranty"
          onChange={e => setInput({ ...input, warranty: e.target.value })}
        />
        <label htmlFor="finance">Finance</label>
        <input
          type="checkbox"
          name="finance"
          id="finance"
          onChange={e => setInput({ ...input, finance: e.target.value })}
        />
        <label htmlFor="maintenance">Maintenance</label>
        <input
          type="checkbox"
          name="maintenance"
          id="maintenance"
          onChange={e => setInput({ ...input, maintenance: e.target.value })}
        />
        <label htmlFor="customer">Customer</label>
        <input
          type="text"
          name="customer"
          id="customer"
          onChange={e => setInput({ ...input, customer: e.target.value })}
        />
        <label htmlFor="vehicle">Vehicle</label>
        <input
          type="text"
          name="vehicle"
          id="vehicle"
          onChange={e => setInput({ ...input, vehicle: e.target.value })}
        />
        <label htmlFor="front-gross">Front Gross</label>
        <input
          type="number"
          name="front-gross"
          id="front-gross"
          onChange={e => setInput({ ...input, frontGross: e.target.value })}
        />
        <label htmlFor="back-gross">Back Gross</label>
        <input
          type="number"
          name="back-gross"
          id="back-gross"
          onChange={e => setInput({ ...input, backGross: e.target.value })}
        />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default Home;
