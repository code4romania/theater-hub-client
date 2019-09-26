import { ProjectNeedService } from '../api/services';

export const state = () => ({
});

export const mutations = {
};

export const actions = {
    async create ({ commit, dispatch }, request) {
        var { projectID, need } = request;

        return ProjectNeedService.create(projectID, need);
    },
    async update ({ commit, dispatch }, request) {
        var { projectID, id, need } = request;

        return ProjectNeedService.update(projectID, id, need);
    },
    async delete ({ commit, dispatch }, request) {
        var { projectID, id } = request;

        await ProjectNeedService.delete(projectID, id).then(response => {
        });
    }
};
