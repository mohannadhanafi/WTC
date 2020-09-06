import React from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import NotificationsDropdown from '../NotificationsDropdown';
import UserDropdown from '../UserDropdown';

import './index.scss';

const { Header } = Layout;

const DashboardHeader = () => {
  const { userData: { name } } = useSelector((state) => state.userData);
  return (
    <Header className="dashboard-header">
      <ul className="dashboard-header__menu">
        <li className="dashboard-header__menu-item" style={{ color: '#FFF' }}>
          Welcome
          {' '}
          {name}
        </li>
        <li className="dashboard-header__menu-item">
          <NotificationsDropdown />
        </li>
        <li className="dashboard-header__menu-item">
          <UserDropdown />
        </li>
      </ul>
    </Header>
  );
};

export default DashboardHeader;
