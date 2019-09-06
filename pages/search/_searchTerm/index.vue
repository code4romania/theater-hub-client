<template>
    <section class="search-section">
        <v-container id="search-container" class="main-container pa-5 mt-5">

            <v-layout
                row wrap
                justify-center
                class="search-header-bar">
                <v-flex xs12 sm6>
                    <v-text-field
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

                    <v-layout column>

                      <v-flex  xs12
                        :key="i" v-for="(member, i) in displayedCommunityMembers"
                        class="mb-5">
                            <MemberSearchResult
                                :member="member"
                            />
                        </v-flex>

                    </v-layout>

                    <v-flex class="no-results-message text-xs-center mt-5" v-if="displayNoCommunityMembersMessage">
                        {{ $t('pages.search.no-members-message') }}
                    </v-flex>

                </v-flex>
            </v-layout>

            <v-layout mt-3>
                <v-flex xs12 text-xs-center text-sm-left>
                    <h2 class="mt-5 mb-4 ml-4">
                        {{ $t('pages.search.projects-results') }}
                    </h2>


                    <v-layout column>

                      <v-flex  xs12
                        :key="i" v-for="(project, i) in displayedProjects"
                        class="mb-5">
                            <ProjectListItem
                                :project="project"
                                :hasCenteredImage="true"
                                :showInitiator="true"
                            />
                        </v-flex>

                    </v-layout>

                    <v-flex class="no-results-message text-xs-center mt-5" v-if="displayNoProjectsMessage">
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
  import { searchPageResults } from '~/store/constants/mockdata';
  import { mapGetters } from 'vuex';

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
    data: () => ({
      searchTerm: '',
      communityMembers: searchPageResults.community,
      displayedCommunityMembers: [],
      projects: searchPageResults.projects,
      displayedProjects: [],
      localizedSkills: []
    }),
    computed: {
      ...mapGetters({
            skills: 'applicationData/skills'
      }),
      displayNoCommunityMembersMessage: function () {
        return this.communityMembers.length === 0;
      },
      displayNoProjectsMessage: function () {
        return this.projects.length === 0;
      }
    },
    async asyncData ({ store, query, params }) {
        return {
            searchTerm: params.searchTerm
        };
    },
    methods: {
      initializeCommunityMembers: function () {
          return this.communityMembers.map(m => {
            var memberSkills = this.localizedSkills.filter(s => m.SkillIDs.indexOf(s.ID) !== -1);
            var skills = memberSkills.slice(0, 2);
            var skillSurplus = memberSkills.length - 2;

            return {
                ...m,
                FullName: `${m.FirstName} ${m.LastName}`,
                Age: Helpers.getAge(m.BirthDate),
                Skills: skills,
                Surplus: skillSurplus > 0 ? `+${skillSurplus}` : ''
            };
          });
      },
      handleSearch: function () {
        this.$router.push({ path: `/search/${this.searchTerm}` });
      },
      handleSearchKeyup: function (event) {
        if (event.keyCode === 13) {
          this.$router.push({ path: `/search/${this.searchTerm}` });
        }
      }
    },
    mounted: function () {
        this.localizedSkills = this.skills.map(s => {
                return {
                    ...s,
                    Name: this.$t(`application-data.${s.Name}`)
                };
            }).sort((s1, s2) => s2.Name > s1.Name ? -1 : 1);

        this.displayedCommunityMembers  = this.initializeCommunityMembers();
        this.displayedProjects          = this.projects;
    }
  }
</script>

<style lang="scss" scoped>

</style>
