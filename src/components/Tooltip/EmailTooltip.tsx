import { Tooltip } from 'flowbite-react';

const EmailTooltip = ({ email }: { email: string }) => {
    const handleMouseEnter = () => {
        console.log('Mouse entered');
    };

    const handleMouseLeave = () => {
        console.log('Mouse left');
    };

    return (
        <Tooltip content={email} style="light">
            <div
                className="text-md w-full text-left pt-5 pb-2 rounded"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {email && email.length > 20 ? `${email.substring(0, 20)}...` : email}
            </div>
        </Tooltip>
    );
};

export default EmailTooltip;
