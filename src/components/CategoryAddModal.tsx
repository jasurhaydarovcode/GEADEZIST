import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const CategoryAddModal: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)} color="default" variant="solid" className=" text-xl px-5 py-6 my-5">
                <PlusCircleOutlined className="text-xl" />Qo'shish
            </Button>
            <Modal
                title="Modal 1000px width"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <div className=''>
                    <input type="text" />
                    <br />
                    <input type="text" />
                    <br />
                    <input type="text" />
                    <br />
                    <input type="text" />
                </div>
            </Modal>
        </>
    );
};

export default CategoryAddModal;