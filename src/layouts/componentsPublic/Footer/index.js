
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import MenuItem from './MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPhone, faRectangleList, faTruck } from '@fortawesome/free-solid-svg-icons';
import ListItem from './MenuItem/ListItem';

const cx = classNames.bind(styles);
function Footer() {
    return ( 
        <div className={cx('footer')}>
            <div className={cx('layout-footer')}>
                <MenuItem title='Thông tin liên hệ' icon={<FontAwesomeIcon icon={faPhone}/>}>
                        <ListItem title='600 Lê Hồng Phong, phường Phước Hải, thành phố Nha Trang, tỉnh Khánh Hòa'/>
                        <ListItem title='0585484521'/>
                        <ListItem title='hpnt02@gmail.com'/>
                </MenuItem>
                <MenuItem title='Chính sách' icon={<FontAwesomeIcon icon={faTruck}/>}>
                        <ListItem title='Chính sách mua hàng'/>
                        <ListItem title='Chính sách đổi trả'/>
                </MenuItem>
                <MenuItem title='Hướng dẫn khách hàng' icon={<FontAwesomeIcon icon={faRectangleList}/>}>
                    <ListItem title='Hướng dẫn tìm kiếm sản phẩm'/>
                    <ListItem title='Hướng dẫn thanh toán'/>
                </MenuItem>
            </div>
        </div>
     );
}

export default Footer;