<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-layout row mb-5 :key="i" v-for="(step, i) in profileExperienceModel.experienceSteps">

                <v-flex xs12 ma-1 v-bind:class="{'editing-profile-row': step.inEditMode}">
                    <v-card class="elevation-1">
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex xs10>
                                    <span class="experience-position">{{ step.position }}</span>, <span class="experience-employer ml-1">{{ step.employerName }}</span>
                                </v-flex>
                                <v-flex xs2 class="profile-row-actions">
                                    <v-btn outline small fab class="edit-icon" v-on:click="onEditExperienceStepClick(step, i)">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab class="remove-icon" v-on:click="onRemoveExperienceStepClick(i)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12>
                                    <span class="timeline-date">{{ `${getTimelineDate(step.startDate)} - ${getTimelineDate(step.endDate)}` }}</span>
                                </v-flex>
                            </v-layout>
                            
                        </v-card-title>
                        <v-card-text v-if="step.description">
                            <p class="experience-description">
                                {{ step.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>


        <v-flex xs12 elevation-3 pa-5 ma-1>
            <v-form ref="experienceForm">
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12  class="profile-row-actions" v-if="experienceFactory.inEditMode">
                        <v-btn outline small fab class="edit-experience-step-button" v-on:click="onDoneEditExperienceStepClick" :disabled="isExperienceStepButtonDisabled()">
                            <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab class="edit-experience-step-button" v-on:click="onCancelEditExperienceStepClick">
                            <v-icon>clear</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row mt-2>
                    <v-flex xs12 sm6 md6 lg3 class="pr-2">
                        <v-text-field v-model="experienceFactory.position" :rules="experiencePositionRules" label="Position*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="px-2">
                        <v-text-field v-model="experienceFactory.employerName" :rules="employerNameRules" label="Employer name*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="date-menu-container px-2">
                        <v-menu :close-on-content-click="false" v-model="experienceFactory.isStartDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="experienceFactory.startDate" label="Start Date" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker v-model="experienceFactory.startDate" type="month" @input="experienceFactory.isStartDateMenuOpen = false">
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="date-menu-container px-2">
                        <v-menu :close-on-content-click="false" v-model="experienceFactory.isEndDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="experienceFactory.endDate" label="End Date" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker v-model="experienceFactory.endDate" type="month" @input="experienceFactory.isEndDateMenuOpen = false">
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-textarea
                        class="experience-step-description-field text-area-field"
                        v-model="experienceFactory.description"
                        auto-grow
                        box
                        label="Description"
                        rows="1"
                        counter=500
                        :rules="descriptionRules" validate-on-blur>
                    </v-textarea>
                </v-layout>
                <v-flex xs12 v-if="!experienceFactory.inEditMode">
                    <v-btn v-on:click="onAddExperienceStepClick" :disabled="isExperienceStepButtonDisabled()" block class="add-experience-step-button">
                        Add experience step
                    </v-btn>
                </v-flex>
            </v-form>
        </v-flex>
    </v-layout>
</template>


<script>
    import moment from 'moment';
    import { Helpers } from '~/utils';

    export default {
            props: ['profileExperience'],
            data: function () {
                return {
                    profileExperienceModel: Helpers.cloneObject(this.profileExperience),
                    experiencePositionRules: [
                        v => !!v || 'Position is required'
                    ],
                    employerNameRules: [
                        v => !!v || 'Employer name is required'
                    ],
                    descriptionRules: [
                        v => v === '' || v.length <= 500 || "Description's maximum length is of 500 characters"
                    ],
                    experienceFactory: {
                        position: '',
                        employerName: '',
                        description: '',
                        startDate: new Date().toISOString().substr(0, 7),
                        endDate: new Date().toISOString().substr(0, 7),
                        isValid: false,
                        isStartDateMenuOpen: false,
                        isEndDateMenuOpen: false
                    }
                };
            },
            methods: {
                updateProfileExperienceModel: function () {
                    this.$emit('updateProfileExperience', this.profileExperienceModel);
                },
                onEditExperienceStepClick: function (experienceStep, index) {
                    this.experienceFactory = {
                        ...experienceStep,
                        index,
                        inEditMode: true
                    };

                    experienceStep.inEditMode = true;
                },
                onCancelEditExperienceStepClick: function () {
                    this.profileExperienceModel.experienceSteps[this.experienceFactory.index].inEditMode = false;

                    this.updateProfileExperienceModel();

                    this.resetExperienceFactory();
                },
                onDoneEditExperienceStepClick: function () {
                    var isCurrentExperienceStepValid = this.isExperienceStepValid(this.experienceFactory);

                    if (!isCurrentExperienceStepValid) {
                        return;
                    }

                    this.profileExperienceModel.experienceSteps[this.experienceFactory.index] = {
                        ...this.experienceFactory,
                        isValid: true,
                        inEditMode: false
                    };

                    this.updateProfileExperienceModel();

                    this.resetExperienceFactory();
                },
                onRemoveExperienceStepClick: function (index) {
                    this.profileExperienceModel.experienceSteps.splice(index, 1);

                    this.updateProfileExperienceModel();
                },
                isExperienceStepValid: function (experienceStep) {
                    return experienceStep.position !== '' && experienceStep.employerName !== '';
                },
                isExperienceStepButtonDisabled: function () {
                    return !this.isExperienceStepValid(this.experienceFactory);
                },
                onAddExperienceStepClick: function () {
                    var isCurrentExperienceStepValid = this.isExperienceStepValid(this.experienceFactory);

                    if (!isCurrentExperienceStepValid) {
                        return;
                    }

                    this.profileExperienceModel.experienceSteps.push({...this.experienceFactory});

                    this.resetExperienceFactory();

                    this.updateProfileExperienceModel();
                },
                resetExperienceFactory: function () {
                    this.$refs.experienceForm.resetValidation();

                    this.experienceFactory = {
                        position: '',
                        employerName: '',
                        description: '',
                        startDate: new Date().toISOString().substr(0, 7),
                        endDate: new Date().toISOString().substr(0, 7),
                        isValid: false,
                        isStartDateMenuOpen: false,
                        isEndDateMenuOpen: false
                    };
                },
                getTimelineDate (date) {
                    return moment(date).format('MM/YYYY');
                }
            }
    }
</script>

<style lang="scss" scoped>

    .v-menu__activator > .v-text-field {
        overflow-x: hidden;
    }

</style>
