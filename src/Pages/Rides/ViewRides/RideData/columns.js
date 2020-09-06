import React from 'react';
import { Tag } from 'antd';
import { v4 as uuid } from 'uuid';
import sort from '../../../../utils/SortTable';
import TableActions from '../../../../Components/shared/TableActions';

const columns = (data, setData) => [
  {
    title: 'Pick',
    dataIndex: 'ridePick',
    key: 'ridePick',
    sorter: (a, b) => sort.sortText(a, b, 'ridePick'),
  },
  {
    title: 'Drop',
    dataIndex: 'rideDrop',
    key: 'rideDrop',
    sorter: (a, b) => sort.sortNumber(a, b, 'rideDrop'),
  },
  {
    title: 'Price',
    dataIndex: 'ridePrice',
    key: 'ridePrice',
    sorter: (a, b) => sort.sortText(a, b, 'ridePrice'),
  },
  {
    title: 'Status',
    key: 'rideStatus',
    dataIndex: 'rideStatus',
    render: (status) => {
      const color = status ? 'green' : 'volcano';
      return (
        <Tag color={color} key={uuid()}>
          {status}
        </Tag>
      );
    },
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (text, record) => (
      <TableActions
        data={data}
        setData={setData}
        table="rides"
        item={record}
      />
    ),
  },
];

export default columns;
