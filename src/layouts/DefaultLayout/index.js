import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import styles from './DefaultLayout.module.scss';
import Sidebar from '../components/Sidebar';
import PropTypes from 'prop-types';
import { useState } from 'react';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [showMenu, setShowMenu] = useState(false)

    const handleMenu = (values) => {
        setShowMenu(values)
    }

    return (
        <div className={cx('wrapper')}>
            <Sidebar menu={showMenu}/>
            <div className={cx(`${showMenu ? 'newContainer' :'container' }`)}>
                <Header onClick={handleMenu}/>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
