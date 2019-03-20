import VuexPersistence        from 'vuex-persist';
import { HtmlHelpers }        from '../utils';

export const state = () => ({
  isLoading: false,
  displayMainOverlay: false,
  locale: ''
});

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export const mutations = {
  SET_LOADING: (state, isLoading) => {
    state.isLoading = isLoading;
  },
  SET_MAIN_OVERLAY_VISIBILITY: (state, value) => {
    state.displayMainOverlay = value;
  },
  SET_LOCALE: (state, value) => {
    state.locale = value;
  }
};

export const actions = {
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
  },
  setLocale ({ commit, dispatch }, value) {
    commit('SET_LOCALE', value);

    this.$router.push({ path: `${this.$router.currentRoute.path}?lang=${value}` });
  },
  setLocaleWithoutRedirect ({ commit, dispatch }, value) {
    commit('SET_LOCALE', value);
  }
};

export const getters = {
  locale (state) {
      return state.locale;
  },
  localeName (state) {
    return state.applicationData.locales.filter(l => l.ID === state.locale)[0].Name;
  }
};

export const plugins = [
  vuexLocal.plugin
];
