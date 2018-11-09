<template>
  <section class="create-profile-section">
    <v-container id="create-profile-container" class="main-container pa-5">
        <v-layout row wrap>
            <v-flex xs12 align-end flexbox>
                <v-stepper v-model="wizardStep">
                    <v-stepper-header>
                    <v-stepper-step :complete="wizardStep > 1" step="1">General</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="wizardStep > 2" step="2">Skills</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="wizardStep > 3" step="3">Portfolio</v-stepper-step>
                    
                    <v-divider></v-divider>

                    <v-stepper-step :complete="wizardStep > 4" step="4">Education</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="5">Awards</v-stepper-step>
                    
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-layout row wrap>
                                <v-layout row>
                                    <v-flex xs6 mb-3>
                                        <dropzone id="profile-picture-dropzone" ref="profilePictureDropzone"
                                            :options="profilePictureDropzoneOptions" :destroyDropzone="true" :duplicateCheck="true"
                                            width="200px" height="80px">
                                            <div class="dz-message" data-dz-message><span>Click or drop profile image here</span></div>
                                        </dropzone>
                                    </v-flex>
                                    <v-flex xs6 mb-3>
                                        <v-flex xs12>
                                            <v-menu :close-on-content-click="false" v-model="isBirthDateMenuOpen" :nudge-right="40"
                                                lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                                <v-text-field slot="activator" v-model="birthDate" label="Date of birth" prepend-icon="event" readonly>
                                                </v-text-field>
                                                <v-date-picker v-model="birthDate" @input="isBirthDateMenuOpen = false">
                                                </v-date-picker>
                                            </v-menu>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field v-model="phoneNumber"    :rules="phoneNumberRules" label="Phone Number*" required></v-text-field>
                                        </v-flex>
                                    </v-flex>
                                </v-layout>
                                <v-flex xs12>
                                    <v-textarea
                                        id="profile-description-field text-area-field"
                                        v-model="description"
                                        auto-grow
                                        box
                                        label="Description"
                                        rows="1"
                                        counter=500>
                                    </v-textarea>
                                </v-flex>
                                <v-flex xs6 class="mb-3 pr-2">
                                    <v-text-field v-model="instagramLink"       :rules="instagramLinkRules"     label="Instagram"></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="mb-3 pl-2">
                                    <v-text-field v-model="youtubeLink"         :rules="youtubeLinkRules"       label="Youtube"></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="mb-3 pr-2">
                                    <v-text-field v-model="facebookLink"        :rules="facebookLinkRules"     label="Facebook"></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="mb-3 pl-2">
                                    <v-text-field v-model="linkedinLink"        :rules="linkedinLinkRules"     label="Linkedin"></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field v-model="website"        :rules="websiteRules"     label="Website"></v-text-field>
                                </v-flex>
                                <v-layout row wrap class="section-visibility-row mt-4">
                                    <span class="field-title">General information visibility:</span>
                                    <v-radio-group v-model="generalStepVisibility" row class="ml-3 mt-0 pt-0">
                                        <v-radio :key="1" :value="1" :label="`Everyone`"></v-radio>
                                        <v-radio :key="2" :value="2" :label="`Logged users`"></v-radio>
                                        <v-radio :key="3" :value="3" :label="`Only me`"></v-radio>
                                    </v-radio-group>
                                </v-layout>
                                <v-flex xs12 mt-5>
                                    <v-btn color="primary" @click="wizardStep = 2" :disabled="!isWizardStepValid()">Next</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-layout row wrap>
                                <v-flex xs12 id="skills-autocomplete-wrapper">
                                    <v-autocomplete
                                        v-model="selectedSkills"
                                        :items="skills"
                                        chips
                                        multiple
                                        persistent-hint
                                        label="Your professional skills"
                                        hint="Select at least one skill"
                                        no-data-text="No results"
                                        color="deep-purple lighten-2"
                                        background-color="transparent">
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex xs12 mt-3>
                                    <v-chip close :key="i" v-for="(skill, i) in selectedSkills" @input="removeSkill(skill)">{{skill}}</v-chip>
                                </v-flex>
                                <v-layout row wrap class="section-visibility-row mt-4">
                                    <span class="field-title">Skills visibility:</span>
                                    <v-radio-group v-model="skillsStepVisibility" row class="ml-3 mt-0 pt-0">
                                        <v-radio :key="1" :value="1" :label="`Everyone`"></v-radio>
                                        <v-radio :key="2" :value="2" :label="`Logged users`"></v-radio>
                                        <v-radio :key="3" :value="3" :label="`Only me`"></v-radio>
                                    </v-radio-group>
                                </v-layout>

                                <v-flex xs12 mt-5>
                                    <v-btn flat @click="wizardStep = 1">Back</v-btn>
                                    <v-btn color="primary" @click="wizardStep = 3" :disabled="!isWizardStepValid()">Next</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <v-layout row wrap>
                                <v-flex xs12 mb-3>
                                    <span class="field-title">Photo gallery</span>
                                    <dropzone id="photo-gallery-dropzone" ref="photoGalleryDropzone"
                                        :options="photoGalleryDropzoneOptions" :destroyDropzone="true" :duplicateCheck="true"
                                        width="200px" height="80px">
                                        <div class="dz-message" data-dz-message><span>Click or drop files here</span></div>
                                    </dropzone>
                                </v-flex>

                                <v-flex xs12 mt-5>
                                    <span class="field-title">Video gallery</span>
                                    <v-flex xs12 :key="i" v-for="(video, i) in videoGallery">
                                        <v-text-field v-model="video.link" :rules="videoLinkRules" label="Video link*" v-on:change="onVideoLinkChange(video)" required></v-text-field>
                                        <iframe v-if="video.isValid" :src="video.embedLink" width="420" height="315" allowfullscreen></iframe>
                                    </v-flex>
                                </v-flex>
                                <v-flex xs12>
                                    <v-btn v-on:click="onAddVideoClick" :disabled="isAddVideoButtonDisabled()" block class="add-video-button">
                                        Add video link
                                    </v-btn>
                                </v-flex>
                                <v-layout row wrap class="section-visibility-row mt-4">
                                    <span class="field-title">Portfolio visibility:</span>
                                    <v-radio-group v-model="portfolioStepVisibility" row class="ml-3 mt-0 pt-0">
                                        <v-radio :key="1" :value="1" :label="`Everyone`"></v-radio>
                                        <v-radio :key="2" :value="2" :label="`Logged users`"></v-radio>
                                        <v-radio :key="3" :value="3" :label="`Only me`"></v-radio>
                                    </v-radio-group>
                                </v-layout>

                                <v-flex xs12 mt-5>
                                    <v-btn flat @click="wizardStep = 2">Back</v-btn>
                                    <v-btn color="primary" @click="wizardStep = 4" :disabled="!isWizardStepValid()">Next</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-stepper-content>

                        <v-stepper-content step="4">
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-flex xs12 :key="i" v-for="(step, i) in educationSteps">
                                        <v-layout row>
                                            <v-flex xs12 sm6 md6 lg3 class="px-2">
                                                <v-text-field v-model="step.title" :rules="educationTitleRules" label="Title*" required></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6 lg3 class="px-2">
                                                <v-text-field v-model="step.institutionName" :rules="institutionNameRules" label="Institution name*" required></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6 lg3 class="px-2">
                                                <v-menu :close-on-content-click="false" v-model="step.isStartDateMenuOpen" :nudge-right="40"
                                                    lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                                    <v-text-field slot="activator" type="month" v-model="step.startDate" label="Start Date" prepend-icon="event" readonly>
                                                    </v-text-field>
                                                    <v-date-picker v-model="step.startDate" type="month" @input="step.isStartDateMenuOpen = false">
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6 lg3 class="px-2">
                                                <v-menu :close-on-content-click="false" v-model="step.isEndDateMenuOpen" :nudge-right="40"
                                                    lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                                    <v-text-field slot="activator" type="month" v-model="step.endDate" label="End Date" prepend-icon="event" readonly>
                                                    </v-text-field>
                                                    <v-date-picker v-model="step.endDate" type="month" @input="step.isEndDateMenuOpen = false">
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row>
                                            <v-textarea
                                                class="education-step-description-field text-area-field"
                                                v-model="step.description"
                                                auto-grow
                                                box
                                                label="Description"
                                                rows="1"
                                                counter=500>
                                            </v-textarea>
                                        </v-layout>
                                    </v-flex>
                                </v-flex>
                                <v-flex xs12>
                                    <v-btn v-on:click="onAddEducationStepClick" :disabled="isEducationStepButtonDisabled()" block class="add-education-step-button">
                                        Add education step
                                    </v-btn>
                                </v-flex>
                                <v-layout row wrap class="section-visibility-row mt-4">
                                    <span class="field-title">Education visibility:</span>
                                    <v-radio-group v-model="educationStepVisibility" row class="ml-3 mt-0 pt-0">
                                        <v-radio :key="1" :value="1" :label="`Everyone`"></v-radio>
                                        <v-radio :key="2" :value="2" :label="`Logged users`"></v-radio>
                                        <v-radio :key="3" :value="3" :label="`Only me`"></v-radio>
                                    </v-radio-group>
                                </v-layout>

                                <v-flex xs12 mt-5>
                                    <v-btn flat @click="wizardStep = 3">Back</v-btn>
                                    <v-btn color="primary" @click="wizardStep = 5" :disabled="!isWizardStepValid()">Next</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-stepper-content>

                        <v-stepper-content step="5">
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-flex xs12 :key="i" v-for="(award, i) in awards">
                                        <v-layout row>
                                            <v-flex xs12 sm5 md5 lg5 class="px-2">
                                                <v-text-field v-model="award.title" :rules="awardTitleRules" label="Award title*" required></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm4 md4 lg4 class="px-2">
                                                <v-text-field v-model="award.issuer" :rules="awardIssuerRules" label="Issuer*" required></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm3 md3 lg3 class="px-2">
                                                <v-menu :close-on-content-click="false" v-model="award.isAwardDateMenuOpen" :nudge-right="40"
                                                    lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                                    <v-text-field slot="activator" type="month" v-model="award.date" label="Date" prepend-icon="event" readonly>
                                                    </v-text-field>
                                                    <v-date-picker v-model="award.date" type="month" @input="award.isAwardDateMenuOpen = false">
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row>
                                            <v-textarea
                                                class="award-description-field text-area-field"
                                                v-model="award.description"
                                                auto-grow
                                                box
                                                label="Description"
                                                rows="1"
                                                counter=500>
                                            </v-textarea>
                                        </v-layout>
                                    </v-flex>
                                </v-flex>
                                <v-flex xs12>
                                    <v-btn v-on:click="onAddAwardClick" :disabled="isAddAwardButtonDisabled()" block class="add-award-button">
                                        Add award
                                    </v-btn>
                                </v-flex>
                                <v-layout row wrap class="section-visibility-row mt-4">
                                    <span class="field-title">Awards visibility:</span>
                                    <v-radio-group v-model="awardsStepVisibility" row class="ml-3 mt-0 pt-0">
                                        <v-radio :key="1" :value="1" :label="`Everyone`"></v-radio>
                                        <v-radio :key="2" :value="2" :label="`Logged users`"></v-radio>
                                        <v-radio :key="3" :value="3" :label="`Only me`"></v-radio>
                                    </v-radio-group>
                                </v-layout>

                                <v-flex xs12 mt-5>
                                    <v-btn flat @click="wizardStep = 4">Back</v-btn>
                                    <v-btn color="primary" @click="createProfile"  :disabled="!isWizardStepValid()">Finish</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-flex>
        </v-layout>
    </v-container>
  </section>
