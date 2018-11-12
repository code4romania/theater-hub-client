<template>
    <section class="community-section">
        <v-container id="community-container" class="main-container pa-1">
            <v-layout row wrap class="community-header-bar">
                <v-flex xs4 class="skills-filter-container px-3">
                    <span class="community-header-bar-label">Skills:</span>
                    <!-- <v-select v-model="filterSkills" :items="skills" label="Select skills" multiple chips></v-select> -->
                    <v-flex xs12>
                        <v-autocomplete v-model="filterSkills" :items="skills" chips label="Select skills" multiple>
                            <template slot="selection" slot-scope="data">
                                <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeSkill(data.item)">
                                    {{ data.item }}
                                </v-chip>
                            </template>
                        </v-autocomplete>
                    </v-flex>
                </v-flex>
                <v-flex xs4 class="px-3">
                    <span class="community-header-bar-label">Search by name:</span>
                    <v-text-field type="search" append-icon="search" hide-details single-line placeholder="Search..." id="members-search-box"></v-text-field>
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
                            <nuxt-link to="/profile">
                                <v-avatar size="120px">
                                    <img :src="member.profilePhoto">
                                </v-avatar>
                            </nuxt-link>
                        </v-flex>
                        <v-flex xs12 class="member-name-container member-information-container mt-1">
                            <nuxt-link to="/profile">
                                <span>{{ member.fullName }}</span>
                            </nuxt-link>
                        </v-flex>
                        <v-flex xs12 class="member-skills-container member-information-container mt-1">
                            <nuxt-link to="/profile">
                                <v-chip :key="j" v-for="(skill, j) in member.skills" class="member-skill">{{ skill }}</v-chip>
                            </nuxt-link>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 v-if="!hasLoadedAll()" justify-center class="mt-5 show-more-members-row">
                    <v-btn v-on:click="onShowMoreClick" color="primary" id = "show-more-members-btn">Show More</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </section>
</template>

<script>
    import { communityMembers, skills } from '~/store/constants/mockdata'

    export default {
        components: {

        },
        data: () => ({
            communityMembers,
			displayedCommunityMembers: [],
            skills: skills.sort(),
            filterSkills: [],
            searchTerm: '',
            sortItems: ['Name ascending', 'Name descending'],
            page: 1,
            isSortByNameAscending: true,
			isLoading: false
        }),
        methods: {
            initializeData: function () {
                this.communityMembers = this.communityMembers.map(m => {
                    m.fullName       = `${m.firstName} ${m.lastName}`;
                    var skillSurplus = m.skills.length - 2;
                    if (skillSurplus > 0) {
                        m.skills = m.skills.slice(0, 2);
                        var moreSkillsText = skillSurplus === 1 ? '+1 skill' : `+${skillSurplus} skills`;
                        m.skills.push(moreSkillsText);
                    }

                    return m;
                });

                this.displayedCommunityMembers = this.communityMembers.slice(0, 9);
            },
            onSortByNameClick: function () {
                this.isSortByNameAscending = !this.isSortByNameAscending;
            },
			onShowMoreClick: function () {
				this.loadMore();
			},
			loadMore: function () {
				this.isLoading = true;
                let pageSize   = 9;

				if (pageSize > this.communityMembers.length - this.displayedCommunityMembers.length) {
					pageSize = this.communityMembers.length - this.displayedCommunityMembers.length;
				} else {
					this.page++;
				}

				if (pageSize !== 0) {
					this.displayedCommunityMembers = this.displayedCommunityMembers.concat(this.communityMembers.slice(this.displayedCommunityMembers.length, this.displayedCommunityMembers.length + pageSize));
                }

				this.isLoading = false;
			},
			hasLoadedAll: function () {
				return this.displayedCommunityMembers.length === this.communityMembers.length;
            },
            getMemberFullName: function (member) {
                return `${member.firstName} ${member.lastName}`;
            },
            removeSkill (skill) {
                this.filterSkills.splice(this.filterSkills.indexOf(skill), 1);
                this.filterSkills = [...this.filterSkills];
            }
		},
        mounted () {
            this.initializeData();
        },
        computed: {
            filteredMembers: function () {
                return this.communityMembers.filter((member) => {
                    return member.fullName.match(this.searchTerm);
                });
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

</style>
