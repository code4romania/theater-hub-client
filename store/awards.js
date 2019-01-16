import { AwardService } from '../api/services';

export const state = () => ({
    newAward: null
});

export const mutations = {
    SET_NEW_AWARD: (state, value) => {
        state.newAward = value;
    }
};


export const actions = {
    async create ({ commit, dispatch }, request) {
        await AwardService.create(request).then(response => {
            commit('SET_NEW_AWARD', response);
        });
    },
    async update ({ commit, dispatch }, request) {
        await AwardService.update(request).then(response => {
        });
    },
    async delete ({ commit, dispatch }, id) {
        await AwardService.delete(id).then(response => {
        });
    }
};
