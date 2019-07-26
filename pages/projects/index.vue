<template>
    <section class="projects-section">
		<nuxt-link to="/create-project">
			<v-btn id="add-project-button"
				absolute fab top
				color="primary"
				>
					<v-icon>add</v-icon>
			</v-btn>
        </nuxt-link>
        <v-container id="projects-container" class="main-container pa-5">
			<v-layout row wrap>
				<v-flex xs6 project-card-col :key="i" v-for="(project, i) in displayedProjects">
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
							View all projects
					</v-btn>
				</v-flex>
			</v-layout>
        </v-container>
    </section>
</template>

<script>
import ProjectCard from '~/components/shared/projectCard.vue';
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
		}
	}
}

</script>

<style scoped>

  #projects-container {
	  max-width: 1200px;
  }

  #add-project-button {
	  right: 20vw;
  }

  .project-card-col {
    padding: 20px;
  }

  #view-all-projects-btn {
  	margin: auto;
  	display: block;
  }

</style>
