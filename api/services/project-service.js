import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class ProjectService extends BaseService {
    static async create (request) {
        return this.$axios.$post(Endpoints.CreateProject, request);
    }

    static async getProject (id) {
        return this.$axios.$get(`${Endpoints.GetProject}/${id}`);
    }

    static async getProjects (query) {
        return this.$axios.$get(`${Endpoints.GetProjects}?searchTerm=${query.searchTerm}&skills=${query.skills}&page=${query.page}&pageSize=${query.pageSize}`);
    }

    static async delete (id) {
        return this.$axios.$delete(`${Endpoints.DeleteProjectByID}/${id}`);
    }
}
