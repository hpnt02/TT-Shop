import { Card, Space } from 'antd';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);
function CardItem({ title, bgC, number, ...props }) {
    const navigate = useNavigate();
    const handleCardClick = (ncc) => {
        const id = ncc._id;

        navigate(config.routes.dssp, { state: { id } });
    };
    const nhacungcap = props.data;
    return (
        <Space direction="vertical" size={16}>
            {props.brand ? (
                nhacungcap.map((ncc, index) => {
                    return (
                        <div key={index}>
                            <Card
                                id="brand"
                                className={cx('card-brand')}
                                onClick={(event) => handleCardClick(ncc, event)} // Gán sự kiện onClick
                            >
                                {ncc.Image ? <img src={ncc.Image} alt="Ảnh lỗi" /> : <p>{ncc.nameNCC}</p>}
                            </Card>
                            <style jsx>{`
                                .ant-space-item {
                                    margin: 5px 0;
                                }
                                #brand.ant-card .ant-card-body {
                                    padding: 10px !important;
                                    width: 100%;
                                    height: 100%;
                                }
                                .ant-space-vertical {
                                    flex-direction: row !important;
                                    gap: 0 !important;
                                    flex-wrap: wrap !important;
                                    text-align: center;
                                    display: flex;
                                    justify-content: center;
                                }
                            `}</style>
                        </div>
                    );
                })
            ) : (
                <Card
                    title={<span style={{ color: 'white' }}>{title}</span>}
                    style={{
                        width: 300,
                        height: 200,
                        backgroundColor: `${bgC}`,
                        color: 'white',
                        padding: '0 5px',
                    }}
                >
                    <div style={{ display: ' flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '30px', fontWeight: '700' }}>
                            {number}
                            <span style={{ fontSize: '15px' }}> {props.other}</span>
                        </p>
                    </div>
                </Card>
            )}
        </Space>
    );
}

export default CardItem;
