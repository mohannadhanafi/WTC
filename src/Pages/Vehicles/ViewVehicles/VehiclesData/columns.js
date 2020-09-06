import React from 'react';
import sort from '../../../../utils/SortTable';
import TableActions from '../../../../Components/shared/TableActions';

const columns = (setData, data) => [
  {
    title: 'Vehicle Name',
    dataIndex: 'vehicleName1',
    key: 'vehicleName1',
    sorter: (a, b) => sort.sortText(a, b, 'vehicleName1'),
  },
  {
    title: 'Vehicle Color',
    dataIndex: 'vehicleColor1',
    key: 'vehicleColor1',
    sorter: (a, b) => sort.sortText(a, b, 'vehicleColor1'),
  },
  {
    title: 'Car Owner',
    dataIndex: 'carOwner',
    key: 'carOwner',
    sorter: (a, b) => sort.sortText(a, b, 'carOwner'),
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (text, record) => (
      <TableActions
        data={data}
        setData={setData}
        table="vehicles"
        item={record}
      />
    ),
  },
];

export default columns;
