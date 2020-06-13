import React, { useState } from 'react';
import axios from 'axios';

const VinSearch = () => {
  const [search, setSearch] = useState('');
  const [vehicle, setVehicle] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${search}?format=json`
    );

    setVehicle(res);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="stockNumber"
          id="stockNumber"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default VinSearch;
