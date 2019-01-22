<template>
    <section class="community-section">
        <v-container id="community-container" class="main-container pa-1">
            <v-layout row wrap class="community-header-bar">
                <v-flex xs4 class="skills-filter-container px-3">
                    <span class="community-header-bar-label">Skills:</span>
                    <v-flex xs12>
                        <v-autocomplete 
                            item-text="Name" item-value="ID"
                            @input="updateFilterSkills"
                            v-model="filterSkills" :items="skills"
                            chips label="Select skills" multiple>
                            <template slot="selection" slot-scope="data">
                                <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeSkill(data.item)">
                                    {{ data.item.Name }}
                                </v-chip>
                            </template>
                        </v-autocomplete>
                    </v-flex>
                </v-flex>
                <v-flex xs4 class="px-3">
                    <span class="community-header-bar-label">Search by name:</span>
                    <v-text-field type="search" append-icon="search"
                        hide-details single-line placeholder="Search..." id="members-search-box"
                        v-model="searchTerm"
                        @keyup="onSearchKeyup"></v-text-field>
                </v-flex>
                <v-flex xs4 class="px-3">
                    <v-flex xs12>
                        <span class="community-header-bar-label">Sort:</span>
                    </v-flex>
                    <v-flex xs12 v-on:click="onSortByNameClick" class="sort-members-criteria pt-2 mt-1">
                        Name
                        <i class="material-icons" v-if="isSortByNameAscending">arrow_upward</i>
                        <i class="material-icons" v-if="!isSortByNameAscending">arrow_downward</i>
                    </v-flex>
                </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-5">
                <v-flex xs4 community-member :key="i" v-for="(member, i) in displayedCommunityMembers" class="mt-4">
                    <v-layout row wrap justify-center class="text-xs-center">
                        <v-flex xs12 class="member-avatar-container member-information-container mt-1">
                            <nuxt-link :to="`/profile/${member.ID}`">
                                <v-avatar size="120px">
                                    <img :src="require('~/assets/images/default-avatar.svg')" v-if="!member.ProfileImage" />
                                    <img :src="`data:image/;base64,${member.ProfileImage}`" v-if="member.ProfileImage" />
                                </v-avatar>
                            </nuxt-link>
                        </v-flex>
                        <v-flex xs12 class="member-name-container member-information-container mt-1">
                            <nuxt-link :to="`/profile/${member.ID}`">
                                <span>{{ member.FullName }}</span>
                            </nuxt-link>
                        </v-flex>
                        <v-flex xs12 class="member-skills-container member-information-container mt-1">
                            <nuxt-link :to="`/profile/${member.ID}`">
                                <v-chip :key="j" v-for="(skill, j) in member.Skills" class="member-skill">{{ skill }}</v-chip>
                            </nuxt-link>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 v-if="!hasLoadedAll()" justify-center class="mt-5 show-more-members-row">
                    <v-btn v-on:click="onShowMoreClick" color="primary" id = "show-more-members-btn">Show More</v-btn>
                </v-flex>
                <v-flex class="no-results-message text-xs-center mt-5" v-if="displayNoResultsMessage && !isLoading">
                    There are no members to display
                </v-flex>
            </v-layout>
        </v-container>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        components: {

        },
        middleware: ['authenticated', 'enabled'],
        data: () => ({
            communityMembers: [],
            communitySize: 0,
            skills: [],
            filterSkills: [],
            searchTerm: '',
            sortItems: ['Name ascending', 'Name descending'],
            page: 0,
            pageSize: 9,
            isSortByNameAscending: true,
			isLoading: false
        }),
        async asyncData ({ store, query, params }) {
            var requestQuery = {
                searchTerm: '',
                skills: '',
                sortOrientation: 'ASC',
                page: 0,
                pageSize: 9
            };

            await store.dispatch('users/getCommunityMembers', requestQuery);

            var communityMembers = store.state.users.communityMembers;
            var communitySize = store.state.users.communitySize;
            var skills = [...store.getters['applicationData/skills']];

            return {
                communityMembers,
                communitySize,
                skills: skills.sort((s1, s2) => s1.Name > s2.Name ? -1 : 1)
            };
        },
        methods: {
            updateFilterSkills: function () {
                this.page = 0;
                this.communityMembers = [];
                this.communitySize = 0;

                this.loadMore();
            },
            onSearchKeyup: function (event) {
                this.page = 0;
                this.communityMembers = [];
                this.communitySize = 0;

                this.loadMore();
            },
            onSortByNameClick: function () {
                this.isSortByNameAscending = !this.isSortByNameAscending;

                this.page = 0;
                this.communityMembers = [];
                this.communitySize = 0;
                this.loadMore();
            },
			onShowMoreClick: function () {
                this.page++;

				this.loadMore();
			},
			async loadMore () {
                if (this.isLoading) {
                    return;
                }

				this.isLoading = true;

                var requestQuery = {
                    searchTerm: this.searchTerm,
                    skills: this.filterSkills ? this.filterSkills.join(',') : '',
                    sortOrientation: this.isSortByNameAscending ? 'ASC' : 'DESC',
                    page: this.page,
                    pageSize: this.pageSize
                };

                await this.$store.dispatch('users/getCommunityMembers', requestQuery);

                if (this.page === 0) {
                    this.communityMembers = [];
                }

                this.communityMembers.push(...this.$store.state.users.communityMembers);
                this.communitySize    = this.$store.state.users.communitySize;

				this.isLoading = false;
			},
			hasLoadedAll: function () {
				return this.communityMembers.length === this.communitySize;
            },
            removeSkill (skill) {
                this.filterSkills.splice(this.filterSkills.indexOf(skill), 1);
                this.filterSkills = [...this.filterSkills];

                this.page = 0;
                this.communityMembers = [];
                this.communitySize = 0;

                this.loadMore();
            }
		},
        computed: {
            ...mapGetters({
                isAuthenticated: 'authentication/isAuthenticated'
            }),
            displayedCommunityMembers: function () {
                return this.communityMembers.map(m => {
                    var memberSkills = this.skills.filter(s => m.SkillIDs.indexOf(s.ID) !== -1);
                    var skills = memberSkills.slice(0, 2).map(s => s.Name);

                    var skillSurplus = memberSkills.length - 2;
                    if (skillSurplus > 0) {
                        var moreSkillsText = skillSurplus === 1 ? '+1 skill' : `+${skillSurplus} skills`;
                        skills.push(moreSkillsText);
                    }

                    return {
                        ID: m.ID,
                        FullName: `${m.FirstName} ${m.LastName}`,
                        ProfileImage: m.ProfileImage,
                        Skills: skills

                    };
                });
            },
            skillNameList: function () {
                return this.filterSkills.map(s => s.Name).sort();
            },
            displayNoResultsMessage: function () {
                return this.communityMembers.length === 0;
            }
        }
    }

</script>

<style lang="scss">
    
    .show-more-members-row {
        display: flex;
    }

    .member-information-container > * {
		text-decoration: none;
        color: initial;
    }
    
    .member-skill .v-chip__content {
        cursor: pointer;
    }

    .skills-filter-container {
        justify-content: center;
        align-items: center;

        .v-menu {
            position: initial;
        }
    }

    #members-search-box {
        margin-top: 10px;
        padding-bottom: 26px;
    }

    .sort-members-criteria {
        cursor: pointer;
    }

    .community-header-bar-label {
        font-weight: 500;
    }

    .no-results-message {
        font-size: 28px;
    }

</style>
