<template>
    <v-layout row wrap>
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg5 mb-3>
                <dropzone id="profile-image-dropzone" ref="profileImageDropzone"
                    :options="profileImageDropzoneOptions" :destroyDropzone="true" :duplicateCheck="true">
                    <div class="dz-message" data-dz-message>
                        <span>{{ $t('fields.profile-photo-dropzone.label') }}</span>
                    </div>
                </dropzone>
            </v-flex>
            <v-flex xs12 sm12 md7 lg7 mb-3>
                <v-layout align-center row wrap>
                    <v-flex xs12>
                        <v-flex xs12 v-if="displayNameFields">
                            <v-text-field v-model="profileGeneralInformationModel.firstName" @input="updateProfileGeneralInformationModel"
                                    :rules="firstNameRules" :label="`${$t('fields.first-name.label')}*`" validate-on-blur required></v-text-field>
                        </v-flex>
                        <v-flex xs12 v-if="displayNameFields">
                            <v-text-field v-model="profileGeneralInformationModel.lastName" @input="updateProfileGeneralInformationModel" 
                                    :rules="lastNameRules" :label="`${$t('fields.last-name.label')}*`" validate-on-blur required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-menu
                                content-class="date-picker-menu"
                                :close-on-content-click="false" v-model="isBirthDateMenuOpen" :nudge-right="40"
                                lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                <v-text-field slot="activator" v-model="profileGeneralInformationModel.birthDate"
                                                :rules="birthDateRules" :label="`${$t('fields.date-of-birth.label')}*`" prepend-icon="event" readonly>
                                </v-text-field>
                                <v-date-picker
                                    v-model="profileGeneralInformationModel.birthDate"
                                    :max="currentDate"
                                    @input="updateProfileGeneralInformationModel"
                                    :locale="locale">
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="profileGeneralInformationModel.phoneNumber" @input="updateProfileGeneralInformationModel"
                                    :rules="phoneNumberRules" :label="`${$t('fields.phone-number.label')}*`" validate-on-blur required></v-text-field>
                        </v-flex>
                        <v-flex
                            v-if="!hideOptionalFields"
                            xs12>
                            <v-text-field v-model="profileGeneralInformationModel.website" @input="updateProfileGeneralInformationModel"
                                    :rules="websiteRules" validate-on-blur :label="$t('fields.website.label')"></v-text-field>
                        </v-flex>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-flex
            v-if="!hideOptionalFields"
            xs12>
            <v-textarea
                id="profile-description-field"
                class="text-area-field"
                v-model="profileGeneralInformationModel.description"
                @input="updateProfileGeneralInformationModel"
                auto-grow
                box
                :label="$t('fields.description.label')"
                rows="1"
                counter=500
                :rules="descriptionRules" validate-on-blur>
            </v-textarea>
        </v-flex>
        <v-layout
            v-if="!hideOptionalFields"
            row wrap>
            <v-flex xs12 sm6 md6 lg6 class="left-field-container">
                <v-text-field v-model="profileGeneralInformationModel.instagramLink" @input="updateProfileGeneralInformationModel"
                            :rules="instagramLinkRules" :label="$t('fields.instagram.label')"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6 class="right-field-container">
                <v-text-field v-model="profileGeneralInformationModel.youtubeLink" @input="updateProfileGeneralInformationModel"
                            :rules="youtubeLinkRules" :label="$t('fields.youtube.label')"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6 class="left-field-container">
                <v-text-field v-model="profileGeneralInformationModel.facebookLink" @input="updateProfileGeneralInformationModel"
                            :rules="facebookLinkRules" :label="$t('fields.facebook.label')"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6 class="right-field-container">
                <v-text-field v-model="profileGeneralInformationModel.linkedinLink" @input="updateProfileGeneralInformationModel"
                            :rules="linkedinLinkRules" :label="$t('fields.linkedin.label')"></v-text-field>
            </v-flex>
        </v-layout>
    </v-layout>
</template>


