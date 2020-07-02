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
        new={sale.new}
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

  let newSales = 0;
  sales.forEach((sale) => {
    if (sale.new) {
      newSales++;
    }
  });

  let usedSales = 0;
  sales.forEach((sale) => {
    if (!sale.new) {
      usedSales++;
    }
  });

  let frontGross = 0;
  sales.forEach((sale) => {
    frontGross += sale.frontGross;
  });

  let backGross = 0;
  sales.forEach((sale) => {
    backGross += sale.backGross;
  });

  const getVolumeBonus = (volume) => {
    if (volume <= 5) {
      const gross = backGross + frontGross;
      console.log(gross);
      const newGross = (20 / 100) * gross;
      console.log(newGross);
    } else if (volume >= 6 && volume <= 10) {
      const gross = backGross + frontGross;
      const newGross = gross + (25 / 100) * gross;
      console.log(newGross);
    } else if (volume === 10) {
      const gross = backGross + frontGross;
      const newGross = (30 / 100) * gross;
      console.log(newGross);
    } else if (volume === 11) {
      const gross = backGross + frontGross;
      const newGross = (32 / 100) * gross;
      console.log(newGross);
    } else if (volume === 12) {
      const gross = backGross + frontGross;
      const newGross = (34 / 100) * gross;
      console.log(newGross);
    } else if (volume === 13) {
      const gross = backGross + frontGross;
      const newGross = (36 / 100) * gross;
      console.log(newGross);
    } else if (volume === 14) {
      const gross = backGross + frontGross;
      const newGross = (38 / 100) * gross;
      console.log(newGross);
    } else if (volume >= 15) {
      const gross = backGross + frontGross;
      const newGross = (40 / 100) * gross;
      console.log(newGross);
    }
  };

  const getNewVehicleBonus = (volume) => {
    if (volume <= 5) {
      console.log('20%');
    } else if (volume >= 6 && volume <= 10) {
      console.log('25%');
    } else if (volume === 10) {
      console.log('30%');
    } else if (volume === 11) {
      console.log('32%');
    } else if (volume === 12) {
      console.log('34%');
    } else if (volume === 13) {
      console.log('36%');
    } else if (volume === 14) {
      console.log('38%');
    } else if (volume >= 15) {
      console.log('40%');
    }
  };

  getVolumeBonus(newSales + usedSales);

  return (
    <div>
      <li>{newSales}</li>
      <li>{usedSales}</li>
      {salesMarkup}
      <div></div>
    </div>
  );
};

export default Sales;
