import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class ProjectService extends BaseService {
    static async create (request) {
        return this.$axios.$post(Endpoints.CreateProject, request);
    }

    static async getProjects (request) {
        return this.$axios.$get(Endpoints.GetProjects, request);
    }
}
