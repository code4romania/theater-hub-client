import VuexPersistence             from 'vuex-persist'
import { UserService }             from '../api/services';
import { UserAccountStatusType,
                    UserRoleType } from '../store/entities';

export const state = () => ({
    me: null,
    myProfile: null,
    communityMemberProfile: null,
    isFinishRegistrationSuccessful: false,
    isEditingProfileSection: false,
    contactErrors: [],
    signupErrors: [],
    managedUserSignupErrors: [],
    forgotPasswordErrors: [],
    resetPasswordErrors: [],
    createProfileErrors: [],
    updateMySkillsErrors: [],
    updateMyVideoGalleryErrors: [],
    updateMyAwardsErrors: [],
    updateMyExperienceErrors: [],
    updateMyEducationErrors: [],
    updateSettingsErrors: [],
    changePasswordErrors: [],
    deleteMeErrors: []
});

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
      me: state.me,
      myProfile: state.myProfile
  })
});

export const mutations = {
    SET_CONTACT_ERRORS: (state, errors) => {
        state.contactErrors = errors;
    },
    SET_SIGNUP_ERRORS: (state, errors) => {
        state.signupErrors = errors;
    },
    SET_MANAGED_USER_SIGNUP_ERRORS: (state, errors) => {
        state.managedUserSignupErrors = errors;
    },
    SET_FORGOT_PASSWORD_ERRORS: (state, errors) => {
        state.forgotPasswordErrors = errors;
    },
    SET_RESET_PASSWORD_ERRORS: (state, errors) => {
        state.resetPasswordErrors = errors;
    },
    SET_CHANGE_PASSWORD_ERRORS: (state, errors) => {
        state.changePasswordErrors = errors;
    },
    SET_IS_FINISH_REGISTRATION_SUCCESSFUL: (state, value) => {
        state.isFinishRegistrationSuccessful = value;
    },
    SET_CREATE_PROFILE_ERRORS: (state, errors) => {
        state.createProfileErrors = errors;
    },
    SET_UPDATE_MY_SKILLS_ERRORS: (state, errors) => {
        state.updateMySkillsErrors = errors;
    },
    SET_UPDATE_MY_VIDEO_GALLERY_ERRORS: (state, errors) => {
        state.updateMyVideoGalleryErrors = errors;
    },
    SET_UPDATE_MY_AWARDS_ERRORS: (state, errors) => {
        state.updateMyAwardsErrors = errors;
    },
    SET_UPDATE_MY_EXPERIENCE_ERRORS: (state, errors) => {
        state.updateMyExperienceErrors = errors;
    },
    SET_UPDATE_MY_EDUCATION_ERRORS: (state, errors) => {
        state.updateMyEducationErrors = errors;
    },
    SET_UPDATE_SETTINGS_ERRORS: (state, errors) => {
        state.updateSettingsErrors = errors;
    },
    SET_DELETE_ME_ERRORS: (state, errors) => {
        state.deleteMeErrors = errors;
    },
    SET_ME: (state, value) => {
        state.me             = value;
    },
    SET_MY_PROFILE: (state, value) => {
        state.myProfile      = value;
    },
    SET_COMMUNITY_MEMBER_PROFILE: (state, value) => {
        state.communityMemberProfile = value;
    },
    ENABLE_ME: (state) => {
        state.me.AccountStatus = UserAccountStatusType.Enabled;
    },
    CLEAR_USERS_DATA: (state) => {
        state.me             = null;
    },
    INITIATE_EDIT_SECTION_SESSION: (state) => {
        state.isEditingProfileSection = true;
    },
    END_EDIT_SECTION_SESSION: (state) => {
        state.isEditingProfileSection = false;
    }
};

