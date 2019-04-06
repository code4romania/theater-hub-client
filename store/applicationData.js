import { ApplicationDataService }   from '../api/services';

export const state = () => ({
    skills: [],
    locales: []
});

export const mutations = {
    SET_SKILLS: (state, value) => {
        state.skills = value;
    },
    SET_LOCALES: (state, value) => {
        state.locales = value;
    },
    CLEAR_APPLICATION_DATA: (state) => {
        state.skills = [];
        state.locales = [];
    }
};

export const actions = {
    async getApplicationData ({ commit, dispatch }) {
        dispatch('getSkills');
        dispatch('getLocales');
    },
    async getSkills ({ commit, dispatch }, request) {
        return ApplicationDataService.getSkills().then(response => {
            dispatch('setSkills', response);
        });
    },
    async getLocales ({ commit, dispatch }, request) {
        return ApplicationDataService.getLocales().then(response => {
            dispatch('setLocales', response);
        });
    },
    setSkills: ({ commit }, value) => {
        commit('SET_SKILLS', value);
    },
    setLocales: ({ commit }, value) => {
        commit('SET_LOCALES', value);
    },
    clearApplicationData: ({ commit }) => {
        commit('CLEAR_APPLICATION_DATA');
    }
};

export const getters = {
    skills (state) {
        return state.skills;
    },
    locales (state) {
        return state.locales;
    }
};
