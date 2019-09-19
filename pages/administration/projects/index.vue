<template>
  <section class="projects">
    <v-container fluid projects-dashboard-container class="main-container pa-5 mt-5">
        <v-layout column>
            <v-flex>
                <h1
                    class="page-title mb-3">
                    {{ $t('pages.administration.projects.title') }}
                </h1>
            </v-flex>

            <v-layout mt-3 justify-end>
                <v-flex xs12 sm12 md4>
                    <v-text-field
                        id="projects-search-box"
                        v-model="searchTerm"
                        append-icon="search"
                        :label="$t('fields.search.admin.label')"
                        single-line hide-details
                        @keyup="onSearchKeyup">
                    </v-text-field>
                </v-flex>
            </v-layout>

            <v-layout column>
                
                <v-flex xs12 mt-5>

                    <v-data-table
                        must-sort
                        :headers="headers"
                        :items="dashboardProjects"
                        :pagination.sync="dashboardProjectsTablePagination"
                        :total-items="dashboardProjectsTotal"
                        :loading="isLoading"
                        :mobile-breakpoint="1200"
                        rows-per-page-text=""
                        :rows-per-page-items="[]"
                        :no-data-text="$t('pages.administration.projects.no-search-results')"
                        :no-results-text="$t('pages.administration.projects.no-matching-projects')"
                        class="elevation-1">
                            <template slot="items" slot-scope="dashboard">
                                <tr
                                    class="projects-dashboard-row"
                                    v-if="!isEditedProject(dashboard.item)"
                                >
                                    <td class="text-xs-left">
                                        <nuxt-link
                                            :to="`/project/${dashboard.item.ID}`"
                                            target="_blank">
                                            <span class="member-name">{{ dashboard.item.Name }}</span>
                                        </nuxt-link>
                                    </td>
                                    <td class="text-xs-left">{{ dashboard.item.City }}</td>
                                    <td class="text-xs-left">
                                        <nuxt-link
                                            :to="`/profile/${dashboard.item.InitiatorUsername}`"
                                            target="_blank">
                                            <span class="member-name">{{ dashboard.item.InitiatorName }}</span>
                                        </nuxt-link>
                                    </td>
                                    <td class="text-xs-left">{{  getStatusElementText(dashboard.item.Status) }}</td>
                                    <td class="text-xs-left">{{  getPrivacyElementText(dashboard.item.Visibility) }}</td>
                                    <td class="text-xs-left">
                                        <v-layout>
                                            <v-flex xs12 md6 lg4>
                                                <v-btn
                                                    v-if="showEnableProjectButton(dashboard.item)"
                                                    small
                                                    id="enable-project-button" 
                                                    class="dashboard-action-button primary"
                                                    @click="onEnableProjectClick($event, dashboard.item)"
                                                >
                                                    {{ $t('pages.administration.projects.enable-project-button') }}            
                                                </v-btn>
                                                <v-btn
                                                    v-if="showDisabledProjectButton(dashboard.item)"
                                                    small
                                                    id="disable-project-button"
                                                    class="dashboard-action-button primary"
                                                    @click="onDisableProjectClick($event, dashboard.item)"
                                                >
                                                    {{ $t('pages.administration.projects.disable-project-button') }}
                                                </v-btn>
                                            </v-flex>
                                            <v-flex xs12 md6 lg4 pl-3>
                                                <v-btn
                                                    small
                                                    id="delete-project-button"
                                                    class="dashboard-action-button"
                                                    @click="onDeleteProjectClick($event, dashboard.item)"
                                                >
                                                    {{ $t('pages.administration.projects.delete-project-button') }}
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </td>
                                </tr>
                                <tr
                                    v-if="dashboard.item.isEnabling"
                                    class="edited-dashboard-project highlighted-section"
                                >
                                    <td colspan="6" text-xs-left>
                                        <div class="project-action-content">
                                            {{ $t('pages.administration.projects.enable-project-message').replace("{0}", dashboard.item.Name) }}
                                        </div>
                                        <div class="project-action-content">
                                            <v-textarea
                                                id="text-area-field"
                                                v-model="actionMessage"
                                                auto-grow box
                                                :label="$t('fields.optional-user-message.label')" rows="1" counter=500 :rules="messageRules" validate-on-blur>
                                            </v-textarea>
                                        </div>
                                    </td>
                                    <td class="text-xs-left">
                                        <v-layout>
                                            <v-flex xs12 md6 lg4>
                                                <v-btn
                                                    outline small fab
                                                    class="confirm-enable-project-button"
                                                    v-on:click="onConfirmEnableProjectClick(dashboard.item)"
                                                    :disabled="isConfirmButtonDisabled()">
                                                        <v-icon>done</v-icon>
                                                </v-btn>
                                            </v-flex>
                                            <v-flex xs12 md6 lg4>
                                                <v-btn
                                                    outline small fab
                                                    class="cancel-enable-project-button"
                                                    v-on:click="onCancelEnableProjectClick(dashboard.item)">
                                                        <v-icon>clear</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </td>
                                </tr>
                                <tr
                                    v-if="dashboard.item.isDisabling"
                                    class="edited-dashboard-project highlighted-section"
                                >
                                    <td colspan="6" text-xs-left>
                                        <div class="project-action-content">
                                            {{ $t('pages.administration.projects.disable-project-message').replace("{0}", dashboard.item.Name) }}
                                        </div>
                                        <div class="project-action-content">
                                            <v-textarea
                                                id="text-area-field"
                                                v-model="actionMessage"
                                                auto-grow box
                                                :label="$t('fields.optional-user-message.label')"
                                                rows="1" counter=500
                                                :rules="messageRules"
                                                validate-on-blur>
                                            </v-textarea>
                                        </div>
                                    </td>
                                    <td class="text-xs-left">
                                        <v-layout>
                                            <v-flex xs12 md6 lg4>
                                                <v-btn
                                                    outline small fab
                                                    class="confirm-disable-project-button"
                                                    v-on:click="onConfirmDisableProjectClick(dashboard.item)"
                                                    :disabled="isConfirmButtonDisabled()">
                                                        <v-icon>done</v-icon>
                                                </v-btn>
                                            </v-flex>
                                            <v-flex xs12 md6 lg4>
                                                <v-btn
                                                    outline small fab
                                                    class="cancel-disable-project-button"
                                                    v-on:click="onCancelDisableProjectClick(dashboard.item)">
                                                        <v-icon>clear</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                   </td>
                                </tr>
                                <tr
                                    v-if="dashboard.item.isDeleting"
                                    class="edited-dashboard-project highlighted-section"
                                >
                                    <td colspan="6" text-xs-left>
                                        <div class="project-action-content">
                                            {{ $t('pages.administration.projects.delete-project-message').replace("{0}", dashboard.item.Name) }}
                                        </div>
                                        <div class="project-action-content">
                                            <v-textarea
                                                id="text-area-field"
                                                v-model="actionMessage"
                                                auto-grow box
                                                :label="$t('fields.optional-user-message.label')"
                                                rows="1" counter=500
                                                :rules="messageRules"
                                                validate-on-blur>
                                            </v-textarea>
                                        </div>
                                    </td>
                                    <td class="text-xs-left">
                                        <v-layout>
                                            <v-flex xs12 md6 lg4>
                                                <v-btn
                                                    outline small fab
                                                    class="confirm-delete-project-button"
                                                    v-on:click="onConfirmDeleteProjectClick(dashboard.item)"
                                                    :disabled="isConfirmButtonDisabled()">
                                                        <v-icon>done</v-icon>
                                                </v-btn>
                                            </v-flex>
                                            <v-flex xs12 md6 lg4>
                                                <v-btn
                                                    outline small fab
                                                    class="cancel-delete-project-button"
                                                    v-on:click="onCancelDeleteProjectClick(dashboard.item)">
                                                    <v-icon>clear</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </td>
                                </tr>
                            </template>
                    </v-data-table>

                </v-flex>

            </v-layout>

        </v-layout>
    </v-container>
  </section>
