<template>
    <v-layout row wrap>
        <v-flex xs6 class="mb-3 pr-2">
            <v-text-field v-model="profileSocialMediaModel.instagramLink" @input="updateProfileSocialMediaModel"
                            :rules="instagramLinkRules" :label="$t('fields.instagram.label')"></v-text-field>
        </v-flex>
        <v-flex xs6 class="mb-3 pl-2">
            <v-text-field v-model="profileSocialMediaModel.youtubeLink" @input="updateProfileSocialMediaModel"
                            :rules="youtubeLinkRules" :label="$t('fields.youtube.label')"></v-text-field>
        </v-flex>
        <v-flex xs6 class="mb-3 pr-2">
            <v-text-field v-model="profileSocialMediaModel.facebookLink" @input="updateProfileSocialMediaModel"
                            :rules="facebookLinkRules" :label="$t('fields.facebook.label')"></v-text-field>
        </v-flex>
        <v-flex xs6 class="mb-3 pl-2">
            <v-text-field v-model="profileSocialMediaModel.linkedinLink" @input="updateProfileSocialMediaModel"
                            :rules="linkedinLinkRules" :label="$t('fields.linkedin.label')"></v-text-field>
        </v-flex>
    </v-layout>
</template>


<script>
    import { SocialMediaManager, Helpers } from '~/utils';
    import { SocialMediaCategoryType } from '~/store/entities';

    export default {
            props: ['profileSocialMedia'],
            data: function () {
                return {
                    profileSocialMediaModel: Helpers.cloneObject(this.profileSocialMedia),
                    instagramLinkRules: [
                        v => v === '' || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Instagram) || this.$t('fields.instagram.validation-errors.invalid')
                    ],
                    youtubeLinkRules: [
                        v => v === '' || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Youtube) || this.$t('fields.youtube.validation-errors.invalid')
                    ],
                    facebookLinkRules: [
                        v => v === '' || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Facebook) || this.$t('fields.facebook.validation-errors.invalid')
                    ],
                    linkedinLinkRules: [
                        v => v === '' || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Linkedin) || this.$t('fields.linkedin.validation-errors.invalid')
                    ]
                };
            },
            methods: {
                updateProfileSocialMediaModel: function () {
                    this.$emit('updateProfileSocialMedia', this.profileSocialMediaModel);
                }
            }
    }
</script>

<style lang="scss" scoped>

</style>