import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';

function ModalInput({ title, children, form, onSubmit, ...props }) {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
      
    };
    const handleOk = () => {
        if (onSubmit) {
            onSubmit(); // Call the onSubmit function when OK is clicked
        }
    };
    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
    };

    const handleReset = () => {
        form.resetFields();
    };
    return (
        <>
      

            <Space wrap>
                <Button type="primary" onClick={showModal} style={{background:"#0513d3"}}>
                    Thêm mới
                </Button>
            </Space>
        
            <Modal
                style={{ top: '20px' }}
                width={props.width || 520}
                open={open}
                title={title}
                onCancel={handleCancel}
                footer={(_, { CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <Button type="primary" onClick={handleReset}>
                            Reset
                        </Button>
                        <Button type="primary" onClick={handleOk}>
                            Thêm mới
                        </Button>
                    </>
                )}
            >
                {children}
            </Modal>
        </>
    );
}
export default ModalInput;
