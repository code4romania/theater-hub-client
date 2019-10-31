<template>
  <section class="users-dashboard">
    <v-container
        users-dashboard-container
        class="dashboard-container main-container extra-large"
    >
        <v-layout column>
            <v-flex>
                <h1 class="page-title mb-3">
                    {{ $t('pages.administration.users.title') }}
                </h1>
            </v-flex>

            <v-layout row wrap>

                <v-flex
                    v-if="!isInviteUser"
                    xs12 sm12 md8
                    mt-3>
                    <v-btn id="invite-user-button" class="primary" large @click="onInviteUserClick">
                        {{ $t('pages.administration.users.invite-user-button') }}
                    </v-btn>
                </v-flex>

                <v-flex
                    v-if="isInviteUser"
                    xs12 sm12 md8
                    mt-3
                    class="invite-user-card-container">
                    <v-layout row wrap elevation-5 pa-5>
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.administration.users.invite-user-title') }}</h2>
                            <div>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onConfirmInviteUserClick" :disabled="isConfirmInviteUserDisabled()"><v-icon>done</v-icon></v-btn>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelInviteUserClick"><v-icon>clear</v-icon></v-btn>
                            </div>
                        </v-flex>
                        <v-flex xs12 pt-3>
                            <v-form ref="inviteUserForm" v-model="isInviteUserFormValid">
                                <v-flex xs12>
                                    <v-text-field v-model="newUserEmail" :rules="emailRules"
                                            :label="`${$t('fields.email.label')}*`" validate-on-blur required></v-text-field>
                                </v-flex>
                                <v-layout row wrap class="section-visibility-row mt-4" v-if="isSuperAdmin">
                                    <v-flex xs2>
                                        <span class="field-title">{{ $t('pages.administration.users.user-role-label') }}</span>
                                    </v-flex>
                                    <v-flex xs10>
                                        <v-radio-group v-model="newUserRole" row class="ml-3 mt-0 pt-0">
                                            <v-radio :key="0" :value="0" :label="$t('application-data.user')"></v-radio>
                                            <v-radio :key="1" :value="1" :label="$t('application-data.admin')"></v-radio>
                                        </v-radio-group>
                                    </v-flex>
                                </v-layout>
                                <v-flex xs6>
                                    <ProfileLocaleSetting :localeSetting="newUserLocale"
                                                                    @updateLocaleSetting="updateLocaleSetting" />
                                </v-flex>
                                <v-flex xs12 v-if="administration.inviteUserErrors">
                                    <ServerSideErrors :errors="administration.inviteUserErrors"/>
                                </v-flex>
                            </v-form>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex
                    v-if="!isInviteUser"
                    xs12 sm12 md4
                    mt-3>
                    <v-text-field id="users-search-box"
                        v-model="searchTerm" append-icon="search" :label="$t('fields.search.admin.label')"
                        single-line hide-details @keyup="onSearchKeyup"></v-text-field>
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
                    :mobile-breakpoint="1200"
                    rows-per-page-text=""
                    :rows-per-page-items="[]"
                    :no-data-text="$t('pages.administration.users.no-search-results')"
                    :no-results-text="$t('pages.administration.users.no-matching-users')"
                    class="elevation-1">
                        <template slot="items" slot-scope="dashboard">
                            <tr
                                class="users-dashboard-row dashboard-row"
                                v-if="!isEditedUser(dashboard.item)"
                            >
                                <td>
                                    <v-avatar size="30px">
                                        <img :src="require('~/assets/images/default-avatar.svg')" v-if="!dashboard.item.ProfileImage" />
                                        <img :src="dashboard.item.ProfileImage" v-if="dashboard.item.ProfileImage" />
                                    </v-avatar>
                                </td>
                                <td class="text-xs-left">
                                    <span class="field-label">{{ $t('pages.administration.users.full-name-header') }}:</span>
                                    <nuxt-link
                                        :to="`/profile/${dashboard.item.Username}`"
                                        target="_blank">
                                        <span class="member-name">{{ `${dashboard.item.FirstName} ${dashboard.item.LastName}` }}</span>
                                    </nuxt-link>
                                </td>
                                <td class="text-xs-left">
                                    <span class="field-label">{{ $t('pages.administration.users.email-address-header') }}:</span>
                                    {{  dashboard.item.Email }}
                                </td>
                                <td class="text-xs-left">
                                    <span class="field-label">{{ $t('pages.administration.users.role-header') }}:</span>
                                    {{  getRoleElementText(dashboard.item.Role) }}
                                </td>
                                <td class="text-xs-left">
                                    <span class="field-label">{{ $t('pages.administration.users.account-status-header') }}:</span>
                                    {{  getAccountStatusElementText(dashboard.item.AccountStatus) }}
                                </td>
                                <td class="text-xs-left">
                                    <span class="field-label">{{ $t('pages.administration.users.account-source-header') }}:</span>
                                    {{  dashboard.item.AccountSource }}
                                </td>
                                <td class="text-xs-left">
				                    <span class="field-label">{{ $t('pages.administration.users.profile-visibility-header') }}:</span>
                                    {{  getPrivacyElementText(dashboard.item.ProfileVisibility) }}
                                </td>
                                <td class="text-xs-left">
                                    <v-layout>
                                        <v-flex xs12>
				                            <span class="field-label">{{ $t('pages.administration.users.actions-header') }}:</span>
                                            <v-btn
                                                v-if="showEnableUserButton(dashboard.item)"
                                                small
                                                id="enable-user-button" 
                                                class="dashboard-action-button primary"
                                                @click="onEnableUserClick($event, dashboard.item)"
                                            >
                                                {{ $t('pages.administration.users.enable-user-button') }}            
                                            </v-btn>
                                            <v-btn
                                                 v-if="showDisabledUserButton(dashboard.item)"
                                                 small
                                                 id="disable-user-button"
                                                 class="dashboard-action-button primary"
                                                @click="onDisableUserClick($event, dashboard.item)"
                                            >
                                                {{ $t('pages.administration.users.disable-user-button') }}
                                            </v-btn>
                                            <v-btn
                                                small
                                                id="delete-user-button"
                                                class="dashboard-action-button"
                                                @click="onDeleteUserClick($event, dashboard.item)"
                                            >
                                                {{ $t('pages.administration.users.delete-user-button') }}
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </td>
                            </tr>
                            <tr
                                v-if="dashboard.item.isEnabling"
                                class="edited-dashboard-user highlighted-section"
                            >
                                <td colspan="6" text-xs-left>
                                    <div class="user-action-content">
                                         {{ $t('pages.administration.users.enable-user-message').replace("{0}", `${dashboard.item.FirstName} ${dashboard.item.LastName}`) }}
                                    </div>
                                    <div class="user-action-content">
                                        <v-textarea
                                            id="text-area-field"
                                            v-model="actionMessage"
                                            auto-grow box
                                            :label="$t('fields.optional-user-message.label')" rows="1" counter=500 :rules="messageRules" validate-on-blur>
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
                            <tr
                                v-if="dashboard.item.isDisabling"
                                class="edited-dashboard-user highlighted-section"
                            >
                                <td colspan="6" text-xs-left>
                                    <div class="user-action-content">
                                        {{ $t('pages.administration.users.disable-user-message').replace("{0}", `${dashboard.item.FirstName} ${dashboard.item.LastName}`) }}
                                    </div>
                                    <div class="user-action-content">
                                        <v-textarea
                                            id="text-area-field"
                                            v-model="actionMessage"
                                            auto-grow box
                                            :label="$t('fields.optional-user-message.label')" rows="1" counter=500 :rules="messageRules" validate-on-blur>
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
                            <tr
                                v-if="dashboard.item.isDeleting"
                                class="edited-dashboard-user highlighted-section"
                            >
                                <td colspan="6" text-xs-left>
                                    <div class="user-action-content">
                                        {{ $t('pages.administration.users.delete-user-message').replace("{0}", `${dashboard.item.FirstName} ${dashboard.item.LastName}`) }}
                                    </div>
                                    <div class="user-action-content">
                                        <v-textarea
                                            id="text-area-field"
                                            v-model="actionMessage"
                                            auto-grow box
                                            :label="$t('fields.optional-user-message.label')" rows="1" counter=500 :rules="messageRules" validate-on-blur>
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
    <v-snackbar
        v-model="snackbar"
        :timeout="3000">
            {{ snackbarText }}
            <v-btn color="blue" flat @click="snackbar = false">{{ $t('shared.content.close') }}</v-btn>
    </v-snackbar>
  </section>
