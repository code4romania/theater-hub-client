<template>
  <div class="nuxt-wrapper">
    <header>
      <v-layout>
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
  export default {
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
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

  .sign-in-container {
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

</style>
