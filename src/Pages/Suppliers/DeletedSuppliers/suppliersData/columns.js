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
    title: 'Client Type',
    dataIndex: 'clientType',
    key: 'clientType',
    sorter: (a, b) => sort.sortNumber(a, b, 'clientType'),
  },
  {
    title: 'City',
    dataIndex: 'cityName',
    key: 'cityName',
    sorter: (a, b) => sort.sortText(a, b, 'cityName'),
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (text, record) => (
      <TableActions
        data={data}
        activate
        setData={setData}
        table="hotels"
        // test="hotel"
        item={record}
        deleted
      />
    ),
  },
];

export default columns;
