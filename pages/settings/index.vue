<template>
  <section class="settings-section">
    <v-container id="settings-container" class="main-container pa-5">
        <v-layout row wrap>

            <v-flex xs12 v-if="!isEditingPrivacy">
                <v-layout row wrap class="profile-information-group">
                    <v-flex xs12 mb-3 class="profile-information-group-header">
                        <h2>Privacy</h2>
                        <v-btn outline small fab class="mt-0" v-on:click="onEditPrivacyClick"><v-icon>edit</v-icon></v-btn>
                    </v-flex>
                    <v-flex xs12 class="privacy-row">
                        <v-flex xs3>
                            <span class="field-title">Profile visibility:</span>
                        </v-flex>
                        <v-flex xs9>
                            <span>{{ getPrivacyElementText(this.profilePrivacy.profileVisibility)  }}</span>
                        </v-flex>
                    </v-flex>
                    <v-flex xs12 class="privacy-row">
                        <v-flex xs3>
                            <span class="field-title">Email visibility:</span>
                        </v-flex>
                        <v-flex xs9>
                            <span>{{ getPrivacyElementText(this.profilePrivacy.emailVisibility)  }}</span>
                        </v-flex>
                    </v-flex>
                    <v-flex xs12 class="privacy-row">
                        <v-flex xs3>
                            <span class="field-title">Birth date visibility:</span>
                        </v-flex>
                        <v-flex xs9>
                            <span>{{ getPrivacyElementText(this.profilePrivacy.birthDateVisibility)  }}</span>
                        </v-flex>
                    </v-flex>
                    <v-flex xs12 class="privacy-row">
                        <v-flex xs3>
                            <span class="field-title">Phone number visibility:</span>
                        </v-flex>
                        <v-flex xs9>
                            <span>{{ getPrivacyElementText(this.profilePrivacy.phoneNumberVisibility)  }}</span>
                        </v-flex>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 v-if="isEditingPrivacy">
               <v-layout row wrap elevation-5 pa-5>
                    <v-flex xs12 class="profile-information-group-header">
                        <h2>Edit Privacy</h2>
                        <div>
                            <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditPrivacyClick"><v-icon>done</v-icon></v-btn>
                            <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditPrivacyClick"><v-icon>clear</v-icon></v-btn>
                        </div>
                    </v-flex>
                    <v-flex xs12>
                        <ProfilePrivacy :profilePrivacy="editedProfilePrivacy" @updateProfilePrivacy="updateProfilePrivacy"/>

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
                <v-btn id="change-password-button" class="primary settings-section-button" large @click="onChangePasswordClick">CHANGE PASSWORD</v-btn>
            </v-flex>

            
            <v-flex xs12 v-if="isChangingPassword">
               <v-layout row wrap elevation-5 pa-5>
                    <v-flex xs12 class="profile-information-group-header">
                        <h2>Change Password</h2>
                        <div>
                            <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onConfirmChangePasswordClick"><v-icon>done</v-icon></v-btn>
                            <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelChangePasswordClick"><v-icon>clear</v-icon></v-btn>
                        </div>
                    </v-flex>
                    <v-flex xs12 pt-3>
                        <v-form ref="changePasswordForm" v-model="isChangePasswordFormValid">
                            <v-flex xs12>
                                <v-text-field v-model="password"     :rules="passwordRules" label="Password*" validate-on-blur required type="password"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="newPassword"  :rules="passwordRules" label="New password*" validate-on-blur required type="password"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="confirmNewPassword" :rules="validateConfirmNewPassword()"
                                                            label="Confirm new password*" validate-on-blur required type="password"></v-text-field>
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
                <v-btn id="delete-account-button" large @click="onDeleteAccountClick" class="settings-section-button">DELETE ACCOUNT</v-btn>
            </v-flex>

            <v-flex xs12 v-if="isDeletingAccount">
               <v-layout row wrap elevation-5 pa-5>
                    <v-flex xs12 class="profile-information-group-header">
                        <h2>Delete Account</h2>
                        <div>
                            <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onConfirmDeleteAccountClick"><v-icon>done</v-icon></v-btn>
                            <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelDeleteAccountClick"><v-icon>clear</v-icon></v-btn>
                        </div>
                    </v-flex>
                    <v-flex xs12 pt-3>
                        <v-layout row wrap>
                            <v-flex s12>
                                Are you sure you wish to delete your account? All your information will be permanently lost.
                                If you just want to hide your information, you can make your user profile private.
                                In case you wish to proceed, please enter your password:
                            </v-flex>
                            <v-flex s12>
                                <v-form ref="deleteAccountForm" v-model="isDeleteAccountFormValid">
                                    <v-flex xs12>
                                        <v-text-field v-model="deleteAccountPassword"  :rules="passwordRules" label="Password*" validate-on-blur required type="password"></v-text-field>
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
    import { Helpers, Validators } from '~/utils';
    import { VisibilityType } from '~/store/entities';
    import { mapState } from 'vuex';
    import * as _ from 'lodash';

    export default {
        components: {
            ProfilePrivacy,
            ServerSideErrors
        },
        middleware: 'authenticated',
        asyncData ({ store, query }) {
            return store.dispatch('users/getSettings').then((response) => {
                return {
                    profilePrivacy: {
                        profileVisibility: response.ProfileVisibility,
                        emailVisibility: response.EmailVisibility,
                        birthDateVisibility: response.BirthDateVisibility,
                        phoneNumberVisibility: response.PhoneNumberVisibility
                    }
                };
            });
        },
        data: () => ({
            profilePrivacy: {
                profileVisibility: 0,
                emailVisibility: 0,
                birthDateVisibility: 0,
                phoneNumberVisibility: 0
            },
            editedProfilePrivacy: {},
            password: '',
            newPassword: '',
            confirmNewPassword: '',
            deleteAccountPassword: '',
            passwordRules: [
                v => !!v || 'Password is required',
                v => Validators.isValidPassword(v) || 'Password must be between 7 and 50 characters long and include upper and lowercase characters'
            ],
            isEditingPrivacy: false,
            isChangingPassword: false,
            isChangePasswordFormValid: false,
            isDeletingAccount: false,
            isDeleteAccountFormValid: false
        }),
        computed: {
            ...mapState(['authentication', 'users'])
        },
        methods: {
            validateConfirmNewPassword () {
                if (!this.confirmNewPassword) {
                    return ['Confirm password is required'];
                }

                if (this.confirmNewPassword !== this.newPassword) {
                    return ['Confirm password must match the password'];
                }

                return [true];
            },
            getPrivacyElementText: function (value) {
                return (_.invert(VisibilityType))[value];
            },
            onEditPrivacyClick: function () {
                this.cancelAllUnsavedChanges();
                this.editedProfilePrivacy   = Helpers.cloneObject(this.profilePrivacy);
                this.isEditingPrivacy       = true;
            },
            updateProfilePrivacy: function (model) {
                this.editedProfilePrivacy = Helpers.cloneObject(model);
            },
            onSaveEditPrivacyClick: function () {
                this.isEditingPrivacy   = false;
                this.profilePrivacy     = Helpers.cloneObject(this.editedProfilePrivacy);

                this.$store.dispatch('users/updateSettings', {
                    ProfileVisibility: this.profilePrivacy.profileVisibility,
                    EmailVisibility: this.profilePrivacy.emailVisibility,
                    BirthDateVisibility: this.profilePrivacy.birthDateVisibility,
                    PhoneNumberVisibility: this.profilePrivacy.phoneNumberVisibility
                });
            },
            onCancelEditPrivacyClick: function () {
                this.isEditingPrivacy = false;
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
                this.isEditingPrivacy      = false;
                this.isChangingPassword    = false;
                this.isDeletingAccount     = false;

                this.password               = '';
                this.newPassword            = '';
                this.confirmNewPassword      = '';
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
                                this.$router.replace({ path: 'login' });
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

    .privacy-row {
        display: flex;
    }

    .settings-section-button {
        width: 210px;
    }

    #delete-account-button {
        background-color: #F00;
        color: #FFF;
    }

    #change-password-button {
        color: #FFF;
    }

</style>
