import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "antd";
export const ColumnsSanPham = () => {
    return [
        {
            title: 'STT',
            dataIndex: 'key',
            align: 'center',
            editable: true,
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'HinhAnh',
            align: 'center',
            editable: true,
            render: (text, values) => {
                return (
                    <Image
                        src={values.HinhAnh.Image1}
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
            title: 'Sản phẩm',
            dataIndex: 'nameProduct',
            align: 'center',
            editable: true,
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'LoaiSanPham',
            align: 'center',
            editable: true,
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'NhaCungCap',
            align: 'center',
            editable: true,
        },
        {
            title: 'Bán ra',
            dataIndex: 'SLBR',
            align: 'center',
            editable: true,
        },
        // Bạn có thể thêm nhiều đối tượng khác ở đây
    ];
};

export const ColumnsKhachHang = () => {
    return [
        {
            title: 'STT',
            dataIndex: 'key',
            align: 'center',
            editable: true,
        },
        {
            title: 'Họ tên khách hàng',
            dataIndex: 'KhachHang',
            align: 'center',
            editable: true,
        },
        {
            title: 'SLMH',
            dataIndex: 'SLMH',
            align: 'center',
            editable: true,
        },
        // Bạn có thể thêm nhiều đối tượng khác ở đây
    ];
};


export const ColumnsOnline = () => {
    return [
        {
            title: 'Họ tên khách hàng',
            dataIndex: 'KhachHang',
            align: 'center',
            editable: true,
        },
        {
            title: 'Online',
            dataIndex: 'online',
            align: 'center',
            editable: true,
            render: (text, values) =>{
                return(
                <span style={{color:'green', fontSize:'10px'}}>
                    {values.Online ? <FontAwesomeIcon icon={faCircle}/> :""}
                </span>
                )
            }
        }
    ];
};
