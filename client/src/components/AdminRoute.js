import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkToken } from '../utils/handleToken';
import UserContext from './UserContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(user);
    if (user.accessToken !== null) {
      checkToken(user, setUser);
      // setLoading(false);
    }
  });

  // if (loading) {
  //   return (
  //     <div>Loading...</div>
  //   )
  // }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.admin) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default AdminRoute;
