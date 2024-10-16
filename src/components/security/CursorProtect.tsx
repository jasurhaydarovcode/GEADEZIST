import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CursorProtect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isProtected, setIsProtected] = useState(false);

    useEffect(() => {
        const handleMouseLeave = () => setIsProtected(true);
        const handleMouseEnter = () => setIsProtected(false);

        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return (
        <>
            {children}
            {isProtected && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.92)',
                        zIndex: 9999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: '24px',
                    }}
                >
                    ❌ Websayt Himoyalangan
                </div>
            )}
        </>
    );
};

CursorProtect.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CursorProtect;
