<template>
    <v-layout class="project-updates-layout project-entity-layout">

        <v-flex xs12 v-if="isTimeline">

            <v-timeline-item
                :key="`update-${updateIndex}`"
                v-for="(update, updateIndex) in updates"
                v-bind:class="{'timeline-message': update.inEditMode || update.inDeleteMode}"
                @mouseenter.native="update.isHovered = true"  @mouseleave.native="update.isHovered = false"
                color="primary" small fill-dot right>
                    <v-card class="elevation-2" v-if="!update.inEditMode && !update.inDeleteMode">
                        <v-card-title>
                            <v-layout row class="timeline-item-action-row project-row-actions-container">
                                <v-flex xs12 sm2 md2 lg2 class="project-row-actions" v-if="updateIndex === 0 || update.isHovered">
                                    <v-btn outline small fab class="edit-icon" v-on:click="onEditUpdateClick(update, updateIndex)">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab class="remove-icon" v-on:click="onDeleteUpdateClick(update, updateIndex)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text v-if="update.description">
                            <p class="update-description">
                                {{ update.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card edited-section" v-if="update.inEditMode">
                        <ProjectUpdateEdit :update="update" :index="updateIndex" @editUpdate="editUpdate"/>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card edited-section" v-if="update.inDeleteMode">
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
            <v-timeline-item medium hide-dot class="timeline-message"
                v-if="!isAddingUpdate">
                <v-card class="timeline-message-card text-xs-center" v-on:click.native="onAddUpdateClick()">
                    <v-card-title>
                        <v-icon>add</v-icon>
                       {{ $t('shared.content.add-update-button') }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item medium hide-dot class="timeline-message" v-if="isAddingUpdate">
                <v-card class="timeline-message-card elevation-2 edited-section">
                    <ProjectUpdateAdd @addUpdate="addUpdate"/>
                </v-card>
            </v-timeline-item>
        </v-flex>

        <v-flex xs12 v-if="!isTimeline">

            <div :key="`update-${updateIndex}`"
                v-for="(update, updateIndex) in updates"
                v-bind:class="{'timeline-message': update.inEditMode || update.inDeleteMode}"
                @mouseenter.native="update.isHovered = true" @mouseleave.native="update.isHovered = false"
                color="primary">
                    <v-card class="elevation-2" v-if="!update.inEditMode && !update.inDeleteMode">
                        <v-card-title>
                            <v-layout row class="item-action-row project-row-actions-container">
                                <v-flex xs12 sm2 md2 lg2 class="project-row-actions" v-if="updateIndex === 0 || update.isHovered">
                                    <v-btn outline small fab class="edit-icon" v-on:click="onEditUpdateClick(update, updateIndex)">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab class="remove-icon" v-on:click="onDeleteUpdateClick(update, updateIndex)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text v-if="update.description">
                            <p class="update-description">
                                {{ update.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card edited-section" v-if="update.inEditMode">
                        <ProjectUpdateEdit :update="update" :index="updateIndex" @editUpdate="editUpdate"/>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card edited-section" v-if="update.inDeleteMode">
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
                <v-card class="timeline-message-card elevation-2 edited-section">
                    <ProjectUpdateAdd @addUpdate="addUpdate"/>
                </v-card>
            </div>

        </v-flex>

    </v-layout>
</template>

<script>
    import { Helpers } from '~/utils';
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
        props: ['updates', 'isTimeline', 'saveChanges'],
		data: function () {
            return {
                editedUpdates: [...this.updates],
                isEditingUpdates: false,
                isAddingUpdate: false,
                isDeletingUpdate: false
            };
        },
        methods: {
            onAddUpdateClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(false);
                this.cloneEditedUpdates();
                this.isAddingUpdate = true;
            },
            onEditUpdateClick: function (update, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(false);
                this.cloneEditedUpdates();
                this.isEditingUpdates = true;
                update.inEditMode = true;
            },
            onDeleteUpdateClick: function (update, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(false);
                this.cloneEditedUpdates();
                this.isDeletingUpdate = true;
                update.inDeleteMode = true;
            },
            addUpdate: function (update) {
                let newUpdate = {};

                if (update) {
                    newUpdate = {
                        description: update.description,
                        date: update.date,
                        isHovered: false,
                        inEditMode: false,
                        inDeleteMode: false
                    };
                }

                if (update && this.saveChanges) {
                    var request = {
                        Description: update.description,
                        Date: update.date
                    };

                    this.$store.dispatch('updates/create', request).then((response) => {
                        newUpdate.id = this.$store.state.updates.newUpdate.ID;

                        this.editedUpdates.push(newUpdate);

                        this.editedUpdates = this.editedUpdates
                                    .sort((u1, u2) => new Date(u1.date).getTime() > new Date(u2.date).getTime() ? -1 : 1);

                        this.updateUpdates();
                        this.showSnackbar(this.$t('pages.project.snackbar-messages.update-updates'));
                    });
                } else if (update) {
                    this.editedUpdates.push(newUpdate);

                    this.updateUpdates();
                }

                this.isAddingUpdate = false;
                this.endEditSectionSession();
            },
            editUpdate: function (update, index) {
                let newUpdate = {};

                if (update) {
                    newUpdate = {
                        description: update.description,
                        date: update.date
                    };
                }

                if (update && this.saveChanges) {
                    var request = {
                        Description: update.description,
                        Date: update.date
                    };

                    this.$store.dispatch('updates/update', request).then(() => {
                        this.editedUpdates[index] = newUpdate;

                        this.updateUpdates();
                        this.showSnackbar(this.$t('pages.project.snackbar-messages.update-updates'));
                    });
                } else if (update) {
                    this.editedUpdates[index] = newUpdate;

                    this.editedUpdates = this.editedUpdates
                                        .sort((u1, u2) => new Date(u1.date).getTime() > new Date(u2.date).getTime() ? -1 : 1);

                    this.updateUpdates();
                }

                this.updates.forEach(u => {
                    u.inEditMode = false;
                });
                this.isEditingUpdates = false;
                this.endEditSectionSession();
            },
            deleteUpdate: function (index) {
                if (index !== null && this.saveChanges) {
                    var id = this.editedUpdates[index].id;

                    this.$store.dispatch('updates/delete', id).then(() => {
                        this.editedUpdates.splice(index, 1);

                        this.updateUpdates();
                        this.showSnackbar(this.$t('pages.project.snackbar-messages.update-updates'));
                    });
                } else if (index !== null) {
                    this.editedUpdates.splice(index, 1);

                    this.updateUpdates();
                }

                this.updates.forEach(u => {
                    u.inDeleteMode = false;
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
            updateUpdates: function () {
                this.$emit('updateUpdates', this.editedUpdates);
            },
            showSnackbar: function (snackbarText) {
                this.$emit('showSnackbar', snackbarText);
            },
            hasUpdates: function () {
                return this.updates.length !== 0;
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>
