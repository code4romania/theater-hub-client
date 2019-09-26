import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class ProjectNeedService extends BaseService {
    static async create (projectID, need) {
        var url = Endpoints.Projects.CreateProjectNeed.replace('{0}', projectID);

        return this.$axios.$post(url, need);
    }

    static async update (projectID, id, need) {
        var url = Endpoints.Projects.UpdateProjectNeed
                        .replace('{0}', projectID)
                        .replace('{1}', id);

        return this.$axios.$patch(url, need);
    }

    static async delete (projectID, id) {
        var url = Endpoints.Projects.DeleteProjectNeedByID
                        .replace('{0}', projectID)
                        .replace('{1}', id);

        return this.$axios.$delete(url);
    }
}
