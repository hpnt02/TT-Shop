import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faKeyboard,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import styles from './Header.module.scss';

import Menu from '~/components/Popper/Menu';
import 'tippy.js/dist/tippy.css';

import Image from '~/components/Image';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/components/createInstance';
import { logoutSuccess } from '~/redux/model/Login';
import { logOut } from '~/redux/API/api';
import { useNavigate } from 'react-router-dom';
import { set } from '~/redux/model/Menu';
const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
    {
        type:'logOut',
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
    },
];



function Header({onClick}) {
    const currentUser = true;
    const user = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let axiosJWT = createAxios(user, dispatch, logoutSuccess)
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'logOut':
               logOut(dispatch, navigate,user?._id,user?.accessToken, axiosJWT)
                break;
            default:
            //
        }
    };
    const sidebarShow = useSelector((state) => state.menu.sidebarShow);
    const toggleSidebar = () => {
        dispatch(set({ sidebarShow: !sidebarShow }));
        onClick(!sidebarShow)
    };

    useEffect(() => {
        if (!user) {
          navigate("/login");
        }
      }, [navigate, user,  ])

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('actions')}>
                    <div>
                    <div
            type="button"
            onClick={toggleSidebar}
            style={{fontSize:'30px', cursor:'pointer'}}
        >
            {
                sidebarShow? 
                <FontAwesomeIcon icon={faCircleArrowRight} />:
                <FontAwesomeIcon icon={faCircleArrowLeft} />
            }
        </div>
        </div>
                <div className={cx('infor-user')}>
                        <span className={cx('infor-header')}>
                            <h3>Chào:</h3>
                            {user?.NhanVien?.HoTenNV}
                        </span>
                  
                    <Menu items={ MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                src="https://yt3.ggpht.com/9jurVVNOCODi2d0iQ2PjArxFch-4W9COz4AijUR1Qq44AQUhcaB3XAd093IkD37YFaL6feFgYg=s48-c-k-c0x00ffffff-no-rj"
                                className={cx('user-avatar')}
                                alt="Loi"
                                // fallback=''
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
