<template>
    <section class="my-projects-section">
        <v-container 
            id="my-projects-container"
            class="main-container pa-5">
            <v-layout>
                <v-flex xs12>
                    <h1 class="page-title">{{ $t('pages.my-projects.title') }}</h1>
                </v-flex>
            </v-layout>
            <v-layout
                v-if="hasProjects"
                column
                mt-5>

                <v-flex  xs12
                    :key="index" v-for="(project, index) in myProjects"
                    class="mb-5">
                        <ProjectListItem
                            :project="project"
                            :showInitiator="false"
                            :isEditable="true"
                            :isFirstItem="index === 0"
                            @handleDeleteProject="handleDeleteProject"
                        />
                </v-flex>

            </v-layout>
            <v-layout
                v-if="!hasProjects"
                column
                mt-5
            >
                <v-flex
                    xs12
                    my-3
                    text-xs-center
                    class="no-projects-message"
                >
                    {{ $t('pages.my-projects.no-projects-message') }}
                </v-flex>
                <v-flex
                    xs12
                    my-3
                    text-xs-center
                >
                    <v-btn
                        class="view-project-button"
                        color="primary"
                        nuxt :to="`/create-project`"
                        ripple
                    >
                        {{ $t('pages.my-projects.go-to-create-project') }}
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <v-snackbar
            v-model="snackbar"
            :timeout="3000">
                {{ snackbarText }}
                <v-btn color="blue" flat @click="snackbar = false">{{ $t('shared.content.close') }}</v-btn>
        </v-snackbar>
    </section>
</template>

<script>

    import ProjectListItem from '~/components/project/project-list-item';

    export default {
        layout: 'user',
        middleware: ['authenticated', 'get-tags'],
        components: {
            ProjectListItem
        },
        data: () => ({
            snackbar: false,
            snackbarText: ''
        }),
        async asyncData ({ store, query, params }) {
            const myProjects = await store.dispatch('users/getMyProjects');

            return {
                myProjects
            };
        },
        methods: {
            handleDeleteProject (id) {
                this.myProjects     = this.myProjects.filter(p => p.ID !== id);
                this.snackbarText   = this.$t('pages.my-projects.snackbar-messages.project-deleted');
                this.snackbar       = true;
            }
        },
        computed: {
            hasProjects: function () {
                return this.myProjects && this.myProjects.length !== 0;
            }
        }
    }

</script>

<style scoped>

    .no-projects-message {
        font-size: 24px;
    }

</style>
