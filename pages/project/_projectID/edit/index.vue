<template>
  <section class="project-section">

    <v-layout
      v-if="!generalInformation"
      row wrap
      class="invalid-project-container main-container px-5">
        <v-flex mb-3>
            <h1 class="page-title">{{ $t('pages.project.invalid-project-title') }}</h1>
        </v-flex>
        <v-flex xs12 mt-3>
            <p>
                {{ $t('pages.project.invalid-project-content') }}
            </p>
        </v-flex>
    </v-layout>

    <v-layout row wrap v-if="generalInformation">
      <v-container
          v-if="isEditingGeneralInformation"
          class="general-information-highlighted-section highlighted-section"
          mt-5
      >
        <v-flex
          xs12
        >
          <v-layout row wrap pa-5>
              <v-flex xs12 class="project-information-group-header">
                  <v-layout row wrap class="project-row-actions-container">
                      <v-flex xs12 sm8 md8 lg8>
                            <h2>{{ $t('pages.project.edit-general-information-title') }}</h2>
                      </v-flex>
                        <v-flex xs12 sm4 md4 lg4 class="project-row-actions">
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
                    <SetProjectGeneralInformation 
                        :projectGeneralInformation="editedGeneralInformation"
                        :isCreating="false"
                        @updateProjectGeneralInformation="updateEditedGeneralInformation"
                    />
                </v-flex>
            </v-layout>
        </v-flex>
      </v-container>
      <Hero
        v-if="!isEditingGeneralInformation"
        :title="generalInformation.Name"
        :image="generalInformation.Image ? generalInformation.Image.Location : ''"
        :initiatorName="generalInformation.InitiatorName"
        :initiatorImage="generalInformation.InitiatorImage"
        :isCompleted="generalInformation.IsCompleted"
      />
      <v-container mt-5>
        <v-layout column>
          <v-flex xs12>
            <v-layout
              v-if="!isEditingGeneralInformation"
              row wrap
            >
              <v-flex
                md7
                id="edit-project-general-information"
              >
                  <v-btn
                    outline small fab
                    v-on:click="onEditProjectGeneralInformationClick"
                  >
                      <v-icon>edit</v-icon>
                  </v-btn>
              </v-flex>
              <v-flex md7 mt-5>
                <p>{{ generalInformation.Description }}</p>
                <v-layout justify-end row>
                  <vue-goodshare-facebook
                    :page_url="pageURL"
                    :title_social="$t('pages.project.share-on-facebook')"
                    has_icon
                  />
                  <vue-goodshare-twitter
                    :page_url="pageURL"
                    :title_social="$t('pages.project.share-on-twitter')"
                    has_icon
                  />
                </v-layout>
              </v-flex>
              <v-flex md3 offset-md1 mt-5 class="project-information-section">
                <div class="project__info">
                  <span class="label">{{ $t('pages.project.initiator') }}</span> {{ generalInformation.InitiatorName }}
                  <br>
                  <div v-if="generalInformation.PhoneNumber">
                    <span class="label">{{ $t('pages.project.contact-phone-number') }}</span> {{ generalInformation.PhoneNumber }}
                  </div>
                  <div v-if="generalInformation.Email">
                    <span class="label">{{ $t('pages.project.contact-email') }}</span> {{ generalInformation.Email }}
                  </div>
                  <span class="label">{{ $t('pages.project.start-date') }}</span> <span class="project-date">{{ getFormattedDate(generalInformation.Date) }}</span>
                  <br>
                  <span class="label">{{ $t('pages.project.city') }}</span> {{ generalInformation.City }}
                  <br>
                  <span class="label">{{ $t('pages.project.budget') }}</span> {{ generalInformation.Budget }} {{ currency }}
                  <br>
                  <span class="label">{{ $t('pages.project.visibility') }}</span> {{ visibilityLiteral }}
                  <br>
                  <nuxt-link
                      :to="`/project/${ID}`"
                      class="view-project-link"
                      target="_blank">
                          <v-btn id="view-project-button" class="primary ml-0" small>
                              {{ $t('pages.project.view-project-button') }}
                          </v-btn>
                  </nuxt-link>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md7 mt-5>
                <h2
                  v-if="needs.length !== 0"
                  class="mb-5">
                    {{ $t('pages.project.needs-title') }}
                </h2>

                <v-timeline dense clipped>
                  <ProjectNeeds
                    :needs="needs"
                    :projectID="ID"
                    :isTimeline="true"
                    :saveChanges="true"
                    @initiateEditSectionSession="initiateEditSectionSession"
                    @endEditSectionSession="endEditSectionSession"
                    @updateProjectNeeds="updateProjectNeeds"
                  />
                </v-timeline>

                <h2
                  v-if="updates.length !== 0"
                  class="mt-5 mb-5">
                    {{ $t('pages.project.updates-title') }}
                </h2>

                <v-timeline dense clipped>
                  <ProjectUpdates
                    :updates="updates"
                    :projectID="ID"
                    :isTimeline="true"
                    :saveChanges="true"
                    @initiateEditSectionSession="initiateEditSectionSession"
                    @endEditSectionSession="endEditSectionSession"
                    @updateProjectUpdates="updateProjectUpdates"
                  />
                </v-timeline>
              </v-flex>
              <v-flex
                v-if="hasOtherProjects"
                md3 offset-md1 mt-5
              >
                <h2 class="mb-5">{{ $t('pages.project.other-projects-by-title') }} {{ generalInformation.InitiatorName }}</h2>
                <v-layout column>
                  <v-flex
                    xs12
                    :key="`other-project-${otherProjectIndex}`"
                    v-for="(otherProject, otherProjectIndex) in otherProjects"
                  >
                    <OtherProject
                      :id="otherProject.ID"
                      :name="otherProject.Name"
                      :image="otherProject.Image"
                    />
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
    </v-layout>
  </section>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import moment from 'moment';
