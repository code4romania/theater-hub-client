<template>
  <v-app>
    <div class="nuxt-wrapper">

      <Header />

      <main>
        <v-content>
            <nuxt />
        </v-content>
      </main>

      <Footer />

      <div id="main-overlay" class="overlay" v-if="displayMainOverlay"></div>

    </div>
  </v-app>
</template>

<script>
  import Header from '~/components/shared/user-header.vue';
  import Footer from '~/components/shared/footer.vue';
  import { mapState } from 'vuex';

  export default {
    components: {
      Header,
      Footer
    },
    computed: {
      ...mapState({
        displayMainOverlay: 'displayMainOverlay'
      })
    },
    mounted: function () {
      this.$store.dispatch('users/endEditSectionSession');
    }
  }
</script>
