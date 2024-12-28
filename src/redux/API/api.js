import axios from 'axios';
import {
    deleteDSNVFailed,
    deleteDSNVStart,
    deleteDSNVSuccess,
    getDSNVFailed,
    getDSNVStart,
    getDSNVSuccess,
    TMNVFailed,
    TMNVStart,
    TMNVSuccess,
    UpdateDSNVFailed,
    UpdateDSNVStart,
    UpdateDSNVSuccess,
} from '../model/NhanVien';
import { loginStart, loginSuccess, loginFailed, logoutStart, logoutSuccess, logoutFailed, registerStart, registerSuccess, registerFailed } from '../model/Login';
import {
    deleteSanPhamFailed,
    deleteSanPhamStart,
    deleteSanPhamSuccess,
    getSanPhamFailed,
    getSanPhamStart,
    getSanPhamSuccess,
    TMSPFailed,
    TMSPStart,
    TMSPSuccess,
    UpdateSanPhamFailed,
    UpdateSanPhamStart,
    UpdateSanPhamSuccess,
} from '../model/SanPham';
import { getNhaCungCapFailed, getNhaCungCapStart, getNhaCungCapSuccess } from '../model/NhaCungCap';
import { getLoaiSanPhamFailed, getLoaiSanPhamStart, getLoaiSanPhamSuccess } from '../model/LoaiSanPham';
import {
    getHoaDonFailed,
    getHoaDonStart,
    getHoaDonSuccess,
    TMHDFailed,
    TMHDStart,
    TMHDSuccess,
    UpdateHoaDonFailed,
    UpdateHoaDonStart,
    UpdateHoaDonSuccess,
} from '../model/HoaDon';
import { getKhachHangFailed, getKhachHangStart, getKhachHangSuccess } from '../model/KhachHang';
import { deleteCTHDFailed, deleteCTHDStart, deleteCTHDSuccess, getChiTietHoaDonFailed, getChiTietHoaDonStart, getChiTietHoaDonSuccess } from '../model/ChiTietHoaDon';
import { getAccountFailed, getAccountStart, getAccountSuccess } from '../model/Account';
import { getDanhGiaFailed, getDanhGiaStart, getDanhGiaSuccess, TMDGFailed, TMDGStart, TMDGSuccess } from '../model/DanhGia';
import { TMCTHDStart } from '../model/ChiTietHoaDon';
import { TMCTHDSuccess } from '../model/ChiTietHoaDon';
import { TMCTHDFailed } from '../model/ChiTietHoaDon';
import { UpdateCTHDStart } from '../model/ChiTietHoaDon';
import { UpdateCTHDSuccess } from '../model/ChiTietHoaDon';
import { UpdateCTHDFailed } from '../model/ChiTietHoaDon';
import { getTrangThaiFailed, getTrangThaiStart, getTrangThaiSuccess, TMPAYFailed, TMPAYStart, TMPAYSuccess } from '../model/Pay';

//============================Đăng nhập =======================================================
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, user);
        dispatch(loginSuccess(res.data));
        if(res.data.rule === true){
            navigate('/homeAdmin');
        }else{
            navigate(localStorage.getItem('http'));
        }
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, user,);
        dispatch(registerSuccess());
    } catch (err) {
        dispatch(registerFailed());
    }
};

export const logOut = async (dispatch, navigate, id, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`, id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(logoutSuccess());
        navigate('/login',{ state: { id: true } });
    } catch (err) {
        dispatch(logoutFailed());
    }
};



//=====================NHÂN VIÊN=================================================================
//API lấy danh sách nhân viên
export const DSNV = async (dispatch, accessToken) => {
    dispatch(getDSNVStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/nhanvien`);
        dispatch(getDSNVSuccess(res.data));
    } catch (err) {
        dispatch(getDSNVFailed());
    }
};

//API thêm mới nhân viên

