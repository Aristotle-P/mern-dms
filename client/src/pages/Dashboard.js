import React from 'react';

const Dashboard = (props) => {
  return (
    <div>
      <h1>Hello World!</h1>
      <button onClick={props.handleSubmit}>Hi</button>
    </div>
  );
};

export default Dashboard;
