import classNames from 'classnames/bind';
import styles from './InforProduct.module.scss';
import { useLocation } from 'react-router-dom';
import { Carousel, Flex, Image, Input, Progress, Rate, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import ButtonCustom from '~/components/Button';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { DanhGia, SanPham } from '~/redux/API/api';
import CarouselItem from '~/components/CarouselItem';
import Evaluate from '~/components/Evaluate';
import BreadcrumbMenu from '~/components/Breadcrumb';
import {
    ExtraLarge,
    Small,
    TabletAndDestop,
    TabletAndDestopLarge,
    TabletSmallAndDestopLarge,
    XSmall,
} from '~/components/Responsive';

const conicColors = {
    '0%': 'var(--primary)',
    '100%': 'var(--primary)',
};

const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

function getRandomItems(arr, maxItems) {
    // Trộn mảng
    const shuffled = arr.sort(() => 0.5 - Math.random());
    // Cắt mảng để lấy tối đa maxItems phần tử
    return shuffled.slice(0, maxItems);
}

const contentStyle = {
    margin: 0,
    height: '300px',
    width: ' 100%',
    position: 'relative',
};

const contentStyle1 = {
    margin: '5px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    width: '90%',
    height: '100px',
};

const contentStyle2 = {
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    width: ' 100%',
    height: '400px',
};

const contentStyleXSmall = {
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    width: ' 100%',
    height: '400px',
};

const CarouselXSmall = {
    margin: '11px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    width: '80%',
    height: '100px',
};

const cx = classNames.bind(styles);
function InforProduct() {
    const location = useLocation();
    const id = location.state?.km;
    const sanpham = useSelector((state) => state.sanpham?.sanpham?.sanpham) || [];
    const danhgia = useSelector((state) => state.danhgia?.danhgia?.danhgia) || [];
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const danhgiasanpham = danhgia.filter((state) => state.Product === id._id);
    const TongDiemDanhGia = danhgiasanpham.reduce((sum, item) => sum + item.Rate, 0);
    const trungbinhDG = Math.ceil((TongDiemDanhGia / danhgiasanpham.length) * 10) / 10;

    const SPcungloai = getRandomItems(
        sanpham.filter((state) => state.LoaiSanPham === id.LoaiSanPham),
        10,
    );
    const SPcungthuonghieu = getRandomItems(
        sanpham.filter((state) => state.NhaCungCap === id.NhaCungCap),
        10,
    );
    //===================================Đanh Giá chi tiêt========================================
    const danhgia5 = danhgiasanpham.filter((state) => state.Rate === 5);
    const tiledanhgia5 = (danhgia5.length / danhgiasanpham.length) * 100;

    const danhgia4 = danhgiasanpham.filter((state) => state.Rate === 4);
    const tiledanhgia4 = (danhgia4.length / danhgiasanpham.length) * 100;
    const danhgia3 = danhgiasanpham.filter((state) => state.Rate === 3);
    const tiledanhgia3 = (danhgia3.length / danhgiasanpham.length) * 100;

    const danhgia2 = danhgiasanpham.filter((state) => state.Rate === 2);
    const tiledanhgia2 = (danhgia2.length / danhgiasanpham.length) * 100;
    const danhgia1 = danhgiasanpham.filter((state) => state.Rate === 1);
    const tiledanhgia1 = (danhgia1.length / danhgiasanpham.length) * 100;
    //============================================================================================
    //=====================================================================================
    //Kiểm tra xem khách hàng đã mua sản phẩm đó chưa
    const hoadon = useSelector((state) => state.hoadon?.hoadon?.hoadon) || [];
    const chitiethoadon = useSelector((state) => state.chitiethoadon?.chitiethoadon?.chitiethoadon) || [];
    const hoaDonUser =
        hoadon?.filter(
            (state) => state.KhachHang === user?.KhachHang?._id && state.HoanThanh === true && state.TrangThai === true,
        ) || [];
    const sanPhamdamua = chitiethoadon.filter((state) => hoaDonUser.some((item) => item.IDHoaDon === state.IDHoaDon));
    const sanPhamTrung = sanPhamdamua.some((state) => state.Product === id._id);
    //=====================================================================================

    const [value, setValues] = useState(0);
    const handleIncrease = () => {
        setValues(value + 1);
    };
    const handleDecrease = () => {
        setValues(value - 1);
    };

    const [imageCurrent, setImageCurrent] = useState(id.Image.Image1);
    const onChange = (currentSlide) => {
        if (currentSlide === 0) {
            setImageCurrent(id.Image.Image1);
        } else if (currentSlide === 1) {
            setImageCurrent(id.Image.Image2);
        } else if (currentSlide === 2) {
            setImageCurrent(id.Image.Image3);
        } else if (currentSlide === 3) {
            setImageCurrent(id.Image.Image4);
        } else if (currentSlide === 4) {
            setImageCurrent(id.Image.Image5);
        }
    };

    const [openEvaluate, setOpenEvaluate] = useState(false);
    const handleEvaluate = () => {
        setOpenEvaluate(true);
    };

    const handleCancel = (value) => {
        setOpenEvaluate(value);
    };
    useEffect(() => {
        // Cuộn lên đầu trang khi component được mount
        window.scrollTo(0, 0);
    }, [location]); // Chạy lại khi location thay đổi

    useEffect(() => {
        DanhGia(dispatch);
        SanPham(dispatch);
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
                    <p> Thông tin sản phẩm</p>
                </div>
            </div>
            <BreadcrumbMenu />
            <TabletSmallAndDestopLarge>
                <div className={cx('infor-product')}>
                    <div className={cx('infor-product__left')}>
                        <div style={{ height: '400px' }}>
                            <Carousel
                                id="carousel-infor"
                                arrows
                                dotPosition="left"
                                dots={false}
                                autoplay
                                afterChange={onChange}
                                slidesToShow={5}
                            >
                                <div>
                                    <Image style={contentStyle1} src={id.Image.Image1} alt="Ảnh lỗi" />
                                </div>
                                <div>
                                    <Image style={contentStyle1} src={id.Image.Image2} alt="Ảnh lỗi" />
                                </div>
                                <div>
                                    <Image style={contentStyle1} src={id.Image.Image3} alt="Ảnh lỗi" />
                                </div>
                                <div>
                                    <Image style={contentStyle1} src={id.Image.Image4} alt="Ảnh lỗi" />
                                </div>
                                <div>
                                    <Image style={contentStyle1} src={id.Image.Image5} alt="Ảnh lỗi" />
                                </div>
                            </Carousel>
                            <style jsx>{`
                                .ant-image {
                                    width: 100% !important;
                                }
                                #carousel-infor.ant-carousel {
                                    height: 100%;
                                }
                                #carousel-infor.ant-carousel .slick-slider {
                                    height: 100% !important;
                                }
                                #carousel-infor.ant-carousel .slick-slider .slick-list {
                                    height: 100% !important;
                                }
                            `}</style>
                        </div>
                        <div>
                            <Image style={contentStyle2} src={imageCurrent} alt="Ảnh lỗi" />
                        </div>
                    </div>
                    <div>
                        <div className={cx('infor-newProduct')}>
                            <ExtraLarge>
                                <div className={cx('title')}>
                                    <h2>{id.nameProduct}</h2>
                                </div>
                            </ExtraLarge>
                            <TabletAndDestop>
                                <div className={cx('title-large')}>
                                    <h2>{id.nameProduct}</h2>
                                </div>
                            </TabletAndDestop>
                            <Small>
                                <div className={cx('title-small')}>
                                    <h2>{id.nameProduct}</h2>
                                </div>
                            </Small>

                            <div>
                                {id.KhuyenMai !== undefined ? (
                                    <>
                                        <span className={cx('price-old')}>{DinhDangTien(id.PriceProduct)}đ</span>
                                        <span className={cx('price-current')}>{DinhDangTien(id.GiaBanRa)}đ</span>
                                    </>
                                ) : (
                                    <span className={cx('price-current')}>{DinhDangTien(id.GiaBanRa)}</span>
                                )}
                            </div>
                            <Rate disabled defaultValue={trungbinhDG} />

                            <TabletAndDestopLarge>
                                <div className={cx('describe')}>
                                    {id.describe?.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line} <br />
                                        </span>
                                    ))}
                                </div>
                            </TabletAndDestopLarge>
                            <Small>
                                <div className={cx('describe', 'describe-small')}>
                                    {id.describe?.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line} <br />
                                        </span>
                                    ))}
                                </div>
                            </Small>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon
                                    icon={faMinus}
                                    className={cx('icon')}
                                    onClick={value > 0 ? handleDecrease : undefined}
                                />
                                <Input value={value} style={{ width: '20%' }} />
                                <FontAwesomeIcon icon={faPlus} className={cx('icon')} onClick={handleIncrease} />
                            </div>
                            <ButtonCustom primary>Thêm vào giỏ hàng</ButtonCustom>
                        </div>
                    </div>
                </div>
            </TabletSmallAndDestopLarge>
            <XSmall>
                <div className={cx('infor-product__xsmall')}>
                    <div className={cx('infor-product__img')}>
                        <div className={cx('infor-product__imgCurrent')}>
                            <Image style={contentStyleXSmall} src={imageCurrent} alt="Ảnh lỗi" />
                        </div>
                        <div className={cx('infor-product__imgCarousel')}>
                            <Carousel arrows dots={false} autoplay afterChange={onChange} slidesToShow={4}>
                                <div>
                                    <Image style={CarouselXSmall} src={id.Image.Image1} alt="Ảnh lỗi" />
                                </div>
                                <div>
                                    <Image style={CarouselXSmall} src={id.Image.Image2} alt="Ảnh lỗi" />
                                </div>
                                <div>
                                    <Image style={CarouselXSmall} src={id.Image.Image3} alt="Ảnh lỗi" />
                                </div>
                                <div>
                                    <Image style={CarouselXSmall} src={id.Image.Image4} alt="Ảnh lỗi" />
                                </div>
                                <div>
                                    <Image style={CarouselXSmall} src={id.Image.Image5} alt="Ảnh lỗi" />
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </XSmall>
            <style jsx>{`
                .ant-image {
                    width: 100% !important;
                }
                .ant-carousel {
                    width: 90%;
                    margin: 0 auto;
                }
            `}</style>
            <div className={cx('infor-product-ttsp')}>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            label: 'THÔNG TIN SẢN PHẨM',
                            key: '1',
                            children: (
                                <div className={cx('content-infor-product')}>
                                    <div>
                                        <h4 style={{ fontSize: '18px' }}>Thành phần:</h4>
                                        {id.ThanhPhan?.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line} <br />
                                            </span>
                                        ))}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '18px' }}>Hướng dẫn sử dụng:</h4>
                                        {id.HuongDanSuDung?.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line} <br />
                                            </span>
                                        ))}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '18px' }}>Hạn sử dụng:</h4>
                                        {id.HanSD?.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line} <br />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ),
                        },
                        {
                            label: 'ĐÁNH GIÁ',
                            key: '2',
                            children: (
                                <>
                                    <ExtraLarge>
                                        <div className={cx('evaluate')}>
                                            <div className={cx('evaluate-left')}>
                                                {isNaN(trungbinhDG) ? (
                                                    <div>
                                                        <span>{danhgiasanpham.length} đánh giá sản phẩm</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className={cx('evaluate-number')}>{trungbinhDG}</div>
                                                        <Rate disabled defaultValue={trungbinhDG} />
                                                        <div>
                                                            <span>{danhgiasanpham.length} đánh giá sản phẩm</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className={cx('evaluate-center')}>
                                                <Flex gap="small" vertical>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>5 </span>
                                                        <div style={{ width: '70%' }}>
                                                            <Progress
                                                                percent={tiledanhgia5}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia5.length}) Rất hài lòng
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>4</span>
                                                        <div style={{ width: '70%' }}>
                                                            <Progress
                                                                percent={tiledanhgia4}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia4.length}) Hài lòng
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>3</span>
                                                        <div style={{ width: '70%' }}>
                                                            <Progress
                                                                percent={tiledanhgia3}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia3.length}) Bình thường
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>2</span>
                                                        <div style={{ width: '70%' }}>
                                                            <Progress
                                                                percent={tiledanhgia2}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia2.length}) Không hài lòng
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>1</span>
                                                        <div style={{ width: '70%' }}>
                                                            <Progress
                                                                percent={tiledanhgia1}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia1.length}) Rất tệ
                                                        </span>
                                                    </div>
                                                </Flex>
                                            </div>

                                            <div className={cx('evaluate-right')}>
                                                {sanPhamTrung ? (
                                                    <div>
                                                        <span style={{ fontSize: '18px' }}>
                                                            Để lại đánh giá của bạn!
                                                        </span>
                                                        <ButtonCustom primary onClick={handleEvaluate}>
                                                            Viết đánh giá
                                                        </ButtonCustom>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <span
                                                            style={{
                                                                fontSize: '18px',
                                                                display: 'flex',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            Bạn cần phải mua sản phẩm mới được đánh giá!
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </ExtraLarge>
                                    <TabletAndDestop>
                                        <div className={cx('evaluateTableDes')}>
                                            <div className={cx('evaluate-left')}>
                                                {isNaN(trungbinhDG) ? (
                                                    <div>
                                                        <span>{danhgiasanpham.length} đánh giá sản phẩm</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className={cx('evaluate-number')}>{trungbinhDG}</div>
                                                        <Rate disabled defaultValue={trungbinhDG} />
                                                        <div>
                                                            <span>{danhgiasanpham.length} đánh giá sản phẩm</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className={cx('evaluate-center')}>
                                                <Flex gap="small" vertical>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>5 </span>
                                                        <div style={{ width: '70%' }}>
                                                            <Progress
                                                                percent={tiledanhgia5}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia5.length}) Rất hài lòng
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>4</span>
                                                        <div style={{ width: '70%' }}>
                                                            <Progress
                                                                percent={tiledanhgia4}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia4.length}) Hài lòng
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>3</span>
                                                        <div style={{ width: '70%' }}>
                                                            <Progress
                                                                percent={tiledanhgia3}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia3.length}) Bình thường
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>2</span>
                                                        <div style={{ width: '70%' }}>
                                                            <Progress
                                                                percent={tiledanhgia2}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia2.length}) Không hài lòng
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>1</span>
                                                        <div style={{ width: '70%' }}>
                                                            <Progress
                                                                percent={tiledanhgia1}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia1.length}) Rất tệ
                                                        </span>
                                                    </div>
                                                </Flex>
                                            </div>
                                        </div>
                                        <div className={cx('comment-evaluate')}>
                                            {sanPhamTrung ? (
                                                <div>
                                                    <ButtonCustom primary onClick={handleEvaluate}>
                                                        Viết đánh giá
                                                    </ButtonCustom>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span
                                                        style={{
                                                            fontSize: '18px',
                                                            display: 'flex',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        Bạn cần phải mua sản phẩm mới được đánh giá!
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </TabletAndDestop>
                                    <Small>
                                        <div className={cx('evaluateTableDes')}>
                                            <div className={cx('evaluate-left')}>
                                                {isNaN(trungbinhDG) ? (
                                                    <div>
                                                        <span>{danhgiasanpham.length} đánh giá sản phẩm</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className={cx('evaluate-number')}>{trungbinhDG}</div>
                                                        <Rate disabled defaultValue={trungbinhDG} />
                                                        <div>
                                                            <span>{danhgiasanpham.length} đánh giá sản phẩm</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className={cx('evaluate-center')}>
                                                <Flex gap="small" vertical>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>5 </span>
                                                        <div style={{ width: '57%' }}>
                                                            <Progress
                                                                percent={tiledanhgia5}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia5.length}) Rất hài lòng
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>4</span>
                                                        <div style={{ width: '57%' }}>
                                                            <Progress
                                                                percent={tiledanhgia4}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia4.length}) Hài lòng
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>3</span>
                                                        <div style={{ width: '57%' }}>
                                                            <Progress
                                                                percent={tiledanhgia3}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia3.length}) Bình thường
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>2</span>
                                                        <div style={{ width: '57%' }}>
                                                            <Progress
                                                                percent={tiledanhgia2}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia2.length}) Không hài lòng
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ paddingRight: '10px' }}>1</span>
                                                        <div style={{ width: '57%' }}>
                                                            <Progress
                                                                percent={tiledanhgia1}
                                                                showInfo={false}
                                                                strokeColor={conicColors}
                                                            />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>
                                                            ({danhgia1.length}) Rất tệ
                                                        </span>
                                                    </div>
                                                </Flex>
                                            </div>
                                        </div>
                                        <div className={cx('comment-evaluate')}>
                                            {sanPhamTrung ? (
                                                <div>
                                                    <ButtonCustom primary onClick={handleEvaluate}>
                                                        Viết đánh giá
                                                    </ButtonCustom>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span
                                                        style={{
                                                            fontSize: '18px',
                                                            display: 'flex',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        Bạn cần phải mua sản phẩm mới được đánh giá!
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </Small>
                                    <XSmall>
                                        <div>
                                            <div className={cx('evaluate-left')}>
                                                {isNaN(trungbinhDG) ? (
                                                    <div>
                                                        <span>{danhgiasanpham.length} đánh giá sản phẩm</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className={cx('evaluate-number')}>{trungbinhDG}</div>
                                                        <Rate disabled defaultValue={trungbinhDG} />
                                                        <div>
                                                            <span>{danhgiasanpham.length} đánh giá sản phẩm</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className={cx('evaluate-center')}>
                                                <div>
                                                    <Flex gap="small" vertical>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span style={{ paddingRight: '10px' }}>5 </span>
                                                            <div style={{ width: '50%' }}>
                                                                <Progress
                                                                    percent={tiledanhgia5}
                                                                    showInfo={false}
                                                                    strokeColor={conicColors}
                                                                />
                                                            </div>
                                                            <span style={{ paddingLeft: '10px' }}>
                                                                ({danhgia5.length}) Rất hài lòng
                                                            </span>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span style={{ paddingRight: '10px' }}>4</span>
                                                            <div style={{ width: '50%' }}>
                                                                <Progress
                                                                    percent={tiledanhgia4}
                                                                    showInfo={false}
                                                                    strokeColor={conicColors}
                                                                />
                                                            </div>
                                                            <span style={{ paddingLeft: '10px' }}>
                                                                ({danhgia4.length}) Hài lòng
                                                            </span>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span style={{ paddingRight: '10px' }}>3</span>
                                                            <div style={{ width: '50%' }}>
                                                                <Progress
                                                                    percent={tiledanhgia3}
                                                                    showInfo={false}
                                                                    strokeColor={conicColors}
                                                                />
                                                            </div>
                                                            <span style={{ paddingLeft: '10px' }}>
                                                                ({danhgia3.length}) Bình thường
                                                            </span>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span style={{ paddingRight: '10px' }}>2</span>
                                                            <div style={{ width: '50%' }}>
                                                                <Progress
                                                                    percent={tiledanhgia2}
                                                                    showInfo={false}
                                                                    strokeColor={conicColors}
                                                                />
                                                            </div>
                                                            <span style={{ paddingLeft: '10px' }}>
                                                                ({danhgia2.length}) Không hài lòng
                                                            </span>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span style={{ paddingRight: '10px' }}>1</span>
                                                            <div style={{ width: '50%' }}>
                                                                <Progress
                                                                    percent={tiledanhgia1}
                                                                    showInfo={false}
                                                                    strokeColor={conicColors}
                                                                />
                                                            </div>
                                                            <span style={{ paddingLeft: '10px' }}>
                                                                ({danhgia1.length}) Rất tệ
                                                            </span>
                                                        </div>
                                                    </Flex>
                                                </div>
                                            </div>
                                            <div className={cx('comment-evaluate')}>
                                                {sanPhamTrung ? (
                                                    <div>
                                                        <ButtonCustom primary onClick={handleEvaluate}>
                                                            Viết đánh giá
                                                        </ButtonCustom>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <span
                                                            style={{
                                                                fontSize: '18px',
                                                                display: 'flex',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            Bạn cần phải mua sản phẩm mới được đánh giá!
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </XSmall>
                                    <div>
                                        <Evaluate onClick={handleCancel} OpenEvaluate={openEvaluate} sanpham={id._id} />
                                    </div>
                                </>
                            ),
                        },
                    ]}
                />
                <XSmall>
                    <style jsx>{`
                        .ant-tabs .ant-tabs-tab {
                            font-size: 16px !important;
                            color: white;
                            font-weight: 700;
                        }
                    `}</style>
                </XSmall>
                <style jsx>{`
                    .ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap {
                        background-color: #0046ff;
                        padding-left: 10px;
                        border-top-left-radius: 20px;
                        border-top-right-radius: 20px;
                    }
                    ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
                        padding-left: 10px;
                    }
                    .ant-tabs-top > .ant-tabs-nav::before {
                        display: none !important;
                    }
                    .ant-tabs .ant-tabs-ink-bar {
                        background: var(--primary);
                    }
                    .ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar {
                        height: 4px;
                    }
                    .ant-tabs .ant-tabs-tab {
                        font-size: 20px;
                        color: white;
                        font-weight: 700;
                    }
                    .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                        color: var(--primary);
                    }
                    .ant-tabs-top > .ant-tabs-nav {
                        margin: 0 !important;
                    }
                `}</style>
            </div>

            <div className={cx('SPCL')}>
                <div className={cx('title-carousel')}>
                    <h2>Sản phẩm cùng loại</h2>
                </div>
                <div style={{ paddingBottom: '50px' }}>
                    <CarouselItem data={SPcungloai} />
                </div>
            </div>
            <div className={cx('SPCL')}>
                <div className={cx('title-carousel')}>
                    <h2>Thương hiệu</h2>
                </div>
                <div style={{ paddingBottom: '50px' }}>
                    <CarouselItem data={SPcungthuonghieu} />
                </div>
            </div>
        </div>
    );
}

export default InforProduct;
