<template>
  <section class="terms-and-conditions">
    <v-container
        terms-and-conditions-container
        class="main-container"
    >
        <v-layout row wrap>
            <v-flex mb-3>
                <h1 class="page-title">{{ $t('pages.terms-and-conditions.title') }}</h1>
            </v-flex>
            <v-flex xs12 class="terms-and-conditions-text">
                <p>{{ $t('pages.terms-and-conditions.content-general-text1') }}</p>
                <p>{{ $t('pages.terms-and-conditions.content-general-text2') }}</p>
                <p>{{ $t('pages.terms-and-conditions.content-general-text3') }}</p>

                <h2 class="terms-and-conditions-subtitle">{{ $t('pages.terms-and-conditions.content-objective1-title') }}</h2>
                <p>{{ $t('pages.terms-and-conditions.content-objective1-text') }}</p>

                <h2 class="terms-and-conditions-subtitle">{{ $t('pages.terms-and-conditions.content-objective2-title') }}</h2>
                <p class="terms-and-conditions-paragraph">{{ $t('pages.terms-and-conditions.content-objective2-text1') }}</p>
                <ul>
                    <li>{{ $t('pages.terms-and-conditions.content-objective2-li1') }}</li>
                    <li>{{ $t('pages.terms-and-conditions.content-objective2-li2') }}</li>
                    <li>{{ $t('pages.terms-and-conditions.content-objective2-li3') }}</li>
                </ul>
                <p>{{ $t('pages.terms-and-conditions.content-objective2-text2') }}</p>

                <h2 class="terms-and-conditions-subtitle">{{ $t('pages.terms-and-conditions.content-objective3-title') }}</h2>
                <p>{{ $t('pages.terms-and-conditions.content-objective3-text1') }}</p>

                <h2 class="terms-and-conditions-subtitle">{{ $t('pages.terms-and-conditions.content-objective4-title') }}</h2>
                <p class="terms-and-conditions-paragraph">{{ $t('pages.terms-and-conditions.content-objective4-text1') }}</p>
                <ul>
                    <li>{{ $t('pages.terms-and-conditions.content-objective4-li1') }}</li>
                    <li>{{ $t('pages.terms-and-conditions.content-objective4-li2') }}</li>
                    <li>{{ $t('pages.terms-and-conditions.content-objective4-li3') }}</li>
                    <li>{{ $t('pages.terms-and-conditions.content-objective4-li41') }} <a href="https://www.dataprotection.ro/" target="_blank">www.dataprotection.ro</a>) {{ $t('pages.terms-and-conditions.content-objective4-li42') }}</li>
                </ul>
                <p>{{ $t('pages.terms-and-conditions.content-objective4-text2') }}</p>

                <h2 class="terms-and-conditions-subtitle">{{ $t('pages.terms-and-conditions.content-objective5-title') }}</h2>
                <p>{{ $t('pages.terms-and-conditions.content-objective5-text1') }}</p>
                <p>{{ $t('pages.terms-and-conditions.content-objective5-text2') }}</p>
                <p>{{ $t('pages.terms-and-conditions.content-objective5-text3') }}</p>
                <p>{{ $t('pages.terms-and-conditions.content-objective5-text4') }}</p>

                <h2 class="terms-and-conditions-subtitle">{{ $t('pages.terms-and-conditions.content-objective6-title') }}</h2>
                <p class="terms-and-conditions-paragraph">{{ $t('pages.terms-and-conditions.content-objective6-text') }}</p>
                <ul class="terms-and-conditions-ul">
                    <li>{{ $t('pages.terms-and-conditions.content-objective6-li1') }}</li>
                    <li>{{ $t('pages.terms-and-conditions.content-objective6-li2') }}</li>
                    <li>{{ $t('pages.terms-and-conditions.content-objective6-li3') }}</li>
                </ul>

                <h2 class="terms-and-conditions-subtitle">{{ $t('pages.terms-and-conditions.content-objective7-title') }}</h2>
                <p>{{ $t('pages.terms-and-conditions.content-objective7-text1') }}</p>
                <p>{{ $t('pages.terms-and-conditions.content-objective7-text2') }}</p>
                <p>{{ $t('pages.terms-and-conditions.content-objective7-text3') }} <a href = "mailto:contact@code4.ro">contact@code4.ro</a>.</p>

                <h2 class="terms-and-conditions-subtitle">{{ $t('pages.terms-and-conditions.content-objective8-title') }}</h2>
                <span v-if="isRoLanguage">
                    <p>{{ $t('pages.terms-and-conditions.content-objective8-text1') }} <a href="https://code4.ro/ro/codul-de-conduita/" target="_blank">codul de conduită</a>.</p>
                </span>
                <span v-if="!isRoLanguage">
                    <p>{{ $t('pages.terms-and-conditions.content-objective8-text1') }} <a href="https://code4.ro/ro/codul-de-conduita/" target="_blank">code of conduct</a>.</p>
                </span>
                <p>{{ $t('pages.terms-and-conditions.content-objective8-text2') }}</p>
                <p>{{ $t('pages.terms-and-conditions.content-objective8-text3') }}</p>
                <p>{{ $t('pages.terms-and-conditions.content-objective8-text4') }} <a href = "mailto:contact@code4.ro">contact@code4.ro</a></p>
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

    .terms-and-conditions-paragraph {
        margin-bottom: 0px;
    }

    .terms-and-conditions-ul {
        margin-bottom: 16px;
    }
    
    // .terms-and-conditions-text pre {
    //     font-family: Titillium Web;
    //     font-size: 16px;
    //     white-space: pre-wrap;
    //     white-space: -moz-pre-wrap;
    //     white-space: -pre-wrap;
    //     white-space: -o-pre-wrap;
    //     word-wrap: break-word;
    // }

    .terms-and-conditions-subtitle {
        font-size: 16px;
        color: #AE2760;
    }
</style>
