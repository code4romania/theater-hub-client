<template>
  <div class="nuxt-wrapper">
    <header>

      <v-layout justify-space-between align-center fill-height pl-5>
        <v-flex>
          <nav>
            <a class="logo-wrapper" href="/">
              <img :src="require('~/assets/images/theater_hub_logo-1.jpg')" />
            </a>
          </nav>
        </v-flex>
        <v-layout justify-end align-center pr-5>
          <v-flex xs1 mr-5 class="action-button">
            <nuxt-link to="/login" id="login-btn" class="menu-link">Login</nuxt-link>
          </v-flex>
          <v-flex xs1 class="action-button">
            <nuxt-link to="/signup" id="sign-up-btn" class="menu-link">Sign up</nuxt-link>
          </v-flex>
        </v-layout>
      </v-layout>

    </header>
    <main>
      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
    </main>
    <div id="main-overlay" class="overlay" v-if="displayMainOverlay"></div>
  </div>
</template>


<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        displayMainOverlay: 'displayMainOverlay'
      })
    }
  }
</script>
