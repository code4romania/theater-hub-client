import { ProjectUpdateService } from '../api/services';

export const state = () => ({
});

export const mutations = {
};

export const actions = {
    async create ({ commit, dispatch }, request) {
        var { projectID, update } = request;

        return ProjectUpdateService.create(projectID, update);
    },
    async update ({ commit, dispatch }, request) {
        var { projectID, id, update } = request;

        return ProjectUpdateService.update(projectID, id,  update);
    },
    async delete ({ commit, dispatch }, request) {
        var { projectID, id } = request;

        await ProjectUpdateService.delete(projectID, id).then(response => {
        });
    }
};
