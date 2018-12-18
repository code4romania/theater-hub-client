<template>
  <section class="forgot-password-section">
    <v-container fluid forgot-password-container elevation-4 class="mt-5 pa-5">
        <v-layout>
          <v-flex xs12 align-end flexbox>
            <h1 class="mb-3">Password reset</h1>

            <v-layout>

                <v-flex xs12 v-if="!isSuccessfulSubmit" pt-2>
                    <v-flex xs12>
                        Please submit the e-mail for which you wish to reset the password.
                    </v-flex>
                    <v-form ref="forgotPasswordForm" v-model="valid">
                        <v-flex xs12 mt-2>
                            <v-text-field v-model="email" :rules="emailRules" label="Email*" required validate-on-blur color="primary"></v-text-field>
                        </v-flex>
                        <v-flex xs12 mt-3>
                            <v-btn @click="submit" class="ml-0" color="primary">SUBMIT</v-btn>
                        </v-flex>
                        <v-flex v-if="users.forgotPasswordErrors">
                          <ServerSideErrors :errors="users.forgotPasswordErrors"/>
                        </v-flex>
                    </v-form>
                </v-flex>

                <v-flex xs12 align-end flexbox v-if="isSuccessfulSubmit" pt-2>
                    An email containing a link for resetting the password has been sent to your user's email. 
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
      middleware: 'visitor',
      data: () => ({
        valid: false,
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => v.length <= 100 || 'E-mail should have at most 100 characters',
          v => Validators.isValidEmailAddress(v) || 'E-mail must be valid'
        ],
        isSuccessfulSubmit: false
      }),
      computed: {
        ...mapState(['users'])
      },
      methods: {
        initializePageState: function () {
          this.$store.dispatch('users/setForgotPasswordErrors', '');
        },
        submit: function () {
          this.$refs.forgotPasswordForm.validate();

          if (!this.valid) {
            return;
          }

          this.$store.dispatch('users/forgotPassword', {
            Email: this.email
          }).then(() => {
              if (!this.users.forgotPasswordErrors) {
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

	.forgot-password-container {
        max-width: 700px;
    }

</style>