export const actions = {
    async contact ({ commit, dispatch }, request) {
        await UserService.contact(request).then(response => {
            dispatch('setContactErrors', '');
        }).catch(error => {
            dispatch('setContactErrors', error.response.data.errors);
        });
    },
    async subcribeToNewsletter ({ commit, dispatch }, request) {
        return UserService.subcribeToNewsletter(request);
    },
    async signup ({ commit, dispatch }, request) {
        await UserService.register(request).then(response => {
            dispatch('setSignupErrors', '');
        }).catch(error => {
            dispatch('setSignupErrors', error.response.data.errors);
        });
    },
    async managedUserSignup ({ commit, dispatch }, request) {
        await UserService.managedUserSignup(request).then(response => {
            dispatch('authentication/setToken', response.Token, { root: true });
            dispatch('applicationData/getApplicationData', null, { root: true });
            dispatch('setManagedUserSignupErrors', '');
        }).catch(error => {
            dispatch('setManagedUserSignupErrors', error.response.data.errors);
        });
    },
    async finishRegistration ({ commit, dispatch }, request) {
        await UserService.finishRegistration(request).then(response => {
            dispatch('authentication/setToken', response.Token, { root: true });
            dispatch('getMe');
            dispatch('applicationData/getApplicationData', null, { root: true });
            dispatch('setIsFinishRegistrationSuccessful', true);
        }).catch(() => {
            dispatch('setIsFinishRegistrationSuccessful', false);
        });
    },
    async forgotPassword ({ commit, dispatch }, request) {
        await UserService.forgotPassword(request).then(response => {
            dispatch('setForgotPasswordErrors', '');
        }).catch(error => {
            dispatch('setForgotPasswordErrors', error.response.data.errors);
        });
    },
    async resetPassword ({ commit, dispatch }, request) {
        await UserService.resetPassword(request).then(response => {
            dispatch('setResetPasswordErrors', '');
        }).catch(error => {
            dispatch('setResetPasswordErrors', error.response.data.errors);
        });
    },
    async changePassword ({ commit, dispatch }, request) {
        await UserService.changePassword(request).then(response => {
            dispatch('authentication/setToken', response.Token, { root: true });
            dispatch('getMe');
            dispatch('setChangePasswordErrors', '');
        }).catch(error => {
            dispatch('setChangePasswordErrors', error.response.data.errors);
        });
    },
    async createProfile ({ commit, dispatch }, request) {
        await UserService.createProfile(request).then(response => {
            dispatch('authentication/setToken', response.Token, { root: true });
            dispatch('setLocale', response.Locale, { root: true });
            dispatch('setMe', response.Me);
            dispatch('setCreateProfileErrors', '');
        }).catch(error => {
            dispatch('setCreateProfileErrors', error.response.data.errors);
        });
    },
    async generateResume ({ commit, dispatch, getters }, request) {
        await UserService.generateResume().then(response => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var anchorTag = document.createElement('a');
            anchorTag.href = window.URL.createObjectURL(blob);
            anchorTag.download = `CV_${getters.me.FirstName}_${getters.me.LastName}.pdf`;
            anchorTag.click();
        });
    },
    async updateMyGeneralInformation ({ commit, dispatch }, request) {
        return UserService.updateMyGeneralInformation(request);
    },
    async updateMySkills ({ commit, dispatch }, request) {
        await UserService.updateMySkills(request).then(response => {
            dispatch('setUpdateMySkillsErrors', '');
        }).catch(error => {
            dispatch('setUpdateMySkillsErrors', error.response.data.errors);
        });
    },
    async updateMyPhotoGallery ({ commit, dispatch }, request) {
        return UserService.updateMyPhotoGallery(request);
    },
    async updateMyVideoGallery ({ commit, dispatch }, request) {
        await UserService.updateMyVideoGallery(request).then(response => {
            dispatch('setUpdateMyVideoGalleryErrors', '');
        }).catch(error => {
            dispatch('setUpdateMyVideoGalleryErrors', error.response.data.errors);
        });
    },
    async updateMyAwards ({ commit, dispatch }, request) {
        await UserService.updateMyAwards(request).then(response => {
            dispatch('setUpdateMyAwardsErrors', '');
        }).catch(error => {
            dispatch('setUpdateMyAwardsErrors', error.response.data.errors);
        });
    },
    async updateMyExperience ({ commit, dispatch }, request) {
        await UserService.updateMyExperience(request).then(response => {
            dispatch('setUpdateMyExperienceErrors', '');
        }).catch(error => {
            dispatch('setUpdateMyExperienceErrors', error.response.data.errors);
        });
    },
    async updateMyEducation ({ commit, dispatch }, request) {
        await UserService.updateMyEducation(request).then(response => {
            dispatch('setUpdateMyEducationErrors', '');
        }).catch(error => {
            dispatch('setUpdateMyEducationErrors', error.response.data.errors);
        });
    },
    async getSettings ({ commit, dispatch }, request) {
        return UserService.getSettings();
    },
    async updateSettings ({ commit, dispatch }, request) {
        await UserService.updateSettings(request).then(response => {
            dispatch('setUpdateSettingsErrors', '');
            dispatch('setLocale', request.Locale, { root: true });
        }).catch(error => {
            dispatch('setUpdateSettingsErrors', error.response.data.errors);
        });
    },
    async getMe ({ commit, dispatch }) {
        return UserService.getMe().then(response => {
            dispatch('setMe', response);
        });
    },
    async getMyProfile ({ commit, dispatch }, request) {
        return UserService.getMyProfile().then(response => {
            dispatch('setMyProfile', response);
        });
    },
    async getCommunityLayers ({ commit, dispatch }, query) {
        return UserService.getCommunityLayers(query);
    },
    async getCommunityMembers ({ commit, dispatch }, query) {
        return UserService.getCommunityMembers(query);
    },
    async getRandomCommunityMembers ({ commit, dispatch }, count) {
        return UserService.getRandomCommunityMembers(count);
    },
    async getCommunityMemberProfile ({ commit, dispatch }, id) {
        return UserService.getCommunityMemberProfile(id).then(response => {
            dispatch('setCommunityMemberProfile', response);
        });
    },
    async getMyProjects ({ commit, dispatch }) {
        return UserService.getMyProjects();
    },
    async deleteMe ({ commit, dispatch }, request) {
        await UserService.deleteMe().then(() => {
            dispatch('setDeleteMeErrors', '');
        }).catch(error => {
            dispatch('setDeleteMeErrors', error.response.data.errors);
        });
    },
    async enableMe ({ commit, dispatch }, request) {
        commit('ENABLE_ME');
    },
    setContactErrors: ({ commit }, errors) => {
        commit('SET_CONTACT_ERRORS', errors);
    },
    setSignupErrors: ({ commit }, errors) => {
        commit('SET_SIGNUP_ERRORS', errors);
    },
    setManagedUserSignupErrors: ({ commit }, errors) => {
        commit('SET_MANAGED_USER_SIGNUP_ERRORS', errors);
    },
    setForgotPasswordErrors: ({ commit }, errors) => {
        commit('SET_FORGOT_PASSWORD_ERRORS', errors);
    },
    setResetPasswordErrors: ({ commit }, errors) => {
        commit('SET_RESET_PASSWORD_ERRORS', errors);
    },
    setChangePasswordErrors: ({ commit }, errors) => {
        commit('SET_CHANGE_PASSWORD_ERRORS', errors);
    },
    setCreateProfileErrors: ({ commit }, errors) => {
        commit('SET_CREATE_PROFILE_ERRORS', errors);
    },
    setUpdateMySkillsErrors: ({ commit }, errors) => {
        commit('SET_UPDATE_MY_SKILLS_ERRORS', errors);
    },
    setUpdateMyVideoGalleryErrors: ({ commit }, errors) => {
        commit('SET_UPDATE_MY_VIDEO_GALLERY_ERRORS', errors);
    },
    setUpdateMyAwardsErrors: ({ commit }, errors) => {
        commit('SET_UPDATE_MY_AWARDS_ERRORS', errors);
    },
    setUpdateMyExperienceErrors: ({ commit }, errors) => {
        commit('SET_UPDATE_MY_EXPERIENCE_ERRORS', errors);
    },
    setUpdateMyEducationErrors: ({ commit }, errors) => {
        commit('SET_UPDATE_MY_EDUCATION_ERRORS', errors);
    },
    setUpdateSettingsErrors: ({ commit }, errors) => {
        commit('SET_UPDATE_SETTINGS_ERRORS', errors);
    },
    setDeleteMeErrors: ({ commit }, errors) => {
        commit('SET_DELETE_ME_ERRORS', errors);
    },
    setIsFinishRegistrationSuccessful: ({ commit }, value) => {
        commit('SET_IS_FINISH_REGISTRATION_SUCCESSFUL', value);
    },
    setMe: ({ commit }, value) => {
        commit('SET_ME', value);
        localStorage.setItem('me', JSON.stringify(value));
    },
    setMyProfile: ({ commit }, value) => {
        commit('SET_MY_PROFILE', value);
    },
    setCommunityMemberProfile: ({ commit }, value) => {
        commit('SET_COMMUNITY_MEMBER_PROFILE', value);
    },
    clearUsersData: ({ commit }) => {
        commit('CLEAR_USERS_DATA');
        localStorage.removeItem('me');
    },
    initiateEditSectionSession ({ commit, dispatch }) {
        commit('INITIATE_EDIT_SECTION_SESSION');
        dispatch('setMainOverlayVisibility', true, { root: true });
    },
    endEditSectionSession ({ commit, dispatch }) {
        commit('END_EDIT_SECTION_SESSION');
        dispatch('setMainOverlayVisibility', false, { root: true });
    }
};

