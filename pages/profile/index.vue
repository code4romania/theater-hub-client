<template>
    <section class="profile-section">
        <v-container id="profile-container" class="main-container pa-5">
            <v-layout row wrap>
                <v-btn absolute large fab top right color="primary" class="download-resume">
                    <v-icon>cloud_download</v-icon>
                </v-btn>
                <v-flex xs12 v-if="!isEditingGeneralInformation">
                    <v-layout row class="profile-information-group">
                        <v-avatar size="200px" color="primary">
                            <img :src="require('~/assets/images/theater_hub_logo-1.jpg')" />
                        </v-avatar>
                        <v-flex xs12 class="ml-5 pl-5">
                            <v-flex xs12 class="profile-information-row">
                                <span class="full-name-field">{{ fullName }}</span>, <span class="age-field">{{ age }} years</span>
                            </v-flex>
                            <v-flex xs12 class="profile-information-row">
                                <span class="field-label">Email: </span>
                                <span class="email-field">{{ profile.profileGeneralInformation.email }}</span>
                            </v-flex>
                            <v-flex xs12 class="profile-information-row">
                                <span class="field-label">Phone number: </span>
                                <span class="phone-number-field">{{ profile.profileGeneralInformation.phoneNumber }}</span>
                            </v-flex>
                            <v-flex xs12 v-if="profile.profileGeneralInformation.website" class="profile-information-row">
                                <span class="field-label">Website: </span>
                                <a :href="profile.profileGeneralInformation.website" class="website-field" target="_blank">{{ profile.profileGeneralInformation.website }}</a>
                            </v-flex>
                            <v-flex class="profile-information-row">
                                <a v-if="profile.profileGeneralInformation.facebookLink" class="social-media-icon-wrapper" :href="profile.profileGeneralInformation.facebookLink" target="_blank">
                                    <img :src="require('~/assets/images/social-1_logo-facebook.svg')" />
                                </a>
                                <a v-if="profile.profileGeneralInformation.instagramLink" class="social-media-icon-wrapper" :href="profile.profileGeneralInformation.instagramLink" target="_blank">
                                    <img :src="require('~/assets/images/social-1_logo-instagram.svg')" />
                                </a>
                                <a v-if="profile.profileGeneralInformation.linkedinLink" class="social-media-icon-wrapper" :href="profile.profileGeneralInformation.linkedinLink" target="_blank">
                                    <img :src="require('~/assets/images/social-1_logo-linkedin.svg')" />
                                </a>
                                <a v-if="profile.profileGeneralInformation.youtubeLink" class="social-media-icon-wrapper" :href="profile.profileGeneralInformation.youtubeLink" target="_blank">
                                    <img :src="require('~/assets/images/social-1_logo-youtube.svg')" />
                                </a>
                            </v-flex>
                        </v-flex>
                        <v-btn outline small fab class="mt-2" v-on:click="onEditGeneralInformationClick"><v-icon>edit</v-icon></v-btn>
                    </v-layout>
                </v-flex>

                <v-flex xs12 class="mt-5" v-if="!isEditingGeneralInformation">
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>Description</h2>
                        </v-flex>
                        <v-flex xs12 pt-4>
                            <p>
                                {{ profile.profileGeneralInformation.description }}
                            </p>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 v-if="isEditingGeneralInformation">
                   <v-layout row wrap elevation-5 pa-5>
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>Edit General Information</h2>
                            <div>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditGeneralInformationClick"><v-icon>done</v-icon></v-btn>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditGeneralInformationClick"><v-icon>clear</v-icon></v-btn>
                            </div>
                        </v-flex>
                        <v-flex xs12 pt-4 class="skills-row">
                            <ProfileGeneralInformation :profileGeneralInformation="editedProfile.profileGeneralInformation"
                                                    @updateProfileGeneralInformation="updateProfileGeneralInformation"/>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 py-4>
                    <v-divider></v-divider>
                </v-flex>

                <v-flex xs12 v-if="!isEditingSkills">
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>Skills</h2>
                            <v-btn outline small fab class="mt-0" v-on:click="onEditSkillsClick"><v-icon>edit</v-icon></v-btn>
                        </v-flex>
                        <v-flex xs12 pt-4 class="skills-row">
                            <v-chip :key="i" v-for="(skill, i) in profile.profileSkills.selectedSkills" class="skill">{{ skill }}</v-chip>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 v-if="isEditingSkills">
                   <v-layout row wrap elevation-5 pa-5>
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>Edit Skills</h2>
                            <div>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditSkillsClick"><v-icon>done</v-icon></v-btn>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditSkillsClick"><v-icon>clear</v-icon></v-btn>
                            </div>
                        </v-flex>
                        <v-flex xs12>
                            <ProfileSkills :profileSkills="editedProfile.profileSkills" @updateProfileSkills="updateProfileSkills"/>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 py-4>
                    <v-divider></v-divider>
                </v-flex>

                <v-flex xs12 v-if="!isEditingPhotoGallery">
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>Photo gallery</h2>
                            <v-btn outline small fab class="mt-0" v-on:click="onEditPhotoGalleryClick"><v-icon>edit</v-icon></v-btn>
                        </v-flex>
                        <v-flex xs12 pt-4 class="photo-gallery-row">
                            <no-ssr>
                                <gallery :images="portfolioImages" :index="index" @close="index = null"></gallery>
                            </no-ssr>
                            <v-container grid-list-sm fluid>
                                <v-layout row wrap>
                                    <v-flex xs3 v-for="(image, imageIndex) in portfolioImages" :key="`photo-${imageIndex}`" @click="index = imageIndex">
                                        <v-img :src="image" :lazy-src="image" aspect-ratio="1">
                                            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                                                <v-progress-circular indeterminate></v-progress-circular>
                                            </v-layout>
                                        </v-img>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 v-if="isEditingPhotoGallery">
                   <v-layout row wrap elevation-5 pa-5>
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>Edit Photo Gallery</h2>
                            <div>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditPhotoGalleryClick"><v-icon>done</v-icon></v-btn>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditPhotoGalleryClick"><v-icon>clear</v-icon></v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 py-4>
                    <v-divider></v-divider>
                </v-flex>

                <v-flex xs12 v-if="!isEditingVideoGallery">
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>Video gallery</h2>
                            <v-btn outline small fab class="mt-0" v-on:click="onEditVideoGalleryClick"><v-icon>edit</v-icon></v-btn>
                        </v-flex>
                        <v-flex xs12 pt-4 class="video-gallery-row">
                            <v-layout row wrap>
                                <v-flex xs12 sm12 md12 lg6 pa-1 :key="`video-${videoIndex}`" v-for="(video, videoIndex) in portfolioVideos">
                                    <iframe :src="video.embedLink" width="420" height="315" allowfullscreen></iframe>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 v-if="isEditingVideoGallery">
                   <v-layout row wrap elevation-5 pa-5>
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>Edit Video Gallery</h2>
                            <div>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditVideoGalleryClick"><v-icon>done</v-icon></v-btn>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditVideoGalleryClick"><v-icon>clear</v-icon></v-btn>
                            </div>
                        </v-flex>
                        <v-flex xs12>
                            <ProfileVideoGallery :profileVideoGallery="editedProfile.profileVideoGallery"
                                                @updateProfileVideoGallery="updateProfileVideoGallery"/>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 py-4>
                    <v-divider></v-divider>
                </v-flex>

                <v-flex xs12>
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>Achievements</h2>
                        </v-flex>
                        <v-flex xs12 mt-5 v-if="isEditingAwards">
                            <v-layout row wrap elevation-5 pa-5>
                                <v-flex xs12 class="profile-information-group-header">
                                    <h2>Edit Awards</h2>
                                    <div>
                                        <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditAwardsClick"><v-icon>done</v-icon></v-btn>
                                        <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditAwardsClick"><v-icon>clear</v-icon></v-btn>
                                    </div>
                                </v-flex>
                                <v-flex xs12>
                                    <ProfileAwards :profileAwards="editedProfile.profileAwards"
                                                    @updateProfileAwards="updateProfileAwards"/>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 mt-5 v-if="isEditingExperience">
                            <v-layout row wrap elevation-5 pa-5>
                                <v-flex xs12 class="profile-information-group-header">
                                    <h2>Edit Experience</h2>
                                    <div>
                                        <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditExperienceClick"><v-icon>done</v-icon></v-btn>
                                        <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditExperienceClick"><v-icon>clear</v-icon></v-btn>
                                    </div>
                                </v-flex>
                                <v-flex xs12>
                                    <ProfileExperience :profileExperience="editedProfile.profileExperience"
                                                    @updateProfileExperience="updateProfileExperience"/>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 mt-5 v-if="isEditingEducation">
                            <v-layout row wrap elevation-5 pa-5>
                                <v-flex xs12 class="profile-information-group-header">
                                    <h2>Edit Education</h2>
                                    <div>
                                        <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditEducationClick"><v-icon>done</v-icon></v-btn>
                                        <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditEducationClick"><v-icon>clear</v-icon></v-btn>
                                    </div>
                                </v-flex>
                                <v-flex xs12>
                                    <ProfileEducation :profileEducation="editedProfile.profileEducation"
                                                    @updateProfileEducation="updateProfileEducation"/>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 pt-5 class="timeline-row">
                            <v-layout row wrap class="profile-information-group">
                                <v-flex xs12 v-if="profile.profileAwards.awards.length !== 0 || profile.profileEducation.educationSteps.length !== 0 || profile.profileExperience.experienceSteps.length !== 0">
                                    <v-timeline dense>

                                        <v-timeline-item  v-if="profile.profileAwards.awards.length !== 0 && !isEditingAwards" medium hide-dot right class="timeline-header-item">
                                            <v-card class="timeline-header-card elevation-2">
                                                <v-card-title class="primary">
                                                    <h2 class="timeline-header">Awards</h2>
                                                    <v-btn outline small fab class="ml-3" color="white" v-on:click="onEditAwardsClick"><v-icon>edit</v-icon></v-btn>
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item v-if="!isEditingAwards" :key="`award-${awardIndex}`" v-for="(award, awardIndex) in profile.profileAwards.awards" color="primary" small fill-dot right>
                                            <v-card class="elevation-2">
                                                <v-card-title>
                                                    <v-layout row wrap>
                                                        <v-flex xs12>
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

                                        <v-timeline-item  v-if="profile.profileExperience.experienceSteps.length !== 0 && !isEditingExperience" medium hide-dot right class="timeline-header-item">
                                            <v-card class="timeline-header-card elevation-2">
                                                <v-card-title class="primary">
                                                    <h2 class="timeline-header">Experience</h2>
                                                    <v-btn outline small fab class="ml-3" color="white" v-on:click="onEditExperienceClick"><v-icon>edit</v-icon></v-btn>
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item v-if="!isEditingExperience" :key="`experience-${experienceIndex}`" v-for="(step, experienceIndex) in profile.profileExperience.experienceSteps" color="primary" small fill-dot right>
                                            <v-card class="elevation-2">
                                                <v-card-title>
                                                    <v-layout row wrap>
                                                        <v-flex xs12>
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

                                        <v-timeline-item  v-if="profile.profileEducation.educationSteps.length !== 0 && !isEditingEducation" medium hide-dot right class="timeline-header-item">
                                            <v-card class="timeline-header-card elevation-2">
                                                <v-card-title class="primary">
                                                    <h2 class="timeline-header">Education</h2>
                                                    <v-btn outline small fab class="ml-3" color="white" v-on:click="onEditEducationClick"><v-icon>edit</v-icon></v-btn>
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item v-if="!isEditingEducation" :key="`education-${educationIndex}`" v-for="(step, educationIndex) in profile.profileEducation.educationSteps" color="primary" small fill-dot right>
                                            <v-card class="elevation-2">
                                                <v-card-title>
                                                    <v-layout row wrap>
                                                        <v-flex xs12>
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
            </v-layout>
        </v-container>
    </section>
