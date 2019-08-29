<template>
  <section class="privacy-policy">
    <v-container fluid privacy-policy-container class="mt-5 pa-5">
        <v-layout row wrap>
            <v-flex mb-3>
                <h1 class="page-title">{{ $t('pages.privacy-policy.title') }}</h1>
            </v-flex>
            <v-flex xs12 class="privacy-policy-text">
                <pre v-if="isRoLanguage">
                
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie, dui et viverra luctus, urna massa lobortis dui, vel lacinia metus ipsum egestas mauris. Aliquam imperdiet quam eget posuere vulputate. Nunc molestie dignissim dapibus. Aenean laoreet condimentum justo, id finibus nunc luctus ut. Fusce diam ipsum, convallis ac tincidunt eget, finibus vitae ipsum. Vestibulum accumsan nulla eget mi tempor, eget pulvinar elit tincidunt. Ut a euismod nunc. Vivamus non posuere risus. Suspendisse eget nunc imperdiet arcu tincidunt hendrerit blandit quis sem. Quisque eget tellus ut quam dapibus pellentesque non a neque. Duis placerat, enim ut bibendum maximus, nunc lectus sodales mi, sit amet volutpat neque ante viverra dui. 

            </pre>

            <pre v-if="!isRoLanguage">
                
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie, dui et viverra luctus, urna massa lobortis dui, vel lacinia metus ipsum egestas mauris. Aliquam imperdiet quam eget posuere vulputate. Nunc molestie dignissim dapibus. Aenean laoreet condimentum justo, id finibus nunc luctus ut. Fusce diam ipsum, convallis ac tincidunt eget, finibus vitae ipsum. Vestibulum accumsan nulla eget mi tempor, eget pulvinar elit tincidunt. Ut a euismod nunc. Vivamus non posuere risus. Suspendisse eget nunc imperdiet arcu tincidunt hendrerit blandit quis sem. Quisque eget tellus ut quam dapibus pellentesque non a neque. Duis placerat, enim ut bibendum maximus, nunc lectus sodales mi, sit amet volutpat neque ante viverra dui.

            </pre>
            </v-flex>
        </v-layout>
    </v-container>
  </section>
</template>

<script>

    import { mapGetters } from 'vuex';
    import { LocaleType } from '~/store/entities';

    export default {
        layout: ({ store }) => {
            if (!store.getters['authentication/isAuthenticated']) {
                return 'visitor';
            } else if (store.getters['users/isAdmin']) {
                return 'administration';
            } else {
                return 'user';
            }
        },
        computed: {
            ...mapGetters({
                locale: 'locale'
            }),
            isRoLanguage: function () {
                return this.locale && this.locale === LocaleType.RO;
            }
        }
    }

</script>

<style lang="scss" scoped>

    .privacy-policy-text pre {
        font-family: Titillium Web;
        font-size: 16px;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
    }

</style>
