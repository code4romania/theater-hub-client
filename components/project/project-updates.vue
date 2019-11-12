<template>
    <v-layout class="project-updates-layout project-entity-layout">

        <v-flex xs12 v-if="isTimeline">

            <v-timeline-item
                :key="`project-update-${updateIndex}`"
                class="mb-3" large fill-dot
                v-for="(update, updateIndex) in updates"
                v-bind:class="{'timeline-message': update.InEditMode || update.InDeleteMode}"
                @mouseenter.native="update.IsHovered = true"
                @mouseleave.native="update.IsHovered = false"
            >

                <v-avatar slot="icon">
                  <img :src="require('~/assets/images/icon-project_help.png')">
                </v-avatar>

                <v-layout
                    v-if="!update.InEditMode && !update.InDeleteMode"
                    class="update-item-content"
                    row wrap align-center
                >
                    <v-flex
                        xs12
                        :class="{'sm10': updateIndex === 0 || update.IsHovered, 'sm12': updateIndex !== 0 && !update.IsHovered }">
                        <v-layout justify-space-between>
                            <v-flex
                                xs9
                                class="project-update"
                            >
                                {{ update.Description }}
                            </v-flex>
                            <v-flex xs3 text-xs-right timeline__date>{{ getFormattedDate(update.Date) }}</v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12 sm2>
                        <v-layout
                            v-if="updateIndex === 0 || update.IsHovered"
                            row
                            class="update-row-actions-container"
                        >
                            <v-flex
                                xs12
                                class="update-row-actions"
                            >
                                <v-btn outline small fab class="edit-icon" v-on:click="onEditUpdateClick(update, updateIndex)">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                                <v-btn outline small fab class="remove-icon" v-on:click="onDeleteUpdateClick(update, updateIndex)">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>

                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="update.InEditMode">
                        <ProjectUpdateEdit :update="update" :index="updateIndex" @editUpdate="editUpdate"/>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="update.InDeleteMode">
                        <ProjectUpdateDelete :index="updateIndex" @deleteUpdate="deleteUpdate"/>
                    </v-card>
            </v-timeline-item>
            <v-timeline-item  v-if="!hasUpdates() && !isEditingUpdates" medium hide-dot class="timeline-message">
                <v-card class="timeline-message-card elevation-2">
                    <v-card-title>
                        {{ $t('pages.project.no-updates-message') }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item
                medium hide-dot
                class="timeline-message add-entity-timeline-item add-update-timeline-item"
                v-if="!isAddingUpdate">
                <v-card class="timeline-message-card text-xs-center" v-on:click.native="onAddUpdateClick()">
                    <v-card-title>
                        <v-icon>add</v-icon>
                       {{ $t('shared.content.add-update-button') }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item medium hide-dot class="timeline-message" v-if="isAddingUpdate">
                <v-card class="timeline-message-card elevation-2 highlighted-section">
                    <ProjectUpdateAdd @addUpdate="addUpdate"/>
                </v-card>
            </v-timeline-item>
        </v-flex>

        <v-flex xs12 v-if="!isTimeline">

            <div :key="`update-${updateIndex}`"
                v-for="(update, updateIndex) in updates"
                v-bind:class="{'timeline-message': update.InEditMode || update.InDeleteMode}"
                @mouseenter.native="update.IsHovered = true" @mouseleave.native="update.IsHovered = false"
                color="primary">
                    <v-card class="elevation-2" v-if="!update.InEditMode && !update.InDeleteMode">
                        <v-card-title>
                            <v-layout row class="item-action-row project-row-actions-container">
                                <v-flex xs12 sm2 md2 lg2 class="project-row-actions" v-if="updateIndex === 0 || update.IsHovered">
                                    <v-btn outline small fab class="edit-icon" v-on:click="onEditUpdateClick(update, updateIndex)">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab class="remove-icon" v-on:click="onDeleteUpdateClick(update, updateIndex)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text v-if="update.Description">
                            <p class="update-description">
                                {{ update.Description }}
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="update.InEditMode">
                        <ProjectUpdateEdit :update="update" :index="updateIndex" @editUpdate="editUpdate"/>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="update.InDeleteMode">
                        <ProjectUpdateDelete :index="updateIndex" @deleteUpdate="deleteUpdate"/>
                    </v-card>
            </div>
            <div v-if="!hasUpdates && !isEditingUpdates" class="timeline-message">
                <v-card class="timeline-message-card elevation-2">
                    <v-card-title>
                        {{ $t('pages.project.no-updates-message') }}
                    </v-card-title>
                </v-card>
            </div>

            <v-btn outline class="add-update-btn add-entity-btn"
                v-if="!isAddingUpdate" v-on:click.native="onAddUpdateClick()">
                    <v-icon>add</v-icon> {{ $t('shared.content.add-update-button') }}
            </v-btn>

            <div class="timeline-message" v-if="isAddingUpdate">
                <v-card class="timeline-message-card elevation-2 highlighted-section">
                    <ProjectUpdateAdd @addUpdate="addUpdate"/>
                </v-card>
            </div>

        </v-flex>

    </v-layout>
</template>

<script>
    import { Helpers } from '~/utils';
    import moment from 'moment';
    import { mapGetters } from 'vuex';
    import { ProjectSectionType } from '~/store/entities';
    import ProjectUpdateAdd from '~/components/project/project-update-add.vue';
    import ProjectUpdateEdit from '~/components/project/project-update-edit.vue';
    import ProjectUpdateDelete from '~/components/project/project-update-delete.vue';

    export default {
        components: {
            ProjectUpdateAdd,
            ProjectUpdateEdit,
            ProjectUpdateDelete
        },
        props: ['updates', 'projectID', 'isTimeline', 'saveChanges'],
		data: function () {
            return {
                editedUpdates: [...this.updates],
                isEditingUpdates: false,
                isAddingUpdate: false,
                isDeletingUpdate: false
            };
        },
        computed: {
            ...mapGetters({
                locale: 'locale'
            })
        },
        methods: {
            onAddUpdateClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true);
                this.cloneEditedUpdates();
                this.isAddingUpdate = true;
            },
            onEditUpdateClick: function (update, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true);
                this.cloneEditedUpdates();
                this.isEditingUpdates = true;
                update.InEditMode = true;
            },
            onDeleteUpdateClick: function (update, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true);
                this.cloneEditedUpdates();
                this.isDeletingUpdate = true;
                update.InDeleteMode = true;
            },
            addUpdate: function (update) {
                let newUpdate = {};

                if (update) {
                    newUpdate = {
                        Description: update.Description,
                        IsHovered: false,
                        InEditMode: false,
                        InDeleteMode: false
                    };
                }

                if (update && this.saveChanges) {
                    var request = {
                        projectID: this.projectID,
                        update: {
                            Description: update.Description
                        }
                    };

                    this.$store.dispatch('project-updates/create', request).then((response) => {
                        newUpdate.ID    = response.ID;
                        newUpdate.Date  = response.Date;

                        this.editedUpdates.push(newUpdate);

                        this.editedUpdates = this.editedUpdates
                                    .sort((u1, u2) => new Date(u1.Date).getTime() > new Date(u2.Date).getTime() ? -1 : 1);

                        this.updateProjectUpdates();
                        this.showSnackbar(this.$t('pages.project.snackbar-messages.update-updates'));
                    });
                } else if (update) {
                    this.editedUpdates.push(newUpdate);

                    this.updateProjectUpdates();
                }

                this.isAddingUpdate = false;
                this.endEditSectionSession();
            },
            editUpdate: function (update, index) {
                let newUpdate = {};

                if (update) {
                    newUpdate = {
                        Description: update.Description,
                        IsHovered: false,
                        InEditMode: false,
                        InDeleteMode: false
                    };
                }

                if (update && this.saveChanges) {
                    var request = {
                        projectID: this.projectID,
                        id: update.ID,
                        update: {
                            Description: update.Description
                        }
                    };

                    this.$store.dispatch('project-updates/update', request).then((response) => {
                        this.editedUpdates[index]       = newUpdate;
                        this.editedUpdates[index].ID    = response.ID;
                        this.editedUpdates[index].Date  = response.Date;

                        this.updateProjectUpdates();
                        this.showSnackbar(this.$t('pages.project.snackbar-messages.update-updates'));
                    });
                } else if (update) {
                    this.editedUpdates[index] = newUpdate;

                    this.editedUpdates = this.editedUpdates
                                        .sort((u1, u2) => new Date(u1.Date).getTime() > new Date(u2.Date).getTime() ? -1 : 1);

                    this.updateProjectUpdates();
                }

                this.updates.forEach(u => {
                    u.InEditMode = false;
                });
                this.isEditingUpdates = false;
                this.endEditSectionSession();
            },
            deleteUpdate: function (index) {
                if (index !== null && this.saveChanges) {
                    var request = {
                        projectID: this.projectID,
                        id: this.editedUpdates[index].ID
                    };

                    this.$store.dispatch('project-updates/delete', request).then(() => {
                        this.editedUpdates.splice(index, 1);

                        this.updateProjectUpdates();
                        this.showSnackbar(this.$t('pages.project.snackbar-messages.update-updates'));
                    });
                } else if (index !== null) {
                    this.editedUpdates.splice(index, 1);

                    this.updateProjectUpdates();
                }

                this.updates.forEach(u => {
                    u.InDeleteMode = false;
                });
                this.isDeletingUpdate = false;
                this.endEditSectionSession();
            },
            cancelAllUnsavedChanges: function () {
                this.isAddingUpdate   = false;
                this.isEditingUpdates = false;
                this.isDeletingUpdate = false;
                this.endEditSectionSession();
            },
            cloneEditedUpdates: function () {
                this.editedUpdates = Helpers.cloneObject(this.updates);
            },
            initiateEditSectionSession: function (navigateToElement) {
                this.$emit('initiateEditSectionSession', navigateToElement, ProjectSectionType.Updates);
            },
            endEditSectionSession: function () {
                this.$emit('endEditSectionSession', ProjectSectionType.Updates);
            },
            updateProjectUpdates: function () {
                this.$emit('updateProjectUpdates', this.editedUpdates);
            },
            showSnackbar: function (snackbarText) {
                this.$emit('showSnackbar', snackbarText);
            },
            hasUpdates: function () {
                return this.updates.length !== 0;
            },
            getFormattedDate (date) {
                return moment(date).locale(this.locale).format('LL');
            }
        }
    }

</script>

<style lang="scss" scoped>

    .project-updates-layout {
        .update-row-actions {
            display: flex;
            justify-content: flex-end;
        }

        .project-update {
            padding-left: 20px;
        }

        .add-update-timeline-item {
            padding-bottom: 0px;
        }

        .update-item-content {
            min-height: 52px;
            align-content: center;
        }

        @media screen and (max-width: 600px) {

            .update-item-content {
                flex-direction: column-reverse;
                align-content: flex-start;

                &>div {
                    width: 100%;
                }
            }

        }

    }

</style>
