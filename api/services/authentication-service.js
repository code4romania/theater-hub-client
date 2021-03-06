import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class AuthenticationService extends BaseService {
    static async authenticate (request) {
        return this.$axios.$post(Endpoints.Login, request);
    }

    static async checkUserPassword (request) {
        return this.$axios.$post(Endpoints.CheckUserPassword, request);
    }
}
