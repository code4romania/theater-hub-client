import { AuthenticationService } from '../api/services';
var jwtDecode                    = require('jwt-decode');

export const state = () => ({
  token: '',
  loginErrors: []
});

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  UPDATE_LOGIN_ERRORS: (state, errors) => {
    state.loginErrors = errors;
  }
};

export const actions = {
  async login ({ commit, dispatch }, request) {
    await AuthenticationService.authenticate(request).then(response => {
      dispatch('setToken', response.Token);
      dispatch('users/setMe', jwtDecode(response.Token), { root: true });
      dispatch('users/setMyProfileImage', response.profileImage, { root: true });
      dispatch('updateLoginErrors', '');
    }).catch(error => {
      dispatch('updateLoginErrors', error.response.data.errors);
    });
  },
  setToken ({ commit }, token) {
    commit('SET_TOKEN', token);
    localStorage.setItem('theaterHubToken', token);
  },
  updateLoginErrors: ({ commit }, errors) => {
    commit('UPDATE_LOGIN_ERRORS', errors);
  },
  logout: context => {
    context.commit('SET_TOKEN', null);
    localStorage.removeItem('theaterHubToken');
  }
};

export const getters = {
  token (state) {
    return localStorage.getItem('theaterHubToken');
  },
  isAuthenticated (state) {
    var isAuthenticated = !!state.token || !!localStorage.getItem('theaterHubToken');

    return isAuthenticated;
  }

};