</template>


<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
import { skills } from '~/store/constants/mockdata'
import { SocialMediaManager } from '~/store/constants'
import { SocialMediaCategory } from '~/store/entities'

export default {
  components: {
    Dropzone
  },
  data: () => ({
    wizardStep: 1,
    generalStepVisibility: 1,
    skillsStepVisibility: 1,
    portfolioStepVisibility: 1,
    educationStepVisibility: 1,
    awardsStepVisibility: 1,
    skills: skills.sort(),
    valid: false,
    isBirthDateMenuOpen: false,
    birthDate: new Date(new Date().getFullYear() - 30, new Date().getMonth(), new Date().getDate()).toISOString().substr(0, 10),
    description: '',
    phoneNumber: '',
    phoneNumberRules: [
      v => !!v || 'Phone number is required'
    ],
    website: '',
    websiteRules: [
      v => true
    ],
    selectedSkills: [],
    educationSteps: [{
      title: '',
      institutionName: '',
      description: '',
      startDate: new Date().toISOString().substr(0, 7),
      endDate: new Date().toISOString().substr(0, 7),
      isValid: false,
      isStartDateMenuOpen: false,
      isEndDateMenuOpen: false
    }],
    awards: [
      {
        title: '',
        issuer: '',
        description: '',
        date: new Date().toISOString().substr(0, 7),
        isValid: false,
        isAwardDateMenuOpen: false
      }
    ],
    awardTitleRules: [
      v => !!v || 'Title is required'
    ],
    awardIssuerRules: [
      v => !!v || 'Issuer is required'
    ],
    educationTitleRules: [
      v => !!v || 'Title is required'
    ],
    institutionNameRules: [
      v => !!v || 'Institution name is required'
    ],
    videoLinkRules: [
      v => !v ||
        (!!v && (SocialMediaManager.isValidURL(v, SocialMediaCategory.Youtube) || SocialMediaManager.isValidURL(v, SocialMediaCategory.Vimeo))) ||
        'Video link is invalid'
    ],
    profilePictureDropzoneOptions: {
      url: 'https://httpbin.org/post',
      maxFilesize: 2,
      addRemoveLinks: true,
      acceptedMimeTypes: 'image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon',
      accept: function (file, done) {
        if (file.name === '') {
          done('Invalid file name.')
        } else { done() }
      },
      maxFiles: 1,
      thumbnailWidth: 120,
      thumbnailHeight: 120
    },
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
    videoGallery: [{
      link: '',
      embedLink: '',
      isValid: false
    }],
    instagramLink: '',
    instagramLinkRules: [
      v => v === '' || SocialMediaManager.isValidURL(v, SocialMediaCategory.Instagram) || 'Invalid Instagram link'
    ],
    youtubeLink: '',
    youtubeLinkRules: [
      v => v === '' || SocialMediaManager.isValidURL(v, SocialMediaCategory.Youtube) || 'Invalid Youtube link'
    ],
    facebookLink: '',
    facebookLinkRules: [
      v => v === '' || SocialMediaManager.isValidURL(v, SocialMediaCategory.Facebook) || 'Invalid Facebook link'
    ],
    linkedinLink: '',
    linkedinLinkRules: [
      v => v === '' || SocialMediaManager.isValidURL(v, SocialMediaCategory.Linkedin) || 'Invalid Linkedin link'
    ]
  }),
  asyncData: (context) => {
    return { project: 'nuxt' }
  },
  methods: {
    isWizardStepValid: function () {
      switch (this.wizardStep) {
        case 1:
          return this.phoneNumber !== ''
        case 2:
          return this.selectedSkills.length !== 0
        case 3:
          var isStepValid = true

          for (var index = 0; index < this.videoGallery.length; index++) {
            if (this.videoGallery[index].link !== '') {
              isStepValid = isStepValid && this.isVideoValid(this.videoGallery[index].link)
            }
          }

          return isStepValid
        case 4:
          return this.areAllEducationStepsValid()
        default:
          return this.areAllAwardsValid()
      }
    },
    isEducationStepValid: function (educationStep) {
      return educationStep.title !== '' && educationStep.institutionName !== ''
    },
    areAllEducationStepsValid: function () {
      var isValid = true
      var index = 0

      while (index < this.educationSteps.length && isValid) {
        if (this.educationSteps[index].title !== '' || this.educationSteps[index].institutionName !== '') {
          isValid = isValid && this.isEducationStepValid(this.educationSteps[index])
        }

        index++
      }

      return isValid
    },
    isAwardValid: function (award) {
      return award.title !== '' && award.issuer !== ''
    },
    areAllAwardsValid: function () {
      var isValid = true
      var index = 0

      while (index < this.awards.length && isValid) {
        if (this.awards[index].title !== '' || this.awards[index].issuer !== '') {
          isValid = isValid && this.isAwardValid(this.awards[index])
        }

        index++
      }

      return isValid
    },
    isVideoValid: function (videoLink) {
      return videoLink &&
        (SocialMediaManager.isValidURL(videoLink, SocialMediaCategory.Youtube) || SocialMediaManager.isValidURL(videoLink, SocialMediaCategory.Vimeo))
    },
    isEducationStepButtonDisabled: function () {
      return !this.isEducationStepValid(this.educationSteps[this.educationSteps.length - 1])
    },
    isAddAwardButtonDisabled: function () {
      return !this.isAwardValid(this.awards[this.awards.length - 1])
    },
    isAddVideoButtonDisabled: function () {
      return !this.isVideoValid(this.videoGallery[this.videoGallery.length - 1].link)
    },
    removeSkill (item) {
      this.selectedSkills.splice(this.selectedSkills.indexOf(item), 1)
      this.selectedSkills = [...this.selectedSkills]
    },
    onAddEducationStepClick: function () {
      var isCurrentEducationStepValid = this.isEducationStepValid(this.educationSteps[this.educationSteps.length - 1])

      if (!isCurrentEducationStepValid) {
        return
      }

      this.educationSteps.push({
        title: '',
        institutionName: '',
        startDate: new Date().toISOString().substr(0, 7),
        endDate: new Date().toISOString().substr(0, 7),
        isValid: false,
        isStartDateMenuOpen: false,
        isEndDateMenuOpen: false
      })
    },
    onAddAwardClick: function () {
      var isCurrentAwardValid = this.isAwardValid(this.awards[this.awards.length - 1])

      if (!isCurrentAwardValid) {
        return
      }

      this.awards.push({
        title: '',
        issuer: '',
        description: '',
        date: new Date().toISOString().substr(0, 7),
        isValid: false,
        isAwardDateMenuOpen: false
      })
    },
    onAddVideoClick: function () {
      var isCurrentVideoValid = this.isVideoValid(this.videoGallery[this.videoGallery.length - 1].link)

      if (!isCurrentVideoValid) {
        return
      }

      this.videoGallery.push({
        link: '',
        embedLink: '',
        isValid: false
      })
    },
    onVideoLinkChange: function (video) {
      if (SocialMediaManager.isValidURL(video.link, SocialMediaCategory.Youtube)) {
        video.isValid = true
        video.embedLink = SocialMediaManager.extractYoutubeEmbedURL(video.link)
        return
      } else if (SocialMediaManager.isValidURL(video.link, SocialMediaCategory.Vimeo)) {
        video.isValid = true
        video.embedLink = SocialMediaManager.extractVimeoEmbedURL(video.link)
        return
      }

      video.isValid = false
      video.embedLink = ''
    },
    thumbnailGenerated (file, dataUrl) {

    },
    progress (file, progress, bytesSent, origin) {

    },
    createProfile: function () {
      this.$refs.form.validate()
    }
  }
}
</script>

<style lang="scss">

    .create-profile-section {

        .v-stepper, .v-stepper__header {
            box-shadow: none;
            -webkit-box-shadow: none;
        }
            


        #skills-autocomplete-wrapper {
            .v-select__selections .v-chip {
                display: none;
            }

            .v-text-field .v-label--active {
                transform: none;
                -webkit-transform: none;
            }

            .v-input--is-focused .v-label--active{
                -webkit-transform: translateY(-18px) scale(.75);
                transform: translateY(-18px) scale(.75);
            }
        }
    }

    #profile-picture-dropzone {
        width: 120px;
        height: 120px;
        min-height: 120px;
        border-radius: 100%;

        .dz-message {
            margin: 0px;
        }
    }

</style>
