<template>
  <div class="nuxt-wrapper">
    <header>

      <v-layout justify-space-between align-center fill-height pl-5>
        <v-flex>
          <nav>
            <a class="logo-wrapper" href="/">
              <img :src="require('~/assets/images/theater_hub_logo-1.jpg')" />
            </a>
          </nav>
        </v-flex>
        <v-layout justify-end align-center pr-5>
          <v-flex xs1 mr-5 class="action-button">
            <nuxt-link to="/login" id="login-btn" class="menu-link">
              {{ $t('shared.header.login-link') }}
            </nuxt-link>
          </v-flex>
          <v-flex xs1 class="action-button">
            <nuxt-link to="/signup" id="sign-up-btn" class="menu-link">
              {{ $t('shared.header.sign-up-link') }}
            </nuxt-link>
          </v-flex>
          <v-flex xs2 class="action-button" ml-5>
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
</template>


<script>
  import { mapGetters, mapState } from 'vuex';

  export default {
    middleware: 'get-locales',
    data: () => ({
    }),
    computed: {
      ...mapState({
        displayMainOverlay: 'displayMainOverlay'
      }),
      ...mapGetters({
        locale: 'locale',
        locales: 'applicationData/locales'
      }),
      currentLocale: function () {
          return this.locale ? this.locale.toUpperCase() : '';
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

<style>

  .header-language-container {
    display: flex;
  }

  .language-link {
    text-decoration: underline;
    cursor: pointer;
  }

  .selected-language {
    color: #7E57C2;
  }

</style>
