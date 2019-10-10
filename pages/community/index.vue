<template>
    <section
        class="community-section"
    >
        <v-container
            class="main-container"
        >
            <v-layout row wrap class="community-header-bar">
                <v-flex xs12 sm5 md5 lg5 mx-2 mb-1>
                    <v-text-field type="search" append-icon="search" solo
                        hide-details single-line :placeholder="$t('fields.search.label')"
                        id="members-search-box"
                        v-model="searchTerm"
                        @keyup="onSearchKeyup">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 sm5 md5 lg5 mx-2 mb-1 class="skills-filter-container">
                    <v-flex xs12>
                        <v-autocomplete 
                            item-text="Name"
                            item-value="ID"
                            :no-data-text="$t('pages.community.no-search-results')"
                            @input="updateFilterSkills"
                            v-model="filterSkills"
                            :items="localizedSkills"
                            chips :label="$t('fields.search-by-skills.label')" multiple solo append-icon="search">
                            <template slot="selection" slot-scope="data">
                                <v-chip :selected="data.selected" close class="skill secondary-color mr-2"
                                                                                @input="removeSkill(data.item)">
                                    {{ data.item.Name }}
                                </v-chip>
                            </template>
                        </v-autocomplete>
                    </v-flex>
                </v-flex>
            </v-layout>

            <v-layout column wrap class="community-layers-wrapper" v-if="inCommunityLayersView">
                <v-layout
                    v-for="(layer, i) in communityLayers"
                    :key="i"
                    column
                    class="skill-section"
                >

                    <v-flex xs12 class="skill-section-title">
                        <div
                            v-if="layer.Image"
                            :id="`skill-image-wrapper-${layer.SkillID}`"
                            class="skill-image-wrapper"
                        >
                        </div>
                        <span class="skill-name">{{ $t(`application-data.${layer.SkillName}`) }}</span>
                    </v-flex>
                    <v-flex xs12 class="skill-section-members">
                        <v-layout row wrap>

                            <v-flex xs6 sm4 md3 lg3
                                community-member
                                :key="i" v-for="(member, i) in layer.Members"
                                class="mt-4">
                                    <CommunityMember
                                        @handleSkillClick="handleSkillClick"
                                        :member="member"
                                        :showName="true"
                                        :hasClickableSkills="true"
                                    />
                            </v-flex>

                            <v-flex xs6 sm4 md3 lg3 community-member class="mt-4" v-if="layer.HasMore">
                                <div class="view-all-container secondary-color" v-on:click="handleViewAllClick(layer)">
                                    <span class="view-all-text">{{ $t('pages.community.view-all') }}</span>
                                </div>
                            </v-flex>

                        </v-layout>  
                    </v-flex>
                </v-layout>
            </v-layout>

            <v-layout row wrap class="community-members-wrapper" v-if="!inCommunityLayersView">

                <v-flex xs6 sm4 md3 lg3
                    community-member
                    :key="i" v-for="(member, i) in communityMembers"
                    class="mt-4">
                        <CommunityMember
                            :member="member"
                            :showName="true"
                            @handleSkillClick="handleSkillClick"
                        />
                </v-flex>

            </v-layout>

            <v-flex xs12 v-if="!hasLoadedAll" justify-center class="mt-5 show-more-members-row">
                <v-btn v-on:click="onShowMoreClick"
                    color="primary" id = "show-more-members-btn">
                        {{ $t('shared.content.show-more-button') }}
                </v-btn>
            </v-flex>
            <v-flex
                class="no-results-message text-xs-center mt-5"
                v-if="displayNoResultsMessage && !isLoading">
                    {{ $t('pages.community.no-members-message') }}
            </v-flex>

        </v-container>
    </section>
</template>

