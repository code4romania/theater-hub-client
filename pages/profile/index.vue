<template>
    <section class="profile-section">
        <v-container id="profile-container" class="main-container pa-5">
            <v-layout row wrap>
                <v-flex xs12 v-if="!isEditingGeneralInformation" class="mb-5">
                    <v-layout row class="profile-information-group">
                        <v-avatar size="200px">
                            <img :src="require('~/assets/images/default-avatar.svg')" v-if="!profileImage" />
                            <img :src="`data:image/png;base64,${profileImage}`" v-if="profileImage" />
                        </v-avatar>
                        <v-flex xs12 class="ml-5 pl-5">
                            <v-flex xs12 class="profile-information-row">
                                <span class="full-name-field">{{ fullName }}</span>
                                <span>,</span>
                                <span class="age-field">{{ age }} {{ $t('shared.content.years') }}</span>
                            </v-flex>
                            <v-flex xs12 class="profile-information-row">
                                <span class="field-label">{{ $t('fields.email.label') }}: </span>
                                <span class="email-field">{{ profile.profileGeneralInformation.email }}</span>
                            </v-flex>
                            <v-flex xs12 class="profile-information-row">
                                <span class="field-label">{{ $t('fields.phone-number.label') }}: </span>
                                <span class="phone-number-field">{{ profile.profileGeneralInformation.phoneNumber }}</span>
                            </v-flex>
                            <v-flex xs12 v-if="profile.profileGeneralInformation.website" class="profile-information-row">
                                <span class="field-label">{{ $t('fields.website.label') }}: </span>
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
                            <v-flex xs12 class="profile-information-row">
                                <nuxt-link :to="`/profile/${profile.ID}`" class="preview-profile-link" target="_blank">
                                    <v-btn id="preview-profile-button" class="primary ml-0" medium>
                                        {{ $t('pages.profile.preview-profile-button') }}
                                    </v-btn>
                                </nuxt-link>
                                <v-btn id="download-resume-button" class="primary ml-0" medium @click="onDownloadResumeClick">
                                    {{ $t('pages.profile.download-resume-button') }}
                                </v-btn>
                            </v-flex>
                        </v-flex>
                        <v-btn outline small fab class="mt-2" v-on:click="onEditGeneralInformationClick"><v-icon>edit</v-icon></v-btn>
                    </v-layout>
                </v-flex>

                <v-flex xs12 v-if="!isEditingGeneralInformation && hasDescription">
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

                <v-flex xs12 v-if="isEditingGeneralInformation" class="edited-profile-section">
                   <v-layout row wrap pa-5>
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.edit-general-information-title') }}</h2>
                            <div>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditGeneralInformationClick" :disabled="isSaveEditGeneralInformationButtonDisabled()">
                                    <v-icon>done</v-icon>
                                </v-btn>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditGeneralInformationClick">
                                    <v-icon>clear</v-icon>
                                </v-btn>
                            </div>
                        </v-flex>
                        <v-flex xs12 pt-4>
                            <ProfileGeneralInformation  :profileGeneralInformation="editedProfile.profileGeneralInformation"
                                                        :displayNameFields="true"
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
                            <h2>{{ $t('pages.profile.skills-title') }}</h2>
                            <v-btn outline small fab class="mt-0" v-on:click="onEditSkillsClick"><v-icon>edit</v-icon></v-btn>
                        </v-flex>
                        <v-flex xs12 pt-4 class="skills-row">
                            <v-chip :key="i" v-for="(skill, i) in skillNameList" class="skill">{{ skill }}</v-chip>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 v-if="isEditingSkills" class="edited-profile-section">
                   <v-layout row wrap pa-5>
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.edit-skills-title') }}</h2>
                            <div>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditSkillsClick" :disabled="isSaveEditSkillsButtonDisabled">
                                    <v-icon>done</v-icon>
                                </v-btn>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditSkillsClick"><v-icon>clear</v-icon></v-btn>
                            </div>
                        </v-flex>
                        <v-flex xs12>
                            <ProfileSkills :profileSkills="editedProfile.profileSkills" :skills="skills" @updateProfileSkills="updateProfileSkills"/>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 py-4>
                    <v-divider></v-divider>
                </v-flex>

                <v-flex xs12 v-if="!isEditingPhotoGallery">
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.photo-gallery-title') }}</h2>
                            <v-btn outline small fab class="mt-0" v-on:click="onEditPhotoGalleryClick"><v-icon>edit</v-icon></v-btn>
                        </v-flex>
                        <v-flex xs12 pt-4 class="photo-gallery-row">
                            <no-ssr>
                                <gallery :images="portfolioImages" :index="portfolioImagesIndex" @close="portfolioImagesIndex = null"></gallery>
                            </no-ssr>
                            <v-container v-if="hasPhotoGallery" grid-list-sm fluid>
                                <v-layout row wrap>
                                    <v-flex xs3 v-for="(image, imageIndex) in portfolioImages" :key="`photo-${imageIndex}`" @click="portfolioImagesIndex = imageIndex">
                                        <v-img :src="image" :lazy-src="image" aspect-ratio="1">
                                            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                                                <v-progress-circular indeterminate></v-progress-circular>
                                            </v-layout>
                                        </v-img>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 pb-4 v-if="!hasPhotoGallery" class="photo-gallery-row">
                            {{ $t('pages.profile.no-photos-description') }}
                        </v-flex> 
                    </v-layout>
                </v-flex>

                <v-flex xs12 v-if="isEditingPhotoGallery" class="edited-profile-section">
                   <v-layout row wrap pa-5>
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.edit-photo-gallery-title') }}</h2>
                            <div>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditPhotoGalleryClick"><v-icon>done</v-icon></v-btn>
                                <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditPhotoGalleryClick"><v-icon>clear</v-icon></v-btn>
                            </div>
                        </v-flex>
                        <v-flex xs12 mt-4>
                            <ProfilePhotoGallery :profilePhotoGallery="editedProfile.profilePhotoGallery" @updateProfilePhotoGallery="updateProfilePhotoGallery"/>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 py-4>
                    <v-divider></v-divider>
                </v-flex>

                <v-flex xs12>
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.video-gallery-title') }}</h2>
                        </v-flex>
                        <v-flex xs12 pt-4 v-if="hasVideoGallery" class="video-gallery-row">
                            <v-layout row wrap
                                :key="`video-${videoIndex}`" v-for="(video, videoIndex) in profile.profileVideoGallery.videoGallery"
                                @mouseover="video.isHovered = true"  @mouseout="video.isHovered = false">
                                <v-layout row wrap v-if="!video.inEditMode && !video.inDeleteMode">
                                    <v-flex xs12 sm10 md10 lg10 pa-1>
                                        <iframe :src="video.embedLink" width="420" height="315" allowfullscreen></iframe>
                                    </v-flex>
                                    <v-flex xs2 class="profile-row-actions" v-if="videoIndex === 0 || video.isHovered">
                                        <v-btn outline small fab class="edit-icon" v-on:click="onEditVideoClick(video, videoIndex)">
                                            <v-icon>edit</v-icon>
                                        </v-btn>
                                        <v-btn outline small fab class="remove-icon" v-on:click="onDeleteVideoClick(video, videoIndex)">
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                                <v-flex xs12 class="elevation-2 edited-profile-section" v-if="video.inEditMode">
                                    <ProfileVideoEdit :video="video" :index="videoIndex" @editVideo="editVideo" />
                                </v-flex>
                                <v-flex xs12 class="elevation-2 edited-profile-section" v-if="video.inDeleteMode">
                                    <ProfileVideoDelete :index="videoIndex" @deleteVideo="deleteVideo"/>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 mt-4 pb-4 v-if="!hasVideoGallery" class="video-gallery-row">
                            {{ $t('pages.profile.no-videos-description') }}
                        </v-flex>
                        <v-flex xs12 mt-2 py-3 v-if="!isAddingVideo" class="video-gallery-row add-video-row elevation-2" v-on:click="onAddVideoClick()">
                            <v-icon>add</v-icon> {{ $t('pages.profile.add-video-button') }}
                        </v-flex>
                        <v-card mt-4 class="elevation-2 timeline-message-card edited-profile-section" v-if="isAddingVideo">
                            <ProfileVideoAdd @addVideo="addVideo"/>
                        </v-card>
                    </v-layout>
                </v-flex>

                <v-flex xs12 py-4>
                    <v-divider></v-divider>
                </v-flex>

                <v-flex xs12 mb-5 pb-5>
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.achievements-title') }}</h2>
                        </v-flex>
                        <v-flex xs12 pt-5 class="timeline-row">
                            <v-layout row wrap class="profile-information-group">
                                <v-flex xs12>
                                    <v-timeline dense>

                                        <v-timeline-item medium hide-dot right class="timeline-header-item">
                                            <v-card class="timeline-header-card elevation-2">
                                                <v-card-title class="primary">
                                                    <h2 class="timeline-header">{{ $t('pages.profile.awards-title') }}</h2>
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item
                                            :key="`award-${awardIndex}`"
                                            v-for="(award, awardIndex) in profile.profileAwards.awards"
                                            v-bind:class="{'timeline-message': award.inEditMode || award.inDeleteMode}"
                                            @mouseover.native="award.isHovered = true"  @mouseout.native="award.isHovered = false"
                                            color="primary" small fill-dot right>
                                                <v-card class="elevation-2" v-if="!award.inEditMode && !award.inDeleteMode">
                                                    <v-card-title>
                                                        <v-layout row class="timeline-item-action-row">
                                                            <v-flex xs10>
                                                                <span class="award-title">{{ award.title }}</span>, <span class="award-issuer ml-1">{{ award.issuer }}</span>
                                                                -
                                                                <span class="timeline-date">{{ getTimelineDate(award.date) }}</span>
                                                            </v-flex>
                                                            <v-flex xs2 class="profile-row-actions" v-if="awardIndex === 0 || award.isHovered">
                                                                <v-btn outline small fab class="edit-icon" v-on:click="onEditAwardClick(award, awardIndex)">
                                                                    <v-icon>edit</v-icon>
                                                                </v-btn>
                                                                <v-btn outline small fab class="remove-icon" v-on:click="onDeleteAwardClick(award, awardIndex)">
                                                                    <v-icon>delete</v-icon>
                                                                </v-btn>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-card-title>
                                                    <v-card-text v-if="award.description">
                                                        <p class="award-description">
                                                            {{ award.description }}
                                                        </p>
                                                    </v-card-text>
                                                </v-card>
                                                <v-card class="elevation-2 timeline-message-card edited-profile-section" v-if="award.inEditMode">
                                                    <ProfileAwardEdit :award="award" :index="awardIndex" @editAward="editAward"/>
                                                </v-card>
                                                <v-card class="elevation-2 timeline-message-card edited-profile-section" v-if="award.inDeleteMode">
                                                    <ProfileAwardDelete :index="awardIndex" @deleteAward="deleteAward"/>
                                                </v-card>
                                        </v-timeline-item>
                                        <v-timeline-item  v-if="!hasAwards && !isEditingAwards" medium hide-dot class="timeline-message">
                                            <v-card class="timeline-message-card elevation-2">
                                                <v-card-title>
                                                    {{ $t('pages.profile.no-awards-message') }}
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>
                                        <v-timeline-item medium hide-dot class="timeline-message add-achievement-timeline-item"
                                            v-if="!isAddingAward">
                                            <v-card class="timeline-message-card elevation-2 text-xs-center" v-on:click.native="onAddAwardClick()">
                                                <v-card-title>
                                                    <v-icon>add</v-icon>
                                                   {{ $t('shared.content.add-award-button') }}
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>
                                        <v-timeline-item medium hide-dot class="timeline-message" v-if="isAddingAward">
                                            <v-card class="timeline-message-card elevation-2 edited-profile-section">
                                                <ProfileAwardAdd @addAward="addAward"/>
                                            </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item medium hide-dot right class="timeline-header-item">
                                            <v-card class="timeline-header-card elevation-2">
                                                <v-card-title class="primary">
                                                    <h2 class="timeline-header">{{ $t('pages.profile.experience-title') }}</h2>
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item
                                            :key="`experience-${experienceIndex}`"
                                            v-for="(step, experienceIndex) in profile.profileExperience.experienceSteps"
                                            v-bind:class="{'timeline-message': step.inEditMode || step.inDeleteMode}"
                                            @mouseover.native="step.isHovered = true" @mouseout.native="step.isHovered = false"
                                            color="primary" small fill-dot right>
                                                <v-card class="elevation-2" v-if="!step.inEditMode && !step.inDeleteMode">
                                                    <v-card-title>
                                                        <v-layout row wrap>
                                                            <v-flex xs10 class="timeline-item-action-row">
                                                                <span class="experience-position">{{ step.position }}</span>, <span class="experience-employer ml-1">{{ step.employerName }}</span>
                                                            </v-flex>
                                                            <v-flex xs2 class="profile-row-actions" v-if="experienceIndex === 0 || step.isHovered">
                                                                <v-btn outline small fab class="edit-icon" v-on:click="onEditExperienceStepClick(step, experienceIndex)">
                                                                    <v-icon>edit</v-icon>
                                                                </v-btn>
                                                                <v-btn outline small fab class="remove-icon" v-on:click="onDeleteExperienceStepClick(step, experienceIndex)">
                                                                    <v-icon>delete</v-icon>
                                                                </v-btn>
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
                                                <v-card class="elevation-2 timeline-message-card edited-profile-section" v-if="step.inEditMode">
                                                    <ProfileExperienceEdit :experienceStep="step"
                                                                    :index="experienceIndex" @editExperienceStep="editExperienceStep" />
                                                </v-card>
                                                <v-card class="elevation-2 timeline-message-card edited-profile-section" v-if="step.inDeleteMode">
                                                    <ProfileExperienceDelete :index="experienceIndex" @deleteExperienceStep="deleteExperienceStep"/>
                                                </v-card>
                                        </v-timeline-item>
                                        <v-timeline-item  v-if="!hasExperience && !isEditingExperience" medium hide-dot right class="timeline-message">
                                            <v-card class="timeline-message-card elevation-2">
                                                <v-card-title>
                                                    {{ $t('pages.profile.no-experience-message') }}
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>
                                        <v-timeline-item medium hide-dot class="timeline-message add-achievement-timeline-item"
                                            v-if="!isAddingExperienceStep">
                                            <v-card class="timeline-message-card elevation-2 text-xs-center"  v-on:click.native="onAddExperienceStepClick()">
                                                <v-card-title>
                                                    <v-icon>add</v-icon>
                                                   {{ $t('shared.content.add-experience-button') }}
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>
                                        <v-timeline-item medium hide-dot class="timeline-message" v-if="isAddingExperienceStep">
                                            <v-card class="timeline-message-card elevation-2 edited-profile-section">
                                                <ProfileExperienceAdd @addExperienceStep="addExperienceStep"/>
                                            </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item  medium hide-dot right class="timeline-header-item">
                                            <v-card class="timeline-header-card elevation-2">
                                                <v-card-title class="primary">
                                                    <h2 class="timeline-header">{{ $t('pages.profile.education-title') }}</h2>
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item
                                            :key="`education-${educationIndex}`"
                                            v-for="(step, educationIndex) in profile.profileEducation.educationSteps"
                                            v-bind:class="{'timeline-message': step.inEditMode || step.inDeleteMode}"
                                            @mouseover.native="step.isHovered = true" @mouseout.native="step.isHovered = false"
                                            color="primary" small fill-dot right>
                                                <v-card class="elevation-2" v-if="!step.inEditMode && !step.inDeleteMode">
                                                    <v-card-title>
                                                        <v-layout row wrap>
                                                            <v-flex xs10 class="timeline-item-action-row">
                                                                <span class="education-title">{{ step.title }}</span>, <span class="education-institution ml-1">{{ step.institutionName }}</span>
                                                            </v-flex>
                                                            <v-flex xs2 class="profile-row-actions" v-if="educationIndex === 0 || step.isHovered">
                                                                <v-btn outline small fab class="edit-icon" v-on:click="onEditEducationStepClick(step, educationIndex)">
                                                                    <v-icon>edit</v-icon>
                                                                </v-btn>
                                                                <v-btn outline small fab class="remove-icon" v-on:click="onDeleteEducationStepClick(step, educationIndex)">
                                                                    <v-icon>delete</v-icon>
                                                                </v-btn>
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
                                                <v-card class="elevation-2 timeline-message-card edited-profile-section" v-if="step.inEditMode">
                                                    <ProfileEducationEdit :educationStep="step"
                                                                :index="educationIndex" @editEducationStep="editEducationStep"/>
                                                </v-card>
                                                <v-card class="elevation-2 timeline-message-card edited-profile-section" v-if="step.inDeleteMode">
                                                    <ProfileEducationDelete :index="educationIndex" @deleteEducationStep="deleteEducationStep"/>
                                                </v-card>
                                        </v-timeline-item>
                                        <v-timeline-item  v-if="!hasEducation && !isEditingEducation" medium hide-dot right class="timeline-message">
                                            <v-card class="timeline-message-card elevation-2">
                                                <v-card-title>
                                                    {{ $t('pages.profile.no-education-message') }}
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>
                                        <v-timeline-item medium hide-dot class="timeline-message add-achievement-timeline-item"
                                                                                                        v-if="!isAddingEducationStep">
                                            <v-card class="timeline-message-card elevation-2 text-xs-center"  v-on:click.native="onAddEducationStepClick()">
                                                <v-card-title>
                                                    <v-icon>add</v-icon>
                                                   {{ $t('shared.content.add-education-button') }}
                                                </v-card-title>
                                            </v-card>
                                        </v-timeline-item>
                                        <v-timeline-item medium hide-dot class="timeline-message" v-if="isAddingEducationStep">
                                            <v-card class="timeline-message-card elevation-2 edited-profile-section">
                                                <ProfileEducationAdd @addEducationStep="addEducationStep"/>
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
        <v-snackbar
            v-model="snackbar"
            :timeout="3000">
                {{ snackbarText }}
                <v-btn color="blue" flat @click="snackbar = false">{{ $t('shared.content.close') }}</v-btn>
        </v-snackbar>
    </section>
