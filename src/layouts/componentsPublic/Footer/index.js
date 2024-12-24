
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import MenuItem from './MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faRectangleList, faTruck } from '@fortawesome/free-solid-svg-icons';
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
                    <ListItem title='hướng dẫn tìm kiếm sản phẩm'/>
                    <ListItem title='Hướng dẫn thanh toán'/>

                </MenuItem>
                <MenuItem title='Vị trí của cửa hàng' icon={<FontAwesomeIcon icon={faLocationDot}/>}>
                    <iframe title='Vị trí của cửa hàng' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.3065140733843!2d109.18039597371862!3d12.227513330757551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31705d8b710032bb%3A0x199ef0e695e8f54b!2zNjAwIEzDqiBI4buTbmcgUGhvbmcsIFBoxrDhu5tjIEjhuqNpLCBOaGEgVHJhbmcsIEtow6FuaCBIw7JhLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1734259792503!5m2!1svi!2s" width="100%" height="300" style={{border: '0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </MenuItem>
               
            </div>
        </div>
     );
}

export default Footer;