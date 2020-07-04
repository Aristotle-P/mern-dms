import React, { useState, useContext } from 'react';
import axios from 'axios';

import UserContext from '../components/UserContext';
import SaleForm from '../components/SaleForm';

const Home = () => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState({
    date: null,
    used: false,
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
      used: input.used,
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
    if (e.target.name !== 'frontGross' && e.target.name !== 'backGross') {
      return setInput({ ...input, [e.target.name]: e.target.value });
    }

    const localeStringToNumber = (string) => {
      return Number(String(string).replace(/[^0-9.-]+/g, ""))
    }

    const { value } = e.target

    const options = {
      maxiumumFractionDigits: 2,
      currency: 'USD',
      style: 'currency',
      currencyDisplay: 'symbol'
    }

    const localeString = value ? localeStringToNumber(value).toLocaleString(undefined, options) : '';

    setInput({ ...input, [e.target.name]: localeString });
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
