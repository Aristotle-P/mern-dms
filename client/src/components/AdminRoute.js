import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkToken } from '../utils/handleToken';
import UserContext from './UserContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    checkToken(user, setUser);
  });
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
