<template>
    <section
        class="create-project-section mt-5">
        <v-container id="create-project-container" class="main-container pa-1">

            <v-stepper v-model="wizardStep" vertical>

              <v-stepper-step :complete="wizardStep > 1" step="1">{{ $t('pages.create-project.steps.general.title') }}</v-stepper-step>

              <v-stepper-content step="1" class="pl-5">
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
                                            v-model="projectName"
                                            :rules="projectNameRules"
                                            :label="`${$t('fields.project-name.label')}*`"
                                            validate-on-blur required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            id="city-input"
                                            placeholder=""
                                            v-model="city"
                                            :rules="cityRules"
                                            :label="`${$t('fields.city.label')}*`"
                                            v-on:keyup="handleCitySearch($event)"
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
                                                v-model="projectDate"
                                                :label="`${$t('fields.project-date.label')}*`"
                                                prepend-icon="event"
                                                readonly>
                                            </v-text-field>
                                            <v-date-picker
                                                v-model="projectDate"
                                                @input="updateProjectDate"
                                                :locale="locale"
                                                :allowed-dates="allowedDates">
                                            </v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea
                                            id="project-description-field text-area-field"
                                            v-model="description"
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
                                            v-model="phoneNumber"
                                            :rules="phoneNumberRules"
                                            :label="$t('fields.phone-number.label')"
                                            validate-on-blur
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            v-model="email"
                                            :rules="emailRules"
                                            :label="$t('fields.email.label')"
                                            validate-on-blur
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-layout>
                                        <v-flex xs12 sm10 md10 lg10>
                                            <v-text-field
                                                v-model="budget"
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
                                                v-model="currency"
                                                :items="currencyItems"
                                                :label="$t('fields.currency.label')"
                                            ></v-select>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap class="section-visibility-row mt-4">
                                        <span class="field-title">{{ $t('shared.content.project-visibility') }}</span>
                                        <v-radio-group
                                            v-model="projectVisibility"
                                            row
                                            class="ml-3 mt-0 pt-0 pl-2">
                                            <v-layout row wrap>
                                                <v-flex xs12 md4 lg4 mb-2>
                                                    <v-radio :key="0" :value="0" :label="$t('application-data.everyone')"></v-radio>
                                                </v-flex>
                                                <v-flex xs12 md4 lg4 mb-2>
                                                    <v-radio :key="1" :value="1" :label="$t('application-data.community')"></v-radio>
                                                </v-flex>
                                                <v-flex xs12 md4 lg4 mb-2>
                                                    <v-radio :key="2" :value="2" :label="$t('application-data.private')"></v-radio>
                                                </v-flex>
                                            </v-layout>
                                        </v-radio-group>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 my-5>
                            <v-btn color="primary" @click="wizardStep = 2" :disabled="!isWizardStepValid()">
                                {{ $t('shared.content.next-button') }}
                            </v-btn>
                        </v-flex>
                    </v-layout>
              </v-stepper-content>

              <v-stepper-step :complete="wizardStep > 2" step="2">{{ $t('pages.create-project.steps.needs.title') }}</v-stepper-step>

              <v-stepper-content step="2" class="pl-5">
                  <v-layout row wrap class="pl-2 pb-5">
                        <ProjectNeeds
                            :needs="projectNeeds.needs"
                            :isTimeline="false"
                            :saveChanges="false"
                            @initiateEditSectionSession="initiateEditSectionSession"
                            @endEditSectionSession="endEditSectionSession"
                            @updateNeeds="updateProjectNeeds" />

                       <v-flex xs12 my-5>
                           <v-btn flat @click="wizardStep = 1">{{ $t('shared.content.back-button') }}</v-btn>
                           <v-btn
                                color="primary"
                                @click="createProject"
                                :disabled="isProcessing">
                                    {{ $t('shared.content.finish-button') }}
                           </v-btn>
                       </v-flex>
                       <v-flex v-if="projects.createProjectErrors">
                           <ServerSideErrors :errors="projects.createProjectErrors"/>
                       </v-flex>
                  </v-layout>
              </v-stepper-content>
			</v-stepper>


        </v-container>
    </section>
</template>


<script>
import { HtmlHelpers, Validators } from '~/utils';
import { mapGetters, mapState } from 'vuex';
import ProjectNeeds from '~/components/project/project-needs.vue';
import Dropzone from 'nuxt-dropzone';
import ServerSideErrors from '~/components/errors/server-side-errors.vue';
import { getConfig } from '~/config/env';

import 'nuxt-dropzone/dropzone.css';

