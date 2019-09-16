<template>

    <v-layout row wrap align-center>
        <v-flex xs12 sm3 md3 lg3>
          <CommunityMember
            :member="member"
            :hasClickableSkills="false"
          />
        </v-flex>
        <v-flex xs12 sm9 md9 lg9>
            <v-layout>
                <v-flex xs12 pl-4>
                    <v-flex xs12 class="search-information-row">
                        <span class="full-name-field">{{ member.FullName }}</span>
                        <span
                            v-if="age"
                            class="name-separator">,</span>
                        <span
                            v-if="age"
                            class="age-field">{{ age }} {{ $t('shared.content.years-old') }}</span>
                    </v-flex>
                    <v-flex
                        v-if="member.Email"
                        xs12
                        class="search-information-row">
                            <span class="field-label">{{ $t('fields.email.label') }}: </span>
                            <span class="email-field">{{ member.Email }}</span>
                            <a class="email-icon" :href="`mailto:${member.Email}`">
                                <v-icon>email</v-icon>
                            </a>
                    </v-flex>
                    <v-flex
                        v-if="member.PhoneNumber"
                        xs12
                        class="search-information-row">
                            <span class="field-label">{{ $t('fields.phone-number.label') }}: </span>
                            <span class="phone-number-field">{{ member.PhoneNumber }}</span>
                            <a class="phone-icon" :href="`tel:${member.PhoneNumber}`">
                                <v-icon>phone</v-icon>
                            </a>
                    </v-flex>
                    <v-flex xs12 v-if="member.Website" class="search-information-row">
                        <span class="field-label">{{ $t('fields.website.label') }}: </span>
                        <a :href="member.Website" class="website-field" target="_blank">{{ member.Website }}</a>
                    </v-flex>
                    <v-flex mt-3 class="search-information-row">
                        <a v-if="member.FacebookLink" class="social-media-icon-wrapper" :href="member.FacebookLink" target="_blank">
                            <img class="social-media-icon" :src="require('~/assets/images/facebook.png')" />
                        </a>
                        <a v-if="member.InstagramLink" class="social-media-icon-wrapper" :href="member.InstagramLink" target="_blank">
                            <img class="social-media-icon" :src="require('~/assets/images/instagram.png')" />
                        </a>
                        <a v-if="member.LinkedinLink" class="social-media-icon-wrapper" :href="member.LinkedinLink" target="_blank">
                            <img class="social-media-icon" :src="require('~/assets/images/linkedin.png')" />
                        </a>
                        <a v-if="member.YoutubeLink" class="social-media-icon-wrapper" :href="member.YoutubeLink" target="_blank">
                            <img class="social-media-icon" :src="require('~/assets/images/youtube.png')" />
                        </a>
                    </v-flex>
                    <v-flex xs12 class="search-information-row">
                      <v-btn class="primary ml-0 view-profile-button"
                        small
                        nuxt :to="`/profile/${member.Username}`">
                          {{ $t('shared.content.view-profile-link') }}
                      </v-btn>
                    </v-flex>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>


</template>

<script>

    import moment from 'moment';
    import CommunityMember from '~/components/community/community-member.vue';

    export default {
        components: {
            CommunityMember
        },
        props: ['member'],
        computed: {
            age: function () {
                if (!this.member.BirthDate) {
                    return null;
                }

                var currentDateMoment = moment(new Date());
                var birthDateMoment   = moment(this.member.BirthDate);
                return Math.floor(moment.duration(currentDateMoment.diff(birthDateMoment)).asYears());
            }
        }
    }

</script>


<style lang="scss" scoped>

    .full-name-field {
        font-size: 22px;
        font-weight: 700;
    }

    .age-field {
        font-size: 22px;
    }

    .email-icon, .phone-icon, .website-field {
        text-decoration: none;
    }

    .social-media-icon-wrapper {
        margin-right: 10px;
    }

    .view-profile-button {
        text-transform: initial;
        width: 50%;
        max-width: 200px;
    }
  
</style>
