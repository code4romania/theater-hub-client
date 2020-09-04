<template>
  <section class="privacy-policy">
    <v-container
        privacy-policy-container
        class="main-container"
    >
        <v-layout row wrap>
            <v-flex mb-3>
                <h1 class="page-title">{{ $t('pages.privacy-policy.title') }}</h1>
            </v-flex>

            <v-flex xs12 class="privacy-policy-text">
                <!-- <pre> -->
                <p>{{ $t('pages.privacy-policy.content-general-text1') }}</p>
                <p>{{ $t('pages.privacy-policy.content-general-text2') }}</p>
                <p>{{ $t('pages.privacy-policy.content-general-text3') }}</p>
                
                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy1-title') }}</h2>
                <p>{{ $t('pages.privacy-policy.content-privacy1-text1') }}</p>
                <p>{{ $t('pages.privacy-policy.content-privacy1-text2') }}</p>
                <p>{{ $t('pages.privacy-policy.content-privacy1-text3') }}</p>
                <p>{{ $t('pages.privacy-policy.content-privacy1-text4') }}</p>
                <p>{{ $t('pages.privacy-policy.content-privacy1-text5') }}</p>
                
                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy2-title') }}</h2>
                <p>{{ $t('pages.privacy-policy.content-privacy2-text1') }}</p>

                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy3-title') }}</h2>
                <p>{{ $t('pages.privacy-policy.content-privacy3-text1') }}</p>

                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy4-title') }}</h2>
                <p>{{ $t('pages.privacy-policy.content-privacy4-text1') }}</p>

                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy5-title') }}</h2>
                <p class="privacy-policy-paragraph">{{ $t('pages.privacy-policy.content-privacy5-text1') }}</p>
                <ul>
                    <li>{{ $t('pages.privacy-policy.content-privacy5-li1') }}</li>
                    <li>{{ $t('pages.privacy-policy.content-privacy5-li2') }}</li>
                </ul>
                <p>{{ $t('pages.privacy-policy.content-privacy5-text2') }}</p>

                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy6-title') }}</h2>
                <p>{{ $t('pages.privacy-policy.content-privacy6-text1') }}</p>

                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy7-title') }}</h2>
                <p>{{ $t('pages.privacy-policy.content-privacy7-text1') }}</p>

                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy8-title') }}</h2>
                <p>{{ $t('pages.privacy-policy.content-privacy8-text1') }}</p>

                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy9-title') }}</h2>
                <p>{{ $t('pages.privacy-policy.content-privacy9-text1') }}</p>

                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy10-title') }}</h2>
                <p>{{ $t('pages.privacy-policy.content-privacy10-text1') }}</p>
                <p>{{ $t('pages.privacy-policy.content-privacy10-text2') }}</p>
                
                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy11-title') }}</h2>
                <p>{{ $t('pages.privacy-policy.content-privacy11-text1') }}</p>
                <p>{{ $t('pages.privacy-policy.content-privacy11-text2') }}</p>
                <p>{{ $t('pages.privacy-policy.content-privacy11-text3') }}</p>

                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy12-title') }}</h2>
                <p>{{ $t('pages.privacy-policy.content-privacy12-text1') }}</p>
                <p>{{ $t('pages.privacy-policy.content-privacy12-text2') }}</p>

                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy13-title') }}</h2>
                <p class="privacy-policy-paragraph">{{ $t('pages.privacy-policy.content-privacy13-text1') }}</p>
                <ul>
                    <li>{{ $t('pages.privacy-policy.content-privacy13-li1') }}</li>
                    <li>{{ $t('pages.privacy-policy.content-privacy13-li2') }}</li>
                </ul>
                <p>{{ $t('pages.privacy-policy.content-privacy13-text2') }}</p>
                <p>{{ $t('pages.privacy-policy.content-privacy13-text3') }}</p>

                <h2 class="privacy-policy-subtitle">{{ $t('pages.privacy-policy.content-privacy14-title') }}</h2>
                <p>{{ $t('pages.privacy-policy.content-privacy14-text1') }}</p>
                <p>{{ $t('pages.privacy-policy.content-privacy14-text2') }}</p>
                <p>{{ $t('pages.privacy-policy.content-privacy14-text3') }}</p>
                <p>{{ $t('pages.privacy-policy.content-privacy14-text4') }} <a href="https://www.youronlinechoices.com/ro/" target="_blank">https://www.youronlinechoices.com/ro/</a></p>
                <!-- </pre> -->
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

    .privacy-policy-text {
        font-family: Titillium Web;
        font-size: 16px;
        word-wrap: break-word;  
    }

    .privacy-policy-paragraph {
        margin-bottom: 0px;
    }
    
    // .privacy-policy-text pre {
    //     font-family: Titillium Web;
    //     font-size: 16px;
    //     white-space: pre-wrap;
    //     white-space: -moz-pre-wrap;
    //     white-space: -pre-wrap;
    //     white-space: -o-pre-wrap;
    //     word-wrap: break-word;
    // }

    // .privacy-policy-paragraph-text {
    //     font-family: Titillium Web;
    //     font-size: 12px;
    //     white-space: pre-wrap;
    //     white-space: -moz-pre-wrap;
    //     white-space: -pre-wrap;
    //     white-space: -o-pre-wrap;
    //     word-wrap: break-word;
    // }

    .privacy-policy-subtitle {
        font-size: 16px;
        color: #AE2760;
    }
</style>
