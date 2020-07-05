import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import UserContext from '../components/UserContext';
import Sale from '../components/Sale';
import Tracking from '../components/Tracking';

const Sales = () => {
  const { user } = useContext(UserContext);
  const [sales, setSales] = useState();
  const [frontGross, setFrontGross] = useState(0);
  const [backGross, setBackGross] = useState(0);
  const [totalGross, setTotalGross] = useState(0);
  const [newSales, setNewSales] = useState(0);
  const [usedSales, setUsedSales] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    getSales();
  }, []);

  useEffect(() => {
    if (sales) {
      let tempNewSales = 0;
      sales.forEach((sale) => {
        if (sale.new) {
          tempNewSales++;
        }
      });
      setNewSales(tempNewSales);

      let tempUsedSales = 0;
      sales.forEach((sale) => {
        if (!sale.new) {
          tempUsedSales++;
        }
      });
      setUsedSales(tempUsedSales);
    }
  }, [sales])

  useEffect(() => {
    if (sales) {
      let tempFrontGross = 0;
      sales.forEach((sale) => {
        tempFrontGross += sale.frontGross / 100;
      });

      setFrontGross(tempFrontGross);

      let tempBackGross = 0;
      sales.forEach((sale) => {
        tempBackGross += sale.backGross / 100;
      });

      setBackGross(tempBackGross);

      const tempTotalGross = tempBackGross + tempFrontGross;
      setTotalGross(tempTotalGross);
    };
  }, [sales]);

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

  return (
    <div>
      <li>Total New Sales: {newSales}</li>
      <li>Total Used Sales: {usedSales}</li>
      {salesMarkup}
      <div>
        <Tracking newSales={newSales} usedSales={usedSales} frontGross={frontGross} backGross={backGross} totalGross={totalGross} />
      </div>
    </div>
  );
};

export default Sales;