</template>

<script>
import Dropzone from 'nuxt-dropzone';
import moment from 'moment';
import _ from 'lodash';
import 'nuxt-dropzone/dropzone.css';
import ProfileGeneralInformation from '~/components/profile/profile-general-information.vue';
import ProfileSkills from '~/components/profile/profile-skills.vue';
import ProfilePhotoGallery from '~/components/profile/profile-photo-gallery.vue';
import ProfileVideoGallery from '~/components/profile/profile-video-gallery.vue';
import ProfileVideoAdd from '~/components/profile/profile-video-add.vue';
import ProfileVideoEdit from '~/components/profile/profile-video-edit.vue';
import ProfileVideoDelete from '~/components/profile/profile-video-delete.vue';
import ProfileAwards from '~/components/profile/profile-awards.vue';
import ProfileAwardAdd from '~/components/profile/profile-award-add.vue';
import ProfileAwardEdit from '~/components/profile/profile-award-edit.vue';
import ProfileAwardDelete from '~/components/profile/profile-award-delete.vue';
import ProfileExperience from '~/components/profile/profile-experience.vue';
import ProfileExperienceAdd from '~/components/profile/profile-experience-add.vue';
import ProfileExperienceEdit from '~/components/profile/profile-experience-edit.vue';
import ProfileExperienceDelete from '~/components/profile/profile-experience-delete.vue';
import ProfileEducation from '~/components/profile/profile-education.vue';
import ProfileEducationAdd from '~/components/profile/profile-education-add.vue';
import ProfileEducationEdit from '~/components/profile/profile-education-edit.vue';
import ProfileEducationDelete from '~/components/profile/profile-education-delete.vue';
import { SocialMediaManager, Helpers, HtmlHelpers, Validators } from '~/utils';
import { SocialMediaCategoryType } from '~/store/entities';
import { mapGetters, mapState } from 'vuex';

