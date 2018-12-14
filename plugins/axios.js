
export default ({ $axios, redirect, store }) => {
    $axios.onRequest(config => {
      var token = localStorage.getItem('theaterHubToken');

      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
      }
    });
  }
