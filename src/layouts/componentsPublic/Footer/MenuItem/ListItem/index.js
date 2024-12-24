import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './ListItem.module.scss';
const cx = classNames.bind(styles);

function ListItem({ title }) {
    return (
        <div className={cx('inner')}>
            <span style={{ paddingRight: '5px' }}>{<FontAwesomeIcon icon={faHandPointRight} />}</span>
            <p>{title}</p>
        </div>
    );
}

export default ListItem;
