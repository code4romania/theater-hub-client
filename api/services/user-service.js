import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class UserService extends BaseService {
    static async register (request) {
        return this.$axios.$post(Endpoints.Register, request);
    }

    static async finishRegistration (request) {
        return this.$axios.$post(Endpoints.FinishRegistration, request);
    }

    static async forgotPassword (request) {
        return this.$axios.$post(Endpoints.ForgotPassword, request);
    }

    static async resetPassword (request) {
        return this.$axios.$post(Endpoints.ResetPassword, request);
    }

    static async changePassword (request) {
        return this.$axios.$post(Endpoints.ChangePassword, request);
    }

    static async createProfile (request) {
        return this.$axios.$post(Endpoints.CreateProfile, request);
    }

    static async getSettings () {
        return this.$axios.$get(Endpoints.GetSettings);
    }

    static async updateSettings (request) {
        return this.$axios.$patch(Endpoints.UpdateSettings, request);
    }

    static async deleteMe (request) {
        return this.$axios.$delete(Endpoints.DeleteMe);
    }
}
