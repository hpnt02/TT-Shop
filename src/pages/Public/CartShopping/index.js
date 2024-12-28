import classNames from 'classnames/bind';
import styles from './CartShopping.module.scss';
import { Form, Image, Input, Radio, Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChiTietHoaDon, deleteCTHD, HoaDon, SanPham, TMHD, TMPay, UpdateCTHD } from '~/redux/API/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import ButtonCustom from '~/components/Button';
import { useLocation } from 'react-router-dom';
import { TMHDStart } from '~/redux/model/HoaDon';
import { ToastContainer, toast } from 'react-toastify';
import BreadcrumbMenu from '~/components/Breadcrumb';
const contentStyle = {
    margin: 0,
    height: '300px',
    width: ' 100%',
};

const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const cx = classNames.bind(styles);
function CartShopping() {
    const columns = [
        {
            title: 'HÌNH ẢNH',
            dataIndex: 'HinhAnh',
            align: 'center',
            render: (text, values) => {
                return (
                    <Image
                        src={values.HinhAnh}
                        alt="Ảnh lỗi"
                        style={{
                            width: '100%',
                            height: '50px',
                            maxWidth: '50px',
                        }}
                    />
                );
            },
        },
        {
            title: 'TÊN SẢN PHẨM',
            dataIndex: 'Product',
            align: 'center',
        },
        {
            title: 'SỐ LƯỢNG',
            dataIndex: 'Number',
            align: 'center',
            width: '15%',
            render: (text, values) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesomeIcon
                            icon={faMinus}
                            className={cx('icon')}
                            onClick={values.Number > 1 ? () => handleDecrease(values) : undefined}
                        />
                        <Input value={values.Number} style={{ width: '50%' }} />
                        <FontAwesomeIcon icon={faPlus} className={cx('icon')} onClick={() => handleIncrease(values)} />
                    </div>
                );
            },
        },
        {
            title: 'GIÁ BÁN',
            dataIndex: 'PriceProduct',
            align: 'center',
        },
        {
            title: 'TỔNG GIÁ TIỀN',
            dataIndex: 'TotalPriceProduct',
            align: 'center',
        },
        {
            title: 'Xóa',
            dataIndex: 'Xoa',
            align: 'center',
            render: (text, record) => (
                <h2 style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleClick(record)}>
                    <FontAwesomeIcon icon={faTrash} />
                </h2> // Gọi hàm handleClick
            ),
        },
    ];

    const handleDecrease = (value) => {
        const data = {
            KhachHang: value.KhachHang,
            Product: value.IdProduct,
            Number: value.Number - 1,
            PriceProduct: parseInt(value.PriceProduct.replace(/\./g, ''), 10),
        };
        UpdateCTHD(data, dispatch, value._id);
        ChiTietHoaDon(dispatch);
    };

    const handleIncrease = async (value) => {
        const data = {
            KhachHang: value.KhachHang,
            Product: value.IdProduct,
            Number: value.Number + 1,
            PriceProduct: parseInt(value.PriceProduct.replace(/\./g, ''), 10),
        };
        UpdateCTHD(data, dispatch, value._id);
        ChiTietHoaDon(dispatch);
    };
    const sanpham = useSelector((state) => state.sanpham?.sanpham?.sanpham) || [];
    const user = useSelector((state) => state.auth.login.currentUser);
    const chitiethoadon = useSelector((state) => state.chitiethoadon?.chitiethoadon?.chitiethoadon) || [];
    const newGiohang =
        chitiethoadon.filter((state) => state.KhachHang === user?.KhachHang?._id && state.IDHoaDon === null) || [];

    const { success } = useSelector((state) => state.hoadon?.tmhd);

    const dispatch = useDispatch();
    const newData = newGiohang.map((sp, index) => {
        const Sanpham = sanpham.find((state) => state._id === sp?.Product);
        const data = {
            _id: sp._id,
            IdProduct: Sanpham?._id,
            KhachHang: sp?.KhachHang,
            HinhAnh: Sanpham?.Image.Image1,
            Product: Sanpham?.nameProduct,
            Number: sp?.Number,
            PriceProduct: DinhDangTien(sp?.PriceProduct),
            TotalPriceProduct: DinhDangTien(sp?.PriceProduct * sp?.Number),
        };
        return data;
    });

    const tongThanhTien = newData.reduce((total, item) => {
        return total + parseInt(item.TotalPriceProduct.replace(/\./g, ''), 10);
    }, 0);

    const onFinish = (values) => {
        if (values.PhuongThucThanhToan) {
            const data = {
                amount: tongThanhTien,
                bankCode: '',
                language: '',
            };
            TMPay(data, dispatch);
        } else {
            const data = {
                TenNguoiNhan: values.TenNguoiNhan,
                SDT: values.SDT,
                DiaChi: values.DiaChi,
                GhiChu: values.GhiChu,
                KhachHang: user.KhachHang._id,
                NhanVien: null,
                PhuongThucThanhToan: values.PhuongThucThanhToan,
                ThanhTien: tongThanhTien,
                TrangThai: false,
                HoanThanh: false,
            };
            TMHD(data, dispatch);
            ChiTietHoaDon(dispatch);
        }
    };

    const handleClick = (value) => {
        deleteCTHD(dispatch, value._id, user?.accessToken);
        ChiTietHoaDon(dispatch);
    };
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]); // Chạy lại khi location thay đổi
    useEffect(() => {
        if (success) {
            toast.success(` Đặt hàng thành công`, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            dispatch(TMHDStart());
        }
    }, [success, dispatch]);
    useEffect(() => {
        HoaDon(dispatch);
        ChiTietHoaDon(dispatch);
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
            </div>
            <BreadcrumbMenu />
            {newData.length > 0 ? (
                <div className={cx('cart')}>
                    <div className={cx('infor-cart')}>
                        <div>
                            <Table
                                columns={columns}
                                dataSource={newData}
                                pagination={false}
                                style={{ border: '2px solid #aba7a7', borderRadius: '10px' }}
                            />
                            <style jsx>{`
                                .ant-table-tbody {
                                    background-color: #c0dbdf !important;
                                }
                                .ant-table-cell-row-hover {
                                    background-color: #c0dbdf !important;
                                }
                                .ant-table-thead .ant-table-cell {
                                    background-color: #09d7df !important;
                                    border-bottom: 2px solid #aba7a7 !important;
                                }
                            `}</style>
                        </div>
                        <div className={cx('cart-right')}>
                            <div className={cx('cart-right__title')}>
                                <h2>THÔNG TIN ĐẶT HÀNG</h2>
                            </div>
                            <div className={cx('inner')}>
                                <div className={cx('total-price')}>
                                    <span className={cx('total')}>Tổng cộng:</span>
                                    <span className={cx('price')}>{DinhDangTien(tongThanhTien)}đ </span>
                                </div>

                                <div>
                                    <Form
                                        name="basic"
                                        labelCol={{
                                            span: 8,
                                        }}
                                        wrapperCol={{
                                            span: 16,
                                        }}
                                        style={{
                                            maxWidth: 600,
                                        }}
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label="Phương thức thanh toán"
                                            layout="PhuongThucThanhToan"
                                            name="PhuongThucThanhToan"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng chọn phương thức thanh toán',
                                                },
                                            ]}
                                            labelCol={{
                                                span: 24,
                                            }}
                                            wrapperCol={{
                                                span: 24,
                                            }}
                                        >
                                            <Radio.Group
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng chọn phương thức thanh toán',
                                                    },
                                                ]}
                                            >
                                                <Radio value={true}>Thanh toán qua ngân hàng </Radio>
                                                <br />
                                                <Radio value={false}>Thanh toán khi nhận hàng </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item
                                            layout="TenNguoiNhan"
                                            label="Tên người nhận"
                                            name="TenNguoiNhan"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập tên người nhận',
                                                },
                                            ]}
                                            labelCol={{
                                                span: 24,
                                            }}
                                            wrapperCol={{
                                                span: 24,
                                            }}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            layout="SDT"
                                            label="Số điện thoại người nhận"
                                            name="SDT"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập số điện thoại',
                                                },
                                            ]}
                                            labelCol={{
                                                span: 24,
                                            }}
                                            wrapperCol={{
                                                span: 24,
                                            }}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            layout="DiaChi"
                                            label="Địa chỉ"
                                            name="DiaChi"
                                            labelCol={{
                                                span: 24,
                                            }}
                                            wrapperCol={{
                                                span: 24,
                                            }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập địa chỉ',
                                                },
                                            ]}
                                        >
                                            <Input.TextArea
                                                style={{
                                                    height: 80,
                                                }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            layout="GhiChu"
                                            label="Ghi chú"
                                            name="GhiChu"
                                            labelCol={{
                                                span: 24,
                                            }}
                                            wrapperCol={{
                                                span: 24,
                                            }}
                                        >
                                            <Input.TextArea
                                                style={{
                                                    height: 80,
                                                }}
                                            />
                                        </Form.Item>
                                        <div className={cx('btn')}>
                                            <ButtonCustom primary htmlType="submit">
                                                Đặt hàng
                                            </ButtonCustom>
                                        </div>
                                    </Form>
                                    <style jsx>{`
                                        .ant-form-item {
                                            margin-bottom: 5px !important;
                                        }
                                    `}</style>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('giohang')}>
                    <div className={cx('image-giohang')}>
                        <img
                            src="https://res.cloudinary.com/di56pogid/image/upload/v1730785914/giohangtachnen_ywj7ue.png"
                            alt="Ảnh lỗi"
                        />
                        <h2>Không có sản phẩm trong giỏ hàng</h2>
                    </div>
                </div>
            )}
            <ToastContainer
                position="top-right"
                style={{ zIndex: '999' }}
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default CartShopping;
