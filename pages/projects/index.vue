<template>
    <section
		class="projects-section"
	>
        <v-container
			class="main-container large"
		>
			<v-layout row justify-center>
				<v-flex
					xs12 sm6
					class="projects-search-container"
				>
					<v-text-field type="search" append-icon="search"
					 	id="projects-search-box"
						solo hide-details single-line
						:placeholder="$t('fields.projects-search.label')"
						v-model="searchTerm"
						@keyup="handleSearchKeyup">
					</v-text-field>
				</v-flex>
			</v-layout>
			<v-layout row wrap mt-5>
				<v-flex xs12 md6 project-card-col :key="i" v-for="(project, i) in projects">
					<ProjectCard
						:project_id="project.ID"
						:project_title="project.Name"
						:project_image="project.Image"
						:project_abstract="project.Abstract"
						:project_username="project.InitiatorUsername"
						:project_initiator="project.InitiatorName"
						:project_city="project.City"
                  		:project_is_completed="project.IsCompleted"
					/>
				</v-flex>
			</v-layout>
			<v-layout
				v-if="!hasLoadedAll"
				class="view-link-container">
				<v-flex xs12 mt-3 mb-3 text-xs-center>
					<a class="view-link" v-on:click="handleShowMoreClick">
						{{ $t('shared.content.show-more-button') }}
					</a>
				</v-flex>
			</v-layout>
			<v-layout
				v-if="displayNoResultsMessage && !isLoading">
				<v-flex
					class="no-results-message text-xs-center mt-5">
						{{ $t('pages.projects.no-projects-message') }}
				</v-flex>
			</v-layout>
        </v-container>
    </section>
</template>

<script>
import ProjectCard from '~/components/project/project-card.vue';
import _ from 'lodash';

export default {
	components: {
		ProjectCard
	},
    layout: ({ store }) => {
        if (!store.getters['authentication/isAuthenticated']) {
            return 'visitor';
        } else if (store.getters['users/isAdmin']) {
            return 'administration';
        } else {
            return 'user';
        }
    },
    middleware: ['visitor-or-enabled-user', 'get-tags'],
    async asyncData ({ store, query, params }) {
        var requestQuery = {
            searchTerm: '',
            page: 0,
            pageSize: 4
		};

		const response 	= await store.dispatch('projects/getProjects', requestQuery);
		const projects 	= response.Projects;
		const page		= response.Page;
		const pageSize	= response.PageSize;
		const pageCount	= response.PageCount;

        return {
			projects,
			page,
			pageSize,
			pageCount
		};
	},
	data: () => ({
        searchTerm: '',
		isLoading: false
	}),
	methods: {
		async loadProjects () {
            if (this.isLoading) {
                return;
            }

			this.isLoading = true;

			var requestQuery = {
                searchTerm: this.searchTerm,
                page: this.page,
                pageSize: this.pageSize
			};

            await this.$store.dispatch('projects/getProjects', requestQuery).then(response => {
				this.projects  	= this.projects.concat(response.Projects);
				this.pageCount	= response.PageCount;
				this.page		= response.Page;
                this.isLoading 	= false;
            });
		},
        handleSearchKeyup: _.throttle(function () {
            if (this.isLoading) {
                return;
            }

            this.projects = [];
            this.pageCount = 0;
			this.page = 0;

			this.loadProjects();
        }, 1000),
		async handleShowMoreClick () {
			this.page++;

			this.loadProjects();
		}
	},
    computed: {
		hasLoadedAll: function () {
			return this.page === this.pageCount;
		},
        displayNoResultsMessage: function () {
            return this.projects.length === 0;
        }
	},
	mounted: function () {
	}
}

</script>

<style>

	.projects-search-container {
		padding: 0px 20px;
	}

  .project-card-col {
    padding: 20px;
  }

  .view-link {
  	font-size: 24px;
    color: #00F;
    text-decoration: underline;
  }

</style>
