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
                                        <img :src="require('~/assets/images/default-avatar.svg')" v-if="!profileImage" />
                                        <img :src="`data:image/png;base64,${profileImage}`" v-if="profileImage" />
                                    </v-avatar>
                                </v-flex>
                                <v-flex xs12 sm12 md6 lg7 class="general-information">
                                    <v-layout>
                                        <v-flex xs12 pl-4>
                                            <v-flex xs12 class="profile-information-row">
                                                <span class="full-name-field">{{ fullName }}</span>
                                                <span v-if="birthDate" class="name-separator">,</span>
                                                <span v-if="birthDate" class="age-field">{{ age }} {{ $t('shared.content.years') }}</span>
                                            </v-flex>
                                            <v-flex xs12 mt-2 class="profile-information-row">
                                                <span class="field-label">{{ $t('fields.email.label') }}: </span>
                                                <span class="email-field">{{ email }}</span>
                                            </v-flex>
                                            <v-flex xs12 class="profile-information-row" v-if="phoneNumber">
                                                <span class="field-label">{{ $t('fields.phone-number.label') }}: </span>
                                                <span class="phone-number-field">{{ phoneNumber }}</span>
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

                <v-flex xs12 v-if="isEditingGeneralInformation" class="edited-profile-section">
                   <v-layout row wrap pa-5>

                       <v-flex xs12 class="profile-information-group-header">
                           <v-layout row wrap class="profile-row-actions-container">
                               <v-flex xs12 sm8 md8 lg8>
                                    <h2>{{ $t('pages.profile.edit-general-information-title') }}</h2>
                               </v-flex>
                               <v-flex xs12 sm4 md4 lg4 class="profile-row-actions">
                                    <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditGeneralInformationClick" :disabled="isSaveEditGeneralInformationButtonDisabled()">
                                        <v-icon>done</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditGeneralInformationClick">
                                        <v-icon>clear</v-icon>
                                    </v-btn>
                               </v-flex>
                           </v-layout>
                       </v-flex>

                        <v-layout row wrap>
                            <v-flex xs12 sm12 md6 lg6 mb-3>
                                <dropzone id="profile-image-dropzone" ref="profileImageDropzone"
                                    :options="profileImageDropzoneOptions" :destroyDropzone="true" :duplicateCheck="true">
                                    <div class="dz-message" data-dz-message><span>{{ $t('fields.profile-photo-dropzone.label') }}</span></div>
                                </dropzone>
                            </v-flex>
                            <v-flex xs12 sm12 md6 lg6 mb-3>
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
                    maxFilesize: 5,
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
                    thumbnailWidth: 200,
                    thumbnailHeight: 200,
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
                    },
                    resize: function (file, width, height) {
                        var trgWidth = this.options.thumbnailWidth;
                        var trgHeight = this.options.thumbnailHeight;
                        var trgX = 0;

                        if (file.width > file.height) {
                            trgHeight = this.options.thumbnailWidth * file.height / file.width;
                        } else {
                            trgWidth = this.options.thumbnailHeight * file.width / file.height;
                        }

                        if (trgWidth  > this.options.thumbnailHeight * 3) {
                            trgX = (trgWidth - this.options.thumbnailHeight * 3) / 2;
                            trgWidth = this.options.thumbnailHeight * 3;
                        }

                        return {
                            srcWidth: file.width,
                            srcHeight: file.height,
                            trgX,
                            trgWidth,
                            trgHeight
                        };
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
            this.endProfileSectionEditSession();

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

</style>


<style lang="scss" scoped>

    #general-information-group {
        align-items: center;
    }

    .v-avatar {
        box-shadow: 0px 3px 23px -9px rgba(0,0,0,0.75);
        width: 300px !important;
        height: 300px !important;
    }

    .v-avatar img {
        border: 12px solid #979797;
    }

    #edit-general-information {
        align-self: start;
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
        width: 300px;
        height: 300px;
        min-height: 300px;
        border-radius: 100%;

        .dz-message {
            margin: 0px;
        }

        .dz-progress {
            display: none;
        }

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

        #profile-image-dropzone {
            width: 150px;
            height: 150px;
            min-height: 150px;
        }

        #edit-general-information {
            align-self: flex-end;
        }
    

    }

</style>
