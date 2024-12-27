import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faCartShopping,
    faChevronDown,
    faEarthAsia,
    faHome,
    faKeyboard,
    faSignOut,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';

import MenuCustom from '~/components/Popper/Menu';
import 'tippy.js/dist/tippy.css';

import Image from '~/components/Image';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/components/createInstance';
import { logoutSuccess } from '~/redux/model/Login';
import { Account, ChiTietHoaDon, logOut } from '~/redux/API/api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown, Space, Badge, Menu } from 'antd';
import config from '~/config';
import Search from '../Search';
import { ExtraLarge, Small, TabletAndDestop, XSmall } from '~/components/Responsive';
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
        type: 'lsdh',
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Lịch sử đơn hàng',
    },
    {
        type: 'logOut',
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
    },
];

const MENU_USER = [
    {
        type: 'Login',
        title: 'Đăng nhập',
        icon: <FontAwesomeIcon icon={faSignOut} />,
    },

    {
        type: 'Register',
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng ký',
    },
];

function Header() {
    const user = useSelector((state) => state.auth?.login?.currentUser);

    const chitiethoadon = useSelector((state) => state.chitiethoadon?.chitiethoadon?.chitiethoadon) || [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const newGiohang =
        chitiethoadon.filter((state) => state.KhachHang === user?.KhachHang?._id && state.IDHoaDon === null) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const item = user ? MENU_ITEMS : MENU_USER;

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'logOut':
                logOut(dispatch, navigate, user?._id, user?.accessToken, axiosJWT);
                break;
            case 'lsdh':
                navigate(config.routes.lsdh);
                break;
            case 'Login':
                if (window.location.href !== "http://localhost:3000/login") {
                    // Lấy địa chỉ hiện tại nếu không ở trang login
                    const currentPathname = window.location.pathname;
                    localStorage.setItem('http', currentPathname)
                } else {
                    console.log("Không lấy địa chỉ hiện tại vì đang ở trang login.");
                }
                navigate(config.routes.login, { state: { id: true } });
                break;
            case 'Register':
                if (window.location.href !== "http://localhost:3000/login") {
                    // Lấy địa chỉ hiện tại nếu không ở trang login
                 const currentPathname = window.location.pathname;
               localStorage.setItem('http', currentPathname)
                } else {
                    console.log("Không lấy địa chỉ hiện tại vì đang ở trang login.");
                }
                navigate(config.routes.login, { state: { id: false } });
                break;
            default:
            //
        }
    };

    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const items = [
        {
            key: '1',
            label: 'Sản phẩm mới nhất',
            onClick: () => navigate(config.routes.login), // Chuyển hướng mà không mở tab mới
        },
        {
            key: '2',
            label: 'Sản phẩm bán chạy nhất',
        },
    ];

    //REsponsive
    const itemsMenu = [
        {
            key: 'sub1',
            label: 'Trang chủ',
        },
        {
            key: 'sub6',
            label: 'Giới thiệu',
        },
        {
            key: 'sub2',
            label: 'Sản phẩm',
        },
        {
            key: 'sub4',
            label: 'Chương trình khuyến mãi',
        },
        {
            key: 'sub5',
            label: 'Góp ý',
        },
    ];

    const handleCartShopping = () => {
        navigate(config.routes.giohang);
    };
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 250);
    }, [location]); // Chạy lại khi location thay đổi

    const sidebarShow = useSelector((state) => state.menu.sidebarShow);
    const toggleSidebar = () => {
        dispatch(set({ sidebarShow: !sidebarShow }));
    };

    //handle onClick menu Mobile
    const onClickMenu = (e) => {
        switch (e.key) {
            case 'sub1':
                navigate(config.routes.home);
                dispatch(set({ sidebarShow: !sidebarShow }));
                break;
            case 'sub6':
                console.log('Clicked on Giới thiệu');
                break;
            case 'sub2':
                navigate(config.routes.dssp);
                dispatch(set({ sidebarShow: !sidebarShow }));
                break;
            case '5':
                console.log('Clicked on Sản phẩm mới nhất');
                break;
            case '6':
                console.log('Clicked on Sản phẩm bán chạy nhất');
                break;
            case 'sub4':
                console.log('Clicked on Chương trình khuyến mãi');
                break;
            case 'sub5':
                console.log('Clicked on Góp ý');
                break;
            default:
                console.log('Unknown item');
        }
    };
    


    useEffect(() => {
        Account(dispatch);
        ChiTietHoaDon(dispatch);
    }, [dispatch]);

    return (
        <>
            {/* Giao diện màn hình >=1200px */}
            <ExtraLarge>
                <header className={cx('wrapper', 'active', `${isScrolled ? 'showMenu' : ''}`)}>
                    <div className={cx('inner')}>
                        <div className={cx('header-logo')}>
                            <Link to={config.routes.home}>
                                <img
                                    style={{ height: '100%', padding: '5px 0' }}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730030954/final_x4gecu.png"
                                    alt="Ảnh lỗi"
                                />
                            </Link>
                        </div>
                        <div className={cx('header-left')}>
                            <Link to={config.routes.home} className={cx('header-menu', 'header-icon')}>
                                <FontAwesomeIcon icon={faHome} />
                            </Link>
                            <div className={cx('header-menu')} onClick={(e) => e.preventDefault()}>
                                <Space>Giới thiệu</Space>
                            </div>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                            >
                                <Link to={config.routes.dssp} className={cx('header-menu')}>
                                    <Space>
                                        Sản phẩm
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </Space>
                                </Link>
                            </Dropdown>
                            <div className={cx('header-menu')} onClick={(e) => e.preventDefault()}>
                                <Space>Chương trình khuyến mãi</Space>
                            </div>
                        </div>
                        <div className={cx('infor-user')}>
                            <Search />
                            <div className={cx('header-menu')} onClick={(e) => e.preventDefault()}>
                                <Space>Góp ý</Space>
                            </div>
                            <div className={cx('header-icon', 'header-menu')}>
                                <Badge
                                    count={newGiohang.length > 0 ? newGiohang.length : ''}
                                    onClick={handleCartShopping}
                                    style={{ width: '30px', right: '-8px' }}
                                >
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </Badge>
                            </div>
                            <MenuCustom items={item} onChange={handleMenuChange}>
                                <Image
                                    src="data:image/png;base64,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"
                                    className={cx('user-avatar')}
                                    alt="Loi"
                                    // fallback=''
                                />
                            </MenuCustom>
                        </div>
                    </div>
                </header>
            </ExtraLarge>
            {/* ============================================ */}
            <TabletAndDestop>
                <>
                    <header className={cx('wrapper', 'wrapper-mobile')}>
                        <div className={cx('inner')}>
                            <div className={cx('header-search')}>
                                <Search />
                            </div>
                            <div className={cx('header-left', 'header-left-mobile')}>
                                <div className={cx('header-icon')} onClick={toggleSidebar}>
                                    {sidebarShow ? (
                                        <FontAwesomeIcon icon={faBars} />
                                    ) : (
                                        <FontAwesomeIcon icon={faXmark} />
                                    )}
                                </div>
                                <a href={config.routes.home}>
                                    <img
                                        style={{ height: '100%', padding: '5px 0' }}
                                        src="https://res.cloudinary.com/di56pogid/image/upload/v1730030954/final_x4gecu.png"
                                        alt="Ảnh lỗi"
                                    />
                                </a>
                            </div>
                            <div className={cx('infor-user', 'infor-user-mobile')}>
                                <div className={cx('header-icon', 'header-menu', 'header-icon-mobile')}>
                                    <Badge
                                        count={newGiohang.length > 0 ? newGiohang.length : ''}
                                        onClick={handleCartShopping}
                                        style={{ width: '30px', right: '-8px' }}
                                    >
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </Badge>
                                </div>
                                <MenuCustom items={item} onChange={handleMenuChange}>
                                    <Image
                                        src="data:image/png;base64,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"
                                        className={cx('user-avatar')}
                                        alt="Loi"
                                        // fallback=''
                                    />
                                </MenuCustom>
                            </div>
                        </div>
                    </header>
                    {!sidebarShow ? (
                        <div className={cx('modal')}>
                            <div className={cx('menu')}>
                                <Menu
                                    onClick={onClickMenu}
                                    style={{
                                        width: 300,
                                    }}
                                    mode="inline"
                                    items={itemsMenu}
                                />
                            </div>
                        </div>
                    ) : null}
                </>
            </TabletAndDestop>
             {/* ******************Giao diện Medium*********************  */}
             <Small>
                <>
                    <header className={cx('wrapper','wrapper-small')}>
                        <div className={cx('inner')}>
                        <div className={cx('header-logo')}>
                            <a href={config.routes.home}>
                                <img
                                    style={{ height: '100%', padding: '5px 0' }}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730030954/final_x4gecu.png"
                                    alt="Ảnh lỗi"
                                />
                            </a>
                        </div>
                            <div className={cx('header-left', 'header-left-mobile')}>
                                <div className={cx('header-icon')} onClick={toggleSidebar}>
                                    {sidebarShow ? (
                                        <FontAwesomeIcon icon={faBars} />
                                    ) : (
                                        <FontAwesomeIcon icon={faXmark} />
                                    )}
                                </div>
                               
                            </div>
                            <div className={cx('infor-user', 'infor-user-mobile')}>
                                <div className={cx('header-icon', 'header-menu', 'header-icon-mobile')}>
                                    <Badge
                                        count={newGiohang.length > 0 ? newGiohang.length : ''}
                                        onClick={handleCartShopping}
                                        style={{ width: '30px', right: '-8px' }}
                                    >
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </Badge>
                                </div>
                                <MenuCustom items={item} onChange={handleMenuChange}>
                                    <Image
                                        src="data:image/png;base64,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"
                                        className={cx('user-avatar')}
                                        alt="Loi"
                                        // fallback=''
                                    />
                                </MenuCustom>
                            </div>
                        </div>
                        <div className={cx('search-small')}>
                            <Search/>           
                        </div>
                    </header>
                    {!sidebarShow ? (
                        <div className={cx('modal','modal-small')}>
                            <div className={cx('menu')}>
                                <Menu
                                    onClick={onClickMenu}
                                    style={{
                                        width: 300,
                                    }}
                                    mode="inline"
                                    items={itemsMenu}
                                />
                            </div>
                        </div>
                    ) : null}
                </>
            </Small>
                      {/* ******************Giao diện XSmall*********************  */}
             <XSmall>
                <>
                    <header className={cx('wrapper','wrapper-small')}>
                        <div className={cx('inner')}>
                        <div className={cx('header-logo')}>
                            <a href={config.routes.home}>
                                <img
                                    style={{ height: '100%', padding: '5px 0' }}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730030954/final_x4gecu.png"
                                    alt="Ảnh lỗi"
                                />
                            </a>
                        </div>
                            <div className={cx('header-left', 'header-left-mobile')}>
                                <div className={cx('header-icon')} onClick={toggleSidebar}>
                                    {sidebarShow ? (
                                        <FontAwesomeIcon icon={faBars} />
                                    ) : (
                                        <FontAwesomeIcon icon={faXmark} />
                                    )}
                                </div>
                               
                            </div>
                            <div className={cx('infor-user', 'infor-user-xsmall')}>
                                <div className={cx('header-icon', 'header-menu', 'header-icon-mobile')}>
                                    <Badge
                                        count={newGiohang.length > 0 ? newGiohang.length : ''}
                                        onClick={handleCartShopping}
                                        style={{ width: '30px', right: '-8px' }}
                                    >
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </Badge>
                                </div>
                                <MenuCustom items={item} onChange={handleMenuChange}>
                                    <Image
                                        src="data:image/png;base64,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"
                                        className={cx('user-avatar')}
                                        alt="Loi"
                                        // fallback=''
                                    />
                                </MenuCustom>
                            </div>
                        </div>
                        <div className={cx('search-small')}>
                            <Search/>           
                        </div>
                    </header>
                    {!sidebarShow ? (
                        <div className={cx('modal','modal-small')}>
                            <div className={cx('menu')}>
                                <Menu
                                    onClick={onClickMenu}
                                    style={{
                                        width: 300,
                                    }}
                                    mode="inline"
                                    items={itemsMenu}
                                />
                            </div>
                        </div>
                    ) : null}
                </>
            </XSmall>
            <style jsx>{`
                .ant-menu-light:not(.ant-menu-horizontal) .ant-menu-item:not(.ant-menu-item-selected):hover {
                    color: var(--primary);
                    background-color: #03a9f4;
                }

                .ant-menu-light .ant-menu-item-selected {
                    color: var(--primary);
                    background-color: #03a9f4;
                    font-size: 18px;
                }

                ant-menu-inline.ant-menu-root .ant-menu-item > .ant-menu-title-content {
                    font-size: 18px;
                }
            `}</style>
        </>
    );
}

export default Header;
