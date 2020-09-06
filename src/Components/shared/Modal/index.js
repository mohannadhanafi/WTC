import React from 'react';
import { Modal, Button } from 'antd';


export default function ModalComp({ visible, children, title }) {
  return (
    <Modal
      visible={visible}
      title={title || 'title'}
      footer={null}
    >
      {children}
    </Modal>
  );
}
