import React from 'react';

const Sale = ({
  date,
  stockNumber,
  source,
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
    const currency = (num / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return currency;
  }

  const formattedFrontGross = formatCurrency(frontGross);
  const formattedBackGross = formatCurrency(backGross);
  return (
    <div>
      <div>
        <li>Date: {date}</li>
        <li>Stocknumber: {stockNumber}</li>
        <li>Source: {source}</li>
        <li>Warranty: {warranty}</li>
        <li>Finance: {finance}</li>
        <li>Maintenance: {maintenance}</li>
        <li>Customer: {customer}</li>
        <li>Vehicle: {vehicle}</li>
        <li>Front Gross: {formattedFrontGross}</li>
        <li>Back Gross: {formattedBackGross}</li>
      </div>
      <div style={{ height: '20px', width: '100vw', backgroundColor: 'black' }}></div>
    </div>
  );
};

export default Sale;
