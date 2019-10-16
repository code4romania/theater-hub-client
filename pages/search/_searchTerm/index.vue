<template>
    <section class="search-section">
        <v-container id="search-container" class="main-container">

            <v-layout
                row wrap
                justify-center
                class="search-header-bar">
                <v-flex xs12 sm6>
                    <v-text-field
                        id="site-search"
                        class="search-field"
                        type="search"
                        append-icon="search"
                        @click:append="handleSearch"
                        v-on:keyup="handleSearchKeyup"
                        solo
                        hide-details
                        single-line
                        :placeholder="$t('fields.search.label')"
                        v-model="searchTerm"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout mt-3>
                <v-flex xs12 text-xs-center text-sm-left>
                    <h2 class="mt-5 mb-4 ml-4">
                        {{ $t('pages.search.community-results') }}
                    </h2>

                    <v-layout
                        v-if="hasCommunityMembers"
                        column>

                        <v-flex  xs12
                            :key="i" v-for="(member, i) in communityMembers"
                            class="mb-5">
                                <MemberSearchResult
                                    :member="member"
                                />
                        </v-flex>

                    </v-layout>

                    <v-layout
                        v-if="!hasLoadedAllCommunityMembers"
                        xs12
                        justify-center
                        class="mt-5 show-more-members-row">
                            <v-btn
                                v-on:click="onShowMoreCommunityMembersClick"
                                class="show-more-button"
                                color="primary">
                                    {{ $t('shared.content.show-more-button') }}
                            </v-btn>
                    </v-layout>

                    <v-flex
                        v-if="!hasCommunityMembers"
                        class="no-results-message text-xs-center mt-5">
                            {{ $t('pages.search.no-members-message') }}
                    </v-flex>

                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs12 text-xs-center text-sm-left>
                    <h2 class="mt-5 mb-4 ml-4">
                        {{ $t('pages.search.projects-results') }}
                    </h2>


                    <v-layout
                        v-if="hasProjects"
                        column>

                      <v-flex  xs12
                        :key="i" v-for="(project, i) in projects"
                        class="mb-5">
                            <ProjectListItem
                                :project="project"
                                :hasCenteredImage="true"
                                :showInitiator="true"
                            />
                        </v-flex>

                    </v-layout>

                    <v-layout
                        xs12
                        v-if="!hasLoadedAllProjects"
                        justify-center
                        class="mt-5 show-more-members-row">
                            <v-btn
                                v-on:click="onShowMoreProjectsClick"
                                class="show-more-button"
                                color="primary">
                                    {{ $t('shared.content.show-more-button') }}
                            </v-btn>
                    </v-layout>

                    <v-flex
                        v-if="!hasProjects"
                        class="no-results-message text-xs-center mt-5">
                            {{ $t('pages.search.no-projects-message') }}
                    </v-flex>

                </v-flex>
            </v-layout>

        </v-container>
    </section>
</template>

<script>

  import { Helpers } from '~/utils';
  import MemberSearchResult from '~/components/search/member-search-result';
  import ProjectListItem from '~/components/project/project-list-item';
  import { mapGetters } from 'vuex';
  import _ from 'lodash';

  export default {
    middleware: ['get-skills', 'get-currencies'],
    components: {
        MemberSearchResult,
        ProjectListItem
    },
    layout: ({ store }) => {
        if (!store.getters['authentication/isAuthenticated']) {
            return 'visitor';
        } else {
            return 'user';
        }
    },
    async asyncData ({ store, query, params }) {
        const communityPageSize = 5;
        const projectsPageSize  = 5;
        const searchTerm        = params.searchTerm || '';

        const communityRequestQuery = {
            searchTerm,
            page: 0,
            pageSize: communityPageSize,
            skills: '',
            includePersonalInformation: true
        };

        const projectsRequestQuery = {
            searchTerm,
            page: 0,
            pageSize: projectsPageSize
        };

        const communityResponse = await store.dispatch('users/getCommunityMembers', communityRequestQuery);
        const communityMembers  = communityResponse.Members || [];
        const communitySize     = communityResponse.CommunitySize;

        const projectsResponse 	= await store.dispatch('projects/getProjects', projectsRequestQuery);
        const projects 	        = projectsResponse.Projects || [];
        const projectsPageCount = projectsResponse.PageCount;

        return {
            searchTerm,
            communityMembers,
            communitySize,
            communityPageSize,
            communityPage: 0,
            projects,
            projectsPageCount,
            projectsPageSize,
            projectsPage: 0
        };
    },
    data: () => ({
      localizedSkills: []
    }),
    computed: {
      ...mapGetters({
            skills: 'applicationData/skills'
      }),
      hasCommunityMembers: function () {
        return this.communityMembers &&
                this.communityMembers.length !== 0;
      },
      hasProjects: function () {
        return this.projects &&
                this.projects.length !== 0;
      },
      hasLoadedAllCommunityMembers: function () {
          return this.communityMembers &&
                  this.communityMembers.length === this.communitySize;
      },
      hasLoadedAllProjects: function () {
          return this.projectsPage === this.projectsPageCount;
      }
    },
    methods: {
      initializeCommunityMembers: function (members) {
          return members.map(m => {
            var memberSkills    = this.localizedSkills.filter(s => m.SkillIDs.indexOf(s.ID) !== -1);
            var skills          = memberSkills.slice(0, 2);
            var skillSurplus    = memberSkills.length - 2;

            return {
                ...m,
                FullName: `${m.FirstName} ${m.LastName}`,
                Age: Helpers.getAge(m.BirthDate),
                Skills: skills,
                Surplus: skillSurplus > 0 ? `+${skillSurplus}` : ''
            };
          });
      },
      async onShowMoreCommunityMembersClick () {
        this.communityPage++;

        const communityRequestQuery = {
            searchTerm: this.searchTerm,
            page: this.communityPage,
            pageSize: this.communityPageSize,
            skills: '',
            includePersonalInformation: true
        };

        const communityResponse = await this.$store.dispatch('users/getCommunityMembers', communityRequestQuery);
        this.communityMembers   = this.communityMembers.concat(this.initializeCommunityMembers(communityResponse.Members));
      },
      async onShowMoreProjectsClick () {
        this.projectsPage++;

        const projectsRequestQuery = {
            searchTerm: this.searchTerm,
            page: this.projectsPage,
            pageSize: this.projectsPageSize
        };

        const projectsResponse 	= await this.$store.dispatch('projects/getProjects', projectsRequestQuery);
		this.projects  	        = this.projects.concat(projectsResponse.Projects);
      },
      handleSearch: function () {
        this.$router.push({ path: `/search/${this.searchTerm}` });
      },
      handleSearchKeyup: _.throttle(function (event) {
        this.handleSearch();
      }, 1000)
    },
    mounted: function () {
        this.localizedSkills = this.skills.map(s => {
                return {
                    ...s,
                    Name: this.$t(`application-data.skills.${s.ID}`)
                };
            }).sort((s1, s2) => s2.Name > s1.Name ? -1 : 1);

        this.communityMembers  = this.initializeCommunityMembers(this.communityMembers);

        // focus the search input when the page loads
        document.getElementById('site-search').focus();
    }
  }
</script>

<style lang="scss" scoped>

    .show-more-button {
        cursor: pointer;
    }

</style>
