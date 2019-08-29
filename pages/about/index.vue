<template>
  <section class="about-section">
    <v-container about-container>
        <v-layout column>
            <v-flex mb-3>
                <h1 class="page-title">{{ $t('pages.about.title') }}</h1>
            </v-flex>
            <v-flex xs12 mt-3>
                {{ $t('pages.about.paragraph-1') }}
            </v-flex>
            <v-flex xs12 mt-3>
                {{ $t('pages.about.paragraph-2') }}
            </v-flex>
            <v-flex xs12 mt-3>
                {{ $t('pages.about.paragraph-3') }}
            </v-flex>
        </v-layout>
    </v-container>
  </section>
</template>

<script>

    export default {
        layout: ({ store }) => {
            if (!store.getters['authentication/isAuthenticated']) {
                return 'visitor';
            } else if (store.getters['users/isAdmin']) {
                return 'administration';
            } else {
                return 'user';
            }
        }
    }

</script>

<style lang="scss" scoped>

    .about-container {
        max-width: 1600px;
        padding: 40px 40px 0px 40px;
    }

</style>
