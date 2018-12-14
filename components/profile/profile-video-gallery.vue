<template>
    <v-layout row wrap>
        <v-flex xs12 mt-5>
            <span class="field-title">Video gallery</span>
            <v-flex xs12 :key="i" v-for="(video, i) in profileVideoGalleryModel.videoGallery">
                <v-layout row wrap>
                    <v-flex xs12 class="video-link-row removable-row">
                        <v-text-field
                            v-model="video.link"
                            :rules="videoLinkRules"
                            label="Video link"
                            v-on:change="onVideoLinkChange(video)"
                            validate-on-blur required>
                        </v-text-field>

                        <v-icon
                            v-if="hasRemoveIcon(i)"
                            v-on:click="onRemoveVideoClick(i)"
                            class="remove-icon pl-3">
                            remove_circle
                        </v-icon>
                    </v-flex>
                    <v-flex xs12>
                        <iframe v-if="video.isValid" :src="video.embedLink" width="420" height="315" allowfullscreen></iframe>
                    </v-flex>
                    <v-flex xs12 py-4 class="separator-row">
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-flex>
        <v-flex xs12>
            <v-btn v-on:click="onAddVideoClick" :disabled="isAddVideoButtonDisabled()" block class="add-video-button">
                Add video link
            </v-btn>
        </v-flex>
    </v-layout>
</template>


<script>
    import { SocialMediaManager, Helpers } from '~/utils';
    import { SocialMediaCategoryType } from '~/store/entities';

    export default {
            props: ['profileVideoGallery'],
            data: function () {
                return {
                    profileVideoGalleryModel: Helpers.cloneObject(this.profileVideoGallery),
                    videoLinkRules: [
                        v => !v ||
                            (!!v && (SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Youtube) || SocialMediaManager.isValidURL(v, SocialMediaCategoryType.Vimeo))) ||
                            'Video link is invalid'
                    ]
                };
            },
            methods: {
                updateProfileVideoGalleryModel: function () {
                    this.$emit('updateProfileVideoGallery', this.profileVideoGalleryModel);
                },
                hasRemoveIcon: function (index) {
                    return index !== this.profileVideoGalleryModel.videoGallery.length - 1;
                },
                onRemoveVideoClick: function (index) {
                    this.profileVideoGalleryModel.videoGallery.splice(index, 1);

                    this.updateProfileVideoGalleryModel();
                },
                onAddVideoClick: function () {
                    var isCurrentVideoValid = SocialMediaManager.isVideoValid(this.profileVideoGalleryModel.videoGallery[this.profileVideoGalleryModel.videoGallery.length - 1].link);

                    if (!isCurrentVideoValid) {
                        return;
                    }

                    this.profileVideoGalleryModel.videoGallery.push({
                        link: '',
                        embedLink: '',
                        isValid: false
                    });
                },
                onVideoLinkChange: function (video) {
                    if (SocialMediaManager.isValidURL(video.link, SocialMediaCategoryType.Youtube)) {
                        video.isValid   = true;
                        video.embedLink = SocialMediaManager.extractYoutubeEmbedURL(video.link);
                        return
                    } else if (SocialMediaManager.isValidURL(video.link, SocialMediaCategoryType.Vimeo)) {
                        video.isValid   = true;
                        video.embedLink = SocialMediaManager.extractVimeoEmbedURL(video.link);
                        return;
                    }

                    video.isValid   = false;
                    video.embedLink = '';
                },
                isAddVideoButtonDisabled: function () {
                    return !SocialMediaManager.isVideoValid(this.profileVideoGalleryModel.videoGallery[this.profileVideoGalleryModel.videoGallery.length - 1].link);
                }
            }
    }
</script>

<style lang="scss" scoped>



</style>