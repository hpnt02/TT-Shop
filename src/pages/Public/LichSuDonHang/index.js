import classNames from 'classnames/bind';
import styles from './LichSuDonHang.module.scss';
import { Menu, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { ChiTietHoaDon, DSNV, HoaDon } from '~/redux/API/api';
import { useDispatch, useSelector } from 'react-redux';
import TableData from '~/components/TableData';
import moment from 'moment';
import DateOption from '~/components/Date';

const DinhDangTien = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}


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
const contentStyle = {
    margin: 0,
    height: '200px',
    width: '100%',
};
const cx = classNames.bind(styles);

const items = [
    {
        key: 'sub2',
        label: 'Thông tin đơn hàng',
        children: [
            {
                key: '1',
                label: 'Đơn hàng đang chờ duyệt',
            },
            {
                key: '2',
                label: 'Đơn hàng đã duyệt',
            },
            {
                key: '3',
                label: 'Đơn hàng bị hủy',
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: '4',
        label: 'Thống kê chi tiêu',
    },
];
function LichSuDonHang() {
    const columns = [
        {
            title: 'Mã hóa đơn',
            dataIndex: 'MaHoaDon',
            editable: true,
            fixed: 'left',
            key: '1',
        },
        {
            title: 'Tên người nhân',
            dataIndex: 'TenNguoiNhan',
            fixed: 'left',
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
    ];

    const handleClick = (record) => {
            setIsModalOpen(true);
            setRecord(record);
    };
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login.currentUser);
    const hoadon = useSelector((state) => state.hoadon?.hoadon?.hoadon);
    const nhanvien = useSelector((state) => state.dsnv?.dsnv?.dsnv) || [];
    const newHoaDon = hoadon.filter((state) => state.KhachHang === user.KhachHang._id)
    const chitiethoadon = useSelector((state) => state.chitiethoadon?.chitiethoadon?.chitiethoadon) || [];
    const sanpham = useSelector((state) => state.sanpham?.sanpham?.sanpham) || [];
    const [trangthai, setTrangthai] = useState(false)
    const [hoanthanh, setHoanThanh] = useState(false)
    const [tkct, setTKCT] = useState(false)
   
  // eslint-disable-next-line array-callback-return
  const newData = newHoaDon.map((hd, index) => {
    if (hd.TrangThai === trangthai && hd.HoanThanh === hoanthanh) {
        const nhanVien = nhanvien?.find((state) => state._id === hd.NhanVien);
        return {
            _id: hd._id,
            key: index.toString(),
            MaHoaDon: hd.MaHoaDon,
            TenNguoiNhan: hd.TenNguoiNhan,
            SDT: hd.SDT,
            DiaChi: hd.DiaChi,
            createAt: moment(hd.createAt).local().format('DD/MM/YYYY HH:mm:ss'),
            IDTrangThai: hd.TrangThai,
            IDHoanThanh: hd.HoanThanh,
            ThanhTien: DinhDangTien(hd.ThanhTien),
            TrangThai: hd.TrangThai && hd.HoanThanh ? 'Đã duyệt' : hd.TrangThai === false && hd.HoanThanh === true ? 'Đã hủy' : 'Chưa Duyệt',
            updateAt: nhanVien ? moment(hd.updateAt).local().format('DD/MM/YYYY HH:mm:ss') : "",
            IdHoaDon: hd.IDHoaDon,
        };
    }
    return null; 
}).filter(item => item !== null); 
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

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const onClick = (e) => {
        if(e.key === '1'){
            setHoanThanh(false)
            setTrangthai(false)
           setTKCT(false)
        }else if(e.key === '2'){
            setHoanThanh(true)
            setTrangthai(true)
           setTKCT(false)
        }else if(e.key === '3'){
            setHoanThanh(true)
            setTrangthai(false)
           setTKCT(false)
        }else if(e.key==='4'){
           setTKCT(true)
        }
    };

    useEffect(() => {
        HoaDon(dispatch);
        ChiTietHoaDon(dispatch);
        DSNV(dispatch)
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
            <div className={cx('lsdh')}>
                <div>
                    <Menu
                        onClick={onClick}
                        style={{
                            width: 256,
                        }}
                        defaultSelectedKeys={['5']}
                        defaultOpenKeys={['sub2']}
                        mode="inline"
                        items={items}
                    />
                    <style jxs>
                        {`
                            .ant-menu-light.ant-menu-root.ant-menu-inline{
                                background-color: #dcecf1;
                                border: 2px solid #b8b9a9;
                                border-radius: 20px
                            }
                            .ant-menu-light .ant-menu-item-selected{
                                background-color:#c0dbdf;
                                
                            }
      `}
                    </style>
                </div>
                {
                    tkct ? 
                    <div>
                           <DateOption/>
                    </div>
                    :

                <div>
                <Modal
                title="Chi tiết hóa đơn"
                open={isModalOpen}
                onCancel={handleCancel}
                height="500"
                okText=""
                width={1000}
                cancelText='Hủy'
                okButtonProps={{ disabled: record?.IDTrangThai,  style: { display: 'none' } }}
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
                <TableData columnData={columns} rowData={newData}  operation={false} rowSelection={false}/>
                </div>
                }

                
            </div>
        </div>
    );
}

export default LichSuDonHang;
