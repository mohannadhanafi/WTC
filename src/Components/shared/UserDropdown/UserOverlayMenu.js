import React from 'react';
import {
  Menu, notification, Button, Divider,
} from 'antd';
import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';

const logOut = async (push) => {
  try {
    await Auth.signOut();
    push('/');
    window.location.reload();
  } catch (error) {
    notification.error({ message: error.message, duration: 2 });
  }
};

const UserOverlayMenu = () => {
  const { userData: { name } } = useSelector((state) => state.userData);
  const { push } = useHistory();
  return (
    <Menu>
      {/* <Menu.Item key="0">
        <Link to="/">
          Welcome
          {' '}
          {name}
        </Link>
      </Menu.Item>
      <Divider style={{ margin: '5px 0' }} /> */}
      <Menu.Item key="1">
        <Button onClick={() => logOut(push)}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default UserOverlayMenu;
