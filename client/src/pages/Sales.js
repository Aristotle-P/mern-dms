import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import UserContext from '../components/UserContext';
import Sale from '../components/Sale';

const Sales = () => {
  const { user } = useContext(UserContext);
  const [sales, setSales] = useState();
  const [loading, setLoading] = useState(true);
  const getSales = async () => {
    const res = await axios.get(`http://localhost:5000/sales/${user.id}`);
    try {
      if (res.data) {
        setSales(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getSales();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const salesMarkup = sales.map((sale) => {
    return (
      <Sale
        date={sale.date}
        stockNumber={sale.stockNumber}
        source={sale.source}
        warranty={sale.warranty}
        finance={sale.finance}
        maintenance={sale.maintenance}
        customer={sale.customer}
        vehicle={sale.vehicle}
        frontGross={sale.frontGross}
        backGross={sale.backGross}
        key={sale._id}
      />
    );
  });

  return <div>{salesMarkup}</div>;
};

export default Sales;
