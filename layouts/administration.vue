<template>
  <v-app>
    <div class="nuxt-wrapper">
      <header>

        <v-layout justify-space-between align-center fill-height pl-5>
          <v-flex xs4>
            <nav>
              <a class="logo-wrapper" href="/">
                <img :src="require('~/assets/images/theater_hub_logo-1.jpg')" />
              </a>
            </nav>
          </v-flex>
          <v-layout justify-end align-center pr-5>
            <v-flex xs1 mr-5 class="action-button">
              <nuxt-link to="/administration/users" id="users-administration-btn" class="menu-link">
                {{ $t('shared.header.administration-users-link') }}
              </nuxt-link>
            </v-flex>
            <v-flex xs1 mr-5 class="action-button">
              <nuxt-link to="/administration/projects" id="projects-administration-btn" class="menu-link">
                {{ $t('shared.header.administration-projects-link') }}
              </nuxt-link>
            </v-flex>
            <v-flex xs2 class="action-button">
              <v-menu offset-y>
                <v-flex xs12 slot="activator">
                  <div class="header-name-container">
                    <span>{{ $t('shared.header.greeting') }}, {{ myFullName }}</span>
                  </div>
                  <v-avatar size="30px">
                    <img :src="require('~/assets/images/default-avatar.svg')"   v-if="!myProfileImage || !myProfileImage.Image" />
                    <img :src="`data:image/png;base64,${myProfileImage.Image}`" v-if="myProfileImage && myProfileImage.Image" />
                  </v-avatar>
                </v-flex>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title>
                      <nuxt-link to="/administration/profile" class="menu-link">
                        {{ $t('shared.header.profile-link') }}
                      </nuxt-link>
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>
                      <nuxt-link to="/settings" class="menu-link">
                        {{ $t('shared.header.settings-link') }}
                      </nuxt-link>
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>
                      <a id="logout-btn" v-on:click="onLogoutClick" class="menu-link">
                        {{ $t('shared.header.logout-link') }}
                      </a>
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-layout>

      </header>
      <main>
        <v-content>
          <v-container>
            <nuxt />
          </v-container>
        </v-content>
      </main>
      <div id="main-overlay" class="overlay" v-if="displayMainOverlay"></div>
    </div>
  </v-app>
</template>


<script>
  import { mapGetters, mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        displayMainOverlay: 'displayMainOverlay'
      }),
      ...mapGetters({
        isAuthenticated: 'authentication/isAuthenticated',
        isAdmin: 'users/isAdmin',
        isEnabled: 'users/isEnabled',
        myFullName: 'users/myFullName',
        myProfileImage: 'users/myProfileImage'
      })
    },
    methods: {
      onLogoutClick: function () {
        this.$store.dispatch('authentication/logout');

        this.$router.push({ path: '/login' });
      }
    }
  }
</script>

<style>

  #logout-btn {
    cursor: pointer;
  }

  .header-name-container {
    max-width: 200px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

</style>