import React from 'react';
import { Carousel, Rate } from 'antd';
import classNames from 'classnames/bind';
import styles from './NewProduct.module.scss';
import ButtonCustom from '../Button';
import { useEffect } from 'react';
import { ChiTietHoaDon, DanhGia, TMCTHD, UpdateCTHD } from '~/redux/API/api';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '~/config';
import { MobileAndTablet, TabletAndDestopLarge } from '../Responsive';
const cx = classNames.bind(styles);

const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

function NewProduct({ data }) {
    const danhgia = useSelector((state) => state.danhgia?.danhgia?.danhgia) || [];
    const user = useSelector((state) => state.auth?.login?.currentUser) || false;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newProducts = [...data] // Tạo bản sao của mảng
        .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
        .slice(0, 5);

    const chitiethoadon = useSelector((state) => state.chitiethoadon?.chitiethoadon?.chitiethoadon) || [];
    const newGiohang =
        chitiethoadon?.filter((state) => state.KhachHang === user.KhachHang?._id && state.IDHoaDon === null) || [];
    const location = useLocation();
    const handlecard = (sp, event) => {
        event.stopPropagation();
        if (user) {
            const sanPhamTrung = newGiohang.some((item) => item.Product === sp._id);
            if (!sanPhamTrung) {
                const data = {
                    KhachHang: user.KhachHang._id,
                    Number: 1,
                    PriceProduct: sp.GiaBanRa,
                    Product: sp._id,
                };
                // Thực hiện thêm sản phẩm vào giỏ hàng
                TMCTHD(data, dispatch);
                ChiTietHoaDon(dispatch);
            } else {
                // Lấy thông tin sản phẩm đã tồn tại
                const sanPhamtrung = newGiohang.find((item) => item.Product === sp._id);
                const data = {
                    KhachHang: sanPhamtrung.KhachHang,
                    Number: sanPhamtrung.Number + 1,
                    PriceProduct: sanPhamtrung.PriceProduct,
                    Product: sanPhamtrung.Product,
                };
                UpdateCTHD(data, dispatch, sanPhamtrung._id);
                ChiTietHoaDon(dispatch);
            }
        } else {
            localStorage.setItem('http', location.pathname);
            console.log('đại chỉ ip', location.pathname);
            navigate(config.routes.login);
        }
    };

    useEffect(() => {
        DanhGia(dispatch);
        ChiTietHoaDon(dispatch);
    }, [dispatch]);

    return (
        <>
            <TabletAndDestopLarge>
                <Carousel fade autoplaySpeed={3000}>
                    {newProducts.map((sp, index) => {
                        const Danhgia = danhgia.filter((state) => state.Product === sp._id);
                        const LuotDanhGia = Danhgia.filter((item) => item.Rate !== 0);
                        const TongDiemDanhGia = LuotDanhGia.reduce((sum, item) => sum + item.Rate, 0);
                        const TrungbinhDanhGia = LuotDanhGia.length > 0 ? TongDiemDanhGia / LuotDanhGia.length : 0;
                        return (
                            <div className={cx('newProduct-Carousel')} key={index}>
                                <div className={cx('newProduct-left')}>
                                    <div className={cx('text')}>
                                        <div className={cx('text-1')}>
                                            <div className={cx('img-Carousel')}>
                                                <img src={sp.Image.Image1} alt="Ảnh lỗi" />
                                            </div>
                                        </div>
                                        <div className={cx('img-top')}>
                                            <img
                                                src="https://res.cloudinary.com/di56pogid/image/upload/v1730305909/frame_top_p0yipl.png"
                                                alt="Ảnh lỗi"
                                            />
                                        </div>
                                        <div className={cx('img-bottom')}>
                                            <img
                                                src="https://res.cloudinary.com/di56pogid/image/upload/v1730305922/frame_bottom_y9cplg.png"
                                                alt="Ảnh lỗi"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('infor-newProduct')}>
                                    <div className={cx('title')}>
                                        <h2>{sp.nameProduct}</h2>
                                    </div>
                                    <div className={cx('describe')}>
                                        {sp.describe?.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line} <br />
                                            </span>
                                        ))}
                                    </div>
                                    <div>
                                        {sp.KhuyenMai !== undefined ? (
                                            <>
                                                <div className={cx('price')}>
                                                    <span className={cx('price-old')}>
                                                        {DinhDangTien(sp.PriceProduct)}đ
                                                    </span>
                                                    <span className={cx('price-current')}>
                                                        {DinhDangTien(sp.GiaBanRa)}đ
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <span className={cx('price-current')}>{DinhDangTien(sp.GiaBanRa)}đ</span>
                                        )}
                                    </div>
                                    <Rate disabled defaultValue={TrungbinhDanhGia} />
                                    <ButtonCustom primary onClick={(event) => handlecard(sp, event)}>
                                        Thêm vào giỏ hàng
                                    </ButtonCustom>
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </TabletAndDestopLarge>

            <MobileAndTablet>
                <Carousel fade autoplaySpeed={3000}>
                    {newProducts.map((sp, index) => {
                        const Danhgia = danhgia.filter((state) => state.Product === sp._id);
                        const LuotDanhGia = Danhgia.filter((item) => item.Rate !== 0);
                        const TongDiemDanhGia = LuotDanhGia.reduce((sum, item) => sum + item.Rate, 0);
                        const TrungbinhDanhGia = LuotDanhGia.length > 0 ? TongDiemDanhGia / LuotDanhGia.length : 0;
                        return (
                            <div className={cx('newProduct-Carousel__mobile')} key={index}>
                                <div className={cx('newProduct-mobile')}>
                                    <div className={cx('newProduct-left')}>
                                        <div className={cx('text')}>
                                            <div className={cx('text-1')}>
                                                <div className={cx('img-Carousel')}>
                                                    <img src={sp.Image.Image1} alt="Ảnh lỗi" />
                                                </div>
                                            </div>
                                            <div className={cx('img-top')}>
                                                <img
                                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730305909/frame_top_p0yipl.png"
                                                    alt="Ảnh lỗi"
                                                />
                                            </div>
                                            <div className={cx('img-bottom')}>
                                                <img
                                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730305922/frame_bottom_y9cplg.png"
                                                    alt="Ảnh lỗi"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={cx('title')}>
                                            <h2>{sp.nameProduct}</h2>
                                        </div>
                                        <div className={cx('describe')}>
                                            {sp.describe?.split('\n').map((line, index) => (
                                                <span key={index}>
                                                    {line} <br />
                                                </span>
                                            ))}
                                        </div>
                                        <div>
                                            {sp.KhuyenMai !== undefined ? (
                                                <>
                                                    <div className={cx('price')}>
                                                        <span className={cx('price-old')}>
                                                            {DinhDangTien(sp.PriceProduct)}đ
                                                        </span>
                                                        <span className={cx('price-current')}>
                                                            {DinhDangTien(sp.GiaBanRa)}đ
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className={cx('price-current')}>
                                                    {DinhDangTien(sp.GiaBanRa)}đ
                                                </span>
                                            )}
                                        </div>

                                        <Rate disabled defaultValue={TrungbinhDanhGia} />
                                        <ButtonCustom primary onClick={(event) => handlecard(sp, event)}>
                                            Thêm vào giỏ hàng
                                        </ButtonCustom>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </MobileAndTablet>
            <style jsx>
                {`
                    .ant-carousel .slick-dots-bottom {
                        bottom: 16px;
                    }
                `}
            </style>
        </>
    );
}

export default NewProduct;
