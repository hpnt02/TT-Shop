import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuItem from './Menu';

const cx = classNames.bind(styles);

function Sidebar({menu}) {

    return (
        <div className={cx(`${menu ? 'showMenu' : 'wrapper'}`)}>
            <MenuItem menu={menu}/>
        </div>
    );
}

export default Sidebar;
