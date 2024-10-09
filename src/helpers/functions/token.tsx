function getToken() {
<<<<<<< HEAD
    const token = localStorage.getItem('token');
    return token ? token : '';
=======
    const token = localStorage.getItem('token')
    if (token) {
        return token
    } else {
        return ''
    }
>>>>>>> dde8320e0eec20480d83eb352d0d27d515e77859
}

export const config = {
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
};