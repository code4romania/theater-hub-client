import { UserVideoService } from '../api/services';

export const state = () => ({
    newUserVideo: null
});

export const mutations = {
    SET_NEW_USER_VIDEO: (state, value) => {
        state.newUserVideo = value;
    }
};

export const actions = {
    async create ({ commit, dispatch }, request) {
        await UserVideoService.create(request).then(response => {
            commit('SET_NEW_USER_VIDEO', response);
        });
    },
    async update ({ commit, dispatch }, request) {
        await UserVideoService.update(request).then(response => {
        });
    },
    async delete ({ commit, dispatch }, id) {
        await UserVideoService.delete(id).then(response => {
        });
    }
};
