<template>
  <section class="users-dashboard">
    <v-container fluid users-dashboard-container class="mt-5 pa-5">
        <v-layout column wrap>
            <v-flex>
                <h1 class="mb-3">Users dashboard</h1>
            </v-flex>

            <v-layout mt-3>

                <v-flex xs12 sm12 md8 v-if="!isInviteUser">
                    <v-btn id="invite-user-button" class="primary" large @click="onInviteUserClick">INVITE USER</v-btn>
                </v-flex>

                <v-flex xs12 v-if="isInviteUser" class="invite-user-card-container">
                    <v-layout row wrap elevation-5 pa-5>
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>Invite User</h2>
                            <div>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onConfirmInviteUserClick" :disabled="isConfirmInviteUserDisabled()"><v-icon>done</v-icon></v-btn>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelInviteUserClick"><v-icon>clear</v-icon></v-btn>
                            </div>
                        </v-flex>
                        <v-flex xs12 pt-3>
                            <v-form ref="inviteUserForm" v-model="isInviteUserFormValid">
                                <v-flex xs12>
                                    <v-text-field v-model="newUserEmail" :rules="emailRules" label="Email*" validate-on-blur required></v-text-field>
                                </v-flex>
                                <v-layout row wrap class="section-visibility-row mt-4" v-if="isSuperAdmin">
                                    <v-flex xs1>
                                        <span class="field-title">User role:</span>
                                    </v-flex>
                                    <v-flex xs11>
                                        <v-radio-group v-model="newUserRole" row class="ml-3 mt-0 pt-0">
                                            <v-radio :key="0" :value="0" :label="`User`"></v-radio>
                                            <v-radio :key="1" :value="1" :label="`Admin`"></v-radio>
                                        </v-radio-group>
                                    </v-flex>
                                </v-layout>
                                <v-flex xs12 v-if="administration.inviteUserErrors">
                                    <ServerSideErrors :errors="administration.inviteUserErrors"/>
                                </v-flex>
                            </v-form>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 sm12 md4 v-if="!isInviteUser">
                    <v-text-field id="users-search-box"
                        v-model="searchTerm" append-icon="search" label="Search..." single-line hide-details @keyup="onSearchKeyup"></v-text-field>
                </v-flex>

            </v-layout>

            <v-flex xs12 mt-5>
                <v-data-table
                    must-sort
                    :headers="headers"
                    :items="dashboardUsers"
                    :pagination.sync="dashboardUsersTablePagination"
                    :total-items="dashboardUsersTotal"
                    :loading="isLoading"
                    rows-per-page-text=""
                    :rows-per-page-items="[]"
                    no-data-text="No results"
                    no-results-text="No users matching your criteria"
                    class="elevation-1">
                        <template slot="items" slot-scope="dashboard">
                            <tr class="users-dashboard-row" @click="onDashboardUserClick(dashboard.item)" v-if="!isEditedUser(dashboard.item)">
                                <td>
                                    <v-avatar size="30px">
                                        <img :src="require('~/assets/images/default-avatar.svg')" v-if="!dashboard.item.ProfileImage" />
                                        <img :src="`data:image/png;base64,${dashboard.item.ProfileImage}`" v-if="dashboard.item.ProfileImage" />
                                    </v-avatar>
                                </td>
                                <td class="text-xs-left">{{ `${dashboard.item.FirstName} ${dashboard.item.LastName}` }}</td>
                                <td class="text-xs-left">{{  dashboard.item.Email }}</td>
                                <td class="text-xs-left">{{  getRoleElementText(dashboard.item.Role) }}</td>
                                <td class="text-xs-left">{{  getAccountStatusElementText(dashboard.item.AccountStatus) }}</td>
                                <td class="text-xs-left">{{  getPrivacyElementText(dashboard.item.ProfileVisibility) }}</td>
                                <td class="text-xs-left">
                                    <v-layout>
                                        <v-flex xs12 md6 lg4>
                                            <v-btn id="enable-user-button" small class="dashboard-action-button primary"
                                                        @click="onEnableUserClick($event, dashboard.item)" v-if="showEnableUserButton(dashboard.item)">ENABLE</v-btn>
                                            <v-btn id="disable-user-button" small class="dashboard-action-button primary"
                                                        @click="onDisableUserClick($event, dashboard.item)" v-if="showDisabledUserButton(dashboard.item)">DISABLE</v-btn>
                                        </v-flex>
                                        <v-flex xs12 md6 lg4>
                                            <v-btn id="delete-user-button" small class="dashboard-action-button"
                                                        @click="onDeleteUserClick($event, dashboard.item)">DELETE</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </td>
                            </tr>
                            <tr v-if="dashboard.item.isEnabling" class="edited-dashboard-user">
                                <td colspan="6" text-xs-left>
                                    <div class="user-action-content">
                                        Are you sure you wish to enable {{ `${dashboard.item.FirstName} ${dashboard.item.LastName}` }}'s account? Please provide a reason to the user:
                                    </div>
                                    <div class="user-action-content">
                                        <v-textarea
                                            id="text-area-field"
                                            v-model="actionMessage"
                                            auto-grow box
                                            label="Optional message for user" rows="1" counter=500 :rules="messageRules" validate-on-blur>
                                        </v-textarea>
                                    </div>
                                </td>
                                <td class="text-xs-left">
                                    <v-layout>
                                        <v-flex xs12 md6 lg4>
                                            <v-btn outline small fab class="confirm-enable-user-button"
                                                    v-on:click="onConfirmEnableUserClick(dashboard.item)" :disabled="isConfirmButtonDisabled()">
                                                <v-icon>done</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <v-flex xs12 md6 lg4>
                                            <v-btn outline small fab class="cancel-enable-user-button" v-on:click="onCancelEnableUserClick(dashboard.item)">
                                                <v-icon>clear</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </td>
                            </tr>
                            <tr v-if="dashboard.item.isDisabling" class="edited-dashboard-user">
                                <td colspan="6" text-xs-left>
                                    <div class="user-action-content">
                                        Are you sure you wish to disable {{ `${dashboard.item.FirstName} ${dashboard.item.LastName}` }}'s account? Please provide a reason to the user:
                                    </div>
                                    <div class="user-action-content">
                                        <v-textarea
                                            id="text-area-field"
                                            v-model="actionMessage"
                                            auto-grow box
                                            label="Optional message for user" rows="1" counter=500 :rules="messageRules" validate-on-blur>
                                        </v-textarea>
                                    </div>
                                </td>
                                <td class="text-xs-left">
                                    <v-layout>
                                        <v-flex xs12 md6 lg4>
                                            <v-btn outline small fab class="confirm-disable-user-button"
                                                v-on:click="onConfirmDisableUserClick(dashboard.item)" :disabled="isConfirmButtonDisabled()">
                                                <v-icon>done</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <v-flex xs12 md6 lg4>
                                            <v-btn outline small fab class="cancel-disable-user-button" v-on:click="onCancelDisableUserClick(dashboard.item)">
                                                <v-icon>clear</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </td>
                            </tr>
                            <tr v-if="dashboard.item.isDeleting" class="edited-dashboard-user">
                                <td colspan="6" text-xs-left>
                                    <div class="user-action-content">
                                        Are you sure you wish to delete {{ `${dashboard.item.FirstName} ${dashboard.item.LastName}` }}'s account? Please provide a reason to the user:
                                    </div>
                                    <div class="user-action-content">
                                        <v-textarea
                                            id="text-area-field"
                                            v-model="actionMessage"
                                            auto-grow box
                                            label="Optional message for user" rows="1" counter=500 :rules="messageRules" validate-on-blur>
                                        </v-textarea>
                                    </div>
                                </td>
                                <td class="text-xs-left">
                                    <v-layout>
                                        <v-flex xs12 md6 lg4>
                                            <v-btn outline small fab class="confirm-delete-user-button"
                                                    v-on:click="onConfirmDeleteUserClick(dashboard.item)" :disabled="isConfirmButtonDisabled()">
                                                <v-icon>done</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <v-flex xs12 md6 lg4>
                                            <v-btn outline small fab class="cancel-delete-user-button" v-on:click="onCancelDeleteUserClick(dashboard.item)">
                                                <v-icon>clear</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </td>
                            </tr>
                        </template>
                </v-data-table>
            </v-flex>

        </v-layout>
    </v-container>
  </section>
