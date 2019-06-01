import { ApplicationDataService }   from '../api/services';

export const state = () => ({
    skills: [],
    locales: [],
    generalApplicationInformation: {}
});

export const mutations = {
    SET_SKILLS: (state, value) => {
        state.skills = value;
    },
    SET_LOCALES: (state, value) => {
        state.locales = value;
    },
    SET_GENERAL_APPLICATION_INFORMATION: (state, value) => {
        state.generalApplicationInformation = value;
    },
    CLEAR_APPLICATION_DATA: (state) => {
        state.skills = [];
        state.locales = [];
        state.generalApplicationInformation = {};
    }
};

export const actions = {
    async getApplicationData ({ commit, dispatch }) {
        dispatch('getSkills');
        dispatch('getLocales');
        dispatch('getGeneralApplicationInformation');
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
    async getGeneralApplicationInformation ({ commit, dispatch }) {
        return ApplicationDataService.getGeneralApplicationInformation().then(response => {
            dispatch('setGeneralApplicationInformation', response);
        });
    },
    setSkills: ({ commit }, value) => {
        commit('SET_SKILLS', value);
    },
    setLocales: ({ commit }, value) => {
        commit('SET_LOCALES', value);
    },
    setGeneralApplicationInformation: ({ commit }, value) => {
        commit('SET_GENERAL_APPLICATION_INFORMATION', value);
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
    },
    maxFileSize (state) {
        return state.generalApplicationInformation.MaxFileSize;
    },
    maxPhotoGalleryFileCount (state) {
        return state.generalApplicationInformation.MaxPhotoGalleryFileCount;
    }
};
