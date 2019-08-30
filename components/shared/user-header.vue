<template>

      <header>

        <v-layout row wrap justify-space-between text-xs-center align-center content-center>

          <v-flex xs3 class="left-header-container">
            <v-layout row wrap align-center>
              <a :href="homeLink" class="logo-wrapper">
                  {{ $t('shared.header.app-developed-by') }}
                  <img :src="require('~/assets/images/LOGO-RGB-01.png')" />
              </a>
              <v-btn
                flat
                :href="donationLink"
                id="header-donate-button">
                {{ $t('shared.header.donate-link') }}
              </v-btn>
            </v-layout>
          </v-flex>

          <v-flex xs4>
              <nuxt-link to="/"
                class="central-logo-wrapper">
                  <img 
                    :src="require('~/assets/images/theater_hub_logo-11.png')"
                    class="header-site-logo"
                  />
              </nuxt-link>
          </v-flex>
          
          <v-flex xs5 class="menu-container">
            <v-layout justify-end>

              <v-flex xs12 class="user-menu-items">
                <nuxt-link to="/projects" class="menu-link">
                    {{ $t('shared.header.projects-link') }}
                </nuxt-link>
                <nuxt-link to="/create-project" class="menu-link">
                    {{ $t('shared.header.create-project-link') }}
                </nuxt-link>
                <nuxt-link to="/community" class="menu-link">
                    {{ $t('shared.header.community-link') }}
                </nuxt-link>
                <v-menu offset-y>
                    <v-flex xs12 slot="activator">
                        <div class="header-name-container">
                            <span>{{ $t('shared.header.greeting') }}, {{ myFullName }}</span>
                        </div>
                        <v-avatar size="30px">
                            <img :src="require('~/assets/images/default-avatar.svg')" />
                        </v-avatar>
                    </v-flex>
                    <v-list>
                        <v-list-tile>
                            <v-list-tile-title>
                                <nuxt-link to="/profile" class="menu-link">
                                    {{ $t('shared.header.profile-link') }}
                                </nuxt-link>
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-title>
                                <nuxt-link to="/my-projects" class="menu-link">
                                    {{ $t('shared.header.my-projects-link') }}
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
                        <v-list-tile class="logout-menu-item">
                            <v-list-tile-title>
                                <a id="logout-btn" v-on:click="onLogoutClick" class="menu-link">
                                    {{ $t('shared.header.logout-link') }}
                                </a>
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
              </v-flex>
              <v-menu class="menu-hamburger">
                  <v-flex xs12 slot="activator">
                      <div class="header-name-container">
                          <span>{{ $t('shared.header.greeting') }}, {{ myFullName }}</span>
                      </div>
                      <v-avatar size="30px">
                          <img :src="require('~/assets/images/default-avatar.svg')" />
                      </v-avatar>
                  </v-flex>
                      <v-list>
                          
                          <v-list-tile>
                              <v-list-tile-title>
                                  <nuxt-link to="/projects" class="menu-link">
                                      {{ $t('shared.header.projects-link') }}
                                  </nuxt-link>
                              </v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile>
                              <v-list-tile-title>
                                  <nuxt-link to="/create-project" class="menu-link">
                                      {{ $t('shared.header.create-project-link') }}
                                  </nuxt-link>
                              </v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile>
                              <v-list-tile-title>
                                  <nuxt-link to="/community" class="menu-link">
                                      {{ $t('shared.header.community-link') }}
                                  </nuxt-link>
                              </v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile class="profile-menu-item">
                              <v-list-tile-title>
                                  <nuxt-link to="/profile" class="menu-link">
                                      {{ $t('shared.header.profile-link') }}
                                  </nuxt-link>
                              </v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile>
                              <v-list-tile-title>
                                  <nuxt-link to="/my-projects" class="menu-link">
                                      {{ $t('shared.header.my-projects-link') }}
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
                          <v-list-tile class="logout-menu-item">
                              <v-list-tile-title>
                                  <a id="logout-btn" v-on:click="onLogoutClick" class="menu-link">
                                      {{ $t('shared.header.logout-link') }}
                                  </a>
                              </v-list-tile-title>
                          </v-list-tile>
                      </v-list>
              </v-menu>

            </v-layout>
          </v-flex>

          
        </v-layout>

      </header>

</template>

<script>

    import { getConfig } from '~/config/env';
    import { LocaleType } from '~/store/entities';
    import { mapGetters } from 'vuex';

    const config = getConfig();

    export default {
        middleware: 'get-locales',
        computed: {
            ...mapGetters({
                isEnabled: 'users/isEnabled',
                myFullName: 'users/myFullName',
                myProfileImage: 'users/myProfileImage'
            }),
            homeLink: function () {
              return this.locale === LocaleType.RO
                  ? config.CodeForRomania.homeLinkRO
                  : config.CodeForRomania.homeLinkEN;
            },
            donationLink: function () {
              return this.locale === LocaleType.RO
                  ? config.CodeForRomania.donationLinkRO
                  : config.CodeForRomania.donationLinkEN;
            }
        },
        methods: {
            onLogoutClick: function () {
                this.$store.dispatch('authentication/logout');

                this.$router.push({ path: '/login' });
            }
        }
    }

</script>

<style lang="scss" scoped>

    header {
      padding: 0px 48px;
      position: relative;
    }

    header > div {
      height: 100%;
    }

    .left-header-container {
      display: flex;
      align-items: center;
    }

    .left-header-container .logo-wrapper {
      color: #000;
      text-decoration: none;
      font-size: 12px;
      width: 120px;

      img {
        height: 40px;
      }
    }

    .central-logo-wrapper {
      position: absolute;
      top: calc(50% - 25px);
      left: calc(50% - 47px);
    }

    .menu-container {
      height: 100%;
    }

    .menu-link {
      text-decoration: underline;
      color: #AE2760;
      &.nuxt-link-active {
        color: black;
      }
    }

    .logout-menu-item {
        border-top: 1px solid #EEE;
        margin-top: 5px;
    }

    @media screen  and (max-width: 600px){

        header {
            padding: 0px 10px;
        }



    }

</style>
