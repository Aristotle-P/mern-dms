import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkToken } from '../utils/handleToken';
import UserContext from './UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    checkToken(user, setUser);
  });
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.accessToken) {
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

export default ProtectedRoute;
