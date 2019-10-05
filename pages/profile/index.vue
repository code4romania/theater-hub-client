<template>
    <section class="profile-section">
        <v-container
            id="profile-container"
            class="main-container px-5"
        >
            <v-layout row wrap>
                <v-flex xs12 v-if="!isEditingGeneralInformation" class="mb-5">
                    <v-layout row wrap class="profile-information-group general-information-section">
                        <v-flex xs10>
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
                                                <span
                                                    v-if="age"
                                                    class="name-separator"
                                                >,</span>
                                                <span
                                                    v-if="age"
                                                    class="age-field"
                                                >{{ age }} {{ $t('shared.content.years-old') }}</span>
                                            </v-flex>
                                            <v-flex xs12 mt-2 class="profile-information-row">
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
                                            <v-flex mt-3 class="profile-information-row">
                                                <a v-if="profile.profileGeneralInformation.facebookLink" class="social-media-icon-wrapper" :href="profile.profileGeneralInformation.facebookLink" target="_blank">
                                                    <img class="social-media-icon" :src="require('~/assets/images/facebook.svg')" />
                                                </a>
                                                <a v-if="profile.profileGeneralInformation.instagramLink" class="social-media-icon-wrapper" :href="profile.profileGeneralInformation.instagramLink" target="_blank">
                                                    <img class="social-media-icon" :src="require('~/assets/images/instagram.svg')" />
                                                </a>
                                                <a v-if="profile.profileGeneralInformation.linkedinLink" class="social-media-icon-wrapper" :href="profile.profileGeneralInformation.linkedinLink" target="_blank">
                                                    <img class="social-media-icon" :src="require('~/assets/images/linkedin.svg')" />
                                                </a>
                                                <a v-if="profile.profileGeneralInformation.youtubeLink" class="social-media-icon-wrapper" :href="profile.profileGeneralInformation.youtubeLink" target="_blank">
                                                    <img class="social-media-icon" :src="require('~/assets/images/youtube.svg')" />
                                                </a>
                                            </v-flex>
                                            <v-flex xs12 class="profile-information-row">
                                                <nuxt-link
                                                    :to="`/profile/${profile.profileGeneralInformation.username}`"
                                                    class="view-profile-link"
                                                    target="_blank">
                                                        <v-btn id="view-profile-button" class="primary ml-0" small>
                                                            {{ $t('pages.profile.view-profile-button') }}
                                                        </v-btn>
                                                </nuxt-link>
                                                <v-btn
                                                    v-if="!isDownloadingResume"
                                                    id="download-resume-button"
                                                    class="primary ml-0" small
                                                    @click="handleDownloadResumeClick">
                                                        {{ $t('pages.profile.download-resume-button') }}
                                                </v-btn>
                                                <v-btn
                                                    v-if="isDownloadingResume"
                                                    id="downloading-resume-button"
                                                    class="primary ml-0" small>
                                                        {{ $t('pages.profile.downloading-resume-button') }}
                                                </v-btn>
                                            </v-flex>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs-12 sm-3 md-2 lg-2 id="edit-general-information">
                            <v-btn outline small fab class="mt-2" v-on:click="onEditGeneralInformationClick">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </v-flex>
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

                <v-flex xs12 v-if="isEditingGeneralInformation" class="highlighted-section">
                   <v-layout row wrap pa-5>
                       <v-flex xs12 class="profile-information-group-header">
                           <v-layout row wrap class="profile-row-actions-container">
                               <v-flex xs12 sm8 md8 lg8>
                                    <h2>{{ $t('pages.profile.edit-general-information-title') }}</h2>
                               </v-flex>
                               <v-flex xs12 sm4 md4 lg4 class="profile-row-actions">
                                    <v-btn
                                        outline small fab
                                        slot="activator"
                                        class="mt-0"
                                        v-on:click="onSaveEditGeneralInformationClick"
                                        :disabled="isSaveEditGeneralInformationButtonDisabled()"
                                    >
                                        <v-icon>done</v-icon>
                                    </v-btn>
                                    <v-btn
                                        outline small fab
                                        slot="activator"
                                        class="mt-0"
                                        v-on:click="onCancelEditGeneralInformationClick"
                                    >
                                        <v-icon>clear</v-icon>
                                    </v-btn>
                               </v-flex>
                           </v-layout>
                       </v-flex>
                        <v-flex xs12 pt-4>
                            <ProfileGeneralInformation  :profileGeneralInformation="editedProfile.profileGeneralInformation"
                                                        :displayNameFields="true"
                                                        @updateProfileGeneralInformation="updateProfileGeneralInformation"/>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 my-5>
                    <v-divider class="profile-section-separator"></v-divider>
                </v-flex>

                <v-flex xs12 v-if="!isEditingSkills">
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.skills-title') }}</h2>
                            <v-btn outline small fab class="mt-0" v-on:click="onEditSkillsClick"><v-icon>edit</v-icon></v-btn>
                        </v-flex>
                        <v-flex xs12 pt-4 class="skills-row">
                            <v-chip :key="i" v-for="(skill, i) in skillNameList" class="skill secondary-color mr-2">{{ skill }}</v-chip>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 v-if="isEditingSkills" class="highlighted-section">
                   <v-layout row wrap pa-5>
                        <v-flex xs12 class="profile-information-group-header">
                           <v-layout row wrap class="profile-row-actions-container">
                               <v-flex xs12 sm6 md6 lg6>
                                    <h2>{{ $t('pages.profile.edit-skills-title') }}</h2>
                               </v-flex>
                               <v-flex xs12 sm6 md6 lg6 class="profile-row-actions">
                                    <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditSkillsClick" :disabled="isSaveEditSkillsButtonDisabled">
                                        <v-icon>done</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditSkillsClick"><v-icon>clear</v-icon></v-btn>
                               </v-flex>
                           </v-layout>
                       </v-flex>
                        <v-flex xs12>
                            <ProfileSkills
                                :profileSkills="editedProfile.profileSkills"
                                :skills="skills"
                                @updateProfileSkills="updateProfileSkills" />
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 my-5>
                    <v-divider class="profile-section-separator"></v-divider>
                </v-flex>

                <v-flex xs12 v-if="!isEditingPhotoGallery" class="photo-gallery-section" v-bind:class="{'empty': !hasPhotoGallery}">
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.photo-gallery-title') }}</h2>
                            <v-btn outline small fab class="mt-0" v-on:click="onEditPhotoGalleryClick"><v-icon>edit</v-icon></v-btn>
                        </v-flex>
                        <v-flex xs12 pt-4 class="photo-gallery-row" v-if="hasPhotoGallery">
                            <no-ssr>
                                <gallery :images="portfolioFullImages" :index="portfolioImagesIndex" @close="portfolioImagesIndex = null"></gallery>
                            </no-ssr>
                            <Carousel @handleCarouselItemClick="handleCarouselItemClick" :selectedIndex="portfolioImagesIndex" :items="portfolioImages"></Carousel>
                        </v-flex>
                        <v-flex xs12 pb-4 v-if="!hasPhotoGallery" class="empty-photo-gallery">
                            {{ $t('pages.profile.no-photos-description') }}
                        </v-flex> 
                    </v-layout>
                </v-flex>

                <v-flex xs12 v-if="isEditingPhotoGallery" class="highlighted-section">
                   <v-layout row wrap pa-5>
                       <v-flex xs12 class="profile-information-group-header">
                           <v-layout row wrap class="profile-row-actions-container">
                               <v-flex xs12 sm6 md6 lg6>
                                    <h2>{{ $t('pages.profile.edit-photo-gallery-title') }}</h2>
                               </v-flex>
                               <v-flex xs12 sm6 md6 lg6 class="profile-row-actions">
                                    <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onSaveEditPhotoGalleryClick"><v-icon>done</v-icon></v-btn>
                                    <v-btn outline small fab slot="activator" class="mt-0" v-on:click="onCancelEditPhotoGalleryClick"><v-icon>clear</v-icon></v-btn>
                               </v-flex>
                           </v-layout>
                       </v-flex>
                        <v-flex xs12 mt-4>
                            <ProfilePhotoGallery :profilePhotoGallery="editedProfile.profilePhotoGallery" @updateProfilePhotoGallery="updateProfilePhotoGallery"/>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 my-5>
                    <v-divider class="profile-section-separator"></v-divider>
                </v-flex>

                <v-flex xs12>
                    <v-layout row wrap class="profile-information-group">
                        <v-flex xs12 class="profile-information-group-header">
                            <h2>{{ $t('pages.profile.video-gallery-title') }}</h2>
                        </v-flex>
                        <v-flex xs12>
                            <ProfileVideoGallery
                                :videoGallery="profile.profileVideoGallery.videoGallery"
                                :saveChanges="true"
                                @initiateEditSectionSession="initiateEditSectionSession"
                                @endEditSectionSession="endEditSectionSession"
                                @updateVideoGallery="updateVideoGallery"
                                @showSnackbar="showSnackbar" />
                        </v-flex>
                    </v-layout>

                </v-flex>

                <v-flex xs12 my-5>
                    <v-divider class="profile-section-separator"></v-divider>
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

                                        <ProfileAwards
                                            :awards="profile.profileAwards.awards"
                                            :isTimeline="true"
                                            :saveChanges="true"
                                            @initiateEditSectionSession="initiateEditSectionSession"
                                            @endEditSectionSession="endEditSectionSession"
                                            @updateAwards="updateAwards"
                                            @showSnackbar="showSnackbar" />

                                        <ProfileExperience
                                            :experienceSteps="profile.profileExperience.experienceSteps"
                                            :isTimeline="true"
                                            :saveChanges="true"
                                            @initiateEditSectionSession="initiateEditSectionSession"
                                            @endEditSectionSession="endEditSectionSession"
                                            @updateExperience="updateExperience"
                                            @showSnackbar="showSnackbar" />

                                        <ProfileEducation
                                            :educationSteps="profile.profileEducation.educationSteps"
                                            :isTimeline="true"
                                            :saveChanges="true"
                                            @initiateEditSectionSession="initiateEditSectionSession"
                                            @endEditSectionSession="endEditSectionSession"
                                            @updateEducation="updateEducation"
                                            @showSnackbar="showSnackbar" />

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
import moment from 'moment';
import _ from 'lodash';
import ProfileGeneralInformation from '~/components/profile/profile-general-information.vue';
import ProfileSkills from '~/components/profile/profile-skills.vue';
import ProfilePhotoGallery from '~/components/profile/profile-photo-gallery.vue';
import ProfileVideoGallery from '~/components/profile/profile-video-gallery.vue';
import ProfileAwards from '~/components/profile/profile-awards.vue';
import ProfileExperience from '~/components/profile/profile-experience.vue';
import ProfileEducation from '~/components/profile/profile-education.vue';
import Carousel from '~/components/shared/carousel.vue';
import { SocialMediaManager, Helpers, HtmlHelpers, Validators } from '~/utils';
import { ProfileSectionType, SocialMediaCategoryType } from '~/store/entities';
import { mapGetters, mapState } from 'vuex';

