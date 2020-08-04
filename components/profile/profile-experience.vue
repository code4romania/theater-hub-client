<template>
    <v-layout class="profile-experience-layout profile-entity-layout">
        <v-flex xs12 v-if="isTimeline">

            <v-timeline-item medium hide-dot right class="timeline-header-item">
                <v-card class="timeline-header-card elevation-2">
                    <v-card-title class="secondary-color">
                        <h3 class="timeline-header">{{ $t('pages.profile.experience-title') }}</h3>
                    </v-card-title>
                </v-card>
            </v-timeline-item>

            <v-timeline-item
                :key="`experience-${experienceIndex}`"
                v-for="(step, experienceIndex) in experienceSteps"
                v-bind:class="{'timeline-message': step.inEditMode || step.inDeleteMode}"
                @mouseenter.native="step.isHovered = true" @mouseleave.native="step.isHovered = false"
                class="timeline-achievement-item" color="primary" small fill-dot right>
                    <v-card class="elevation-2" v-if="!step.inEditMode && !step.inDeleteMode">
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-layout class="profile-row-actions-container">
                                        <v-flex xs12 sm10 md10 lg10 class="timeline-item-action-row">
                                            <span class="experience-position">{{ step.position }}</span>, <span class="experience-employer ml-1">{{ step.employerName }}</span>
                                        </v-flex>
                                        <v-flex xs12 sm2 md2 lg2 class="profile-row-actions" v-if="experienceIndex === 0 || step.isHovered">
                                            <v-btn outline small fab class="edit-icon" v-on:click="onEditExperienceStepClick(step, experienceIndex)">
                                                <v-icon>edit</v-icon>
                                            </v-btn>
                                            <v-btn outline small fab class="remove-icon" v-on:click="onDeleteExperienceStepClick(step, experienceIndex)">
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
                            <p class="experience-description">
                                {{ step.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="step.inEditMode">
                        <ProfileExperienceEdit :experienceStep="step"
                                        :index="experienceIndex" @editExperienceStep="editExperienceStep" />
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="step.inDeleteMode">
                        <ProfileExperienceDelete :index="experienceIndex" @deleteExperienceStep="deleteExperienceStep"/>
                    </v-card>
            </v-timeline-item>
            <v-timeline-item  v-if="!hasExperience() && !isEditingExperience" medium hide-dot right class="timeline-message">
                <v-card class="timeline-message-card elevation-2">
                    <v-card-title>
                        {{ $t('pages.profile.no-experience-message') }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item medium hide-dot class="timeline-message add-entity-timeline-item"
                v-if="!isAddingExperienceStep">
                <v-card class="timeline-message-card text-xs-center"  v-on:click.native="onAddExperienceStepClick()">
                    <v-card-title>
                        <v-icon>add</v-icon>
                       {{ $t('shared.content.add-experience-button') }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item medium hide-dot class="timeline-message" v-if="isAddingExperienceStep">
                <v-card class="timeline-message-card elevation-2 highlighted-section">
                    <ProfileExperienceAdd @addExperienceStep="addExperienceStep"/>
                </v-card>
            </v-timeline-item>
            
        </v-flex>

        <v-flex xs12 v-if="!isTimeline">

            <div :key="`experience-${experienceIndex}`"
                v-for="(step, experienceIndex) in experienceSteps"
                v-bind:class="{'timeline-message': step.inEditMode || step.inDeleteMode}"
                @mouseenter="step.isHovered = true" @mouseleave="step.isHovered = false"
                class="achievement-item" color="primary">
                    <v-card class="elevation-2" v-if="!step.inEditMode && !step.inDeleteMode">
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-layout row class="item-action-row profile-row-actions-container">
                                        <v-flex xs12 sm10 md10 lg10 class="timeline-item-action-row">
                                            <span class="experience-position">{{ step.position }}</span>, <span class="experience-employer ml-1">{{ step.employerName }}</span>
                                        </v-flex>
                                        <v-flex xs12 sm2 md2 lg2 class="profile-row-actions" v-if="experienceIndex === 0 || step.isHovered">
                                            <v-btn outline small fab class="edit-icon" v-on:click="onEditExperienceStepClick(step, experienceIndex)">
                                                <v-icon>edit</v-icon>
                                            </v-btn>
                                            <v-btn outline small fab class="remove-icon" v-on:click="onDeleteExperienceStepClick(step, experienceIndex)">
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
                            <p class="experience-description">
                                {{ step.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="step.inEditMode">
                        <ProfileExperienceEdit :experienceStep="step"
                                        :index="experienceIndex" @editExperienceStep="editExperienceStep" />
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="step.inDeleteMode">
                        <ProfileExperienceDelete :index="experienceIndex" @deleteExperienceStep="deleteExperienceStep"/>
                    </v-card>
            </div>
            <div v-if="!hasExperience && !isEditingExperience" class="timeline-message">
                <v-card class="timeline-message-card elevation-2">
                    <v-card-title>
                        {{ $t('pages.profile.no-experience-message') }}
                    </v-card-title>
                </v-card>
            </div>
            <v-btn outline class="add-achievement-btn add-experience-btn add-entity-btn"
                                    v-if="!isAddingExperienceStep" v-on:click.native="onAddExperienceStepClick()">
                <v-icon>add</v-icon> {{ $t('shared.content.add-experience-button') }}
            </v-btn>
            <div class="timeline-message" v-if="isAddingExperienceStep">
                <v-card class="timeline-message-card elevation-2 highlighted-section">
                    <ProfileExperienceAdd @addExperienceStep="addExperienceStep"/>
                </v-card>
            </div>

        </v-flex>

    </v-layout>
</template>


<script>
    import moment from 'moment';
    import { Helpers } from '~/utils';
    import { ProfileSectionType } from '~/store/entities';
    import ProfileExperienceAdd from '~/components/profile/profile-experience-add.vue';
    import ProfileExperienceEdit from '~/components/profile/profile-experience-edit.vue';
    import ProfileExperienceDelete from '~/components/profile/profile-experience-delete.vue';

    export default {
        components: {
            ProfileExperienceAdd,
            ProfileExperienceEdit,
            ProfileExperienceDelete
        },
        props: ['experienceSteps', 'isTimeline', 'saveChanges'],
		data: function () {
            return {
                editedExperienceSteps: [...this.experienceSteps],
                isEditingExperience: false,
                isAddingExperienceStep: false,
                isDeletingExperienceStep: false
            };
        },
        methods: {
            onAddExperienceStepClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true);
                this.cloneEditedExperienceSteps();
                this.isAddingExperienceStep = true;
            },
            onEditExperienceStepClick: function (experienceStep, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true);
                this.cloneEditedExperienceSteps();
                this.isEditingExperience = true;
                experienceStep.inEditMode = true;
            },
            onDeleteExperienceStepClick: function (experienceStep, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true);
                this.cloneEditedExperienceSteps();
                this.isDeletingExperienceStep = true;
                experienceStep.inDeleteMode = true;
            },
            addExperienceStep: function (experienceStep) {
                let newExperienceStep   = {};
                const endDate           = experienceStep && experienceStep.endDate ? experienceStep.endDate.substr(0, 7) : undefined;

                if (experienceStep) {
                    newExperienceStep = {
                        position: experienceStep.position,
                        employerName: experienceStep.employerName,
                        description: experienceStep.description,
                        startDate: experienceStep.startDate.substr(0, 7),
                        endDate,
                        isHovered: false,
                        inEditMode: false,
                        inDeleteMode: false
                    };
                }

                if (experienceStep && this.saveChanges) {
                    var request = {
                        Position: experienceStep.position,
                        Employer: experienceStep.employerName,
                        Description: experienceStep.description,
                        StartDate: experienceStep.startDate.substr(0, 7),
                        EndDate: endDate
                    };

                    this.$store.dispatch('experience/create', request).then((response) => {
                        newExperienceStep.id = this.$store.state.experience.newExperienceStep.ID;

                        this.editedExperienceSteps.push(newExperienceStep);

                        this.editedExperienceSteps = this.editedExperienceSteps.sort((e1, e2) => new Date(e1.startDate).getTime() > new Date(e2.startDate).getTime() ? -1 : 1);

                        this.updateExperience();
                        this.showSnackbar(this.$t('pages.profile.snackbar-messages.update-experience'));
                    });
                } else if (experienceStep) {
                    this.editedExperienceSteps.push(newExperienceStep);

                    this.editedExperienceSteps = this.editedExperienceSteps.sort((e1, e2) => new Date(e1.startDate).getTime() > new Date(e2.startDate).getTime() ? -1 : 1);

                    this.updateExperience();
                }

                this.isAddingExperienceStep = false;
                this.endEditSectionSession();
            },
            editExperienceStep: function (experienceStep, index) {
                let newExperienceStep   = {};
                const endDate           = experienceStep && experienceStep.endDate ? experienceStep.endDate.substr(0, 7) : undefined;

                if (experienceStep) {
                    newExperienceStep = {
                        position: experienceStep.position,
                        employerName: experienceStep.employerName,
                        description: experienceStep.description,
                        startDate: experienceStep.startDate.substr(0, 7),
                        endDate,
                        isHovered: true,
                        inEditMode: false,
                        inDeleteMode: false
                    };
                }

                if (experienceStep && this.saveChanges) {
                    var request = {
                        ID: experienceStep.id,
                        Position: experienceStep.position,
                        Employer: experienceStep.employer,
                        Description: experienceStep.description,
                        StartDate: experienceStep.startDate.substr(0, 7),
                        EndDate: endDate
                    };

                    this.$store.dispatch('experience/update', request).then(() => {
                        this.editedExperienceSteps[index] = newExperienceStep;

                        this.editedExperienceSteps = this.editedExperienceSteps.sort((e1, e2) => new Date(e1.startDate).getTime() > new Date(e2.startDate).getTime() ? -1 : 1);

                        this.updateExperience();
                        this.showSnackbar(this.$t('pages.profile.snackbar-messages.update-experience'));
                    });
                } else if (experienceStep) {
                        this.editedExperienceSteps[index] = newExperienceStep;

                        this.editedExperienceSteps = this.editedExperienceSteps.sort((e1, e2) => new Date(e1.startDate).getTime() > new Date(e2.startDate).getTime() ? -1 : 1);

                        this.updateExperience();
                }

                this.experienceSteps.forEach(e => {
                    e.inEditMode = false;
                });
                this.isEditingExperience = false;
                this.endEditSectionSession();
            },
            deleteExperienceStep: function (index) {
                if (index !== null && this.saveChanges) {
                    var id = this.editedExperienceSteps[index].id;

                    this.$store.dispatch('experience/delete', id).then(() => {
                        this.editedExperienceSteps.splice(index, 1);

                        this.updateExperience();
                        this.showSnackbar(this.$t('pages.profile.snackbar-messages.update-experience'));
                    });
                } else if (index !== null) {
                    this.editedExperienceSteps.splice(index, 1);

                    this.updateExperience();
                }

                this.experienceSteps.forEach(e => {
                    e.inDeleteMode = false;
                });
                this.isDeletingExperienceStep = false;
                this.endEditSectionSession();
            },
            cancelAllUnsavedChanges: function () {
                this.isAddingExperienceStep = false;
                this.isEditingExperience = false;
                this.isDeletingExperienceStep = false;
                this.endEditSectionSession();
            },
            cloneEditedExperienceSteps: function () {
                this.editedExperienceSteps = Helpers.cloneObject(this.experienceSteps);
            },
            initiateEditSectionSession: function (navigateToElement) {
                this.$emit('initiateEditSectionSession', navigateToElement, ProfileSectionType.Experience);
            },
            endEditSectionSession: function () {
                this.$emit('endEditSectionSession', ProfileSectionType.Experience);
            },
            updateExperience: function () {
                this.$emit('updateExperience', this.editedExperienceSteps);
            },
            showSnackbar: function (snackbarText) {
                this.$emit('showSnackbar', snackbarText);
            },
            hasExperience: function () {
                return this.experienceSteps.length !== 0;
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

<style lang="scss" scoped>

</style>
