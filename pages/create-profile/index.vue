<template>
  <section class="create-profile-section">
    <v-container id="create-profile-container" class="main-container pa-1">
        <v-layout row wrap mt-5 pa-5 v-if="!isCreatingProfile && !isCreatedProfile" class="create-account-success">
            <v-flex text-xs-center>
                <h1 mb-3>{{ $t('pages.create-profile.account-created-title') }}</h1>
            </v-flex>
            <v-flex xs12 mt-5>
                <p>
                    {{ $t('pages.create-profile.account-created-message') }}
                </p> 
            </v-flex>
            <v-flex xs12 mt-5 text-xs-center>
                <v-btn color="primary" dark large @click="isCreatingProfile = true">{{ $t('pages.create-profile.account-created-button') }}</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="isCreatingProfile && !isCreatedProfile" class="create-profile-main-layout">
            <v-flex xs12 align-end flexbox pt-5>
                <v-stepper v-model="wizardStep" vertical>

                    <v-stepper-step :complete="wizardStep > 1" step="1">{{ $t('pages.create-profile.steps.general.title') }}</v-stepper-step>

                    <v-stepper-content step="1" class="pl-5">
                        <v-layout row wrap>
                            <ProfileGeneralInformation  :profileGeneralInformation="profileGeneralInformation"
                                                        :displayNameFields="false"
                                                        @updateProfileGeneralInformation="updateProfileGeneralInformation"/>
                            <v-flex xs12 my-5>
                                <v-btn color="primary" @click="wizardStep = 2" :disabled="!isWizardStepValid()">
                                    {{ $t('shared.content.next-button') }}
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step :complete="wizardStep > 2" step="2">{{ $t('pages.create-profile.steps.skills.title') }}</v-stepper-step>

                    <v-stepper-content step="2" class="pl-5">
                        <v-layout row wrap class="pl-2 pb-5">
                            <ProfileSkills :profileSkills="profileSkills" :skills="localizedSkills"
                                                            @updateProfileSkills="updateProfileSkills"/>
                            <v-flex xs12 my-5>
                                <v-btn flat @click="wizardStep = 1">{{ $t('shared.content.back-button') }}</v-btn>
                                <v-btn color="primary" @click="wizardStep = 3" :disabled="!isWizardStepValid()">
                                    {{ $t('shared.content.next-button') }}
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step :complete="wizardStep > 3" step="3">{{ $t('pages.create-profile.steps.portfolio.title') }}</v-stepper-step>
                    
                    <v-stepper-content step="3" class="pl-5">
                        <v-layout row wrap>
                            <v-flex xs12 class="pt-5">
                                <span class="field-title">{{ $t('pages.create-profile.steps.portfolio.photo-gallery-title') }}</span>
                                <ProfilePhotoGallery :profilePhotoGallery="profilePhotoGallery"
                                                    @updateProfilePhotoGallery="updateProfilePhotoGallery"/>
                            </v-flex>
                            <v-flex xs12 class="pt-5">
                                <v-layout row wrap class="profile-information-group">
                                    <v-flex xs12>
                                        <span class="field-title">{{ $t('pages.profile.video-gallery-title') }}</span>
                                    </v-flex>
                                    <v-flex xs12>
                                        <ProfileVideoGallery
                                            :videoGallery="profileVideoGallery.videoGallery"
                                            :saveChanges="false"
                                            @initiateProfileSectionEditSession="initiateProfileSectionEditSession"
                                            @endProfileSectionEditSession="endProfileSectionEditSession"
                                            @updateVideoGallery="updateProfileVideoGallery" />
                                    </v-flex>
                                </v-layout>
                            </v-flex>

                            <v-flex xs12 my-5>
                                <v-btn flat @click="wizardStep = 2">{{ $t('shared.content.back-button') }}</v-btn>
                                <v-btn color="primary" @click="wizardStep = 4" :disabled="!isWizardStepValid()">
                                    {{ $t('shared.content.next-button') }}
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step :complete="wizardStep > 4" step="4">{{ $t('pages.create-profile.steps.awards.title') }}</v-stepper-step>

                    <v-stepper-content step="4" class="pl-5">
                        <v-layout row wrap>

                            <ProfileAwards
                                :awards="profileAwards.awards"
                                :isTimeline="false"
                                :saveChanges="false"
                                @initiateProfileSectionEditSession="initiateProfileSectionEditSession"
                                @endProfileSectionEditSession="endProfileSectionEditSession"
                                @updateAwards="updateProfileAwards" />

                            <v-flex xs12 my-5>
                                <v-btn flat @click="wizardStep = 3">{{ $t('shared.content.back-button') }}</v-btn>
                                <v-btn color="primary" @click="wizardStep = 5" :disabled="!isWizardStepValid()">
                                    {{ $t('shared.content.next-button') }}
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step :complete="wizardStep > 5" step="5">{{ $t('pages.create-profile.steps.experience.title') }}</v-stepper-step>

                    <v-stepper-content step="5" class="pl-5">
                        <v-layout row wrap>

                            <ProfileExperience
                                :experienceSteps="profileExperience.experienceSteps"
                                :isTimeline="false"
                                :saveChanges="false"
                                @initiateProfileSectionEditSession="initiateProfileSectionEditSession"
                                @endProfileSectionEditSession="endProfileSectionEditSession"
                                @updateExperience="updateProfileExperience" />

                            <v-flex xs12 my-5>
                                <v-btn flat @click="wizardStep = 4">{{ $t('shared.content.back-button') }}</v-btn>
                                <v-btn color="primary" @click="wizardStep = 6" :disabled="!isWizardStepValid()">
                                    {{ $t('shared.content.next-button') }}
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step :complete="wizardStep > 6" step="6">{{ $t('pages.create-profile.steps.education.title') }}</v-stepper-step>

                    <v-stepper-content step="6" class="pl-5">
                        <v-layout row wrap>

                            <ProfileEducation
                                :educationSteps="profileEducation.educationSteps"
                                :isTimeline="false"
                                :saveChanges="false"
                                @initiateProfileSectionEditSession="initiateProfileSectionEditSession"
                                @endProfileSectionEditSession="endProfileSectionEditSession"
                                @updateEducation="updateProfileEducation" />

                            <v-flex xs12 my-5>
                                <v-btn flat @click="wizardStep = 5">{{ $t('shared.content.back-button') }}</v-btn>
                                <v-btn color="primary" @click="wizardStep = 7" :disabled="!isWizardStepValid()">
                                    {{ $t('shared.content.next-button') }}
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step step="7">{{ $t('pages.create-profile.steps.settings.title') }}</v-stepper-step>

                    <v-stepper-content step="7" class="pl-5">
                        <v-layout row wrap>

                            <ProfilePrivacy :profilePrivacy="profilePrivacy"
                                                @updateProfilePrivacy="updateProfilePrivacy"/>
                                            
                            <ProfileLocaleSetting :localeSetting="localeSetting"
                                                            @updateLocaleSetting="updateLocaleSetting" />

                            <v-flex xs12 my-5>
                                <v-btn flat @click="wizardStep = 6">{{ $t('shared.content.back-button') }}</v-btn>
                                <v-btn color="primary" @click="createProfile" :disabled="!isWizardStepValid()">
                                    {{ $t('shared.content.finish-button') }}
                                </v-btn>
                            </v-flex>
                            <v-flex v-if="users.createProfileErrors">
                                <ServerSideErrors :errors="users.createProfileErrors"/>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content> 
                </v-stepper>
            </v-flex>
        </v-layout>
        <v-layout row wrap mt-5 pa-5 v-if="!isCreatingProfile && isCreatedProfile" class="create-account-success">
            <v-flex text-xs-center>
                <h1 mb-3>{{ $t('pages.create-profile.profile-created-title') }}</h1>
            </v-flex>
            <v-flex xs12 mt-5>
                <p>
                    {{ $t('pages.create-profile.profile-created-message') }}
                </p> 
            </v-flex>
            <v-flex xs12 mt-5 text-xs-center>
                <nuxt-link to="/projects" class="done-button-link">
                    <v-btn color="primary" dark large>{{ $t('pages.create-profile.profile-created-button') }}</v-btn>
                </nuxt-link>
            </v-flex>
        </v-layout>
    </v-container>
  </section>
