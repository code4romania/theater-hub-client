<template>
    <v-layout class="project-needs-layout project-entity-layout">

        <v-flex xs12 v-if="isTimeline">

            <v-timeline-item
                :key="`need-${needIndex}`"
                v-for="(need, needIndex) in needs"
                v-bind:class="{'timeline-message': need.inEditMode || need.inDeleteMode}"
                @mouseenter.native="need.isHovered = true"  @mouseleave.native="need.isHovered = false"
                color="primary" small fill-dot right>
                    <v-card class="elevation-2" v-if="!need.inEditMode && !need.inDeleteMode">
                        <v-card-title>
                            <v-layout row class="timeline-item-action-row project-row-actions-container">
                                <v-flex xs12 sm2 md2 lg2 class="project-row-actions" v-if="needIndex === 0 || need.isHovered">
                                    <v-btn outline small fab class="edit-icon" v-on:click="onEditNeedClick(need, needIndex)">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab class="remove-icon" v-on:click="onDeleteNeedClick(need, needIndex)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text v-if="need.description">
                            <p class="need-description">
                                {{ need.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="need.inEditMode">
                        <ProjectNeedEdit :need="need" :index="needIndex" @editNeed="editNeed"/>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="need.inDeleteMode">
                        <ProjectNeedDelete :index="needIndex" @deleteNeed="deleteNeed"/>
                    </v-card>
            </v-timeline-item>
            <v-timeline-item  v-if="!hasNeeds() && !isEditingNeeds" medium hide-dot class="timeline-message">
                <v-card class="timeline-message-card elevation-2">
                    <v-card-title>
                        {{ $t('pages.project.no-needs-message') }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item medium hide-dot class="timeline-message"
                v-if="!isAddingNeed">
                <v-card class="timeline-message-card text-xs-center" v-on:click.native="onAddNeedClick()">
                    <v-card-title>
                        <v-icon>add</v-icon>
                       {{ $t('shared.content.add-need-button') }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item medium hide-dot class="timeline-message" v-if="isAddingNeed">
                <v-card class="timeline-message-card elevation-2 highlighted-section">
                    <ProjectNeedAdd @addNeed="addNeed"/>
                </v-card>
            </v-timeline-item>
        </v-flex>

        <v-flex xs12 v-if="!isTimeline">

            <div :key="`need-${needIndex}`"
                v-for="(need, needIndex) in needs"
                v-bind:class="{'timeline-message': need.inEditMode || need.inDeleteMode}"
                @mouseenter.native="need.isHovered = true" @mouseleave.native="need.isHovered = false"
                color="primary">
                    <v-card class="elevation-2" v-if="!need.inEditMode && !need.inDeleteMode">
                        <v-card-title>
                            <v-layout row class="item-action-row project-row-actions-container">
                                <v-flex xs12 sm2 md2 lg2 class="project-row-actions" v-if="needIndex === 0 || need.isHovered">
                                    <v-btn outline small fab class="edit-icon" v-on:click="onEditNeedClick(need, needIndex)">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab class="remove-icon" v-on:click="onDeleteNeedClick(need, needIndex)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text v-if="need.description">
                            <p class="need-description">
                                {{ need.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="need.inEditMode">
                        <ProjectNeedEdit :need="need" :index="needIndex" @editNeed="editNeed"/>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="need.inDeleteMode">
                        <ProjectNeedDelete :index="needIndex" @deleteNeed="deleteNeed"/>
                    </v-card>
            </div>
            <div v-if="!hasNeeds && !isEditingNeeds" class="timeline-message">
                <v-card class="timeline-message-card elevation-2">
                    <v-card-title>
                        {{ $t('pages.project.no-needs-message') }}
                    </v-card-title>
                </v-card>
            </div>

            <v-btn outline class="add-need-btn add-entity-btn"
                v-if="!isAddingNeed" v-on:click.native="onAddNeedClick()">
                    <v-icon>add</v-icon> {{ $t('shared.content.add-need-button') }}
            </v-btn>

            <div class="timeline-message" v-if="isAddingNeed">
                <v-card class="timeline-message-card elevation-2 highlighted-section">
                    <ProjectNeedAdd @addNeed="addNeed"/>
                </v-card>
            </div>

        </v-flex>

    </v-layout>
</template>

<script>
    import { Helpers } from '~/utils';
    import { ProjectSectionType } from '~/store/entities';
    import ProjectNeedAdd from '~/components/project/project-need-add.vue';
    import ProjectNeedEdit from '~/components/project/project-need-edit.vue';
    import ProjectNeedDelete from '~/components/project/project-need-delete.vue';

    export default {
        components: {
            ProjectNeedAdd,
            ProjectNeedEdit,
            ProjectNeedDelete
        },
        props: ['needs', 'isTimeline', 'saveChanges'],
		data: function () {
            return {
                editedNeeds: [...this.needs],
                isEditingNeeds: false,
                isAddingNeed: false,
                isDeletingNeed: false
            };
        },
        methods: {
            onAddNeedClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(false);
                this.cloneEditedNeeds();
                this.isAddingNeed = true;
            },
            onEditNeedClick: function (need, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(false);
                this.cloneEditedNeeds();
                this.isEditingNeeds = true;
                need.inEditMode = true;
            },
            onDeleteNeedClick: function (need, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(false);
                this.cloneEditedNeeds();
                this.isDeletingNeed = true;
                need.inDeleteMode = true;
            },
            addNeed: function (need) {
                let newNeed = {};

                if (need) {
                    newNeed = {
                        description: need.description,
                        isUrgent: need.isUrgent,
                        isHovered: false,
                        inEditMode: false,
                        inDeleteMode: false
                    };
                }

                if (need && this.saveChanges) {
                    var request = {
                        Description: need.description,
                        IsUrgent: need.isUrgent
                    };

                    this.$store.dispatch('needs/create', request).then((response) => {
                        newNeed.id = this.$store.state.needs.newNeed.ID;

                        this.editedNeeds.push(newNeed);

                        this.editedNeeds = this.editedNeeds
                                    .sort((n1, n2) => new Date(n1.date).getTime() > new Date(n2.date).getTime() ? -1 : 1);

                        this.updateNeeds();
                        this.showSnackbar(this.$t('pages.project.snackbar-messages.update-needs'));
                    });
                } else if (need) {
                    this.editedNeeds.push(newNeed);

                    this.updateNeeds();
                }

                this.isAddingNeed = false;
                this.endEditSectionSession();
            },
            editNeed: function (need, index) {
                let newNeed = {};

                if (need) {
                    newNeed = {
                        description: need.description,
                        isUrgent: need.isUrgent
                    };
                }

                if (need && this.saveChanges) {
                    var request = {
                        Description: need.description,
                        IsUrgent: need.isUrgent
                    };

                    this.$store.dispatch('needs/update', request).then(() => {
                        this.editedNeeds[index] = newNeed;

                        this.updateNeeds();
                        this.showSnackbar(this.$t('pages.project.snackbar-messages.update-needs'));
                    });
                } else if (need) {
                    this.editedNeeds[index] = newNeed;

                    this.editedNeeds = this.editedNeeds
                                        .sort((n1, n2) => new Date(n1.date).getTime() > new Date(n2.date).getTime() ? -1 : 1);

                    this.updateNeeds();
                }

                this.needs.forEach(n => {
                    n.inEditMode = false;
                });
                this.isEditingNeeds = false;
                this.endEditSectionSession();
            },
            deleteNeed: function (index) {
                if (index !== null && this.saveChanges) {
                    var id = this.editedNeeds[index].id;

                    this.$store.dispatch('needs/delete', id).then(() => {
                        this.editedNeeds.splice(index, 1);

                        this.updateNeeds();
                        this.showSnackbar(this.$t('pages.project.snackbar-messages.update-needs'));
                    });
                } else if (index !== null) {
                    this.editedNeeds.splice(index, 1);

                    this.updateNeeds();
                }

                this.needs.forEach(n => {
                    n.inDeleteMode = false;
                });
                this.isDeletingNeed = false;
                this.endEditSectionSession();
            },
            cancelAllUnsavedChanges: function () {
                this.isAddingNeed   = false;
                this.isEditingNeeds = false;
                this.isDeletingNeed = false;
                this.endEditSectionSession();
            },
            cloneEditedNeeds: function () {
                this.editedNeeds = Helpers.cloneObject(this.needs);
            },
            initiateEditSectionSession: function (navigateToElement) {
                this.$emit('initiateEditSectionSession', navigateToElement, ProjectSectionType.Needs);
            },
            endEditSectionSession: function () {
                this.$emit('endEditSectionSession', ProjectSectionType.Needs);
            },
            updateNeeds: function () {
                this.$emit('updateNeeds', this.editedNeeds);
            },
            showSnackbar: function (snackbarText) {
                this.$emit('showSnackbar', snackbarText);
            },
            hasNeeds: function () {
                return this.needs.length !== 0;
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>
