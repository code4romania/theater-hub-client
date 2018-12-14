<template>
    <v-layout row wrap>
        <v-flex xs6 class="mb-3 pr-2">
            <v-text-field v-model="profileSocialMediaModel.instagramLink" @input="updateProfileSocialMediaModel"
                                                                    :rules="instagramLinkRules" label="Instagram"></v-text-field>
        </v-flex>
        <v-flex xs6 class="mb-3 pl-2">
            <v-text-field v-model="profileSocialMediaModel.youtubeLink" @input="updateProfileSocialMediaModel"
                                                                            :rules="youtubeLinkRules" label="Youtube"></v-text-field>
        </v-flex>
        <v-flex xs6 class="mb-3 pr-2">
            <v-text-field v-model="profileSocialMediaModel.facebookLink" @input="updateProfileSocialMediaModel"
                                                                            :rules="facebookLinkRules" label="Facebook"></v-text-field>
        </v-flex>
        <v-flex xs6 class="mb-3 pl-2">
            <v-text-field v-model="profileSocialMediaModel.linkedinLink" @input="updateProfileSocialMediaModel"
                                                                        :rules="linkedinLinkRules" label="Linkedin"></v-text-field>
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
                        v => v === '' || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Instagram) || 'Invalid Instagram link'
                    ],
                    youtubeLinkRules: [
                        v => v === '' || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Youtube) || 'Invalid Youtube link'
                    ],
                    facebookLinkRules: [
                        v => v === '' || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Facebook) || 'Invalid Facebook link'
                    ],
                    linkedinLinkRules: [
                        v => v === '' || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Linkedin) || 'Invalid Linkedin link'
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