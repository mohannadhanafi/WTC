import React from 'react';
import { Tag } from 'antd';
import { v4 as uuid } from 'uuid';
import sort from '../../../../utils/SortTable';
import TableActions from '../../../../Components/shared/TableActions';

const columns = (setData, data) => [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: (a, b) => sort.sortText(a, b, 'firstName'),
  },
  {
    title: 'Supplier Type',
    dataIndex: 'supplierType',
    key: 'supplierType',
    sorter: (a, b) => sort.sortNumber(a, b, 'supplierType'),
  },
  {
    title: 'City',
    dataIndex: 'cityName',
    key: 'cityName',
    sorter: (a, b) => sort.sortText(a, b, 'cityName'),
  },
  {
    title: 'Country',
    dataIndex: 'countryName',
    key: 'countryName',
    sorter: (a, b) => sort.sortText(a, b, 'countryName'),
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status) => {
      const color = status ? 'green' : 'volcano';
      return (
        <Tag color={color} key={uuid()}>
          {status ? 'Active' : 'Inactive'}
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
        table="suppliers"
        item={record}
        activate
      />
    ),
  },
];

export default columns;
