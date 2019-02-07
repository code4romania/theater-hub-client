import { AdministrationService } from '../api/services';

export const state = () => ({
    dashboardUsers: [],
    dashboardUsersTotal: 0,
    addUserErrors: [],
    enableUserErrors: [],
    disableUserErrors: [],
    deleteUserErrors: [],
    isAdministrationEditing: false
});

export const mutations = {
    SET_DASHBOARD_USERS: (state, value) => {
        state.dashboardUsers = value;
    },
    SET_DASHBOARD_USERS_TOTAL: (state, value) => {
        state.dashboardUsersTotal = value;
    },
    SET_ADD_USER_ERRORS: (state, errors) => {
        state.addUserErrors = errors;
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
    INITIATE_ADMINISTRATION_EDIT_SESSION: (state) => {
        state.isAdministrationEditing = true;
    },
    END_ADMINISTRATION_EDIT_SESSION: (state) => {
        state.isAdministrationEditing = false;
    }
};

export const actions = {
    async addUser ({ commit, dispatch }, request) {
        await AdministrationService.addUser(request).then(response => {
            dispatch('setAddUserErrors', '');
        }).catch(error => {
            dispatch('setAddUserErrors', error.response.data.errors);
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
    setDashboardUsers: ({ commit }, value) => {
        commit('SET_DASHBOARD_USERS', value);
    },
    setDashboardUsersTotal: ({ commit }, value) => {
        commit('SET_DASHBOARD_USERS_TOTAL', value);
    },
    setAddUserErrors: ({ commit }, errors) => {
        commit('SET_ADD_USER_ERRORS', errors);
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
    initiateAdministrationEditSession ({ commit, dispatch }) {
        commit('INITIATE_ADMINISTRATION_EDIT_SESSION');
    },
    endAdministrationEditSession ({ commit, dispatch }) {
        commit('END_ADMINISTRATION_EDIT_SESSION');
    }
};

export const getters = {
    skills (state) {
        var skills = state.skills;

        if (skills.length === 0 && localStorage.getItem('skills')) {
            skills = JSON.parse(localStorage.getItem('skills'));
        }

        return skills;
    }
};
