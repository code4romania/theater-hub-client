<template>
  <section class="signup">
    <v-container
      fluid
      signup-container
      class="main-container small"
    >
        <v-layout column>
          <v-flex xs12 align-end flexbox>
            <h1 class="page-title mb-3">{{ $t('pages.sign-up.title') }}</h1>

            <v-layout>

              <v-flex xs12 v-if="!isSuccessfulSubmit">
                <v-form ref="signupForm" v-model="valid">
                    <v-flex xs12>
                        <v-text-field v-model="firstName" :rules="firstNameRules"
                                        :label="`${$t('fields.first-name.label')}*`" validate-on-blur required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="lastName"  :rules="lastNameRules"
                                        :label="`${$t('fields.last-name.label')}*`" validate-on-blur required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="email"     :rules="emailRules"
                                        :label="`${$t('fields.email.label')}*`" validate-on-blur required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="password"  :rules="passwordRules"
                                        :label="`${$t('fields.password.label')}*`" validate-on-blur required type="password"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="confirmPassword" :rules="validateConfirmPassword()"
                                        :label="`${$t('fields.confirm-password.label')}*`" validate-on-blur required type="password"></v-text-field>
                    </v-flex>
                    <v-layout mt-4>
                        <v-flex xs1>
                          <v-checkbox
                              id="agree-to-terms"
                              name="agree-to-terms"
                              v-model="agreeToTerms"
                              :rules="agreeToTermsRules">
                          </v-checkbox>
                        </v-flex>
                        <v-flex xs11>
                          <label class="agree-to-terms-label" for="agree-to-terms">{{ $t('shared.content.agreement-text-beginning') }}</label>
                          <nuxt-link to="terms-and-conditions" target="_blank">{{ $t('shared.content.agreement-terms-of-use') }}</nuxt-link> {{ $t('shared.content.agreement-text-separator') }} <nuxt-link to="privacy-policy" target="_blank">{{ $t('shared.content.agreement-text-privacy-policy') }}</nuxt-link>
                        </v-flex>
                    </v-layout>
                    <v-flex xs12 mt-3>
                        <v-btn @click="submit" class="signup-button ml-0" color="primary">{{ $t('pages.sign-up.submit-button') }}</v-btn>
                    </v-flex>
                    <v-flex v-if="users.signupErrors">
                      <ServerSideErrors :errors="users.signupErrors"/>
                    </v-flex>
                </v-form>
              </v-flex>

              <v-flex xs12 align-end flexbox v-if="isSuccessfulSubmit" pt-2>
                  {{ $t('pages.sign-up.submit-success-message') }}
              </v-flex>

            </v-layout>
          </v-flex>
          <v-flex xs12 mt-1 class="social-media-signup-divider" v-if="!isSuccessfulSubmit">
              {{ $t('pages.sign-up.separator-text') }}
          </v-flex>
          <v-layout row wrap mt-1 v-if="!isSuccessfulSubmit">
            <v-flex xs12 md6 class="facebook-link-container">
                <a href="http://theaterhubapi-env-1.tq2hysnc5z.eu-central-1.elasticbeanstalk.com/api/authentication/facebook" class="facebook-signup-link social-media-signup-link">
                  <v-btn class="facebook-signup-button social-media-signup-button">
                    <img :src="require('~/assets/images/flogo-HexRBG-Wht-72.png')" />
                    {{ $t('pages.sign-up.facebook-sign-up-button-text') }}
                  </v-btn>
                </a>
            </v-flex>
            <v-flex xs12 md6 class="google-link-container">
                <a href="http://theaterhubapi-env-1.tq2hysnc5z.eu-central-1.elasticbeanstalk.com/api/authentication/google" class="google-signup-link social-media-signup-link">
                  <v-btn class="google-signup-button social-media-signup-button">
                    <img :src="require('~/assets/images/64px-Google__G__Logo.png')" />
                    {{ $t('pages.sign-up.google-sign-up-button-text') }}
                  </v-btn>
                </a>
            </v-flex>
          </v-layout>
        </v-layout>
    </v-container>
  </section>
