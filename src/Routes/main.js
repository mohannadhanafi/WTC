import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/Actions/userData';
import {
  mainRoutes,
  adminAndSuperAfminRoutes,
  lastRoutes,
  hotelAndCorporateRoutes,
} from './mainRoutes';


const Main = () => {
  Auth.currentSession().then((res) => {
    const jwt = res.getAccessToken().getJwtToken();
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  });
  const { userData: { userType } } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.currentSession().then((res) => {
      const { payload } = res.idToken;
      const userData = {
        name: payload.name,
        userType: payload['custom:user_type'],
      };
      dispatch(setUserData(userData));
    });
  }, []);

  const renderRoutes = () => {
    let routes = mainRoutes;

    if (userType === '1' || userType === '9') {
      routes = [...routes, ...adminAndSuperAfminRoutes];
    } else if (userType === '3' || userType === '4' || userType === '5') {
      routes = [...routes, ...hotelAndCorporateRoutes];
    }

    routes = [...routes, ...lastRoutes];

    const routesComponents = routes.map((route) => {
      if (!route.component) {
        return (
          <Route path={route.path}>
            <Redirect to={route.to} />
          </Route>
        );
      }

      return (
        <Route exact path={route.path} component={route.component} />
      );
    });

    return routesComponents;
  };

  if (!userType) return <Spin spinning />;

  return (
    <Switch>
      {renderRoutes()}
    </Switch>
  );
};

export default Main;
