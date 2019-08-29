<template>
  <section class="signup">
    <v-container fluid managed-user-signup-container elevation-4 class="pa-5">
        <v-layout>
          <v-flex xs12 align-end flexbox>
            <h1 class="mb-3">{{ $t('pages.managed-user-signup.title') }}</h1>

            <v-layout>

              <v-flex xs12>
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
                          <nuxt-link to="terms-and-conditions" target="_blank">
                            {{ $t('shared.content.agreement-terms-of-use') }}
                          </nuxt-link> {{ $t('shared.content.agreement-text-separator') }} <nuxt-link to="privacy-policy" target="_blank">{{ $t('shared.content.agreement-text-privacy-policy') }}</nuxt-link>
                        </v-flex>
                    </v-layout>
                    <v-flex xs12 mt-3>
                        <v-btn @click="submit" class="ml-0" color="primary">{{ $t('pages.managed-user-signup.submit-button') }}</v-btn>
                    </v-flex>
                    <v-flex v-if="users.managedUserSignupErrors">
                      <ServerSideErrors :errors="users.managedUserSignupErrors"/>
                    </v-flex>
                </v-form>
              </v-flex>

            </v-layout>
          </v-flex>
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
      async fetch ({ error, store, query }) {
        var isAuthenticated             = store.getters['authentication/isAuthenticated'];
        var hasFinishRegistrationQuery  = query && query.email && query.registrationID;

        if (isAuthenticated || !hasFinishRegistrationQuery) {
            return error({ statusCode: 404 });
        }
      },
      async asyncData ({ store, query }) {
          return {
              email: query.email,
              registrationID: query.registrationID
          };
      },
      computed: {
        ...mapState(['users'])
      },
      methods: {
        initializePageState () {
          this.$store.dispatch('users/setManagedUserSignupErrors', '');
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

          await this.$store.dispatch('users/managedUserSignup', {
            Email: this.email,
            RegistrationID: this.registrationID,
            FirstName: this.firstName,
            LastName: this.lastName,
            Password: this.password,
            ConfirmPassword: this.confirmPassword,
            AgreeToTerms: this.agreeToTerms
          });

          if (this.users.managedUserSignupErrors) {
            return;
          }

          await this.$store.dispatch('users/getMe');

          if (this.$store.getters['users/isAdmin']) {
            this.$router.go({ path: 'administration/users' });
          } else {
            this.$router.go({ path: `/create-profile/?registrationID=${this.registrationID}&email=${this.email}` });
          }
        }
      },
      mounted: function () {
        this.initializePageState();
      }
    }
</script>

<style lang="scss" scoped>

	.managed-user-signup-container {
        max-width: 700px;
    }

  .agree-to-terms-label {
    cursor: pointer;
  }

</style>
