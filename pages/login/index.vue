<template>
  <section class="login">
    <v-container fluid login-container elevation-4 class="mt-5 pa-5">
        <v-layout>
          <v-flex xs12 align-end flexbox>
            <h1 class="mb-3">Login</h1>
            <v-form ref="loginForm" v-model="valid">
                <v-flex xs12>
                    <v-text-field v-model="email" :rules="emailRules" label="Email*" required validate-on-blur color="primary"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                      v-model="password"
                      label="Password*"
                      color="primary"
                      :rules="passwordRules"
                      type="password"
                      required validate-on-blur></v-text-field>
                </v-flex>
                <v-flex xs12 mt-3>
                    <v-btn @click="submit" class="ml-0" color="primary">LOGIN</v-btn>
                    <nuxt-link to="/forgot-password" id="forgot-password-btn" class="link-button">Forgot password?</nuxt-link>
                </v-flex>
                <v-flex v-if="authentication.loginErrors">
                  <ServerSideErrors :errors="authentication.loginErrors"/>
                </v-flex>
            </v-form>
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
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
          v => Validators.isValidPassword(v) || 'Password must be between 7 and 50 characters long and include upper and lowercase characters'
        ]
      }),
      computed: {
        ...mapState(['authentication'])
      },
      methods: {
        initializePageState: function () {
          this.$store.dispatch('authentication/setLoginErrors', '');
        },
        async submit () {
          this.$refs.loginForm.validate();

          if (!this.valid) {
            return;
          }

          await this.$store.dispatch('authentication/login', {
            Email: this.email,
            Password: this.password
          });

          if (this.$store.getters['authentication/isAuthenticated']) {
            this.$store.dispatch('authentication/setLoginErrors', '');

            this.$store.dispatch('users/getMe').then(() => {
              this.$router.replace({ path: 'projects' });
            });
          }
        }
      },
      mounted: function () {
        this.initializePageState();
      }
    }
</script>

<style lang="scss" scoped>

	.login-container {
    max-width: 700px;
  }

</style>
