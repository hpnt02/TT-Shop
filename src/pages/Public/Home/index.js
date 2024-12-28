import { Carousel } from 'antd';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ButtonCustom from '../../../components/Button/Button';
import CarouselItem from '~/components/CarouselItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NhaCungCap, SanPham } from '~/redux/API/api';
import NewProduct from '~/components/NewProduct';
import CardItem from '~/components/Card';
import { useLocation } from 'react-router-dom';
import { ExtraLarge, Large, Medium, Small, XSmall } from '~/components/Responsive';

const imgExtraLarge = {
    height: '100vh',
};

const imgLarge = {
    height: '300px',
};

const cx = classNames.bind(styles);
function Home() {
    const sanpham = useSelector((state) => state.sanpham?.sanpham?.sanpham) || [];
    const nhacungcap = useSelector((state) => state.nhacungcap?.nhacungcap?.nhacungcap) || [];
    const khuyenmai = sanpham.filter(
        (state) => state.KhuyenMai !== 0 && state.KhuyenMai !== undefined && state.KhuyenMai !== null,
    );

    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]); // Chạy lại khi location thay đổi

    useEffect(() => {
        SanPham(dispatch);
        NhaCungCap(dispatch);
    }, [dispatch]);
    return (
        <div className={cx('wrapper')}>
            <div>
                {/* Giao diện > 1200px */}
                <ExtraLarge>
                    <div className={cx('carousel')}>
                        <Carousel arrows>
                            <div className={cx('carousel-img')}>
                                <img
                                    style={imgExtraLarge}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730020209/1_jepibr.jpg"
                                    alt="Mô tả ảnh"
                                />
                                <div className={cx('content-slide')}>
                                    <span className={cx('conten-dlide_title')}> Thế Giới Mỹ Phẩm</span>
                                    <h2 className={cx('conten-dlide_title-2')}>
                                        Mỗi sản phẩm đều mang lại sự tươi mới cho bạn
                                    </h2>
                                    <ButtonCustom primary>Mua ngay</ButtonCustom>
                                </div>
                            </div>
                            <div className={cx('carousel-img')}>
                                <img
                                    style={imgExtraLarge}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730020320/2_rg7za2.jpg"
                                    alt="Mô tả ảnh"
                                />
                                <div className={cx('content-slide')}>
                                    <span className={cx('conten-dlide_title')}> Tự Tin Tỏa Sáng</span>
                                    <h2 className={cx('conten-dlide_title-2')}>
                                        Khám phá bí quyết làm đẹp từ thiên nhiên
                                    </h2>
                                    <ButtonCustom primary>Mua ngay</ButtonCustom>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </ExtraLarge>

                {/* Giao điện từ 992px tới 1119px */}
                <Large>
                    <div className={cx('carousel-large')}>
                        <Carousel arrows>
                            <div className={cx('carousel-img')}>
                                <img
                                    style={imgLarge}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730020209/1_jepibr.jpg"
                                    alt="Mô tả ảnh"
                                />
                                <div className={cx('content')}>
                                    <div className={cx('content-slide__tablet')}>
                                        <span className={cx('conten-dlide_title')}> Thế Giới Mỹ Phẩm</span>
                                        <h2 className={cx('conten-dlide_title-2')}>
                                            Mỗi sản phẩm đều mang lại sự tươi mới cho bạn
                                        </h2>
                                        <ButtonCustom primary>Mua ngay</ButtonCustom>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('carousel-img')}>
                                <img
                                    style={imgLarge}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730020320/2_rg7za2.jpg"
                                    alt="Mô tả ảnh"
                                />
                                <div className={cx('content')}>
                                    <div className={cx('content-slide__tablet')}>
                                        <span className={cx('conten-dlide_title')}> Tự Tin Tỏa Sáng</span>
                                        <h2 className={cx('conten-dlide_title-2')}>
                                            Khám phá bí quyết làm đẹp từ thiên nhiên
                                        </h2>
                                        <ButtonCustom primary>Mua ngay</ButtonCustom>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </Large>
                {/* Giao điện từ 768px tới 991px */}
                <Medium>
                    <div className={cx('carousel-medium')}>
                        <Carousel arrows>
                            <div className={cx('carousel-img')}>
                                <img
                                    style={imgLarge}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730020209/1_jepibr.jpg"
                                    alt="Mô tả ảnh"
                                />
                                <div className={cx('content')}>
                                    <div className={cx('content-slide__tablet')}>
                                        <span className={cx('conten-dlide_title')}> Thế Giới Mỹ Phẩm</span>
                                        <h2 className={cx('conten-dlide_title-2')}>
                                            Mỗi sản phẩm đều mang lại sự tươi mới cho bạn
                                        </h2>
                                        <ButtonCustom primary>Mua ngay</ButtonCustom>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('carousel-img')}>
                                <img
                                    style={imgLarge}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730020320/2_rg7za2.jpg"
                                    alt="Mô tả ảnh"
                                />
                                <div className={cx('content')}>
                                    <div className={cx('content-slide__tablet')}>
                                        <span className={cx('conten-dlide_title')}> Tự Tin Tỏa Sáng</span>
                                        <h2 className={cx('conten-dlide_title-2')}>
                                            Khám phá bí quyết làm đẹp từ thiên nhiên
                                        </h2>
                                        <ButtonCustom primary>Mua ngay</ButtonCustom>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </Medium>
                {/* Giao điện từ 576px tới 767px */}
                <Small>
                    <div className={cx('carousel-small')}>
                        <Carousel arrows>
                            <div className={cx('carousel-img')}>
                                <img
                                    style={imgLarge}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730020209/1_jepibr.jpg"
                                    alt="Mô tả ảnh"
                                />
                                <div className={cx('content')}>
                                    <div className={cx('content-slide__tablet')}>
                                        <span className={cx('conten-dlide_title')}> Thế Giới Mỹ Phẩm</span>
                                        <h2 className={cx('conten-dlide_title-2')}>
                                            Mỗi sản phẩm đều mang lại sự tươi mới cho bạn
                                        </h2>
                                        <ButtonCustom primary>Mua ngay</ButtonCustom>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('carousel-img')}>
                                <img
                                    style={imgLarge}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730020320/2_rg7za2.jpg"
                                    alt="Mô tả ảnh"
                                />
                                <div className={cx('content')}>
                                    <div className={cx('content-slide__tablet')}>
                                        <span className={cx('conten-dlide_title')}> Tự Tin Tỏa Sáng</span>
                                        <h2 className={cx('conten-dlide_title-2')}>
                                            Khám phá bí quyết làm đẹp từ thiên nhiên
                                        </h2>
                                        <ButtonCustom primary>Mua ngay</ButtonCustom>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </Small>
                {/* Giao điện dưới 576px */}
                <XSmall>
                    <div className={cx('carousel-Xsmall')}>
                        <Carousel arrows>
                            <div className={cx('carousel-img')}>
                                <img
                                    style={imgLarge}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730020209/1_jepibr.jpg"
                                    alt="Mô tả ảnh"
                                />
                                <div className={cx('content')}>
                                    <div className={cx('content-slide__tablet')}>
                                        <span className={cx('conten-dlide_title')}> Thế Giới Mỹ Phẩm</span>
                                        <h2 className={cx('conten-dlide_title-2')}>
                                            Mỗi sản phẩm đều mang lại sự tươi mới cho bạn
                                        </h2>
                                        <ButtonCustom primary>Mua ngay</ButtonCustom>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('carousel-img')}>
                                <img
                                    style={imgLarge}
                                    src="https://res.cloudinary.com/di56pogid/image/upload/v1730020320/2_rg7za2.jpg"
                                    alt="Mô tả ảnh"
                                />
                                <div className={cx('content')}>
                                    <div className={cx('content-slide__tablet')}>
                                        <span className={cx('conten-dlide_title')}> Tự Tin Tỏa Sáng</span>
                                        <h2 className={cx('conten-dlide_title-2')}>
                                            Khám phá bí quyết làm đẹp từ thiên nhiên
                                        </h2>
                                        <ButtonCustom primary>Mua ngay</ButtonCustom>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </XSmall>
                <style jsx>{`
                    .ant-carousel {
                        height: 100%;
                    }

                    .ant-carousel .slick-slider {
                        height: 100%;
                    }

                    .ant-carousel .slick-dots li {
                        width: 15px !important;
                        margin: 0 5px;
                        bottom: 10px !important;
                    }
                    .ant-carousel .slick-dots li.slick-active {
                        width: 15px !important;
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
            {/*================================== Sản phẩm bán chạy nhất======================================== */}
            <div className={cx('new-Product')}>
                <div className={cx('title')}>
                    <h2>Sản phẩm mới nhất</h2>
                </div>
                <div>
                    <NewProduct data={sanpham} />
                </div>
            </div>
            {/*=============================================== Thương hiệu=================================== */}
            <div className={cx('new-Product')}>
                <div className={cx('title')}>
                    <h2>Thương hiệu</h2>
                </div>
                <div className={cx('brand')}>
                    <CardItem data={nhacungcap} brand={true} />
                </div>
            </div>
            {/*================================= Chương trình khuyến mãi============================================= */}
            <div className={cx('promotion')}>
                <div className={cx('title')}>
                    <h2>Chương trình khuyến mãi</h2>
                </div>
                <div
                    style={{
                        width: '90%',
                        margin: '0 auto',
                        backgroundColor: '#E49F47',
                        position: 'relative',
                        height: '30px',
                    }}
                >
                    <img
                        className={cx('img-km')}
                        src="https://res.cloudinary.com/di56pogid/image/upload/v1730143626/loathongbao_s91vnc.png"
                        alt="Ảnh lỗi"
                    />
                    <div className={cx('thongbao-km')}>
                        <div className={cx('infor-km')}>
                            Khuyến mãi lớn: Giảm giá hấp dẫn cho tất cả mỹ phẩm, áp dụng từ ngày 1/11 đến 15/11!
                        </div>
                    </div>
                </div>
                <CarouselItem data={khuyenmai} />
            </div>
        </div>
    );
}

export default Home;
