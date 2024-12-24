import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Select, Upload, Button, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from '../QLSP.module.scss';
import { SanPham, UpdateSanPham } from '~/redux/API/api';
import config from '~/config';
import { useState } from 'react';
import Title from '~/components/Title';

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const cx = classNames.bind(styles);
function EditSP() {
    const location = useLocation();
    const id = location.state?.id;
    const nhacungcap = useSelector((state) => state.nhacungcap?.nhacungcap?.nhacungcap) || [];
    const loaisanpham = useSelector((state) => state.loaisanpham?.loaisanpham?.loaisanpham) || [];
    const user = useSelector((state) => state.auth.login.currentUser);
    const sanpham = useSelector((state) => state.sanpham?.sanpham?.sanpham) || [];
    const record = sanpham.filter((state) => state._id === id)[0] || '';

    const imageArray =
        record.Image &&
        Object.keys(record.Image)
            .filter((key) => key.startsWith('Image') && record.Image[key] !== null) // Lọc các thuộc tính bắt đầu bằng 'Image' và không phải null
            .map((key) => ({ url: record.Image[key] })); // Tạo mảng object với thuộc tính 'url'

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState(imageArray);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange1 = ({ fileList: newFileList }) => setFileList(newFileList);

    const onFinish = async (values) => {
        const { IdLoaiSanPham, IdNhaCungCap, Image, Number, ...props } = values;
        // Kiểm tra xem Image có tồn tại và là mảng không
        const imageUrls = fileList.map((file) => file.response?.url || file.url);

        props.Image1 = imageUrls?.[0];
        props.Image2 = imageUrls?.[1];
        props.Image3 = imageUrls?.[2];
        props.Image4 = imageUrls?.[3];
        props.Image5 = imageUrls?.[4];

        props.Number = record.Number + parseInt(Number);

        await UpdateSanPham(props, dispatch, record._id, navigate);
        SanPham(dispatch, user?.accessToken);
    };

    const formatNumber = (value) => {
        // Chuyển đổi số thành chuỗi với dấu phân cách
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleChange = (e) => {
        const { value } = e.target;

        // Loại bỏ dấu phân cách trước khi lưu vào state
        const unformattedValue = value.replace(/\./g, '');
        form.setFieldsValue({ PriceProduct: formatNumber(unformattedValue) });
    };

    const handleNavigate = () => {
        navigate(config.routes.qlsp);
    };

    return (
        <div style={{ marginBottom: '15px' }}>
            <Title title="Chỉnh sửa thông tin sản phẩm" />
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    width: '95%',
                    margin: '0 auto',
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className={cx('form-input')}>
                    <div>
                        <Form.Item
                            label="Tên sản phẩm"
                            name="nameProduct"
                            initialValue={record.nameProduct}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên sản phẩm!',
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Form.Item>
                        <Form.Item
                            label="Giá tiền"
                            name="PriceProduct"
                            initialValue={record.PriceProduct}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá tiền!',
                                },
                            ]}
                        >
                            <Input onChange={handleChange} />
                        </Form.Item>
                        <Form.Item
                            label="Nhà cung cấp"
                            name="NhaCungCap"
                            initialValue={record.NhaCungCap}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn nhà cung cấp!',
                                },
                            ]}
                        >
                            <Select>
                                {nhacungcap.map((ncc, index) => {
                                    return (
                                        <Select.Option key={index} value={ncc._id}>
                                            {ncc.nameNCC}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Khuyến mãi">
                            <Form.Item name="KhuyenMai" noStyle initialValue={record.KhuyenMai}>
                                <InputNumber min={0} max={100} />
                            </Form.Item>
                            <span
                                className="ant-form-text"
                                style={{
                                    marginInlineStart: 8,
                                }}
                            >
                                %
                            </span>
                        </Form.Item>
                        <Form.Item name="describe" label="Mô tả" initialValue={record.describe}>
                            <Input.TextArea
                                showCount
                                maxLength={1000}
                                style={{
                                    height: 120,
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="Hướng dẫn sử dụng" name="HuongDanSuDung" initialValue={record.HuongDanSuDung}>
                            <Input autoComplete="off" />
                        </Form.Item>
                        <Form.Item label="Hạn sử dụng" name="HanSD" initialValue={record.HanSD}>
                            <Input autoComplete="off" />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Số lượng"
                            name="Number"
                            initialValue="0"
                            rules={[
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject(new Error('Số lượng phải lớn hơn 0!'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Loại sản phẩm"
                            name="LoaiSanPham"
                            initialValue={record.LoaiSanPham}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn loại sản phẩm!',
                                },
                            ]}
                        >
                            <Select>
                                {loaisanpham.map((lsp, index) => {
                                    return (
                                        <Select.Option key={index} value={lsp._id}>
                                            {lsp.nameLoaiSP}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Chọn ảnh" name="Image" valuePropName="fileList" getValueFromEvent={normFile}>
                            <>
                                <Upload
                                    multiple
                                    action="https://api.cloudinary.com/v1_1/di56pogid/image/upload"
                                    listType="picture-card"
                                    accept="image/*" // Chỉ chấp nhận file hình ảnh
                                    data={{
                                        upload_preset: process.env.REACT_APP_UPLOAD_ASSETS_NAME, // Thay thế bằng upload preset của bạn
                                    }}
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange1}
                                >
                                    {fileList.length >= 5 ? null : 'Upload'}
                                </Upload>
                                {previewImage && (
                                    <Image
                                        wrapperStyle={{ display: 'none' }}
                                        preview={{
                                            visible: previewOpen,
                                            onVisibleChange: (visible) => setPreviewOpen(visible),
                                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                        }}
                                        src={previewImage}
                                    />
                                )}
                            </>
                        </Form.Item>
                        <Form.Item name="ThanhPhan" label="Thành phần" initialValue={record.ThanhPhan}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="Dung tích" name="DungTich" initialValue={record.DungTich}>
                            <Input autoComplete="off" />
                        </Form.Item>
                    </div>
                </div>
                <div style={{ width: '100%', margin: '0 auto', justifyContent: 'center', display: 'flex' }}>
                    <Button
                        style={{ backgroundColor: 'white', marginRight: '5px', width: '10%' }}
                        onClick={handleNavigate}
                    >
                        Trở về
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: '5px', width: '10%' }}>
                        Lưu
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default EditSP;