</template>

<script>
import Dropzone from 'nuxt-dropzone';
import moment from 'moment';
import 'nuxt-dropzone/dropzone.css';
import ProfileGeneralInformation from '~/components/profile/profile-general-information.vue';
import ProfileSkills from '~/components/profile/profile-skills.vue';
import ProfilePhotoGallery from '~/components/profile/profile-photo-gallery.vue';
import ProfileVideoGallery from '~/components/profile/profile-video-gallery.vue';
import ProfileAwards from '~/components/profile/profile-awards.vue';
import ProfileExperience from '~/components/profile/profile-experience.vue';
import ProfileEducation from '~/components/profile/profile-education.vue';
import { userProfile, skills } from '~/store/constants/mockdata';
import { SocialMediaManager, Helpers } from '~/utils';

export default {
        components: {
            Dropzone,
            moment,
            ProfileGeneralInformation,
            ProfileSkills,
            ProfilePhotoGallery,
            ProfileVideoGallery,
            ProfileAwards,
            ProfileExperience,
            ProfileEducation
        },
        middleware: 'authenticated',
        data: () => ({
            skills,
            profile: userProfile,
            editedProfile: {},
            index: null,
            photoGalleryDropzoneOptions: {
                url: 'https://httpbin.org/post',
                maxFilesize: 2,
                addRemoveLinks: true,
                acceptedMimeTypes: 'image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon',
                accept: function (file, done) {
                    if (file.name === '') {
                    done('Invalid file name.')
                    } else { done() }
                }
            },
            isEditingGeneralInformation: false,
            isEditingSkills: false,
			isEditingPhotoGallery: false,
			isEditingVideoGallery: false,
            isEditingAwards: false,
            isEditingExperience: false,
            isEditingEducation: false
        }),
        asyncData: (context) => {
            return { project: 'nuxt' }
        },
        methods: {
            initializeData: function () {

            },
            getTimelineDate (date) {
                return moment(date).format('MM/YYYY');
            },
            onEditGeneralInformationClick: function () {
                this.cancelAllUnsavedChanges();
                this.cloneEditedProfile();
                this.isEditingGeneralInformation = true;
            },
            onEditSkillsClick: function () {
                this.cancelAllUnsavedChanges();
                this.cloneEditedProfile();
                this.isEditingSkills = true;
            },
            onEditPhotoGalleryClick: function () {
                this.cancelAllUnsavedChanges();
                this.cloneEditedProfile();
                this.isEditingPhotoGallery = true;
            },
            onEditVideoGalleryClick: function () {
                this.cancelAllUnsavedChanges();
                this.cloneEditedProfile();
                this.isEditingVideoGallery = true;
            },
            onEditAwardsClick: function () {
                this.cancelAllUnsavedChanges();
                this.cloneEditedProfile();
                this.isEditingAwards = true;
            },
            onEditExperienceClick: function () {
                this.cancelAllUnsavedChanges();
                this.cloneEditedProfile();
                this.isEditingExperience = true;
            },
            onEditEducationClick: function () {
                this.cancelAllUnsavedChanges();
                this.cloneEditedProfile();
                this.isEditingEducation = true;
            },
            onSaveEditGeneralInformationClick: function () {
                this.isEditingGeneralInformation = false;
                this.saveEditedProfile();
            },
            onSaveEditSkillsClick: function () {
                this.isEditingSkills = false;
                this.saveEditedProfile();
            },
            onSaveEditPhotoGalleryClick: function () {
                this.isEditingPhotoGallery = false;
                this.saveEditedProfile();
            },
            onSaveEditVideoGalleryClick: function () {
                this.isEditingVideoGallery = false;
                this.saveEditedProfile();
            },
            onSaveEditAwardsClick: function () {
                this.isEditingAwards = false;
                this.saveEditedProfile();
            },
            onSaveEditExperienceClick: function () {
                this.isEditingExperience = false;
                this.saveEditedProfile();
            },
            onSaveEditEducationClick: function () {
                this.isEditingEducation = false;
                this.saveEditedProfile();
            },
            onCancelEditGeneralInformationClick: function () {
                this.isEditingGeneralInformation = false;
            },
            onCancelEditSkillsClick: function () {
                this.isEditingSkills = false;
            },
            onCancelEditPhotoGalleryClick: function () {
                this.isEditingPhotoGallery = false;
            },
            onCancelEditVideoGalleryClick: function () {
                this.isEditingVideoGallery = false;
            },
            onCancelEditAwardsClick: function () {
                this.isEditingAwards = false;
            },
            onCancelEditExperienceClick: function () {
                this.isEditingExperience = false;
            },
            onCancelEditEducationClick: function () {
                this.isEditingEducation = false;
            },
            cancelAllUnsavedChanges: function () {
                this.isEditingGeneralInformation = false;
                this.isEditingSkills             = false;
                this.isEditingPhotoGallery       = false;
                this.isEditingVideoGallery       = false;
                this.isEditingAwards             = false;
                this.isEditingExperience         = false;
                this.isEditingEducation          = false;
            },
            cloneEditedProfile: function () {
                this.editedProfile = Helpers.cloneObject(this.profile);
            },
            saveEditedProfile: function () {
                this.profile = Helpers.cloneObject(this.editedProfile);
            },
            removeSkill (skills, skill) {
                skills.splice(skills.indexOf(skill), 1);
                skills = [...skills];
            },
            updateProfileGeneralInformation: function (model) {
                this.editedProfile.profileGeneralInformation = Helpers.cloneObject(model);
            },
            updateProfileSkills: function (model) {
                this.editedProfile.profileSkills = Helpers.cloneObject(model);
            },
            updateProfilePhotoGallery: function (model) {
                this.editedProfile.profilePhotoGallery = Helpers.cloneObject(model);
            },
            updateProfileVideoGallery: function (model) {
                this.editedProfile.profileVideoGallery = Helpers.cloneObject(model);
            },
            updateProfileAwards: function (model) {
                this.editedProfile.profileAwards = Helpers.cloneObject(model);
            },
            updateProfileExperience: function (model) {
                this.editedProfile.profileExperience = Helpers.cloneObject(model);
            },
            updateProfileEducation: function (model) {
                this.editedProfile.profileEducation = Helpers.cloneObject(model);
            }
        },
        computed: {
            fullName: function () {
                return `${this.profile.profileGeneralInformation.firstName} ${this.profile.profileGeneralInformation.lastName}`;
            },
            skillList: function () {
                return this.profile.profileSkills.selectedSkills.join(', ');
            },
            age: function () {
                var currentDateMoment = moment(new Date());
                var birthDateMoment   = moment(this.profile.profileGeneralInformation.birthDate);
                return Math.floor(moment.duration(currentDateMoment.diff(birthDateMoment)).asYears());
            },
            portfolioImages: function () {
                return this.profile.profilePhotoGallery.photoGallery.map(p => p.src);
            },
            portfolioVideos: function () {
                return this.profile.profileVideoGallery.videoGallery.map(v => {
                    return {
                        link: v.link,
                        embedLink: SocialMediaManager.extractEmbedURLFromUnknownProvider(v.link)
                    }
                })
            }
        },
        mounted () {
            this.initializeData();
        }
    }
</script>

<style lang="scss" scoped>

    .download-resume {
        margin-right: 20%;
    }

    .profile-section {
        font-size: 20px;
    }
    
    .profile-information-row {
        padding: 5px 0px;
    }

    .full-name-field {
        font-size: 24px;
        font-weight: 500;
    }

    .age-field {
        font-size: 24px;
    }

    .website-field {
        text-decoration: none;
    }

    .social-media-icon-wrapper {
        margin-right: 10px;
    }

    .profile-information-group-header {
        display: flex;
        justify-content: space-between;

        h2 {
            font-size: 24px;
        }
    }

    .skills-row .skill:first-child {
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

        .timeline-header {
            font-size: 24px;
        }

        .timeline-header-item {

            .timeline-header-card .v-card__title {
                justify-content: space-between;
            }

            .timeline-header-card::after, .timeline-header-card::before {
                display: none;
            }
        }

        .timeline-header {
            color: #FFF;
        }

        .award-title, .experience-title, .education-title {
            font-weight: 500;
        }
    }

</style>