import Hero from '~/components/project/hero.vue';
import OtherProject from '~/components/project/other-project.vue';
import ProjectNeeds from '~/components/project/project-needs.vue';
import ProjectUpdates from '~/components/project/project-updates.vue';
import VueGoodshareFacebook from '~/node_modules/vue-goodshare/src/providers/Facebook.vue';
import VueGoodshareTwitter from '~/node_modules/vue-goodshare/src/providers/Twitter.vue';
import SetProjectGeneralInformation from '~/components/project/set-project-general-information.vue';
import { getConfig } from '../../../../config/env';
import { ProjectSectionType, VisibilityType } from '~/store/entities';
import { Helpers, HtmlHelpers, Validators } from '~/utils';

const config = getConfig();

export default {
  layout: ({ store }) => {
      if (!store.getters['authentication/isAuthenticated']) {
          return 'visitor';
      } else if (store.getters['users/isAdmin']) {
          return 'administration';
      } else {
          return 'user';
      }
  },
  middleware: ['visitor-or-enabled-user', 'get-currencies', 'get-tags'],
  data () {
    return {
      isEditingGeneralInformation: false,
      isEditingNeeds: false,
      isEditingUpdates: false,
      snackbar: false,
      snackbarText: '',
      editedGeneralInformation: {}
    };
  },
  async asyncData ({ store, query, params, error }) {
    const project = await store.dispatch('projects/getMyProject', params.projectID);

    if (!project) {
      return {};
    }

    var generalInformation = {
      Visibility: project.Visibility,
      Name: project.Name,
			Image: project.Image || {},
      Date: project.Date,
      PhoneNumber: project.PhoneNumber,
      Email: project.Email,
      City: project.City,
      Budget: project.Budget,
      Currency: project.Currency,
      Description: project.Description,
      InitiatorName: project.InitiatorName,
      InitiatorImage: project.InitiatorImage,
      IsCompleted: project.IsCompleted
    };

    var needs = project.Needs.map(n => {
      return {
        ...n,
        Tags: n.Tags ? n.Tags.map(t => store.getters['applicationData/projectNeedTags'].find(pnt => pnt.ID === t)) : [],
        IsHovered: false,
        InEditMode: false,
        InDeleteMode: false
      };
    });

    var updates = project.Updates.map(u => {
      return {
        ...u,
        IsHovered: false,
        InEditMode: false,
        InDeleteMode: false
      };
    });

    var otherProjects = project.OtherProjects;

    return {
      ID: project.ID,
      generalInformation,
      needs,
      updates,
      otherProjects
    };
  },
  components: {
    Hero,
    OtherProject,
    ProjectNeeds,
    ProjectUpdates,
    SetProjectGeneralInformation,
    VueGoodshareFacebook,
    VueGoodshareTwitter
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      currencies: 'applicationData/currencies'
    }),
    currency: function () {
        return this.generalInformation.Currency;
    },
    pageURL: function () {
      return `${config.application.baseURL}/project`;
    },
    visibilityLiteral: function () {
       return this.$t(`application-data.${Helpers.getPrivacyElementText(this.generalInformation.Visibility)}`);
    },
    hasOtherProjects: function () {
      return this.project && this.project.OtherProjects && this.project.OtherProjects.length !== 0;
    }
  },
  methods: {
      getFormattedDate (date) {
          return moment(date).locale(this.locale).format('LL');
      },
      initiateEditSectionSession (navigateToElement, projectSection) {
        this.$store.dispatch('users/initiateEditSectionSession');

        switch (projectSection) {
          case ProjectSectionType.GeneralInformation:
            this.updateEditedGeneralInformation();
            this.isEditingGeneralInformation = true;
            break;
          case ProjectSectionType.Needs:
            this.isEditingNeeds = true;
            break;
          case ProjectSectionType.Updates:
            this.isEditingUpdates = true;
            break;
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
      endEditSectionSession (projectSection) {
          switch (projectSection) {
            case ProjectSectionType.GeneralInformation:
              this.isEditingGeneralInformation = false;
              break;
            case ProjectSectionType.Needs:
              this.isEditingNeeds = false;
              break;
            case ProjectSectionType.Updates:
              this.isEditingUpdates = false;
              break;
          }

          this.$store.dispatch('users/endEditSectionSession');
      },
      updateProjectNeeds: function (editedProjectNeeds) {
          this.needs = [...editedProjectNeeds];
      },
      updateProjectUpdates: function (editedProjectUpdates) {
          this.updates = [...editedProjectUpdates];
      },
      onEditProjectGeneralInformationClick () {
        this.cancelAllUnsavedChanges();
        this.initiateEditSectionSession(true, ProjectSectionType.GeneralInformation);
      },
      cancelAllUnsavedChanges: function () {
        this.isEditingGeneralInformation 	= false;
        this.isEditingNeeds 				      = false;
        this.isEditingUpdates 				    = false;
      },
      isSaveEditGeneralInformationButtonDisabled: function () {
        var isNameFieldValid = this.editedGeneralInformation.Name && this.editedGeneralInformation.Name.length <= 100;
        var isPhoneNumberFieldValid = !this.editedGeneralInformation.PhoneNumber ||
                      Validators.isValidPhoneNumber(this.editedGeneralInformation.PhoneNumber);
        var isEmailFieldValid = !this.editedGeneralInformation.Email || Validators.isValidEmailAddress(this.editedGeneralInformation.Email);
        var isCityFieldValid = !this.editedGeneralInformation.City || this.editedGeneralInformation.City.length <= 100;
        var isBudgetFieldValid = !this.editedGeneralInformation.Budget || Validators.isValidBudget(+this.editedGeneralInformation.Budget);
        var isDescriptionFieldValid = !this.editedGeneralInformation.Description || this.editedGeneralInformation.Description.length <= 500;

        return !isNameFieldValid || !isPhoneNumberFieldValid ||
              !isEmailFieldValid || !isCityFieldValid ||
              !isBudgetFieldValid || !isDescriptionFieldValid;
      },
      updateProjectGeneralInformation: function () {
        this.generalInformation = Helpers.cloneObject(this.editedGeneralInformation);
      },
      updateEditedGeneralInformation: function (generalInformation) {
        this.editedGeneralInformation = Helpers.cloneObject(generalInformation || this.generalInformation);
      },
      onSaveEditGeneralInformationClick: function () {
        var request = {
          id: this.ID,
          generalInformation: this.editedGeneralInformation
        };

        this.$store.dispatch('projects/updateGeneralInformation', request).then((response) => {
            this.endEditSectionSession(ProjectSectionType.GeneralInformation);
            if (response) {
                this.editedGeneralInformation.Image = response.Image;
            }
            this.updateProjectGeneralInformation();
            this.snackbarText = this.$t('pages.project.snackbar-messages.update-general-information');
            this.snackbar = true;
        });
      },
      onCancelEditGeneralInformationClick: function () {
        this.endEditSectionSession(ProjectSectionType.GeneralInformation);
      },
    getPrivacyElementText (value) {
        return this.$t(`application-data.${(_.invert(VisibilityType))[value].toLowerCase()}`);
    }
  }
};
</script>

<style lang="scss" scoped>

h2 {
  text-decoration: underline;
}

.invalid-project-container {
  max-width: 960px;
  margin: 0px auto;
  font-size: 16px;
}

.theme--light.v-timeline:before {
  background: #ae2760;
}

.project__info {
  border: 2px solid rgba(151, 151, 151, 0.6);
  padding: 20px;

  span.label {
    font-weight: 700;
  }
}

.timeline__date {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
  color: #888;
}

.project-need, .project-update {
  padding-left: 20px;
}

.project-date {
  text-transform: uppercase;
}

#edit-project-general-information {
  display: flex;
  justify-content: flex-end;
}

.general-information-highlighted-section {
  max-width: 960px;
}

</style>