export default {
        components: {
            moment,
            ProfileGeneralInformation,
            ProfileSkills,
            ProfilePhotoGallery,
            ProfileVideoGallery,
            ProfileAwards,
            ProfileExperience,
            ProfileEducation,
            Carousel
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
            isEditingVideoGallery: false,
            isEditingAwards: false,
            isEditingExperience: false,
            isEditingEducation: false,
            isDownloadingResume: false,
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
            initiateEditSectionSession (navigateToElement, profileSection) {
                this.$store.dispatch('users/initiateEditSectionSession');

                if (profileSection === ProfileSectionType.GeneralInformation) {
                    this.isEditingGeneralInformation = true;
                } else if (profileSection === ProfileSectionType.Skills) {
                    this.isEditingSkills = true;
                } else if (profileSection === ProfileSectionType.PhotoGallery) {
                    this.isEditingPhotoGallery = true;
                } else if (profileSection === ProfileSectionType.VideoGallery) {
                    this.isEditingVideoGallery = true;
                } else if (profileSection === ProfileSectionType.Awards) {
                    this.isEditingAwards = true;
                } else if (profileSection === ProfileSectionType.Experience) {
                    this.isEditingExperience = true;
                } else if (profileSection === ProfileSectionType.Education) {
                    this.isEditingEducation = true;
                }

                if (navigateToElement) {
                    setTimeout(() => {
                        var element = document.getElementsByClassName('highlighted-section')[0];

                        if (!HtmlHelpers.isVerticallyFullyInViewport(element)) {
                            HtmlHelpers.scrollToElement(element);
                        }
                    }, 0);
                }
            },
            endEditSectionSession (profileSection) {
                if (profileSection === ProfileSectionType.GeneralInformation) {
                    this.isEditingGeneralInformation = false;
                } else if (profileSection === ProfileSectionType.Skills) {
                    this.isEditingSkills = false;
                } else if (profileSection === ProfileSectionType.PhotoGallery) {
                    this.isEditingPhotoGallery = false;
                } else if (profileSection === ProfileSectionType.VideoGallery) {
                    this.isEditingVideoGallery = false;
                } else if (profileSection === ProfileSectionType.Awards) {
                    this.isEditingAwards = false;
                } else if (profileSection === ProfileSectionType.Experience) {
                    this.isEditingExperience = false;
                } else if (profileSection === ProfileSectionType.Education) {
                    this.isEditingEducation = false;
                }

                this.$store.dispatch('users/endEditSectionSession');
            },
            onEditGeneralInformationClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true, ProfileSectionType.GeneralInformation);
                this.cloneEditedProfile();
            },
            onEditSkillsClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true, ProfileSectionType.Skills);
                this.cloneEditedProfile();
            },
            onEditPhotoGalleryClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(true, ProfileSectionType.PhotoGallery);
                this.cloneEditedProfile();
            },
            onSaveEditGeneralInformationClick: function () {
                const profileImage = this.editedProfile.profileGeneralInformation.profileImage
                                                    ? this.editedProfile.profileGeneralInformation.profileImage.File
                                                    : '';

                var generalInformationFormData = new FormData();
                generalInformationFormData.append('FirstName', this.editedProfile.profileGeneralInformation.firstName);
                generalInformationFormData.append('LastName', this.editedProfile.profileGeneralInformation.lastName);
                generalInformationFormData.append('ProfileImage', profileImage);
                generalInformationFormData.append('BirthDate', this.editedProfile.profileGeneralInformation.birthDate);
                generalInformationFormData.append('PhoneNumber', this.editedProfile.profileGeneralInformation.phoneNumber);
                generalInformationFormData.append('Description', this.editedProfile.profileGeneralInformation.description);
                generalInformationFormData.append('Website', this.editedProfile.profileGeneralInformation.website ? this.editedProfile.profileGeneralInformation.website : '');
                generalInformationFormData.append('InstagramLink', this.editedProfile.profileGeneralInformation.instagramLink ? this.editedProfile.profileGeneralInformation.instagramLink : '');
                generalInformationFormData.append('YoutubeLink', this.editedProfile.profileGeneralInformation.youtubeLink ? this.editedProfile.profileGeneralInformation.youtubeLink : '');
                generalInformationFormData.append('FacebookLink', this.editedProfile.profileGeneralInformation.facebookLink ? this.editedProfile.profileGeneralInformation.facebookLink : '');
                generalInformationFormData.append('LinkedinLink', this.editedProfile.profileGeneralInformation.linkedinLink ? this.editedProfile.profileGeneralInformation.linkedinLink : '');

                this.$store.dispatch('users/updateMyGeneralInformation', generalInformationFormData).then((response) => {
                    this.endEditSectionSession(ProfileSectionType.GeneralInformation);

                    if (response) {
                        this.editedProfile.profileGeneralInformation.profileImage = response.ProfileImage;
                        this.$store.dispatch('users/setMe', response);
                    }

                    this.saveEditedProfile();
                    this.snackbarText = this.$t('pages.profile.snackbar-messages.update-general-information');
                    this.snackbar = true;
                });
            },
            onSaveEditSkillsClick: function () {
                this.$store.dispatch('users/updateMySkills', this.editedProfile.profileSkills.selectedSkills.map(s => s.ID)).then(() => {
                    if (!this.users.updateMySkillsErrors) {
                        this.endEditSectionSession(ProfileSectionType.Skills);
                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-skills');
                        this.snackbar = true;
                    }
                });
            },
            onSaveEditPhotoGalleryClick: function () {
                this.$store.dispatch('users/updateMyPhotoGallery', this.editedProfile.profilePhotoGallery.photoGallery).then((response) => {
                        this.endEditSectionSession(ProfileSectionType.PhotoGallery);

                        if (response && response.AddedPhotos.length !== 0) {
                            this.editedProfile.profilePhotoGallery.photoGallery = this.editedProfile.profilePhotoGallery.photoGallery.filter(p => !p.File);
                            this.editedProfile.profilePhotoGallery.photoGallery = this.editedProfile.profilePhotoGallery.photoGallery.concat(response.AddedPhotos);
                        }

                        this.saveEditedProfile();
                        this.snackbarText = this.$t('pages.profile.snackbar-messages.update-photo-gallery');
                        this.snackbar = true;
                }).catch(() => {
                    this.endEditSectionSession(ProfileSectionType.PhotoGallery);
                });
            },
            onCancelEditGeneralInformationClick: function () {
                this.endEditSectionSession(ProfileSectionType.GeneralInformation);
            },
            onCancelEditSkillsClick: function () {
                this.endEditSectionSession(ProfileSectionType.Skills);
            },
            onCancelEditPhotoGalleryClick: function () {
                this.endEditSectionSession(ProfileSectionType.PhotoGallery);
            },
            cancelAllUnsavedChanges: function () {
                this.isEditingGeneralInformation = false;
                this.isEditingSkills             = false;
                this.isEditingPhotoGallery       = false;
                this.isEditingVideoGallery       = false;
                this.isEditingAwards             = false;
                this.isEditingExperience         = false;
                this.isEditingEducation          = false;

                this.endEditSectionSession();
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
            handleDownloadResumeClick: function () {
                if (this.isDownloadingResume) {
                    return;
                }

                this.isDownloadingResume = true;

                this.$store.dispatch('users/generateResume').then(response => {
                    this.isDownloadingResume = false;
                });
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
            },
            handleCarouselItemClick: function (itemIndex) {
                this.portfolioImagesIndex = itemIndex;
            },
            updateVideoGallery: function (editedVideoGallery) {
                this.profile.profileVideoGallery.videoGallery = [...editedVideoGallery];
            },
            updateAwards: function (editedAwards) {
                this.profile.profileAwards.awards = [...editedAwards];
            },
            updateExperience: function (editedExperience) {
                this.profile.profileExperience.experienceSteps = [...editedExperience];
            },
            updateEducation: function (editedEducation) {
                this.profile.profileEducation.educationSteps = [...editedEducation];
            },
            showSnackbar: function (snackbarText) {
                this.snackbarText   = snackbarText;
                this.snackbar       = true;
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
            isEditingProfileSection: function () {
                return this.isEditingGeneralInformation ||
                            this.isEditingSkills ||
                            this.isEditingPhotoGallery ||
                            this.isEditingVideoGallery ||
                            this.isEditingAwards ||
                            this.isEditingExperience ||
                            this.isEditingEducation;
            },
            isSaveEditSkillsButtonDisabled: function () {
                return this.editedProfile.profileSkills.selectedSkills.length === 0;
            },
            hasDescription: function () {
                return this.profile.profileGeneralInformation.description !== '';
            },
            hasPhotoGallery: function () {
                return this.profile.profilePhotoGallery.photoGallery.length !== 0;
            }
        },
        mounted () {
            this.endEditSectionSession();

            this.initializeData();
        }
    }
</script>

<style lang="scss" scoped>

    #general-information-group {
        align-items: center;
    }

    .v-avatar {
        box-shadow: 0px 3px 15px -9px rgba(0,0,0,0.75);
        width: 300px !important;
        height: 300px !important;
    }

    .v-avatar img {
        border: 3px solid #e1e1e1;
    }

    .download-resume {
        margin-right: 20%;
    }

    .view-profile-link {
        text-decoration: none;
    }

    #edit-general-information {
        display: flex;
        justify-content: flex-end;
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
