<template>
  <section class="signup">
    <v-container fluid signup-container elevation-4 class="mt-5 pa-5">
        <v-layout column>
          <v-flex xs12 align-end flexbox>
            <h1 class="mb-3">Sign Up</h1>

            <v-layout>

              <v-flex xs12 v-if="!isSuccessfulSubmit">
                <v-form ref="signupForm" v-model="valid">
                    <v-flex xs12>
                        <v-text-field v-model="firstName" :rules="firstNameRules" label="First name*" validate-on-blur required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="lastName"  :rules="lastNameRules" label="Last name*" validate-on-blur required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="email"     :rules="emailRules" label="Email*" validate-on-blur required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="password"  :rules="passwordRules" label="Password*" validate-on-blur required type="password"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="confirmPassword" :rules="validateConfirmPassword()"
                                                    label="Confirm password*" validate-on-blur required type="password"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-checkbox
                            id="agree-to-terms"
                            name="agree-to-terms"
                            v-model="agreeToTerms"
                            :rules="agreeToTermsRules">
                            <div slot="label">
                                I agree to the <nuxt-link to="terms-of-use" target="_blank">Terms of Use</nuxt-link> and <nuxt-link to="privacy-policy" target="_blank">Privacy Policy</nuxt-link>
                            </div>
                        </v-checkbox>
                    </v-flex>
                    <v-flex xs12 mt-3>
                        <v-btn @click="submit" class="signup-button ml-0" color="primary">SUBMIT</v-btn>
                    </v-flex>
                    <v-flex v-if="users.signupErrors">
                      <ServerSideErrors :errors="users.signupErrors"/>
                    </v-flex>
                </v-form>
              </v-flex>

              <v-flex xs12 align-end flexbox v-if="isSuccessfulSubmit" pt-2>
                  An email containing a link for confirming the registration has been sent. 
              </v-flex>

            </v-layout>
          </v-flex>
          <v-flex xs12 mt-1 class="social-media-signup-divider" v-if="!isSuccessfulSubmit">
              OR
          </v-flex>
          <v-layout row wrap mt-1 v-if="!isSuccessfulSubmit">
            <v-flex xs6 pr-2>
                <a href="https://localhost:443/api/authentication/facebook" class="facebook-signup-link social-media-signup-link">
                  <v-btn class="facebook-signup-button social-media-signup-button">
                    <img :src="require('~/assets/images/flogo-HexRBG-Wht-72.png')" />
                    Continue with Facebook
                  </v-btn>
                </a>
            </v-flex>
            <v-flex xs6 pl-2>
                <a href="https://localhost:443/api/authentication/google" class="google-signup-link social-media-signup-link">
                  <v-btn class="google-signup-button social-media-signup-button">
                    <img :src="require('~/assets/images/64px-Google__G__Logo.png')" />
                    Sign up with Google
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
      data: () => ({
        valid: false,
        firstName: '',
        firstNameRules: [
          v => !!v || 'First name is required',
          v => v.length <= 50 || 'First name should have at most 50 characters'
        ],
        lastName: '',
        lastNameRules: [
          v => !!v || 'Last name is required',
          v => v.length <= 50 || 'Last name should have at most 50 characters'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => v.length <= 100 || 'E-mail should have at most 100 characters',
          v => Validators.isValidEmailAddress(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
          v => Validators.isValidPassword(v) || 'Password must be between 7 and 50 characters long and include upper and lowercase characters'
        ],
        confirmPassword: '',
        agreeToTerms: false,
        agreeToTermsRules: [
          v => v || ''
        ],
        isSuccessfulSubmit: false
      }),
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
            return ['Confirm password is required'];
          }

          if (this.confirmPassword !== this.password) {
            return ['Confirm password must match the password'];
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

	.signup-container {
        max-width: 700px;
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

</style>
