
export default ({ $axios, redirect, store }) => {
   $axios.defaults.withCredentials = true;

    $axios.onRequest(config => {
      var token = localStorage.getItem('theaterHubToken');

      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
      }

      config.headers.common['Accept']       = 'application/json';
      config.headers.common['Content-Type'] = 'application/json';
    });
  }
