<template>
    <v-layout row wrap align-center>
        <v-flex xs12 sm3 md3 lg3>
            <v-layout column justify-center class="text-xs-center">
                <v-flex xs12 class="project-image-container">
                    <nuxt-link :to="`/project/${project.ID}`">
                        <v-avatar size="160px">
                            <img :src="require('~/assets/images/default-project-hero.jpg')" v-if="!project.Image" />
                            <img :src="project.Image" v-if="project.Image" />
                        </v-avatar>
                    </nuxt-link>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 sm9 md9 lg9>
            <v-layout>
                <v-flex xs12 pl-4>
                    <v-flex xs12 class="search-information-row">
                        <span class="project-name-field">{{ project.Name }}</span>
                    </v-flex>
                    <v-flex xs12 class="search-information-row">
                        <span class="field-label">{{ $t('pages.project.initiator') }} </span>
                        <span>{{ project.InitiatorName }} </span>
                    </v-flex>
                    <v-flex xs12 class="search-information-row">
                        <span class="field-label">{{ $t('pages.project.start-date') }} </span>
                        <span>{{ getFormattedDate(project.Date) }} </span>
                    </v-flex>
                    <v-flex xs12 class="search-information-row">
                        <span class="field-label">{{ $t('pages.project.city') }} </span>
                        <span>{{ project.City }} </span>
                    </v-flex>
                    <v-flex xs12 class="search-information-row">
                        <span class="field-label">{{ $t('pages.project.budget') }} </span>
                        <span>{{ project.Budget }} {{ currencies[project.Currency].ID }} </span>
                    </v-flex>
                    <v-flex xs12 class="search-information-row">
                      <v-btn class="primary ml-0 view-project-button"
                        small
                        nuxt :to="`/project/${project.ID}`">
                          {{ $t('shared.content.view-project-link') }}
                      </v-btn>
                    </v-flex>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import moment from 'moment';
    import { mapGetters } from 'vuex';

    export default {
        props: ['project'],
        methods: {
            getFormattedDate (date) {
                return moment(date).locale(this.locale).format('LL');
            }
        },
        computed: {
            ...mapGetters({
                locale: 'locale',
                currencies: 'applicationData/currencies'
            })
        }
    }

</script>

<style lang="scss" scoped>

    .project-name-field {
        font-size: 22px;
        font-weight: 700;
    }

    .view-project-button {
        text-transform: initial;
        width: 50%;
        max-width: 200px;
    }

    .project-image-container img {
        border: 8px solid rgba(151, 151, 151, 0.6);
    }
  
</style>