export default {
    components: {
        Dropzone,
        ProjectNeeds,
        ServerSideErrors
    },
    layout: 'user',
    middleware: ['authenticated', 'enabled', 'user'],
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
            wizardStep: 1,
            projectVisibility: 0,
            projectName: '',
            projectNameRules: [
                v => !!v || this.$t('fields.project-name.validation-errors.required'),
                v => v.length <= 100 || this.$t('fields.project-name.validation-errors.length')
            ],
            isProjectDateMenuOpen: false,
            projectDate: '',
            phoneNumber: '',
            phoneNumberRules: [
                v => v.length === 0 ||
                     Validators.isValidPhoneNumber(v) ||
                     this.$t('fields.phone-number.validation-errors.invalid')
            ],
            email: '',
            emailRules: [
                v => v.length <= 100 || this.$t('fields.email.validation-errors.length'),
                v => v.length === 0 ||
                     Validators.isValidEmailAddress(v) ||
                     this.$t('fields.email.validation-errors.invalid')
            ],
            city: '',
            cityRules: [
                v => !!v || this.$t('fields.city.validation-errors.required'),
                v => v.length <= 100 || this.$t('fields.city.validation-errors.length')
            ],
            budget: '',
            budgetRules: [
                v => v.length === 0 ||
                     Validators.isValidBudget(+v) ||
                     this.$t('fields.budget.validation-errors.invalid')
            ],
            currency: '',
            description: '',
            descriptionRules: [
                v => !v || v.length <= 5000 || this.$t('fields.project-description.validation-errors.length')
            ],
            projectNeeds: {
                needs: []
            },
            isProcessing: false,
            citySearchToken: '',
            projectImageDropzoneOptions: {
                url: '/',
                maxFilesize: 5,
                maxFiles: 1,
                addRemoveLinks: true,
                autoProcessQueue: false,
                dictRemoveFile: this.$t('fields.project-photo-dropzone.photo-remove-button'),
                acceptedMimeTypes: 'image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon',
                initializeProjectImage: (dropzone) => {
                    if (this.projectImage && this.projectImage.ThumbnailLocation) {
                        var projectImage    = this.projectImage || {};
                        var file            = { url: projectImage.ThumbnailLocation, size: projectImage.Size * 1000 * 1000 };
                        dropzone.emit('addedfile', file);
                        dropzone.emit('thumbnail', file, file.url);
                        dropzone.createThumbnailFromUrl(file, file.url, null, null);
                        dropzone.emit('complete', file);
                        dropzone.files.push(file);
                    }
                },
                addFileEventHandler: (file) => {
                    this.projectImage = {
                        File: file
                    };
                },
                removedfileEventHandler: (file) => {
                    this.projectImage.Location = '';
                    this.projectImage.ThumbnailLocation = '';
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
	methods: {
        updateProjectDate: function () {
            this.isProjectDateMenuOpen = false;
        },
        allowedDates: function (dateLiteral) {
            const date          = new Date(dateLiteral);
            const currentDate   = new Date();

            return date >= currentDate;
        },
        isWizardStepValid: function () {
            switch (this.wizardStep) {
                case 1:
                    return this.projectName && this.projectName.length <= 100 &&
                         (!this.phoneNumber || Validators.isValidPhoneNumber(this.phoneNumber)) &&
                         (!this.email || Validators.isValidEmailAddress(this.email)) &&
                         this.city && this.city.length <= 100 &&
                         (!this.budget || Validators.isValidBudget(+this.budget)) &&
                         (!this.description || this.description.length <= 500)
                default:
                    return true;
            }
        },
        updateProjectNeeds: function (editedNeeds) {
            this.projectNeeds.needs = [...editedNeeds];
        },
        async createProject () {
            if (this.isProcessing) {
                return;
            }
            this.isProcessing = true;

            var createProjectFormData = new FormData();

            const needs = JSON.stringify(this.projectNeeds.needs.map(n => {
                return {
                    Description: n.description,
                    IsMandatory: n.isMandatory
                };
            }));

            const image         = this.projectImage && this.projectImage.File ? this.projectImage.File : null;
            const email         = this.email || '';
            const phoneNumber   = this.phoneNumber || '';
            let city            = this.city;

            if (this.autocompleteService && this.autocompleteService.getPlace()) {
                city = this.autocompleteService.getPlace().formatted_address;
            }

            createProjectFormData.append('Image', image);
            createProjectFormData.append('Name', this.projectName);
            createProjectFormData.append('Description', this.description);
            createProjectFormData.append('Email', email);
            createProjectFormData.append('PhoneNumber', phoneNumber);
            createProjectFormData.append('Date', this.projectDate);
            createProjectFormData.append('Budget', this.budget);
            createProjectFormData.append('Currency', this.currency);
            createProjectFormData.append('City', city);
            createProjectFormData.append('Visibility', this.projectVisibility);
            createProjectFormData.append('Needs', needs);
            createProjectFormData.append('DateCreated', new Date());

            await this.$store.dispatch('projects/create', createProjectFormData)
                .then(() => {
                    this.isProcessing = false;
                    if (!this.projects.createProjectErrors || this.projects.createProjectErrors.length === 0) {
                        this.$router.push({ path: `/project/${this.projects.newProject.ID}` });
                    }
                });
        },
        initiateEditSectionSession (navigateToElement, projectSection) {
            this.$store.dispatch('users/initiateEditSectionSession');

            if (navigateToElement) {
                setTimeout(() => {
                    var element = document.getElementsByClassName('highlighted-section')[0];

                    if (!HtmlHelpers.isVerticallyFullyInViewport(element)) {
                        HtmlHelpers.scrollToElement(element);
                    }
                }, 0);
            }
        },
        endEditSectionSession (projectSection) {
            this.$store.dispatch('users/endEditSectionSession');
        },
        async handleCitySearch ($event) {

        }
	},
    computed: {
        ...mapState([ 'projects' ]),
        ...mapGetters({
            locale: 'locale',
            currencies: 'applicationData/currencies'
        }),
        currencyItems: function () {
            return this.currencies.map(c => c.ID);
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
        }, 100);

        this.$store.dispatch('projects/setCreateProjectErrors', []);

        if (this.currencyItems.length !== 0) {
            this.currency = this.currencyItems[0];
        }

        this.projectDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
                            .toISOString()
                            .substr(0, 10);
    }
}

</script>

<style lang="scss">

    .create-project-section {

        .create-account-success {
            font-size: 20px;
        }

        .v-stepper, .v-stepper__header {
            box-shadow: none;
            -webkit-box-shadow: none;
        }
    }

    #project-image-dropzone {
        width: 200px;
        height: 200px;
        padding: 0px;

        .dz-progress {
            display: none;
        }

        img {
            width: 100%;
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

    #create-project-container .section-visibility-row .v-input__control {
        width: 100%;
    }

</style>