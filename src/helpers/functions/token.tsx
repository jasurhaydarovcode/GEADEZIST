function getToken() {
  const token = localStorage.getItem('token');
  return token ? token : '';
}

export const config = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};
