import { useEffect, useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import * as searchServices from '~/Services/searchServices';
import { useDebounce } from '~/Hook';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { MobileAndTablet, TabletAndDestopLarge } from '~/components/Responsive';

const cx = classNames.bind(styles);

const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};


function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const debounce = useDebounce(searchValue, 500);

    const inputRef = useRef();
    const navigate = useNavigate()
    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounce);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounce]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };

    const handleSearch= (result) =>{
    const km= result
       navigate(config.routes.ttsp, {state: {km}})
    }

    return (
        <div>
             <TabletAndDestopLarge>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Danh sách sản phẩm</h4>
                            {searchResult.map((result) => (
                              <div className={cx('infor-product')} onClick={(event) => handleSearch(result,event)}>
                                <img className={cx('img-search')} src={result.Image?.Image1} alt='Ảnh lỗi'/>
                                <div className={cx('name-search')}>
                                    <h4>{result.nameProduct}</h4>
                                    <span className={cx('price-search')}>{DinhDangTien(result.GiaBanRa)}đ</span>
                                </div>
                              </div>
                            ))}

                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
               
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm sản phẩm: son, phấn trang điểm,..."
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setSearchValue('');
                                setSearchResult([]);
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    </div>            
            </HeadlessTippy>
                </TabletAndDestopLarge>
                <MobileAndTablet>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Danh sách sản phẩm</h4>
                            {searchResult.map((result) => (
                              <div className={cx('infor-product')} onClick={(event) => handleSearch(result,event)}>
                                <img className={cx('img-search')} src={result.Image?.Image1} alt='Ảnh lỗi'/>
                                <div className={cx('name-search')}>
                                    <h4>{result.nameProduct}</h4>
                                    <span className={cx('price-search')}>{DinhDangTien(result.GiaBanRa)}đ</span>
                                </div>
                              </div>
                            ))}

                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search', 'search-small')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm sản phẩm: son, phấn trang điểm,..."
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setSearchValue('');
                                setSearchResult([]);
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    </div>            
            </HeadlessTippy>
                </MobileAndTablet>
        </div>
    );
}

export default Search;
