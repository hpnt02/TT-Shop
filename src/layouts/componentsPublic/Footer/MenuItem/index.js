import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';
const cx = classNames.bind(styles);
function MenuItem({ title, icon, children }) {
    return (
        <div className={cx('inner')}>
            <div className={cx('title-footer')}>
                <span className={cx('icon-footer')}>{icon}</span>
                <h3>{title}</h3>
            </div>
            {children}
        </div>
    );
}

export default MenuItem;
