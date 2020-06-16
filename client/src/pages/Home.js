import React, { useState, useContext } from 'react';
import axios from 'axios';

import UserContext from '../components/UserContext';
import SaleForm from '../components/SaleForm';

const Home = () => {
  const { user } = useContext(UserContext);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    axios.post('http://localhost:5000/sale', {
      date: input.date,
      stockNumber: input.stockNumber,
      source: input.source,
      warranty: input.warranty,
      maintenance: input.maintenance,
      customer: input.customer,
      vehicle: input.vehicle,
      frontGross: input.frontGross,
      backGross: input.backGross,
      salesperson: user.id,
    });
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
