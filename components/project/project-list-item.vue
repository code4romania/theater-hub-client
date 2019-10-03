<template>
    <v-layout column>
        <v-flex
            xs12
            v-if="!isDeletingProject"
        >
            <v-layout
                row
                wrap
                align-center
                @mouseenter="isHovered = true"
                @mouseleave="isHovered = false"
            >
                <v-flex xs12 sm3 md3 lg3>
                    <v-layout
                        column
                        justify-center
                        v-bind:class="{'text-xs-center': hasCenteredImage}"
                    >
                        <v-flex xs12 class="project-image-container">
                            <v-avatar size="160px">
                                <img :src="require('~/assets/images/default-project-hero.jpg')" v-if="!project.Image" />
                                <img :src="project.Image" v-if="project.Image" />
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 sm9 md9 lg9>
                    <v-layout>
                        <v-flex xs12 pl-4>
                            <v-flex
                                xs12 class="project-information-row">
                                
                                <v-layout
                                    row
                                    wrap
                                    class="project-item-content"
                                >
                                    <v-flex
                                        xs12 sm8
                                        class="project-name-container"
                                    >
                                        <v-chip
                                            v-if="project.IsCompleted"
                                            class="ml-0 completed-project-tag"
                                            text-color="#FFF"
                                            color="#27AE60"
                                            label small
                                        >
                                            {{ $t('application-data.completed') }}
                                        </v-chip>
                                        <span class="project-name-field">
                                            {{project.Name }}
                                        </span>
                                    </v-flex>
                                    <v-flex
                                        xs12 sm4
                                        v-if="hasEditOptions"
                                    >
                                        <v-btn
                                            outline small fab
                                            class="edit-icon"
                                            nuxt :to="`/project/${project.ID}/edit`">
                                            <v-icon>edit</v-icon>
                                        </v-btn>
                                        <v-btn
                                            outline small fab
                                            class="remove-icon"
                                            v-on:click="onDeleteProjectClick()">
                                                <v-icon>delete</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex
                                v-if="showInitiator"
                                xs12 class="project-information-row">
                                    <span class="field-label">{{ $t('pages.project.initiator') }} </span>
                                    <span>{{ project.InitiatorName }} </span>
                            </v-flex>
                            <v-flex xs12 class="project-information-row">
                                <span class="field-label">{{ $t('pages.project.start-date') }} </span>
                                <span>{{ getFormattedDate(project.Date) }} </span>
                            </v-flex>
                            <v-flex xs12 class="project-information-row">
                                <span class="field-label">{{ $t('pages.project.city') }} </span>
                                <span>{{ project.City }} </span>
                            </v-flex>
                            <v-flex xs12 class="project-information-row">
                                <span class="field-label">{{ $t('pages.project.budget') }} </span>
                                <span>{{ project.Budget }} {{ project.Currency }} </span>
                            </v-flex>
                            <v-flex xs12 class="project-information-row">
                            <v-btn class="primary ml-0 view-project-button"
                                small
                                nuxt :to="`/project/${project.ID}`"
                            >
                                {{ $t('shared.content.view-project-link') }}
                            </v-btn>
                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex
            xs12
            v-if="isDeletingProject"
            class="highlighted-section"
        >
            <v-layout row wrap>
                <v-flex xs12 pa-5 ma-1>
                    <v-layout row>
                        <v-flex
                            xs12
                            class="project-row-actions"
                        >
                            <v-btn
                                outline
                                small
                                fab
                                class="done-delete-project"
                                v-on:click="onDoneDeleteProjectClick"
                            >
                                <v-icon>done</v-icon>
                            </v-btn>
                            <v-btn
                                outline
                                small
                                fab
                                class="cancel-delete-project"
                                v-on:click="onCancelDeleteProjectClick"
                            >
                                <v-icon>clear</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            {{ $t('pages.my-projects.delete-project-message') }}
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>

    </v-layout>
</template>

<script>
    import moment from 'moment';
    import { mapGetters, mapState } from 'vuex';

    export default {
        props: ['project', 'hasCenteredImage', 'showInitiator', 'isEditable', 'isFirstItem'],
        data: () => ({
            isHovered: false,
            isDeletingProject: false
        }),
        computed: {
            ...mapState(['users']),
            ...mapGetters({
                locale: 'locale'
            }),
            hasEditOptions: function () {
                return this.isEditable &&
                    (this.isFirstItem || this.isHovered);
            }
        },
        methods: {
            getFormattedDate (date) {
                return moment(date).locale(this.locale).format('LL');
            },
            onDeleteProjectClick () {
                this.isDeletingProject = true;
                this.$store.dispatch('users/initiateEditSectionSession');
            },
            onDoneDeleteProjectClick: function () {
                this.isDeletingProject = false;
                this.$store.dispatch('projects/delete', this.project.ID);
                this.$emit('handleDeleteProject', this.project.ID);
                this.$store.dispatch('users/endEditSectionSession');
            },
            onCancelDeleteProjectClick: function () {
                this.isDeletingProject = false;
                this.$store.dispatch('users/endEditSectionSession');
            }
        }
    }

</script>

<style lang="scss" scoped>

    .project-name-container {
        display: flex;
        align-items: center;
        min-height: 52px;
    }

    .project-name-field {
        font-size: 22px;
        font-weight: 700;
    }

    .view-project-button {
        text-transform: initial;
        width: 50%;
        max-width: 200px;
    }

    .project-image-container img {
        border: 8px solid rgba(151, 151, 151, 0.6);
    }
  
</style>
