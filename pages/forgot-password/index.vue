<template>
  <section class="forgot-password-section">
    <v-container
      forgot-password-container
      class="main-container small"
    >
        <v-layout>
          <v-flex xs12 align-end flexbox>
            <h1 class="page-title mb-3">{{ $t('pages.forgot-password.title') }}</h1>

            <v-layout
              v-if="!isSuccessfulSubmit"
            >
                <v-flex xs12 pt-2>
                    <v-flex xs12>
                        {{ $t('pages.forgot-password.description') }}
                    </v-flex>
                    <v-form ref="forgotPasswordForm" v-model="valid">
                        <v-flex xs12 mt-2>
                            <v-text-field v-model="email" :rules="emailRules"
                                  :label="`${$t('fields.email.label')}*`" required validate-on-blur color="primary"></v-text-field>
                        </v-flex>
                        <v-flex xs12 mt-3>
                            <v-btn @click="submit" class="ml-0" color="primary">{{ $t('pages.forgot-password.submit-button') }}</v-btn>
                        </v-flex>
                        <v-flex v-if="users.forgotPasswordErrors">
                          <ServerSideErrors :errors="users.forgotPasswordErrors"/>
                        </v-flex>
                    </v-form>
                </v-flex>
            </v-layout>
            <v-layout
              v-if="isSuccessfulSubmit"
            >
                <v-flex xs12 align-end flexbox pt-2>
                    {{ $t('pages.forgot-password.submit-success-message') }}
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
          email: '',
          emailRules: [
            v => !!v || this.$t('fields.email.validation-errors.required'),
            v => v.length <= 100 || this.$t('fields.email.validation-errors.length'),
            v => Validators.isValidEmailAddress(v) || this.$t('fields.email.validation-errors.invalid')
          ],
          isSuccessfulSubmit: false
        };
      },
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

  .forgot-password-section {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
