<template>
    <v-layout class="project-needs-layout project-entity-layout">

        <v-flex xs12 v-if="isTimeline">

            <v-timeline-item
                :key="`project-need-${needIndex}`"
                class="mb-3" large fill-dot
                v-for="(need, needIndex) in needs"
                v-bind:class="{'timeline-message': need.InEditMode || need.InDeleteMode}"
                @mouseenter.native="need.IsHovered = true"
                @mouseleave.native="need.IsHovered = false"
            >

                <v-avatar slot="icon">
                    <img :src="require('~/assets/images/icon-project_help.png')">
                </v-avatar>

                <v-layout
                    v-if="!need.InEditMode && !need.InDeleteMode"
                    class="need-item-content"
                    row wrap align-center
                >
                    <v-flex 
                        xs12
                        :class="{'sm10': needIndex === 0 || need.IsHovered, 'sm12': needIndex !== 0 && !need.IsHovered }">
                        <v-layout justify-space-between>
                            <v-flex
                                class="project-need">
                                <v-chip
                                    :key="index"
                                    v-for="(tag, index) in need.Tags"
                                    class="ml-0"
                                    :text-color="tag.Color"
                                    :color="tag.BackgroundColor"
                                    label small>
                                    {{ $t(`application-data.${tag.ID.toLowerCase()}`) }}
                                </v-chip>
                                {{ need.Description }}
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12 sm2>
                        <v-layout
                            v-if="needIndex === 0 || need.IsHovered"
                            row
                            class="need-row-actions-container"
                        >
                            <v-flex
                                v-if="needIndex === 0 || need.IsHovered"
                                xs12
                                class="need-row-actions"
                            >
                                <v-btn outline small fab class="edit-icon" v-on:click="onEditNeedClick(need, needIndex)">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                                <v-btn outline small fab class="remove-icon" v-on:click="onDeleteNeedClick(need, needIndex)">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>

                <v-card
                    v-if="need.InEditMode"
                    class="elevation-2 timeline-message-card highlighted-section">
                        <ProjectNeedEdit
                            :need="need"
                            :index="needIndex"
                            @editNeed="editNeed"
                        />
                </v-card>

                <v-card
                    v-if="need.InDeleteMode"
                    class="elevation-2 timeline-message-card highlighted-section">
                        <ProjectNeedDelete
                            :index="needIndex"
                            @deleteNeed="deleteNeed"
                        />
                </v-card>

            </v-timeline-item>

            <v-timeline-item
                v-if="!hasNeeds() && !isEditingNeeds"
                medium hide-dot
                class="timeline-message"
            >
                <v-card class="timeline-message-card elevation-2">
                    <v-card-title>
                        {{ $t('pages.project.no-needs-message') }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>

            <v-timeline-item
                medium hide-dot
                class="timeline-message add-entity-timeline-item add-need-timeline-item"
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
                    <ProjectNeedAdd
                        @addNeed="addNeed"
                    />
                </v-card>
            </v-timeline-item>
        </v-flex>

        <v-flex xs12 v-if="!isTimeline">

            <div :key="`need-${needIndex}`"
                v-for="(need, needIndex) in needs"
                @mouseenter="need.IsHovered = true" @mouseleave="need.IsHovered = false"
                class="need-item" color="primary">
                    <v-card class="elevation-2" v-if="!need.InEditMode && !need.InDeleteMode">
                        <v-card-text v-if="need.Description">
                            <v-layout
                                class="need-item-content"
                                row wrap align-center>
                                <v-flex
                                    xs12
                                    :class="{'sm10': needIndex === 0 || need.IsHovered, 'sm12': needIndex !== 0 && !need.IsHovered }"
                                >
                                    <v-chip
                                        :key="index"
                                        v-for="(tag, index) in need.Tags"
                                        class="ml-0"
                                        :text-color="tag.Color"
                                        :color="tag.BackgroundColor"
                                        label small>
                                        {{ $t(`application-data.${tag.ID.toLowerCase()}`) }}
                                    </v-chip>
                                    {{ need.Description }}
                                </v-flex>
                                <v-flex
                                    v-if="needIndex === 0 || need.IsHovered"
                                    xs12
                                    sm2
                                    class="need-row-actions"
                                >
                                    <v-layout row wrap justify-end>
                                        <v-btn outline small fab class="edit-icon" v-on:click="onEditNeedClick(need, needIndex)">
                                            <v-icon>edit</v-icon>
                                        </v-btn>
                                        <v-btn outline small fab class="remove-icon" v-on:click="onDeleteNeedClick(need, needIndex)">
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="need.InEditMode">
                        <ProjectNeedEdit :need="need" :index="needIndex" @editNeed="editNeed"/>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="need.InDeleteMode">
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
    import { mapGetters } from 'vuex';
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
        props: ['needs', 'projectID', 'isTimeline', 'saveChanges'],
		data: function () {
            return {
                editedNeeds: [...this.needs],
                isEditingNeeds: false,
                isAddingNeed: false,
                isDeletingNeed: false
            };
        },
        computed: {
            ...mapGetters({
                projectNeedTags: 'applicationData/projectNeedTags'
            })

        },
        methods: {
            onAddNeedClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true);
                this.cloneEditedNeeds();
                this.isAddingNeed = true;
            },
            onEditNeedClick: function (need, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true);
                this.cloneEditedNeeds();
                this.isEditingNeeds = true;
                need.InEditMode = true;
            },
            onDeleteNeedClick: function (need, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true);
                this.cloneEditedNeeds();
                this.isDeletingNeed = true;
                need.InDeleteMode = true;
            },
            addNeed: function (need) {
                let newNeed = {};

                if (need) {
                    newNeed = {
                        Description: need.Description,
                        Tags: need.Tags.map(t => this.projectNeedTags.find(pnt => pnt.ID === t)),
                        IsHovered: false,
                        InEditMode: false,
                        InDeleteMode: false
                    };
                }

                if (need && this.saveChanges) {
                    var request = {
                        projectID: this.projectID,
                        need: {
                            Description: need.Description,
                            Tags: need.Tags
                        }
                    };

                    this.$store.dispatch('project-needs/create', request).then((response) => {
                        newNeed.ID      = response.ID;
                        newNeed.Date    = response.Date;

                        this.editedNeeds.push(newNeed);

                        this.editedNeeds = this.editedNeeds
                                    .sort((n1, n2) => new Date(n1.Date).getTime() > new Date(n2.Date).getTime() ? -1 : 1);

                        this.updateProjectNeeds();
                        this.showSnackbar(this.$t('pages.project.snackbar-messages.update-needs'));
                    });
                } else if (need) {
                    this.editedNeeds.push(newNeed);

                    this.updateProjectNeeds();
                }

                this.isAddingNeed = false;
                this.endEditSectionSession();
            },
            editNeed: function (need, index) {
                let newNeed = {};

                if (need) {
                    newNeed = {
                        ...need,
                        Tags: need.Tags.map(t => this.projectNeedTags.find(pnt => pnt.ID === t)),
                        IsHovered: false,
                        InEditMode: false,
                        InDeleteMode: false
                    };
                }

                if (need && this.saveChanges) {
                    var request = {
                        projectID: this.projectID,
                        id: need.ID,
                        need: {
                            Description: need.Description,
                            Tags: need.Tags
                        }
                    };

                    this.$store.dispatch('project-needs/update', request).then((response) => {
                        this.editedNeeds[index] = newNeed;

                        this.updateProjectNeeds();
                        this.showSnackbar(this.$t('pages.project.snackbar-messages.update-needs'));
                    });
                } else if (need) {
                    this.editedNeeds[index] = newNeed;

                    this.editedNeeds = this.editedNeeds
                                        .sort((n1, n2) => new Date(n1.Date).getTime() > new Date(n2.Date).getTime() ? -1 : 1);

                    this.updateProjectNeeds();
                }

                this.needs.forEach(n => {
                    n.InEditMode = false;
                });
                this.isEditingNeeds = false;
                this.endEditSectionSession();
            },
            deleteNeed: function (index) {
                if (index !== null && this.saveChanges) {
                    var request = {
                        projectID: this.projectID,
                        id: this.editedNeeds[index].ID
                    };

                    this.$store.dispatch('project-needs/delete', request).then(() => {
                        this.editedNeeds.splice(index, 1);

                        this.updateProjectNeeds();
                        this.showSnackbar(this.$t('pages.project.snackbar-messages.update-needs'));
                    });
                } else if (index !== null) {
                    this.editedNeeds.splice(index, 1);

                    this.updateProjectNeeds();
                }

                this.needs.forEach(n => {
                    n.InDeleteMode = false;
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
            updateProjectNeeds: function () {
                this.$emit('updateProjectNeeds', this.editedNeeds);
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

<style lang="scss">

    .project-needs-layout {
        .need-row-actions {
            display: flex;
            justify-content: flex-end;
        }

        .project-need {
            padding-left: 20px;
        }

        .add-need-timeline-item {
            padding-bottom: 0px;
        }

        .need-item {
            padding: 8px 3px 8px 8px;
        }

        .need-item-content {
            min-height: 52px;
            align-content: center;
        }

        @media screen and (max-width: 600px) {

            .need-item-content {
                flex-direction: column-reverse;
                align-content: flex-start;

                &>div {
                    width: 100%;
                }
            }

        }

    }


</style>
