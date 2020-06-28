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
  return (
    <div>
      <li>{date}</li>
      <li>{stockNumber}</li>
      <li>{source}</li>
      <li>{warranty}</li>
      <li>{finance}</li>
      <li>{maintenance}</li>
      <li>{customer}</li>
      <li>{vehicle}</li>
      <li>{frontGross}</li>
      <li>{backGross}</li>
    </div>
  );
};

export default Sale;
