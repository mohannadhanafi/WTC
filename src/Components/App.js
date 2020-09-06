import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Spin } from 'antd';
import AppLayout from './AppLayout';
import NotAuthorized from '../Routes/notAuthorized';

import './App.scss';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkIfUserLoggedIn = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkIfUserLoggedIn();
  }, []);

  return (
    <div className="app">
      {isLoading
        ? <Spin spinning />
        : isLoggedIn
          ? <AppLayout />
          : <NotAuthorized />}
    </div>
  );
};

export default App;