</template>

<script>
    import _ from 'lodash';
    import { mapGetters, mapState } from 'vuex';
    import { UserAccountProviderType, UserAccountStatusType, UserRoleType, VisibilityType, UserSortCriterion } from '~/store/entities';
    import { HtmlHelpers, Validators } from '~/utils';
    import ProfileLocaleSetting from '~/components/profile/profile-locale-setting.vue';
    import ServerSideErrors from '~/components/errors/server-side-errors.vue';

    export default {
        components: {
            ProfileLocaleSetting,
            ServerSideErrors
        },
        layout: 'administration',
        middleware: ['authenticated', 'admin'],
        data: function () {
            return {
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
                    { text: this.$t('pages.administration.users.full-name-header'), value: 'Name' },
                    { text: this.$t('pages.administration.users.email-address-header'), value: 'Email' },
                    { text: this.$t('pages.administration.users.role-header'), value: 'Role' },
                    { text: this.$t('pages.administration.users.account-status-header'), value: 'AccountStatus' },
                    { text: this.$t('pages.administration.users.account-source-header'), value: 'AccountSource' },
                    { text: this.$t('pages.administration.users.profile-visibility-header'), value: 'ProfileVisibility' },
                    { text: this.$t('pages.administration.users.actions-header'), value: 'Actions', sortable: false }
                ],
                searchTerm: '',
                newUserEmail: '',
                newUserRole: 0,
                newUserLocale: this.$store.state.locale,
                editedUser: null,
                actionMessage: '',
                emailRules: [
                    v => !!v || this.$t('fields.email.validation-errors.required'),
                    v => v.length <= 100 || this.$t('fields.email.validation-errors.length'),
                    v => Validators.isValidEmailAddress(v) || this.$t('fields.email.validation-errors.invalid')
                ],
                messageRules: [
                    v => !v || v.length <= 500 || this.$t('fields.optional-user-message.validation-errors.length')
                ],
                roles: ['User', 'Admin'],
                snackbar: false,
                snackbarText: ''
            };
        },
        watch: {
            dashboardUsersTablePagination: {
                handler () {
                    this.updateUsersDashboardTable();
                }
            }
        },
        mounted () {
            this.$store.dispatch('administration/endAdministrationInviteUserSession');

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
                    Role: this.newUserRole,
                    Locale: this.newUserLocale
                };

                await this.$store.dispatch('administration/inviteUser', request);

                if (!this.administration.inviteUserErrors) {
                    this.snackbarText = this.$t('pages.administration.users.snackbar-messages.invite-user');
                    this.snackbar = true;

                    this.isInviteUser = false;
                    this.$store.dispatch('administration/endAdministrationInviteUserSession');

                    this.updateUsersDashboardTable();
                }
            },
            onCancelInviteUserClick: function () {
                this.isInviteUser = false;
                this.$store.dispatch('administration/endAdministrationInviteUserSession');
            },
            updateLocaleSetting: function (model) {
                this.newUserLocale = model;
            },
            async updateUsersDashboardTable () {
                const { sortBy, descending, page } = this.dashboardUsersTablePagination;

                var requestQuery = {
                    searchTerm: this.searchTerm,
                    sortCriterion: UserSortCriterion[sortBy],
                    sortOrientation: descending ? 'DESC' : 'ASC',
                    page: page - 1,
                    pageSize: 10
                };

                await this.$store.dispatch('administration/getDashboardUsers', requestQuery);

                this.dashboardUsers = this.$store.state.administration.dashboardUsers.map(u => {
                    return {
                        ...u,
                        AccountSource: this.getAccountSource(u),
                        isEnabling: false,
                        isDisabling: false,
                        isDeleting: false
                    };
                });
                this.dashboardUsersTotal = this.$store.state.administration.dashboardUsersTotal;
            },
            onSearchKeyup: _.throttle(function () {
                this.updateUsersDashboardTable();
            }, 1000),
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

                await this.$store.dispatch('administration/enableUser', request).then(() => {
                    if (!this.administration.enableUserErrors) {
                        this.snackbarText = this.$t('pages.administration.users.snackbar-messages.enable-user');
                        this.snackbar = true;
                    }
                });

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

                await this.$store.dispatch('administration/disableUser', request).then(() => {
                    if (!this.administration.disableUserErrors) {
                        this.snackbarText = this.$t('pages.administration.users.snackbar-messages.disable-user');
                        this.snackbar = true;
                    }
                });

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

                await this.$store.dispatch('administration/deleteUser', request).then(() => {
                    if (!this.administration.deleteUserErrors) {
                        this.snackbarText = this.$t('pages.administration.users.snackbar-messages.delete-user');
                        this.snackbar = true;
                    }
                });

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
                return this.$t(`application-data.${(_.invert(UserRoleType))[value].toLowerCase()}`);
            },
            getAccountStatusElementText: function (value) {
                return this.$t(`application-data.${(_.invert(UserAccountStatusType))[value].toLowerCase()}`);
            },
            getPrivacyElementText: function (value) {
                return this.$t(`application-data.${(_.invert(VisibilityType))[value].toLowerCase()}`);
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
            },
            getAccountSource: function (user) {
                if (user.InviterEmail) {
                    return `${this.$t('pages.administration.users.invited-by')} ${user.InviterEmail}`;
                }

                return this.$t(`application-data.${((_.invert(UserAccountProviderType))[user.AccountProvider]).toLowerCase()}`);
            }
        }
    }

</script>

<style lang="scss">

    #invite-user-button {
        margin-left: 0px;
    }

    #users-search-box {
        width: 400px;
    }

    .dashboard-action-button {
        margin-left: 0px;
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
