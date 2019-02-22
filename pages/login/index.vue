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
                    <v-btn @click="submit" class="ml-0" color="login-button primary">LOGIN</v-btn>
                    <nuxt-link to="/forgot-password" id="forgot-password-btn" class="link-button">Forgot password?</nuxt-link>
                </v-flex>
                <v-flex v-if="authentication.loginErrors">
                  <ServerSideErrors :errors="authentication.loginErrors"/>
                </v-flex>
                <v-flex xs12 mt-1 class="social-media-login-divider">
                    OR
                </v-flex>
                <v-layout row wrap mt-1>
                  <v-flex xs6 pr-2>
                      <a href="https://localhost:443/api/authentication/facebook" class="facebook-login-link social-media-login-link">
                        <v-btn class="facebook-login-button social-media-login-button">
                          <img :src="require('~/assets/images/flogo-HexRBG-Wht-72.png')" />
                          Login with Facebook
                        </v-btn>
                      </a>
                  </v-flex>
                  <v-flex xs6 pl-2>
                      <a href="https://localhost:443/api/authentication/google" class="google-login-link social-media-login-link">
                        <v-btn class="google-login-button social-media-login-button">
                          <img :src="require('~/assets/images/64px-Google__G__Logo.png')" />
                          Login with Google
                        </v-btn>
                      </a>
                  </v-flex>
                </v-layout>
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
      layout: 'visitor',
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

          if (!this.$store.getters['authentication/isAuthenticated']) {
            return;
          }

          this.$store.dispatch('authentication/setLoginErrors', '');
          await this.$store.dispatch('users/getMe');

          if (this.$store.getters['users/isUser']) {
            this.$router.replace({ path: 'projects' });
          } else if (this.$store.getters['users/isAdmin']) {
            this.$router.replace({ path: 'administration/users' });
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

  .login-button {
    width: 100%;
  }

  .social-media-login-divider {
    text-align: center;
    font-weight: 600;
  }

  .social-media-login-link {
    text-decoration: none;
  }

  .social-media-login-button {
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

  .facebook-login-button {
    background-color: #4267B2 !important;
    color: #FFF;
    font-family: Helvetica, Arial, sans-serif;
  }

  .google-login-button {
    background-color: #FFF !important;
    color: #000;
    font-family: Helvetica, Arial, sans-serif;
  }

</style>
