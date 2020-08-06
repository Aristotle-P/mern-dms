import React from 'react';

const BonusForm = ({
  handleSubmit,
  handleInputChange,
  handleDropdownChange,
  input,
}) => {
  return (
    <div className="sale-form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="showroomEntries">Showroom Entries</label>
          <select name="showroomEntries" onChange={handleDropdownChange}>
            <option value=""></option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="surveys">Surveys</label>
          <select name="surveys" onChange={handleDropdownChange}>
            <option value=""></option>
            <option value="true">True</option>
            <option value="False">False</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="customerReviewScore">Customer Review Score</label>
          <select name="customerReviewScore" onChange={handleDropdownChange}>
            <option value=""></option>
            <option value="true">True</option>
            <option value="False">False</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="googleReviews">Google Reviews</label>
          <input
            type="number"
            name="googleReviews"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="warranties">Warranties</label>
          <input
            type="number"
            name="warranties"
            id="warranties"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="financeDeals">Finance Deals</label>
          <input
            type="number"
            name="financeDeals"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="maintenance">Maintenance</label>
          <input
            name="maintenance"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="insurance">Insurance</label>
          <input
            type="number"
            name="insurance"
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default BonusForm;
