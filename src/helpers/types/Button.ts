import { ReactElement, ReactNode } from "react";

export interface ButtonType {
  btnClass?: string;
  btnText?: string;
  btnWidth?: string;
  btnHeight?: string;
  btnBg?: string;
  btnColor?: string;
  btnBorder?: string;
  btnShadow?: string;
  iconClass?: string;
  btnClick?: ReactElement;
}
