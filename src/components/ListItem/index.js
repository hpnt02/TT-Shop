import { Card, Pagination, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChiTietHoaDon, DanhGia, TMCTHD, UpdateCTHD } from '~/redux/API/api';
import ButtonCustom from '../Button';
import classNames from 'classnames/bind';
import styles from './ListItem.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '~/config';

const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const cx = classNames.bind(styles);
function ListItem({ data, ...props }) {
    const danhgia = useSelector((state) => state.danhgia?.danhgia?.danhgia) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(1);
    const pageSize = props.pageProduct;

    const handleChange = (page) => {
        setCurrent(page);
        window.scrollTo(0, 180);
    };

    const startIndex = (current - 1) * pageSize;
    const currentData = data.slice(startIndex, startIndex + pageSize);
    const handleCardClick = (km, event) => {
        event.stopPropagation(); // Ngăn sự kiện nhấn lan truyền lên Carousel
        navigate(config.routes.ttsp, { state: { km } });
    };

    const user = useSelector((state) => state.auth.login.currentUser) || null;
    const chitiethoadon = useSelector((state) => state.chitiethoadon?.chitiethoadon?.chitiethoadon) || [];
    const newGiohang =
        chitiethoadon?.filter((state) => state.KhachHang === user?.KhachHang?._id && state.IDHoaDon === null) || [];
    const location = useLocation();

    const handleCard = async (km, event) => {
        event.stopPropagation();
        if (user) {
            const sanPhamTrung = newGiohang.some((item) => item.Product === km._id);

            if (!sanPhamTrung) {
                const data = {
                    KhachHang: user?.KhachHang?._id || [],
                    Number: 1,
                    PriceProduct: km.GiaBanRa,
                    Product: km._id,
                };

                // Thực hiện thêm sản phẩm vào giỏ hàng và chờ cho nó hoàn thành
                await TMCTHD(data, dispatch);
                await ChiTietHoaDon(dispatch);
            } else {
                // Lấy thông tin sản phẩm đã tồn tại
                const sanPhamtrung = newGiohang.find((item) => item.Product === km._id);
                const data = {
                    KhachHang: sanPhamtrung.KhachHang,
                    Number: sanPhamtrung.Number + 1,
                    PriceProduct: sanPhamtrung.PriceProduct,
                    Product: sanPhamtrung.Product,
                };

                await UpdateCTHD(data, dispatch, sanPhamtrung._id);
                await ChiTietHoaDon(dispatch);
            }
        } else {
            localStorage.setItem('http', location.pathname);
            navigate(config.routes.login);
        }
    };

    useEffect(() => {
        DanhGia(dispatch);
        ChiTietHoaDon(dispatch);
    }, [dispatch]);
    return (
        <>
            <div className={cx('card-item')}>
                {currentData.map((km) => {
                    const Danhgia = danhgia.filter((state) => state.Product === km._id);
                    const LuotDanhGia = Danhgia.filter((item) => item.Rate !== 0);
                    const TongDiemDanhGia = LuotDanhGia.reduce((sum, item) => sum + item.Rate, 0);
                    const TrungbinhDanhGia = LuotDanhGia.length > 0 ? TongDiemDanhGia / LuotDanhGia.length : 0;

                    return (
                        <div
                            key={km._id} // Sử dụng km._id làm key duy nhất
                            style={{
                                position: 'relative',
                                marginBottom: '10px',
                            }}
                        >
                            <Card
                                hoverable
                                onClick={(event) => handleCardClick(km, event)} // Gán sự kiện onClick
                                style={{
                                    width: 240,
                                    margin: '0 10px',
                                    userSelect: 'none',
                                }}
                                cover={<img alt="example" src={km.Image.Image1} style={{ height: '200px' }} />}
                            >
                                <div className={cx('name-Product')}>
                                    <span>{km.nameProduct}</span>
                                </div>
                                <div className={cx('price-Product')}>
                                    <span className={cx('price-old')}>{DinhDangTien(km.PriceProduct)}đ</span>
                                    <span className={cx('price-current')}>{DinhDangTien(km.GiaBanRa)}đ</span>
                                </div>
                                <Rate disabled defaultValue={TrungbinhDanhGia} />
                                <div className={cx('order-item')}>
                                    <ButtonCustom primary onClick={(event) => handleCard(km, event)}>
                                        Thêm vào giỏ hàng
                                    </ButtonCustom>
                                </div>
                                {km.KhuyenMai ? (
                                    <div className={cx('sale-off')}>
                                        <span className={cx('sale-off-label')}>GIẢM </span>
                                        <span className={cx('sale-off-percent')}>{km.KhuyenMai}%</span>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </Card>
                        </div>
                    );
                })}
            </div>

            {data.length > 0 ? (
                <Pagination
                    align="center"
                    current={current}
                    pageSize={pageSize}
                    total={data.length}
                    onChange={handleChange}
                />
            ) : (
                <div className={cx('no-data')}>
                    <h2>Không tìm thấy sản phẩm</h2>
                </div>
            )}
        </>
    );
}

export default ListItem;
