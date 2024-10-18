import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import React from 'react';

const DevToolsBlocker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
        const showWarning = () => {
            toast.error("Dev Tools are not allowed to open!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                toastId: 'uniqueToastId',
            });
        };

        const detectDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;

            if (widthThreshold || heightThreshold) {
                showWarning();
                window.location.reload();
            }
        };

        const interval = setInterval(detectDevTools, 1000);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
                e.preventDefault();
                showWarning();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            showWarning();
        };

        window.addEventListener('contextmenu', handleContextMenu);

        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    return (
        <>
            {children}
            <ToastContainer limit={1} />
        </>
    );
};

DevToolsBlocker.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DevToolsBlocker;
