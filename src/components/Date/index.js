import { DatePicker, Space } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Date.module.scss';
import { ChiTietHoaDon, HoaDon, LoaiSanPham, SanPham } from '~/redux/API/api';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartPie from '../ChartPie';
import ChartLine from '../ChartLine';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const cx = classNames.bind(styles);
function DateOption() {
    const dateCurrent = new Date();

    const user = useSelector((state) => state.auth.login.currentUser);
    const hoadon = useSelector((state) => state.hoadon?.hoadon?.hoadon);
    const sanpham = useSelector((state) => state.sanpham?.sanpham?.sanpham) || [];
    const loaisanpham = useSelector((state) => state.loaisanpham?.loaisanpham?.loaisanpham) || [];
    const chitiethoadon = useSelector((state) => state.chitiethoadon?.chitiethoadon?.chitiethoadon) || [];
    let newHoaDon;
    if (user.KhachHang) {
        newHoaDon = hoadon.filter(
            (state) => state.HoanThanh === true && state.TrangThai === true && state.KhachHang === user.KhachHang._id,
        );
    } else {
        newHoaDon = hoadon.filter((state) => state.HoanThanh === true && state.TrangThai === true);
    }
    const sortedHoaDon = newHoaDon.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));

    const oldDateBuy = sortedHoaDon[sortedHoaDon.length - 1];

    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState(moment(oldDateBuy.createAt).local());
    const [endDate, setEndDate] = useState(moment(dateCurrent.toISOString()).local());

    const hoaDonfilter = sortedHoaDon.filter((state) => moment(state.createAt).local() >= startDate && moment(state.createAt).local() <= endDate);

    const totalBuy = hoaDonfilter.reduce((total, item) => total + item.ThanhTien, 0);

    //==================Tổng chi tiêu==========================
    // eslint-disable-next-line array-callback-return

    const handleChange = (date, dateString) => {
        if (dateString) {
            // Chuyển đổi dateString thành đối tượng moment
            const selectedDate = moment(dateString, 'DD/MM/YYYY').set({
                hour: 15,
                minute: 49,
                second: 15,
                millisecond: 191,
            });
            // Kiểm tra điều kiện so sánh
            if (selectedDate.local() <= endDate) {
                setStartDate(selectedDate); // Cập nhật startDate
            } else {
                alert('Vui lòng chọn lại');
            }
        } else {
            setStartDate(moment(oldDateBuy.createAt).local());
        }
    };

    const handleChange1 = (date, dateString) => {
        if (dateString) {
            // Chuyển đổi dateString thành đối tượng moment
            const selectedDate = moment(dateString, 'DD/MM/YYYY').set({
                hour: 15,
                minute: 49,
                second: 15,
                millisecond: 191,
            });
            // Kiểm tra điều kiện so sánh
            if (selectedDate.local() >= startDate) {
                setEndDate(selectedDate); // Cập nhật startDate
            } else {
                alert('Vui lòng chọn lại');
            }
        } else {
            setEndDate(moment(dateCurrent.toISOString()).local());
        }
    };

    //================Biểu đồ chi tiêu ========================================
    const newCTHD = chitiethoadon.filter((itemA) => hoaDonfilter.some((itemB) => itemB.IDHoaDon === itemA.IDHoaDon));

    const result = newCTHD.reduce((acc, cthd) => {
        const SanPham = sanpham.find((state) => state._id === cthd.Product);
        const name = SanPham ? SanPham.nameProduct : 'Unknown Product'; // Handle case where product is not found
        if (acc[name]) {
            acc[name].Number += cthd.Number;
        } else {
            acc[name] = { id: SanPham.LoaiSanPham, name, Number: cthd.Number };
        }
        return acc;
    }, {});

    const finalResult = Object.values(result);

    const totalTongLSP = finalResult.map((result) => {
        const loaiSP = loaisanpham.find((state) => state._id === result.id);
        const data = {
            name: loaiSP.nameLoaiSP,
            Number: result.Number,
        };
        return data;
    });

    const sorteLoaiSP =totalTongLSP.sort((a, b) => (b.Number) -(a.Number));
    // Bước 2: Kiểm tra số lượng sản phẩm
    let resultArrayLSP;
    if ( sorteLoaiSP.length <= 5) {
        // Nếu chỉ có 5 sản phẩm hoặc ít hơn, chỉ cần lấy tất cả
        resultArrayLSP =  sorteLoaiSP;
    } else {
        // Nếu có nhiều hơn 5 sản phẩm
        const top5Products =  sorteLoaiSP.slice(0,5);
        
        // Bước 3: Tính tổng số lượng của các sản phẩm còn lại
        const totalQuantity =  sorteLoaiSP.slice(5).reduce((sum, product) => sum + product.Number, 0);
        // Bước 4: Tạo đối tượng 'Sản phẩm khác'
        const otherProducts = {
            name: 'Sản phẩm khác',
            Number: totalQuantity
        };
    
        // Bước 5: Tạo mảng mới chứa 5 sản phẩm có số lượng cao nhất và đối tượng 'Sản phẩm khác'
        resultArrayLSP = [...top5Products, otherProducts];
    }
    //===================================Sản phẩm mua nhiều nhất=====================================================
        //Sắp xếp theo số lượng
        const sorteSanPham =finalResult.sort((a, b) => (b.Number) -(a.Number));
        // Bước 2: Kiểm tra số lượng sản phẩm
        let resultArray;
        if ( sorteSanPham.length <= 4) {
            // Nếu chỉ có 5 sản phẩm hoặc ít hơn, chỉ cần lấy tất cả
            resultArray =  sorteSanPham;
        } else {
            // Nếu có nhiều hơn 5 sản phẩm
            const top5Products =  sorteSanPham.slice(0,4);
            // Bước 3: Tính tổng số lượng của các sản phẩm còn lại
            const totalQuantity =  sorteSanPham.slice(4).reduce((sum, product) => sum + product.Number, 0);
            // Bước 4: Tạo đối tượng 'Sản phẩm khác'
            const otherProducts = {
                name: 'Sản phẩm khác',
                Number: totalQuantity
            };
        
            // Bước 5: Tạo mảng mới chứa 5 sản phẩm có số lượng cao nhất và đối tượng 'Sản phẩm khác'
            resultArray = [...top5Products, otherProducts];
        }
        console.log("hoaDonfilter",hoaDonfilter)

    const dateFormat = 'DD/MM/YYYY';
    useEffect(() => {
        SanPham(dispatch);
        ChiTietHoaDon(dispatch);
        HoaDon(dispatch);
        LoaiSanPham(dispatch);
    }, [dispatch]);
    return (
        <div>
            <Space
                direction="vertical"
                size={12}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <span>Từ ngày</span>
                <DatePicker onChange={handleChange} format={dateFormat} />
                <span>Đến ngày</span>
                <DatePicker onChange={handleChange1} format={dateFormat} />
            </Space>
            <div className={cx('title')}>
                <h2>
                    Thống kê chi tiêu từ
                    <span className={cx('title-date')}>
                        {' '}
                        {moment(startDate).local().format('DD/MM/YYYY')}{' '}
                    </span> đến <span className={cx('title-date')}>{moment(endDate).local().format('DD/MM/YYYY')}</span>
                </h2>
            </div>
            <style jsx>{`
                .ant-space-vertical {
                    flex-direction: row;
                }
            `}</style>

            <div className="">
                <div className={cx('infor')}>
                    <p>Số đơn hàng hoàn thành:</p>
                    <span>{hoaDonfilter.length}</span>
                </div>
                <div className={cx('infor')}>
                    <p>Tổng chi tiêu:</p>
                    <span className={cx('currency-Unit')}>{DinhDangTien(totalBuy)}</span>
                </div>
            </div>
            <div className={cx('chart')}>
                <ChartPie dataChart={resultArray} title="Biểu đồ chi tiêu theo sản phẩm" />
                <ChartPie dataChart={resultArrayLSP} title="Biểu đồ chi tiêu theo loại sản phẩm" />
            </div>
            <div>
                <ChartLine dataChart={hoaDonfilter.slice(0, 30).reverse()}/>
            </div>
        </div>
    );
}

export default DateOption;
