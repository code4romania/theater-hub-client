<template>
  <section class="create-profile">
    <v-container fluid create-profile-container elevation-4 class="pa-5">
        <v-layout>
          <v-flex xs12 align-end flexbox>
            <h1 class="mb-3">Create Profile</h1>
            <v-form ref="form" v-model="valid">
                <v-flex xs12 mb-3>
                    <span class="field-title">Profile image</span>
                    <dropzone id="profile-picture-dropzone" ref="profilePictureDropzone"
                        :options="profilePictureDropzoneOptions" :destroyDropzone="true" :duplicateCheck="true"
                        width="200px" height="80px">
                        <div class="dz-message" data-dz-message><span>Click or drop file here</span></div>
                    </dropzone>
                </v-flex>
                <v-flex xs12 mb-3>
                    <span class="field-title">Photo gallery</span>
                    <dropzone id="photo-gallery-dropzone" ref="photoGalleryDropzone"
                        :options="photoGalleryDropzoneOptions" :destroyDropzone="true" :duplicateCheck="true"
                        width="200px" height="80px">
                        <div class="dz-message" data-dz-message><span>Click or drop files here</span></div>
                    </dropzone>
                </v-flex>
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
                <v-flex xs12>
                    <v-text-field v-model="phoneNumber"    :rules="phoneNumberRules" label="Phone Number*" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="website"        :rules="websiteRules"     label="Website"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-autocomplete
                        v-model="selectedSkills"
                        :items="skills"
                        box
                        chips
                        multiple
                        persistent-hint
                        label="Your professional skills"
                        hint="Maximum of 7 skills"
                        no-data-text="No results"
                        color="deep-purple lighten-2"
                        background-color="transparent">
                        <template slot="selection" slot-scope="data">
                            <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeSkill(data.item)">
                                {{ data.item }}
                            </v-chip>
                        </template>
                        <template slot="item" slot-scope="data">
                            <template v-if="typeof data.item !== 'object'">
                                <v-list-tile-content v-text="data.item"></v-list-tile-content>
                            </template>
                            <template v-else>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="data.item"></v-list-tile-title>
                                </v-list-tile-content>
                            </template>
                        </template>
                    </v-autocomplete>
                </v-flex>
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
                <v-btn v-on:click="onAddEducationStepClick" :disabled="isEducationStepButtonDisabled()" block class="add-education-step-button">
                    Add education step
                </v-btn>
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
                <v-btn v-on:click="onAddAwardClick" :disabled="isAddAwardButtonDisabled()" block class="add-award-button">
                    Add award
                </v-btn>
                <v-flex xs12>
                    <v-flex xs12 :key="i" v-for="(video, i) in videoGallery">
                        <v-text-field v-model="video.link" :rules="videoLinkRules" label="Video link*" v-on:change="onVideoLinkChange(video)" required></v-text-field>
                        <iframe v-if="video.isValid" width="420" height="315" :src="video.embedLink"></iframe>
                    </v-flex>
                </v-flex>
                <v-btn v-on:click="onAddVideoClick" :disabled="isAddVideoButtonDisabled()" block class="add-video-button">
                    Add video link
                </v-btn>
                <v-flex xs12 mb-3>
                    <v-text-field v-model="instagramLink"       :rules="instagramLinkRules"     label="Instagram"></v-text-field>
                </v-flex>
                <v-flex xs12 mb-3>
                    <v-text-field v-model="youtubeLink"         :rules="youtubeLinkRules"       label="Youtube"></v-text-field>
                </v-flex>
                <v-flex xs12 mb-3>
                    <v-text-field v-model="facebookLink"        :rules="facebookLinkRules"     label="Facebook"></v-text-field>
                </v-flex>
                <v-flex xs12 mb-3>
                    <v-text-field v-model="linkedinLink"        :rules="linkedinLinkRules"     label="Linkedin"></v-text-field>
                </v-flex>
                <v-flex xs12 class="text-xs-center mt-4">
                    <v-btn :disabled="!valid" @click="submit" large class="mt-20">SUBMIT</v-btn>
                </v-flex>
            </v-form>
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
    skills: skills.sort(),
    valid: false,
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
    educationTitleRules: [
      v => !!v || 'Title is required'
    ],
    institutionNameRules: [
      v => !!v || 'Institution name is required'
    ],
    awardTitleRules: [
      v => !!v || 'Title is required'
    ],
    awardIssuerRules: [
      v => !!v || 'Issuer is required'
    ],
    videoLinkRules: [
      v => !!v || 'Link is required',
      v => SocialMediaManager.isValidURL(v, SocialMediaCategory.Youtube) || SocialMediaManager.isValidURL(v, SocialMediaCategory.Vimeo) || 'Video link is invalid'
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
    isEducationStepValid: function (educationStep) {
      return educationStep.title !== '' && educationStep.institutionName !== ''
    },
    isAwardValid: function (award) {
      return award.title !== '' && award.issuer !== ''
    },
    isVideoValid: function (video) {
      return video.link &&
        (SocialMediaManager.isValidURL(video.link, SocialMediaCategory.Youtube) || SocialMediaManager.isValidURL(video.link, SocialMediaCategory.Vimeo))
    },
    isEducationStepButtonDisabled: function () {
      return !this.isEducationStepValid(this.educationSteps[this.educationSteps.length - 1])
    },
    isAddAwardButtonDisabled: function () {
      return !this.isAwardValid(this.awards[this.awards.length - 1])
    },
    isAddVideoButtonDisabled: function () {
      return !this.isVideoValid(this.videoGallery[this.videoGallery.length - 1])
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
      var isCurrentVideoValid = this.isVideoValid(this.videoGallery[this.videoGallery.length - 1])

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
    async submit () {
      this.$refs.form.validate()
    }
  }
}
</script>

<style lang="scss" scoped>
	.create-profile-container {
        max-width: 960px;
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