<script>
    import { mapGetters } from 'vuex';
    import Dropzone from 'nuxt-dropzone';
    import 'nuxt-dropzone/dropzone.css';
    import { SocialMediaManager, Helpers, Validators } from '~/utils';
    import { SocialMediaCategoryType } from '~/store/entities';

    export default {
            components: {
                Dropzone
            },
            props: ['profileGeneralInformation', 'displayNameFields', 'hideOptionalFields'],
            data: function () {
                return {
                    profileGeneralInformationModel: Helpers.cloneObject(this.profileGeneralInformation),
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
                    websiteRules: [
                        v => !v || Validators.isValidURL(v) || this.$t('fields.website.validation-errors.invalid')
                    ],
                    descriptionRules: [
                        v => !v || v.length <= 500 || this.$t('fields.description.validation-errors.length')
                    ],
                    instagramLinkRules: [
                        v => !v || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Instagram) || this.$t('fields.instagram.validation-errors.invalid')
                    ],
                    youtubeLinkRules: [
                        v => !v || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Youtube) || this.$t('fields.youtube.validation-errors.invalid')
                    ],
                    facebookLinkRules: [
                        v => !v || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Facebook) || this.$t('fields.facebook.validation-errors.invalid')
                    ],
                    linkedinLinkRules: [
                        v => !v || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Linkedin) || this.$t('fields.linkedin.validation-errors.invalid')
                    ],
                    profileImageDropzoneOptions: {
                        url: '/',
                        maxFilesize: 10,
                        maxFiles: 1,
                        addRemoveLinks: true,
                        autoProcessQueue: false,
                        dictRemoveFile: this.$t('fields.profile-photo-dropzone.photo-remove-button'),
                        acceptedMimeTypes: 'image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon',
                        initializeProfileImage: (dropzone) => {
                            if (!this.profileGeneralInformation.profileImage) {
                                return;
                            }

                            var profileImage = this.profileGeneralInformation.profileImage || {};
                            var file;

                            if (this.profileGeneralInformation.profileImage.ThumbnailLocation) {
                                file = { url: profileImage.ThumbnailLocation, size: profileImage.Size * 1000 * 1000 };
                                dropzone.emit('addedfile', file);
                                dropzone.emit('thumbnail', file, file.url);
                                dropzone.createThumbnailFromUrl(file, file.url, null, null);
                                dropzone.emit('complete', file);
                                dropzone.files.push(file);
                            } else if (this.profileGeneralInformation.profileImage.File) {
                                const url = profileImage.File.url || profileImage.File.dataURL;
                                const size = profileImage.File.size || profileImage.File.upload.total;

                                file = {
                                    url,
                                    size
                                };
                                dropzone.emit('addedfile', file);
                                dropzone.emit('thumbnail', file, file.url);
                                dropzone.createThumbnailFromUrl(file, file.url, null, null);
                                dropzone.emit('complete', file);
                                dropzone.files.push(file);
                            }
                        },
                        addFileEventHandler: (file) => {
                            this.profileGeneralInformationModel.profileImage = {
                                File: file
                            };

                            this.updateProfileGeneralInformationModel();
                        },
                        removedfileEventHandler: (file) => {
                            this.profileGeneralInformationModel.profileImage = null;

                            this.updateProfileGeneralInformationModel();
                        },
                        thumbnailWidth: 300,
                        thumbnailHeight: 300,
                        init: function () {
                            this.on('removedfile', (file) => {
                                this.options.removedfileEventHandler(file);
                            });

                            this.on('addedfile', (file) => {
                                if (this.files.length === 2) {
                                    this.removeFile(this.files[0]);
                                }
    
                                this.options.addFileEventHandler(file);
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

                            if (file.width < file.height) {
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
                    currentDate: new Date().toISOString()
                };
            },
            methods: {
                updateProfileGeneralInformationModel: function () {
                    this.isBirthDateMenuOpen = false;
                    this.$emit('updateProfileGeneralInformation', this.profileGeneralInformationModel);
                }
            },
            computed: {
                ...mapGetters({
                    locale: 'locale'
                })
            }
    }
</script>

<style lang="scss">

    #profile-image-dropzone {
        width: 250px;
        height: 250px;
        min-height: 250px;
        padding: 0px;
        border-radius: 100%;

        .dz-preview.dz-image-preview {
            margin: 0px;
            width: calc(100% - 2px);
            height: calc(100% - 2px);
            border-radius: 100%;
            justify-content: center;
            display: flex;
        }

        .dz-remove {
            margin: 0px;
            bottom: 50px;
        }

        .dz-message {
            margin: 0px;
        }

        .dz-progress {
            display: none;
        }

        .dz-image {
            border-radius: 100%;
        }

        .dz-details {
            padding: 50px;
            border-radius: 100%;
        }

        .dz-image img  {
            width: 100%;
            height: 100%;
            border-radius: 100%;
        }

    }

    .left-field-container {
        padding-right: 10px;
    }

    .right-field-container {
        padding-left: 10px;
    }

    @media screen and (max-width: 400px) {

        #profile-image-dropzone {
            width: 150px;
            height: 150px;
            min-height: 150px;

            .dz-image img  {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .left-field-container {
            padding-right: 0px;
        }

        .right-field-container {
            padding-left: 0px;
        }
    

    }

</style>