import { ButtonType } from "@/helpers/types/Button";

const Button: React.FC<ButtonType> = ({
  btnText = 'None', 
  btnWidth = 'auto', 
  btnBorder = 'none', 
  btnHeight = 'auto', 
  btnColor = 'inherit', 
  btnBg = 'transparent', 
  className = '', 
  btnShadow = 'none',
}) => {
  return (
    <button
      className={className}
      style={{
        width: btnWidth,
        height: btnHeight,
        backgroundColor: btnBg,
        color: btnColor,
        border: btnBorder,
        boxShadow: btnShadow,
      }}
    >
      {btnText}
    </button>
  );
};

export default Button;
