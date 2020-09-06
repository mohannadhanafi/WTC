import React from 'react';
import sort from '../../../../utils/SortTable';
import TableActions from '../../../../Components/shared/TableActions';

const columns = (setData, data) => [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => sort.sortText(a, b, 'title'),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    sorter: (a, b) => sort.sortText(a, b, 'description'),
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (text, record) => (
      <TableActions
        data={data}
        setData={setData}
        table="homeNews"
        item={record}
      />
    ),
  },
];

export default columns;
