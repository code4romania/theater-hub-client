<template>
    <v-layout class="profile-education-layout profile-entity-layout">
        <v-flex xs12 v-if="isTimeline">

            <v-timeline-item  medium hide-dot right class="timeline-header-item">
                <v-card class="timeline-header-card elevation-2">
                    <v-card-title class="secondary-color">
                        <h3 class="timeline-header">{{ $t('pages.profile.education-title') }}</h3>
                    </v-card-title>
                </v-card>
            </v-timeline-item>

            <v-timeline-item
                :key="`education-${educationIndex}`"
                v-for="(step, educationIndex) in educationSteps"
                v-bind:class="{'timeline-message': step.inEditMode || step.inDeleteMode}"
                @mouseenter.native="step.isHovered = true" @mouseleave.native="step.isHovered = false"
                class="timeline-achievement-item"  color="primary" small fill-dot right>
                    <v-card class="elevation-2" v-if="!step.inEditMode && !step.inDeleteMode">
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex xs12>
                                   <v-layout row wrap class="profile-row-actions-container">
                                        <v-flex xs12 sm10 md10 lg10 class="timeline-item-action-row">
                                            <span class="education-title">{{ step.title }}</span>, <span class="education-institution ml-1">{{ step.institutionName }}</span>
                                        </v-flex>
                                        <v-flex xs12 sm2 md2 lg2 class="profile-row-actions" v-if="educationIndex === 0 || step.isHovered">
                                            <v-btn outline small fab class="edit-icon" v-on:click="onEditEducationStepClick(step, educationIndex)">
                                                <v-icon>edit</v-icon>
                                            </v-btn>
                                            <v-btn outline small fab class="remove-icon" v-on:click="onDeleteEducationStepClick(step, educationIndex)">
                                                <v-icon>delete</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
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
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="step.inEditMode">
                        <ProfileEducationEdit :educationStep="step"
                                    :index="educationIndex" @editEducationStep="editEducationStep"/>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="step.inDeleteMode">
                        <ProfileEducationDelete :index="educationIndex" @deleteEducationStep="deleteEducationStep"/>
                    </v-card>
            </v-timeline-item>
            <v-timeline-item  v-if="!hasEducation() && !isEditingEducation" medium hide-dot right class="timeline-message">
                <v-card class="timeline-message-card elevation-2">
                    <v-card-title>
                        {{ $t('pages.profile.no-education-message') }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item medium hide-dot class="timeline-message add-entity-timeline-item add-education-timeline-item"
                                                                            v-if="!isAddingEducationStep">
                <v-card class="timeline-message-card text-xs-center"  v-on:click.native="onAddEducationStepClick()">
                    <v-card-title>
                        <v-icon>add</v-icon>
                       {{ $t('shared.content.add-education-button') }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item medium hide-dot class="timeline-message" v-if="isAddingEducationStep">
                <v-card class="timeline-message-card elevation-2 highlighted-section">
                    <ProfileEducationAdd @addEducationStep="addEducationStep"/>
                </v-card>
            </v-timeline-item>

        </v-flex>

        <v-flex xs12 v-if="!isTimeline">

            <div :key="`education-${educationIndex}`"
                v-for="(step, educationIndex) in educationSteps"
                v-bind:class="{'timeline-message': step.inEditMode || step.inDeleteMode}"
                @mouseenter="step.isHovered = true" @mouseleave="step.isHovered = false"
                class="achievement-item"  color="primary">
                    <v-card class="elevation-2" v-if="!step.inEditMode && !step.inDeleteMode">
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex xs12>
                                   <v-layout row class="item-action-row profile-row-actions-container">
                                        <v-flex xs12 sm10 md10 lg10 class="timeline-item-action-row">
                                            <span class="education-title">{{ step.title }}</span>, <span class="education-institution ml-1">{{ step.institutionName }}</span>
                                        </v-flex>
                                        <v-flex xs12 sm2 md2 lg2 class="profile-row-actions" v-if="educationIndex === 0 || step.isHovered">
                                            <v-btn outline small fab class="edit-icon" v-on:click="onEditEducationStepClick(step, educationIndex)">
                                                <v-icon>edit</v-icon>
                                            </v-btn>
                                            <v-btn outline small fab class="remove-icon" v-on:click="onDeleteEducationStepClick(step, educationIndex)">
                                                <v-icon>delete</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
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
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="step.inEditMode">
                        <ProfileEducationEdit :educationStep="step"
                                    :index="educationIndex" @editEducationStep="editEducationStep"/>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="step.inDeleteMode">
                        <ProfileEducationDelete :index="educationIndex" @deleteEducationStep="deleteEducationStep"/>
                    </v-card>
            </div>
            <div v-if="!hasEducation && !isEditingEducation" class="timeline-message">
                <v-card class="timeline-message-card elevation-2">
                    <v-card-title>
                        {{ $t('pages.profile.no-education-message') }}
                    </v-card-title>
                </v-card>
            </div>
            <v-btn outline class="add-achievement-btn add-education-btn add-entity-btn"
                                    v-if="!isAddingEducationStep" v-on:click.native="onAddEducationStepClick()">
                <v-icon>add</v-icon> {{ $t('shared.content.add-education-button') }}
            </v-btn>
            <div class="timeline-message" v-if="isAddingEducationStep">
                <v-card class="timeline-message-card elevation-2 highlighted-section">
                    <ProfileEducationAdd @addEducationStep="addEducationStep"/>
                </v-card>
            </div>
        </v-flex>

    </v-layout>
</template>

<script>
    import moment from 'moment';
    import { Helpers } from '~/utils';
    import { ProfileSectionType } from '~/store/entities';
    import ProfileEducationAdd from '~/components/profile/profile-education-add.vue';
    import ProfileEducationEdit from '~/components/profile/profile-education-edit.vue';
    import ProfileEducationDelete from '~/components/profile/profile-education-delete.vue';

    export default {
        components: {
            ProfileEducationAdd,
            ProfileEducationEdit,
            ProfileEducationDelete
        },
        props: ['educationSteps', 'isTimeline', 'saveChanges'],
		data: function () {
            return {
                editedEducationSteps: [...this.educationSteps],
                isEditingEducation: false,
                isAddingEducationStep: false,
                isDeletingEducationStep: false
            };
        },
        methods: {
            onAddEducationStepClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true);
                this.cloneEditedEducationSteps();
                this.isAddingEducationStep = true;
            },
            onEditEducationStepClick: function (educationStep, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true);
                this.cloneEditedEducationSteps();
                this.isEditingEducation = true;
                educationStep.inEditMode = true;
            },
            onDeleteEducationStepClick: function (educationStep, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true);
                this.cloneEditedEducationSteps();
                this.isDeletingEducationStep = true;
                educationStep.inDeleteMode = true;
            },
            addEducationStep: function (educationStep) {
                let newEducationStep    = {};
                const endDate           = educationStep && educationStep.endDate ? educationStep.endDate.substr(0, 7) : undefined;

                if (educationStep) {
                    newEducationStep = {
                        title: educationStep.title,
                        institutionName: educationStep.institutionName,
                        description: educationStep.description,
                        startDate: educationStep.startDate.substr(0, 7),
                        endDate,
                        isHovered: false,
                        inEditMode: false,
                        inDeleteMode: false
                    };
                }

                if (educationStep && this.saveChanges) {
                    var request = {
                        Title: educationStep.title,
                        Institution: educationStep.institutionName,
                        Description: educationStep.description,
                        StartDate: educationStep.startDate.substr(0, 7),
                        EndDate: endDate
                    };

                    this.$store.dispatch('education/create', request).then((response) => {
                        newEducationStep.id = this.$store.state.education.newEducationStep.ID;
                        this.editedEducationSteps.push(newEducationStep);

                        this.editedEducationSteps = this.editedEducationSteps.sort((e1, e2) => new Date(e1.startDate).getTime() > new Date(e2.startDate).getTime() ? -1 : 1);

                        this.updateEducation();
                        this.showSnackbar(this.$t('pages.profile.snackbar-messages.update-education'));
                    });
                } else if (educationStep) {
                    this.editedEducationSteps.push(newEducationStep);

                    this.editedEducationSteps = this.editedEducationSteps.sort((e1, e2) => new Date(e1.startDate).getTime() > new Date(e2.startDate).getTime() ? -1 : 1);

                    this.updateEducation();
                }

                this.isAddingEducationStep = false;
                this.endEditSectionSession();
            },
            editEducationStep: function (educationStep, index) {
                let newEducationStep    = {};
                const endDate           = educationStep && educationStep.endDate ? educationStep.endDate.substr(0, 7) : undefined;

                if (educationStep) {
                    newEducationStep = {
                        title: educationStep.title,
                        institutionName: educationStep.institutionName,
                        description: educationStep.description,
                        startDate: educationStep.startDate.substr(0, 7),
                        endDate,
                        isHovered: true,
                        inEditMode: false,
                        inDeleteMode: false,
                    };
                }

                if (educationStep && this.saveChanges) {
                    var request = {
                        ID: educationStep.id,
                        Title: educationStep.title,
                        Institution: educationStep.institutionName,
                        Description: educationStep.description,
                        StartDate: educationStep.startDate.substr(0, 7),
                        EndDate: endDate
                    };

                    this.$store.dispatch('education/update', request).then(() => {
                        this.editedEducationSteps[index] = newEducationStep;

                        this.editedEducationSteps = this.editedEducationSteps.sort((e1, e2) => new Date(e1.startDate).getTime() > new Date(e2.startDate).getTime() ? -1 : 1);

                        this.updateEducation();
                        this.showSnackbar(this.$t('pages.profile.snackbar-messages.update-education'));
                    });
                } else if (educationStep) {
                        this.editedEducationSteps[index] = newEducationStep;

                        this.editedEducationSteps = this.editedEducationSteps.sort((e1, e2) => new Date(e1.startDate).getTime() > new Date(e2.startDate).getTime() ? -1 : 1);

                        this.updateEducation();
                }

                this.educationSteps.forEach(e => {
                    e.inEditMode = false;
                });
                this.isEditingEducation = false;
                this.endEditSectionSession();
            },
            deleteEducationStep: function (index) {
                if (index !== null && this.saveChanges) {
                    var id = this.editedEducationSteps[index].id;

                    this.$store.dispatch('education/delete', id).then(() => {
                        this.editedEducationSteps.splice(index, 1);

                        this.updateEducation();
                        this.showSnackbar(this.$t('pages.profile.snackbar-messages.update-education'));
                    });
                } else if (index !== null) {
                    this.editedEducationSteps.splice(index, 1);

                    this.updateEducation();
                }

                this.educationSteps.forEach(e => {
                    e.inDeleteMode = false;
                });
                this.isDeletingEducationStep = false;
                this.endEditSectionSession();
            },
            cancelAllUnsavedChanges: function () {
                this.isAddingEducationStep = false;
                this.isEditingEducation = false;
                this.isDeletingEducationStep = false;
                this.endEditSectionSession();
            },
            cloneEditedEducationSteps: function () {
                this.editedEducationSteps = Helpers.cloneObject(this.educationSteps);
            },
            initiateEditSectionSession: function (navigateToElement) {
                this.$emit('initiateEditSectionSession', navigateToElement, ProfileSectionType.Education);
            },
            endEditSectionSession: function () {
                this.$emit('endEditSectionSession', ProfileSectionType.Education);
            },
            updateEducation: function () {
                this.$emit('updateEducation', this.editedEducationSteps);
            },
            showSnackbar: function (snackbarText) {
                this.$emit('showSnackbar', snackbarText);
            },
            hasEducation: function () {
                return this.educationSteps.length !== 0;
            },
            getTimelineDate (date) {
                if (!date) {
                    return this.$t('shared.content.present');
                }

                return moment(date).format('MM/YYYY');
            }
        }
    }

</script>
