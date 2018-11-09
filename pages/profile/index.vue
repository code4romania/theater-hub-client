<template>
    <section class="profile-section">
        <v-container id="profile-container" class="main-container pa-5">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-layout row>
                        <v-avatar size="200px" color="primary">
                            <img :src="require('~/assets/images/theater_hub_logo-1.jpg')" />
                        </v-avatar>
                        <v-flex xs12 class="ml-5 pl-5">
                            <v-flex xs12 class="profile-information-row">
                                <span class="full-name-field">{{ fullName }}</span>, <span class="age-field">{{ age }} years</span>
                            </v-flex>
                            <v-flex xs12 class="profile-information-row">
                                <span class="field-label">Email: </span>
                                <span class="email-field">{{ profile.email }}</span>
                            </v-flex>
                            <v-flex xs12 class="profile-information-row">
                                <span class="field-label">Phone number: </span>
                                <span class="phone-number-field">{{ profile.phoneNumber }}</span>
                            </v-flex>
                            <v-flex xs12 v-if="profile.website" class="profile-information-row">
                                <span class="field-label">Website: </span>
                                <a :href="profile.website" class="website-field">{{ profile.website }}</a>
                            </v-flex>
                            <v-flex class="profile-information-row">
                                <a v-if="profile.facebook" class="social-media-icon-wrapper" :href="profile.facebook">
                                    <img :src="require('~/assets/images/social-1_logo-facebook.svg')" />
                                </a>
                                <a v-if="profile.instagram" class="social-media-icon-wrapper" :href="profile.instagram">
                                    <img :src="require('~/assets/images/social-1_logo-instagram.svg')" />
                                </a>
                                <a v-if="profile.linkedin" class="social-media-icon-wrapper" :href="profile.linkedin">
                                    <img :src="require('~/assets/images/social-1_logo-linkedin.svg')" />
                                </a>
                                <a v-if="profile.youtube" class="social-media-icon-wrapper" :href="profile.youtube">
                                    <img :src="require('~/assets/images/social-1_logo-youtube.svg')" />
                                </a>
                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 class="timeline-row mt-5">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <span class="field-title">Description</span>
                        </v-flex>
                        <v-flex xs12>
                            <p>
                                {{ profile.description }}
                            </p>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 class="mt-5">
                    <v-layout row>
                        <v-flex xs12>
                            Skills: <span class="skill-list">{{ skillList }}</span>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 class="mt-5">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <span class="field-title">Photo gallery</span>
                        </v-flex>
                        <v-flex xs12 class="photo-gallery-row">
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
                                    <!-- <v-flex xs3>
                                        <dropzone id="photo-gallery-dropzone" ref="photoGalleryDropzone"
                                            :options="photoGalleryDropzoneOptions" :destroyDropzone="true" :duplicateCheck="true"
                                            width="200px" height="80px">
                                            <div class="dz-message" data-dz-message><span>Click or drop files here</span></div>
                                        </dropzone>
                                    </v-flex> -->
                                </v-layout>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 class="video-gallery-row">
                            <v-container grid-list-sm fluid>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <span class="field-title">Video gallery</span>
                                    </v-flex>
                                    <v-flex xs6 :key="`video-${videoIndex}`" v-for="(video, videoIndex) in portfolioVideos">
                                        <iframe :src="video.embedLink" width="420" height="315" allowfullscreen></iframe>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 class="timeline-row mt-3">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <span class="field-title">Achievements</span>
                        </v-flex>
                        <v-flex xs12 v-if="profile.awards.length !== 0 || profile.education.length !== 0">
                            <v-timeline dense>

                                <v-timeline-item  v-if="profile.awards.length !== 0" medium fill-dot right>
                                    <v-card class="timeline-header-card elevation-2">
                                        <v-card-title class="primary">
                                            <h2 class="timeline-header">Awards</h2>
                                        </v-card-title>
                                    </v-card>
                                </v-timeline-item>

                                <v-timeline-item :key="`award-${awardIndex}`" v-for="(award, awardIndex) in profile.awards" color="primary" small fill-dot right>
                                    <v-card class="elevation-2">
                                        <v-card-title>
                                            <v-layout row wrap>
                                                <v-flex xs12>
                                                    <span class="award-title">{{ award.title }}</span>, <span class="award-issuer ml-1">{{ award.issuer }}</span>
                                                    -
                                                    <span class="timeline-date" slot="opposite">{{ getTimelineDate(award.date) }}</span>
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

                                <v-timeline-item  v-if="profile.educationSteps.length !== 0" medium fill-dot right>
                                    <v-card class="timeline-header-card elevation-2">
                                        <v-card-title class="primary">
                                            <h2 class="timeline-header">Education</h2>
                                        </v-card-title>
                                    </v-card>
                                </v-timeline-item>

                                <v-timeline-item :key="`education-${educationIndex}`" v-for="(step, educationIndex) in profile.educationSteps" color="primary" small fill-dot right>
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
        </v-container>
    </section>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import moment from 'moment'
import 'nuxt-dropzone/dropzone.css'
import { userProfile } from '~/store/constants/mockdata'
import { SocialMediaManager } from '~/store/constants'

export default {
        components: {
            Dropzone,
            moment
        },
        data: () => ({
            profile: userProfile,
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
            }
        }),
        asyncData: (context) => {
            return { project: 'nuxt' }
        },
        methods: {
            initializeData: function () {

            },
            getTimelineDate (date) {
                return moment(date).format('MM/YYYY')
        }
        },
        computed: {
            fullName: function () {
                return `${this.profile.firstName} ${this.profile.lastName}`
        },
            skillList: function () {
                return this.profile.selectedSkills.join(', ')
        },
            age: function () {
                var currentDateMoment = moment(new Date())
            var birthDateMoment = moment(this.profile.birthDate)
            return Math.floor(moment.duration(currentDateMoment.diff(birthDateMoment)).asYears())
        },
            portfolioImages: function () {
                return this.profile.photoGallery.map(p => p.src)
        },
            portfolioVideos: function () {
                return this.profile.videoGallery.map(v => {
                    return {
                        link: v,
                        embedLink: SocialMediaManager.extractEmbedURLFromUnknownProvider(v)
                    }
            })
        }
        },
        mounted () {
            this.initializeData()
    }
    }
</script>

<style lang="scss" scoped>

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

    .photo-gallery-row {

        .v-image {
            cursor: pointer;
        }
    }

    .timeline-row {

        .timeline-header {
            font-size: 24px;
        }

        .timeline-header-card::after {
            border-right-color: #9575cd;
        }

        .timeline-header {
            color: #FFF;
        }

        .award-title, .education-title {
            font-weight: 500;
        }
    }

</style>
