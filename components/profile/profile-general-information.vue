<template>
    <v-layout row wrap>
        <v-layout row>
            <v-flex xs6 mb-3>
                <dropzone id="profile-image-dropzone" ref="profileImageDropzone"
                    :options="profileImageDropzoneOptions" :destroyDropzone="true" :duplicateCheck="true">
                    <div class="dz-message" data-dz-message><span>Click or drop profile image here</span></div>
                </dropzone>
            </v-flex>
            <v-flex xs6 mb-3>
                <v-flex xs12 v-if="displayNameFields">
                    <v-text-field v-model="profileGeneralInformationModel.firstName" @input="updateProfileGeneralInformationModel"
                                                                :rules="firstNameRules" label="First name*" validate-on-blur required></v-text-field>
                </v-flex>
                <v-flex xs12 v-if="displayNameFields">
                    <v-text-field v-model="profileGeneralInformationModel.lastName" @input="updateProfileGeneralInformationModel" 
                                                                :rules="lastNameRules" label="Last name*" validate-on-blur required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-menu :close-on-content-click="false" v-model="isBirthDateMenuOpen" :nudge-right="40"
                        lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                        <v-text-field slot="activator" v-model="profileGeneralInformationModel.birthDate"
                                                                :rules="birthDateRules" label="Date of birth" prepend-icon="event" readonly>
                        </v-text-field>
                        <v-date-picker v-model="profileGeneralInformationModel.birthDate" @input="updateProfileGeneralInformationModel">
                        </v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="profileGeneralInformationModel.phoneNumber" @input="updateProfileGeneralInformationModel"
                                                                :rules="phoneNumberRules" label="Phone Number*" validate-on-blur required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="profileGeneralInformationModel.website" @input="updateProfileGeneralInformationModel"
                                                                :rules="websiteRules" validate-on-blur label="Website"></v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>
        <v-flex xs12>
            <v-textarea
                id="profile-description-field text-area-field"
                v-model="profileGeneralInformationModel.description"
                @input="updateProfileGeneralInformationModel"
                auto-grow
                box
                label="Description"
                rows="1"
                counter=500
                :rules="descriptionRules" validate-on-blur>
            </v-textarea>
        </v-flex>
        <v-layout row wrap>
            <v-flex xs6 class="mb-3 pr-2">
                <v-text-field v-model="profileGeneralInformationModel.instagramLink" @input="updateProfileGeneralInformationModel"
                                                                        :rules="instagramLinkRules" label="Instagram"></v-text-field>
            </v-flex>
            <v-flex xs6 class="mb-3 pl-2">
                <v-text-field v-model="profileGeneralInformationModel.youtubeLink" @input="updateProfileGeneralInformationModel"
                                                                                :rules="youtubeLinkRules" label="Youtube"></v-text-field>
            </v-flex>
            <v-flex xs6 class="mb-3 pr-2">
                <v-text-field v-model="profileGeneralInformationModel.facebookLink" @input="updateProfileGeneralInformationModel"
                                                                                :rules="facebookLinkRules" label="Facebook"></v-text-field>
            </v-flex>
            <v-flex xs6 class="mb-3 pl-2">
                <v-text-field v-model="profileGeneralInformationModel.linkedinLink" @input="updateProfileGeneralInformationModel"
                                                                            :rules="linkedinLinkRules" label="Linkedin"></v-text-field>
            </v-flex>
        </v-layout>
    </v-layout>
</template>


<script>
    import Dropzone from 'nuxt-dropzone';
    import 'nuxt-dropzone/dropzone.css';
    import { SocialMediaManager, Helpers, Validators } from '~/utils';
    import { SocialMediaCategoryType } from '~/store/entities';

    export default {
            components: {
                Dropzone
            },
            props: ['profileGeneralInformation', 'displayNameFields'],
            data: function () {
                return {
                    profileGeneralInformationModel: Helpers.cloneObject(this.profileGeneralInformation),
                    isBirthDateMenuOpen: false,
                    phoneNumberRules: [
                        v => !!v || 'Phone number is required',
                        v => Validators.isValidPhoneNumber(v) || 'Phone number must be valid'
                    ],
                    firstNameRules: [
                        v => !!v || 'First name is required',
                        v => v.length <= 50 || 'First name should have at most 50 characters'
                    ],
                    lastNameRules: [
                        v => !!v || 'Last name is required',
                        v => v.length <= 50 || 'Last name should have at most 50 characters'
                    ],
                    birthDateRules: [
                        v => Validators.isValidBirthDate(v) || 'You must be at least 18 years old'
                    ],
                    websiteRules: [
                        v => !v || Validators.isValidURL(v) || 'Website must be valid'
                    ],
                    descriptionRules: [
                        v => !v || v.length <= 500 || "Description's maximum length is of 500 characters"
                    ],
                    instagramLinkRules: [
                        v => !v || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Instagram) || 'Invalid Instagram link'
                    ],
                    youtubeLinkRules: [
                        v => !v || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Youtube) || 'Invalid Youtube link'
                    ],
                    facebookLinkRules: [
                        v => !v || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Facebook) || 'Invalid Facebook link'
                    ],
                    linkedinLinkRules: [
                        v => !v || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Linkedin) || 'Invalid Linkedin link'
                    ],
                    profileImageDropzoneOptions: {
                        url: '/',
                        maxFilesize: 2,
                        addRemoveLinks: true,
                        autoProcessQueue: false,
                        acceptedMimeTypes: 'image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon',
                        initializeProfileImage: (dropzone) => {
                            if (this.profileGeneralInformation.profileImage.Image) {
                                var fileSize = atob(this.profileGeneralInformation.profileImage.Image).length;
                                var file     = { url: `data:image/png;base64,${this.profileGeneralInformation.profileImage.Image}`, size: fileSize };
                                dropzone.emit('addedfile', file);
                                dropzone.emit('thumbnail', file, file.url);
                                dropzone.createThumbnailFromUrl(file, file.url, null, null);
                                dropzone.emit('complete', file);
                                dropzone.files.push(file);
                            }
                        },
                        thumbnailEventHandler: (dataUrl) => {
                            this.profileGeneralInformationModel.profileImage.Image = dataUrl.replace('data:image/png;base64,', '');

                            this.updateProfileGeneralInformationModel();
                        },
                        removedfileEventHandler: (file) => {
                            this.profileGeneralInformationModel.profileImage.Image = '';

                            this.updateProfileGeneralInformationModel();
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
                    }
                };
            },
            methods: {
                updateProfileGeneralInformationModel: function () {
                    this.isBirthDateMenuOpen = false;
                    this.$emit('updateProfileGeneralInformation', this.profileGeneralInformationModel);
                }
            }
    }
</script>

<style lang="scss">

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