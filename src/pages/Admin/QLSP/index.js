import { Image, Table } from 'antd';
import TableData from '~/components/TableData';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { ChiTietHoaDon, deleteSanPham, LoaiSanPham, NhaCungCap, SanPham, TMSP } from '~/redux/API/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import ModalDelete from '~/components/ModalDelete';
import { Form, Input, InputNumber, Select, Upload} from 'antd';
import ModalInput from '~/components/Modal';
import classNames from 'classnames/bind';
import styles from './QLSP.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { deleteSanPhamStart, TMSPStart } from '~/redux/model/SanPham';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import Title from '~/components/Title';
const cx = classNames.bind(styles);
const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

function QLSP() {
    const columns = [
        Table.EXPAND_COLUMN,
        {
            title: 'Hình Ảnh',
            dataIndex: 'HinhAnh',
            align: 'center',
            editable: true,
            render: (text, values) => {
                return (
                    <Image
                        src={values.Image?.Image1}
                        alt="Ảnh lỗi"
                        style={{
                            width: '100%',
                            height: '100px',
                            maxWidth: '150px',
                        }}
                    />
                );
            },
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'nameProduct',
            key: 'nameProduct',
            editable: true,
            fixed: 'left',
            align: 'center',
        },

        {
            title: 'Số lượng',
            dataIndex: 'Number',
            key: 'Number',
            align: 'center',
        },
        {
            title: 'Giá gốc(VND)',
            dataIndex: 'PriceProduct',
            key: 'PriceProduct',
            align: 'center',
        },
        {
            title: 'Khuyến mãi',
            dataIndex: 'KhuyenMai',
            key: 'KhuyenMai',
            align: 'center',
        },
        {
            title: 'Giá bán ra',
            dataIndex: 'GiaBanRa',
            key: 'GiaBanRa',
            align: 'center',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'LoaiSanPham',
            key: 'LoaiSanPham',

            align: 'center',
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'NhaCungCap',
            key: 'NhaCungCap',
            align: 'center',
        },
        {
            title: 'Chức năng',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            fixed: 'right',
            render: (text, record) => (
                <h2 style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleClick(record)}>
                    <FontAwesomeIcon icon={faEdit} />
                </h2> // Gọi hàm handleClick
            ),
        },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sanpham = useSelector((state) => state.sanpham?.sanpham?.sanpham) || [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const nhacungcap = useSelector((state) => state.nhacungcap?.nhacungcap?.nhacungcap) || [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loaisanpham = useSelector((state) => state.loaisanpham?.loaisanpham?.loaisanpham) || [];
    const user = useSelector((state) => state.auth.login.currentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const chitiethoadon = useSelector((state) => state.chitiethoadon?.chitiethoadon?.chitiethoadon) || [];

    const { success, error } = useSelector((state) => state.sanpham.sanpham);
    const successTMNV = useSelector((state) => state.sanpham?.tmsp?.success) || false;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [menuLSP, setMenuLSP] = useState("All")
    const handleLSP = (e) =>{
        setMenuLSP(e.target.value)
    }

    const newData = useMemo(() => {
        const data = [];
        sanpham.forEach((sp, index) => {
            if (sp.LoaiSanPham === menuLSP || menuLSP === 'All') {
                const newNhacungcap = nhacungcap.find((state) => state._id === sp.NhaCungCap);
                const newLoaiSanPham = loaisanpham.find((state) => state._id === sp.LoaiSanPham);
                const Soluong = chitiethoadon.filter((state) => state.Product === sp._id);
                const tongSoLuong = Soluong.reduce((total, item) => total + item.Number, 0);
                const remainingNumber = sp.Number - tongSoLuong;
                const itemData = {
                    _id: sp._id,
                    key: index.toString(),
                    IdLoaiSanPham: newLoaiSanPham?._id,
                    IdNhaCungCap: newNhacungcap?._id,
                    nameProduct: sp.nameProduct,
                    Number: remainingNumber,
                    PriceProduct: DinhDangTien(sp.PriceProduct),
                    describe: sp.describe,
                    Image: sp.Image,
                    LoaiSanPham: newLoaiSanPham?.nameLoaiSP,
                    ThanhPhan: sp.ThanhPhan,
                    HuongDanSuDung: sp.HuongDanSuDung,
                    DungTich: sp.DungTich,
                    HanSD: sp.HanSD,
                    NhaCungCap: newNhacungcap?.nameNCC,
                    KhuyenMai: sp.KhuyenMai ? sp.KhuyenMai : 0,
                    GiaBanRa: DinhDangTien(sp.GiaBanRa),
                };

                // Thêm vào mảng kết quả
                data.push(itemData);
            }
        });
        return data;
    }, [sanpham, nhacungcap, loaisanpham, chitiethoadon, menuLSP])

    
    const handleClick = (record) => {
        const id = record._id;

        navigate(config.routes.editSP, { state: { id } });
    };

    const [Value, setValue] = useState('');
    const handleRowData = async (value) => {
        setValue(value);
    };

    const [form] = Form.useForm();

    //Xóa
    const handleDelete = async (vs) => {
        try {
            await Promise.all(Value.map((state) => deleteSanPham(dispatch, state._id,user?.accessToken)));
        } catch (error) {
            console.error('Error deleting:', error);
        } finally {
            setValue('');
            SanPham(dispatch);
        }
    };

    //Thêm mới
    const onFinish = async (values) => {
        const { Image, PriceProduct, ...props } = values;
        props.Image1 = values.Image[0]?.response?.url;
        props.Image2 = values.Image[1]?.response?.url;
        props.Image3 = values.Image[2]?.response?.url;
        props.Image4 = values.Image[3]?.response?.url;
        props.Image5 = values.Image[4]?.response?.url;
        props.PriceProduct = String(parseInt(PriceProduct.replace(/\./g, ''), 10));
        await TMSP(props, dispatch);
        SanPham(dispatch);
        form.resetFields();

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

    useEffect(() => {
        if (success || successTMNV) {
            toast.success(`${success ? 'Xóa' : 'Thêm'} sản phẩm thành công`, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            if (success) {
                dispatch(deleteSanPhamStart());
            } else {
                dispatch(TMSPStart());
            }
        } else if (error) {
            toast.error('Vui lòng thử lại sau', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });

            dispatch(deleteSanPhamStart());
        }
    }, [success, error, dispatch, successTMNV]);

    //================================================TÌM KIẾM=========================================

    const [records, setRecords] = useState(newData);
   
    useEffect(() => {
        setRecords(newData);
    }, [newData]);
    function handleFilter(event) {
        const searchValue = event.target.value.toLowerCase();
        const data = newData.filter((row) => {
            const tensanpham = row.nameProduct?.toLowerCase() || '';
            const giagoc = row.PriceProduct?.toLowerCase() || '';
            return tensanpham.includes(searchValue) || giagoc.replace(/\./g, '').includes(searchValue);
        });
        setRecords(data);
    }
    //================================================================================================

   
    useEffect(() => {
        LoaiSanPham(dispatch);
        NhaCungCap(dispatch);
        SanPham(dispatch);
        ChiTietHoaDon(dispatch);
    }, [dispatch]);

    return (
        <div className={cx('wrapperr')}>
            <Title title="Danh sách sản phẩm"/>
            <nav className={cx('buttons')}>
                  <button onClick={handleLSP} value={"All"} className={cx("raise")}>Tất cả</button>
                {
                    loaisanpham.map((lsp, index) =>{
                        return(

                            <button onClick={handleLSP} key={index} value={lsp._id} className={cx("raise")}>{lsp.nameLoaiSP}</button>
                        )
                    })
                }
</nav>
            <div className={cx('btn-op')}>
                <Input
                    placeholder="Nhập tên sản phẩm"
                    onChange={handleFilter}
                    style={{ width: '300px', marginRight: '10px' }}
                />

                <ModalInput title="Thêm mới nhân viên" form={form} onSubmit={() => form.submit()} width={1000}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 1000,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <div className={cx('form-input')}>
                            <div>
                                <Form.Item
                                    label="Tên sản phẩm"
                                    name="nameProduct"
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
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập giá sản phẩm!',
                                        },
                                    ]}
                                >
                                    <Input onChange={handleChange} />
                                </Form.Item>
                                <Form.Item
                                    label="Nhà cung cấp"
                                    name="NhaCungCap"
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
                                <Form.Item name="describe" label="Mô tả">
                                    <Input.TextArea
                                        showCount
                                        maxLength={1000}
                                        style={{
                                            height: 120,
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item label="Hướng dẫn sử dụng" name="HuongDanSuDung">
                                    <Input.TextArea
                                        showCount
                                        maxLength={1000}
                                        style={{
                                            height: 120,
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item label="Hạn sử dụng" name="HanSD">
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item
                                    label="Số lượng"
                                    name="Number"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số lượng!',
                                        },
                                        {
                                            validator: (_, value) => {
                                                if (value <= 0) {
                                                    return Promise.reject(new Error('Số lượng phải lớn hơn 0!'));
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item label="Khuyến mãi">
                                    <Form.Item name="KhuyenMai" noStyle>
                                        <InputNumber />
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
                                <Form.Item
                                    label="Loại sản phẩm"
                                    name="LoaiSanPham"
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
                                <Form.Item
                                    label="Chọn ảnh"
                                    name="Image"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn ảnh!',
                                        },
                                    ]}
                                >
                                    <Upload
                                        action="https://api.cloudinary.com/v1_1/di56pogid/image/upload"
                                        listType="picture-card"
                                        accept="image/*" // Chỉ chấp nhận file hình ảnh
                                        data={{
                                            upload_preset: process.env.REACT_APP_UPLOAD_ASSETS_NAME, // Thay thế bằng upload preset của bạn
                                        }}
                                    >
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
                                    </Upload>
                                </Form.Item>
                                <Form.Item name="ThanhPhan" label="Thành phần">
                                    <Input.TextArea
                                        showCount
                                        style={{
                                            height: 130,
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item label="Dung tích" name="DungTich">
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </ModalInput>

                <ModalDelete label="sản phẩm" onClick={handleDelete} data={Value} />
            </div>
            <TableData
                columnData={columns}
                rowData={records}
                describe={true}
                onChange={handleRowData}
                operation={false}
                rowSelection={true}
            />
            
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

export default QLSP;
