import React, { useState, useEffect } from 'react';

const Tracking = ({
  newSales,
  usedSales,
  frontGross,
  backGross,
  personalFrontGross,
  totalGross,
}) => {
  const [volumeBonus, setVolumeBonus] = useState();
  const [newVehicleBonus, setNewVehicleBonus] = useState();
  const [internetTotalBonus, setInternetTotalBonus] = useState();
  const [floorTotalBonus, setFloorTotalBonus] = useState();
  const [trackingFrontGross, setTrackingFrontGross] = useState();
  const [trackingBackGross, setTrackingBackGross] = useState();
  const [trackingTotalGross, setTrackingTotalGross] = useState();

  console.log(personalFrontGross);

  useEffect(() => {
    const getDaysLeft = () => {
      const currentDate = new Date();
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      const sellingDays = endOfMonth - 1;
      const daysSold = currentDate.getDate() - 1;
      const daysObject = { sellingDays, daysSold };
      return daysObject;
    };

    const getVolumeBonus = (volume) => {
      if (volume <= 5) {
        const newGross = (20 / 100) * frontGross;
        setVolumeBonus(
          Math.round((newGross / 100 + Number.EPSILON) * 100) / 100
        );
      } else if (volume >= 6 && volume <= 10) {
        const newGross = (25 / 100) * frontGross;
        setVolumeBonus(
          Math.round((newGross / 100 + Number.EPSILON) * 100) / 100
        );
      } else if (volume === 10) {
        const newGross = (30 / 100) * frontGross;
        setVolumeBonus(
          Math.round((newGross / 100 + Number.EPSILON) * 100) / 100
        );
      } else if (volume === 11) {
        const newGross = (32 / 100) * frontGross;
        setVolumeBonus(
          Math.round((newGross / 100 + Number.EPSILON) * 100) / 100
        );
      } else if (volume === 12) {
        const newGross = (34 / 100) * frontGross;
        setVolumeBonus(
          Math.round((newGross / 100 + Number.EPSILON) * 100) / 100
        );
      } else if (volume === 13) {
        const newGross = (36 / 100) * frontGross;
        setVolumeBonus(
          Math.round((newGross / 100 + Number.EPSILON) * 100) / 100
        );
      } else if (volume === 14) {
        const newGross = (38 / 100) * frontGross;
        setVolumeBonus(
          Math.round((newGross / 100 + Number.EPSILON) * 100) / 100
        );
      } else if (volume >= 15) {
        const newGross = (40 / 100) * frontGross;
        setVolumeBonus(
          Math.round((newGross / 100 + Number.EPSILON) * 100) / 100
        );
      }
    };

    const getNewVehicleBonus = (volume) => {
      if (volume === 4) {
        setNewVehicleBonus(400);
      } else if (volume === 5) {
        setNewVehicleBonus(500);
      } else if (volume === 6) {
        setNewVehicleBonus(600);
      } else if (volume === 7) {
        setNewVehicleBonus(700);
      } else if (volume === 8) {
        setNewVehicleBonus(800);
      } else if (volume === 9) {
        setNewVehicleBonus(900);
      } else if (volume === 10) {
        setNewVehicleBonus(1000);
      } else if (volume === 12) {
        setNewVehicleBonus(1200);
      } else if (volume === 14) {
        setNewVehicleBonus(1500);
      }
    };

    const getInternetTotalBonus = (gross) => {
      if (gross >= 1000000 && gross <= 1499999) {
        setInternetTotalBonus(400);
      } else if (gross >= 1500000 && gross <= 1999999) {
        setInternetTotalBonus(500);
      } else if (gross >= 2000000 && gross <= 2499999) {
        setInternetTotalBonus(600);
      } else if (gross >= 2500000 && gross <= 2999999) {
        setInternetTotalBonus(700);
      } else if (gross >= 3000000 && gross <= 3499999) {
        setInternetTotalBonus(1000);
      } else if (gross >= 3500000 && gross <= 3999999) {
        setInternetTotalBonus(1500);
      } else if (gross >= 4000000) {
        setInternetTotalBonus(2000);
      }
    };

    const getFloorTotalBonus = (gross) => {
      if (gross >= 2000000 && gross <= 2999999) {
        setFloorTotalBonus(400);
      } else if (gross >= 3000000 && gross <= 3999999) {
        setFloorTotalBonus(500);
      } else if (gross >= 4000000 && gross <= 4999999) {
        setFloorTotalBonus(600);
      } else if (gross >= 5000000 && gross <= 5999999) {
        setFloorTotalBonus(700);
      } else if (gross >= 6000000 && gross <= 6999999) {
        setFloorTotalBonus(100);
      } else if (gross >= 7000000 && gross <= 7999999) {
        setFloorTotalBonus(1500);
      } else if (gross >= 8000000) {
        setFloorTotalBonus(2000);
      }
    };

    const getTrackingFrontGross = (frontGross) => {
      const days = getDaysLeft();
      const trackedGross = (frontGross / days.daysSold) * days.sellingDays;
      setTrackingFrontGross(
        Math.round((trackedGross / 100 + Number.EPSILON) * 100) / 100
      );
    };

    const getTrackingBackGross = (backGross) => {
      const days = getDaysLeft();
      const trackedGross = (backGross / days.daysSold) * days.sellingDays;
      setTrackingBackGross(
        Math.round((trackedGross / 100 + Number.EPSILON) * 100) / 100
      );
    };

    const getTrackingTotalGross = (gross) => {
      const days = getDaysLeft();
      const trackedGross = (gross / days.daysSold) * days.sellingDays;
      setTrackingTotalGross(
        Math.round((trackedGross / 100 + Number.EPSILON) * 100) / 100
      );
    };

    getVolumeBonus(newSales + usedSales);
    getNewVehicleBonus(newSales);
    getInternetTotalBonus(totalGross);
    getFloorTotalBonus(totalGross);
    getTrackingFrontGross(frontGross);
    getTrackingBackGross(backGross);
    getTrackingTotalGross(totalGross);
  }, []);

  return (
    <div className="tracking-container">
      <ul>
        <li>Front Gross: {frontGross / 100}</li>
        <li>Back Gross: {backGross / 100}</li>
        <li>Total Gross: {totalGross / 100}</li>
        <li>Volume Bonus: {volumeBonus}</li>
        <li>New Vehicle Bonus: {newVehicleBonus}</li>
        <li>Internet Total Bonus: {internetTotalBonus}</li>
        <li>Floor Total Bonus: {floorTotalBonus}</li>
        <li>Tracking Front Gross: {trackingFrontGross}</li>
        <li>Tracking Back Gross: {trackingBackGross}</li>
        <li>Tracking Total Gross: {trackingTotalGross}</li>
      </ul>
    </div>
  );
};

export default Tracking;
