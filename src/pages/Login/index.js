import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { loginUser, register } from '~/redux/API/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { registerStart } from '~/redux/model/Login';
import { ToastContainer, toast } from 'react-toastify';
import ButtonCustom from '~/components/Button';
const contentStyle = {
    margin: 0,
    height: '300px',
    width: '100%',
};

const cx = classNames.bind(styles);
function Login() {
    const location = useLocation();
    const id = location.state?.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, setLogin] = useState(id);
    useEffect(() => {
        setLogin(id);
    }, [id]);
    const { success, error } = useSelector((state) => state.auth?.register) || false;

    const Register = () => {
        setLogin(false);
    };

    const handleLogin = () => {
        setLogin(true);
    };
    //Ngăn người dùng bấm phím Space
    const handleKeyPress = (event) => {
        if (event.key === ' ') {
            event.preventDefault(); // Ngăn không cho nhập phím Space
        }
    };

    const onFinish = (values, formType) => {
        if (formType === 'login') {
            loginUser(values, dispatch, navigate);
        } else {
            const data = { ...values, rule: false };
            console.log('data', data);
            register(dispatch, data);
        }
    };

    useEffect(() => {
        if (success) {
            toast.success('Đăng ký thành công', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setLogin(true);
            dispatch(registerStart());
        }
    }, [success, dispatch]);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                <img
                    style={contentStyle}
                    src="https://res.cloudinary.com/di56pogid/image/upload/v1731317347/backkkkkkkkkkkk_lq7c5c.jpg"
                    alt="Mô tả ảnh"
                />
            </div>
            <div className={cx('title')}>
                <p>Chào mừng bạn đến với TTShop</p>
            </div>
            <div className={cx('login')}>
                <div className={cx('login-left')}>
                    <img
                        src="https://res.cloudinary.com/di56pogid/image/upload/v1731320344/login_%C4%91%C3%A3_tach_n%E1%BB%81n_q1vcod.png"
                        alt="Mô tả ảnh"
                    />
                </div>
                <div className={cx('login-right')}>
                    {login ? (
                        <>
                            <p className={cx('title-login')}>Đăng nhập</p>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 400,
                                    margin: '10px auto',
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={(values) => onFinish(values, 'login')}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    layout="userName"
                                    label="Username"
                                    name="userName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên đăng nhập!',
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
                                    layout="password"
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu!',
                                        },
                                    ]}
                                    labelCol={{
                                        span: 24,
                                    }}
                                    wrapperCol={{
                                        span: 24,
                                    }}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    style={{
                                        marginBottom: 0,
                                    }}
                                >
                                    <p className={cx('No-Account')}>
                                        Bạn chưa có tài khoản? <span onClick={Register}>Đăng ký ngay</span>
                                    </p>
                                </Form.Item>
                                <Form.Item
                                    style={{
                                        marginLeft: '38.166667%',
                                    }}
                                >
                                    <ButtonCustom primary type="primary" htmlType="submit">
                                        Đăng nhập
                                    </ButtonCustom>
                                </Form.Item>
                            </Form>
                        </>
                    ) : (
                        <>
                            <p className={cx('title-login')}>Đăng ký</p>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: '100%',
                                    marginTop: '10px',
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <div className={cx('register')}>
                                    <div>
                                        <Form.Item
                                            layout="HoTenKH"
                                            label="Tên hiển thị"
                                            name="HoTenKH"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập tên hiển thị!',
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
                                            label="Số điện thoại"
                                            name="SDT"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập số điện thoại!',
                                                },

                                                {
                                                    pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                                                    message: 'Vui lòng nhập đúng định dạng!',
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
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập địa chỉ!',
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
                                    </div>
                                    <div>
                                        <Form.Item
                                            layout="email"
                                            label="Email"
                                            name="email"
                                            labelCol={{
                                                span: 24,
                                            }}
                                            wrapperCol={{
                                                span: 24,
                                            }}
                                            rules={[
                                                {
                                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: 'vui lòng nhập đúng định dạng examl@gmail.com',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            layout="userName"
                                            label="Tên đăng nhập"
                                            name="userName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập tên đăng nhập',
                                                },
                                                {
                                                    min: 6,
                                                    message: 'Tên đăng nhập phải có 6 ký tự trở lên!',
                                                },
                                                {
                                                    validator: (_, value) => {
                                                        if (error === true) {
                                                            return Promise.reject(new Error('Tài khoản đã tồn tại'));
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                },
                                            ]}
                                            labelCol={{
                                                span: 24,
                                            }}
                                            wrapperCol={{
                                                span: 24,
                                            }}
                                        >
                                            <Input onKeyPress={handleKeyPress} />
                                        </Form.Item>
                                        <Form.Item
                                            layout="password"
                                            label="Mật khẩu"
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập mật khẩu!',
                                                },
                                            ]}
                                            labelCol={{
                                                span: 24,
                                            }}
                                            wrapperCol={{
                                                span: 24,
                                            }}
                                        >
                                            <Input.Password onKeyPress={handleKeyPress} />
                                        </Form.Item>
                                    </div>
                                </div>
                                <Form.Item
                                    labelCol={{
                                        span: 24,
                                    }}
                                    wrapperCol={{
                                        span: 24,
                                    }}
                                    style={{
                                        marginBottom: 0,
                                    }}
                                >
                                    <p className={cx('No-Account')}>
                                        Bạn đã có tài khoản? <span onClick={handleLogin}>Đăng nhập ngay</span>
                                    </p>
                                </Form.Item>
                                <Form.Item
                                    style={{
                                        marginLeft: '38.6667%',
                                    }}
                                >
                                    <ButtonCustom primary type="primary" htmlType="submit">
                                        Đăng ký
                                    </ButtonCustom>
                                </Form.Item>
                            </Form>
                            <style jsx>{`
                                .ant-form {
                                    width: 100%;
                                }
                            `}</style>
                        </>
                    )}
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
        </div>
    );
}
export default Login;
