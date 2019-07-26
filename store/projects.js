import { ProjectService } from '../api/services';

export const state = () => ({
    projects: null
});

export const mutations = {
    SET_NEW_USER_VIDEO: (state, value) => {
        state.newUserVideo = value;
    }
};

export const actions = {
    async getProjects ({ commit, dispatch }, query) {
        return ProjectService.getProjects(query);
    }
};
