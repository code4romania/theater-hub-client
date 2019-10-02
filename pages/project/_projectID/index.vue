<template>
  <section class="project-section">

    <v-layout
      v-if="!project"
      row wrap
      text-center-xs
      class="mt-5 pa-5 invalid-project-container">
        <v-flex>
            <h1 class="mb-3">{{ $t('pages.project.invalid-project-title') }}</h1>
        </v-flex>
        <v-flex xs12>
            <p>
                {{ $t('pages.project.invalid-project-content') }}
            </p>
        </v-flex>
    </v-layout>

    <v-layout row wrap v-if="project">
      <Hero
        :title="project.Name"
        :image="project.Image"
        :initiatorImage="project.InitiatorImage"
      />
      <v-container
        class="main-container extra-large"
      >
        <v-layout column>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex md7 mt-5>
                <p>{{ project.Description }}</p>
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
                  <span class="label">{{ $t('pages.project.initiator') }}</span> {{ project.InitiatorName }}
                  <br>
                  <div v-if="project.PhoneNumber">
                    <span class="label">{{ $t('pages.project.contact-phone-number') }}</span> {{ project.PhoneNumber }}
                  </div>
                  <div v-if="project.Email">
                    <span class="label">{{ $t('pages.project.contact-email') }}</span> {{ project.Email }}
                  </div>
                  <span class="label">{{ $t('pages.project.start-date') }}</span> <span class="project-date">{{ getFormattedDate(project.Date) }}</span>
                  <br>
                  <span class="label">{{ $t('pages.project.city') }}</span> {{ project.City }}
                  <br>
                  <span class="label">{{ $t('pages.project.budget') }}</span> {{ project.Budget }} {{ currency }}
                  <div>
                    <span class="label">{{ $t('pages.project.tags') }}</span>
                    <span
                      v-if="!project.Tags">
                        {{ $t('pages.project.no-tags') }}
                    </span>
                    <v-chip
                        :key="index"
                        v-for="(tag, index) in project.Tags"
                        class="ml-0"
                        :text-color="tag.Color"
                        :color="tag.BackgroundColor"
                        label small>
                        {{ $t(`application-data.${tag.ID.toLowerCase()}`) }}
                    </v-chip>
                  </div>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md7 mt-5>
                <h2
                  v-if="project.Needs.length !== 0"
                  class="mb-5">
                    {{ $t('pages.project.needs-title') }}
                </h2>
                <v-timeline dense clipped>
                  <v-timeline-item
                      :key="`project-need-${projectNeedIndex}`"
                      v-for="(projectNeed, projectNeedIndex) in project.Needs"
                      class="mb-3" large fill-dot>
                      <v-avatar slot="icon">
                        <img :src="require('~/assets/images/icon-project_help.png')">
                      </v-avatar>
                      <v-layout justify-space-between>
                        <v-flex
                          class="project-need">
                          <v-chip
                              :key="index"
                              v-for="(tag, index) in projectNeed.Tags"
                              class="ml-0"
                              :text-color="tag.Color"
                              :color="tag.BackgroundColor"
                              label small>
                              {{ $t(`application-data.${tag.ID.toLowerCase()}`) }}
                          </v-chip>
                          {{ projectNeed.Description }}
                        </v-flex>
                      </v-layout>
                    </v-timeline-item>
                </v-timeline>
                <h2
                  v-if="project.Updates.length !== 0"
                  class="mt-5 mb-5">
                    {{ $t('pages.project.updates-title') }}
                </h2>
                <v-timeline dense clipped>
                    <v-timeline-item
                      :key="`project-update-${projectUpdateIndex}`"
                      v-for="(projectUpdate, projectUpdateIndex) in project.Updates"
                      class="mb-3" large fill-dot>
                      <v-avatar slot="icon">
                        <img :src="require('~/assets/images/icon-project_help.png')">
                      </v-avatar>
                      <v-layout justify-space-between>
                        <v-flex
                          xs9
                          class="project-update"
                        >{{ projectUpdate.Description }}</v-flex>
                        <v-flex xs3 text-xs-right timeline__date>{{ getFormattedDate(projectUpdate.Date) }}</v-flex>
                      </v-layout>
                    </v-timeline-item>
                </v-timeline>
              </v-flex>
              <v-flex
                v-if="hasOtherProjects"
                md3 offset-md1 mt-5
              >
                <h2 class="mb-5">{{ $t('pages.project.other-projects-by-title') }} {{ project.InitiatorName }}</h2>
                <v-layout column>
                  <v-flex
                    xs12
                    :key="`other-project-${otherProjectIndex}`"
                    v-for="(otherProject, otherProjectIndex) in project.OtherProjects"
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
    </v-layout>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import Hero from '~/components/project/hero.vue';
import OtherProject from '~/components/project/other-project.vue';
import VueGoodshareFacebook from '~/node_modules/vue-goodshare/src/providers/Facebook.vue';
import VueGoodshareTwitter from '~/node_modules/vue-goodshare/src/providers/Twitter.vue';
import { getConfig } from '../../../config/env';

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

    };
  },
  async asyncData ({ store, query, params }) {
    const project = await store.dispatch('projects/getProject', params.projectID);

    project.Needs = project.Needs.map(n => {
      return {
        ...n,
        Tags: n.Tags ? n.Tags.map(t => store.getters['applicationData/projectNeedTags'].find(pnt => pnt.ID === t)) : []
      };
    });

    return {
      project
    };
  },
  components: {
    Hero,
    OtherProject,
    VueGoodshareFacebook,
    VueGoodshareTwitter
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      currencies: 'applicationData/currencies',
      projectNeedTags: 'applicationData/projectNeedTags'
    }),
    currency: function () {
        return this.project.Currency;
    },
    pageURL: function () {
      return `${config.application.baseURL}/project`;
    },
    hasOtherProjects: function () {
      return this.project.OtherProjects && this.project.OtherProjects.length !== 0;
    }
  },
  methods: {
      getFormattedDate (date) {
          return moment(date).locale(this.locale).format('LL');
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
  font-size: 20px;
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

</style>