export default {
        components: {
            Dropzone,
            moment,
            ProfileGeneralInformation,
            ProfileSkills,
            ProfilePhotoGallery,
            ProfileVideoGallery,
            ProfileVideoAdd,
            ProfileVideoEdit,
            ProfileVideoDelete,
            ProfileAwards,
            ProfileAwardAdd,
            ProfileAwardEdit,
            ProfileAwardDelete,
            ProfileExperience,
            ProfileExperienceAdd,
            ProfileExperienceEdit,
            ProfileExperienceDelete,
            ProfileEducation,
            ProfileEducationAdd,
            ProfileEducationEdit,
            ProfileEducationDelete
        },
        layout: 'user',
        middleware: ['authenticated', 'enabled', 'user'],
        data: () => ({
            profile: {},
            editedProfile: {},
            portfolioImagesIndex: null,
            isEditingGeneralInformation: false,
            isEditingSkills: false,
			isEditingPhotoGallery: false,
            isAddingVideo: false,
            isEditingVideo: false,
            isDeletingVideo: false,
            isEditingAwards: false,
            isAddingAward: false,
            isDeletingAward: false,
            isEditingExperience: false,
            isAddingExperienceStep: false,
            isDeletingExperienceStep: false,
            isEditingEducation: false,
            isAddingEducationStep: false,
            isDeletingEducationStep: false,
            snackbar: false,
            snackbarText: ''
        }),
        async asyncData ({ store, query }) {
            await store.dispatch('users/getMyProfile');

            var response = store.state.users.myProfile;
            var skills   = store.getters['applicationData/skills'];

            var profile = {
                ID: response.ID
            };

            profile.profileGeneralInformation   = {
                profileImage: response.ProfileImage || {},
                birthDate: response.BirthDate.substr(0, 10),
                phoneNumber: response.PhoneNumber,
                description: response.Description,
                website: response.Website,
                firstName: response.FirstName,
                lastName: response.LastName,
                email: response.Email,
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
                        originalLink: v.Video,
                        embedLink: SocialMediaManager.extractEmbedURLFromUnknownProvider(v.Video),
                        isValid: true,
                        hasBeenUpdated: function () {
                            return this.link !== this.originalLink;
                        },
                        isHovered: false,
                        inEditMode: false,
                        inDeleteMode: false
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
                        date: a.Date.substr(0, 7),
                        originalTitle: a.Title,
                        originalIssuer: a.Issuer,
                        originalDescription: a.Description,
                        originalDate: a.Date.substr(0, 7),
                        hasBeenUpdated: function () {
                            return this.title !== this.originalTitle || this.issuer !== this.originalIssuer ||
                                this.description !== this.originalDescription || this.date !== this.originalDate;
                        },
                        isHovered: false,
                        inEditMode: false,
                        inDeleteMode: false
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
                        endDate: e.EndDate.substr(0, 7),
                        originalPosition: e.Position,
                        originalEmployerName: e.Employer,
                        originalDescription: e.Description,
                        originalStartDate: e.StartDate.substr(0, 7),
                        originalEndDate: e.EndDate.substr(0, 7),
                        hasBeenUpdated: function () {
                            return this.position !== this.originalPosition || this.employerName !== this.originalEmployerName ||
                                this.description !== this.originalDescription || this.startDate !== this.originalStartDate ||
                                this.endDate !== this.originalEndDate;
                        },
                        isHovered: false,
                        inEditMode: false,
                        inDeleteMode: false
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
                        endDate: e.EndDate.substr(0, 7),
                        originalTitle: e.Title,
                        originalInstitutionName: e.Institution,
                        originalDescription: e.Description,
                        originalStartDate: e.StartDate.substr(0, 7),
                        originalEndDate: e.EndDate.substr(0, 7),
                        hasBeenUpdated: function () {
                            return this.title !== this.originalTitle || this.institutionName !== this.originalInstitutionName ||
                                this.description !== this.originalDescription || this.startDate !== this.originalStartDate ||
                                this.endDate !== this.originalEndDate;
                        },
                        isHovered: false,
                        inEditMode: false,
                        inDeleteMode: false
                    };
                })
            };

            return {
                profile
            };
        },
        methods: {
            initializeData: function () {
                window.onscroll = _.throttle(() => {
                    if (this.isEditingProfileSection) {
                        this.$store.dispatch('syncMainOverlaySize');
                    }
                }, 100);
            },
            getTimelineDate (date) {
                return moment(date).format('MM/YYYY');
            },
            initiateProfileSectionEditSession (navigateToElement) {
                this.$store.dispatch('users/initiateProfileSectionEditSession');

                if (navigateToElement) {
                    setTimeout(() => {
                        var element = document.getElementsByClassName('edited-profile-section')[0];

                        if (!HtmlHelpers.isVerticallyFullyInViewport(element)) {
                            HtmlHelpers.scrollToElement(element);
                        }
                    }, 0);
                }
            },
            endProfileSectionEditSession () {
                this.$store.dispatch('users/endProfileSectionEditSession');
            },
            onEditGeneralInformationClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(true);
                this.cloneEditedProfile();
                this.isEditingGeneralInformation = true;
            },
            onEditSkillsClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(true);
                this.cloneEditedProfile();
                this.isEditingSkills = true;
            },
            onEditPhotoGalleryClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(true);
                this.cloneEditedProfile();
                this.isEditingPhotoGallery = true;
            },
            onAddVideoClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(true);
                this.cloneEditedProfile();
                this.isAddingVideo = true;
            },
            onEditVideoClick: function (video, index) {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(true);
                this.cloneEditedProfile();
                this.isEditingVideo = true;
                video.inEditMode = true;
            },
            onDeleteVideoClick: function (video, index) {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(true);
                this.cloneEditedProfile();
                this.isDeletingVideo = true;
                video.inDeleteMode = true;
            },
            onAddAwardClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(false);
                this.cloneEditedProfile();
                this.isAddingAward = true;
            },
            onEditAwardClick: function (award, index) {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(false);
                this.cloneEditedProfile();
                this.isEditingAwards = true;
                award.inEditMode = true;
            },
            onDeleteAwardClick: function (award, index) {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(false);
                this.cloneEditedProfile();
                this.isDeletingAward = true;
                award.inDeleteMode = true;
            },
            onAddExperienceStepClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(false);
                this.cloneEditedProfile();
                this.isAddingExperienceStep = true;
            },
            onEditExperienceStepClick: function (experienceStep, index) {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(false);
                this.cloneEditedProfile();
                this.isEditingExperience = true;
                experienceStep.inEditMode = true;
            },
            onDeleteExperienceStepClick: function (experienceStep, index) {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(false);
                this.cloneEditedProfile();
                this.isDeletingExperienceStep = true;
                experienceStep.inDeleteMode = true;
            },
            onAddEducationStepClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(false);
                this.cloneEditedProfile();
                this.isAddingEducationStep = true;
            },
            onEditEducationStepClick: function (educationStep, index) {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(false);
                this.cloneEditedProfile();
                this.isEditingEducation = true;
                educationStep.inEditMode = true;
            },
            onDeleteEducationStepClick: function (educationStep, index) {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(false);
                this.cloneEditedProfile();
                this.isDeletingEducationStep = true;
                educationStep.inDeleteMode = true;
            },
            onSaveEditGeneralInformationClick: function () {
                var newGeneralInformationRequest = {
                    FirstName: this.editedProfile.profileGeneralInformation.firstName,
                    LastName: this.editedProfile.profileGeneralInformation.lastName,
                    ProfileImage: {
                        Image: this.editedProfile.profileGeneralInformation.profileImage.Image
                    },
                    BirthDate: this.editedProfile.profileGeneralInformation.birthDate,
                    PhoneNumber: this.editedProfile.profileGeneralInformation.phoneNumber,
                    Description: this.editedProfile.profileGeneralInformation.description,
                    Website: this.editedProfile.profileGeneralInformation.website ? this.editedProfile.profileGeneralInformation.website : null,
                    InstagramLink: this.editedProfile.profileGeneralInformation.instagramLink ? this.editedProfile.profileGeneralInformation.instagramLink : null,
                    YoutubeLink: this.editedProfile.profileGeneralInformation.youtubeLink ? this.editedProfile.profileGeneralInformation.youtubeLink : null,
                    FacebookLink: this.editedProfile.profileGeneralInformation.facebookLink ? this.editedProfile.profileGeneralInformation.facebookLink : null,
                    LinkedinLink: this.editedProfile.profileGeneralInformation.linkedinLink ? this.editedProfile.profileGeneralInformation.linkedinLink : null
                };

                this.$store.dispatch('users/updateMyGeneralInformation', newGeneralInformationRequest).then(() => {
                    if (!this.users.updateMyGeneralInformationErrors) {
                        this.isEditingGeneralInformation = false;
                        this.endProfileSectionEditSession();
                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-general-information');
                        this.snackbar = true;
                    }
                });
            },
            onSaveEditSkillsClick: function () {
                this.$store.dispatch('users/updateMySkills', this.editedProfile.profileSkills.selectedSkills.map(s => s.ID)).then(() => {
                    if (!this.users.updateMySkillsErrors) {
                        this.isEditingSkills    = false;
                        this.endProfileSectionEditSession();
                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-skills');
                        this.snackbar = true;
                    }
                });
            },
            onSaveEditPhotoGalleryClick: function () {
                this.$store.dispatch('users/updateMyPhotoGallery', this.editedProfile.profilePhotoGallery.photoGallery).then(() => {
                    if (!this.users.updateMyPhotoGalleryErrors) {
                        this.isEditingPhotoGallery = false;
                        this.endProfileSectionEditSession();
                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-photo-gallery');
                        this.snackbar = true;
                    }
                });
            },
            onCancelEditGeneralInformationClick: function () {
                this.isEditingGeneralInformation = false;
                this.endProfileSectionEditSession();
            },
            onCancelEditSkillsClick: function () {
                this.isEditingSkills = false;
                this.endProfileSectionEditSession();
            },
            onCancelEditPhotoGalleryClick: function () {
                this.isEditingPhotoGallery = false;
                this.endProfileSectionEditSession();
            },
            cancelAllUnsavedChanges: function () {
                this.isEditingGeneralInformation = false;
                this.isEditingSkills             = false;
                this.isEditingPhotoGallery       = false;
                this.isAddingVideo               = false;
                this.isEditingVideo              = false;
                this.isDeletingVideo             = false;
                this.isEditingAwards             = false;
                this.isAddingAward               = false;
                this.isDeletingAward             = false;
                this.isEditingExperience         = false;
                this.isAddingExperienceStep      = false;
                this.isDeletingExperienceStep    = false;
                this.isEditingEducation          = false;
                this.isAddingEducationStep       = false;
                this.isDeletingEducationStep     = false;
                this.endProfileSectionEditSession();
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
            addVideo: function (video) {
                if (video) {
                    var request = {
                        Video: video.link
                    };

                    this.$store.dispatch('videos/create', request).then((response) => {
                        this.editedProfile.profileVideoGallery.videoGallery.push({
                            id: this.$store.state.videos.newUserVideo.ID,
                            link: video.link,
                            embedLink: SocialMediaManager.extractEmbedURLFromUnknownProvider(video.link),
                            isHovered: false,
                            inEditMode: false,
                            inDeleteMode: false
                        });

                        this.saveEditedProfile();

                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-video-gallery');
                        this.snackbar = true;
                    });
                }

                this.isAddingVideo = false;
                this.endProfileSectionEditSession();
            },
            editVideo: function (video, index) {
                if (video) {
                    var request = {
                        ID: video.ID,
                        Video: video.link
                    };

                    this.$store.dispatch('videos/update', request).then(() => {
                        this.editedProfile.profileVideoGallery.videoGallery[index].link = video.link;
                        this.editedProfile.profileVideoGallery.videoGallery[index].embedLink =
                                            SocialMediaManager.extractEmbedURLFromUnknownProvider(video.link);

                        this.saveEditedProfile();

                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-video-gallery');
                        this.snackbar = true;
                    });
                }

                this.isEditingVideo = false;
                this.endProfileSectionEditSession();
            },
            deleteVideo: function (index) {
                if (index !== null) {
                    var id = this.editedProfile.profileVideoGallery.videoGallery[index].id;

                    this.$store.dispatch('videos/delete', id).then(() => {
                        this.editedProfile.profileVideoGallery.videoGallery.splice(index, 1);

                        this.saveEditedProfile();

                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-video-gallery');
                        this.snackbar = true;
                    });
                }

                this.isDeletingVideo = false;
                this.endProfileSectionEditSession();
            },
            addAward: function (award) {
                if (award) {
                    var request = {
                        Title: award.title,
                        Issuer: award.issuer,
                        Description: award.description,
                        Date: award.date
                    };

                    this.$store.dispatch('awards/create', request).then((response) => {
                        this.editedProfile.profileAwards.awards.push({
                            id: this.$store.state.awards.newAward.ID,
                            title: award.title,
                            issuer: award.issuer,
                            description: award.description,
                            date: award.date,
                            isHovered: false,
                            inEditMode: false,
                            inDeleteMode: false
                        });

                        this.editedProfile.profileAwards.awards =
                                this.editedProfile.profileAwards.awards
                                    .sort((a1, a2) => new Date(a1.date).getTime() > new Date(a2.date).getTime() ? -1 : 1);

                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-awards');
                        this.snackbar = true;
                    });
                }

                this.isAddingAward = false;
                this.endProfileSectionEditSession();
            },
            editAward: function (award, index) {
                if (award) {
                    var request = {
                        ID: award.id,
                        Title: award.title,
                        Issuer: award.issuer,
                        Description: award.description,
                        Date: award.date
                    };

                    this.$store.dispatch('awards/update', request).then(() => {
                        this.editedProfile.profileAwards.awards[index].title = award.title;
                        this.editedProfile.profileAwards.awards[index].issuer = award.issuer;
                        this.editedProfile.profileAwards.awards[index].description = award.description;
                        this.editedProfile.profileAwards.awards[index].date = award.date;

                        this.editedProfile.profileAwards.awards =
                                this.editedProfile.profileAwards.awards
                                    .sort((a1, a2) => new Date(a1.date).getTime() > new Date(a2.date).getTime() ? -1 : 1);

                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-awards');
                        this.snackbar = true;
                    });
                }

                this.isEditingAwards = false;
                this.endProfileSectionEditSession();
            },
            deleteAward: function (index) {
                if (index !== null) {
                    var id = this.editedProfile.profileAwards.awards[index].id;

                    this.$store.dispatch('awards/delete', id).then(() => {
                        this.editedProfile.profileAwards.awards.splice(index, 1);

                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-awards');
                        this.snackbar = true;
                    });
                }

                this.isDeletingAward = false;
                this.endProfileSectionEditSession();
            },
            addExperienceStep: function (experienceStep) {
                if (experienceStep) {
                    var request = {
                        Position: experienceStep.position,
                        Employer: experienceStep.employerName,
                        Description: experienceStep.description,
                        StartDate: experienceStep.startDate.substr(0, 7),
                        EndDate: experienceStep.endDate.substr(0, 7)
                    };

                    this.$store.dispatch('experience/create', request).then((response) => {
                        this.editedProfile.profileExperience.experienceSteps.push({
                            id: this.$store.state.experience.newExperienceStep.ID,
                            position: experienceStep.position,
                            employerName: experienceStep.employerName,
                            description: experienceStep.description,
                            startDate: experienceStep.startDate.substr(0, 7),
                            endDate: experienceStep.endDate.substr(0, 7),
                            isHovered: false,
                            inEditMode: false,
                            inDeleteMode: false
                        });

                        this.editedProfile.profileExperience.experienceSteps =
                                this.editedProfile.profileExperience.experienceSteps
                                    .sort((e1, e2) => new Date(e1.startDate).getTime() > new Date(e2.startDate).getTime() ? -1 : 1);

                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-experience');
                        this.snackbar = true;
                    });
                }

                this.isAddingExperienceStep = false;
                this.endProfileSectionEditSession();
            },
            editExperienceStep: function (experienceStep, index) {
                if (experienceStep) {
                    var request = {
                        ID: experienceStep.id,
                        Position: experienceStep.position,
                        Employer: experienceStep.employer,
                        Description: experienceStep.description,
                        StartDate: experienceStep.startDate.substr(0, 7),
                        EndDate: experienceStep.endDate.substr(0, 7)
                    };

                    this.$store.dispatch('experience/update', request).then(() => {
                        this.editedProfile.profileExperience.experienceSteps[index].position = experienceStep.position;
                        this.editedProfile.profileExperience.experienceSteps[index].employerName = experienceStep.employerName;
                        this.editedProfile.profileExperience.experienceSteps[index].description = experienceStep.description;
                        this.editedProfile.profileExperience.experienceSteps[index].startDate = experienceStep.startDate;
                        this.editedProfile.profileExperience.experienceSteps[index].endDate = experienceStep.endDate;

                        this.editedProfile.profileExperience.experienceSteps =
                                this.editedProfile.profileExperience.experienceSteps
                                    .sort((e1, e2) => new Date(e1.startDate).getTime() > new Date(e2.startDate).getTime() ? -1 : 1);

                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-experience');
                        this.snackbar = true;
                    });
                }

                this.isEditingExperience = false;
                this.endProfileSectionEditSession();
            },
            deleteExperienceStep: function (index) {
                if (index !== null) {
                    var id = this.editedProfile.profileExperience.experienceSteps[index].id;

                    this.$store.dispatch('experience/delete', id).then(() => {
                        this.editedProfile.profileExperience.experienceSteps.splice(index, 1);

                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-experience');
                        this.snackbar = true;
                    });
                }

                this.isDeletingExperienceStep = false;
                this.endProfileSectionEditSession();
            },
            addEducationStep: function (educationStep) {
                if (educationStep) {
                    var request = {
                        Title: educationStep.title,
                        Institution: educationStep.institutionName,
                        Description: educationStep.description,
                        StartDate: educationStep.startDate.substr(0, 7),
                        EndDate: educationStep.endDate.substr(0, 7)
                    };

                    this.$store.dispatch('education/create', request).then((response) => {
                        this.editedProfile.profileEducation.educationSteps.push({
                            id: this.$store.state.education.newEducationStep.ID,
                            title: educationStep.title,
                            institutionName: educationStep.institutionName,
                            description: educationStep.description,
                            startDate: educationStep.startDate.substr(0, 7),
                            endDate: educationStep.endDate.substr(0, 7),
                            isHovered: false,
                            inEditMode: false,
                            inDeleteMode: false
                        });

                        this.editedProfile.profileEducation.educationSteps =
                            this.editedProfile.profileEducation.educationSteps
                                .sort((e1, e2) => new Date(e1.startDate).getTime() > new Date(e2.startDate).getTime() ? -1 : 1);

                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-education');
                        this.snackbar = true;
                    });
                }

                this.isAddingEducationStep = false;
                this.endProfileSectionEditSession();
            },
            editEducationStep: function (educationStep, index) {
                if (educationStep) {
                    var request = {
                        ID: educationStep.id,
                        Title: educationStep.title,
                        Institution: educationStep.institutionName,
                        Description: educationStep.description,
                        StartDate: educationStep.startDate.substr(0, 7),
                        EndDate: educationStep.endDate.substr(0, 7)
                    };

                    this.$store.dispatch('education/update', request).then(() => {
                        this.editedProfile.profileEducation.educationSteps[index].title = educationStep.title;
                        this.editedProfile.profileEducation.educationSteps[index].institutionName = educationStep.institutionName;
                        this.editedProfile.profileEducation.educationSteps[index].description = educationStep.description;
                        this.editedProfile.profileEducation.educationSteps[index].startDate = educationStep.startDate;
                        this.editedProfile.profileEducation.educationSteps[index].endDate = educationStep.endDate;

                        this.editedProfile.profileEducation.educationSteps =
                            this.editedProfile.profileEducation.educationSteps
                                .sort((e1, e2) => new Date(e1.startDate).getTime() > new Date(e2.startDate).getTime() ? -1 : 1);

                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-education');
                        this.snackbar = true;
                    });
                }

                this.isEditingEducation = false;
                this.endProfileSectionEditSession();
            },
            deleteEducationStep: function (index) {
                if (index !== null) {
                    var id = this.editedProfile.profileEducation.educationSteps[index].id;

                    this.$store.dispatch('education/delete', id).then(() => {
                        this.editedProfile.profileEducation.educationSteps.splice(index, 1)

                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-education');
                        this.snackbar = true;
                    });
                }

                this.isDeletingEducationStep = false;
                this.endProfileSectionEditSession();
            },
            onDownloadResumeClick: function () {

            },
            areAllSocialMediaLinksValid: function () {
                if (this.editedProfile.profileGeneralInformation.instagramLink &&
                        !SocialMediaManager.isValidURL(this.editedProfile.profileGeneralInformation.instagramLink, SocialMediaCategoryType.Instagram)) {
                    return false;
                }

                if (this.editedProfile.profileGeneralInformation.youtubeLink &&
                        !SocialMediaManager.isValidURL(this.editedProfile.profileGeneralInformation.youtubeLink, SocialMediaCategoryType.Youtube)) {
                    return false;
                }

                if (this.editedProfile.profileGeneralInformation.facebookLink &&
                        !SocialMediaManager.isValidURL(this.editedProfile.profileGeneralInformation.facebookLink, SocialMediaCategoryType.Facebook)) {
                    return false;
                }

                if (this.editedProfile.profileGeneralInformation.linkedinLink &&
                        !SocialMediaManager.isValidURL(this.editedProfile.profileGeneralInformation.linkedinLink, SocialMediaCategoryType.Linkedin)) {
                    return false;
                }

                return true;
            },
            isSaveEditGeneralInformationButtonDisabled: function () {
                var isWebsiteFieldValid     = !this.editedProfile.profileGeneralInformation.website ||
                                                        Validators.isValidURL(this.editedProfile.profileGeneralInformation.website);
                var isDescriptionFieldValid = !this.editedProfile.profileGeneralInformation.description ||
                                                        this.editedProfile.profileGeneralInformation.description.length <= 500;

                return !this.editedProfile.profileGeneralInformation.firstName || !this.editedProfile.profileGeneralInformation.lastName ||
                        !this.editedProfile.profileGeneralInformation.phoneNumber ||
                        !Validators.isValidPhoneNumber(this.editedProfile.profileGeneralInformation.phoneNumber) ||
                        !isWebsiteFieldValid ||
                        !isDescriptionFieldValid ||
                        !this.areAllSocialMediaLinksValid() ||
                        !Validators.isValidBirthDate(this.editedProfile.profileGeneralInformation.birthDate);
            }
        },
        computed: {
            ...mapState(['users']),
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

                return this.profile.profileGeneralInformation.profileImage.Image;
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
                return this.profile.profilePhotoGallery.photoGallery
                        .map(p => `data:image/png;base64,${p.Image}`);
            },
            isEditingProfileSection: function () {
                return this.isEditingGeneralInformation || this.isEditingSkills || this.isEditingPhotoGallery ||
                     this.isAddingVideo || this.isEditingVideo || this.isDeletingVideo ||
                     this.isEditingAwards || this.isAddingAward || this.isDeletingAward ||
                     this.isEditingExperience || this.isAddingExperienceStep || this.isDeletingExperienceStep ||
                     this.isEditingEducation || this.isAddingEducationStep || this.isDeletingEducationStep;
            },
            isSaveEditSkillsButtonDisabled: function () {
                return this.editedProfile.profileSkills.selectedSkills.length === 0;
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
            }
        },
        mounted () {
            this.initializeData();
        }
    }
