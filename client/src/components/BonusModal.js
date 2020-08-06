import React, { useState, useContext } from 'react';
import axios from 'axios';

import UserContext from './UserContext';
import BonusForm from './BonusForm';

const BonusModal = ({ showModal, handleModalDisplay }) => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState({
    showroomEntries: null,
    googleReviews: null,
    customerReviewScore: null,
    surveys: null,
    financeDeals: null,
    warranties: null,
    maintenance: null,
    insurance: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    const updates = {}
    for (const prop in input) {
      if (input[prop] !== null) {
        updates[prop] = input[prop];
      }
    }
    axios.put(`http://localhost:5000/bonuses/${user.currentBonus._id}`, updates);
    handleModalDisplay();
  };

  const handleInputChange = (e) => {
    return setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setInput({ ...input, [e.target.name]: !!e.target.checked });
  };

  const handleDropdownChange = (e) => {
    let value;
    if (e.target.value === 'false') {
      value = false;
    } else {
      value = true;
    }
    setInput({ ...input, [e.target.name]: value });
  };

  if (!showModal) {
    return <React.Fragment />;
  }

  return (
    <div
      className="sale-modal"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button className="modal-close" onClick={handleModalDisplay}>
        X
      </button>
      <BonusForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        handleDropdownChange={handleDropdownChange}
        input={input}
      />
    </div>
  );
};

export default BonusModal;