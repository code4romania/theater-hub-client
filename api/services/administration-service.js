import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class AdministrationService extends BaseService {
    static async getUsers (query) {
        return this.$axios.$get(`${Endpoints.Administration.GetUsers}?searchTerm=${query.searchTerm}&sortCriterion=${query.sortCriterion}&sortOrientation=${query.sortOrientation}&page=${query.page}&pageSize=${query.pageSize}`);
    }

    static async addUser (request) {
        return this.$axios.$post(Endpoints.Administration.AddUser, request);
    }

    static async enableUser (id) {
        return this.$axios.$get(Endpoints.Administration.EnableUser.replace('{0}', id));
    }

    static async disableUser (id) {
        return this.$axios.$get(Endpoints.Administration.DisableUser.replace('{0}', id));
    }

    static async deleteUser (id) {
        return this.$axios.$get(Endpoints.Administration.DeleteUser.replace('{0}', id));
    }
}
