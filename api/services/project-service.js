import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class ProjectService extends BaseService {
    static async getProjects (request) {
        return this.$axios.$get(Endpoints.GetProjects, request);
    }
}
