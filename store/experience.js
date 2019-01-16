import { ExperienceService } from '../api/services';

export const state = () => ({
    newExperienceStep: null
});

export const mutations = {
    SET_NEW_EXPERIENCE_STEP: (state, value) => {
        state.newExperienceStep = value;
    }
};

export const actions = {
    async create ({ commit, dispatch }, request) {
        await ExperienceService.create(request).then(response => {
            commit('SET_NEW_EXPERIENCE_STEP', response);
        });
    },
    async update ({ commit, dispatch }, request) {
        await ExperienceService.update(request).then(response => {
        });
    },
    async delete ({ commit, dispatch }, id) {
        await ExperienceService.delete(id).then(response => {
        });
    }
};
