import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalInput from '~/components/Modal';
import TableData from '~/components/TableData';
import { deleteNhanVien, DSNV, TMNV, UpdateNhanVien } from '~/redux/API/api';
import { Form, Input } from 'antd';
import classNames from 'classnames/bind';
import styles from './QLNV.module.scss';
import ModalDelete from '~/components/ModalDelete';
import { deleteDSNVStart, TMNVStart } from '~/redux/model/NhanVien';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '~/components/Title';
const cx = classNames.bind(styles);
const columns = [
    {
        title: 'Mã nhân viên',
        dataIndex: 'MaNhanVien',
        align: 'center',
        editable: true,
        fixed: 'left',
    },
    {
        title: 'Họ Tên NV',
        dataIndex: 'HoTenNV',
        align: 'center',
        editable: true,
    },
    {
        title: 'Ngày Sinh',
        dataIndex: 'NgaySinh',
        align: 'center',
        editable: true,
    },
    {
        title: 'Địa Chỉ',
        dataIndex: 'DiaChi',
        align: 'center',
        editable: true,
    },
    {
        title: 'Ngày Vào Làm',
        dataIndex: 'NgayVaoLam',
        align: 'center',
        editable: true,
    },
    {
        title: 'SDT',
        dataIndex: 'SDT',
        align: 'center',
        editable: true,
    },
    {
        title: 'CCCD',
        dataIndex: 'CCCD',
        align: 'center',
        editable: true,
    },
];

function QLNV() {
    const nhanvien = useSelector((state) => state.dsnv?.dsnv?.dsnv) || [];
    const user = useSelector((state) => state.auth.login.currentUser);
    const { success, error } = useSelector((state) => state.dsnv.dsnv);
    const successTMNV = useSelector((state) => state.dsnv?.tmnv?.success) || false;
    const dispatch = useDispatch();
    const resultArray = [];
    const handleData = async (value) => {
        const { _id, key, ...otherProps } = value;
        await UpdateNhanVien(otherProps, dispatch, _id);
        DSNV(dispatch);
    };
    const [Value, setValue] = useState('');
    const handleRowData = async (value) => {
        setValue(value);
    };

    const handleDelete = async () => {
        try {
            await Promise.all(Value.map((state) => deleteNhanVien(dispatch, state._id,user?.accessToken)));
        } catch (error) {
            console.error('Error deleting:', error);
        } finally {
            setValue('');
            DSNV(dispatch);
        }
    };

    useEffect(() => {
        if (success || successTMNV) {
            toast.success(`${success ? 'Xóa' : 'Thêm'} nhân viên thành công`, {
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
                dispatch(deleteDSNVStart());
            } else {
                dispatch(TMNVStart());
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
            dispatch(deleteDSNVStart());
        }
    }, [success, error, dispatch, successTMNV]);

    nhanvien.forEach((nv, index) => {
        // Tạo đối tượng mới với dữ liệu đã lọc
        const data = {
            _id: nv._id,
            key: index.toString(),
            MaNhanVien: nv.MaNhanVien,
            HoTenNV: nv.HoTenNV,
            NgaySinh: nv.NgaySinh,
            DiaChi: nv.DiaChi,
            NgayVaoLam: nv.NgayVaoLam,
            SDT: nv.SDT,
            CCCD: nv.CCCD,
        };

        // Thêm vào mảng kết quả
        resultArray.push(data);
    });

    //Dữ liệu từ Form
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        await TMNV(values, dispatch);
        setValue('');
        DSNV(dispatch);
        form.resetFields();
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
            DSNV(dispatch);
    }, [dispatch]);
    return (
        <div className={cx('wrapperr')}>
            <Title title='Danh sách nhân viên'/>
            <div className={cx('btn-op')}>
                <ModalInput title="Thêm mới nhân viên" form={form} onSubmit={() => form.submit()}>
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
                            maxWidth: 600,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="userName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tài khoản!',
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu',
                                },
                            ]}
                        >
                            <Input.Password autoComplete="off" />
                        </Form.Item>
                        <Form.Item
                            label="Mã nhân viên"
                            name="MaNhanVien"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mã nhân viên!',
                                },
                                {
                                    min: 8,
                                    max: 8,
                                    message: 'Mã nhân viên phải có đúng 8 ký tự!',
                                },
                            ]}
                        >
                            <Input showCount maxLength={8} autoComplete="off" />
                        </Form.Item>
                        <Form.Item
                            label="Họ tên nhân viên"
                            name="HoTenNV"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập họ và tên nhân viên!',
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="DiaChi"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng địa chỉ nhân viên!',
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày Sinh"
                            name="NgaySinh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập ngày sinh!',
                                },
                                {
                                    pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                                    message: 'Ngày sinh phải đúng định dạng DD/MM/YYYY!',
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày vào làm"
                            name="NgayVaoLam"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập ngày vào làm!',
                                },
                                {
                                    pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                                    message: 'Ngày vào làm phải đúng định dạng DD/MM/YYYY!',
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="SDT"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng nhập số điện thoại của nhân viên!',
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Form.Item>
                        <Form.Item
                            label="CCCD"
                            name="CCCD"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập CCCD của nhân viên!',
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Form.Item>
                    </Form>
                </ModalInput>

                <ModalDelete label="nhân viên" onClick={handleDelete} data={Value} />
            </div>

            <TableData columnData={columns} rowData={resultArray} onClick={handleData} onChange={handleRowData} />
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
    );
}

export default QLNV;
