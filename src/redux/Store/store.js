import { configureStore, combineReducers } from '@reduxjs/toolkit';
import dsnvReducer from '../model/NhanVien';
import authReducer from '../model/Login'
import sanphamReducer from '../model/SanPham'
import nhacungcapReducer from '../model/NhaCungCap'
import loaisanphamReducer from '../model/LoaiSanPham'
import hoadonReducer from '../model/HoaDon'
import khachhangReducer from '../model/KhachHang'
import chitiethoadonReducer from '../model/ChiTietHoaDon'
import accountReducer from '../model/Account'
import menuReducer from '../model/Menu'
import danhgiaReducer from '../model/DanhGia'
import payReducer from '../model/Pay'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const rootReducer = combineReducers({
    dsnv: dsnvReducer,
    auth: authReducer,
    sanpham: sanphamReducer,
    nhacungcap: nhacungcapReducer,
    loaisanpham: loaisanphamReducer,
    hoadon: hoadonReducer,
    khachhang: khachhangReducer,
    chitiethoadon : chitiethoadonReducer,
    account: accountReducer,
    menu : menuReducer,
    danhgia: danhgiaReducer,
    pay: payReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
