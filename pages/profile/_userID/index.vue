<template>
    <section class="profile-section">
        <v-container id="profile-container" class="main-container mt-5 pa-5">

            <v-layout row wrap v-if="!profile">
                <v-flex>
                    <h1 class="mb-3">{{ $t('pages.profile.invalid-profile-title') }}</h1>
                </v-flex>
                <v-flex xs12>
                    <p>
                        {{ $t('pages.profile.invalid-profile-content') }}
                    </p>
                </v-flex>
            </v-layout>

            <v-layout row wrap v-if="profile">

                <v-flex  xs10 class="mb-5">
                    <v-layout row wrap align-center>
                        <v-flex xs12 sm12 md6 lg5>
                            <v-avatar>
                                <img :src="require('~/assets/images/default-avatar.svg')" v-if="!profileImage" />
                                <img :src="profileImage" v-if="profileImage" />
                            </v-avatar>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg7 class="general-information">
                            <v-layout>
                                <v-flex xs12 pl-4>
                                    <v-flex xs12 class="profile-information-row name-information-row">
                                        <span class="full-name-field">{{ fullName }}</span>
                                        <span class="name-separator">,</span>
                                        <span class="age-field">{{ age }} {{ $t('shared.content.years-old') }}</span>
                                    </v-flex>
                                    <v-flex xs12 mt-2 class="profile-information-row">
                                        <span class="field-label">{{ $t('fields.email.label') }}: </span>
                                        <span class="email-field">{{ profile.profileGeneralInformation.email }}</span>
                                        <a class="email-icon" :href="`mailto:${profile.profileGeneralInformation.email}`">
                                            <v-icon>email</v-icon>
                                        </a>
                                    </v-flex>
                                    <v-flex xs12 class="profile-information-row">
                                        <span class="field-label">{{ $t('fields.phone-number.label') }}: </span>
                                        <span class="phone-number-field">{{ profile.profileGeneralInformation.phoneNumber }}</span>
                                        <a class="phone-icon" :href="`tel:${profile.profileGeneralInformation.phoneNumber}`">
                                            <v-icon>phone</v-icon>
                                        </a>
                                    </v-flex>
                                    <v-flex xs12 v-if="profile.profileGeneralInformation.website" class="profile-information-row">
                                        <span class="field-label">{{ $t('fields.website.label') }}: </span>
                                        <a :href="profile.profileGeneralInformation.website" class="website-field" target="_blank">{{ profile.profileGeneralInformation.website }}</a>
                                    </v-flex>
                                    <v-flex mt-3 class="profile-information-row">
                                        <a v-if="profile.profileGeneralInformation.facebookLink" class="social-media-icon-wrapper" :href="profile.profileGeneralInformation.facebookLink" target="_blank">
                                            <img class="social-media-icon" :src="require('~/assets/images/facebook.png')" />
                                        </a>
                                        <a v-if="profile.profileGeneralInformation.instagramLink" class="social-media-icon-wrapper" :href="profile.profileGeneralInformation.instagramLink" target="_blank">
                                            <img class="social-media-icon" :src="require('~/assets/images/instagram.png')" />
                                        </a>
                                        <a v-if="profile.profileGeneralInformation.linkedinLink" class="social-media-icon-wrapper" :href="profile.profileGeneralInformation.linkedinLink" target="_blank">
                                            <img class="social-media-icon" :src="require('~/assets/images/linkedin.png')" />
                                        </a>
                                        <a v-if="profile.profileGeneralInformation.youtubeLink" class="social-media-icon-wrapper" :href="profile.profileGeneralInformation.youtubeLink" target="_blank">
                                            <img class="social-media-icon" :src="require('~/assets/images/youtube.png')" />
                                        </a>
                                    </v-flex>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 v-if="hasDescription">
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.description-title') }}</h2>
                        </v-flex>
                        <v-flex xs12 pt-4>
                            <p>
                                {{ profile.profileGeneralInformation.description }}
                            </p>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 my-5>
                    <v-divider class="profile-section-separator"></v-divider>
                </v-flex>

                <v-flex xs12>
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.skills-title') }}</h2>
                        </v-flex>
                        <v-flex xs12 pt-4 class="skills-row">
                            <v-chip :key="i" v-for="(skill, i) in skillNameList" class="skill secondary-color mr-2">{{ skill }}</v-chip>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 my-5 v-if="hasPhotoGallery">
                    <v-divider class="profile-section-separator"></v-divider>
                </v-flex>

                <v-flex xs12 v-if="hasPhotoGallery" class="photo-gallery-section">
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.photo-gallery-title') }}</h2>
                        </v-flex>
                        <v-flex xs12 pt-4 class="photo-gallery-row">
                            <no-ssr>
                                <gallery :images="portfolioFullImages" :index="portfolioImagesIndex" @close="portfolioImagesIndex = null"></gallery>
                            </no-ssr>
                            <Carousel @handleCarouselItemClick="handleCarouselItemClick" :selectedIndex="portfolioImagesIndex" :items="portfolioImages"></Carousel>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 my-5 v-if="hasVideoGallery">
                    <v-divider class="profile-section-separator"></v-divider>
                </v-flex>

                <v-flex xs12>
                    <v-layout row wrap class="profile-information-group" v-if="hasVideoGallery">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.video-gallery-title') }}</h2>
                        </v-flex>
                        <v-flex xs12 pt-4 class="video-gallery-row">
                            <v-layout row wrap>
                                <v-flex xs12 sm12 md12 lg6 pa-1
                                    :key="`video-${videoIndex}`" v-for="(video, videoIndex) in profile.profileVideoGallery.videoGallery">
                                    <iframe class="video-iframe" :src="video.embedLink" width="420" height="315" allowfullscreen></iframe>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 my-5 v-if="hasAchievements">
                    <v-divider class="profile-section-separator"></v-divider>
                </v-flex>

                <v-flex xs12 mb-5 pb-5>
                    <v-layout row wrap class="profile-information-group" v-if="hasAchievements">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.achievements-title') }}</h2>
                        </v-flex>
                        <v-flex xs12 pt-5 class="timeline-row">
                            <v-layout row wrap class="profile-information-group">
                                <v-flex xs12>
                                    <v-timeline dense>

                                        <v-timeline-item medium hide-dot right class="timeline-header-item" v-if="hasAwards">
                                            <v-card class="timeline-header-card elevation-2">
                                                <v-card-title class="secondary-color">
                                                    <h2 class="timeline-header">{{ $t('pages.profile.awards-title') }}</h2>
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item
                                            :key="`award-${awardIndex}`"
                                            v-for="(award, awardIndex) in profile.profileAwards.awards"
                                            color="primary" small fill-dot right>
                                                <v-card class="elevation-2">
                                                    <v-card-title>
                                                        <v-layout row class="timeline-item-action-row">
                                                            <v-flex xs10>
                                                                <span class="award-title">{{ award.title }}</span>, <span class="award-issuer ml-1">{{ award.issuer }}</span>
                                                                -
                                                                <span class="timeline-date">{{ getTimelineDate(award.date) }}</span>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-card-title>
                                                    <v-card-text v-if="award.description">
                                                        <p class="award-description">
                                                            {{ award.description }}
                                                        </p>
                                                    </v-card-text>
                                                </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item medium hide-dot right class="timeline-header-item" v-if="hasExperience">
                                            <v-card class="timeline-header-card elevation-2">
                                                <v-card-title class="secondary-color">
                                                    <h2 class="timeline-header">{{ $t('pages.profile.experience-title') }}</h2>
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item
                                            :key="`experience-${experienceIndex}`"
                                            v-for="(step, experienceIndex) in profile.profileExperience.experienceSteps"
                                            color="primary" small fill-dot right>
                                                <v-card class="elevation-2">
                                                    <v-card-title>
                                                        <v-layout row wrap>
                                                            <v-flex xs10 class="timeline-item-action-row">
                                                                <span class="experience-position">{{ step.position }}</span>, <span class="experience-employer ml-1">{{ step.employerName }}</span>
                                                            </v-flex>
                                                            <v-flex xs12>
                                                                <span class="timeline-date">{{ `${getTimelineDate(step.startDate)} - ${getTimelineDate(step.endDate)}` }}</span>
                                                            </v-flex>
                                                        </v-layout>
                                                        
                                                    </v-card-title>
                                                    <v-card-text v-if="step.description">
                                                        <p class="experience-description">
                                                            {{ step.description }}
                                                        </p>
                                                    </v-card-text>
                                                </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item  medium hide-dot right class="timeline-header-item" v-if="hasEducation">
                                            <v-card class="timeline-header-card elevation-2">
                                                <v-card-title class="secondary-color">
                                                    <h2 class="timeline-header">{{ $t('pages.profile.education-title') }}</h2>
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item
                                            :key="`education-${educationIndex}`"
                                            v-for="(step, educationIndex) in profile.profileEducation.educationSteps"
                                            color="primary" small fill-dot right>
                                                <v-card class="elevation-2">
                                                    <v-card-title>
                                                        <v-layout row wrap>
                                                            <v-flex xs10 class="timeline-item-action-row">
                                                                <span class="education-title">{{ step.title }}</span>, <span class="education-institution ml-1">{{ step.institutionName }}</span>
                                                            </v-flex>
                                                            <v-flex xs12>
                                                                <span class="timeline-date">{{ `${getTimelineDate(step.startDate)} - ${getTimelineDate(step.endDate)}` }}</span>
                                                            </v-flex>
                                                        </v-layout>
                                                        
                                                    </v-card-title>
                                                    <v-card-text v-if="step.description">
                                                        <p class="education-description">
                                                            {{ step.description }}
                                                        </p>
                                                    </v-card-text>
                                                </v-card>
                                        </v-timeline-item>
                                    </v-timeline>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>


                <v-flex
                    v-if="hasProjects"
                    xs12 my-5
                >
                    <v-divider class="profile-section-separator"></v-divider>
                </v-flex>
                <v-flex
                    v-if="hasProjects"
                    xs12
                >
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.projects-title') }}</h2>
                        </v-flex>
                        <v-flex
                            xs12 md6 mt-2
                            :key="`profile-project-${projectIndex}`"
                            v-for="(project, projectIndex) in profile.projects"
                            class="profile-project-item"
                        >
                            <ProjectCard
                                :project_id="project.ID"
                                :project_title="project.Name"
                                :project_image="project.Image"
                                :project_abstract="project.Abstract"
                                :project_is_completed="project.IsCompleted"
                                :has_border="false"
                            />
                        </v-flex>
                    </v-layout>
                </v-flex>

            </v-layout>

        </v-container>
    </section>
