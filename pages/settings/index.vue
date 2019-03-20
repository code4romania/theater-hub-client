<template>
  <section class="settings-section">
    <v-container id="settings-container" class="main-container pa-5">
        <v-layout row wrap>

            <v-flex xs12 v-if="!isEditingSettings">
                <v-layout row wrap class="profile-information-group">
                    <v-flex xs12 mb-3 class="profile-information-group-header">
                        <h2>{{ $t('pages.settings.title') }}</h2>
                        <v-btn outline small fab class="mt-0" v-on:click="onEditSettingsClick"><v-icon>edit</v-icon></v-btn>
                    </v-flex>
                    <v-flex xs12 class="setings-row" v-if="isUser && isEnabled">
                        <v-flex xs4>
                            <span class="field-title">{{ $t('shared.content.profile-visibility') }}</span>
                        </v-flex>
                        <v-flex xs8>
                            <span>{{ getPrivacyElementText(this.profilePrivacy.profileVisibility)  }}</span>
                        </v-flex>
                    </v-flex>
                    <v-flex xs12 class="setings-row" v-if="isUser && isEnabled">
                        <v-flex xs4>
                            <span class="field-title">{{ $t('shared.content.email-visibility') }}</span>
                        </v-flex>
                        <v-flex xs8>
                            <span>{{ getPrivacyElementText(this.profilePrivacy.emailVisibility)  }}</span>
                        </v-flex>
                    </v-flex>
                    <v-flex xs12 class="setings-row" v-if="isUser && isEnabled">
                        <v-flex xs4>
                            <span class="field-title">{{ $t('shared.content.birth-date-visibility') }}</span>
                        </v-flex>
                        <v-flex xs8>
                            <span>{{ getPrivacyElementText(this.profilePrivacy.birthDateVisibility)  }}</span>
                        </v-flex>
                    </v-flex>
                    <v-flex xs12 class="setings-row" v-if="isUser && isEnabled">
                        <v-flex xs4>
                            <span class="field-title">{{ $t('shared.content.phone-number-visibility') }}</span>
                        </v-flex>
                        <v-flex xs8>
                            <span>{{ getPrivacyElementText(this.profilePrivacy.phoneNumberVisibility)  }}</span>
                        </v-flex>
                    </v-flex>
                    <v-flex xs12 class="setings-row">
                        <v-flex xs4>
                            <span class="field-title">{{ $t('shared.content.locale-setting') }}</span>
                        </v-flex>
                        <v-flex xs8>
                            <span>{{ $t(`application-data.${localeName.toLowerCase()}`)  }}</span>
                        </v-flex>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 v-if="isEditingSettings">
               <v-layout row wrap elevation-5 pa-5>
                    <v-flex xs12 class="profile-information-group-header">
                        <h2>{{ $t('pages.settings.edit-settings-title') }}</h2>
                        <div>
                            <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditSettingsClick"><v-icon>done</v-icon></v-btn>
                            <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditSettingsClick"><v-icon>clear</v-icon></v-btn>
                        </div>
                    </v-flex>
                    <v-flex xs12>
                        <ProfilePrivacy v-if="isUser && isEnabled"
                                :profilePrivacy="editedProfilePrivacy" @updateProfilePrivacy="updateProfilePrivacy"/>

                        <ProfileLocaleSetting :localeSetting="editedLocaleSetting" @updateLocaleSetting="updateLocaleSetting" />

                        <v-flex v-if="users.updateSettingsErrors">
                            <ServerSideErrors :errors="users.updateSettingsErrors"/>
                        </v-flex>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 py-4>
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 v-if="!isChangingPassword">
                <v-btn id="change-password-button" class="primary settings-section-button" large @click="onChangePasswordClick">{{ $t('pages.settings.change-password-button') }}</v-btn>
            </v-flex>

            <v-flex xs12 v-if="isChangingPassword">
               <v-layout row wrap elevation-5 pa-5>
                    <v-flex xs12 class="profile-information-group-header">
                        <h2>{{ $t('pages.settings.change-password-title') }}</h2>
                        <div>
                            <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onConfirmChangePasswordClick"><v-icon>done</v-icon></v-btn>
                            <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelChangePasswordClick"><v-icon>clear</v-icon></v-btn>
                        </div>
                    </v-flex>
                    <v-flex xs12 pt-3>
                        <v-form ref="changePasswordForm" v-model="isChangePasswordFormValid">
                            <v-flex xs12>
                                <v-text-field v-model="password"     :rules="passwordRules"
                                            :label="`${$t('fields.password.label')}*`" validate-on-blur required type="password"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="newPassword"  :rules="passwordRules"
                                        :label="`${$t('fields.new-password.label')}*`" validate-on-blur required type="password"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="confirmNewPassword" :rules="validateConfirmNewPassword()"
                                            :label="`${$t('fields.confirm-password.label')}*`" validate-on-blur required type="password"></v-text-field>
                            </v-flex>
                            <v-flex xs12 v-if="users.changePasswordErrors">
                                <ServerSideErrors :errors="users.changePasswordErrors"/>
                            </v-flex>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 py-4>
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 v-if="!isDeletingAccount">
                <v-btn id="delete-account-button" large @click="onDeleteAccountClick" class="settings-section-button">{{ $t('pages.settings.delete-account-button') }}</v-btn>
            </v-flex>

            <v-flex xs12 v-if="isDeletingAccount">
               <v-layout row wrap elevation-5 pa-5>
                    <v-flex xs12 class="profile-information-group-header">
                        <h2>{{ $t('pages.settings.delete-account-title') }}</h2>
                        <div>
                            <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onConfirmDeleteAccountClick"><v-icon>done</v-icon></v-btn>
                            <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelDeleteAccountClick"><v-icon>clear</v-icon></v-btn>
                        </div>
                    </v-flex>
                    <v-flex xs12 pt-3>
                        <v-layout row wrap>
                            <v-flex s12>
                                {{ $t('pages.settings.delete-account-description') }}
                            </v-flex>
                            <v-flex s12>
                                <v-form ref="deleteAccountForm" v-model="isDeleteAccountFormValid">
                                    <v-flex xs12>
                                        <v-text-field v-model="deleteAccountPassword"  :rules="passwordRules"
                                                :label="`${$t('fields.password.label')}*`" validate-on-blur required type="password"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 v-if="authentication.checkUserPasswordErrors">
                                        <ServerSideErrors :errors="authentication.checkUserPasswordErrors"/>
                                    </v-flex>
                                    <v-flex xs12 v-if="users.deleteMeErrors">
                                        <ServerSideErrors :errors="users.deleteMeErrors"/>
                                    </v-flex>
                                </v-form>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>

        </v-layout>
    </v-container>
  </section>
