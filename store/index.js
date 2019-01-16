import { BaseService }  from '../api/services';
import { HtmlHelpers }  from '../utils';

export const state = () => ({
  isLoading: false,
  displayMainOverlay: false,
  welcomeMessage: ''
});

export const mutations = {
  SET_WELCOME_MESSAGE: (state, message) => {
    state.welcomeMessage = message;
  },
  SET_LOADING: (state, isLoading) => {
    state.isLoading = isLoading;
  },
  SET_MAIN_OVERLAY_VISIBILITY: (state, value) => {
    state.displayMainOverlay = value;
  }
};

export const actions = {
  async getWelcomeMessage ({ commit }) {
    var message = await BaseService.getWelcomeMessage();

    commit('SET_WELCOME_MESSAGE', message);
  },
  updateIsLoading ({ commit }, payload) {
    commit('SET_LOADING', payload);
  },
  syncMainOverlaySize () {
    HtmlHelpers.cloneBodyDimensions(document.getElementById('main-overlay'));
  },
  setMainOverlayVisibility ({ commit, dispatch }, value) {
    commit('SET_MAIN_OVERLAY_VISIBILITY', value);

    if (value) {
      setTimeout(() => {
        dispatch('syncMainOverlaySize');
      }, 0);
    }
  }
};
