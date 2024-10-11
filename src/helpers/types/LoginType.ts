export interface LoginType {
  email: null | string;
  password: null | string;
}

export interface ConfirmType {
  email: null | string;
}
export interface ResetPasswordType {
  passwordToken: null | string;
  newPassword: null | string;
  confirmPassword: null | string;
}
export interface SignUpType {
  firstname: null | string;
  lastname: null | string;
  email: null | string;
  phoneNumber: null | string;
  password: null | string;
  confirmPassword: null | string;
  role: null | string;
}
