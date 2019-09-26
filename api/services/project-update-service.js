import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class ProjectUpdateService extends BaseService {
    static async create (projectID, update) {
        var url = Endpoints.Projects.CreateProjectUpdate.replace('{0}', projectID);

        return this.$axios.$post(url, update);
    }

    static async update (projectID, id, update) {
        var url = Endpoints.Projects.UpdateProjectUpdate
                        .replace('{0}', projectID)
                        .replace('{1}', id);

        return this.$axios.$patch(url, update);
    }

    static async delete (projectID, id) {
        var url = Endpoints.Projects.DeleteProjectUpdateByID
                        .replace('{0}', projectID)
                        .replace('{1}', id);

        return this.$axios.$delete(url);
    }
}
