<template>
  <section class="create-profile-section">
    <v-container id="create-profile-container" class="main-container pa-1">
        <v-layout row wrap mt-5 pa-5 v-if="!isCreatingProfile" class="create-account-success">
            <v-flex text-xs-center>
                <h1 mb-3>Account created</h1>
            </v-flex>
            <v-flex xs12 mt-5>
                <p>
                    Your account has been created. Please take the time to complete your profile before starting to use the app.
                </p> 
            </v-flex>
            <v-flex xs12 mt-5 text-xs-center>
                <v-btn color="primary" dark large @click="isCreatingProfile = true">CREATE PROFILE</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="isCreatingProfile" class="create-profile-main-layout">
            <v-flex xs12 align-end flexbox pt-5>
                <v-stepper v-model="wizardStep" vertical>

                    <v-stepper-step :complete="wizardStep > 1" step="1">General</v-stepper-step>

                    <v-stepper-content step="1" class="pl-5">
                        <v-layout row wrap>
                            <ProfileGeneralInformation :profileGeneralInformation="profileGeneralInformation"
                                                @updateProfileGeneralInformation="updateProfileGeneralInformation"/>
                            <v-flex xs12 my-5>
                                <v-btn color="primary" @click="wizardStep = 2" :disabled="!isWizardStepValid()">Next</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step :complete="wizardStep > 2" step="2">Skills</v-stepper-step>

                    <v-stepper-content step="2" class="pl-5">
                        <v-layout row wrap class="pl-2 pb-5">
                            <ProfileSkills :profileSkills="profileSkills"
                                                @updateProfileSkills="updateProfileSkills"/>
                            <v-flex xs12 my-5>
                                <v-btn flat @click="wizardStep = 1">Back</v-btn>
                                <v-btn color="primary" @click="wizardStep = 3" :disabled="!isWizardStepValid()">Next</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step :complete="wizardStep > 3" step="3">Portfolio</v-stepper-step>
                    
                    <v-stepper-content step="3" class="pl-5">
                        <v-layout row wrap>
                            <v-flex xs12>
                                <ProfilePhotoGallery :profilePhotoGallery="profilePhotoGallery"
                                                    @updateProfilePhotoGallery="updateProfilePhotoGallery"/>
                            </v-flex>
                            <v-flex xs12>
                                <ProfileVideoGallery :profileVideoGallery="profileVideoGallery"
                                                    @updateProfileVideoGallery="updateProfileVideoGallery"/>
                            </v-flex>

                            <v-flex xs12 my-5>
                                <v-btn flat @click="wizardStep = 2">Back</v-btn>
                                <v-btn color="primary" @click="wizardStep = 4" :disabled="!isWizardStepValid()">Next</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step :complete="wizardStep > 4" step="4">Awards</v-stepper-step>

                    <v-stepper-content step="4" class="pl-5">
                        <v-layout row wrap>

                            <ProfileAwards :profileAwards="profileAwards"
                                                @updateProfileAwards="updateProfileAwards"/>

                            <v-flex xs12 my-5>
                                <v-btn flat @click="wizardStep = 3">Back</v-btn>
                                <v-btn color="primary" @click="wizardStep = 5" :disabled="!isWizardStepValid()">Next</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step :complete="wizardStep > 5" step="5">Experience</v-stepper-step>

                    <v-stepper-content step="5" class="pl-5">
                        <v-layout row wrap>

                            <ProfileExperience :profileExperience="profileExperience"
                                                @updateProfileExperience="updateProfileExperience"/>

                            <v-flex xs12 my-5>
                                <v-btn flat @click="wizardStep = 4">Back</v-btn>
                                <v-btn color="primary" @click="wizardStep = 6" :disabled="!isWizardStepValid()">Next</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step :complete="wizardStep > 6" step="6">Education</v-stepper-step>

                    <v-stepper-content step="6" class="pl-5">
                        <v-layout row wrap>

                            <ProfileEducation :profileEducation="profileEducation"
                                                @updateProfileEducation="updateProfileEducation"/>

                            <v-flex xs12 my-5>
                                <v-btn flat @click="wizardStep = 5">Back</v-btn>
                                <v-btn color="primary" @click="wizardStep = 7" :disabled="!isWizardStepValid()">Next</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step step="7">Settings</v-stepper-step>

                    <v-stepper-content step="7" class="pl-5">
                        <v-layout row wrap>

                            <ProfilePrivacy :profilePrivacy="profilePrivacy"
                                                @updateProfilePrivacy="updateProfilePrivacy"/>

                            <v-flex xs12 my-5>
                                <v-btn flat @click="wizardStep = 6">Back</v-btn>
                                <v-btn color="primary" @click="createProfile" :disabled="!isWizardStepValid()">Finish</v-btn>
                            </v-flex>
                            <v-flex v-if="users.createProfileErrors">
                                <ServerSideErrors :errors="users.createProfileErrors"/>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content> 
                </v-stepper>
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
import ServerSideErrors from '~/components/errors/server-side-errors.vue';
import { SocialMediaManager, Helpers, Validators } from '~/utils';
import { SocialMediaCategoryType } from '~/store/entities';
import { mapState } from 'vuex';

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
    ServerSideErrors
  },
  data: () => ({
    isCreatingProfile: false,
    wizardStep: 1,
    profileGeneralInformation: {
        profileImage: '',
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
        videoGallery: [{
            link: '',
            embedLink: '',
            isValid: false
        }]
    },
    profileAwards: {
        awards: [
            {
                title: '',
                issuer: '',
                description: '',
                date: new Date().toISOString().substr(0, 7),
                isValid: false,
                isAwardDateMenuOpen: false
            }
        ]
    },
    profileExperience: {
        experienceSteps: [
            {
                position: '',
                employerName: '',
                description: '',
                startDate: new Date().toISOString().substr(0, 7),
                endDate: new Date().toISOString().substr(0, 7),
                isValid: false,
                isStartDateMenuOpen: false,
                isEndDateMenuOpen: false
            }
        ]
    },
    profileEducation: {
        educationSteps: [
            {
                title: '',
                institutionName: '',
                description: '',
                startDate: new Date().toISOString().substr(0, 7),
                endDate: new Date().toISOString().substr(0, 7),
                isValid: false,
                isStartDateMenuOpen: false,
                isEndDateMenuOpen: false
            }
        ]
    },
    profilePrivacy: {
        profileVisibility: 0,
        emailVisibility: 0,
        birthDateVisibility: 0,
        phoneNumberVisibility: 0
    }
  }),
  async fetch ({ error, store, query }) {
    var isAuthenticated             = store.getters['authentication/isAuthenticated'];
    var hasFinishRegistrationQuery  = query && query.email && query.registrationID;

    if (!isAuthenticated && !hasFinishRegistrationQuery) {
        return error({ statusCode: 404 });
    }

    await store.dispatch('users/finishRegistration', {
        Email: query.email,
        RegistrationID: query.registrationID
    }).then(() => {
        if (!store.state.users.isFinishRegistrationSuccessful) {
            return error({ statusCode: 404 });
        }
    });
  },
  methods: {
    isWizardStepValid: function () {
      switch (this.wizardStep) {
        case 1:
          return this.profileGeneralInformation.phoneNumber &&
                        Validators.isValidPhoneNumber(this.profileGeneralInformation.phoneNumber) &&
                        (!this.profileGeneralInformation.website || Validators.isValidURL(this.profileGeneralInformation.website)) &&
                        (!this.profileGeneralInformation.description || this.profileGeneralInformation.description.length <= 500) &&
                        this.areAllSocialMediaLinksValid();
        case 2:
          return this.profileSkills.selectedSkills.length !== 0;
        case 3:
          var isStepValid = true;

          for (var index = 0; index < this.profileVideoGallery.videoGallery.length; index++) {
            if (this.profileVideoGallery.videoGallery[index].link !== '') {
              isStepValid = isStepValid && SocialMediaManager.isVideoValid(this.profileVideoGallery.videoGallery[index].link);
            }
          }

          return isStepValid;
        case 4:
          return this.areAllEducationStepsValid();
        default:
          return this.areAllAwardsValid();
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
    areAllEducationStepsValid: function () {
        var isValid = true;
        var index   = 0;

        while (index < this.profileEducation.educationSteps.length && isValid) {
            if (this.profileEducation.educationSteps[index].title !== '' || this.profileEducation.educationSteps[index].institutionName !== '') {
                isValid = isValid && this.isEducationStepValid(this.profileEducation.educationSteps[index]);
            }

            index++;
        }

        return isValid;
    },
    areAllAwardsValid: function () {
        var isValid = true;
        var index   = 0;

        while (index < this.profileAwards.awards.length && isValid) {
            if (this.profileAwards.awards[index].title !== '' || this.profileAwards.awards[index].issuer !== '') {
                isValid = isValid && this.isAwardValid(this.profileAwards.awards[index]);
            }
            index++;
        }

        return isValid;
    },
    async createProfile () {
        await this.$store.dispatch('users/createProfile', {
            ProfileImage: {
                Image: this.profileGeneralInformation.profileImage
            },
            BirthDate: this.profileGeneralInformation.birthDate,
            PhoneNumber: this.profileGeneralInformation.phoneNumber,
            Description: this.profileGeneralInformation.description,
            Website: this.profileGeneralInformation.website ? this.profileGeneralInformation.website : null,
            InstagramLink: this.profileGeneralInformation.instagramLink ? this.profileGeneralInformation.instagramLink : null,
            YoutubeLink: this.profileGeneralInformation.youtubeLink ? this.profileGeneralInformation.youtubeLink : null,
            FacebookLink: this.profileGeneralInformation.facebookLink ? this.profileGeneralInformation.facebookLink : null,
            LinkedinLink: this.profileGeneralInformation.linkedinLink ? this.profileGeneralInformation.linkedinLink : null,
            Skills: this.profileSkills.selectedSkills,
            PhotoGallery: this.profilePhotoGallery.photoGallery,
            VideoGallery: this.profileVideoGallery.videoGallery.filter(v => v.isValid).map(v => {
                return { Video: v.link };
            }),
            Awards: this.profileAwards.awards.slice(0, this.profileAwards.awards.length - 2).map(a => {
                return {
                    Title: a.title,
                    Issuer: a.issuer,
                    Description: a.description,
                    Date: a.date
                };
            }),
            Experience: this.profileExperience.experienceSteps.slice(0, this.profileExperience.experienceSteps.length - 2).map(e => {
                return {
                    Position: e.position,
                    Employer: e.employerName,
                    Description: e.description,
                    StartDate: e.startDate,
                    EndDate: e.endDate
                };
            }),
            Education: this.profileEducation.educationSteps.slice(0, this.profileEducation.educationSteps.length - 2).map(e => {
                return {
                    Title: e.title,
                    Institution: e.institutionName,
                    Description: e.description,
                    StartDate: e.startDate,
                    EndDate: e.endDate
                };
            }),
            ProfileVisibility: this.profilePrivacy.profileVisibility,
            EmailVisibility: this.profilePrivacy.emailVisibility,
            BirthDateVisibility: this.profilePrivacy.birthDateVisibility,
            PhoneNumberVisibility: this.profilePrivacy.phoneNumberVisibility

        }).then(() => {
            if (!this.users.createProfileErrors) {
                this.$router.replace({ path: 'projects' });
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
    updateProfileVideoGallery: function (model) {
        this.profileVideoGallery = Helpers.cloneObject(model);
    },
    updateProfileAwards: function (model) {
        this.profileAwards = Helpers.cloneObject(model);
    },
    updateProfileExperience: function (model) {
        this.profileExperience = Helpers.cloneObject(model);
    },
    updateProfileEducation: function (model) {
        this.profileEducation = Helpers.cloneObject(model);
    },
    updateProfilePrivacy: function (model) {
        this.profilePrivacy = Helpers.cloneObject(model);
    }
  },
  computed: {
    ...mapState(['users'])
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

</style>
