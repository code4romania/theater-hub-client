import { ProjectService, HereMapsService } from '../api/services';

export const state = () => ({
    newProject: null,
    createProjectErrors: []
});

export const mutations = {
    SET_NEW_PROJECT: (state, value) => {
        state.newProject = value;
    },
    SET_CREATE_PROJECT_ERRORS: (state, errors) => {
        state.createProjectErrors = errors;
    }
};

export const actions = {
    async getProject ({ commit, dispatch }, id) {
        return ProjectService.getProject(id);
    },
    async getMyProject ({ commit, dispatch }, id) {
        return ProjectService.getMyProject(id);
    },
    async getProjects ({ commit, dispatch }, query) {
        return ProjectService.getProjects(query);
    },
    async getRandomProjects ({ commit, dispatch }, count) {
        return ProjectService.getRandomProjects(count);
    },
    async create ({ commit, dispatch }, request) {
        await ProjectService.create(request).then(response => {
            dispatch('setNewProject', response);
            dispatch('setCreateProjectErrors', []);
        }).catch(error => {
            dispatch('setCreateProjectErrors', error.response.data.errors);
        });
    },
    async updateGeneralInformation ({ commit, dispatch }, request) {
        var { id, generalInformation } = request;

        return ProjectService.updateGeneralInformation(id, generalInformation);
    },
    async delete ({ commit, dispatch }, id) {
        await ProjectService.delete(id);
    },
    async getCities ({ commit, dispatch }, text) {
        return HereMapsService.getCities(text);
    },
    setNewProject: ({ commit }, value) => {
        commit('SET_NEW_PROJECT', value);
    },
    setCreateProjectErrors: ({ commit }, errors) => {
        commit('SET_CREATE_PROJECT_ERRORS', errors);
    }
};