export const TMNV = async (user, dispatch) => {
    dispatch(TMNVStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/nhanvien/create`, user);
        dispatch(TMNVSuccess());
    } catch (err) {
        dispatch(TMNVFailed());
    }
};
//API chỉnh sửa thông tin nhân viên
export const UpdateNhanVien = async (user, dispatch, id) => {
    dispatch(UpdateDSNVStart());
    try {
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/admin/${id}/nhanvien`, user);
        dispatch(UpdateDSNVSuccess(res.data));
    } catch (err) {
        dispatch(UpdateDSNVFailed());
    }
};
//API xóa thông tin nhân viên
export const deleteNhanVien = async (dispatch, id, accessToken) => {
    dispatch(deleteDSNVStart());
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/${id}/deletenhanvien`, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        // Kiểm tra mã trạng thái
        if (res.status === 200) {
            dispatch(deleteDSNVSuccess(id));
        } else {
            throw new Error('Unexpected response code: ' + res.status);
        }
    } catch (err) {
        // Kiểm tra err.response
        const errorMessage = err.response ? err.response.data : 'An unexpected error occurred';
        dispatch(deleteDSNVFailed(errorMessage));
    }
};

//========================================Sản Phẩm====================================================
//API lấy danh sách nhân viên
export const SanPham = async (dispatch, accessToken) => {
    dispatch(getSanPhamStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/sanpham`);
        dispatch(getSanPhamSuccess(res.data));
    } catch (err) {
        dispatch(getSanPhamFailed());
    }
};

//API thêm mới nhân viên

export const TMSP = async (user, dispatch) => {
    dispatch(TMSPStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/sanpham/create`, user);
        dispatch(TMSPSuccess());
    } catch (err) {
        console.error('Error occurred:', err.response ? err.response.data : err.message);
        dispatch(TMSPFailed());
    }
};

//API xóa thông tin nhân viên
export const deleteSanPham = async (dispatch, id, accessToken) => {
    dispatch(deleteSanPhamStart());
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/${id}/deletesanpham`, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        // Kiểm tra mã trạng thái
        if (res.status === 200) {
            dispatch(deleteSanPhamSuccess(id));
        } else {
            throw new Error('Unexpected response code: ' + res.status);
        }
    } catch (err) {
        // Kiểm tra err.response
        const errorMessage = err.response ? err.response.data : 'An unexpected error occurred';
        dispatch(deleteSanPhamFailed(errorMessage));
    }
};

//Chỉnh sửa thông tin sản phẩm
export const UpdateSanPham = async (user, dispatch, id, navigate) => {
    dispatch(UpdateSanPhamStart());
    try {
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/admin/${id}/sanpham`, user);
        dispatch(UpdateSanPhamSuccess(res.data));
        navigate('/quan-ly-san-pham');
    } catch (err) {
        console.error('Error response:', err.response ? err.response.data : err.message);
        dispatch(UpdateSanPhamFailed());
    }
};
//========================================Nhà cung cấp====================================================
//API lấy danh sách nhà cung cấp
export const NhaCungCap = async (dispatch, accessToken) => {
    dispatch(getNhaCungCapStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/nhacungcap`);
        dispatch(getNhaCungCapSuccess(res.data));
    } catch (err) {
        dispatch(getNhaCungCapFailed());
    }
};

//========================================Loại sản phẩm====================================================
//API lấy danh sách loại sản phẩm
export const LoaiSanPham = async (dispatch, accessToken) => {
    dispatch(getLoaiSanPhamStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/loaisanpham`);
        dispatch(getLoaiSanPhamSuccess(res.data));
    } catch (err) {
        dispatch(getLoaiSanPhamFailed());
    }
};

//====================================Hình Ảnh============================
export const GetImage = (image) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: 'post',
                url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                data: image,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

//===================================Hóa Đơn===========================================
export const HoaDon = async (dispatch, accessToken) => {
    dispatch(getHoaDonStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/hoadon`);
        dispatch(getHoaDonSuccess(res.data));
    } catch (err) {
        dispatch(getHoaDonFailed());
    }
};

