import { UserService }  from '../api/services';
var jwtDecode           = require('jwt-decode');

export const state = () => ({
    me: {},
    myProfileImage: '',
    isFinishRegistrationSuccessful: false,
    signupErrors: [],
    forgotPasswordErrors: [],
    resetPasswordErrors: [],
    createProfileErrors: [],
    updateSettingsErrors: [],
    changePasswordErrors: [],
    deleteMeErrors: []
});

export const mutations = {
    SET_SIGNUP_ERRORS: (state, errors) => {
        state.signupErrors = errors;
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
    SET_UPDATE_SETTINGS_ERRORS: (state, errors) => {
        state.updateSettingsErrors = errors;
    },
    SET_DELETE_ME_ERRORS: (state, errors) => {
        state.deleteMeErrors = errors;
    },
    SET_ME: (state, value) => {
        state.me = { ...value };
    },
    SET_MY_PROFILE_IMAGE: (state, value) => {
        state.myProfileImage = value;
    },
    CLEAR_USERS_DATA: (state) => {
        state.me             = null;
        state.myProfileImage = '';
    }
};

export const actions = {
    async signup ({ commit, dispatch }, request) {
        await UserService.register(request).then(response => {
            dispatch('setSignupErrors', '');
        }).catch(error => {
            dispatch('setSignupErrors', error.response.data.errors);
        });
    },
    async finishRegistration ({ commit, dispatch }, request) {
        await UserService.finishRegistration(request).then(response => {
            dispatch('authentication/setToken', response.Token, { root: true });
            dispatch('setMe', jwtDecode(response.Token));
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
            dispatch('setMe', jwtDecode(response.Token));
            dispatch('setChangePasswordErrors', '');
        }).catch(error => {
            dispatch('setChangePasswordErrors', error.response.data.errors);
        });
    },
    async createProfile ({ commit, dispatch }, request) {
        await UserService.createProfile(request).then(response => {
            dispatch('setCreateProfileErrors', '');
            dispatch('setMyProfileImage', request.ProfileImage.Image);
        }).catch(error => {
            dispatch('setCreateProfileErrors', error.response.data.errors);
        });
    },
    async getSettings ({ commit, dispatch }, request) {
        return UserService.getSettings();
    },
    async updateSettings ({ commit, dispatch }, request) {
        await UserService.updateSettings(request).then(response => {
            dispatch('setUpdateSettingsErrors', '');
        }).catch(error => {
            dispatch('setUpdateSettingsErrors', error.response.data.errors);
        });
    },
    async deleteMe ({ commit, dispatch }, request) {
        await UserService.deleteMe().then(() => {
            dispatch('setDeleteMeErrors', '');
        }).catch(error => {
            dispatch('setDeleteMeErrors', error.response.data.errors);
        });
    },
    setSignupErrors: ({ commit }, errors) => {
        commit('SET_SIGNUP_ERRORS', errors);
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
    },
    setMyProfileImage: ({ commit }, value) => {
        commit('SET_MY_PROFILE_IMAGE', value);
        localStorage.setItem('myProfileImage', value);
    },
    clearUsersData: ({ commit }) => {
        commit('CLEAR_USERS_DATA');
        localStorage.removeItem('myProfileImage');
    }
};

export const getters = {
    me (state) {
        return localStorage.getItem('theaterHubToken') ? jwtDecode(localStorage.getItem('theaterHubToken')) : null;
    },
    myFullName (state, getters) {
        if (!getters.me) {
            return '';
        }

        return `${getters.me.firstName} ${getters.me.lastName}`;
    },
    myProfileImage (state) {
        return localStorage.getItem('myProfileImage') ? localStorage.getItem('myProfileImage') : null;
    }
};