</template>

<script>
    import _ from 'lodash';
    import { mapState } from 'vuex';
    import { ProjectStatusType, VisibilityType, ProjectSortCriterion } from '~/store/entities';

    export default {
        layout: 'administration',
        middleware: ['authenticated', 'admin'],
        data: function () {
            return {
                isLoading: false,
                dashboardProjects: [],
                dashboardProjectsTotal: 0,
                dashboardProjectsTablePagination: {
                    rowsPerPage: 10
                },
                headers: [
                    { text: this.$t('pages.administration.projects.name-header'), value: 'Name' },
                    { text: this.$t('pages.administration.projects.city-header'), value: 'City' },
                    { text: this.$t('pages.administration.projects.initiator-name-header'), value: 'InitiatorName' },
                    { text: this.$t('pages.administration.projects.status-header'), value: 'Status' },
                    { text: this.$t('pages.administration.projects.visibility-header'), value: 'Visibility' },
                    { text: this.$t('pages.administration.projects.actions-header'), value: 'Actions', sortable: false }
                ],
                searchTerm: '',
                messageRules: [
                    v => !v || v.length <= 500 || this.$t('fields.optional-user-message.validation-errors.length')
                ],
                snackbar: false,
                snackbarText: '',
                actionMessage: ''
            };
        },
        watch: {
            dashboardProjectsTablePagination: {
                handler () {
                    this.updateProjectsDashboardTable();
                }
            }
        },
        computed: {
            ...mapState(['administration'])
        },
        mounted () {
            this.updateProjectsDashboardTable();
        },
        methods: {
            async updateProjectsDashboardTable () {
                const { sortBy, descending, page } = this.dashboardProjectsTablePagination;

                var requestQuery = {
                    searchTerm: this.searchTerm,
                    sortCriterion: ProjectSortCriterion[sortBy],
                    sortOrientation: descending ? 'DESC' : 'ASC',
                    page: page - 1,
                    pageSize: 10
                };

                await this.$store.dispatch('administration/getDashboardProjects', requestQuery);

                this.dashboardProjects = this.$store.state.administration.dashboardProjects.map(p => {
                    return {
                        ...p,
                        isEnabling: false,
                        isDisabling: false,
                        isDeleting: false
                    };
                });

                this.dashboardProjectsTotal = this.$store.state.administration.dashboardProjectsTotal;
            },
            onSearchKeyup: _.throttle(function () {
                this.updateProjectsDashboardTable();
            }, 1000),
            onEnableProjectClick: function (event, project) {
                event.preventDefault();
                event.stopPropagation();
                this.cancelProjectEditMode(this.editedProject);
                this.actionMessage = '';

                this.$store.dispatch('administration/initiateAdministrationEditSession');
                project.isEnabling = true;
                this.editedProject = project;
            },
            onDisableProjectClick: function (event, project) {
                event.preventDefault();
                event.stopPropagation();
                this.cancelProjectEditMode(this.editedProject);
                this.actionMessage = '';

                this.$store.dispatch('administration/initiateAdministrationEditSession');
                project.isDisabling = true;
                this.editedProject = project;
            },
            onDeleteProjectClick: function (event, project) {
                event.preventDefault();
                event.stopPropagation();
                this.cancelProjectEditMode(this.editedProject);
                this.actionMessage = '';

                this.$store.dispatch('administration/initiateAdministrationEditSession');
                project.isDeleting = true;
                this.editedProject = project;
            },
            async onConfirmEnableProjectClick (project) {
                var request  = {
                    id: project.ID,
                    body: {
                        Message: this.actionMessage
                    }
                };

                await this.$store.dispatch('administration/enableProject', request).then(() => {
                    if (!this.administration.enableProjectErrors) {
                        this.snackbarText = this.$t('pages.administration.projects.snackbar-messages.enable-project');
                        this.snackbar = true;
                    }
                });

                this.$store.dispatch('administration/endAdministrationEditSession');
                this.editedProject = null;

                this.updateProjectsDashboardTable();
            },
            onCancelEnableProjectClick: function (project) {
                this.$store.dispatch('administration/endAdministrationEditSession');
                project.isEnabling = false;
                this.editedProject = null;
            },
            async onConfirmDisableProjectClick (project) {
                var request  = {
                    id: project.ID,
                    body: {
                        Message: this.actionMessage
                    }
                };

                await this.$store.dispatch('administration/disableProject', request).then(() => {
                    if (!this.administration.disableProjectErrors) {
                        this.snackbarText = this.$t('pages.administration.projects.snackbar-messages.disable-project');
                        this.snackbar = true;
                    }
                });

                this.$store.dispatch('administration/endAdministrationEditSession');
                this.editedProject = null;

                this.updateProjectsDashboardTable();
            },
            onCancelDisableProjectClick: function (project) {
                this.$store.dispatch('administration/endAdministrationEditSession');
                project.isDisabling = false;
                this.editedProject  = null;
            },
            async onConfirmDeleteProjectClick (project) {
                var request  = {
                    id: project.ID,
                    body: {
                        Message: this.actionMessage
                    }
                };

                await this.$store.dispatch('administration/deleteProject', request).then(() => {
                    if (!this.administration.deleteProjectErrors) {
                        this.snackbarText = this.$t('pages.administration.projects.snackbar-messages.delete-project');
                        this.snackbar = true;
                    }
                });

                this.$store.dispatch('administration/endAdministrationEditSession');
                this.editedProject = null;

                this.updateProjectsDashboardTable();
            },
            onCancelDeleteProjectClick: function (project) {
                this.$store.dispatch('administration/endAdministrationEditSession');
                project.isDeleting = false;
                this.editedProject = null;
            },
            getStatusElementText: function (value) {
                return this.$t(`application-data.${(_.invert(ProjectStatusType))[value].toLowerCase()}`);
            },
            getPrivacyElementText: function (value) {
                return this.$t(`application-data.${(_.invert(VisibilityType))[value].toLowerCase()}`);
            },
            showEnableProjectButton: function (project) {
                return project.Status === ProjectStatusType.Disabled;
            },
            showDisabledProjectButton: function (project) {
                return project.Status === ProjectStatusType.Enabled;
            },
            cancelProjectEditMode: function (project) {
                if (!project) {
                    return;
                }

                project.isEnabling  = false;
                project.isDisabling = false;
                project.isDeleting  = false;
            },
            isEditedProject: function (project) {
                return project.isEnabling || project.isDisabling || project.isDeleting;
            },
            isConfirmButtonDisabled: function () {
                return this.actionMessage.length > 500;
            }
        }
    }

</script>

<style lang="scss" scoped>

    .projects-dashboard-container {
        max-width: 1600px;
        padding: 40px 40px 0px 40px;
    }

    #projects-search-box {
        width: 400px;
    }

    .dashboard-action-button {
        margin-left: 0px;
        color: #FFF;
    }

    #delete-project-button {
        background-color: #F00;
        color: #FFF;
    }

    .project-action-content {
        text-align: left;
        font-size: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .edited-dashboard-project {
        height: 100px;
    }


</style>
