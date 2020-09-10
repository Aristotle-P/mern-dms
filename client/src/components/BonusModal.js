import React, { useState, useContext } from 'react';
import axios from 'axios';

import UserContext from './UserContext';

const BonusModal = ({ closeModal, modal, setBonus, bonus }) => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState(bonus);

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
    setBonus(updates)
    closeModal(modal);
  };

  const handleInputChange = (e) => {
    return setInput({ ...input, [e.target.name]: e.target.value });
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

  return (
    <div>
      <button className="modal-close" onClick={() => { closeModal(modal) }}>X</button>
      <div className="sale-form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="showroomEntries">Showroom Entries</label>
            <select name="showroomEntries" defaultValue={bonus.showroomEntries} onChange={handleDropdownChange}>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="customerReviewScore">Customer Review Score</label>
            <select name="customerReviewScore" defaultValue={bonus.customerReviewScore} onChange={handleDropdownChange}>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="surveys">Surveys</label>
            <select name="surveys" defaultValue={bonus.surveys} onChange={handleDropdownChange}>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="googleReviews">Google Reviews</label>
            <input
              type="number"
              name="googleReviews"
              value={input.googleReviews}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="financeDeals">Finance Deals</label>
            <input
              type="number"
              name="financeDeals"
              value={input.financeDeals}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="warranties">Warranties</label>
            <input
              type="number"
              name="warranties"
              id="warranties"
              value={input.warranties}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="maintenance">Maintenance</label>
            <input
              name="maintenance"
              value={input.maintenance}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="insurance">Insurance</label>
            <input
              type="number"
              name="insurance"
              value={input.insurance}
              onChange={handleInputChange}
            />
          </div>
          <input type="submit" value="Create" />
        </form>
      </div>
    </div >
  );
};

export default BonusModal;
