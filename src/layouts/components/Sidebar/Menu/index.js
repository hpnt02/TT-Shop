import React from 'react';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';


// eslint-disable-next-line no-unused-vars
const cx = classNames.bind(styles);

const items = [
    {
        key: '1',
        label: 'Trang Chủ',
        icon: <AppstoreOutlined />,
    },
    {
        key: '2',
        label: 'Quản lý nhân viên',
        icon: <AppstoreOutlined />,
    },
    {
        key: '3',
        label: 'Quản lý sản phẩm',
        icon: <AppstoreOutlined />,
    },
    {
        key: '4',
        label: 'Danh sách nhà cung cấp',
        icon: <AppstoreOutlined />,
    },

    {
        key: '5',
        label: 'Quản lý đơn hàng',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: '6',
                label: 'Đơn hàng chưa giao',
            },
            {
                key: '7',
                label: 'Đơn hàng đã giao',
            },
            {
                key: '9',
                label: 'Đơn hàng đã hủy',
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: '8',
        label: 'Danh sách khách hàng',
        icon: <SettingOutlined />,
    },
];

function MenuItem({menu}) {
  
    const navigate = useNavigate();
    const onClick = (e) => {
        if (e.key === '1') {
            navigate(config.routes.homeAdmin);
        }
        else if (e.key === '2') {
            navigate(config.routes.qlnv);
        } else if(e.key === '3'){
            navigate(config.routes.qlsp);
        }else if(e.key === '6'){
            const id = '1'
            navigate(config.routes.qldh,{ state: { id } });
        }else if(e.key === '7'){
            const id = '2'
            navigate(config.routes.qldh,{ state: { id } });
        }else if(e.key === '9'){
            const id = '3'
            navigate(config.routes.qldh,{ state: { id } });
        }
        else if(e.key === '8'){
            navigate( config.routes.qlkh);
        }


        if (e) {
            localStorage.setItem('lastRoute', e.key); // Lưu đường dẫn vào localStorage
        }
    };

    const savedRoute = localStorage.getItem('lastRoute');
   
    return (
            <Menu
                onClick={onClick}
                defaultSelectedKeys={[`${savedRoute}`]}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                style={{backgroundColor:'#212631'}}
                items={items}
            />
          
    );
}
export default MenuItem;
