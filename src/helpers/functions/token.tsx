function getToken() {
    let token = localStorage.getItem('token')
    if (token) {
        return token
    } else {
        return ''
    }
}

export const config = {
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
}
