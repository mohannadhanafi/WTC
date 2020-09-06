import React, { useState } from 'react';
import { Divider, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import {
  DeleteOutlined as DeleteIcon, IdcardOutlined, CheckCircleTwoTone, CloseCircleOutlined,
} from '@ant-design/icons';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { API } from '../../../constants';
import RideSettings from '../RideSettings';

import './index.scss';

const TableActions = ({
  item, table, setData, activate, data, test, deleted,
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  
  return (
    deleted ? (
      <span>
        <Popconfirm
          title="Are you sure to activate?"
          onConfirm={async () => {
            await Axios.delete(`${API}/${table === 'staff' || table === 'clients' || table === 'hotels' || table === 'suppliers' ? 'users' : table}/${table === 'vehicles' ? item.driver.id : item.userId}`);
            if (table === 'staff') {
              window.location.reload();
            } else {
              const dataClone = [...data];
              const filteredArray = dataClone.filter((element) => element.id !== item.id);
              setData(filteredArray);
            }
          }}
          onCancel={() => console.log('cancel')}
          okText="Yes"
          cancelText="No"
        >
          <button type="button" className="button-popup">
            <CheckCircleTwoTone twoToneColor="#52c41a" className="table-icon__delete" />
          </button>
        </Popconfirm>
      </span>
    ) : table === 'rides' ? (
      <>
        <IdcardOutlined className="table-icon__edit ride_icon" onClick={showModal} />
        <RideSettings
          visible={visible}
          handleCancel={() => { setVisible(false); }}
        />
      </>
    )
      : (
        <span>
          {activate ? (
            <>
              <Popconfirm
                title={`Are you sure you want to ${item.user.activated ? 'deactivate' : 'activate'} this client account?`}
                onConfirm={async () => {
                  const dataClone = [...data];
                  const finalArray = dataClone.map((element) => (
                    (element.id === item.id)
                      ? ({ ...element, user: { ...element.user, activated: !element.user.activated } })
                      : element));
                  await Axios.put(`${API}/users/${item.user.id}/active`, {
                    activated: !item.user.activated,
                  });
                  setData(finalArray);
                }}
                onCancel={() => console.log('cancel')}
                okText="Yes"
                cancelText="No"
              >
                <button type="button" className="button-popup">
                  {item.user.activated ? (
                    <CloseCircleOutlined className="table-icon__delete" />
                  ) : (
                    <CheckCircleTwoTone twoToneColor="#52c41a" className="table-icon__delete" />
                  )}
                </button>
              </Popconfirm>
              <Divider type="vertical" />
            </>
          ) : null}
          <Link to={`/${test || (table === 'staff' ? (item.user && item.user.userType === 6 ? 'staff/driver' : 'staff/profession') : table)}/${item.id || item.key}`}><IdcardOutlined className="table-icon__edit" /></Link>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={async () => {
              await Axios.delete(`${API}/${table === 'staff' || table === 'clients' || table === 'hotels' || table === 'suppliers' ? 'users' : table}/${table === 'vehicles' ? item.driver.id : table === 'homeNews' ? item.id : item.userId}`);
              if (table === 'staff') {
                window.location.reload();
              } else {
                const dataClone = [...data];
                const filteredArray = dataClone.filter((element) => element.id !== item.id);
                setData(filteredArray);
              }
            }}
            onCancel={() => console.log('cancel')}
            okText="Yes"
            cancelText="No"
          >
            <button type="button" className="button-popup">
              <DeleteIcon className="table-icon__delete" />
            </button>
          </Popconfirm>
        </span>
      )
  );
};

TableActions.propTypes = {
  item: PropTypes.arrayOf(PropTypes.object).isRequired,
  table: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

TableActions.defaultProps = {
  active: false,
};

export default TableActions;
