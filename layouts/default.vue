<template>
  <div class="nuxt-wrapper">
    <header>

      <v-layout v-if="!isAuthenticated">
        <v-flex xs4>
          <nav>
            <a class="logo-wrapper" href="/">
              <img :src="require('~/assets/images/theater_hub_logo-1.jpg')" />
            </a>
          </nav>
        </v-flex>
        <v-flex xs2 offset-xs5 class="sign-in-container action-button">
          <nuxt-link to="/login" id="login-btn" class="link-button">Login</nuxt-link>
        </v-flex>
        <v-flex xs1 class="sign-up-container action-button">
          <nuxt-link to="/signup" id="sign-up-btn" class="link-button">Sign up</nuxt-link>
        </v-flex>
      </v-layout>

      <v-layout v-if="isAuthenticated">
        <v-flex xs4>
          <nav>
            <a class="logo-wrapper" href="/">
              <img :src="require('~/assets/images/theater_hub_logo-1.jpg')" />
            </a>
          </nav>
        </v-flex>
        <v-flex xs1 offset-xs6 class="community-container action-button">
          <nuxt-link to="/community" id="community-btn" class="link-button">Community</nuxt-link>
        </v-flex>
        <v-flex xs2 class="sign-up-container action-button">
          <v-menu offset-y>
            <v-flex xs12 slot="activator">
              <span>Hi, {{ myFullName }}</span>
              <v-avatar size="40px" color="primary">
                <img :src="require('~/assets/images/theater_hub_logo-1.jpg')" />
              </v-avatar>
            </v-flex>
            <v-list>
              <v-list-tile>
                <v-list-tile-title>
                  <nuxt-link to="/profile" class="link-button">Profile</nuxt-link>
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>
                  <nuxt-link to="/settings" class="link-button">Settings</nuxt-link>
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>
                  <a id="logout-btn" v-on:click="onLogoutClick" class="link-button">Logout</a>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
      </v-layout>

    </header>
    <main>
      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
    </main>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex';

  export default {
    components: {
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        isAuthenticated: 'authentication/isAuthenticated',
        myFullName: 'users/myFullName',
        myProfileImage: 'users/myProfileImage'
      })
    },
    methods: {
      onLogoutClick: function () {
        this.$store.dispatch('authentication/logout');
        this.$router.replace({ path: 'login' });
      }
    },
    mounted: function () {
    }
  }
</script>

<style>

  html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }

  .sign-in-container, .community-container {
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;

      -ms-flex-align: center;
      -webkit-align-items: center;
      -webkit-box-align: center;

      align-items: center;
      justify-content: flex-end;
  }

  .sign-up-container {
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;

      -ms-flex-align: center;
      -webkit-align-items: center;
      -webkit-box-align: center;

      align-items: center;
      justify-content: center;
  }

  #logout-btn {
    cursor: pointer;
  }

</style>
