import classNames from 'classnames/bind';
import styles from './Title.module.scss';

const cx = classNames.bind(styles);

function Title({title, ...props}) {
    return ( 
        
            props.user ?
            <h2 className={cx('title-user')} >{title}</h2>
                :
            <h2 style={{width:'95%', margin:'0 auto', textAlign:'center', paddingTop:'15px',paddingBottom:'15px', color:'#0e12dd'}}>{title}</h2>
        
     );
}

export default Title;