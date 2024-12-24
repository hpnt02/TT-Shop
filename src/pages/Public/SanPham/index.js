import React from 'react';
import classNames from 'classnames/bind';
import styles from './SanPham.module.scss';
import RadioItem from '~/components/Radio';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { LoaiSanPham, NhaCungCap, SanPham } from '~/redux/API/api';
import { Select, Slider, Space } from 'antd';
import ListItem from '~/components/ListItem';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-regular-svg-icons';
import BreadcrumbMenu from '~/components/Breadcrumb';

const cx = classNames.bind(styles);
const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};
const contentStyle = {
    margin: 0,
    height: '300px',
    width: ' 100%',
    position: 'relative',
};

const options = [
    {
        value: 'increase',
        label: 'Giá từ thấp tới cao',
    },
    {
        value: 'decrease',
        label: 'Giá từ cao tới thấp',
    },
];

function Product() {
    const location = useLocation();
    const id = location.state?.id;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]); // Chạy lại khi location thay đổi
    const sanpham = useSelector((state) => state.sanpham?.sanpham?.sanpham) || [];
    const nhacungcap = useSelector((state) => state.nhacungcap?.nhacungcap?.nhacungcap) || [];
    const loaisanpham = useSelector((state) => state.loaisanpham?.loaisanpham?.loaisanpham) || [];
    const dispatch = useDispatch();
    const minPrice = sanpham.reduce((prev, curr) => {
        return curr.GiaBanRa < prev.GiaBanRa ? curr : prev;
    });
    const maxPrice = sanpham.reduce((prev, curr) => {
        return curr.GiaBanRa > prev.GiaBanRa ? curr : prev;
    });

    const [giaMin, setGiaMin] = useState(minPrice.GiaBanRa);
    const [giaMax, setGiaMax] = useState(maxPrice.GiaBanRa);

    //Lọc theo giá
    const onChangeComplete = (value) => {
        setGiaMin(value[0]);
        setGiaMax(value[1]);
    };
    //===============Locj theo ==============================
    const Nhacungcap = id ? id : 'All';

    const [lsp, setLSP] = useState('All');
    const [ncc, setNCC] = useState(Nhacungcap);

    const handleLaoiSanPham = (values) => {
        setLSP(values);
    };
    const handleNCC = (value) => {
        setNCC(value);
    };

    const [sort, setSort] = useState('increase');

    const handleSortProduct = (value) => {
        setSort(value);
    };

    const newData = sanpham.filter(
        (state) =>
            (lsp === 'All' && ncc === 'All' && state.GiaBanRa <= giaMax && state.GiaBanRa >= giaMin) ||
            (state.LoaiSanPham === lsp && ncc === 'All' && state.GiaBanRa <= giaMax && state.GiaBanRa >= giaMin) ||
            (state.NhaCungCap === ncc && lsp === 'All' && state.GiaBanRa <= giaMax && state.GiaBanRa >= giaMin) ||
            (state.LoaiSanPham === lsp &&
                state.NhaCungCap === ncc &&
                state.GiaBanRa <= giaMax &&
                state.GiaBanRa >= giaMin),
    );
    const newDataSortProduct = newData.sort((a, b) => {
        if (sort === 'increase') {
            return a.GiaBanRa - b.GiaBanRa;
        } else {
            return b.GiaBanRa - a.GiaBanRa;
        }
    });

    const [pageProduct, setPageProduct] = useState('10');

    const handleChange = (value) => {
        setPageProduct(value);
    };

    useEffect(() => {
        SanPham(dispatch);
        LoaiSanPham(dispatch);
        NhaCungCap(dispatch);
    }, [dispatch]);
    return (
        <div className={cx('wrapper')}>
            <div>
                <img
                    style={contentStyle}
                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730466547/1_psi1r8.jpg"
                    alt="Mô tả ảnh"
                />
                <div className={cx('title-img')}>
                    <p> Sản phẩm</p>
                </div>
            </div>

            <BreadcrumbMenu />

            <div className={cx('list-product')}>
                <div className={cx('danh-muc')}>
                    <div className={cx('inner')}>
                        <div className={cx('danhmuc-brand')}>
                            <span>Danh mục</span>
                        </div>
                        <div>
                            <RadioItem data={loaisanpham} onClick={handleLaoiSanPham} />
                        </div>
                        <div className={cx('danhmuc-brand')}>
                            <span>Lọc theo giá tiền</span>
                        </div>
                        <div style={{ padding: '10px' }}>
                            <Slider
                                range
                                step={10}
                                defaultValue={[minPrice.GiaBanRa, maxPrice.GiaBanRa]}
                                onChangeComplete={onChangeComplete}
                                min={minPrice.GiaBanRa} // Giá trị tối thiểu
                                max={maxPrice.GiaBanRa} // Giá trị tối đa
                            />
                        </div>
                        <div>
                            <p className={cx('price')}>
                                <span>Giá thấp nhất:</span> {DinhDangTien(giaMin)}đ
                            </p>
                            <p className={cx('price')}>
                                <span>Giá cao nhất:</span> {DinhDangTien(giaMax)}đ
                            </p>
                        </div>
                        <div className={cx('danhmuc-brand')}>
                            <span>Thương hiệu</span>
                        </div>
                        <div>
                            <RadioItem data={nhacungcap} onClick={handleNCC} valueDefault={Nhacungcap} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className={cx('sort')}>
                        <div className={cx('sort-product')}>
                            <span>Sắp xếp</span>
                            <RadioItem sort={true} options={options} onClick={handleSortProduct} />
                        </div>
                        <div>
                            <span>Hiển thị</span>
                            <Space wrap>
                                <Select
                                    suffixIcon={<FontAwesomeIcon icon={faCircleDown} />}
                                    defaultValue="10"
                                    style={{
                                        width: 80,
                                    }}
                                    onChange={handleChange}
                                    options={[
                                        {
                                            value: '10',
                                            label: '10',
                                        },
                                        {
                                            value: '50',
                                            label: '50',
                                        },
                                        {
                                            value: '100',
                                            label: '100',
                                        },
                                    ]}
                                />
                            </Space>
                            <span>sản phẩm/trang</span>
                        </div>
                    </div>

                    <ListItem data={newDataSortProduct} pageProduct={pageProduct} />
                </div>
            </div>
        </div>
    );
}

export default Product;
