import { Carousel } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { Card } from 'antd';
import classNames from 'classnames/bind';
import styles from './CarouselItem.module.scss';
import ButtonCustom from '../Button';
import { Rate } from 'antd';
import { ChiTietHoaDon, DanhGia, TMCTHD, UpdateCTHD } from '~/redux/API/api';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '~/config';
import { ExtraLarge, Large, Medium, Small, XSmall } from '../Responsive';

const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const cx = classNames.bind(styles);

function CarouselItem({ data }) {
    const danhgia = useSelector((state) => state.danhgia?.danhgia?.danhgia) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [isMovingCarousel, setIsMovingCarousel] = useState(false); // Trạng thái di chuyển Carousel
    const handleMouseDown = (event) => {
        setIsDragging(true);
        setStartX(event.clientX);
        setIsMovingCarousel(false); // Đặt trạng thái di chuyển Carousel về false khi bắt đầu kéo
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;
        setCurrentX(event.clientX);
        const deltaX = currentX - startX;

        // Nếu di chuyển quá ngưỡng, đánh dấu là đang di chuyển Carousel
        if (Math.abs(deltaX) > 50) {
            setIsMovingCarousel(true);
        }
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const deltaX = currentX - startX;
        if (isMovingCarousel) {
            // Chỉ di chuyển Carousel nếu đang kéo
            if (deltaX > 50) {
                carouselRef.current.prev();
            } else if (deltaX < -50) {
                carouselRef.current.next();
            }
        }

        setCurrentX(0); // Reset current position
    };

    const handleCardClick = (km, event) => {
        event.stopPropagation(); // Ngăn sự kiện nhấn lan truyền lên Carousel
        navigate(config.routes.ttsp, { state: { km } });
    };

    //====Thêm vào giỏ hàng---
    const user = useSelector((state) => state.auth?.login?.currentUser) || false;

    const chitiethoadon = useSelector((state) => state.chitiethoadon?.chitiethoadon?.chitiethoadon) || [];
    const newGiohang =
        chitiethoadon?.filter((state) => state.KhachHang === user.KhachHang?._id && state.IDHoaDon === null) || [];
    const location = useLocation();
    const handlecard = async (km, event) => {
        event.stopPropagation();
        if (user) {
            const sanPhamTrung = newGiohang.some((item) => item.Product === km._id);
            if (!sanPhamTrung) {
                const data = {
                    KhachHang: user?.KhachHang?._id,
                    Number: 1,
                    PriceProduct: km.GiaBanRa,
                    Product: km._id,
                };
                // Thực hiện thêm sản phẩm vào giỏ hàng
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
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Handle mouse leaving the component
        >
            <ExtraLarge>
                <div style={{ margin: '30px' }}>
                    <Carousel id="carousel-item" ref={carouselRef} slidesToShow={5} style={{ width: '100%' }}>
                        {data.map((km) => {
                            const Danhgia = danhgia.filter((state) => state.Product === km._id);
                            const LuotDanhGia = Danhgia.filter((item) => item.Rate !== 0);
                            const TongDiemDanhGia = LuotDanhGia.reduce((sum, item) => sum + item.Rate, 0);
                            const TrungbinhDanhGia = LuotDanhGia.length > 0 ? TongDiemDanhGia / LuotDanhGia.length : 0;

                            return (
                                <div
                                    key={km._id} // Sử dụng km._id làm key duy nhất
                                    style={{
                                        margin: '20px',
                                        position: 'relative',
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
                                        cover={<img alt="example" src={km.Image.Image1} style={{ height: '250px' }} />}
                                    >
                                        <div className={cx('name-Product')}>
                                            <span>{km.nameProduct}</span>
                                        </div>
                                        <div className={cx('price-Product')}>
                                            {km.KhuyenMai ? (
                                                <>
                                                    <span className={cx('price-old')}>
                                                        {DinhDangTien(km.PriceProduct)}đ
                                                    </span>
                                                    <span className={cx('price-current')}>
                                                        {DinhDangTien(km.GiaBanRa)}đ
                                                    </span>
                                                </>
                                            ) : (
                                                <span className={cx('price-current')}>
                                                    {DinhDangTien(km.GiaBanRa)}đ
                                                </span>
                                            )}
                                        </div>
                                        <Rate disabled defaultValue={TrungbinhDanhGia} />
                                        <div className={cx('order-item')}>
                                            <ButtonCustom primary onClick={(event) => handlecard(km, event)}>
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
                    </Carousel>
                </div>
            </ExtraLarge>
            <Large>
                <div style={{ margin: '5px' }}>
                    <Carousel id="carousel-item" ref={carouselRef} slidesToShow={4} style={{ width: '100%' }} autoplay>
                        {data.map((km) => {
                            const Danhgia = danhgia.filter((state) => state.Product === km._id);
                            const LuotDanhGia = Danhgia.filter((item) => item.Rate !== 0);
                            const TongDiemDanhGia = LuotDanhGia.reduce((sum, item) => sum + item.Rate, 0);
                            const TrungbinhDanhGia = LuotDanhGia.length > 0 ? TongDiemDanhGia / LuotDanhGia.length : 0;

                            return (
                                <div
                                    key={km._id} // Sử dụng km._id làm key duy nhất
                                    style={{
                                        margin: '20px',
                                        position: 'relative',
                                    }}
                                >
                                    <Card
                                        hoverable
                                        onClick={(event) => handleCardClick(km, event)} // Gán sự kiện onClick
                                        style={{
                                            width: 230,
                                            margin: '0 10px',
                                            userSelect: 'none',
                                        }}
                                        cover={<img alt="example" src={km.Image.Image1} style={{ height: '220px' }} />}
                                    >
                                        <div className={cx('name-Product')}>
                                            <span>{km.nameProduct}</span>
                                        </div>
                                        <div className={cx('price-Product')}>
                                            {km.KhuyenMai ? (
                                                <>
                                                    <span className={cx('price-old')}>
                                                        {DinhDangTien(km.PriceProduct)}đ
                                                    </span>
                                                    <span className={cx('price-current')}>
                                                        {DinhDangTien(km.GiaBanRa)}đ
                                                    </span>
                                                </>
                                            ) : (
                                                <span className={cx('price-current')}>
                                                    {DinhDangTien(km.GiaBanRa)}đ
                                                </span>
                                            )}
                                        </div>
                                        <Rate disabled defaultValue={TrungbinhDanhGia} />
                                        <div className={cx('order-item')}>
                                            <ButtonCustom primary onClick={(event) => handlecard(km, event)}>
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
                    </Carousel>
                </div>
            </Large>
            <Medium>
                <div style={{ margin: '5px' }}>
                    <Carousel id="carousel-item" ref={carouselRef} slidesToShow={3} style={{ width: '100%' }} autoplay>
                        {data.map((km) => {
                            const Danhgia = danhgia.filter((state) => state.Product === km._id);
                            const LuotDanhGia = Danhgia.filter((item) => item.Rate !== 0);
                            const TongDiemDanhGia = LuotDanhGia.reduce((sum, item) => sum + item.Rate, 0);
                            const TrungbinhDanhGia = LuotDanhGia.length > 0 ? TongDiemDanhGia / LuotDanhGia.length : 0;

                            return (
                                <div
                                    key={km._id} // Sử dụng km._id làm key duy nhất
                                    style={{
                                        margin: '20px',
                                        position: 'relative',
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
                                        cover={<img alt="example" src={km.Image.Image1} style={{ height: '250px' }} />}
                                    >
                                        <div className={cx('name-Product')}>
                                            <span>{km.nameProduct}</span>
                                        </div>
                                        <div className={cx('price-Product')}>
                                            {km.KhuyenMai ? (
                                                <>
                                                    <span className={cx('price-old')}>
                                                        {DinhDangTien(km.PriceProduct)}đ
                                                    </span>
                                                    <span className={cx('price-current')}>
                                                        {DinhDangTien(km.GiaBanRa)}đ
                                                    </span>
                                                </>
                                            ) : (
                                                <span className={cx('price-current')}>
                                                    {DinhDangTien(km.GiaBanRa)}đ
                                                </span>
                                            )}
                                        </div>
                                        <Rate disabled defaultValue={TrungbinhDanhGia} />
                                        <div className={cx('order-item')}>
                                            <ButtonCustom primary onClick={(event) => handlecard(km, event)}>
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
                    </Carousel>
                </div>
            </Medium>
            <Small>
                <div style={{ margin: '5px' }}>
                    <Carousel id="carousel-item" ref={carouselRef} slidesToShow={2} style={{ width: '100%' }}>
                        {data.map((km) => {
                            const Danhgia = danhgia.filter((state) => state.Product === km._id);
                            const LuotDanhGia = Danhgia.filter((item) => item.Rate !== 0);
                            const TongDiemDanhGia = LuotDanhGia.reduce((sum, item) => sum + item.Rate, 0);
                            const TrungbinhDanhGia = LuotDanhGia.length > 0 ? TongDiemDanhGia / LuotDanhGia.length : 0;

                            return (
                                <div
                                    key={km._id} // Sử dụng km._id làm key duy nhất
                                    style={{
                                        margin: '20px',
                                        position: 'relative',
                                    }}
                                >
                                    <Card
                                        hoverable
                                        onClick={(event) => handleCardClick(km, event)} // Gán sự kiện onClick
                                        style={{
                                            width: 250,
                                            margin: '0 10px',
                                            userSelect: 'none',
                                        }}
                                        cover={<img alt="example" src={km.Image.Image1} style={{ height: '250px' }} />}
                                    >
                                        <div className={cx('name-Product')}>
                                            <span>{km.nameProduct}</span>
                                        </div>
                                        <div className={cx('price-Product')}>
                                            {km.KhuyenMai ? (
                                                <>
                                                    <span className={cx('price-old')}>
                                                        {DinhDangTien(km.PriceProduct)}đ
                                                    </span>
                                                    <span className={cx('price-current')}>
                                                        {DinhDangTien(km.GiaBanRa)}đ
                                                    </span>
                                                </>
                                            ) : (
                                                <span className={cx('price-current')}>
                                                    {DinhDangTien(km.GiaBanRa)}đ
                                                </span>
                                            )}
                                        </div>
                                        <Rate disabled defaultValue={TrungbinhDanhGia} />
                                        <div className={cx('order-item')}>
                                            <ButtonCustom primary onClick={(event) => handlecard(km, event)}>
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
                    </Carousel>
                </div>
            </Small>
            <XSmall>
                <div style={{ margin: '5px', cursor: 'pointer' }}>
                    <Carousel
                        id="carousel-item__mobile"
                        ref={carouselRef}
                        slidesToShow={1}
                        style={{ width: '100%' }}
                        autoplay
                    >
                        {data.map((km) => {
                            const Danhgia = danhgia.filter((state) => state.Product === km._id);
                            const LuotDanhGia = Danhgia.filter((item) => item.Rate !== 0);
                            const TongDiemDanhGia = LuotDanhGia.reduce((sum, item) => sum + item.Rate, 0);
                            const TrungbinhDanhGia = LuotDanhGia.length > 0 ? TongDiemDanhGia / LuotDanhGia.length : 0;

                            return (
                                <div
                                    key={km._id} // Sử dụng km._id làm key duy nhất
                                    style={{
                                        margin: '20px',

                                        width: '100%',
                                    }}
                                >
                                    <div
                                        className={cx('promotion-mobile')}
                                        onClick={(event) => handleCardClick(km, event)}
                                    >
                                        <div className={cx('promotion-mobile__left')}>
                                            <img alt="example" src={km.Image.Image1} />
                                        </div>
                                        <div className={cx('promotion-mobile__right')}>
                                            <div className={cx('name-Product')}>
                                                <span>{km.nameProduct}</span>
                                            </div>
                                            <div className={cx('price-Product')}>
                                                {km.KhuyenMai ? (
                                                    <>
                                                        <span className={cx('price-old')}>
                                                            {DinhDangTien(km.PriceProduct)}đ
                                                        </span>
                                                        <span className={cx('price-current')}>
                                                            {DinhDangTien(km.GiaBanRa)}đ
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className={cx('price-current')}>
                                                        {DinhDangTien(km.GiaBanRa)}đ
                                                    </span>
                                                )}
                                            </div>
                                            <Rate disabled defaultValue={TrungbinhDanhGia} />
                                            <div className={cx('order-item')}>
                                                <ButtonCustom primary onClick={(event) => handlecard(km, event)}>
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
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
                <style jsx>{`
                    #carousel-item__mobile.ant-carousel .ant-carousel .slick-list .slick-slide.slick-active {
                        display: none !important;
                        justify-content: none;
                    }

                    #carousel-item__mobile.ant-carousel .slick-dots-bottom {
                        bottom: -25px;
                    }
                `}</style>
            </XSmall>
            <style jsx>{`
                #carousel-item.ant-carousel .slick-dots-bottom {
                    bottom: -40px !important;
                }
                .ant-card .ant-card-body {
                    padding: 10px !important;
                }
                .ant-carousel .slick-dots li {
                    width: 15px !important;
                    margin: 0 5px;
                    bottom: 10px !important;
                }
                .ant-carousel .slick-dots li.slick-active {
                    width: 15px !important;
                }
                #carousel-item.ant-carousel .slick-list .slick-slide.slick-active {
                    display: flex;
                    justify-content: center;
                }
                .ant-carousel .slick-dots li button {
                    width: 15px !important; /* Kích thước chấm */
                    height: 15px !important; /* Kích thước chấm */
                    border-radius: 50% !important; /* Hình tròn */
                    background: white !important; /* Màu nền chấm */
                    transition: background 0.3s !important; /* Hiệu ứng chuyển màu */
                    margin: 0 !important;
                    opacity: 1 !important;
                }
                .ant-carousel .slick-dots li.slick-active button {
                    background: yellow !important; /* Màu vàng khi được chọn */
                    border: 1px solid black;
                    border-radius: 50% !important; /* Hình tròn */
                }
            `}</style>
        </div>
    );
}

export default CarouselItem;