</template>


<script>
   import ServerSideErrors from '~/components/errors/server-side-errors.vue';
   import { Validators } from '~/utils';
   import { mapState } from 'vuex';


    export default {
      components: {
        ServerSideErrors
      },
      layout: 'visitor',
      middleware: 'visitor',
      data: function () {
        return {
          valid: false,
          firstName: '',
          firstNameRules: [
            v => !!v || this.$t('fields.first-name.validation-errors.required'),
            v => v.length <= 50 || this.$t('fields.first-name.validation-errors.length')
          ],
          lastName: '',
          lastNameRules: [
            v => !!v || this.$t('fields.last-name.validation-errors.required'),
            v => v.length <= 50 || this.$t('fields.last-name.validation-errors.length')
          ],
          email: '',
          emailRules: [
            v => !!v || this.$t('fields.email.validation-errors.required'),
            v => v.length <= 100 || this.$t('fields.email.validation-errors.length'),
            v => Validators.isValidEmailAddress(v) || this.$t('fields.email.validation-errors.invalid')
          ],
          password: '',
          passwordRules: [
            v => !!v || this.$t('fields.password.validation-errors.required'),
            v => Validators.isValidPassword(v) || this.$t('fields.password.validation-errors.invalid')
          ],
          confirmPassword: '',
          agreeToTerms: false,
          agreeToTermsRules: [
            v => v || ''
          ],
          isSuccessfulSubmit: false
        };
      },
      async fetch ({ store, query, app }) {
       if (query && query.token) {
          store.dispatch('authentication/setToken', query.token);
          store.dispatch('applicationData/getApplicationData', null, { root: true });
          await store.dispatch('users/getMe');

          if (store.getters['users/isUser']) {
            app.router.replace({ path: 'projects' });
          } else if (store.getters['users/isAdmin']) {
            app.router.replace({ path: 'administration/users' });
          }
       }
      },
      computed: {
        ...mapState(['users'])
      },
      methods: {
        initializePageState () {
          this.$store.dispatch('users/setSignupErrors', '');
        },
        validateConfirmPassword () {
          if (!this.confirmPassword) {
            return [this.$t('fields.confirm-password.validation-errors.required')];
          }

          if (this.confirmPassword !== this.password) {
            return [this.$t('fields.confirm-password.validation-errors.invalid')];
          }

          return [true];
        },
        async submit () {
          this.$refs.signupForm.validate();

          if (!this.valid || !this.agreeToTerms) {
            return;
          }

          this.$store.dispatch('users/signup', {
            FirstName: this.firstName,
            LastName: this.lastName,
            Email: this.email,
            Password: this.password,
            ConfirmPassword: this.confirmPassword,
            AgreeToTerms: this.agreeToTerms
          }).then(() => {
              if (!this.users.signupErrors) {
                this.isSuccessfulSubmit = true;
              }
          });
        }
      },
      mounted: function () {
        this.initializePageState();
      }
    }
</script>

<style lang="scss" scoped>

  .signup {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .signup-button {
    width: 100%;
  }

  .social-media-signup-divider {
    text-align: center;
    font-weight: 600;
  }

  .social-media-signup-link {
    text-decoration: none;
  }

  .social-media-signup-button {
      border-radius: 5px;
      font-size: 16px;
      text-transform: initial;
      width: 100%;
      letter-spacing: .25px;
      margin-left: 0px;

      img {
        width: 24px;
        height: 24px;
        margin-right: 21px;
      }
    }

  .facebook-signup-button {
    background-color: #4267B2 !important;
    color: #FFF;
    font-family: Helvetica, Arial, sans-serif;
  }

  .google-signup-button {
    background-color: #FFF !important;
    color: #000;
    font-family: Helvetica, Arial, sans-serif;
  }

  .agree-to-terms-label {
    margin-left: 5px;
    cursor: pointer;
  }

</style>
