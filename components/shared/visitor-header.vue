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

              <v-flex xs12 pl-5 class="visitor-menu-items">
                <nuxt-link to="/about" id="about-btn" class="menu-link">{{ $t('shared.header.about-link') }}</nuxt-link>
                <nuxt-link to="/projects" id="projects-btn" class="menu-link">{{ $t('shared.header.projects-link') }}</nuxt-link>
                <nuxt-link to="/community" id="community-btn" class="menu-link">{{ $t('shared.header.community-link') }}</nuxt-link>
                <div>
                  <nuxt-link to="/login" id="login-btn" class="menu-link">{{ $t('shared.header.login-link') }}</nuxt-link>
                  /
                  <nuxt-link to="/signup" id="sign-up-btn" class="menu-link">{{ $t('shared.header.sign-up-link') }}</nuxt-link>
                </div>
                <v-menu offset-y>
                  <v-flex xs12 slot="activator">
                    <div class="header-language-container">
                      <span>{{ currentLocale }}</span>
                    </div>
                  </v-flex>
                  <v-list>
                    <v-list-tile :key="i" v-for="(l, i) in locales"
                                          v-on:click="onLanguageClick(l)" v-bind:class="{'selected-language': locale === l.ID}">
                      <v-list-tile-title>
                        <span>{{ $t(`application-data.${l.Name.toLowerCase()}`) }}</span>
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>

              <v-menu class="menu-hamburger">
                <v-flex xs12 slot="activator">
                  <v-icon>menu</v-icon>
                </v-flex>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title>
                      <nuxt-link to="/about" id="about-btn" class="menu-link">
                        {{ $t('shared.header.about-link') }}
                      </nuxt-link>
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>
                      <nuxt-link to="/projects" id="projects-btn" class="menu-link">
                        {{ $t('shared.header.projects-link') }}
                      </nuxt-link>
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>
                      <nuxt-link to="/community" id="community-btn" class="menu-link">
                        {{ $t('shared.header.community-link') }}
                      </nuxt-link>
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>
                      <nuxt-link to="/signup" id="sign-up-btn" class="menu-link">
                        {{ $t('shared.header.sign-up-link') }}
                      </nuxt-link>
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>
                      <nuxt-link to="/login" id="login-btn" class="menu-link">
                        {{ $t('shared.header.login-link') }}
                      </nuxt-link>
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile
                    :key="i" v-for="(l, i) in locales"
                    v-on:click="onLanguageClick(l)"
                    v-bind:class="{'selected-language': locale === l.ID, 'first-language': i === 0}"
                    >
                    <v-list-tile-title>
                      <span>{{ $t(`application-data.${l.Name.toLowerCase()}`) }}</span>
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

    import { mapGetters } from 'vuex';
    import { getConfig } from '~/config/env';
    import { LocaleType } from '~/store/entities';

    const config = getConfig();


    export default {
        middleware: 'get-locales',
        computed: {
            ...mapGetters({
                locale: 'locale',
                locales: 'applicationData/locales'
            }),
            currentLocale: function () {
                return this.locale ? this.locale.toUpperCase() : '';
            },
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
            onLanguageClick: function (selectedLocale) {
                if (selectedLocale.ID === this.locale) {
                    return;
                }

                this.$store.dispatch('setLocale', selectedLocale.ID);
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

    .header-language-container {
      display: flex;
      color: #AE2760;
      text-decoration: underline;
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

    .language-link {
      text-decoration: underline;
      cursor: pointer;
    }

    .first-language {
      border-top: 1px solid #EEE;
      margin-top: 5px;
    }

    .selected-language {
      color: #7E57C2;
    }

    .menu-link {
      text-decoration: underline;
      color: #AE2760;
      &.nuxt-link-active {
        color: black;
      }
    }

    @media screen  and (max-width: 600px){

      header {
        padding: 0px 10px;
      }

    }

</style>
