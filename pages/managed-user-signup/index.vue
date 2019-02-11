<template>
  <section class="signup">
    <v-container fluid managed-user-signup-container elevation-4 class="mt-5 pa-5">
        <v-layout>
          <v-flex xs12 align-end flexbox>
            <h1 class="mb-3">Complete Sign Up</h1>

            <v-layout>

              <v-flex xs12>
                <v-form ref="signupForm" v-model="valid">
                    <v-flex xs12>
                        <v-text-field v-model="firstName" :rules="firstNameRules" label="First name*" validate-on-blur required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="lastName"  :rules="lastNameRules" label="Last name*" validate-on-blur required></v-text-field>
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
                        <v-btn @click="submit" class="ml-0" color="primary">SUBMIT</v-btn>
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

</style>
