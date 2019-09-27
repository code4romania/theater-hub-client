<template>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg12 mt-5 mb-3>
            <dropzone
                id="project-image-dropzone"
                ref="projectImageDropzone"
                :options="projectImageDropzoneOptions"
                :destroyDropzone="true"
                :duplicateCheck="true">
                    <div
                        class="dz-message"
                        data-dz-message>
                            <span>{{ $t('fields.project-photo-dropzone.label') }}</span>
                    </div>
            </dropzone>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 mb-3>
            <v-layout align-center row wrap>
                <v-flex xs12>
                    <v-flex xs12>
                        <v-text-field
                            v-model="generalInformation.Name"
                            :rules="projectNameRules"
                            :label="`${$t('fields.project-name.label')}*`"
                            @input="updateProjectGeneralInformationModel"
                            validate-on-blur required>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            id="city-input"
                            placeholder=""
                            v-model="generalInformation.City"
                            :rules="cityRules"
                            :label="`${$t('fields.city.label')}*`"
                            @input="updateProjectGeneralInformationModel"
                            validate-on-blur required>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 class="project-date-container">
                        <v-menu
                            attach left
                            :close-on-content-click="false"
                            v-model="isProjectDateMenuOpen"
                            lazy transition="scale-transition"
                            offset-y full-width
                            max-width="290px" min-width="290px">
                            <v-text-field
                                slot="activator"
                                v-model="generalInformation.Date"
                                :label="`${$t('fields.project-date.label')}*`"
                                prepend-icon="event"
                                readonly>
                            </v-text-field>
                            <v-date-picker
                                v-model="generalInformation.Date"
                                @input="updateProjectGeneralInformationModel"
                                :locale="locale"
                                :allowed-dates="allowedDates">
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea
                            id="project-description-field text-area-field"
                            v-model="generalInformation.Description"
                            @input="updateProjectGeneralInformationModel"
                            auto-grow
                            box
                            :label="$t('fields.description.label')"
                            rows="1"
                            counter=5000
                            :rules="descriptionRules"
                            validate-on-blur>
                        </v-textarea>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            v-model="generalInformation.PhoneNumber"
                            @input="updateProjectGeneralInformationModel"
                            :rules="phoneNumberRules"
                            :label="$t('fields.phone-number.label')"
                            validate-on-blur
                            required>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            v-model="generalInformation.Email"
                            @input="updateProjectGeneralInformationModel"
                            :rules="emailRules"
                            :label="$t('fields.email.label')"
                            validate-on-blur
                            required>
                        </v-text-field>
                    </v-flex>
                    <v-layout>
                        <v-flex xs12 sm10 md10 lg10>
                            <v-text-field
                                v-model="generalInformation.Budget"
                                @input="updateProjectGeneralInformationModel"
                                :rules="budgetRules"
                                :label="$t('fields.budget.label')"
                                validate-on-blur
                                required>
                            </v-text-field>
                        </v-flex>
                        <v-flex
                            xs12 sm2 md2 lg2
                            class="currency-container">
                            <v-select
                                attach
                                v-model="generalInformation.Currency"
                                @input="updateProjectGeneralInformationModel"
                                :items="currencyItems"
                                :label="$t('fields.currency.label')"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="project-section-visibility-row mt-4">
                        <span class="field-title">{{ $t('shared.content.project-visibility') }}</span>
                        <v-radio-group
                            v-model="generalInformation.Visibility"
                            @change="updateProjectGeneralInformationModel"
                            row
                            class="ml-3 mt-0 pt-0 pl-2">
                            <v-layout row wrap>
                                <v-flex xs12 mb-2>
                                    <v-radio :key="0" :value="0" :label="$t('application-data.everyone')"></v-radio>
                                </v-flex>
                                <v-flex xs12 mb-2>
                                    <v-radio :key="1" :value="1" :label="$t('application-data.community')"></v-radio>
                                </v-flex>
                                <v-flex xs12 mb-2>
                                    <v-radio :key="2" :value="2" :label="$t('application-data.private')"></v-radio>
                                </v-flex>
                            </v-layout>
                        </v-radio-group>
                    </v-layout>
                    <v-layout
                        v-if="projectTags"
                        column
                    >
                        <v-flex xs12>
                            <span class="label">{{ $t('pages.project.tags') }}</span>
                        </v-flex>
                        <v-flex xs12>
                            <v-checkbox
                                :key="index"
                                v-for="(tag, index) in projectTags"
                                v-model="generalInformation.Tags"
                                :label="$t(`application-data.${tag.ID.toLowerCase()}`)"
                                :value="tag.ID"
                                class="tag-checkbox"
                                @change="updateProjectGeneralInformationModel"
                            ></v-checkbox>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import Dropzone from 'nuxt-dropzone';
    import { mapGetters } from 'vuex';
    import { getConfig } from '~/config/env';
    import { Helpers, Validators } from '~/utils';

    import 'nuxt-dropzone/dropzone.css';

    export default {
        components: {
            Dropzone
        },
        props: ['projectGeneralInformation'],
        head () {
            if (window.google) {
                return [];
            }

            return {
                script: [
                    {
                        src: `https://maps.googleapis.com/maps/api/js?key=${getConfig().google.placeAutocomplete.api_key}&libraries=places`
                    }
                ]
            };
        },
        data: function () {
            return {
                generalInformation: Helpers.cloneObject(this.projectGeneralInformation),
                projectNameRules: [
                    v => !!v || this.$t('fields.project-name.validation-errors.required'),
                    v => v.length <= 100 || this.$t('fields.project-name.validation-errors.length')
                ],
                isProjectDateMenuOpen: false,
                phoneNumberRules: [
                    v => v.length === 0 ||
                        Validators.isValidPhoneNumber(v) ||
                        this.$t('fields.phone-number.validation-errors.invalid')
                ],
                emailRules: [
                    v => v.length <= 100 || this.$t('fields.email.validation-errors.length'),
                    v => v.length === 0 ||
                        Validators.isValidEmailAddress(v) ||
                        this.$t('fields.email.validation-errors.invalid')
                ],
                cityRules: [
                    v => !!v || this.$t('fields.city.validation-errors.required'),
                    v => v.length <= 100 || this.$t('fields.city.validation-errors.length')
                ],
                budgetRules: [
                    v => v.length === 0 ||
                        Validators.isValidBudget(+v) ||
                        this.$t('fields.budget.validation-errors.invalid')
                ],
                descriptionRules: [
                    v => !v || v.length <= 5000 || this.$t('fields.project-description.validation-errors.length')
                ],
                projectImageDropzoneOptions: {
                    url: '/',
                    maxFilesize: 5,
                    maxFiles: 1,
                    addRemoveLinks: true,
                    autoProcessQueue: false,
                    dictRemoveFile: this.$t('fields.project-photo-dropzone.photo-remove-button'),
                    acceptedMimeTypes: 'image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon',
                    initializeProjectImage: (dropzone) => {
                        if (this.generalInformation.Image && this.generalInformation.Image.ThumbnailLocation) {
                            var projectImage    = this.generalInformation.Image || {};
                            var file            = { url: projectImage.ThumbnailLocation, size: projectImage.Size * 1000 * 1000 };
                            dropzone.emit('addedfile', file);
                            dropzone.emit('thumbnail', file, file.url);
                            dropzone.createThumbnailFromUrl(file, file.url, null, null);
                            dropzone.emit('complete', file);
                            dropzone.files.push(file);
                        }
                    },
                    addFileEventHandler: (file) => {
                        this.generalInformation.Image = {
                            File: file
                        };

                        this.updateProjectGeneralInformationModel();
                    },
                    removedfileEventHandler: (file) => {
                        this.generalInformation.Image = null;

                        this.updateProjectGeneralInformationModel();
                    },
                    thumbnailWidth: 200,
                    thumbnailHeight: 200,
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

                        this.options.initializeProjectImage(this);
                    }
                },
                autocompleteService: null
            }
        },
        computed: {
            ...mapGetters({
                locale: 'locale',
                currencies: 'applicationData/currencies',
                projectTags: 'applicationData/projectTags'
            }),
            currencyItems: function () {
                return this.currencies.map(c => c.ID);
            }
        },
        methods: {
            allowedDates: function (dateLiteral) {
                const date          = new Date(dateLiteral);
                const currentDate   = new Date();

                return date >= currentDate;
            },
            updateProjectGeneralInformationModel: function () {
                this.isProjectDateMenuOpen = false;
                this.$emit('updateProjectGeneralInformation', this.generalInformation);
            }
        },
        mounted: function () {
            const autocompleteServiceInterval = setInterval(() => {
                if (this.autocompleteService) {
                    clearInterval(autocompleteServiceInterval);
                }

                const google = window.google;

                if (!google) {
                    return;
                }

                this.autocompleteService = new google.maps.places.Autocomplete(
                    (document.getElementById('city-input')),
                    {types: ['(cities)']}
                );

                var $this = this;

                google.maps.event.addListener(this.autocompleteService, 'place_changed', function () {
                    $this.generalInformation.City = $this.autocompleteService.getPlace().formatted_address;
                    $this.updateProjectGeneralInformationModel();
                });
            }, 100);

            this.$store.dispatch('projects/setCreateProjectErrors', []);

            if (this.currencyItems.length !== 0) {
                this.generalInformation.Currency = this.currencyItems[0];
            }

            if (!this.generalInformation.projectDate) {
                this.generalInformation.Date =
                        new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
                        .toISOString()
                        .substr(0, 10);
            }
        }
    }

</script>

<style lang="scss">


    #project-image-dropzone {
        width: 200px;
        height: 200px;
        padding: 0px;

        .dz-progress {
            display: none;
        }

        img {
            width: 100%;
            max-height: 168px;
            max-width: 168px;
        }

    }

    #city-input::placeholder {
        opacity: 0;
        color: #FFF;
    }

    .project-date-container {

        .v-menu__content {
            top: 350px !important;
        }
    }

    .currency-container {
        padding-left: 10px;

        .v-menu__content {
            left: -2px !important;
            top: 0px !important;
        }
    }

    .project-section-visibility-row .v-input__control {
        width: 100%;
    }

    .tag-checkbox {
        display: inline-block;
        margin-right: 20px;
    }

</style>
