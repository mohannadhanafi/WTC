import React from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const TableRow = ({ row }) => (
  <tr>
    <td>{row.cell1}</td>
    <td className="align-center">{row.cell2 ? <CheckOutlined /> : <CloseOutlined />}</td>
    <td className="align-center">{row.cell3 ? <CheckOutlined /> : <CloseOutlined />}</td>
    <td>{row.cell4}</td>
  </tr>
);

TableRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    cell1: PropTypes.string.isRequired,
    cell2: PropTypes.bool.isRequired,
    cell3: PropTypes.bool.isRequired,
    cell4: PropTypes.string.isRequired,
  }).isRequired,
};

export default TableRow;
