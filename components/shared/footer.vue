<template>
      <footer>
          <v-layout class="footer-header">
            <div class="search-section">
              <v-text-field
                append-icon="search"
                @click:append="handleSearch"
                v-on:keyup="handleSearchKeyup"
                v-model="searchTerm"
                type="search" solo
                hide-details single-line filled
                :placeholder="$t('fields.site-search.label')"
                class="search-field"
              ></v-text-field>
            </div>
            <div class="links-section">
              <a href="https://www.facebook.com">
                <img :src="require('~/assets/images/facebook_grey.png')" />
              </a>
              <a href="https://www.youtube.com">
                <img :src="require('~/assets/images/youtube_grey.png')" />
              </a>
              <a href="https://www.instagram.com">
                <img :src="require('~/assets/images/instagram_grey.png')" />
              </a>
              <a href="https://www.twitter.com">
                <img :src="require('~/assets/images/twitter_grey.png')" />
              </a>
              <v-btn
                flat
                :href="donationLink"
                id="footer-donate-button">
                {{ $t('shared.header.donate-link') }}
              </v-btn>
            </div>
          </v-layout>
          <v-layout column px-5 py-4 class="black white--text">
            <v-flex xs-12>
              <v-layout row wrap justify-space-between>

                <v-flex xs12 md4 lg4 mt-2 class="useful-links-container">
                  <h3>{{ $t('shared.footer.useful-link') }}</h3>
                  <br/>
                  <ul>
                    <li>
                      <a :href="aboutLink">{{ $t('shared.footer.about-code-link') }}</a>
                    </li>
                    <li>
                      <nuxt-link to="/terms-and-conditions">{{ $t('shared.footer.terms-use-link') }}</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/privacy-policy">{{ $t('shared.footer.cookie-policy-link') }}</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/contact">{{ $t('shared.footer.contact-us-link') }}</nuxt-link>
                    </li>
                  </ul>
                </v-flex>

                <v-flex sm12 md4 lg4 mt-2 class="text-xs-center">
                  <nuxt-link to="/"
                    class="logo-wrapper">
                      <img :src="require('~/assets/images/theater_hub_logo-2.png')" />
                  </nuxt-link>
                </v-flex>

                <v-flex xs12 md4 lg4 mt-2> 
                  <v-layout row wrap>

                    <v-flex xs12 sm12 md12>
                      <v-layout wrap class="newsletter-container">
                        <v-flex xs12 sm12 offset-md6 class="text-xs-center text-md-left">
                          <h3>
                            {{ $t('shared.footer.subscribe-newsletter-link') }}
                          </h3>
                        </v-flex>
                        <v-flex xs12 sm12 offset-md6 mt-2 d-flex justify-center>
                          <v-form
                            ref="newsletterForm"
                            class="newsletter-form"
                            v-model="newsletterValid"
                          >
                            <v-text-field
                              solo
                              v-model="email"
                              :rules="emailRules"
                              hide-details
                              validate-on-blur
                              :placeholder="$t('fields.email.label')"
                              class="newsletter-input">
                            </v-text-field>
                            <v-btn
                              id="signup-to-newsletter"
                              @click="newsletterSubmit"
                            >
                              {{ $t('shared.footer.signup-to-newsletter') }}
                            </v-btn>
                          </v-form>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <v-flex xs12 sm12 md12 mt-4>
                      <v-layout>
                        <v-flex xs12 sm12 md12>
                          <v-layout column>
                            <v-flex text-xs-center text-md-right>
                              <nuxt-link to="/"
                                class="logo-wrapper">
                                  <img :src="require('~/assets/images/LOGO-WHITE2.png')" />
                              </nuxt-link>
                            </v-flex>
                            <v-flex text-xs-center text-md-right>
                                {{ $t('shared.footer.copyright') }}
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                  </v-layout>
                </v-flex>

              </v-layout>
            </v-flex>
            <v-flex xs12 text-xs-center text-md-right>
              {{ $t('shared.footer.code-description-link') }}
            </v-flex>
          </v-layout>
        <v-snackbar
            v-model="snackbar"
            :timeout="3000">
                {{ snackbarText }}
                <v-btn color="blue" flat @click="snackbar = false">{{ $t('shared.content.close') }}</v-btn>
        </v-snackbar>

      </footer>
</template>

<script>

    import { mapGetters } from 'vuex';
    import { getConfig } from '~/config/env';
    import { LocaleType } from '~/store/entities';
    import { Validators } from '~/utils';

    const config = getConfig();

    export default {
        data: function () {
          return {
              searchTerm: '',
              newsletterValid: false,
              email: '',
              emailRules: [
                  v => !!v && (v.length <= 100 || this.$t('fields.email.validation-errors.length')),
                  v => !!v && (Validators.isValidEmailAddress(v) || this.$t('fields.email.validation-errors.invalid'))
              ],
              snackbar: false,
              snackbarText: ''
          }
        },
        computed: {
            ...mapGetters({
                locale: 'locale'
            }),
            aboutLink: function () {
              return this.locale === LocaleType.RO
                  ? config.CodeForRomania.aboutLinkRO
                  : config.CodeForRomania.aboutLinkEN;
            },
            donationLink: function () {
              return this.locale === LocaleType.RO
                  ? config.CodeForRomania.donationLinkRO
                  : config.CodeForRomania.donationLinkEN;
            }
        },
        methods: {
            handleSearch: function () {
                this.$router.push({ path: `/search/${this.searchTerm}` });
            },
            handleSearchKeyup: function (event) {
                if (event.keyCode === 13) {
                  this.$router.push({ path: `/search/${this.searchTerm}` });
                }
            },
            async newsletterSubmit () {
              this.$refs.newsletterForm.validate();

              if (!this.newsletterValid || !this.email) {
                return;
              }

              await this.$store.dispatch('users/subcribeToNewsletter', {
                Email: this.email
              }).then(response => {
                this.snackbarText = this.$t('shared.footer.snackbar-messages.subscribe-to-newsletter-success-message');
                this.snackbar     = true;
                this.email        = '';
              }).catch(error => {
                this.snackbarText = error.response.data;
                this.snackbar     = true;
                this.email        = '';
              });
            }
        }
    }
</script>


<style lang="scss">
</style>