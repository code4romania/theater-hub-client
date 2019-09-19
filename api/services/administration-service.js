import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class AdministrationService extends BaseService {
    static async getUsers (query) {
        return this.$axios.$get(`${Endpoints.Administration.GetUsers}?searchTerm=${query.searchTerm}&sortCriterion=${query.sortCriterion}&sortOrientation=${query.sortOrientation}&page=${query.page}&pageSize=${query.pageSize}`);
    }

    static async inviteUser (request) {
        return this.$axios.$post(Endpoints.Administration.InviteUser, request);
    }

    static async enableUser (id, request) {
        return this.$axios.$post(Endpoints.Administration.EnableUser.replace('{0}', id), request);
    }

    static async disableUser (id, request) {
        return this.$axios.$post(Endpoints.Administration.DisableUser.replace('{0}', id), request);
    }

    static async deleteUser (id, request) {
        return this.$axios.$post(Endpoints.Administration.DeleteUser.replace('{0}', id), request);
    }

    static async getProjects (query) {
        return this.$axios.$get(`${Endpoints.Administration.GetProjects}?searchTerm=${query.searchTerm}&sortCriterion=${query.sortCriterion}&sortOrientation=${query.sortOrientation}&page=${query.page}&pageSize=${query.pageSize}`);
    }

    static async enableProject (id, request) {
        return this.$axios.$post(Endpoints.Administration.EnableProject.replace('{0}', id), request);
    }

    static async disableProject (id, request) {
        return this.$axios.$post(Endpoints.Administration.DisableProject.replace('{0}', id), request);
    }

    static async deleteProject (id, request) {
        return this.$axios.$post(Endpoints.Administration.DeleteProject.replace('{0}', id), request);
    }
}
