<template>
  <v-app>
    <div class="nuxt-wrapper">

      <Header />

      <main>
        <v-content>
          <v-container>
            <nuxt />
          </v-container>
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
    }
  }
</script>

<style>

  #logout-btn {
    cursor: pointer;
  }

  .header-name-container {
    max-width: 200px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

</style>
