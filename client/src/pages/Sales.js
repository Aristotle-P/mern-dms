import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import UserContext from '../components/UserContext';
import Sale from '../components/Sale';

const Sales = () => {
  const { user } = useContext(UserContext);
  const [sales, setSales] = useState();
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
    frontGross += sale.frontGross / 100;
  });

  let backGross = 0;
  sales.forEach((sale) => {
    backGross += sale.backGross / 100;
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
    if (volume === 4) {
      console.log('400');
    } else if (volume === 5) {
      console.log('500');
    } else if (volume === 6) {
      console.log('600');
    } else if (volume === 7) {
      console.log('700');
    } else if (volume === 8) {
      console.log('800');
    } else if (volume === 9) {
      console.log('900');
    } else if (volume === 10) {
      console.log('1000');
    } else if (volume === 12) {
      console.log('1200');
    } else if (volume === 14) {
      console.log('1500');
    }
  };

  const getInternetTotalBonus = (gross) => {
    if (gross >= 10000 && gross <= 14999) {
      console.log('400');
    } else if (gross >= 15000 && gross <= 19999) {
      console.log('500');
    } else if (gross >= 20000 && gross <= 24999) {
      console.log('600');
    } else if (gross >= 25000 && gross <= 29999) {
      console.log('700');
    } else if (gross >= 30000 && gross <= 34999) {
      console.log('1000');
    } else if (gross >= 35000 && gross <= 39999) {
      console.log('1500');
    } else if (gross >= 40000) {
      console.log('2000');
    }
  }

  const getFloorTotalBonus = (gross) => {
    if (gross >= 20000 && gross <= 29999) {
      console.log('400');
    } else if (gross >= 30000 && gross <= 39999) {
      console.log('500');
    } else if (gross >= 40000 && gross <= 49999) {
      console.log('600');
    } else if (gross >= 50000 && gross <= 59999) {
      console.log('700');
    } else if (gross >= 60000 && gross <= 69999) {
      console.log('1000');
    } else if (gross >= 70000 && gross <= 79999) {
      console.log('1500');
    } else if (gross >= 80000) {
      console.log('2000');
    }
  }

  const getTrackingFrontGross = (frontGross) => {

  }

  getVolumeBonus(newSales + usedSales);
  getNewVehicleBonus(newSales);
  getInternetTotalBonus(frontGross + backGross);
  getFloorTotalBonus(frontGross + backGross);

  return (
    <div>
      <li>Total New Sales: {newSales}</li>
      <li>Total Used Sales: {usedSales}</li>
      {salesMarkup}
      <div></div>
    </div>
  );
};

export default Sales;
