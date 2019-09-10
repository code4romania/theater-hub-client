import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class UserService extends BaseService {
    static async contact (request) {
        return this.$axios.$post(Endpoints.Contact, request);
    }

    static async register (request) {
        return this.$axios.$post(Endpoints.Register, request);
    }

    static async managedUserSignup (request) {
        return this.$axios.$post(Endpoints.ManagedUserSignup, request);
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
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };

        return this.$axios.$post(Endpoints.CreateProfile, request, config);
    }

    static async generateResume () {
        const config = {
            headers: { 'Accept': 'application/pdf' },
            responseType: 'arraybuffer'
        };

        return this.$axios.$get(Endpoints.GenerateResume, config);
    }

    static async updateMyGeneralInformation (request) {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };

        return this.$axios.$post(Endpoints.UpdateMyGeneralInformation, request, config);
    }

    static async updateMySkills (request) {
        return this.$axios.$post(Endpoints.UpdateMySkills, request);
    }

    static async updateMyPhotoGallery (request) {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };

        var updateMyPhotoGalleryFormData = new FormData();
        request.filter(p => !!p.File).forEach(p => updateMyPhotoGalleryFormData.append('AddedPhotos', p.File));
        var photoGallery = request.filter(p => !p.File);
        updateMyPhotoGalleryFormData.append('PhotoGallery', JSON.stringify(photoGallery));

        return this.$axios.$post(Endpoints.UpdateMyPhotoGallery, updateMyPhotoGalleryFormData, config);
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

    static async getCommunityLayers (query) {
        return this.$axios.$get(`${Endpoints.GetCommunityLayers}?searchTerm=${query.searchTerm}`);
    }

    static async getCommunityMembers (query) {
        return this.$axios.$get(`${Endpoints.GetCommunityMembers}?searchTerm=${query.searchTerm}&skills=${query.skills}&page=${query.page}&pageSize=${query.pageSize}`);
    }

    static async getRandomCommunityMembers (count = 5) {
        return this.$axios.$get(`${Endpoints.GetRandomCommunityMembers}?count=${count}`);
    }

    static async getCommunityMemberProfile (id) {
        return this.$axios.$get(`${Endpoints.GetCommunityMemberProfile}/${id}`);
    }

    static async getMyProjects () {
        return this.$axios.$get(Endpoints.GetMyProjects);
    }

    static async deleteMe (request) {
        return this.$axios.$delete(Endpoints.DeleteMe);
    }
}
