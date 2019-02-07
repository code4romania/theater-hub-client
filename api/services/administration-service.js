import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class AdministrationService extends BaseService {
    static async getUsers (query) {
        return this.$axios.$get(`${Endpoints.Administration.GetUsers}?searchTerm=${query.searchTerm}&sortCriterion=${query.sortCriterion}&sortOrientation=${query.sortOrientation}&page=${query.page}&pageSize=${query.pageSize}`);
    }

    static async addUser (request) {
        return this.$axios.$post(Endpoints.Administration.AddUser, request);
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
}