export const TMHD = async (user, dispatch) => {
    dispatch(TMHDStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/hoadon/create`, user);
        dispatch(TMHDSuccess());
    } catch (err) {
        dispatch(TMHDFailed());
    }
};


//===================================Khách Hàng===========================================
export const KhachHang = async (dispatch, accessToken) => {
    dispatch(getKhachHangStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/khachhang`);
        dispatch(getKhachHangSuccess(res.data));
    } catch (err) {
        dispatch(getKhachHangFailed());
    }
};

//===================================Chi tiết hóa đơn===========================================
export const ChiTietHoaDon = async (dispatch) => {
    dispatch(getChiTietHoaDonStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/chitiethoadon`);
        dispatch(getChiTietHoaDonSuccess(res.data));
    } catch (err) {
        dispatch(getChiTietHoaDonFailed());
    }
};


export const TMCTHD = async (user, dispatch) => {
    dispatch(TMCTHDStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/orderItem/create`, user);
        dispatch(TMCTHDSuccess());
    } catch (err) {
        dispatch(TMCTHDFailed());
    }
};

export const UpdateCTHD = async (user, dispatch, id) => {
    dispatch(UpdateCTHDStart());
    try {
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/admin/${id}/orderItem`, user);
        dispatch(UpdateCTHDSuccess(res.data));
    } catch (err) {
        dispatch(UpdateCTHDFailed());
    }
};


export const deleteCTHD = async (dispatch, id, accessToken) => {
    dispatch(deleteCTHDStart());
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/${id}/deleteorderItem`, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        // Kiểm tra mã trạng thái
        if (res.status === 200) {
            dispatch(deleteCTHDSuccess(id));
        } else {
            throw new Error('Unexpected response code: ' + res.status);
        }
    } catch (err) {
        // Kiểm tra err.response
        const errorMessage = err.response ? err.response.data : 'An unexpected error occurred';
        dispatch(deleteCTHDFailed(errorMessage));
    }
};

//========================Cập nhập hóa đơn=================================================
export const UpdateHoaDon = async (user, dispatch, id) => {
    dispatch(UpdateHoaDonStart());
    try {
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/admin/${id}/hoadon`, user);
        dispatch(UpdateHoaDonSuccess(res.data));
    } catch (err) {
        dispatch(UpdateHoaDonFailed());
    }
};



//=======================================Account=========================================
export const Account = async (dispatch, accessToken) => {
    dispatch(getAccountStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/account`);
        dispatch(getAccountSuccess(res.data));
    } catch (err) {
        dispatch(getAccountFailed());
    }
};
//=======================================================================================
//=======================================Đánh giá=========================================
export const DanhGia = async (dispatch) => {
    dispatch(getDanhGiaStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/danhgia`);
        dispatch(getDanhGiaSuccess(res.data));
    } catch (err) {
        dispatch(getDanhGiaFailed());
    }
};

export const TMDG = async (user, dispatch) => {
    dispatch(TMDGStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/danhgia/create`, user);
        dispatch(TMDGSuccess());
    } catch (err) {
        dispatch(TMDGFailed());
    }
};


//====================================Thanh toán====================================================
export const TMPay = async (user, dispatch) => {
    dispatch(TMPAYStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/order/create_payment_url`, user, {
            headers: {
                'Content-Type': 'application/json',
              
            },
            withCredentials: true, 
           
        });

        dispatch(TMPAYSuccess());
    } catch (err) {
        console.error(err); // In ra lỗi để kiểm tra
        dispatch(TMPAYFailed());
    }
};

export const TrangThai = async (dispatch) => {
    dispatch(getTrangThaiStart());
    try {
        const res = await axios.get('http://localhost:3005/v1/order/vnpay_return');
        dispatch(getTrangThaiSuccess(res.data));
    } catch (err) {
        dispatch(getTrangThaiFailed());
    }
};