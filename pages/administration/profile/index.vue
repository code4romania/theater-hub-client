<template>
    <section class="profile-section">
        <v-container id="profile-container" class="main-container pa-5">
            <v-layout row wrap>

                <v-flex xs12 v-if="!isEditingGeneralInformation" class="mb-5">
                    <v-layout row wrap class="profile-information-group general-information-section">
                        <v-flex xs10>
                            <v-layout row wrap align-center>
                                <v-flex xs12 sm12 md6 lg5>
                                    <v-avatar>
                                        <img
                                            v-if="!profileGeneralInformation.profileImage"
                                            :src="require('~/assets/images/default-avatar.svg')"
                                        />
                                        <img
                                            v-if="profileGeneralInformation.profileImage"
                                            :src="profileGeneralInformation.profileImage.Location"
                                        />
                                    </v-avatar>
                                </v-flex>
                                <v-flex xs12 sm12 md6 lg7 class="general-information">
                                    <v-layout>
                                        <v-flex xs12 pl-4>
                                            <v-flex xs12 class="profile-information-row">
                                                <span class="full-name-field">{{ fullName }}</span>
                                                <span
                                                    v-if="profileGeneralInformation.birthDate"
                                                    class="name-separator">,</span>
                                                <span
                                                    v-if="profileGeneralInformation.birthDate"
                                                    class="age-field">{{ age }} {{ $t('shared.content.years-old') }}</span>
                                            </v-flex>
                                            <v-flex xs12 mt-2 class="profile-information-row">
                                                <span class="field-label">{{ $t('fields.email.label') }}: </span>
                                                <span class="email-field">{{ profileGeneralInformation.email }}</span>
                                            </v-flex>
                                            <v-flex xs12 class="profile-information-row" v-if="profileGeneralInformation.phoneNumber">
                                                <span class="field-label">{{ $t('fields.phone-number.label') }}: </span>
                                                <span class="phone-number-field">{{ profileGeneralInformation.phoneNumber }}</span>
                                            </v-flex>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs-12 sm-3 md-2 lg-2 id="edit-general-information">
                            <v-btn outline small fab class="mt-2" v-on:click="onEditGeneralInformationClick">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 v-if="isEditingGeneralInformation" class="highlighted-section">
                   <v-layout row wrap pa-5>

                       <v-flex xs12 class="profile-information-group-header">
                           <v-layout row wrap class="profile-row-actions-container">
                               <v-flex xs12 sm8 md8 lg8>
                                    <h2>{{ $t('pages.profile.edit-general-information-title') }}</h2>
                               </v-flex>
                               <v-flex xs12 sm4 md4 lg4 class="profile-row-actions">
                                    <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditGeneralInformationClick" :disabled="isSaveEditGeneralInformationButtonDisabled">
                                        <v-icon>done</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditGeneralInformationClick">
                                        <v-icon>clear</v-icon>
                                    </v-btn>
                               </v-flex>
                           </v-layout>
                       </v-flex>

                        <v-flex xs12 pt-4>
                            <ProfileGeneralInformation  :profileGeneralInformation="editedProfileGeneralInformation"
                                                        :displayNameFields="true"
                                                        :hideOptionalFields="true"
                                                        @updateProfileGeneralInformation="updateProfileGeneralInformation"/>
                        </v-flex>
                    </v-layout>
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
    import moment from 'moment';
    import _ from 'lodash';
    import ProfileGeneralInformation from '~/components/profile/profile-general-information.vue';
    import { Helpers, Validators } from '~/utils';
    import { mapGetters, mapState } from 'vuex';

    export default {
        components: {
            moment,
            ProfileGeneralInformation
        },
        layout: 'administration',
        middleware: ['authenticated', 'admin'],
        data: function () {
            return {
                isEditingGeneralInformation: false,
                snackbar: false,
                snackbarText: '',
                isSaveEditGeneralInformationButtonDisabled: false
            };
        },
        async asyncData ({ store, query }) {
            await store.dispatch('users/getMyProfile');

            var response = store.state.users.myProfile;

            var birthDate = '';

            if (response.BirthDate) {
                birthDate = response.BirthDate.substr(0, 10);
            } else {
                birthDate = null;
            }

            const profileGeneralInformation = {
                profileImage: response.ProfileImage ? response.ProfileImage : {},
                birthDate,
                firstName: response.FirstName,
                lastName: response.LastName,
                phoneNumber: response.PhoneNumber,
                email: response.Email,
                username: response.Username
            };

            return {
                profileGeneralInformation
            };
        },
        methods: {
            endEditSectionSession () {
                this.$store.dispatch('users/endEditSectionSession');
            },
            onEditGeneralInformationClick: function () {
                this.editedProfileGeneralInformation = Helpers.cloneObject(this.profileGeneralInformation);

                this.$store.dispatch('users/initiateEditSectionSession');
                this.isEditingGeneralInformation    = true;
            },
            onCancelEditGeneralInformationClick: function () {
                this.isEditingGeneralInformation = false;
                this.endEditSectionSession();
            },
            onSaveEditGeneralInformationClick: function () {
                const profileImage = this.editedProfileGeneralInformation.profileImage
                                                ? this.editedProfileGeneralInformation.profileImage.File
                                                : '';

                var generalInformationFormData = new FormData();
                generalInformationFormData.append('FirstName', this.editedProfileGeneralInformation.firstName);
                generalInformationFormData.append('LastName', this.editedProfileGeneralInformation.lastName);
                generalInformationFormData.append('ProfileImage', profileImage);
                generalInformationFormData.append('BirthDate', this.editedProfileGeneralInformation.birthDate);
                generalInformationFormData.append('PhoneNumber', this.editedProfileGeneralInformation.phoneNumber);

                this.$store.dispatch('users/updateMyGeneralInformation', generalInformationFormData).then((response) => {
                    this.endEditSectionSession();
                    this.profileGeneralInformation = Helpers.cloneObject(this.editedProfileGeneralInformation);

                    if (response) {
                        this.profileGeneralInformation.profileImage = response.ProfileImage;
                        this.$store.dispatch('users/setMe', response);
                    }

                    this.isEditingGeneralInformation    = false;
                    this.snackbarText                   = this.$t('pages.profile.snackbar-messages.update-general-information');
                    this.snackbar                       = true;
                });
            },
            updateProfileGeneralInformation: function (model) {
                this.editedProfileGeneralInformation = Helpers.cloneObject(model);

                this.isSaveEditGeneralInformationButtonDisabled = !this.editedProfileGeneralInformation.firstName ||
                        !this.editedProfileGeneralInformation.lastName ||
                        !this.editedProfileGeneralInformation.phoneNumber ||
                        !Validators.isValidPhoneNumber(this.editedProfileGeneralInformation.phoneNumber) ||
                        !Validators.isValidBirthDate(this.editedProfileGeneralInformation.birthDate);
            }
        },
        computed: {
            ...mapState(['users']),
            fullName: function () {
                return `${this.profileGeneralInformation.firstName} ${this.profileGeneralInformation.lastName}`;
            },
            age: function () {
                var currentDateMoment = moment(new Date());
                var birthDateMoment   = moment(this.profileGeneralInformation.birthDate);
                return Math.floor(moment.duration(currentDateMoment.diff(birthDateMoment)).asYears());
            },
            ...mapGetters({
                locale: 'locale'
            })
        },
        mounted () {
            this.endEditSectionSession();

            window.onscroll = _.throttle(() => {
                if (this.isEditingGeneralInformation) {
                    this.$store.dispatch('syncMainOverlaySize');
                }
            }, 100);
        }
    }

</script>

<style lang="scss" scoped>

    #general-information-group {
        align-items: center;
    }

    .v-avatar {
        box-shadow: 0px 3px 15px -9px rgba(0,0,0,0.75);
        width: 300px !important;
        height: 300px !important;
    }

    .v-avatar img {
        border: 3px solid #e1e1e1;
    }

    #edit-general-information {
        display: flex;
        justify-content: flex-end;
    }

    .profile-section {
        font-size: 20px;
    }

    .profile-information-row {
        padding: 5px 0px;
    }

    .full-name-field {
        font-size: 24px;
        font-weight: 500;
    }

    .age-field {
        font-size: 24px;
    }

    @media screen and (max-width: 800px) {

        .general-information {
            margin-top: 40px;
        }


    }

    @media screen and (max-width: 400px) {

        .v-avatar {
            width: 200px !important;
            height: 200px !important;
        }

    }

</style>
