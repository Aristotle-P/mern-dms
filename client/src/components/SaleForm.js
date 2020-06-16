import React from 'react';
import VinSearch from './VinSearch';

const SaleForm = ({
  handleSubmit,
  handleInputChange,
  handleCheckboxChange,
  input,
}) => {
  return (
    <div>
      <VinSearch />
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" onChange={handleInputChange} />
        <label htmlFor="stockNumber">Stocknumber</label>
        <input
          type="number"
          name="stockNumber"
          id="stockNumber"
          onChange={handleInputChange}
        />
        <label htmlFor="source">Source</label>
        <input
          type="text"
          name="source"
          id="source"
          onChange={handleInputChange}
        />
        <label htmlFor="warranty">Warranty</label>
        <input
          type="checkbox"
          name="warranty"
          id="warranty"
          checked={input.warranty}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="finance">Finance</label>
        <input
          type="checkbox"
          name="finance"
          id="finance"
          checked={input.finance}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="maintenance">Maintenance</label>
        <input
          type="checkbox"
          name="maintenance"
          id="maintenance"
          checked={input.maintenance}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="customer">Customer</label>
        <input
          type="text"
          name="customer"
          id="customer"
          onChange={handleInputChange}
        />
        <label htmlFor="vehicle">Vehicle</label>
        <input
          type="text"
          name="vehicle"
          id="vehicle"
          onChange={handleInputChange}
        />
        <label htmlFor="frontGross">Front Gross</label>
        <input
          type="number"
          name="frontGross"
          id="frontGross"
          onChange={handleInputChange}
        />
        <label htmlFor="backGross">Back Gross</label>
        <input
          type="number"
          name="backGross"
          id="backGross"
          onChange={handleInputChange}
        />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default SaleForm;
