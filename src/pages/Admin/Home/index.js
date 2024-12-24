import CardItem from '~/components/Card';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Account, ChiTietHoaDon, DSNV, HoaDon, LoaiSanPham, NhaCungCap, SanPham } from '~/redux/API/api';
//==============================================================
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TableHome from '~/components/TableHome';
import { ColumnsSanPham, ColumnsKhachHang, ColumnsOnline } from './ColomnHome';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

//==============================================================
const cx = classNames.bind(styles);

const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

function HomeAdmin() {
    const Month = new Date().getMonth() + 1;
    const Year = new Date().getFullYear();
    const Day = new Date().getDate();
    const years = Array.from({ length: 5 }, (_, index) => Year - index).reverse();

    const nhanvien = useSelector((state) => state.dsnv?.dsnv?.dsnv) || [];
    const sanpham = useSelector((state) => state.sanpham?.sanpham?.sanpham) || [];
    const hoadon = useSelector((state) => state.hoadon?.hoadon?.hoadon);
    const hoadonHoanThanh = hoadon?.filter((state) => state.TrangThai === true && state.HoanThanh === true) ||[];
    const accountKH = useSelector((state) => state.account?.account?.account) || '';
    const chitiethoadon = useSelector((state) => state.chitiethoadon?.chitiethoadon?.chitiethoadon) || [];
    const nhacungcap = useSelector((state) => state.nhacungcap?.nhacungcap?.nhacungcap) || [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loaisanpham = useSelector((state) => state.loaisanpham?.loaisanpham?.loaisanpham) || [];
    //======================================Tổng doanh thu trong tháng===========================

    let totalPrice = 0; // Biến để lưu tổng giá trị Price

    hoadonHoanThanh.forEach((hoadonHT) => {
        const date = new Date(hoadonHT.createAt); // Tạo đối tượng Date từ chuỗi
        const month = date.getMonth() + 1; // Lấy tháng (1-12)
        if (month === Month) {
            // Kiểm tra nếu tháng bằng nhau
            totalPrice += hoadonHT.ThanhTien; // Cộng giá trị Price vào tổng
        }
    });

    //======================================Tổng doanh thu trong tháng===========================

    //======================================Tổng doanh thu trong năm===========================

    let totalPriceYear = 0; // Biến để lưu tổng giá trị Price

    hoadonHoanThanh.forEach((hoadonHT) => {
        const date = new Date(hoadonHT.createAt); // Tạo đối tượng Date từ chuỗi
        const year = date.getFullYear();
        if (year === Year) {
            // Kiểm tra nếu tháng bằng nhau
            totalPriceYear += hoadonHT.ThanhTien; // Cộng giá trị Price vào tổng
        }
    });
    //======================================Tổng doanh thu trong năm===========================

    //======================================Tổng doanh thu trong ngày===========================
    let totalPriceDay = 0; // Biến để lưu tổng giá trị Price
    hoadonHoanThanh.forEach((hoadonHT) => {
        const date = new Date(hoadonHT.createAt); // Tạo đối tượng Date từ chuỗi
        const day = date.getDate();
        if (day === Day) {
            // Kiểm tra nếu tháng bằng nhau
            totalPriceDay += hoadonHT.ThanhTien; // Cộng giá trị Price vào tổng
        }
        //======================================Tổng doanh thu trong ngày===========================
    });

    //=================================Đồ thid doanh thu=======================================
    const monthlyTotals = Array(12).fill(0); // Tạo mảng lưu tổng giá cho từng tháng
    hoadonHoanThanh.forEach((hoadonHT) => {
        const date = new Date(hoadonHT.createAt); // Tạo đối tượng Date từ chuỗi
        const year = date.getFullYear();
        const month = date.getMonth(); // Lấy tháng (0-11)

        if (year === Year) {
            // Kiểm tra nếu năm bằng nhau
            monthlyTotals[month] += hoadonHT.ThanhTien;
        }
    });

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Doanh thu năm ${Year}`,
                font: {
                    size: 16, // Kích thước phông chữ cho title
                    weight: 'bold',
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 16, // Kích thước phông chữ cho ticks trên trục X (labels)
                        weight: 'bold', // Đặt độ đậm cho phông chữ ticks trên trục X
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 14, // Kích thước phông chữ cho ticks trên trục Y
                        weight: 'bold', // Đặt độ đậm cho phông chữ ticks trên trục Y
                    },
                },
            },
        },
    };
    // monthlyTotals giờ đây chứa tổng giá cho từng tháng trong năm
    const labels = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];
    const data = {
        labels,
        datasets: [
            {
                label: 'Doanh thu (VND)',
                data: monthlyTotals,
                backgroundColor: 'rgba(27, 169, 204, 1)',
            },
        ],
    };
    //=================================Đồ thid doanh thu=======================================
    const YearTotals = Array(years.length).fill(0); // Tạo mảng lưu tổng giá cho từng năm

    years.forEach((year) => {
        // Lặp qua từng hóa đơn trong hoadonHoanThanh
        hoadonHoanThanh.forEach((hoadonHT) => {
            const date = new Date(hoadonHT.createAt); // Tạo đối tượng Date từ chuỗi
            const hoadonYear = date.getFullYear(); // Lấy năm từ hóa đơn

            // Kiểm tra nếu năm của hóa đơn trùng với năm hiện tại trong years
            if (hoadonYear === year) {
                // Cộng tổng giá vào năm tương ứng
                const yearIndex = years.indexOf(year);
                YearTotals[yearIndex] += hoadonHT.ThanhTien;
            }
        });
    });

    const optionsYear = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Doanh thu 5 năm gần đây`,
                font: {
                    size: 16, // Kích thước phông chữ cho title
                    weight: 'bold',
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 16, // Kích thước phông chữ cho ticks trên trục X (labels)
                        weight: 'bold', // Đặt độ đậm cho phông chữ ticks trên trục X
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 14, // Kích thước phông chữ cho ticks trên trục Y
                        weight: 'bold', // Đặt độ đậm cho phông chữ ticks trên trục Y
                    },
                },
            },
        },
    };
    // monthlyTotals giờ đây chứa tổng giá cho từng tháng trong năm

    const dataYear = {
        labels: years,
        datasets: [
            {
                label: 'Doanh thu (VND)',
                data: YearTotals,
                backgroundColor: 'rgba(30, 235, 30, 1)',
            },
        ],
    };

    //=====================================================================================================

    //=================================================Số sản phẩm bán nhiều nhất======================

    const DonHangHT = chitiethoadon.filter((detail) =>
        hoadonHoanThanh.some((hoadon) => hoadon.IDHoaDon === detail.IDHoaDon),
    );

    const newData = sanpham.reduce((acc, sp) => {
        const sanPham = DonHangHT.filter((state) => state.Product === sp._id);
        const loaiSanpham = loaisanpham.find((state) => state._id === sp.LoaiSanPham);
        const NhaCC = nhacungcap.find((state) => state._id === sp.NhaCungCap);
        if (sanPham.length > 0) {
            const tongSoLuong = sanPham.reduce((total, item) => total + item.Number, 0);
            acc.push({
                key: 0, // Tạm thời gán key, sẽ cập nhật sau
                HinhAnh: sp.Image,
                nameProduct: sp.nameProduct,
                LoaiSanPham: loaiSanpham.nameLoaiSP,
                NhaCungCap: NhaCC.nameNCC,
                SLBR: tongSoLuong,
            });
        }
        return acc;
    }, []);

    // Sắp xếp và gán key cho từng phần tử
    newData
        .sort((a, b) => b.SLBR - a.SLBR)
        .forEach((item, index) => {
            item.key = index + 1; // Gán key bắt đầu từ 1
        });
    //===============================================================================================

    const maxKH = accountKH?.reduce((acc, sp) => {
        const khachhang = hoadonHoanThanh?.filter((state) => state.KhachHang === sp.KhachHang._id);

        // Kiểm tra xem có hóa đơn nào không
        if (khachhang.length > 0) {
            // Gán tổng số hóa đơn cho khách hàng
            const tongSoLuong = khachhang.length; // Số lượng hóa đơn
            acc.push({
                key: 0, // Tạm thời gán key, sẽ cập nhật sau
                KhachHang: sp.KhachHang.HoTenKH,
                SLMH: tongSoLuong,
            });
        }
        return acc;
    }, []);

    // Sắp xếp và gán key cho từng phần tử
    maxKH
        .sort((a, b) => b.SLMH - a.SLMH)
        .forEach((item, index) => {
            item.key = index + 1; // Gán key bắt đầu từ 1
        });

    //===============================================================================================

    const onlineKh = accountKH.reduce((acc, kh) => {
        if (kh.TrangThai === true) {
            // Gán thông tin cho khách hàng
            acc.push({
                key: 0, // Tạm thời gán key, sẽ cập nhật sau
                KhachHang: kh.KhachHang.HoTenKH,
                Online: kh.TrangThai
            });
        }
        return acc;
    }, []);
    
    // Cập nhật key cho từng phần tử
    onlineKh.forEach((item, index) => {
        item.key = index + 1; // Gán key bắt đầu từ 1
    });
    
    //===============================================================================================
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    useEffect(() => {
       
            DSNV(dispatch, user?.accessToken);
            LoaiSanPham(dispatch, user?.accessToken);
            NhaCungCap(dispatch, user?.accessToken);
            SanPham(dispatch, user?.accessToken);
            HoaDon(dispatch, user?.accessToken);
            Account(dispatch, user?.accessToken);
            ChiTietHoaDon(dispatch, user?.accessToken);
      
    }, [dispatch, user?.accessToken]);
    return (
        <div className={cx('wrapperr')}>
            <div className={cx('card-item')}>
                <CardItem
                    title="SỐ LƯỢNG NHÂN VIÊN"
                    bgC="rgba(88, 86, 214, 1)"
                    number={nhanvien.length}
                    other="nhân viên"
                />
                <CardItem
                    title="SỐ LƯỢNG SẢN PHẨM"
                    bgC="rgba(51, 153, 255,1)"
                    number={sanpham.length}
                    other="sản phẩm"
                />
                <CardItem
                    title="SỐ LƯỢNG KHÁCH HÀNG"
                    bgC="rgba(63, 219, 66, 1)"
                    number={accountKH.length}
                    other="khách hàng"
                />
                <CardItem
                    title={`DOANH THU NGÀY ${Day}`}
                    bgC="rgba(249, 21, 181, 1)"
                    number={DinhDangTien(totalPriceDay)}
                    other="VND"
                />
                <CardItem
                    title={`DOANH THU THÁNG ${Month}`}
                    bgC="rgba(249, 177, 21, 1)"
                    number={DinhDangTien(totalPrice)}
                    other="VND"
                />
                <CardItem
                    title={`DOANH THU NĂM ${Year}`}
                    bgC="rgba(229, 83, 83 ,1)"
                    number={DinhDangTien(totalPriceYear)}
                    other="VND"
                />
            </div>
            <div className={cx('chart')}>
                <div className={cx('chart-DT')}>
                    <Bar options={options} data={data} />
                </div>
                <div className={cx('chart-DT')}>
                    <Bar options={optionsYear} data={dataYear} />
                </div>
            </div>
            <div className={cx('table-home')}>
                <TableHome title="Sản phẩm bán chạy nhất" columns={ColumnsSanPham()} data={newData} />
            </div>
            <div className={cx('table-Kh')}>
                <div className={cx('table-infor_KH')}>
                    <TableHome title="Khách hàng mua nhiều nhất" columns={ColumnsKhachHang()} data={maxKH} />
                </div>
                <div className={cx('table-infor_KH')}>
                    <TableHome title="Đang hoạt động" columns={ColumnsOnline()} data={onlineKh} online={true}/>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
