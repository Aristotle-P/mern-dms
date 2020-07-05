import React, { useState, useEffect } from 'react'

const Tracking = ({ newSales, usedSales, frontGross, backGross, totalGross }) => {

  const [volumeBonus, setVolumeBonus] = useState()
  const [newVehicleBonus, setNewVehicleBonus] = useState()
  const [internetTotalBonus, setInternetTotalBonus] = useState();
  const [floorTotalBonus, setFloorTotalBonus] = useState();
  const [trackingFrontGross, setTrackingFrontGross] = useState();
  const [trackingBackGross, setTrackingBackGross] = useState();
  const [trackingTotalGross, setTrackingTotalGross] = useState();

  useEffect(() => {
    const getDaysLeft = () => {
      const currentDate = new Date;
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      const sellingDays = endOfMonth - 1;
      const daysSold = currentDate.getDate() - 1;
      const daysObject = { sellingDays, daysSold }
      return daysObject;
    }

    const getVolumeBonus = (volume) => {
      if (volume <= 5) {
        const gross = backGross + frontGross;
        const newGross = (20 / 100) * gross;
        setVolumeBonus(newGross);
      } else if (volume >= 6 && volume <= 10) {
        const gross = backGross + frontGross;
        const newGross = gross + (25 / 100) * gross;
        console.log(gross, newGross);
        setVolumeBonus(newGross);
      } else if (volume === 10) {
        const gross = backGross + frontGross;
        const newGross = (30 / 100) * gross;
        console.log(gross, newGross);
        setVolumeBonus(newGross);
      } else if (volume === 11) {
        const gross = backGross + frontGross;
        const newGross = (32 / 100) * gross;
        console.log(gross, newGross);
        setVolumeBonus(newGross);
      } else if (volume === 12) {
        const gross = backGross + frontGross;
        const newGross = (34 / 100) * gross;
        console.log(gross, newGross);
        setVolumeBonus(newGross);
      } else if (volume === 13) {
        const gross = backGross + frontGross;
        const newGross = (36 / 100) * gross;
        console.log(gross, newGross);
        setVolumeBonus(newGross);
      } else if (volume === 14) {
        const gross = backGross + frontGross;
        const newGross = (38 / 100) * gross;
        console.log(gross, newGross);
        setVolumeBonus(newGross);
      } else if (volume >= 15) {
        const gross = backGross + frontGross;
        const newGross = (40 / 100) * gross;
        console.log(gross, newGross);
        setVolumeBonus(newGross);
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
      if (gross >= 10000 && gross <= 14999) {
        setInternetTotalBonus(400);
      } else if (gross >= 15000 && gross <= 19999) {
        setInternetTotalBonus(500);
      } else if (gross >= 20000 && gross <= 24999) {
        setInternetTotalBonus(600);
      } else if (gross >= 25000 && gross <= 29999) {
        setInternetTotalBonus(700);
      } else if (gross >= 30000 && gross <= 34999) {
        setInternetTotalBonus(1000);
      } else if (gross >= 35000 && gross <= 39999) {
        setInternetTotalBonus(1500);
      } else if (gross >= 40000) {
        setInternetTotalBonus(2000);
      }
    }

    const getFloorTotalBonus = (gross) => {
      if (gross >= 20000 && gross <= 29999) {
        setFloorTotalBonus(400);
      } else if (gross >= 30000 && gross <= 39999) {
        setFloorTotalBonus(500);
      } else if (gross >= 40000 && gross <= 49999) {
        setFloorTotalBonus(600);
      } else if (gross >= 50000 && gross <= 59999) {
        setFloorTotalBonus(700);
      } else if (gross >= 60000 && gross <= 69999) {
        setFloorTotalBonus(100);
      } else if (gross >= 70000 && gross <= 79999) {
        setFloorTotalBonus(1500);
      } else if (gross >= 80000) {
        setFloorTotalBonus(2000);
      }
    }

    const getTrackingFrontGross = (frontGross) => {
      const days = getDaysLeft();
      const trackedGross = frontGross / days.daysSold * days.sellingDays;
      setTrackingFrontGross(trackedGross);
    }

    const getTrackingBackGross = (backGross) => {
      const days = getDaysLeft();
      const trackedGross = backGross / days.daysSold * days.sellingDays;
      setTrackingBackGross(trackedGross);
    }

    const getTrackingTotalGross = (gross) => {
      const days = getDaysLeft();
      const trackedGross = gross / days.daysSold * days.sellingDays;
      setTrackingTotalGross(trackedGross);
    }

    getVolumeBonus(newSales + usedSales);
    getNewVehicleBonus(4);
    getInternetTotalBonus(10000);
    getFloorTotalBonus(20000);
    getTrackingFrontGross(frontGross);
    getTrackingBackGross(backGross);
    getTrackingTotalGross(totalGross);
  }, [])



  return (
    <div>
      <ul>
        <li>Volume Bonus: {volumeBonus}</li>
        <li>New Vehicle Bonus: {newVehicleBonus}</li>
        <li>Internet Total Bonus: {internetTotalBonus}</li>
        <li>Floor Total Bonus: {floorTotalBonus}</li>
        <li>Tracking Front Gross: {trackingFrontGross}</li>
        <li>Tracking Back Gross: {trackingBackGross}</li>
        <li>Tracking Total Gross: {trackingTotalGross}</li>
      </ul>
    </div>
  )
}

export default Tracking
