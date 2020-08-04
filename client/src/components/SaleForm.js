import React from 'react';

const SaleForm = ({
  handleSubmit,
  handleInputChange,
  handleCheckboxChange,
  handleDropdownChange,
  input,
}) => {
  const handleBlur = (e) => {
    const localeStringToNumber = (string) => {
      return Number(String(string).replace(/[^0-9.-]+/g, ''));
    };

    const { value } = e.target;

    const options = {
      maxiumumFractionDigits: 2,
      currency: 'USD',
      style: 'currency',
      currencyDisplay: 'symbol',
    };

    e.target.value = value
      ? localeStringToNumber(value).toLocaleString(undefined, options)
      : '';
  };

  const handleFocus = (e) => {
    e.target.select();
    console.log(e.target.value);
  };

  return (
    <div className="sale-form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="date" name="date" onChange={handleInputChange} />
        </div>
        <div className="input-container">
          <label htmlFor="used">New Or Used</label>
          <select name="used" onChange={handleDropdownChange}>
            <option value=""></option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="half">Full Or Half Deal</label>
          <select name="half" onChange={handleDropdownChange}>
            <option value=""></option>
            <option value="full">Full</option>
            <option value="half">Half</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="stockNumber">Stocknumber</label>
          <input
            type="text"
            name="stockNumber"
            id="stockNumber"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="warranty">Warranty</label>
          <input
            type="checkbox"
            name="warranty"
            id="warranty"
            checked={input.warranty}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="finance">Finance</label>
          <input
            type="checkbox"
            name="finance"
            id="finance"
            checked={input.finance}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="maintenance">Maintenance</label>
          <input
            type="checkbox"
            name="maintenance"
            id="maintenance"
            checked={input.maintenance}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="customer">Customer</label>
          <input
            type="text"
            name="customer"
            id="customer"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="vehicle">Vehicle</label>
          <input
            type="text"
            name="vehicle"
            id="vehicle"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="frontGross">Front Gross</label>
          <input
            type="currency"
            name="frontGross"
            id="frontGross"
            placeholder="$0.00"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        </div>
        <div className="input-container">
          <label htmlFor="backGross">Back Gross</label>
          <input
            type="currency"
            name="backGross"
            id="backGross"
            placeholder="$0.00"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        </div>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default SaleForm;