</template>

<script>
    import ServerSideErrors from '~/components/errors/server-side-errors.vue';
    import ProfilePrivacy from '~/components/profile/profile-privacy.vue';
    import ProfileLocaleSetting from '~/components/profile/profile-locale-setting.vue';
    import { Helpers, Validators } from '~/utils';
    import { VisibilityType } from '~/store/entities';
    import { mapGetters, mapState } from 'vuex';
    import * as _ from 'lodash';

    export default {
        components: {
            ProfilePrivacy,
            ProfileLocaleSetting,
            ServerSideErrors
        },
        layout: ({ store }) => {
            if (store.getters['users/isAdmin']) {
                return 'administration';
            }

            return 'user';
        },
        middleware: ['authenticated'],
        asyncData ({ store, query }) {
            return store.dispatch('users/getSettings').then((response) => {
                return {
                    profilePrivacy: {
                        profileVisibility: response.ProfileVisibility,
                        emailVisibility: response.EmailVisibility,
                        birthDateVisibility: response.BirthDateVisibility,
                        phoneNumberVisibility: response.PhoneNumberVisibility
                    },
                    localeSetting: store.state.locale
                };
            });
        },
        data: function () {
            return {
                profilePrivacy: {
                    profileVisibility: 0,
                    emailVisibility: 0,
                    birthDateVisibility: 0,
                    phoneNumberVisibility: 0
                },
                editedProfilePrivacy: {},
                localeSetting: '',
                editedLocaleSetting: '',
                password: '',
                newPassword: '',
                confirmNewPassword: '',
                deleteAccountPassword: '',
                passwordRules: [
                    v => !!v || this.$t('fields.password.validation-errors.required'),
                    v => Validators.isValidPassword(v) || this.$t('fields.password.validation-errors.invalid')
                ],
                isEditingSettings: false,
                isChangingPassword: false,
                isChangePasswordFormValid: false,
                isDeletingAccount: false,
                isDeleteAccountFormValid: false
            };
        },
        computed: {
            ...mapGetters({
                isEnabled: 'users/isEnabled',
                isUser: 'users/isUser',
                locales: 'applicationData/locales',
                localeName: 'localeName'
            }),
            ...mapState(['authentication', 'users'])
        },
        methods: {
            validateConfirmNewPassword () {
                if (!this.confirmNewPassword) {
                    return [this.$t('fields.confirm-password.validation-errors.required')];
                }

                if (this.confirmNewPassword !== this.newPassword) {
                    return [this.$t('fields.confirm-password.validation-errors.invalid')];
                }

                return [true];
            },
            getPrivacyElementText: function (value) {
                return this.$t(`application-data.${(_.invert(VisibilityType))[value].toLowerCase()}`);
            },
            onEditSettingsClick: function () {
                this.cancelAllUnsavedChanges();
                this.editedProfilePrivacy   = Helpers.cloneObject(this.profilePrivacy);
                this.editedLocaleSetting    = this.localeSetting;
                this.isEditingSettings      = true;
            },
            updateProfilePrivacy: function (model) {
                this.editedProfilePrivacy = Helpers.cloneObject(model);
            },
            updateLocaleSetting: function (model) {
                this.editedLocaleSetting = model;
            },
            onSaveEditSettingsClick: function () {
                this.isEditingSettings  = false;
                this.profilePrivacy     = Helpers.cloneObject(this.editedProfilePrivacy);
                this.localeSetting      = this.editedLocaleSetting;

                this.$store.dispatch('users/updateSettings', {
                    ProfileVisibility: this.profilePrivacy.profileVisibility,
                    EmailVisibility: this.profilePrivacy.emailVisibility,
                    BirthDateVisibility: this.profilePrivacy.birthDateVisibility,
                    PhoneNumberVisibility: this.profilePrivacy.phoneNumberVisibility,
                    Locale: this.localeSetting
                });
            },
            onCancelEditSettingsClick: function () {
                this.isEditingSettings = false;
            },
            onChangePasswordClick: function () {
                this.$store.dispatch('users/setChangePasswordErrors', '');
                this.cancelAllUnsavedChanges();
                this.isChangingPassword = true;
            },
            async onConfirmChangePasswordClick () {
                this.$refs.changePasswordForm.validate();

                if (!this.isChangePasswordFormValid) {
                    return;
                }

                this.$store.dispatch('users/changePassword', {
                    Password: this.password,
                    NewPassword: this.newPassword,
                    ConfirmNewPassword: this.confirmNewPassword
                }).then((response) => {
                    if (!this.users.changePasswordErrors) {
                        this.cancelAllUnsavedChanges();
                    }
                });
            },
            onCancelChangePasswordClick: function () {
                this.isChangingPassword = false;
            },
            cancelAllUnsavedChanges: function () {
                this.isEditingSettings     = false;
                this.isChangingPassword    = false;
                this.isDeletingAccount     = false;

                this.password               = '';
                this.newPassword            = '';
                this.confirmNewPassword     = '';
                this.deleteAccountPassword  = '';
            },
            onDeleteAccountClick: function () {
                this.$store.dispatch('authentication/setCheckUserPasswordErrors', '');
                this.$store.dispatch('users/setDeleteMeErrors', '');
                this.cancelAllUnsavedChanges();
                this.isDeletingAccount = true;
            },
            onConfirmDeleteAccountClick: function () {
                this.$refs.deleteAccountForm.validate();

                if (!this.isDeleteAccountFormValid) {
                    return;
                }

                this.$store.dispatch('authentication/checkUserPassword', {
                    Password: this.deleteAccountPassword
                }).then((response) => {
                    if (!this.authentication.checkUserPasswordErrors) {
                        this.$store.dispatch('users/deleteMe').then(() => {
                            if (!this.users.deleteMeErrors) {
                                this.$store.dispatch('authentication/logout');
                                this.$router.push({ path: '/login' });
                            }
                        });
                    }
                });
            },
            onCancelDeleteAccountClick: function () {
                this.isDeletingAccount = false;
            }
        }
    }

</script>

<style lang="scss">

    .setings-row {
        display: flex;
    }

    .settings-section-button {
        width: 210px;
        margin-left: 0px;
    }

    #delete-account-button {
        background-color: #F00;
        color: #FFF;
    }

    #change-password-button {
        color: #FFF;
    }

</style>
