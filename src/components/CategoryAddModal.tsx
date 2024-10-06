import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const CategoryAddModal: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button type="primary" className='text-xl p-5 py-7' onClick={() => setOpen(true)}>
                <i className='bi bi-plus-circle-fill text-3xl'></i>
                Qo'shish
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