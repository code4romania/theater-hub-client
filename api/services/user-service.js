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

    static async updateMyGeneralInformation (request) {
        return this.$axios.$post(Endpoints.UpdateMyGeneralInformation, request);
    }

    static async updateMySkills (request) {
        return this.$axios.$post(Endpoints.UpdateMySkills, request);
    }

    static async updateMyPhotoGallery (request) {
        return this.$axios.$post(Endpoints.UpdateMyPhotoGallery, request);
    }

    static async updateMyVideoGallery (request) {
        return this.$axios.$post(Endpoints.UpdateMyVideoGallery, request);
    }

    static async updateMyAwards (request) {
        return this.$axios.$post(Endpoints.UpdateMyAwards, request);
    }

    static async updateMyExperience (request) {
        return this.$axios.$post(Endpoints.UpdateMyExperience, request);
    }

    static async updateMyEducation (request) {
        return this.$axios.$post(Endpoints.UpdateMyEducation, request);
    }

    static async getSettings () {
        return this.$axios.$get(Endpoints.GetSettings);
    }

    static async updateSettings (request) {
        return this.$axios.$patch(Endpoints.UpdateSettings, request);
    }

    static async getMyProfile (request) {
        return this.$axios.$get(Endpoints.GetMyProfile);
    }

    static async getMe () {
        return this.$axios.$get(Endpoints.GetMe);
    }

    static async getCommunityMembers (query) {
        return this.$axios.$get(`${Endpoints.GetCommunityMembers}?searchTerm=${query.searchTerm}&skills=${query.skills}&sortOrientation=${query.sortOrientation}&page=${query.page}&pageSize=${query.pageSize}`);
    }

    static async getCommunityMemberProfile (id) {
        return this.$axios.$get(`${Endpoints.GetCommunityMemberProfile}/${id}`);
    }

    static async deleteMe (request) {
        return this.$axios.$delete(Endpoints.DeleteMe);
    }
}