</template>


<script>
import ProfileGeneralInformation from '~/components/profile/profile-general-information.vue';
import ProfileSkills from '~/components/profile/profile-skills.vue';
import ProfilePhotoGallery from '~/components/profile/profile-photo-gallery.vue';
import ProfileVideoGallery from '~/components/profile/profile-video-gallery.vue';
import ProfileAwards from '~/components/profile/profile-awards.vue';
import ProfileExperience from '~/components/profile/profile-experience.vue';
import ProfileEducation from '~/components/profile/profile-education.vue';
import ProfilePrivacy from '~/components/profile/profile-privacy.vue';
import ProfileLocaleSetting from '~/components/profile/profile-locale-setting.vue';
import ServerSideErrors from '~/components/errors/server-side-errors.vue';
import { SocialMediaManager, Helpers, HtmlHelpers, Validators } from '~/utils';
import { ProfileSectionType, SocialMediaCategoryType } from '~/store/entities';
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    ProfileGeneralInformation,
    ProfileSkills,
    ProfilePhotoGallery,
    ProfileVideoGallery,
    ProfileAwards,
    ProfileExperience,
    ProfileEducation,
    ProfilePrivacy,
    ProfileLocaleSetting,
    ServerSideErrors
  },
  layout: 'user',
  data: () => ({
    isCreatingProfile: false,
    isCreatedProfile: false,
    wizardStep: 1,
    profileGeneralInformation: {
        profileImage: {},
        birthDate: new Date(new Date().getFullYear() - 30, new Date().getMonth(), new Date().getDate()).toISOString().substr(0, 10),
        phoneNumber: '',
        description: '',
        website: '',
        instagramLink: '',
        youtubeLink: '',
        facebookLink: '',
        linkedinLink: ''
    },
    profileSkills: {
        selectedSkills: []
    },
    profilePhotoGallery: {
        photoGallery: []
    },
    profileVideoGallery: {
        videoGallery: []
    },
    profileAwards: {
        awards: []
    },
    profileExperience: {
        experienceSteps: []
    },
    profileEducation: {
        educationSteps: []
    },
    profilePrivacy: {
        profileVisibility: 0,
        emailVisibility: 0,
        birthDateVisibility: 0,
        phoneNumberVisibility: 0
    },
    localeSetting: '',
    isEditingVideoGallery: false,
    isEditingAwards: false,
    isEditingExperience: false,
    isEditingEducation: false
  }),
  asyncData ({ store, query }) {
      return {
          localeSetting: store.state.locale
      };
  },
  async fetch ({ error, store, query }) {
    var isAuthenticated             = store.getters['authentication/isAuthenticated'];
    var isRegistered                = store.getters['users/isRegistered'];
    var isConfirmed                 = store.getters['users/isConfirmed'];
    var isEnabled                   = store.getters['users/isEnabled'];
    var isAdmin                     = store.getters['users/isAdmin'];
    var hasFinishRegistrationQuery  = query && query.email && query.registrationID;

    if (isEnabled || isAdmin) {
        return error({ statusCode: 404 });
    }

    if (!isAuthenticated && !hasFinishRegistrationQuery) {
        return error({ statusCode: 404 });
    }

    if (isAuthenticated && !isRegistered && !isConfirmed) {
        return error({ statusCode: 404 });
    }

    if (isAuthenticated && isRegistered && !hasFinishRegistrationQuery) {
        return error({ statusCode: 404 });
    }

    if (hasFinishRegistrationQuery && (!isAuthenticated || isRegistered)) {
        await store.dispatch('users/finishRegistration', {
            Email: query.email,
            RegistrationID: query.registrationID
        }).then(() => {
            if (!store.state.users.isFinishRegistrationSuccessful) {
                return error({ statusCode: 404 });
            }
        });
    }
  },
  methods: {
    isWizardStepValid: function () {
      switch (this.wizardStep) {
        case 1:
            return this.profileGeneralInformation.phoneNumber && Validators.isValidBirthDate(this.profileGeneralInformation.birthDate) &&
                        Validators.isValidPhoneNumber(this.profileGeneralInformation.phoneNumber) &&
                        (!this.profileGeneralInformation.website || Validators.isValidURL(this.profileGeneralInformation.website)) &&
                        (!this.profileGeneralInformation.description || this.profileGeneralInformation.description.length <= 500) &&
                        this.areAllSocialMediaLinksValid();
        case 2:
            return this.profileSkills.selectedSkills.length !== 0;
        case 3:
            return this.areAllVideosValid();
        case 4:
            return this.areAllAwardsValid();
        case 5:
            return this.areAllExperienceStepsValid();
        case 6:
            return this.areAllEducationStepsValid();
        default:
            return true;
      }
    },
    areAllSocialMediaLinksValid: function () {
        if (this.profileGeneralInformation.instagramLink &&
                !SocialMediaManager.isValidURL(this.profileGeneralInformation.instagramLink, SocialMediaCategoryType.Instagram)) {
            return false;
        }

        if (this.profileGeneralInformation.youtubeLink &&
                !SocialMediaManager.isValidURL(this.profileGeneralInformation.youtubeLink, SocialMediaCategoryType.Youtube)) {
            return false;
        }

        if (this.profileGeneralInformation.facebookLink &&
                !SocialMediaManager.isValidURL(this.profileGeneralInformation.facebookLink, SocialMediaCategoryType.Facebook)) {
            return false;
        }

        if (this.profileGeneralInformation.linkedinLink &&
                !SocialMediaManager.isValidURL(this.profileGeneralInformation.linkedinLink, SocialMediaCategoryType.Linkedin)) {
            return false;
        }

        return true;
    },
    isAwardValid: function (award) {
        return award.title !== '' && award.issuer !== '';
    },
    isExperienceStepValid: function (experienceStep) {
        return experienceStep.position !== '' && experienceStep.employerName !== '';
    },
    isEducationStepValid: function (educationStep) {
        return educationStep.title !== '' && educationStep.institutionName !== '';
    },
    areAllVideosValid: function () {
        var index = 0;

        while (index < this.profileVideoGallery.videoGallery.length) {
            var video   = this.profileVideoGallery.videoGallery[index];
            var isValid = SocialMediaManager.isVideoValid(video.link) && !video.inEditMode;

            if (!isValid) {
                return false;
            }

            index++;
        }

        return true;
    },
    areAllAwardsValid: function () {
        var index   = 0;

        while (index < this.profileAwards.awards.length) {
            var award    = this.profileAwards.awards[index];
            var isValid  = this.isAwardValid(award) && !award.inEditMode;

            if (!isValid) {
                return false;
            }

            index++;
        }

        return true;
    },
    areAllExperienceStepsValid: function () {
        var index = 0;

        while (index < this.profileExperience.experienceSteps.length) {
            var experienceStep = this.profileExperience.experienceSteps[index];
            var isValid        = this.isExperienceStepValid(experienceStep) && !experienceStep.inEditMode;

            if (!isValid) {
                return false;
            }

            index++;
        }

        return true;
    },
    areAllEducationStepsValid: function () {
        var index = 0;

        while (index < this.profileEducation.educationSteps.length) {
            var educationStep = this.profileEducation.educationSteps[index];
            var isValid       = this.isEducationStepValid(educationStep) && !educationStep.inEditMode;

            if (!isValid) {
                return false;
            }

            index++;
        }

        return true;
    },
    async createProfile () {
        var createProfileFormData = new FormData();

        var profileImage    = this.profileGeneralInformation.profileImage.File;
        var birthDate       = this.profileGeneralInformation.birthDate;
        var phoneNumber     = this.profileGeneralInformation.phoneNumber;
        var description     = this.profileGeneralInformation.description;
        var website         = this.profileGeneralInformation.website ? this.profileGeneralInformation.website : '';
        var instagramLink   = this.profileGeneralInformation.instagramLink ? this.profileGeneralInformation.instagramLink : '';
        var youtubeLink     = this.profileGeneralInformation.youtubeLink ? this.profileGeneralInformation.youtubeLink : '';
        var facebookLink    = this.profileGeneralInformation.facebookLink ? this.profileGeneralInformation.facebookLink : '';
        var linkedinLink    = this.profileGeneralInformation.linkedinLink ? this.profileGeneralInformation.linkedinLink : '';
        var skills          = this.profileSkills.selectedSkills.map(s => s.ID);
        var photoGallery    = this.profilePhotoGallery.photoGallery.map(p => p.File);
        var videoGallery    = JSON.stringify(this.profileVideoGallery.videoGallery.map(v => { return { Video: v.link }; }));
        var awards          = JSON.stringify(this.profileAwards.awards.slice(0, this.profileAwards.awards.length).map(a => {
                                return {
                                    Title: a.title,
                                    Issuer: a.issuer,
                                    Description: a.description,
                                    Date: a.date
                                };
                            }));
        var experience      = JSON.stringify(this.profileExperience.experienceSteps.slice(0, this.profileExperience.experienceSteps.length).map(e => {
                                return {
                                    Position: e.position,
                                    Employer: e.employerName,
                                    Description: e.description,
                                    StartDate: e.startDate,
                                    EndDate: e.endDate
                                };
                            }));
        var education       = JSON.stringify(this.profileEducation.educationSteps.slice(0, this.profileEducation.educationSteps.length).map(e => {
                                return {
                                    Title: e.title,
                                    Institution: e.institutionName,
                                    Description: e.description,
                                    StartDate: e.startDate,
                                    EndDate: e.endDate
                                };
                            }));

        var profileVisibility       = this.profilePrivacy.profileVisibility;
        var emailVisibility         = this.profilePrivacy.emailVisibility;
        var birthDateVisibility     = this.profilePrivacy.birthDateVisibility;
        var phoneNumberVisibility   = this.profilePrivacy.phoneNumberVisibility;
        var locale                  = this.localeSetting;

        createProfileFormData.append('ProfileImage', profileImage);
        createProfileFormData.append('BirthDate', birthDate);
        createProfileFormData.append('PhoneNumber', phoneNumber);
        createProfileFormData.append('Description', description);
        createProfileFormData.append('Website', website);
        createProfileFormData.append('InstagramLink', instagramLink);
        createProfileFormData.append('YoutubeLink', youtubeLink);
        createProfileFormData.append('FacebookLink', facebookLink);
        createProfileFormData.append('LinkedinLink', linkedinLink);
        createProfileFormData.append('Skills', skills);
        photoGallery.forEach(p => createProfileFormData.append('AddedPhotos', p));
        createProfileFormData.append('VideoGallery', videoGallery);
        createProfileFormData.append('Awards', awards);
        createProfileFormData.append('Experience', experience);
        createProfileFormData.append('Education', education);
        createProfileFormData.append('ProfileVisibility', profileVisibility);
        createProfileFormData.append('EmailVisibility', emailVisibility);
        createProfileFormData.append('BirthDateVisibility', birthDateVisibility);
        createProfileFormData.append('PhoneNumberVisibility', phoneNumberVisibility);
        createProfileFormData.append('Locale', locale);

        await this.$store.dispatch('users/createProfile', createProfileFormData)
        .then(() => {
            if (!this.users.createProfileErrors) {
                this.$store.dispatch('users/enableMe');
                this.isCreatingProfile = false;
                this.isCreatedProfile = true;
            }
        });
    },
    updateProfileGeneralInformation: function (model) {
        this.profileGeneralInformation = Helpers.cloneObject(model);
    },
    updateProfileSkills: function (model) {
        this.profileSkills = Helpers.cloneObject(model);
    },
    updateProfilePhotoGallery: function (model) {
        this.profilePhotoGallery = Helpers.cloneObject(model);
    },
    updateProfileVideoGallery: function (editedVideoGallery) {
        this.profileVideoGallery.videoGallery = [...editedVideoGallery];
    },
    updateProfileAwards: function (editedAwards) {
        this.profileAwards.awards = [...editedAwards];
    },
    updateProfileExperience: function (editedExperience) {
        this.profileExperience.experienceSteps = [...editedExperience];
    },
    updateProfileEducation: function (editedEducation) {
        this.profileEducation.educationSteps = [...editedEducation];
    },
    updateProfilePrivacy: function (model) {
        this.profilePrivacy = Helpers.cloneObject(model);
    },
    updateLocaleSetting: function (model) {
        this.localeSetting = model;
    },
    initiateProfileSectionEditSession (navigateToElement, profileSection) {
        this.$store.dispatch('users/initiateProfileSectionEditSession');

        if (profileSection === ProfileSectionType.VideoGallery) {
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
                var element = document.getElementsByClassName('edited-profile-section')[0];

                if (!HtmlHelpers.isVerticallyFullyInViewport(element)) {
                    HtmlHelpers.scrollToElement(element);
                }
            }, 0);
        }
    },
    endProfileSectionEditSession (profileSection) {
        if (profileSection === ProfileSectionType.VideoGallery) {
            this.isEditingVideoGallery = false;
        } else if (profileSection === ProfileSectionType.Awards) {
            this.isEditingAwards = false;
        } else if (profileSection === ProfileSectionType.Experience) {
            this.isEditingExperience = false;
        } else if (profileSection === ProfileSectionType.Education) {
            this.isEditingEducation = false;
        }

        this.$store.dispatch('users/endProfileSectionEditSession');
    }
  },
  computed: {
    ...mapState([ 'applicationData', 'users' ]),
    ...mapGetters({
        skills: 'applicationData/skills',
        locale: 'locale'
    }),
    localizedSkills: function () {
        return this.skills.map(s => {
            return {
                ...s,
                Name: this.$t(`application-data.${s.Name}`)
            };
        }).sort((s1, s2) => s1.Name > s2.Name ? -1 : 1);
    }
  },
  mounted () {
      this.endProfileSectionEditSession();
  }
}
</script>

<style lang="scss">

    .create-profile-section {

        .create-account-success {
            font-size: 20px;
        }

        .v-stepper, .v-stepper__header {
            box-shadow: none;
            -webkit-box-shadow: none;
        }
    }

    .done-button-link {
        text-decoration: none;
    }

</style>
