<template>
  <section class="homepage-section">
    <v-container fluid homepage-container>
        <section id="card_presentation">
          <v-layout>
            <v-flex xs12 md12>
              <v-card dark color="black">
                <v-layout row wrap align-center>
                  <v-flex xs12 md6 px-5>
                    <h1>
                      {{ $t('pages.homepage.join-the-community') }}
                      <br />
                      {{ $t('pages.homepage.start-project') }}
                    </h1>
                    <v-layout mt-3>
                      <p>
                        {{ $t('pages.homepage.introduction') }}
                      </p>
                    </v-layout>

                    <v-layout row align-center>

                      <nuxt-link to="/about"
                        class="yellow--text find-out-link">
                        {{ $t('pages.homepage.find-out-link') }}
                      </nuxt-link>

                      <v-btn
                        depressed color="white"
                        class="blue--text register-now-link"
                        nuxt to="/signup">
                        <span>{{ $t('pages.homepage.register-now-link') }}</span>
                      </v-btn>

                    </v-layout>

                  </v-flex>

                  <v-flex xs12 md6 pr-2>   
                      <v-img :src="require('~/assets/images/main_image.png')"></v-img>   
                  </v-flex>

                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </section>

        <section id="how_it_works" class="centered-section">
          <v-layout>
            <v-flex xs12 my-5>
              <h2 class="text-xs-center section-title">{{ $t('pages.homepage.how-it-works') }}</h2>
            </v-flex>
          </v-layout>

          <v-layout row wrap justify-space-around>
            <v-flex xs10 md2 lg2 ma-3>
              <v-layout column align-center>
                <v-flex xs12>
                  <v-icon color="black" class="check-icon">check</v-icon>
                </v-flex>
                <v-flex xs12 mt-3>
                  <p>{{ $t('pages.homepage.how-it-works-item-1') }}</p>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs10 md2 lg2 ma-3>
              <v-layout column align-center>
                <v-flex xs12>
                  <v-icon color="black" class="check-icon">check</v-icon>
                </v-flex>
                <v-flex xs12 mt-3>
                  <p>{{ $t('pages.homepage.how-it-works-item-2') }}</p>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs10 md2 lg2 ma-3>
              <v-layout column align-center>
                <v-flex xs12>
                  <v-icon color="black" class="check-icon">check</v-icon>
                </v-flex>
                <v-flex xs12 mt-3>
                  <p>{{ $t('pages.homepage.how-it-works-item-3') }}</p>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </section>

        <section
          v-if="hasProjects"
          id="latest_projects"
          class="centered-section">
          <v-layout>
            <v-flex xs12 my-5>
              <h2 class="text-xs-center section-title">{{ $t('pages.homepage.latest-added-projects') }}</h2>
            </v-flex>
          </v-layout>

          <v-layout row wrap justify-space-around>
            
            <v-flex xs12 md6
              project-card-col
              :key="i" v-for="(project, i) in projects">
                <ProjectCard
                  :project_id="project.ID"
                  :project_title="project.Name"
                  :project_image="project.Image"
                  :project_abstract="project.Abstract"
                  :project_username="project.InitiatorUsername"
                  :project_initiator="project.InitiatorName"
                  :project_city="project.City"
                  :project_is_completed="project.IsCompleted"
                />
            </v-flex>

          </v-layout>

          <v-layout>
            <v-flex xs12
              mt-3 mb-3 text-xs-center text-lg-right
              class="view-link-container">
              <nuxt-link to="/projects" class="view-link">
                {{ $t('pages.homepage.view-all-projects-link') }}
              </nuxt-link>
            </v-flex>
          </v-layout>
        </section>

        <section
          v-if="hasCommunity"
          id="meet_the_community"
          class="centered-section">
          <v-layout>
            <v-flex xs12 my-5>
              <h2 class="text-xs-center section-title">{{ $t('pages.homepage.meet-the-community') }}</h2>
            </v-flex>
          </v-layout>

          <v-layout row wrap justify-center>

            <v-flex xs12 sm4 md4 lg2
                community-member
                :key="i" v-for="(member, i) in communityMembers"
                class="mt-4">
                    <CommunityMember
                      :member="member"
                      :showName="true"
                    />
            </v-flex>

          </v-layout>

          <v-layout class="view-link-container">
            <v-flex xs12 mt-3 mb-3 text-xs-center text-lg-right>
              <nuxt-link to="/community" class="view-link">
                {{ $t('pages.homepage.view-public-profiles-link') }}
              </nuxt-link>
            </v-flex>
          </v-layout>
        </section>

    </v-container>
  </section>
</template>

<script>

  import CommunityMember from '~/components/community/community-member.vue';
  import ProjectCard from '~/components/project/project-card.vue';

  export default {
    components: {
      CommunityMember,
      ProjectCard
    },
    layout: 'visitor',
    middleware: 'visitor',
    async asyncData ({ store, query, params }) {
        let communityMembers  = await store.dispatch('users/getRandomCommunityMembers', 5);
        communityMembers      = communityMembers.map(m => {
              return {
                  ID: m.ID,
                  FullName: `${m.FirstName} ${m.LastName}`,
                  Username: m.Username,
                  ProfileImage: m.ProfileImage
              };
          });
        const projects          = await store.dispatch('projects/getRandomProjects', 2);

        return {
            projects,
            communityMembers

        };
    },
    data: () => ({
      isLoading: false
    }),
    async fetch ({ store, redirect }) {
      if (store.getters['users/isAdmin']) {
        return redirect('/administration/users');
      } else if (store.getters['authentication/isAuthenticated'] && !store.getters['users/isEnabled']) {
        return redirect('/create-profile');
      } else if (store.getters['authentication/isAuthenticated']) {
        return redirect('/projects');
      }
    },
    methods: {
      initializeCommunityMembers: function () {
          return this.communityMembers.map(m => {
              return {
                  ID: m.ID,
                  FullName: `${m.FirstName} ${m.LastName}`,
                  Username: m.Username,
                  ProfileImage: m.ProfileImage
              };
          });
      }
  
    },
    computed: {
      hasProjects: function () {
        return this.projects.length !== 0;
      },
      hasCommunity: function () {
        return this.communityMembers.length !== 0;
      }
    }
  }

</script>

<style lang="scss" scoped>

  .homepage-section {
    color: #000;

    h1 {
      font-weight: 700;
      font-size: 32px;
    }

    a {
      font-size: 18px;

      i {
        margin-right: 10px;
      }
    }
  }

  .homepage-container {
      padding: 0px;
      align-items: center;
      display: flex;
      flex-direction: column;
  }

  #card_presentation {
    width: 100%;
  }

  .find-out-link {
    margin-right: 20px;
  }

  .register-now-link {
    font-size: 18px;
    text-transform: initial;
  }

  .centered-section {
    max-width: 1600px;
    width: 100%;
  }

  .section-title {
    text-decoration: underline;
    color: #AE2760;
    font-size: 32px;
  }

  .check-icon {
    border: 1px solid #000;
  }

  .view-link-container {
    padding-right: 20px;
  }

  .view-link {
    font-size: 18px;
    color: #00F;
    text-decoration: underline;
  }

  .project-card-col {
    padding: 20px;
  }

  .community-member {
      display: flex;
      justify-content: center;
  }

  @media screen and (max-width: 600px) {

    .view-link-container {
      padding-right: 0px;
    }

  }

</style>
