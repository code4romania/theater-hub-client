<template v-bar>
  <v-app>
    <div class="nuxt-wrapper">

      <Header />

      <v-content>
        <nuxt />
      </v-content>

      <Footer />

      <div id="main-overlay" class="overlay" v-if="displayMainOverlay"></div>

    </div>
  </v-app>
</template>


<script>
  import Header from '~/components/shared/visitor-header.vue';
  import Footer from '~/components/shared/footer.vue';
  import { mapState } from 'vuex';

  export default {
    components: {
      Header,
      Footer
    },
    middleware: 'get-locales',
    computed: {
      ...mapState({
        displayMainOverlay: 'displayMainOverlay'
      })
    }
  }
</script>
