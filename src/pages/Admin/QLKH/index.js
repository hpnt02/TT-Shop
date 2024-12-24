import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableData from "~/components/TableData";
import Title from "~/components/Title";
import { Account } from "~/redux/API/api";

const columns = [
    {
        key:'1',
        title: 'STT',
        dataIndex: 'STT',
        align: 'center',            
    },
    {
        key:'2',
        title: 'Họ tên KH',
        dataIndex: 'HoTenKH',
        align: 'center',
    },
    {
        key:'3',
        title: 'Số điện thoại',
        dataIndex: 'SDT',
        align: 'center',
    },
    {
        key:'4',
        title: 'Địa chỉ',
        dataIndex: 'DiaChi',
        align: 'center',
    },
    {
        key:'5',
        title: 'Email',
        dataIndex: 'email',
        align: 'center',
    },
    {
        key:'6',
        title: 'Trạng thái',
        dataIndex: 'TrangThai',
        align: 'center',
        render: (text, record) => (
            <span
                style={{
                    fontSize:'15px',
                    color: record.IDTrangThai ? 'rgb(13 207 13)' : 'rgb(255 0 0)',
                    fontWeight: 700,                 
                }}
            >
                {text}
            </span>
        ),
    },
    {
        key:'7',
        title: 'Đăng nhập gần nhất',
        dataIndex: 'lastLoggedIn',
        align: 'center',
        render: (text, record) => (
            <span
                style={{
                    fontSize:'15px',
                    color: record.IDTrangThai ? 'rgb(13 207 13)' : 'rgb(255 0 0)',
                    fontWeight: 700,                 
                }}
            >
                {text}
            </span>
        ),
    },
];
function QLKH() {
    const accountKH = useSelector((state) => state.account?.account?.account) ||""
    const dispatch = useDispatch()
     const [data, setNewData] = useState()
  

    useEffect(() => {
        const calculateTimeDifference = (time) => {
            const currentTime = new Date();
            const difference = currentTime - new Date(time); // Tính thời gian chênh lệch
    
            // Tính toán các đơn vị thời gian
            const seconds = Math.floor(difference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const years = Math.floor(days / 365);
    
            // Xác định định dạng hiển thị
            let displayTime;
            if (seconds < 60) {
                displayTime = `${seconds} giây`;
            } else if (minutes < 60) {
                displayTime = `${minutes} phút`;
            } else if (hours < 24) {
                displayTime = `${hours} giờ`;
            } else if (days < 365) {
                displayTime = `${days} ngày`;
            } else {
                displayTime = `${years} năm`;
            }
    
            return displayTime;
        };
    
        // Cập nhật lastLoggedIn cho từng khách hàng
        const updatedData = accountKH.map((kh, index) => {
            return {
                _id: kh._id,
                key: (index + 1).toString(),
                STT: index + 1,
                HoTenKH: kh.KhachHang.HoTenKH,
                SDT: kh.KhachHang.SDT,
                DiaChi: kh.KhachHang.DiaChi,
                email: kh.KhachHang.email,
                IDTrangThai: kh.TrangThai,
                TrangThai: kh.TrangThai ? "Online" :"Offline",
                lastLoggedIn:kh.TrangThai ? "Đang hoạt động" : `${calculateTimeDifference(kh.lastLoggedIn)} trước`, // Sử dụng hàm để tính toán
            };
        });
    
        setNewData(updatedData); // Cập nhật state với dữ liệu mới
    
        // Cập nhật mỗi giây
        const intervalId = setInterval(() => {
            const refreshedData = accountKH.map((kh, index) => {
                return {
                    _id: kh._id,
                    key: (index + 1).toString(),
                    STT: index + 1,
                    HoTenKH: kh.KhachHang.HoTenKH,
                    SDT: kh.KhachHang.SDT,
                    DiaChi: kh.KhachHang.DiaChi,
                    email: kh.KhachHang.email,
                    IDTrangThai: kh.TrangThai,
                    TrangThai: kh.TrangThai ? "Online" :"Offline",
                    lastLoggedIn:kh.TrangThai ? "Đang hoạt động" : `${calculateTimeDifference(kh.lastLoggedIn)} trước`, // Cập nhật thời gian
                };
            });
    
            setNewData(refreshedData); // Cập nhật state mỗi giây
        }, 1000);
    
        // Dọn dẹp interval khi component unmount
        return () => clearInterval(intervalId);
    }, [accountKH]); // Thêm accountKH vào dependencies để theo dõi sự thay đổi
   

        const handleRowData = async (value) => {
           console.log("value", value)
        };
    

    useEffect(() =>{
        Account(dispatch)
    },[dispatch])
    return ( 
        <div style={{margin:'0 10px'}}>
            <Title title='Danh sách khách hàng'/>
            <TableData columnData={columns} rowData={data}  onChange={handleRowData} operation={false}/>
        </div>
     )
}

export default QLKH;