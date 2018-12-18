import { BaseService }  from '../api/services';

export const state = () => ({
  isLoading: false,
  welcomeMessage: ''
});

export const mutations = {
  SET_WELCOME_MESSAGE: (state, message) => {
    state.welcomeMessage = message;
  },
  SET_LOADING: (state, isLoading) => {
    this.isLoading = isLoading;
  }
};

export const actions = {
  async getWelcomeMessage ({ commit }) {
    var message = await BaseService.getWelcomeMessage();

    commit('SET_WELCOME_MESSAGE', message);
  },
  updateIsLoading ({ commit }, payload) {
    commit('SET_LOADING', payload);
  }
};
