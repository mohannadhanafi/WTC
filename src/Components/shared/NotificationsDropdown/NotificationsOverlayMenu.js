import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { Spin } from 'antd';

const NotificationsOverlayMenu = ({ items, handleInfiniteOnLoad }) => (
  <div className="infinite-scroll-wrapper">
    <InfiniteScroll
      loader={<Spin spinning />}
      initialLoad={false}
      pageStart={0}
      useWindow={false}
      loadMore={handleInfiniteOnLoad}
      className="notifications-items"
      hasMore
      threshold={80}
    >
      {
        items.map((item, i) => (
          <div className="notifications-item" key={`${i * 20}`}>
            {item.email}
          </div>
        ))
      }
    </InfiniteScroll>
  </div>
);

NotificationsOverlayMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleInfiniteOnLoad: PropTypes.func.isRequired,
};

export default NotificationsOverlayMenu;
