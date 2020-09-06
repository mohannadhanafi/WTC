import React from 'react';
import { Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import UserOverlayMenu from './UserOverlayMenu';

const UserDropdown = () => (
  <Dropdown
    overlay={<UserOverlayMenu />}
    trigger={['click']}
    placement="bottomLeft"
    className="user-dropdown"
    overlayClassName="user-dropdown-overlay"
  >
    <MenuOutlined />
  </Dropdown>
);

export default UserDropdown;
