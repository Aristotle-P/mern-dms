import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import SaleModal from '../components/SaleModal';
import Tracking from '../components/Tracking';
import Sale from '../components/Sale';
import UserContext from '../components/UserContext';

const Dashboard = ({ handleModalDisplay, showModal }) => {
  // const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);
  const [sales, setSales] = useState();
  const [frontGross, setFrontGross] = useState(0);
  const [backGross, setBackGross] = useState(0);
  const [personalFrontGross, setPersonalFrontGross] = useState(0);
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
        if (!sale.used) {
          tempNewSales++;
        }
      });
      setNewSales(tempNewSales);

      let tempUsedSales = 0;
      sales.forEach((sale) => {
        if (sale.used) {
          tempUsedSales++;
        }
      });
      setUsedSales(tempUsedSales);
    }
  }, [sales]);

  useEffect(() => {
    if (sales) {
      let tempFrontGross = 0;
      sales.forEach((sale) => {
        tempFrontGross += sale.frontGross;
      });

      setFrontGross(tempFrontGross);

      let tempBackGross = 0;
      sales.forEach((sale) => {
        tempBackGross += sale.backGross;
      });

      setBackGross(tempBackGross);

      let tempPersonalFrontGross = 0;
      sales.forEach((sale) => {
        if (sale.frontGross < 0) {
          if (sale.used && !sale.half) {
            return (tempPersonalFrontGross += 100);
          } else if (sale.used && sale.half) {
            return (tempPersonalFrontGross += 50);
          } else if (sale.new && !sale.half) {
            return (tempPersonalFrontGross += 300);
          } else if (sale.new && sale.half) {
            return (tempPersonalFrontGross += 150);
          }
        }
        tempPersonalFrontGross += sale.frontGross;
      });

      setPersonalFrontGross(tempPersonalFrontGross);

      const tempTotalGross = tempBackGross + tempFrontGross;
      setTotalGross(tempTotalGross);
    }
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
      <button onClick={handleModalDisplay}>New Sale</button>
      <li>Total New Sales: {newSales}</li>
      <li>Total Used Sales: {usedSales}</li>
      {salesMarkup}
      <SaleModal
        showModal={showModal}
        handleModalDisplay={handleModalDisplay}
      />
      <div>
        <Tracking
          newSales={newSales}
          usedSales={usedSales}
          frontGross={frontGross}
          backGross={backGross}
          personalFrontGross={personalFrontGross}
          totalGross={totalGross}
        />
      </div>
    </div>
  );
};

export default Dashboard;