export const getters = {
    me (state) {
        return state.me || JSON.parse(localStorage.getItem('me'));
    },
    myFullName (state, getters) {
        if (!getters.me || !getters.me.FirstName) {
            return '';
        }

        return `${getters.me.FirstName} ${getters.me.LastName}`;
    },
    myProfileImage (state, getters) {
        if (!getters.me || !getters.me.ProfileImage) {
            return '';
        }

        return getters.me.ProfileImage.ThumbnailLocation;
    },
    isManaged (state, getters) {
        if (!getters.me) {
            return false;
        }

        return getters.me.AccountStatus === UserAccountStatusType.Managed;
    },
    isRegistered (state, getters) {
        if (!getters.me) {
            return false;
        }

        return getters.me.AccountStatus === UserAccountStatusType.Registered;
    },
    isConfirmed (state, getters) {
        if (!getters.me) {
            return false;
        }

        return getters.me.AccountStatus === UserAccountStatusType.Confirmed;
    },
    isEnabled (state, getters) {
        if (!getters.me) {
            return false;
        }

        return getters.me.AccountStatus === UserAccountStatusType.Enabled;
    },
    isUser (state, getters) {
        if (!getters.me) {
            return false;
        }

        return getters.me.Role === UserRoleType.User;
    },
    isAdmin (state, getters) {
        if (!getters.me) {
            return false;
        }

        return getters.me.Role === UserRoleType.Admin || getters.me.Role === UserRoleType.SuperAdmin;
    },
    isSuperAdmin (state, getters) {
        if (!getters.me) {
            return false;
        }

        return getters.me.Role === UserRoleType.SuperAdmin;
    }

};

export const plugins = [
  vuexLocal.plugin
];