</template>

<script>

    import moment from 'moment';
    import { mapGetters, mapState } from 'vuex';
    import ProjectCard from '~/components/project/project-card.vue';
    import Carousel from '~/components/shared/carousel.vue';
    import { SocialMediaManager } from '~/utils';

    export default {
        components: {
            ProjectCard,
            Carousel
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
        data: () => ({
            portfolioImagesIndex: null
        }),
        async asyncData ({ store, query, params }) {
            await store.dispatch('users/getCommunityMemberProfile', params.userID);

            var response = store.state.users.communityMemberProfile;

            if (response) {
                var skills   = store.getters['applicationData/skills'];

                var profile = {};

                profile.profileGeneralInformation   = {
                    profileImage: response.ProfileImage || {},
                    birthDate: response.BirthDate ? response.BirthDate.substr(0, 10) : '',
                    phoneNumber: response.PhoneNumber,
                    description: response.Description,
                    website: response.Website,
                    firstName: response.FirstName,
                    lastName: response.LastName,
                    email: response.Email,
                    username: response.Username,
                    instagramLink: response.InstagramLink,
                    youtubeLink: response.YoutubeLink,
                    facebookLink: response.FacebookLink,
                    linkedinLink: response.LinkedinLink
                };

                profile.profileSkills = {
                    selectedSkills: skills
                            .filter(s => response.Skills.indexOf(s.ID.toString()) !== -1)
                            .sort((s1, s2) => s2.Name > s1.Name)
                };

                profile.profilePhotoGallery = {
                    photoGallery: response.PhotoGallery
                };

                profile.profileVideoGallery = {
                    videoGallery: response.VideoGallery.map(v => {
                        return {
                            id: v.ID,
                            link: v.Video,
                            embedLink: SocialMediaManager.extractEmbedURLFromUnknownProvider(v.Video),
                            isValid: true
                        };
                    })
                };

                profile.profileAwards = {
                    awards: response.Awards.map(a => {
                        return {
                            id: a.ID,
                            title: a.Title,
                            issuer: a.Issuer,
                            description: a.Description,
                            date: a.Date.substr(0, 7)
                        };
                    })
                };

                profile.profileExperience = {
                    experienceSteps: response.Experience.map(e => {
                        return {
                            id: e.ID,
                            position: e.Position,
                            employerName: e.Employer,
                            description: e.Description,
                            startDate: e.StartDate.substr(0, 7),
                            endDate: e.EndDate.substr(0, 7)
                        };
                    })
                };

                profile.profileEducation = {
                    educationSteps: response.Education.map(e => {
                        return {
                            id: e.ID,
                            title: e.Title,
                            institutionName: e.Institution,
                            description: e.Description,
                            startDate: e.StartDate.substr(0, 7),
                            endDate: e.EndDate.substr(0, 7)
                        };
                    })
                };

                profile.projects = response.Projects;

                return {
                    profile
                };
            }
        },
        methods: {
            getTimelineDate (date) {
                return moment(date).format('MM/YYYY');
            },
            handleCarouselItemClick: function (itemIndex) {
                this.portfolioImagesIndex = itemIndex;
            }
        },
        computed: {
            ...mapState(['authentication', 'users']),
            ...mapGetters({
                skills: 'applicationData/skills'
            }),
            fullName: function () {
                return `${this.profile.profileGeneralInformation.firstName} ${this.profile.profileGeneralInformation.lastName}`;
            },
            profileImage: function () {
                if (!this.profile.profileGeneralInformation.profileImage) {
                    return null;
                }

                return this.profile.profileGeneralInformation.profileImage.ThumbnailLocation;
            },
            skillNameList: function () {
                return this.profile.profileSkills.selectedSkills.map(s => this.$t(`application-data.${s.Name}`)).sort();
            },
            age: function () {
                var currentDateMoment = moment(new Date());
                var birthDateMoment   = moment(this.profile.profileGeneralInformation.birthDate);
                return Math.floor(moment.duration(currentDateMoment.diff(birthDateMoment)).asYears());
            },
            portfolioImages: function () {
                return this.profile.profilePhotoGallery.photoGallery.map(p => p.ThumbnailLocation);
            },
            portfolioFullImages: function () {
                return this.profile.profilePhotoGallery.photoGallery.map(p => p.Location);
            },
            hasBirthDate: function () {
                return !!this.profile.profileGeneralInformation.birthDate;
            },
            hasEmailAddress: function () {
                return !!this.profile.profileGeneralInformation.email;
            },
            hasPhoneNumber: function () {
                return !!this.profile.profileGeneralInformation.phoneNumber;
            },
            hasDescription: function () {
                return this.profile.profileGeneralInformation.description !== '';
            },
            hasPhotoGallery: function () {
                return this.profile.profilePhotoGallery.photoGallery.length !== 0;
            },
            hasVideoGallery: function () {
                return this.profile.profileVideoGallery.videoGallery.length !== 0;
            },
            hasAwards: function () {
                return this.profile.profileAwards.awards.length !== 0;
            },
            hasExperience: function () {
                return this.profile.profileExperience.experienceSteps.length !== 0;
            },
            hasEducation: function () {
                return this.profile.profileEducation.educationSteps.length !== 0;
            },
            hasAchievements: function () {
                return this.hasAwards || this.hasExperience || this.hasEducation;
            },
            hasProjects: function () {
                return this.profile.projects && this.profile.projects.length !== 0;
            }
        }
    }

</script>

<style lang="scss" scoped>

    .v-avatar {
        box-shadow: 0px 3px 15px -9px rgba(0,0,0,0.75);
        width: 300px !important;
        height: 300px !important;
    }

    .v-avatar img {
        border: 3px solid #e1e1e1;
    }

    .profile-section {
        font-size: 20px;
    }
    
    .profile-information-row {
        padding: 5px 0px;
    }

    .age-field {
        font-size: 24px;
    }

    .email-icon, .phone-icon, .website-field {
        text-decoration: none;
    }

    .social-media-icon-wrapper {
        margin-right: 10px;
    }

    .skills-row .skill {
        margin-left: 0px;
    }

    .photo-gallery-row {

        &>.container {
            padding-left: 0px;
        }

        .v-image {
            cursor: pointer;
        }
    }

    .timeline-row {

        .timeline-item-action-row {
            justify-content: space-between;
            min-height: 40px;
        }

    }

    .v-timeline-item:last-of-type {
        padding-bottom: 0px;
    }

    .profile-project-item {
        padding: 20px;
    }

    @media screen and (max-width: 800px) {

        .general-information {
            margin-top: 40px;
        }


    }

    @media screen and (max-width: 400px) {

        .v-avatar {
            width: 200px !important;
            height: 200px !important;
        }    

    }

</style>
