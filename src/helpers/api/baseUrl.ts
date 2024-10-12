// ======= Swagger UI =======
export const baseUrl = 'http://164.92.165.18:8090/';

export const loginUrl = `${baseUrl}auth/login`;

// ==================== User Controller ====================
export const getMeUser = `${baseUrl}user/get/me`;
export const getClientAll = `${baseUrl}user?page=0&size=10`;
export const getMe = `${baseUrl}user/get/me`;
export const getProfile = `${baseUrl}user/profile`;

// category
export const getClientCategory = `${baseUrl}category/`;
export const addCategory = `${baseUrl}category/add`;
export const getCategory = `${baseUrl}category/get/all`;
export const deleteCategory = `${baseUrl}category/delete`;
export const updateCategory = `${baseUrl}category/update`;

// video
export const getVideo = `${baseUrl}video/get/all`;
export const addVideo = `${baseUrl}video/add`;
export const deleteVideo = `${baseUrl}video/delete`;
export const updateVideo = `${baseUrl}video/update`;

// video file
export const getVideoFile = `${baseUrl}video/file/get/all`;
export const addVideoFile = `${baseUrl}video/file/add`;
export const deleteVideoFile = `${baseUrl}video/file/delete`;
export const updateVideoFile = `${baseUrl}video/file/update`;

//image
export const getImage = `${baseUrl}api/videos/files`;
export const addImage = `${baseUrl}image/add`;
export const deleteImage = `${baseUrl}image/delete`;
export const updateImage = `${baseUrl}image/update`;

// ==================== Statistics-Controller ====================
// User dashboard reultlari
export const getUserDashboard = `${baseUrl}statistic/user-dashboard`;

// SUPTER ADMIN dashboard userlarni resutlari filter bo'yicha
export const superAdminDashboardUsersResultFilter = `${baseUrl}statistic/filter`;

// SUPER ADMIN dashboard haftalik statistika
export const superAdminDashWeekStatistic = `${baseUrl}statistic/dayOfWeek`;

// SUPER ADMIN dashboard barcha statstika sonlarda
export const getStaticAll = `${baseUrl}statistic/counts/`;





// --------------- Super Admin address urls -------------------
// viloyatlarni urls
export const getRegion = `${baseUrl}region/`;
export const addRegion = `${baseUrl}region`;
export const deleteRegion = `${baseUrl}region/`;
export const updateRegion = `${baseUrl}region/`;
// tumanlarni urls
export const getDistrict = `${baseUrl}district/`;
export const addDistrict = `${baseUrl}district`;
export const deleteDistrict = `${baseUrl}district/`;
export const updateDistrict = `${baseUrl}district`;
