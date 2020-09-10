import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';

import SaleModal from '../components/SaleModal';
import BonusModal from '../components/BonusModal';
import Modal from '../components/Modal';
import Tracking from '../components/Tracking';
import Sale from '../components/Sale';
import UserContext from '../components/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [sales, setSales] = useState();
  const [bonus, setBonus] = useState();
  const [frontGross, setFrontGross] = useState(0);
  const [backGross, setBackGross] = useState(0);
  const [personalFrontGross, setPersonalFrontGross] = useState(0);
  const [totalGross, setTotalGross] = useState(0);
  const [newSales, setNewSales] = useState(0);
  // Set into SaleModal when creating a sale, causes useEffect to fetch sales again
  const [toUpdate, setToUpdate] = useState(false);
  const [usedSales, setUsedSales] = useState(0);
  const [loading, setLoading] = useState(true);
  const saleModalRef = useRef();
  const bonusModalRef = useRef();

  const openModal = (currentModal) => {
    currentModal.current.openModal();
  };

  const closeModal = (currentModal) => {
    currentModal.current.closeModal();
  };


  useEffect(() => {
    const getSales = async () => {
      const res = await axios.get(`http://localhost:5000/sales/${user.id}`);
      try {
        if (res.data) {
          console.log('setting sales');
          setSales(res.data);
          console.log('sales set');
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    console.log('getting sales');
    getSales();
    console.log('finished getting sales');
  }, [toUpdate]);

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

  useEffect(() => {
    const getBonus = () => {
      const { showroomEntries,
        customerReviewScore,
        googleReviews,
        surveys,
        financeDeals,
        warranties,
        maintenance,
        insurance, } = user.currentBonus;
      setBonus({
        showroomEntries,
        customerReviewScore,
        googleReviews,
        surveys,
        financeDeals,
        warranties,
        maintenance,
        insurance,
      })
    }
    getBonus();
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  const salesMarkup = sales.map((sale) => {
    return (
      <Sale
        used={sale.used}
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
      <button onClick={() => { openModal(saleModalRef) }}>New Sale</button>
      <button onClick={() => { openModal(bonusModalRef) }}>Edit PDS</button>
      <li>Total New Sales: {newSales}</li>
      <li>Total Used Sales: {usedSales}</li>
      {salesMarkup}
      <Modal ref={saleModalRef}>
        <SaleModal
          closeModal={closeModal}
          modal={saleModalRef}
          setToUpdate={setToUpdate}
        />
      </Modal>
      <Modal ref={bonusModalRef}>
        <BonusModal
          closeModal={closeModal} modal={bonusModalRef} setBonus={setBonus}
        />
      </Modal>
      <div>
        <ul>
          <li>Showroom Entries: {bonus.showroomEntries.toString()}</li>
          <li>Customer Review Score: {bonus.customerReviewScore.toString()}</li>
          <li>Surveys: {bonus.surveys.toString()}</li>
          <li>Google Reviews: {bonus.googleReviews}</li>
          <li>Finance Deals: {bonus.financeDeals}</li>
          <li>Warranties: {bonus.warranties}</li>
          <li>Maintenance: {bonus.maintenance}</li>
          <li>Insurance: {bonus.insurance}</li>
        </ul>
      </div>
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
