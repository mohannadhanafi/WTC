import React, { useState, Suspense, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import {
  UserOutlined, CarFilled, HomeFilled, HomeOutlined, FileProtectOutlined,
} from '@ant-design/icons';
import Routes from '../../Routes/main';
import DashboardHeader from '../shared/DashboardHeader';
import SuspenseFallback from '../shared/SuspenseFallback';
import logo from '../../assets/logo.png';

import './index.scss';

const {
  Content, Sider,
} = Layout;

const AppLayout = () => {
  const { userData: { userType } } = useSelector((state) => state.userData);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('1');

  const onCollapse = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  const onChangeItem = ({ key }) => {
    setActiveItem(key);
  };

  useEffect(() => {
    const { pathname } = window.location;
    switch (pathname) {
      case '/staff':
        setActiveItem('1');
        break;
      case '/vehicles':
        setActiveItem('2');
        break;
      case '/hotels':
        setActiveItem('3');
        break;
      case '/corporates':
        setActiveItem('4');
        break;
      case '/suppliers':
        setActiveItem('5');
        break;
      case '/homeNews':
        setActiveItem('6');
        break;
      case '/rides':
        setActiveItem('7');
        break;
      default:
        setActiveItem('1');
    }
  }, []);
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          collapsible
          collapsed={isCollapsed}
          onCollapse={onCollapse}
        >
          <div className="logo-wrapper">
            <img className="logo-image" src={logo} alt="logo" />
          </div>
          <Menu theme="dark" onClick={onChangeItem} selectedKeys={[activeItem]} defaultSelectedKeys={['1']} mode="inline">
            {(userType === '3' || userType === '4' || userType === '5') ? (
              <Menu.Item key="7" icon={<CarFilled />}>
                <Link to="/rides">Rides</Link>
              </Menu.Item>
            ) : null}
            {(userType === '3' || userType === '4' || userType === '5') ? null : (
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/staff">Staff</Link>
              </Menu.Item>
            )}
            {(userType === '3' || userType === '4' || userType === '5') ? null : (
              <Menu.Item key="2" icon={<CarFilled />}>
                <Link to="/vehicles">Vehicle</Link>
              </Menu.Item>
            ) }
            {(userType === '1' || userType === '9') && (
              <Menu.Item key="3" icon={<HomeFilled />}>
                <Link to="/hotels">Hotels</Link>
              </Menu.Item>
            )}
            {(userType === '1' || userType === '9') && (
              <Menu.Item key="4" icon={<UserOutlined />}>
                <Link to="/corporates">Corporate</Link>
              </Menu.Item>
            )}
            {(userType === '1' || userType === '9') && (
              <Menu.Item key="5" icon={<UserOutlined />}>
                <Link to="/suppliers">Suppliers</Link>
              </Menu.Item>
            )}
            {(userType === '1' || userType === '9') && (
              <Menu.Item key="6" icon={<HomeOutlined />}>
                <Link to="/homeNews">Home Slider</Link>
              </Menu.Item>
            )}
            {(userType === '1' || userType === '9') && (
              <Menu.Item key="7" icon={<FileProtectOutlined />}>
                <Link to="/edit-policy">Policy</Link>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <DashboardHeader />
          <Content>
            <Suspense fallback={<SuspenseFallback />}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Routes />
              </div>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default AppLayout;