<script>
    import CommunityMember from '~/components/community/community-member.vue';
    import { mapGetters } from 'vuex';
    import _ from 'lodash';

    export default {
        components: {
            CommunityMember
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
        middleware: ['visitor-or-enabled-user', 'get-skills'],
        data: () => ({
            communityMembers: [],
            communitySize: 0,
            filterSkills: [],
            searchTerm: '',
            page: 0,
            pageSize: 9,
            isLoading: false
        }),
        async asyncData ({ store, query, params }) {
            var requestQuery = {
                searchTerm: '',
                page: 0,
                pageSize: 3
            };

            let communityLayers = [];

            await store.dispatch('users/getCommunityLayers', requestQuery).then(response => {
                communityLayers = response.Layers;
            });

            return {
                communityLayers
            };
        },
        methods: {
            initializeCommunityMembers: function (members) {
                return members.map(m => {
                    var memberSkills = this.localizedSkills.filter(s => m.SkillIDs.indexOf(s.ID) !== -1);
                    var skills = memberSkills.slice(0, 2);

                    var skillSurplus = memberSkills.length - 2;

                    return {
                        ID: m.ID,
                        FullName: `${m.FirstName} ${m.LastName}`,
                        Username: m.Username,
                        ProfileImage: m.ProfileImage,
                        Skills: skills,
                        Surplus: skillSurplus > 0 ? `+${skillSurplus}` : ''
                    };
                });
            },
            initializeCommunityLayers: function () {
                this.communityLayers.forEach(l => {
                    var skill   = this.skills.find(s => s.ID === l.SkillID);
                    l.SkillName = skill.Name;

                    l.Members = this.initializeCommunityMembers(l.Members);
                    l.Image   = skill.Image;

                    setTimeout(() => {
                        if (skill.Image) {
                            var element = document.getElementById(`skill-image-wrapper-${l.SkillID}`);

                            element.innerHTML = skill.Image;
                        }
                    }, 0);
                });

                this.communityLayers = this.communityLayers.sort((l1, l2) => l1.SkillName > l2.SkillName ? 1 : -1);
            },
            async loadCommunityLayers () {
                if (this.isLoading) {
                    return;
                }

				this.isLoading = true;

                var requestQuery = {
                    searchTerm: this.searchTerm,
                    page: 0,
                    pageSize: 3
                };

                await this.$store.dispatch('users/getCommunityLayers', requestQuery).then(response => {
                    this.communityLayers = response.Layers;

                    this.initializeCommunityLayers();
                    this.isLoading = false;
                });
            },
			async loadCommunityMembers () {
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

                await this.$store.dispatch('users/getCommunityMembers', requestQuery).then(response => {
                    this.communityMembers  = this.communityMembers.concat(this.initializeCommunityMembers(response.Members));

                    this.communitySize = response.CommunitySize;
                    this.isLoading = false;
                });
            },
            onShowMoreClick: function () {
                this.page++;

				this.loadCommunityMembers();
            },
            handleSkillClick: function (skill) {
                if (this.filterSkills.indexOf(skill.ID) !== -1) {
                    return;
                }

                this.filterSkills.push(skill.ID);

                this.updateFilterSkills();
            },
            updateFilterSkills: function () {
                this.communityMembers = [];
                this.communitySize = 0;
                this.page = 0;

                this.loadCommunityMembers();
            },
            onSearchKeyup: _.throttle(function () {
                if (this.inCommunityLayersView) {
                    this.loadCommunityLayers();
                    return;
                }

                this.communityMembers = [];
                this.communitySize = 0;
                this.page = 0;

                this.loadCommunityMembers();
            }, 1000),
            removeSkill (skill) {
                this.filterSkills.splice(this.filterSkills.indexOf(skill.ID), 1);
                this.filterSkills = [...this.filterSkills];

                this.communityMembers = [];
                this.communitySize = 0;
                this.page = 0;

                if (this.inCommunityLayersView) {
                    this.loadCommunityLayers();
                } else {
                    this.loadCommunityMembers();
                }
            },
            async handleViewAllClick (layer) {
                this.filterSkills = [layer.SkillID];

                this.loadCommunityMembers();
            }
		},
        computed: {
            ...mapGetters({
                skills: 'applicationData/skills'
            }),
            inCommunityLayersView: function () {
                return this.filterSkills.length === 0;
            },
            displayNoResultsMessage: function () {
                return (this.communityMembers.length === 0 && !this.inCommunityLayersView) ||
                                                        (this.communityLayers.length === 0 && this.inCommunityLayersView);
            },
            hasLoadedAll: function () {
				return this.communityMembers.length === this.communitySize;
            },
            localizedSkills: function () {
                return this.skills.map(s => {
                    return {
                        ...s,
                        Name: this.$t(`application-data.${s.Name}`)
                    };
                }).sort((s1, s2) => s2.Name > s1.Name ? -1 : 1);
            }
        },
        mounted: function () {
            this.initializeCommunityLayers();
        }
    }

</script>

<style lang="scss">
    
    .community-header-bar {
        justify-content: center;

        label {
            font-weight: 500;
            font-family: Titillium Web;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            color: #000 !important;
        }

    }

    .skill-section {
        margin-top: 30px;

        &:first-of-type {
            margin-top: 0px;
        }

        .skill-image-wrapper {
            width: 40px;
            height: 40px;
            margin-left: 10px;
        }
    }

    .skill-section-title {
        display: flex;
        align-items: center;

        .skill-name {
            margin-left: 10px;
            text-transform: capitalize;
            font-family: Titillium Web;
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
        }
    }

    .view-all-container {
        width: 160px;
        max-width: 160px;
        height: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
        font-size: 22px;

        span {
            text-decoration: underline;
        }
    }

    .show-more-members-row {
        display: flex;
    }

</style>
