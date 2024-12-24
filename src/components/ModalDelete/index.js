import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';

import classNames from 'classnames/bind';
import styles from './ModalDelete.module.scss';

const cx = classNames.bind(styles);
const { confirm } = Modal;

function ModalDelete({label, onClick, data}) {
   
    const showDeleteConfirm = () => {
        confirm({
            title: `Bạn có muốn xóa ${label} này không`,
            icon: <ExclamationCircleFilled />,
            content: `${data.length} - ${label} sẽ được xóa`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                onClick(data);
            },
           
        });
    };
    return (
        <Space wrap>
          
            <Button onClick={showDeleteConfirm}  disabled={data.length <= 0} className={cx('btn')}>
                Delete
            </Button>
        </Space>
    );
}
export default ModalDelete;