</script>

<style lang="scss" scoped>

    .v-avatar {
        box-shadow: 0px 3px 23px -9px rgba(0,0,0,0.75);
    }

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

    .preview-profile-link {
        text-decoration: none;
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

    .add-video-row {
        border: 3px solid #7E57C2;
        text-align: center;
        color: #7E57C2;
        font-size: 24px;
        cursor: pointer;

        i {
            color: #7E57C2;
            font-size: 30px;
        }

    }

    .edited-profile-section {
        width: 100%;
    }

    .profile-row-actions {

        .v-btn {
            margin-top: 0px;
            margin-bottom: 0px;
        }
    }

    .timeline-row {

        .timeline-header {
            font-size: 32px;
        }

        .timeline-header-item {

            .timeline-header-card .v-card__title {
                justify-content: space-between;
            }

            .timeline-header-card::after, .timeline-header-card::before {
                display: none;
            }
        }

        .timeline-message {

            .timeline-message-card::after, .timeline-message-card::before {
                display: none;
            }
        }

        .timeline-header {
            color: #FFF;
        }

        .award-title, .experience-title, .education-title {
            font-weight: 500;
        }

        .timeline-item-action-row {
            justify-content: space-between;
            min-height: 40px;
        }

        .add-achievement-timeline-item {
            cursor: pointer;

            .timeline-message-card {
                border: 3px solid #7E57C2;
            }

            .v-card__title {
                justify-content: center;
                color: #7E57C2;
                font-size: 24px;

                i {
                    color: #7E57C2;
                    font-size: 30px;
                }
            }
        }
    }

</style>
