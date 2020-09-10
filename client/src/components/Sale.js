import React from 'react';

const Sale = ({
  date,
  used,
  stockNumber,
  warranty,
  finance,
  maintenance,
  customer,
  vehicle,
  frontGross,
  backGross,
}) => {
  if (!warranty) {
    warranty = 'None';
  }
  if (!finance) {
    finance = 'None';
  }
  if (!maintenance) {
    maintenance = 'None';
  }

  const formatCurrency = (num) => {
    const currency = (num / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return currency;
  };

  const formattedFrontGross = formatCurrency(frontGross);
  const formattedBackGross = formatCurrency(backGross);
  return (
    <div className="sale-data-container">
      <div>Date: {date}</div>
      <div>Used: {used.toString()}</div>
      <div>Stocknumber: {stockNumber}</div>
      <div>Warranty: {warranty}</div>
      <div>Finance: {finance}</div>
      <div>Maintenance: {maintenance}</div>
      <div>Customer: {customer}</div>
      <div>Vehicle: {vehicle}</div>
      <div>Front Gross: {formattedFrontGross}</div>
      <div>Back Gross: {formattedBackGross}</div>
    </div>
  );
};

export default Sale;
