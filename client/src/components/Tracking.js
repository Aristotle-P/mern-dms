import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';

const Tracking = ({
  newSales,
  usedSales,
  frontGross,
  backGross,
  totalGross,
}) => {
  const [volumeCommission, setVolumeCommission] = useState(0);
  const [volumeBonus, setVolumeBonus] = useState(0);
  const [newVehicleBonus, setNewVehicleBonus] = useState(0);
  const [internetTotalBonus, setInternetTotalBonus] = useState(0);
  const [floorTotalBonus, setFloorTotalBonus] = useState(0);
  const [trackingFrontGross, setTrackingFrontGross] = useState(0);
  const [trackingBackGross, setTrackingBackGross] = useState(0);
  const [trackingTotalGross, setTrackingTotalGross] = useState(0);
  const [bonusModifier, setBonusModifier] = useState(true);

  const { user } = useContext(UserContext);

  const currencyString = (value) => {
    const options = {
      maxiumumFractionDigits: 2,
      currency: 'USD',
      style: 'currency',
      currencyDisplay: 'symbol',
    };

    const numString = value.toString();

    const localeStringToNumber = (string) => {
      return Number(String(string).replace(/[^0-9.-]+/g, ''));
    };

    const localeString = numString
      ? localeStringToNumber(numString).toLocaleString(undefined, options)
      : '';

    return localeString;
  }

  useEffect(() => {
    const roundNumber = (value) => {
      return Number(Math.round(value + 'e' + 2) + 'e-' + 2).toFixed(2);
    }


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

    const getVolumeComission = (volume) => {
      if (volume <= 5) {
        const newGross = (20 / 100) * frontGross;
        setVolumeCommission(
          roundNumber(newGross / 100)
        );
      } else if (volume >= 6 && volume <= 10) {
        const newGross = (25 / 100) * frontGross;
        setVolumeCommission(
          roundNumber(newGross / 100)
        );
      } else if (volume === 10) {
        const newGross = (30 / 100) * frontGross;
        setVolumeCommission(
          roundNumber(newGross / 100)
        );
      } else if (volume === 11) {
        const newGross = (32 / 100) * frontGross;
        setVolumeCommission(
          roundNumber(newGross / 100)
        );
      } else if (volume === 12) {
        const newGross = (34 / 100) * frontGross;
        setVolumeCommission(
          roundNumber(newGross / 100)
        );
      } else if (volume === 13) {
        const newGross = (36 / 100) * frontGross;
        setVolumeCommission(
          roundNumber(newGross / 100)
        );
      } else if (volume === 14) {
        const newGross = (38 / 100) * frontGross;
        setVolumeCommission(
          roundNumber(newGross / 100)
        );
      } else if (volume >= 15) {
        const newGross = (40 / 100) * frontGross;
        setVolumeCommission(
          roundNumber(newGross / 100)
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
      } else if (volume === 10 || volume === 11) {
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
        roundNumber(trackedGross / 100)
      );
    };

    const getTrackingBackGross = (backGross) => {
      const days = getDaysLeft();
      const trackedGross = (backGross / days.daysSold) * days.sellingDays;
      setTrackingBackGross(
        roundNumber(trackedGross / 100)
      );
    };

    const getTrackingTotalGross = (gross) => {
      const days = getDaysLeft();
      const trackedGross = (gross / days.daysSold) * days.sellingDays;
      setTrackingTotalGross(
        roundNumber(trackedGross / 100)
      );
    };

    const checkBonusModifier = () => {
      let minimumBonusThreshold = 0;
      if (user.currentBonus.showroomEntries) {
        minimumBonusThreshold = minimumBonusThreshold + 1
      }
      if (user.currentBonus.customerReviewScore) {
        minimumBonusThreshold = minimumBonusThreshold + 1
      }
      if (user.currentBonus.surveys) {
        minimumBonusThreshold = minimumBonusThreshold + 1
      }
      if (user.currentBonus.googleReviews > 0) {
        minimumBonusThreshold = minimumBonusThreshold + 1
      }
      if (minimumBonusThreshold <= 2) {
        setBonusModifier(false);
      }
    }

    getVolumeComission(newSales + usedSales);
    getNewVehicleBonus(newSales);
    getTrackingFrontGross(frontGross);
    getTrackingBackGross(backGross);
    getTrackingTotalGross(totalGross);
    if (user.onlineSales) {
      getInternetTotalBonus(totalGross);
      setFloorTotalBonus(0);
    } else {
      getFloorTotalBonus(totalGross);
      setInternetTotalBonus(0);
    }
    if (newSales >= 10) {
      setVolumeBonus(500);
    }
    checkBonusModifier();
  }, []);

  return (
    <div className="tracking-container">
      <ul>
        <li>Front Gross: {currencyString(frontGross / 100)}</li>
        <li>Back Gross: {currencyString(backGross / 100)}</li>
        <li>Total Gross: {currencyString(totalGross / 100)}</li>
        <li>Volume Commission: {currencyString(volumeCommission)}</li>
        <li>Volume Bonus: {bonusModifier ? currencyString(volumeBonus) : currencyString(volumeBonus * 0.5)}</li>
        <li>New Vehicle Bonus: {bonusModifier ? currencyString(newVehicleBonus) : currencyString(newVehicleBonus * 0.5)}</li>
        <li>Internet Total Bonus: {bonusModifier ? currencyString(internetTotalBonus) : currencyString(internetTotalBonus * 0.5)}</li>
        <li>Floor Total Bonus: {bonusModifier ? currencyString(floorTotalBonus) : currencyString(floorTotalBonus * 0.5)}</li>
        <li>Tracking Front Gross: {currencyString(trackingFrontGross)}</li>
        <li>Tracking Back Gross: {currencyString(trackingBackGross)}</li>
        <li>Tracking Total Gross: {currencyString(trackingTotalGross)}</li>
        <li>Google Reviews: {currencyString(user.currentBonus.googleReviews * 10)} </li>
        <li>Finance Deals: {currencyString(user.currentBonus.financeDeals * 10)} </li>
        <li>Maintenance: {currencyString(user.currentBonus.maintenance * 10)} </li>
        <li>Insurance: {currencyString(user.currentBonus.insurance * 10)} </li>
        <li>Warranties: {currencyString(user.currentBonus.warranties * 10)} </li>
      </ul>
    </div>
  );
};

export default Tracking;