</template>

<script>
    import _ from 'lodash';
    import { mapGetters, mapState } from 'vuex';
    import { UserAccountStatusType, UserRoleType, VisibilityType } from '~/store/entities';
    import { HtmlHelpers, Validators } from '~/utils';
    import ServerSideErrors from '~/components/errors/server-side-errors.vue';

    export default {
        components: {
            ServerSideErrors
        },
        layout: 'administration',
        middleware: ['authenticated', 'admin'],
        data: () => ({
            isLoading: false,
            isInviteUser: false,
            isInviteUserFormValid: false,
            dashboardUsers: [],
            dashboardUsersTotal: 0,
            dashboardUsersTablePagination: {
                rowsPerPage: 10
            },
            headers: [
                { text: '', value: '', sortable: false },
                { text: 'Full name', value: 'Name' },
                { text: 'Email address', value: 'Email' },
                { text: 'Role', value: 'Role' },
                { text: 'Account status', value: 'AccountStatus' },
                { text: 'Profile visibility', value: 'ProfileVisibility' },
                { text: 'Actions', value: 'Actions', sortable: false }
            ],
            searchTerm: '',
            newUserEmail: '',
            newUserRole: 0,
            editedUser: null,
            actionMessage: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => v.length <= 100 || 'E-mail should have at most 100 characters',
                v => Validators.isValidEmailAddress(v) || 'E-mail must be valid'
            ],
            messageRules: [
                v => !v || v.length <= 500 || 'Message must not exceed 500 characters'
            ],
            roles: ['User', 'Admin']
        }),
        watch: {
            dashboardUsersTablePagination: {
                handler () {
                    this.updateUsersDashboardTable();
                }
            }
        },
        mounted () {
            this.updateUsersDashboardTable();

            window.onscroll = _.throttle(() => {
                if (this.isInviteUser) {
                    this.$store.dispatch('syncMainOverlaySize');
                }
            }, 100);
        },
        computed: {
            ...mapState(['administration', 'user']),
            ...mapGetters({
                isSuperAdmin: 'users/isSuperAdmin'
            })
        },
        methods: {
            onInviteUserClick: function () {
                this.$store.dispatch('administration/setInviteUserErrors', '');
                this.newUserEmail   = '';
                this.newUserRole    = UserRoleType.User;
                this.isInviteUser = true;
                this.$store.dispatch('administration/initiateAdministrationInviteUserSession');

                setTimeout(() => {
                    var element = document.getElementsByClassName('invite-user-card-container')[0];

                    if (!HtmlHelpers.isVerticallyFullyInViewport(element)) {
                        HtmlHelpers.scrollToElement(element);
                    }
                }, 0);
            },
            async onConfirmInviteUserClick () {
                var request  = {
                    Email: this.newUserEmail,
                    Role: this.newUserRole
                };

                await this.$store.dispatch('administration/inviteUser', request);

                if (!this.administration.inviteUserErrors) {
                    this.isInviteUser = false;
                    this.$store.dispatch('administration/endAdministrationInviteUserSession');

                    this.updateUsersDashboardTable();
                }
            },
            onCancelInviteUserClick: function () {
                this.isInviteUser = false;
                this.$store.dispatch('administration/endAdministrationInviteUserSession');
            },
            async updateUsersDashboardTable () {
                const { sortBy, descending, page } = this.dashboardUsersTablePagination;

                var requestQuery = {
                    searchTerm: this.searchTerm,
                    sortCriterion: sortBy,
                    sortOrientation: descending ? 'DESC' : 'ASC',
                    page: page - 1,
                    pageSize: 10
                };

                await this.$store.dispatch('administration/getDashboardUsers', requestQuery);

                this.dashboardUsers = this.$store.state.administration.dashboardUsers.map(u => {
                    return {
                        ...u,
                        isEnabling: false,
                        isDisabling: false,
                        isDeleting: false
                    };
                });
                this.dashboardUsersTotal = this.$store.state.administration.dashboardUsersTotal;
            },
            onSearchKeyup: function (event) {
                this.updateUsersDashboardTable();
            },
            onDashboardUserClick: function (user) {
                window.open(`/profile/${user.ID}`, '_blank')
            },
            onEnableUserClick: function (event, user) {
                event.preventDefault();
                event.stopPropagation();
                this.cancelUserEditMode(this.editedUser);
                this.actionMessage = '';

                this.$store.dispatch('administration/initiateAdministrationEditSession');
                user.isEnabling = true;
                this.editedUser = user;
            },
            onDisableUserClick: function (event, user) {
                event.preventDefault();
                event.stopPropagation();
                this.cancelUserEditMode(this.editedUser);
                this.actionMessage = '';

                this.$store.dispatch('administration/initiateAdministrationEditSession');
                user.isDisabling = true;
                this.editedUser = user;
            },
            onDeleteUserClick: function (event, user) {
                event.preventDefault();
                event.stopPropagation();
                this.cancelUserEditMode(this.editedUser);
                this.actionMessage = '';

                this.$store.dispatch('administration/initiateAdministrationEditSession');
                user.isDeleting = true;
                this.editedUser = user;
            },
            async onConfirmEnableUserClick (user) {
                var request  = {
                    id: user.ID,
                    body: {
                        Message: this.actionMessage
                    }
                };

                await this.$store.dispatch('administration/enableUser', request);

                this.$store.dispatch('administration/endAdministrationEditSession');
                this.editedUser = null;

                this.updateUsersDashboardTable();
            },
            onCancelEnableUserClick: function (user) {
                this.$store.dispatch('administration/endAdministrationEditSession');
                user.isEnabling = false;
                this.editedUser = null;
            },
            async onConfirmDisableUserClick (user) {
                var request  = {
                    id: user.ID,
                    body: {
                        Message: this.actionMessage
                    }
                };

                await this.$store.dispatch('administration/disableUser', request);

                this.$store.dispatch('administration/endAdministrationEditSession');
                this.editedUser = null;

                this.updateUsersDashboardTable();
            },
            onCancelDisableUserClick: function (user) {
                this.$store.dispatch('administration/endAdministrationEditSession');
                user.isDisabling = false;
                this.editedUser = null;
            },
            async onConfirmDeleteUserClick (user) {
                var request  = {
                    id: user.ID,
                    body: {
                        Message: this.actionMessage
                    }
                };

                await this.$store.dispatch('administration/deleteUser', request);

                this.$store.dispatch('administration/endAdministrationEditSession');
                this.editedUser = null;

                this.updateUsersDashboardTable();
            },
            onCancelDeleteUserClick: function (user) {
                this.$store.dispatch('administration/endAdministrationEditSession');
                user.isDeleting = false;
                this.editedUser = null;
            },
            getRoleElementText: function (value) {
                return (_.invert(UserRoleType))[value];
            },
            getAccountStatusElementText: function (value) {
                return (_.invert(UserAccountStatusType))[value];
            },
            getPrivacyElementText: function (value) {
                return (_.invert(VisibilityType))[value];
            },
            showEnableUserButton: function (user) {
                return user.AccountStatus === UserAccountStatusType.Disabled;
            },
            showDisabledUserButton: function (user) {
                return user.AccountStatus === UserAccountStatusType.Enabled;
            },
            cancelUserEditMode: function (user) {
                if (!user) {
                    return;
                }

                user.isEnabling  = false;
                user.isDisabling = false;
                user.isDeleting  = false;
            },
            isEditedUser: function (user) {
                return user.isEnabling || user.isDisabling || user.isDeleting;
            },
            isConfirmButtonDisabled: function () {
                return this.actionMessage.length > 500;
            },
            isConfirmInviteUserDisabled: function () {
                return !this.newUserEmail || this.newUserEmail.length > 100 || !Validators.isValidEmailAddress(this.newUserEmail);
            }
        }
    }

</script>

<style lang="scss">

    #users-search-box {
        width: 400px;
    }

    .users-dashboard-row {
        cursor: pointer;
    }

    .dashboard-action-button {
        color: #FFF;
    }

    #delete-user-button {
        background-color: #F00;
        color: #FFF;
    }

    .user-action-content {
        text-align: left;
        font-size: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .edited-dashboard-user {
        height: 100px;
    }

    .invite-user-card-container {
        z-index: 200;

        &>div {
            background-color: #FFF;
            border-radius: 10px;
        }
    }

</style>
