<template>
  <div class="nuxt-wrapper">
    <Hero :title="project.name" :image="project.image" :initiatorImage="project.initiatorImage"/>
    <v-container>
      <v-layout row wrap justify-space-between mt-5>
        <v-flex md8>
          <p>{{ project.description }}</p>
          <v-layout justify-end row>
            <vue-goodshare-facebook :page_url="pageURL" title_social="Facebook" has_icon/>
            <vue-goodshare-twitter :page_url="pageURL" title_social="Twitter" has_icon/>
          </v-layout>
          <h2 class="mt-5 mb-4">{{ $t('pages.project.needs-title') }}</h2>
          <v-timeline dense clipped>
            <v-timeline-item
                :key="`project-need-${projectNeedIndex}`"
                v-for="(projectNeed, projectNeedIndex) in project.needs"
                class="mb-3" large fill-dot>
                <v-avatar slot="icon">
                  <img :src="require('~/assets/images/icon-project_help.png')">
                </v-avatar>
                <v-layout justify-space-between>
                  <v-flex
                    xs9
                    class="project-need">
                    <v-chip
                      v-if="projectNeed.isMandatory"
                      class="white--text ml-0"
                      color="purple"
                      label small>
                        {{ $t('pages.project.mandatory') }}
                    </v-chip>
                    {{ projectNeed.description }}
                  </v-flex>
                </v-layout>
              </v-timeline-item>
          </v-timeline>
          <h2 class="mt-5 mb-4">{{ $t('pages.project.updates-title') }}</h2>
          <v-timeline dense clipped>
              <v-timeline-item
                :key="`project-update-${projectUpdateIndex}`"
                v-for="(projectUpdate, projectUpdateIndex) in project.updates"
                class="mb-3" large fill-dot>
                <v-avatar slot="icon">
                  <img :src="require('~/assets/images/icon-project_help.png')">
                </v-avatar>
                <v-layout justify-space-between>
                  <v-flex
                    xs9
                    class="project-update"
                  >{{ projectUpdate.description }}</v-flex>
                  <v-flex xs3 text-xs-right timeline__date>{{ getFormattedDate(projectUpdate.Date) }}</v-flex>
                </v-layout>
              </v-timeline-item>
          </v-timeline>
        </v-flex>
        <v-flex md3>
          <div class="project__info">
            <span class="label">{{ $t('pages.project.initiator') }}</span> {{ project.initiatorName }}
            <br>
            <div v-if="project.phoneNumber">
              <span class="label">{{ $t('pages.project.contact-phone-number') }}</span> {{ project.phoneNumber }}
            </div>
            <div v-if="project.email">
              <span class="label">{{ $t('pages.project.contact-email') }}</span> {{ project.email }}
            </div>
            <span class="label">{{ $t('pages.project.start-date') }}</span> <span class="project-date">{{ getFormattedDate(project.date) }}</span>
            <br>
            <span class="label">{{ $t('pages.project.city') }}</span> {{ project.city }}
            <br>
            <span class="label">{{ $t('pages.project.budget') }}</span> {{ project.budget }} {{ currency }}
          </div>
          <h4 class="mb-3">{{ $t('pages.project.other-projects-by-title') }} {{ project.initiatorName }}</h4>
          <project-card
            project_url="https://google.com"
            project_title="Back to the basics - contemporary dance show"
            project_abstract="Testing abstracts"
            project_initiator="John Doe"
            project_roles_number="4"
          />
          <project-card
            project_url="https://google.com"
            project_title="Back to the basics - contemporary dance show"
            project_abstract="Testing abstracts"
            project_initiator="John Doe"
            project_roles_number="4"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import Hero from '~/components/project/hero.vue';
import ProjectCard from '~/components/project/project-card.vue';
import VueGoodshareFacebook from '~/node_modules/vue-goodshare/src/providers/Facebook.vue';
import VueGoodshareTwitter from '~/node_modules/vue-goodshare/src/providers/Twitter.vue';
import { project } from '~/store/constants/mockdata';
import { getConfig } from '../../config/env';

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
  middleware: ['visitor-or-enabled-user'],
  data () {
    return {
      project
    };
  },
  components: {
    Hero,
    ProjectCard,
    VueGoodshareFacebook,
    VueGoodshareTwitter
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      currencies: 'applicationData/currencies'
    }),
    currency: function () {
        return this.currencies[project.currency].ID;
    },
    pageURL: function () {
      return `${config.application.baseURL}/project`;
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
.theme--light.v-timeline:before {
  background: #ae2760;
}

.project__info {
  margin-bottom: 128px;

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
