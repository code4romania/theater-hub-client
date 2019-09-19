import { AdministrationService } from '../api/services';

export const state = () => ({
    dashboardUsers: [],
    dashboardUsersTotal: 0,
    inviteUserErrors: [],
    enableUserErrors: [],
    disableUserErrors: [],
    deleteUserErrors: [],
    dashboardProjects: [],
    dashboardProjectsTotal: 0,
    enableProjectErrors: [],
    disableProjectErrors: [],
    deleteProjectErrors: [],
    isAdministrationEditing: false,
    isAdministrationAddingUser: false
});

export const mutations = {
    SET_DASHBOARD_USERS: (state, value) => {
        state.dashboardUsers = value;
    },
    SET_DASHBOARD_USERS_TOTAL: (state, value) => {
        state.dashboardUsersTotal = value;
    },
    SET_INVITE_USER_ERRORS: (state, errors) => {
        state.inviteUserErrors = errors;
    },
    SET_ENABLE_USER_ERRORS: (state, errors) => {
        state.enableUserErrors = errors;
    },
    SET_DISABLE_USER_ERRORS: (state, errors) => {
        state.disableUserErrors = errors;
    },
    SET_DELETE_USER_ERRORS: (state, errors) => {
        state.deleteUserErrors = errors;
    },
    SET_DASHBOARD_PROJECTS: (state, value) => {
        state.dashboardProjects = value;
    },
    SET_DASHBOARD_PROJECTS_TOTAL: (state, value) => {
        state.dashboardProjectsTotal = value;
    },
    SET_ENABLE_PROJECT_ERRORS: (state, errors) => {
        state.enableProjectErrors = errors;
    },
    SET_DISABLE_PROJECT_ERRORS: (state, errors) => {
        state.disableProjectErrors = errors;
    },
    SET_DELETE_PROJECT_ERRORS: (state, errors) => {
        state.deleteProjectErrors = errors;
    },
    INITIATE_ADMINISTRATION_EDIT_SESSION: (state) => {
        state.isAdministrationEditing = true;
    },
    END_ADMINISTRATION_EDIT_SESSION: (state) => {
        state.isAdministrationEditing = false;
    },
    INITIATE_ADMINISTRATION_INVITE_USER_SESSION: (state) => {
        state.isAdministrationAddingUser = true;
    },
    END_ADMINISTRATION_INVITE_USER_SESSION: (state) => {
        state.isAdministrationAddingUser = false;
    }
};

export const actions = {
    async inviteUser ({ commit, dispatch }, request) {
        await AdministrationService.inviteUser(request).then(response => {
            dispatch('setInviteUserErrors', '');
        }).catch(error => {
            dispatch('setInviteUserErrors', error.response.data.errors);
        });
    },
    async enableUser ({ commit, dispatch }, request) {
        await AdministrationService.enableUser(request.id, request.body).then(response => {
            dispatch('setEnableUserErrors', '');
        }).catch(error => {
            dispatch('setEnableUserErrors', error.response.data.errors);
        });
    },
    async disableUser ({ commit, dispatch }, request) {
        await AdministrationService.disableUser(request.id, request.body).then(response => {
            dispatch('setDisableUserErrors', '');
        }).catch(error => {
            dispatch('setDisableUserErrors', error.response.data.errors);
        });
    },
    async deleteUser ({ commit, dispatch }, request) {
        await AdministrationService.deleteUser(request.id, request.body).then(response => {
            dispatch('setDeleteUserErrors', '');
        }).catch(error => {
            dispatch('setDeleteUserErrors', error.response.data.errors);
        });
    },
    async getDashboardUsers ({ commit, dispatch }, query) {
        return AdministrationService.getUsers(query).then(response => {
            dispatch('setDashboardUsers', response.Data);
            dispatch('setDashboardUsersTotal', response.Total);
        });
    },
    async enableProject ({ commit, dispatch }, request) {
        await AdministrationService.enableProject(request.id, request.body).then(response => {
            dispatch('setEnableProjectErrors', '');
        }).catch(error => {
            dispatch('setEnableProjectErrors', error.response.data.errors);
        });
    },
    async disableProject ({ commit, dispatch }, request) {
        await AdministrationService.disableProject(request.id, request.body).then(response => {
            dispatch('setDisableProjectErrors', '');
        }).catch(error => {
            dispatch('setDisableProjectErrors', error.response.data.errors);
        });
    },
    async deleteProject ({ commit, dispatch }, request) {
        await AdministrationService.deleteProject(request.id, request.body).then(response => {
            dispatch('setDeleteProjectErrors', '');
        }).catch(error => {
            dispatch('setDeleteProjectErrors', error.response.data.errors);
        });
    },
    async getDashboardProjects ({ commit, dispatch }, query) {
        return AdministrationService.getProjects(query).then(response => {
            dispatch('setDashboardProjects', response.Data);
            dispatch('setDashboardProjectsTotal', response.Total);
        });
    },
    setDashboardUsers: ({ commit }, value) => {
        commit('SET_DASHBOARD_USERS', value);
    },
    setDashboardUsersTotal: ({ commit }, value) => {
        commit('SET_DASHBOARD_USERS_TOTAL', value);
    },
    setInviteUserErrors: ({ commit }, errors) => {
        commit('SET_INVITE_USER_ERRORS', errors);
    },
    setEnableUserErrors: ({ commit }, errors) => {
        commit('SET_ENABLE_USER_ERRORS', errors);
    },
    setDisableUserErrors: ({ commit }, errors) => {
        commit('SET_DISABLE_USER_ERRORS', errors);
    },
    setDeleteUserErrors: ({ commit }, errors) => {
        commit('SET_DELETE_USER_ERRORS', errors);
    },
    setDashboardProjects: ({ commit }, value) => {
        commit('SET_DASHBOARD_PROJECTS', value);
    },
    setDashboardProjectsTotal: ({ commit }, value) => {
        commit('SET_DASHBOARD_PROJECTS_TOTAL', value);
    },
    setEnableProjectErrors: ({ commit }, errors) => {
        commit('SET_ENABLE_PROJECT_ERRORS', errors);
    },
    setDisableProjectErrors: ({ commit }, errors) => {
        commit('SET_DISABLE_PROJECT_ERRORS', errors);
    },
    setDeleteProjectErrors: ({ commit }, errors) => {
        commit('SET_DELETE_PROJECT_ERRORS', errors);
    },
    initiateAdministrationEditSession ({ commit, dispatch }) {
        commit('INITIATE_ADMINISTRATION_EDIT_SESSION');
    },
    endAdministrationEditSession ({ commit, dispatch }) {
        commit('END_ADMINISTRATION_EDIT_SESSION');
    },
    initiateAdministrationInviteUserSession ({ commit, dispatch }) {
        commit('INITIATE_ADMINISTRATION_INVITE_USER_SESSION');
        dispatch('setMainOverlayVisibility', true, { root: true });
    },
    endAdministrationInviteUserSession ({ commit, dispatch }) {
        commit('END_ADMINISTRATION_INVITE_USER_SESSION');
        dispatch('setMainOverlayVisibility', false, { root: true });
    }
};
