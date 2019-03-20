import { AuthenticationService } from '../api/services';

export const state = () => ({
  token: '',
  loginErrors: [],
  checkUserPasswordErrors: []
});

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_LOGIN_ERRORS: (state, errors) => {
    state.loginErrors = errors;
  },
  SET_CHECK_USER_PASSWORD_ERRORS: (state, errors) => {
    state.checkUserPasswordErrors = errors;
  }
};

export const actions = {
  async login ({ commit, dispatch }, request) {
    await AuthenticationService.authenticate(request).then(response => {
      dispatch('setToken', response.Token);
      dispatch('setLocale', response.Locale, { root: true });
      dispatch('applicationData/getApplicationData', null, { root: true });
      dispatch('setLoginErrors', '');
    }).catch(error => {
      dispatch('setLoginErrors', error.response.data.errors);
    });
  },
  async checkUserPassword ({ commit, dispatch }, request) {
    await AuthenticationService.checkUserPassword(request).then(response => {
      dispatch('setCheckUserPasswordErrors', '');
    }).catch(error => {
      dispatch('setCheckUserPasswordErrors', error.response.data.errors);
    });
  },
  setToken ({ commit }, token) {
    commit('SET_TOKEN', token);
    localStorage.setItem('theaterHubToken', token);
  },
  setLoginErrors: ({ commit }, errors) => {
    commit('SET_LOGIN_ERRORS', errors);
  },
  setCheckUserPasswordErrors: ({ commit }, errors) => {
    commit('SET_CHECK_USER_PASSWORD_ERRORS', errors);
  },
  logout: ({ commit, dispatch }) => {
    dispatch('users/clearUsersData', null, { root: true });

    commit('SET_TOKEN', null);
    localStorage.removeItem('theaterHubToken');
  }
};

export const getters = {
  token (state) {
    return state.token || localStorage.getItem('theaterHubToken');
  },
  isAuthenticated (state, getters) {
    return !!getters.token;
  }

};
