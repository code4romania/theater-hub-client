<template>
    <section class="profile-section">
        <v-container id="profile-container" class="main-container pa-5">
            <v-layout row wrap>

                <v-flex xs12 v-if="!isEditingGeneralInformation" class="mb-5">
                    <v-layout row class="profile-information-group">
                        <v-avatar size="200px">
                            <img :src="require('~/assets/images/default-avatar.svg')" v-if="!profileImage" />
                            <img :src="`data:image/png;base64,${profileImage}`" v-if="profileImage" />
                        </v-avatar>
                        <v-flex xs12 class="ml-5 pl-5">
                            <v-flex xs12 class="profile-information-row">
                                <span class="full-name-field">{{ fullName }}</span>
                                <span v-if="birthDate">,</span>
                                <span class="age-field" v-if="birthDate">{{ age }} {{ $t('shared.content.years') }}</span>
                            </v-flex>
                            <v-flex xs12 class="profile-information-row">
                                <span class="field-label">{{ $t('fields.email.label') }}: </span>
                                <span class="email-field">{{ email }}</span>
                            </v-flex>
                            <v-flex xs12 class="profile-information-row" v-if="phoneNumber">
                                <span class="field-label">{{ $t('fields.phone-number.label') }}: </span>
                                <span class="phone-number-field">{{ phoneNumber }}</span>
                            </v-flex>
                        </v-flex>
                        <v-btn outline small fab class="mt-2" v-on:click="onEditGeneralInformationClick"><v-icon>edit</v-icon></v-btn>
                    </v-layout>
                </v-flex>

                <v-flex xs12 v-if="isEditingGeneralInformation" class="edited-profile-section">
                   <v-layout row wrap pa-5>
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.edit-general-information-title') }}</h2>
                            <div>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditGeneralInformationClick" :disabled="isSaveEditGeneralInformationButtonDisabled()">
                                    <v-icon>done</v-icon>
                                </v-btn>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditGeneralInformationClick">
                                    <v-icon>clear</v-icon>
                                </v-btn>
                            </div>
                        </v-flex>
                        <v-layout row>
                            <v-flex xs6 mb-3>
                                <dropzone id="profile-image-dropzone" ref="profileImageDropzone"
                                    :options="profileImageDropzoneOptions" :destroyDropzone="true" :duplicateCheck="true">
                                    <div class="dz-message" data-dz-message><span>{{ $t('fields.profile-photo-dropzone.label') }}</span></div>
                                </dropzone>
                            </v-flex>
                            <v-flex xs6 mb-3>
                                <v-flex xs12>
                                    <v-text-field v-model="editedFirstName" :rules="firstNameRules"
                                            :label="`${$t('fields.first-name.label')}*`" validate-on-blur required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="editedLastName" :rules="lastNameRules"
                                                :label="`${$t('fields.last-name.label')}*`" validate-on-blur required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-menu :close-on-content-click="false" v-model="isBirthDateMenuOpen" :nudge-right="40"
                                        lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                        <v-text-field slot="activator" v-model="editedBirthDate"
                                                                                :rules="birthDateRules"
                                                                                :label="$t('fields.date-of-birth.label')" prepend-icon="event" readonly>
                                        </v-text-field>
                                        <v-date-picker
                                            v-model="editedBirthDate"
                                            @input="isBirthDateMenuOpen = false"
                                            :locale="locale">
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="editedPhoneNumber" :rules="phoneNumberRules"
                                            :label="`${$t('fields.phone-number.label')}*`" validate-on-blur required></v-text-field>
                                </v-flex>
                            </v-flex>
                        </v-layout>
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
    import Dropzone from 'nuxt-dropzone';
    import moment from 'moment';
    import _ from 'lodash';
    import 'nuxt-dropzone/dropzone.css';
    import { Validators } from '~/utils';
    import { mapGetters, mapState } from 'vuex';

    export default {
        components: {
            Dropzone,
            moment
        },
        layout: 'administration',
        middleware: ['authenticated', 'admin'],
        data: function () {
            return {
                isEditingGeneralInformation: false,
                isBirthDateMenuOpen: false,
                phoneNumberRules: [
                    v => !!v || this.$t('fields.phone-number.validation-errors.required'),
                    v => Validators.isValidPhoneNumber(v) || this.$t('fields.phone-number.validation-errors.invalid')
                ],
                firstNameRules: [
                    v => !!v || this.$t('fields.first-name.validation-errors.required'),
                    v => v.length <= 50 || this.$t('fields.first-name.validation-errors.length')
                ],
                lastNameRules: [
                    v => !!v || this.$t('fields.last-name.validation-errors.required'),
                    v => v.length <= 50 || this.$t('fields.last-name.validation-errors.length')
                ],
                birthDateRules: [
                    v => Validators.isValidBirthDate(v) || this.$t('fields.date-of-birth.validation-errors.invalid')
                ],
                editedProfileImage: '',
                editedFirstName: '',
                editedLastName: '',
                editedBirthDate: '',
                editedPhoneNumber: '',
                profileImageDropzoneOptions: {
                    url: '/',
                    maxFilesize: 2,
                    addRemoveLinks: true,
                    autoProcessQueue: false,
                    dictRemoveFile: this.$t('fields.profile-photo-dropzone.photo-remove-button'),
                    acceptedMimeTypes: 'image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon',
                    initializeProfileImage: (dropzone) => {
                        if (this.editedProfileImage) {
                            var fileSize = atob(this.editedProfileImage).length;
                            var file     = { url: `data:image/png;base64,${this.editedProfileImage}`, size: fileSize };
                            dropzone.emit('addedfile', file);
                            dropzone.emit('thumbnail', file, file.url);
                            dropzone.createThumbnailFromUrl(file, file.url, null, null);
                            dropzone.emit('complete', file);
                            dropzone.files.push(file);
                        }
                    },
                    thumbnailEventHandler: (dataUrl) => {
                        this.editedProfileImage = dataUrl.replace('data:image/png;base64,', '');
                    },
                    removedfileEventHandler: (file) => {
                        this.editedProfileImage = '';
                    },
                    maxFiles: 1,
                    thumbnailWidth: 160,
                    thumbnailHeight: 160,
                    init: function () {
                        this.on('thumbnail', (file, dataUrl) => {
                            this.options.thumbnailEventHandler(dataUrl);
                        });

                        this.on('removedfile', (file) => {
                            this.options.removedfileEventHandler(file);
                        });

                        this.on('addedfile', () => {
                            if (this.files.length === 2) {
                                this.removeFile(this.files[0]);
                            }
                        });

                        this.on('sending', () => {
                            return false;
                        });

                        this.options.initializeProfileImage(this);
                    }
                },
                snackbar: false,
                snackbarText: ''
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

            return {
                profileImage: response.ProfileImage ? response.ProfileImage.Image.replace('data:image/png;base64,', '') : null,
                birthDate,
                firstName: response.FirstName,
                lastName: response.LastName,
                phoneNumber: response.PhoneNumber,
                email: response.Email
            };
        },
        methods: {
            endProfileSectionEditSession () {
                this.$store.dispatch('users/endProfileSectionEditSession');
            },
            onEditGeneralInformationClick: function () {
                this.editedProfileImage             = this.profileImage;
                this.editedFirstName                = this.firstName;
                this.editedLastName                 = this.lastName;
                this.editedBirthDate                = this.birthDate;
                this.editedPhoneNumber              = this.phoneNumber;

                this.$store.dispatch('users/initiateProfileSectionEditSession');
                this.isEditingGeneralInformation    = true;
            },
            onCancelEditGeneralInformationClick: function () {
                this.isEditingGeneralInformation = false;
                this.endProfileSectionEditSession();
            },
            onSaveEditGeneralInformationClick: function () {
                var newGeneralInformationRequest = {
                    FirstName: this.editedFirstName,
                    LastName: this.editedLastName,
                    ProfileImage: {
                        Image: this.editedProfileImage
                    },
                    BirthDate: this.editedBirthDate,
                    PhoneNumber: this.editedPhoneNumber
                };

                this.$store.dispatch('users/updateMyGeneralInformation', newGeneralInformationRequest).then(() => {
                    if (!this.users.updateMyGeneralInformationErrors) {
                        this.endProfileSectionEditSession();
                        this.profileImage                   = this.editedProfileImage;
                        this.firstName                      = this.editedFirstName;
                        this.lastName                       = this.editedLastName;
                        this.birthDate                      = this.editedBirthDate;
                        this.phoneNumber                    = this.editedPhoneNumber;

                        this.isEditingGeneralInformation    = false;
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-general-information');
                        this.snackbar = true;
                    }
                });
            },
            isSaveEditGeneralInformationButtonDisabled: function () {
                return !this.editedFirstName || !this.editedLastName ||
                        !this.editedPhoneNumber || !Validators.isValidPhoneNumber(this.editedPhoneNumber) ||
                        !Validators.isValidBirthDate(this.birthDate);
            }
        },
        computed: {
            ...mapState(['users']),
            fullName: function () {
                return `${this.firstName} ${this.lastName}`;
            },
            age: function () {
                var currentDateMoment = moment(new Date());
                var birthDateMoment   = moment(this.birthDate);
                return Math.floor(moment.duration(currentDateMoment.diff(birthDateMoment)).asYears());
            },
            ...mapGetters({
                locale: 'locale'
            })
        },
        mounted () {
            window.onscroll = _.throttle(() => {
                if (this.isEditingGeneralInformation) {
                    this.$store.dispatch('syncMainOverlaySize');
                }
            }, 100);
        }
    }

</script>

<style lang="scss">

    html, body {
        height: 100%;
    }

    .v-avatar {
        box-shadow: 0px 3px 23px -9px rgba(0,0,0,0.75);
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

    #profile-image-dropzone {
        width: 250px;
        height: 250px;
        min-height: 250px;
        border-radius: 100%;

        .dz-message {
            margin: 0px;
        }

        .dz-progress {
            display: none;
        }

    }

</style>
