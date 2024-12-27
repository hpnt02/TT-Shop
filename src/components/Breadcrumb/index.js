import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from './Breadcrumb.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function BreadcrumbMenu() {
    const location = useLocation();

    const [pathnames, setPathnames] = useState(['/']);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (location.pathname !== pathnames[currentIndex]) {
            setPathnames((prevPathnames) => [...prevPathnames, location.pathname]);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    }, [location.pathname, pathnames, currentIndex]);
    console.log("pathnames",pathnames)
    const result = pathnames
        .slice(1)
        .map((item) => {
            if (item === config.routes.home) {
                return { title: 'Home', to: config.routes.home };
            } else if (item === config.routes.dssp) {
                return { title: 'Sản phẩm', to: config.routes.dssp };
            }else if(item === config.routes.ttsp) {
                return { title: 'Thông tin sản phẩm', to: config.routes.ttsp };
            }else if(item === config.routes.giohang) {
                return { title: 'Giỏ hàng', to: config.routes.giohang };
            }
            return null; // Hoặc có thể xử lý trường hợp khác
        })
        .filter(Boolean); // Loại bỏ các giá trị null nếu có

    return (
        <div className={cx('breadcrumb')}>
            <NavLink to={config.routes.home}>
                <FontAwesomeIcon icon={faHome} style={{ paddingRight: '5px' }} />
                Home 
            </NavLink>
            <span><FontAwesomeIcon icon={faChevronRight}/></span>
            {result.map((item, index) => {
                const isActive = location.pathname === item.to;
                return (
                    <NavLink to={item.to} key={index} className={cx('breadcrumb-item', { disabled: isActive })}>
                        {item.title} {isActive ? ' ' : '>'}
                    </NavLink>
                );
            })}
        </div>
    );
}
export default BreadcrumbMenu;
