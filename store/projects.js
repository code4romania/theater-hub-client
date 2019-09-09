import { ProjectService } from '../api/services';

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
    async getProjects ({ commit, dispatch }, query) {
        return ProjectService.getProjects(query);
    },
    async create ({ commit, dispatch }, request) {
        await ProjectService.create(request).then(response => {
            dispatch('setNewProject', response);
            dispatch('setCreateProjectErrors', []);
        }).catch(error => {
            dispatch('setCreateProjectErrors', error.response.data.errors);
        });
    },
    setNewProject: ({ commit }, value) => {
        commit('SET_NEW_PROJECT', value);
    },
    setCreateProjectErrors: ({ commit }, errors) => {
        commit('SET_CREATE_PROJECT_ERRORS', errors);
    }
};
