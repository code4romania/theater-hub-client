import { UserService }  from '../api/services';
var jwtDecode           = require('jwt-decode');

export const state = () => ({
    me: {},
    myProfileImage: '',
    isFinishRegistrationSuccessful: false,
    signupErrors: [],
    forgotPasswordErrors: [],
    resetPasswordErrors: [],
    createProfileErrors: []
});

export const mutations = {
    UPDATE_SIGNUP_ERRORS: (state, errors) => {
        state.signupErrors = errors;
    },
    UPDATE_FORGOT_PASSWORD_ERRORS: (state, errors) => {
        state.forgotPasswordErrors = errors;
    },
    UPDATE_RESET_PASSWORD_ERRORS: (state, errors) => {
        state.resetPasswordErrors = errors;
    },
    UPDATE_IS_FINISH_REGISTRATION_SUCCESSFUL: (state, value) => {
        state.isFinishRegistrationSuccessful = value;
    },
    UPDATE_CREATE_PROFILE_ERRORS: (state, errors) => {
        state.createProfileErrors = errors;
    },
    SET_ME: (state, value) => {
        state.me = { ...value };
    },
    SET_MY_PROFILE_IMAGE: (state, value) => {
        state.myProfileImage = value;
    }
};

export const actions = {
    async signup ({ commit, dispatch }, request) {
        await UserService.register(request).then(response => {
            dispatch('updateSignupErrors', '');
        }).catch(error => {
            dispatch('updateSignupErrors', error.response.data.errors);
        });
    },
    async finishRegistration ({ commit, dispatch }, request) {
        await UserService.finishRegistration(request).then(response => {
            dispatch('authentication/setToken', response.Token, { root: true });
            dispatch('setMe', jwtDecode(response.Token));
            dispatch('updateIsFinishRegistrationSuccessful', true);
        }).catch(() => {
            dispatch('updateIsFinishRegistrationSuccessful', false);
        });
    },
    async forgotPassword ({ commit, dispatch }, request) {
        await UserService.forgotPassword(request).then(response => {
            dispatch('updateForgotPasswordErrors', '');
        }).catch(error => {
            dispatch('updateForgotPasswordErrors', error.response.data.errors);
        });
    },
    async resetPassword ({ commit, dispatch }, request) {
        await UserService.resetPassword(request).then(response => {
            dispatch('updateResetPasswordErrors', '');
        }).catch(error => {
            dispatch('updateResetPasswordErrors', error.response.data.errors);
        });
    },
    async createProfile ({ commit, dispatch }, request) {
        await UserService.createProfile(request).then(response => {
            dispatch('updateCreateProfileErrors', '');
            dispatch('setMyProfileImage', request.ProfileImage.Image);
        }).catch(error => {
            dispatch('updateCreateProfileErrors', error.response.data.errors);
        });
    },
    updateSignupErrors: ({ commit }, errors) => {
        commit('UPDATE_SIGNUP_ERRORS', errors);
    },
    updateForgotPasswordErrors: ({ commit }, errors) => {
        commit('UPDATE_FORGOT_PASSWORD_ERRORS', errors);
    },
    updateResetPasswordErrors: ({ commit }, errors) => {
        commit('UPDATE_RESET_PASSWORD_ERRORS', errors);
    },
    updateCreateProfileErrors: ({ commit }, errors) => {
        commit('UPDATE_CREATE_PROFILE_ERRORS', errors);
    },
    updateIsFinishRegistrationSuccessful: ({ commit }, value) => {
        commit('UPDATE_IS_FINISH_REGISTRATION_SUCCESSFUL', value);
    },
    setMe: ({ commit }, value) => {
        commit('SET_ME', value);
    },
    setMyProfileImage: ({ commit }, value) => {
        commit('SET_MY_PROFILE_IMAGE', value);
        localStorage.setItem('myProfileImage', value);
    }
};

export const getters = {
    me (state) {
        return localStorage.getItem('theaterHubToken') ? jwtDecode(localStorage.getItem('theaterHubToken')) : null;
    },
    myFullName (state) {
        if (!state.me) {
            return '';
        }

        return `${state.me.firstName} ${state.me.lastName}`;
    },
    myProfileImage (state) {
        return localStorage.getItem('myProfileImage') ? localStorage.getItem('myProfileImage') : null;
    }
};
