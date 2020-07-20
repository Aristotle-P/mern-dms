import React, { useState, useEffect } from 'react';

const Dashboard = (props) => {
  const [state, setState] = useState();
  const obj = [
    {
      name: 'Sully',
    },
    {
      name: 'Vinny',
    },
    {
      name: 'Ryan',
    },
    {
      name: 'John',
    },
  ];

  useEffect(() => {
    setState(obj);
  }, []);

  console.log(state);

  return (
    <div>
      <h1>Hello World!</h1>
      {/* <ul>{markup}</ul> */}
    </div>
  );
};

export default Dashboard;
