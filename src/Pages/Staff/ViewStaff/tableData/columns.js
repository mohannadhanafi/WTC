import React from 'react';
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
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    sorter: (a, b) => sort.sortNumber(a, b, 'type'),
  },
  {
    title: 'Mobile',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    sorter: (a, b) => sort.sortText(a, b, 'phoneNumber'),
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action', 
    render: (text, record) => <TableActions setData={setData} data={data} table="staff" item={record} />,
  },
];

export default columns;
