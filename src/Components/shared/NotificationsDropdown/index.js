import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Popover, Badge } from 'antd';
import { BellFilled } from '@ant-design/icons';
import NotificationsOverlayMenu from './NotificationsOverlayMenu';

import './index.scss';

const NotificationsDropdown = () => {
  const [items, setItems] = useState([]);

  const getItems = async (loadMoreCallback) => {
    const response = await axios.get('https://randomuser.me/api/?results=10&inc=email', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.data;

    if (loadMoreCallback) {
      loadMoreCallback(data.results);
    } else {
      setItems(data.results);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleInfiniteOnLoad = () => {
    getItems((results) => {
      const newItems = [...items, ...results];
      setItems(newItems);
    });
  };

  return (
    <Popover
      content={(
        <NotificationsOverlayMenu
          items={items}
          handleInfiniteOnLoad={handleInfiniteOnLoad}
        />
      )}
      trigger="click"
      placement="bottomLeft"
      className="notifications-popover"
      overlayClassName="notifications-popover-overlay"
    >
      <Badge count={items.length}>
        <BellFilled />
      </Badge>
    </Popover>
  );
};

export default NotificationsDropdown;
