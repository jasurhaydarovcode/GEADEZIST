import { ButtonType } from "@/helpers/types/Button";


const Button: React.FC<ButtonType> = ({
  btnText = '',
  btnBg = 'none',
  btnBorder = 'none',
  btnColor = 'none',
  btnHeight = 'none',
  btnShadow = 'none',
  btnWidth = 'none',
  btnClass = '',
}) => {
  return (
    <div>
      <button
        style={{
          backgroundColor: btnBg,
          border: btnBorder,
          color: btnColor,
          height: btnHeight,
          boxShadow: btnShadow,
          width: btnWidth,
        }}
        className={btnClass}
      >
        {/* Agar iconClass berilgan bo'lsa, <i> tegini ko'rsatamiz */}
        {/* {iconClass && } */}
        
        {btnText && <span>{btnText}</span>}
      </button>
    </div>
  );
};

export default Button;
