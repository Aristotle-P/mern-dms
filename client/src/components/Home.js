import React, { useState, useContext } from 'react';
import axios from 'axios';

import UserContext from './UserContext';
import SaleForm from './SaleForm';

const Home = () => {
  const [input, setInput] = useState({
    date: null,
    stockNumber: null,
    source: '',
    warranty: false,
    finance: false,
    maintenance: false,
    customer: '',
    vehicle: '',
    frontGross: null,
    backGross: null,
  });

  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    try {
      await axios.post(
        'http://localhost:5000/graphql',
        {
          query: `mutation createSale(
            $date: String!, 
            $stockNumber: Int!, 
            $source: String, 
            $warranty: Boolean, 
            $maintenance: Boolean, 
            $customer: String!, 
            $vehicle: String!, 
            $frontGross: Int!, 
            $backGross: Int!, 
            $salesperson: ID!
          ) {createSale(
              date: $date, 
              stockNumber: $stockNumber, 
              source: $source, 
              warranty: $warranty, 
              maintenance: $maintenance, 
              customer: $customer, 
              vehicle: $vehicle, 
              frontGross: $frontGross, 
              backGross: $backGross, 
              salesperson: $salesperson) {
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

  const handleInputChange = (e) => {
    if (e.target.type !== 'number') {
      return setInput({ ...input, [e.target.name]: e.target.value });
    }
    setInput({ ...input, [e.target.name]: parseInt(e.target.value) });
  };

  const handleCheckboxChange = (e) => {
    setInput({ ...input, [e.target.name]: !!e.target.checked });
  };

  return (
    <div>
      <h1>You're logged in!</h1>
      <SaleForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        input={input}
      />
    </div>
  );
};

export default Home;
