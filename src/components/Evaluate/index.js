import classNames from 'classnames/bind';
import styles from './Evaluate.module.scss';
import { Form, Image, Input, Rate, Upload } from 'antd';
import ButtonCustom from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { Account, DanhGia, TMDG } from '~/redux/API/api';
import { Avatar, List } from 'antd';
import React from 'react';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(styles);

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
function Evaluate({ ...props }) {
    const user = useSelector((state) => state.auth.login.currentUser);
    const danhgia = useSelector((state) => state.danhgia?.danhgia?.danhgia) || [];
    const danhgiasanpham = danhgia.filter((state) => state.Product === props.sanpham);
    const accountKH = useSelector((state) => state.account?.account?.account) || '';
    const newDanhgia = danhgiasanpham.map((dg, index) => {
        const khachHang = accountKH.find((state) => state.KhachHang._id === dg.KhachHang);
        const data = {
            ...dg,
            avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`,
            HoTenKH: khachHang.KhachHang.HoTenKH,
        };
        return data;
    });

    const sortedDanhgia = newDanhgia.sort((a, b) => {
        // Kiểm tra xem có người dùng hay không
        if (!user) {
            // Nếu không có user, sắp xếp tất cả theo createdAt
            return new Date(b.createAt) - new Date(a.createAt); // Sắp xếp theo thời gian tạo, mới nhất lên trước
        }

        // Đưa đánh giá của người dùng lên đầu
        if (a.KhachHang === user.KhachHang._id) return -1; // a là của user
        if (b.KhachHang === user.KhachHang._id) return 1; // b là của user

        // Nếu cả a và b không phải của user, sắp xếp theo createdAt
        return new Date(b.createdAt) - new Date(a.createdAt); // Sắp xếp theo thời gian tạo, mới nhất lên trước
    });

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleRateChange = (value) => {
        form.setFieldsValue({ Rate: value });
    };

    const [openEvaluate, setOpenEvaluate] = useState(props.OpenEvaluate);
    useEffect(() => {
        setOpenEvaluate(props.OpenEvaluate);
    }, [props.OpenEvaluate]);
    const handleCancel = () => {
        setOpenEvaluate(false);
        props.onClick(false);
    };
    const formRef = useRef(null);
    const [fileList, setFileList] = useState('');

    const handleChange1 = ({ fileList: newFileList }) => setFileList(newFileList);
    const onFinish = (values) => {
        const Images = values?.Image?.map((imge) => imge.response.url) || [];
        const data = {
            KhachHang: user?.KhachHang._id,
            Rate: values.Rate,
            GhiChu: values.GhiChu,
            Product: props.sanpham,
            Images: Images,
        };
        console.log('values', values);
        // Kiểm tra xem khách hàng đã đánh giá sản phẩm này chưa
        const hasRated = danhgiasanpham.some((dg) => dg.KhachHang === data.KhachHang);
        if (hasRated) {
            toast.warning('Bạn đã đánh giá sản phẩm này rồi!', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            TMDG(data, dispatch);
            DanhGia(dispatch);
        }
    };
    useEffect(() => {
        Account(dispatch);
        DanhGia(dispatch);
    }, [dispatch]);
    return (
        <div>
            {openEvaluate ? (
                <div className={cx('slide-down')}>
                    <div>
                        <Form
                            ref={formRef}
                            form={form}
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ width: '100%' }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <div className={cx('form-evaluate')}>
                                <div>
                                    <Form.Item
                                        label="Đánh giá sản phẩm"
                                        name="Rate"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn mức đánh giá',
                                            },
                                        ]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Rate
                                            onChange={handleRateChange}
                                            style={{ fontSize: '30px', color: 'var(--primary)' }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        layout="GhiChu"
                                        label="Nhận xét về sản phẩm"
                                        name="GhiChu"
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
                                </div>
                                <div>
                                    <Form.Item
                                        label="Chọn ảnh"
                                        name="Image"
                                        layout="Image"
                                        valuePropName="fileList"
                                        getValueFromEvent={normFile}
                                        labelCol={{
                                            span: 24,
                                        }}
                                        wrapperCol={{
                                            span: 24,
                                        }}
                                    >
                                        <Upload
                                            multiple
                                            action="https://api.cloudinary.com/v1_1/di56pogid/image/upload"
                                            listType="picture-card"
                                            accept="image/*" // Chỉ chấp nhận file hình ảnh
                                            data={{
                                                upload_preset: process.env.REACT_APP_UPLOAD_ASSETS_NAME, // Thay thế bằng upload preset của bạn
                                            }}
                                            fileList={fileList}
                                            onChange={handleChange1}
                                        >
                                            {fileList.length >= 5 ? null : (
                                                <button
                                                    style={{
                                                        border: 0,
                                                        background: 'none',
                                                    }}
                                                    type="button"
                                                >
                                                    <FontAwesomeIcon icon={faPlusCircle} />
                                                    <div
                                                        style={{
                                                            marginTop: 8,
                                                        }}
                                                    >
                                                        Upload
                                                    </div>
                                                </button>
                                            )}
                                        </Upload>
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>
                        <style jxs>
                            {`.ant-col-24.ant-form-item-label >label{
                                font-size: 20px;
                                font-style:italic
                            }`}
                        </style>
                        <div className={cx('btn')}>
                            <ButtonCustom primary onClick={handleCancel}>
                                Bỏ qua
                            </ButtonCustom>
                            <ButtonCustom
                                primary
                                onClick={() => formRef.current.submit()} // Programmatically submit the form
                            >
                                Thêm đánh giá
                            </ButtonCustom>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('slide-down1')}></div>
            )}
            <div className={cx("evaluate-customer")} style={{ wordWrap: 'break-word', margin: '20px 20px' }}>
                <h2>Đánh giá của khách hàng</h2>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        align: 'center',
                        pageSize: 3,
                    }}
                    locale={{ emptyText: 'Chưa có đánh giá nào!' }}
                    dataSource={sortedDanhgia}
                    renderItem={(item) => (
                        <List.Item key={item.title}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} style={{ width: '60px', height: '60px' }} />}
                                title={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p>{item.HoTenKH} </p>{' '}
                                        <span
                                            style={{
                                                paddingLeft: '10px',
                                                fontSize: '15px',
                                                color: 'rgba(0, 0, 0, 0.45)',
                                            }}
                                        >
                                            Ngày đăng: {moment(item.createAt).local().format('DD/MM/YYYY HH:mm:ss')}
                                        </span>
                                    </div>
                                }
                                description={<Rate disabled defaultValue={item.Rate} />}
                            />
                           <span className={cx('evaluate-content')}> {item.GhiChu}</span>
                            <div className={cx('evaluate-img')}>
                                {item.Images.map((img) => {
                                    return (
                                        <div className={cx('item-img')}>
                                        <Image
                                            src={img}
                                            alt=""
                                            style={{
                                                width: '100%',
                                                maxWidth: '100px',
                                                height: '100px',
                                            }}
                                        />
                                        </div>
                                    );
                                })}
                            </div>
                        </List.Item>
                    )}
                />
                <ToastContainer
                    position="top-right"
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
        </div>
    );
}

export default Evaluate;
