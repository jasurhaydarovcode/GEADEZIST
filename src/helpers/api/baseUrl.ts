export const baseUrl = 'http://164.92.165.18:8090/'
export const loginUrl = `${baseUrl}auth/login`
export const getMeUser = `${baseUrl}user/get/me`
export const getStaticAll = `${baseUrl}statistic/counts/`
export const getClientAll = `${baseUrl}user?page=0&size=10`
export const getMe = `${baseUrl}user/get/me`
export const getProfile = `${baseUrl}user/profile`
export const getClientCategory = `${baseUrl}category/`

// category
export const addCategory = `${baseUrl}category/add`
export const getCategory = `${baseUrl}category/get/all`
export const deleteCategory = `${baseUrl}category/delete`
export const updateCategory = `${baseUrl}category/update`
