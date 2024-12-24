import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation} from 'react-router-dom';
import TableData from '~/components/TableData';
import { ChiTietHoaDon, DSNV, HoaDon, KhachHang,  UpdateHoaDon } from '~/redux/API/api';
import { Modal, Table } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './QLDH.module.scss';
import Title from '~/components/Title';
const cx = classNames.bind(styles);
const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const columnstest = [
    {
        key: '1',
        title: 'STT',
        dataIndex: 'STT',
        align: 'center',
    },
    {
        key: '2',
        title: 'Tên sản phẩm',
        dataIndex: 'nameProduct',
        align: 'center',
    },
    {
        key: '3',
        title: 'Số lượng',
        dataIndex: 'Number',
        align: 'center',
    },
    {
        key: '4',
        title: 'Giá Tiền',
        dataIndex: 'PriceProduct',
        align: 'center',
    },
    {
        key: '5',
        title: 'Thành tiền',
        dataIndex: 'ThanhTien',
        align: 'center',
        render: (text, record) => (
            <h2 style={{ fontSize: '15px' }}>{text}</h2> // Gọi hàm handleClick
        ),
    },
];
function QLDH() {
    const columns = [
        {
            title: 'Mã hóa đơn',
            dataIndex: 'MaHoaDon',

            editable: true,
            fixed: 'left',
            key: '1',
        },
        {
            title: 'Khách hàng',
            dataIndex: 'KhachHang',

            editable: true,
            fixed: 'left',
        },
        {
            title: 'Tên người nhân',
            dataIndex: 'TenNguoiNhan',

            editable: true,
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'DiaChi',

            editable: true,
        },
        {
            title: 'SDT',
            dataIndex: 'SDT',

            editable: true,
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createAt',
            editable: true,
        },
        {
            title: 'Trang Thái',
            dataIndex: 'TrangThai',
            editable: true,
            render: (text, record) => (
                <span
                    style={{
                        color: 'white',
                        backgroundColor: record.IDTrangThai === true  && record.IDHoanThanh ===true? 'rgb(13 207 13)' : record.IDTrangThai === false  && record.IDHoanThanh ===true? 'orange': 'rgb(255 0 0)',
                        fontWeight: 700,
                        padding: '7px',
                        borderRadius: '4px', // Thêm góc bo nếu cần
                    }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'ThanhTien',
            editable: true,

            key: '7',
        },
        {
            title: 'Nhân viên duyệt dơn',
            dataIndex: 'NhanVien',
            editable: true,

            key: '10',
        },
        {
            title: 'Ngày duyệt dơn',
            dataIndex: 'updateAt',
            editable: true,

            key: '8',
        },
        {
            title: 'Chức năng',
            dataIndex: 'operation',
            key: 'operation',
            fixed: 'right',
            render: (text, record) => (
                <span style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleClick(record)}>
                    Xem chi tiết
                </span> // Gọi hàm handleClick
            ),
        },
        {
            title: 'Hủy đơn',
            dataIndex: 'huydon',
            key: 'huydon',
            fixed: 'right',
            render: (text, record) => (
                <span style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleClickHuy(record)}>
                    Hủy đơn
                </span> // Gọi hàm handleClick
            ),
            
        },
    ];
    const location = useLocation();
    const id = location.state?.id;

    const dispatch = useDispatch();
    // const navigate = useNavigate("")
    const user = useSelector((state) => state.auth.login.currentUser);
    const hoadon = useSelector((state) => state.hoadon?.hoadon?.hoadon);
    const nhanvien = useSelector((state) => state.dsnv?.dsnv?.dsnv) || [];
    const khachhang = useSelector((state) => state.khachhang?.khachhang?.khachhang) || [];
    const chitiethoadon = useSelector((state) => state.chitiethoadon?.chitiethoadon?.chitiethoadon) || [];
    const sanpham = useSelector((state) => state.sanpham?.sanpham?.sanpham) || [];
    // const nhacungcap = useSelector((state) => state.nhacungcap?.nhacungcap?.nhacungcap) || [];
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // const loaisanpham = useSelector((state) => state.loaisanpham?.loaisanpham?.loaisanpham) || [];
    const handleRowData = async (value) => {
        console.log('value', value);
    };
    let newData;

    if (id === '1') {
        newData = hoadon.filter((state) => state.TrangThai === false && state.HoanThanh === false);
    } else if (id === '2') {
        newData = hoadon.filter((state) => state.TrangThai === true && state.HoanThanh === true);
    } else if (id === '3') {
        newData = hoadon.filter((state) => state.TrangThai === false && state.HoanThanh === true);
    }


    const rowData = [];
    newData.forEach((hd, index) => {
        const nhanVien = nhanvien?.find((state) => state._id === hd.NhanVien);
        const khachHang = khachhang?.find((state) => state._id === hd.KhachHang);
        const data = {
            _id: hd._id,
            key: index.toString(),
            MaHoaDon: hd.MaHoaDon,
            KhachHang: khachHang ? khachHang.HoTenKH : '',
            TenNguoiNhan: hd.TenNguoiNhan,
            SDT: hd.SDT,
            DiaChi: hd.DiaChi,
            createAt:  moment(hd.createAt).local().format('DD/MM/YYYY HH:mm:ss'),
            IDTrangThai: hd.TrangThai,
            IDHoanThanh: hd.HoanThanh,
            ThanhTien:DinhDangTien(hd.ThanhTien),
            TrangThai: hd.TrangThai && hd.HoanThanh ? 'Đã duyệt' : hd.TrangThai === false && hd.HoanThanh===true ? 'Đã hủy' :'Chưa Duyệt',
            NhanVien: nhanVien ? nhanVien?.HoTenNV : '',
            updateAt:nhanVien ?  moment(hd.updateAt).local().format('DD/MM/YYYY HH:mm:ss') :"",
            IdHoaDon: hd.IDHoaDon,
            IDKhachHang: khachHang ? khachHang._id : '',
        };
        rowData.push(data);
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [record, setRecord] = useState();

    const newChiTietHoaDon = chitiethoadon.filter((state) => state.IDHoaDon === record?.IdHoaDon) || '';
    const newCTHDArray = [];
    newChiTietHoaDon.forEach((cthd, index) => {
        const sanPham = sanpham.find((state) => state._id === cthd.Product);
        const data = {
            _id: cthd._id,
            STT: index + 1,
            nameProduct: sanPham.nameProduct,
            Number: cthd.Number,
            PriceProduct: DinhDangTien(cthd.PriceProduct),
            ThanhTien: DinhDangTien(cthd.Number * cthd.PriceProduct),
        };
        newCTHDArray.push(data);
    });

    const tongThanhTien = newChiTietHoaDon.reduce((total, item) => {
        return total + item.Number * item.PriceProduct;
    }, 0);

    const handleClickHuy = (record) => {
        const UpdatehoaDon = {
            IDHoaDon: record.IdHoaDon,
            MaHoaDon: record.MaHoaDon,
            TenNguoiNhan: record.TenNguoiNhan,
            SDT: record.SDT,
            DiaChi: record.DiaChi,
            GhiChu: record.GhiChu,
            TrangThai: false,
            HoanThanh: true,
            KhachHang: record.IDKhachHang,
            NhanVien: user.NhanVien._id,
        };
        UpdateHoaDon(UpdatehoaDon, dispatch, record._id);
        HoaDon(dispatch);
        // const DataSanPham = chitiethoadon.filter((state) => state.IDHoaDon === record.IdHoaDon)
        // sanpham.forEach((sp,index) => {
        //     const Sanpham = DataSanPham.find((state) => state.Product === sp._id)
        //     const newNhacungcap = nhacungcap.find((state) => state._id === sp.NhaCungCap);
        //     const newLoaiSanPham = loaisanpham.find((state) => state._id === sp.LoaiSanPham);
        //     const data = {
        //         LoaiSanPham: newLoaiSanPham?._id,
        //         NhaCungCap: newNhacungcap?._id,
        //         nameProduct: sp.nameProduct,
        //         Number:Sanpham ? sp.Number + Sanpham?.Number : sp.Number,
        //         PriceProduct: sp.PriceProduct,
        //         describe: sp.describe,
        //         Image: sp.Image,       
        //         ThanhPhan: sp.ThanhPhan,
        //         HuongDanSuDung: sp.HuongDanSuDung,
        //         DungTich: sp.DungTich,
        //         HanSD: sp.HanSD,
        //     };
          
        //     // Thêm vào mảng kết quả
        //     UpdateSanPham(data, dispatch, sp._id, navigate)
        //     SanPham( dispatch)
        // })
    };

    const handleClick = (record) => {
        setIsModalOpen(true);
        setRecord(record);
    };
    const handleOk = (values) => {
          setIsModalOpen(false);
        const UpdatehoaDon = {
            IDHoaDon: record.IdHoaDon,
            MaHoaDon: record.MaHoaDon,
            TenNguoiNhan: record.TenNguoiNhan,
            SDT: record.SDT,
            DiaChi: record.DiaChi,
            GhiChu: record.GhiChu,
            TrangThai: true,
            HoanThanh: true,
            KhachHang: record.IDKhachHang,
            NhanVien: user.NhanVien._id,
        };
        UpdateHoaDon(UpdatehoaDon, dispatch, record._id);
        HoaDon(dispatch);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        DSNV(dispatch);
        HoaDon(dispatch);
        KhachHang(dispatch);
        ChiTietHoaDon(dispatch);

    }, [dispatch]);
    return (
        // eslint-disable-next-line no-undef
        <div className={cx('wrapperr')}>
            {id ==='1' ? <Title title='Đơn hàng chờ duyệt'/> : id==='2' ? <Title title='Đơn hàng đã duyêt'/> : <Title title='Đơn hàng đã hủy'/>}
            <Modal
                title="Chi tiết hóa đơn"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                height="500"
                width={1000}
                okText="Duyệt đơn"
                okButtonProps={{ disabled: record?.IDTrangThai }}
                style={{ top: '10px', height: '500px', textAlign: 'center' }}
            >
                <Table
                    columns={columnstest}
                    dataSource={newCTHDArray}
                    bordered
                    footer={() => (
                        <h2 style={{ textAlign: 'right', fontSize: '15px', paddingRight: '30px' }}>
                            {`Tổng tiền: ${DinhDangTien(tongThanhTien)}`}
                        </h2>
                    )}
                />
            </Modal>
            <TableData columnData={columns} rowData={rowData} onChange={handleRowData} operation={false} />
        </div>
    );
}

export default QLDH;
