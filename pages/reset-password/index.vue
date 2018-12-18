<template>
  <section class="reset-password-section">
    <v-container fluid reset-password-container elevation-4 class="mt-5 pa-5">
        <v-layout>
          <v-flex xs12 align-end flexbox>
            <h1 class="mb-3">Reset password</h1>

            <v-layout>

                <v-flex xs12 v-if="!isSuccessfulSubmit" pt-2>
                    <v-form ref="resetPasswordForm" v-model="valid">
                        <v-flex xs12>
                            <v-text-field v-model="password"  :rules="passwordRules" label="Password*" validate-on-blur required type="password"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="confirmPassword" :rules="validateConfirmPassword()"
                                                        label="Confirm password*" validate-on-blur required type="password"></v-text-field>
                        </v-flex>
                        <v-flex xs12 mt-3>
                            <v-btn @click="submit" class="ml-0" color="primary">SUBMIT</v-btn>
                        </v-flex>
                        <v-flex v-if="users.resetPasswordErrors">
                            <ServerSideErrors :errors="users.resetPasswordErrors"/>
                        </v-flex>
                    </v-form>
                </v-flex>

                <v-flex xs12 align-end flexbox v-if="isSuccessfulSubmit" pt-2>
                      Your password has been successfully changed.
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
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
          v => Validators.isValidPassword(v) || 'Password must be between 7 and 50 characters long and include upper and lowercase characters'
        ],
        confirmPassword: '',
        isSuccessfulSubmit: false
      }),
      computed: {
        ...mapState(['users'])
      },
      methods: {
        initializePageState: function () {
          this.$store.dispatch('users/setResetPasswordErrors', '');
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
        submit: function () {
          this.$refs.resetPasswordForm.validate();

          if (!this.valid) {
            return;
          }

          this.$store.dispatch('users/resetPassword', {
            Password: this.password,
            ConfirmPassword: this.confirmPassword,
            ResetForgottenPasswordID: this.$route.query.resetForgottenPasswordID,
            Email: this.$route.query.email
          }).then(() => {
              if (!this.users.resetPasswordErrors) {
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

	.reset-password-container {
        max-width: 700px;
    }

</style>
