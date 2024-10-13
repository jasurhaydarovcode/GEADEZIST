// TooltipText.tsx
import { Tooltip } from 'antd';

interface TooltipTextProps {
  title: string;
  children: React.ReactNode;
}

const TooltipText: React.FC<TooltipTextProps> = ({ title, children }) => {
  return (
    <Tooltip title={title}>
      <span className="truncate w-[120px] inline-block">{children}</span>
    </Tooltip>
  );
};

export default TooltipText;
