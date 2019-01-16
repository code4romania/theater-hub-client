import { EducationService } from '../api/services';

export const state = () => ({
    newEducationStep: null
});

export const mutations = {
    SET_NEW_EDUCATION_STEP: (state, value) => {
        state.newEducationStep = value;
    }
};

export const actions = {
    async create ({ commit, dispatch }, request) {
        await EducationService.create(request).then(response => {
            commit('SET_NEW_EDUCATION_STEP', response);
        });
    },
    async update ({ commit, dispatch }, request) {
        await EducationService.update(request).then(response => {
        });
    },
    async delete ({ commit, dispatch }, id) {
        await EducationService.delete(id).then(response => {
        });
    }
};
