export  interface LoginType  {
    email: null | string,
    password:null | string
}

export  interface ConfirmType  {
    email: null | string
}
export  interface ResetPasswordType  {
    passwordToken : null | string,
    newPassword : null | string,
    confirmPassword : null | string
}