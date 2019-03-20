<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-layout row mb-5 :key="i" v-for="(step, i) in profileEducationModel.educationSteps">

                <v-flex xs12 ma-1 v-bind:class="{'editing-profile-row': step.inEditMode}">
                    <v-card class="elevation-1">
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex xs10 pt-3>
                                    <span class="education-title">{{ step.title }}</span>, <span class="education-institution ml-1">{{ step.institutionName }}</span>
                                </v-flex>
                                <v-flex xs2 class="profile-row-actions">
                                    <v-btn outline small fab class="edit-icon" v-on:click="onEditEducationStepClick(step, i)">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab class="remove-icon" v-on:click="onRemoveEducationStepClick(i)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12>
                                    <span class="timeline-date">{{ `${getTimelineDate(step.startDate)} - ${getTimelineDate(step.endDate)}` }}</span>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text v-if="step.description">
                            <p class="education-description">
                                {{ step.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                </v-flex>

            </v-layout>
        </v-flex>

        <v-flex xs12 elevation-3 pa-5 ma-1>
            <v-form ref="educationForm">
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12  class="profile-row-actions" v-if="educationFactory.inEditMode">
                        <v-btn outline small fab class="edit-education-step-button" v-on:click="onDoneEditEducationStepClick" :disabled="isEducationStepButtonDisabled()">
                            <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab class="edit-education-step-button" v-on:click="onCancelEditEducationStepClick">
                            <v-icon>clear</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row mt-2>
                    <v-flex xs12 sm6 md6 lg3 class="pr-2">
                        <v-text-field v-model="educationFactory.title" :rules="educationTitleRules"
                                :label="`${$t('fields.education.title.label')}*`" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="px-2">
                        <v-text-field v-model="educationFactory.institutionName" :rules="institutionNameRules"
                                :label="`${$t('fields.education.institution.label')}*`" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="px-2">
                        <v-menu :close-on-content-click="false" v-model="educationFactory.isStartDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="educationFactory.startDate"
                                :label="$t('fields.education.start-date.label')" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker
                                v-model="educationFactory.startDate"
                                type="month"
                                :locale="locale"
                                @input="educationFactory.isStartDateMenuOpen = false">
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="date-menu-container px-2">
                        <v-menu :close-on-content-click="false" v-model="educationFactory.isEndDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="educationFactory.endDate"
                                :label="$t('fields.education.end-date.label')" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker
                                v-model="educationFactory.endDate"
                                type="month"
                                :locale="locale"
                                @input="educationFactory.isEndDateMenuOpen = false">
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-textarea
                        class="education-step-description-field text-area-field"
                        v-model="educationFactory.description"
                        auto-grow
                        box
                        :label="$t('fields.education.description.label')"
                        rows="1"
                        counter=500
                        :rules="descriptionRules" validate-on-blur>
                    </v-textarea>
                </v-layout>
                <v-flex xs12 v-if="!educationFactory.inEditMode">
                    <v-btn v-on:click="onAddEducationStepClick" :disabled="isEducationStepButtonDisabled()" block class="add-education-step-button">
                        {{ $t('shared.content.add-education-button') }}
                    </v-btn>
                </v-flex>
            </v-form>
        </v-flex>

    </v-layout>
</template>


<script>
    import { mapGetters } from 'vuex';
    import moment from 'moment';
    import { Helpers } from '~/utils';

    export default {
            props: ['profileEducation'],
            data: function () {
                return {
                    profileEducationModel: Helpers.cloneObject(this.profileEducation),
                    educationTitleRules: [
                        v => !!v || this.$t('fields.education.title.validation-errors.required')
                    ],
                    institutionNameRules: [
                        v => !!v || this.$t('fields.education.institution.validation-errors.required')
                    ],
                    descriptionRules: [
                        v => v === '' || v.length <= 500 || this.$t('fields.education.description.validation-errors.length')
                    ],
                    educationFactory: {
                        title: '',
                        institutionName: '',
                        description: '',
                        startDate: new Date().toISOString().substr(0, 7),
                        endDate: new Date().toISOString().substr(0, 7),
                        isValid: false,
                        isStartDateMenuOpen: false,
                        isEndDateMenuOpen: false,
                        index: null,
                        inEditMode: false
                    }
                };
            },
            methods: {
                updateProfileEducationModel: function () {
                    this.$emit('updateProfileEducation', this.profileEducationModel);
                },
                onEditEducationStepClick: function (educationStep, index) {
                    this.educationFactory = {
                        ...educationStep,
                        index,
                        inEditMode: true
                    };

                    educationStep.inEditMode = true;
                    this.updateProfileEducationModel();
                },
                onCancelEditEducationStepClick: function () {
                    this.profileEducationModel.educationSteps[this.educationFactory.index].inEditMode = false;

                    this.updateProfileEducationModel();

                    this.resetEducationFactory();
                },
                onDoneEditEducationStepClick: function () {
                    var isCurrentEducationStepValid = this.isEducationStepValid(this.educationFactory);

                    if (!isCurrentEducationStepValid) {
                        return;
                    }

                    this.profileEducationModel.educationSteps[this.educationFactory.index] = {
                        ...this.educationFactory,
                        isValid: true,
                        inEditMode: false
                    };

                    this.updateProfileEducationModel();

                    this.resetEducationFactory();
                },
                onRemoveEducationStepClick: function (index) {
                    this.profileEducationModel.educationSteps.splice(index, 1);

                    this.updateProfileEducationModel();
                },
                isEducationStepValid: function (educationStep) {
                    return educationStep.title !== '' && educationStep.institutionName !== '';
                },
                isEducationStepButtonDisabled: function () {
                    return !this.isEducationStepValid(this.educationFactory);
                },
                onAddEducationStepClick: function () {
                    var isCurrentEducationStepValid = this.isEducationStepValid(this.educationFactory);

                    if (!isCurrentEducationStepValid) {
                        return;
                    }

                    this.profileEducationModel.educationSteps.push({ ...this.educationFactory });

                    this.resetEducationFactory();

                    this.updateProfileEducationModel();
                },
                resetEducationFactory: function () {
                    this.$refs.educationForm.resetValidation();

                    this.educationFactory = {
                        title: '',
                        institutionName: '',
                        description: '',
                        startDate: new Date().toISOString().substr(0, 7),
                        endDate: new Date().toISOString().substr(0, 7),
                        isValid: false,
                        isStartDateMenuOpen: false,
                        isEndDateMenuOpen: false,
                        index: null,
                        inEditMode: false
                    };
                },
                getTimelineDate (date) {
                    return moment(date).format('MM/YYYY');
                }
            },
            computed: {
                ...mapGetters({
                    locale: 'locale'
                })
            }
    }
</script>

<style lang="scss" scoped>

    .v-menu__activator > .v-text-field {
        overflow-x: hidden;
    }

</style>
