<template>
    <section class="projects-section">
        <v-container id="projects-container" class="main-container pa-5">
			<v-layout row justify-center>
				<v-flex xs12 sm6>
					<v-text-field type="search" append-icon="search"
					 	id="projects-search-box"
						solo hide-details single-line
						:placeholder="$t('fields.projects-search.label')"
						v-model="searchTerm"
						@keyup="onSearchKeyup">
					</v-text-field>
				</v-flex>
			</v-layout>
			<v-layout row wrap mt-5>
				<v-flex xs12 md6 project-card-col :key="i" v-for="(project, i) in displayedProjects">
					<ProjectCard
						:project_url="project.project_url"
						:project_title="project.project_title"
						:project_image="project.project_image"
						:project_abstract="project.project_abstract"
						:project_initiator="project.project_initiator"
						:project_roles_number="project.project_roles_number"
					/>
				</v-flex>
				<v-flex xs12 v-if="!hasLoadedAll()">
					<v-btn v-on:click="handleViewAllProjectsClick"
						color="primary"
						id = "view-all-projects-btn">
							{{ $t('pages.homepage.view-all-projects-link') }}
					</v-btn>
				</v-flex>
			</v-layout>
			<v-layout class="view-link-container">
				<v-flex xs12 mt-3 mb-3 text-xs-center>
					<a class="view-link" v-on:click="handleShowMoreClick">
						{{ $t('shared.content.show-more-button') }}
					</a>
				</v-flex>
			</v-layout>
        </v-container>
    </section>
</template>

<script>
import ProjectCard from '~/components/project/project-card.vue';
import { projects } from '~/store/constants/mockdata'

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
    middleware: ['visitor-or-enabled-user'],
	data: () => ({
		projects,
		displayedProjects: projects.slice(0, 9),
        searchTerm: '',
		page: 1,
		isLoading: false
	}),
	methods: {
		handleViewAllProjectsClick: function () {
			this.isLoading  = true;
            let pageSize    = 9;

			if (pageSize > this.projects.length - this.displayedProjects.length) {
				pageSize = this.projects.length - this.displayedProjects.length
			} else {
				this.page++
            }

			if (pageSize !== 0) {
                this.displayedProjects = this.displayedProjects
                                .concat(this.projects.slice(this.displayedProjects.length, this.displayedProjects.length + pageSize));
            }

			this.isLoading = false
		},
		hasLoadedAll: function () {
			return this.displayedProjects.length === this.projects.length
		},
        async onSearchKeyup (event) {

        },
		handleShowMoreClick: function () {

		}
	}
}

</script>

<style scoped>

  #projects-container {
	  max-width: 1200px;
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
