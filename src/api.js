import axios from 'axios';

const apiRequest = (url, method = 'GET', data = null) => {
  const accessToken = localStorage.getItem('access_token');

  return axios({
    method: method,
    url: `http://localhost:8000/api/${url}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: data,
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error en la solicitud API:', error);
    throw error;
  });
};

export { apiRequest };


