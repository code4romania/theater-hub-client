<template>
    <v-layout row wrap>
        <v-flex xs12 mt-5>
            <v-flex xs12 :key="i" v-for="(video, i) in profileVideoGalleryModel.videoGallery">
                <v-layout row wrap mt-3 ma-1 pa-5 v-bind:class="{'editing-profile-row': video.inEditMode}" class="elevation-1">
                    <v-layout xs12 class="video-link-row profile-focused-row">
                        <v-flex xs10>
                            <v-text-field v-model="video.link" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs2 class="profile-row-actions">
                            <v-btn outline small fab class="edit-icon" v-on:click="onEditVideoClick(video, i)">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn outline small fab class="remove-icon" v-on:click="onRemoveVideoClick(i)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <v-flex xs12>
                        <iframe v-if="video.isValid" :src="video.embedLink" width="420" height="315" allowfullscreen></iframe>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-flex>
        <v-flex xs12 elevation-3 pa-5 ma-1>
            <v-flex xs12 sm12 md12 lg12  class="profile-row-actions" v-if="videosFactory.inEditMode">
                <v-btn outline small fab class="edit-video-button" v-on:click="onDoneEditVideoClick" :disabled="isAddVideoButtonDisabled()">
                    <v-icon>done</v-icon>
                </v-btn>
                <v-btn outline small fab class="edit-video-button" v-on:click="onCancelEditVideoClick">
                    <v-icon>clear</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs12>
                Please provide links from Youtube or Vimeo.
            </v-flex>
            <v-flex xs12 mt-3 class="video-link-row profile-focused-row">
                <v-text-field
                    v-model="videosFactory.link"
                    :rules="videoLinkRules"
                    label="Video link"
                    v-on:change="onVideoLinkChange()"
                    validate-on-blur required>
                </v-text-field>
            </v-flex>
            <v-flex xs12>
                <iframe v-if="videosFactory.isValid" :src="videosFactory.embedLink" width="420" height="315" allowfullscreen></iframe>
            </v-flex>
            <v-flex xs12 mt-5 v-if="!videosFactory.inEditMode">
                <v-btn v-on:click="onAddVideoClick" :disabled="isAddVideoButtonDisabled()" block class="add-video-button">
                    Add video link
                </v-btn>
            </v-flex>
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
                        v => !v || (!!v && SocialMediaManager.isVideoValid(v)) || 'Video link is not a valid Youtube or Vimeo link'
                    ],
                    videosFactory: {
                        link: '',
                        embedLink: '',
                        isValid: false,
                        index: null,
                        inEditMode: false
                    }
                };
            },
            methods: {
                updateProfileVideoGalleryModel: function () {
                    this.$emit('updateProfileVideoGallery', this.profileVideoGalleryModel);
                },
                onEditVideoClick: function (video, index) {
                    this.videosFactory = {
                        ...video,
                        index,
                        inEditMode: true
                    };

                    video.inEditMode = true;
                    this.updateProfileVideoGalleryModel();
                },
                onCancelEditVideoClick: function () {
                    this.profileVideoGalleryModel.videoGallery[this.videosFactory.index].inEditMode = false;

                    this.updateProfileVideoGalleryModel();

                    this.resetVideosFactory();
                },
                onDoneEditVideoClick: function () {
                    var isCurrentVideoValid = SocialMediaManager.isVideoValid(this.videosFactory.link);

                    if (!isCurrentVideoValid) {
                        return;
                    }

                    this.profileVideoGalleryModel.videoGallery[this.videosFactory.index] = {
                        link: this.videosFactory.link,
                        embedLink: this.videosFactory.embedLink,
                        isValid: true,
                        inEditMode: false
                    };
                    this.updateProfileVideoGalleryModel();

                    this.resetVideosFactory();
                },
                onRemoveVideoClick: function (index) {
                    this.profileVideoGalleryModel.videoGallery.splice(index, 1);

                    this.updateProfileVideoGalleryModel();
                },
                onAddVideoClick: function () {
                    var isCurrentVideoValid = SocialMediaManager.isVideoValid(this.videosFactory.link);

                    if (!isCurrentVideoValid) {
                        return;
                    }

                    this.profileVideoGalleryModel.videoGallery.push({...this.videosFactory});

                    this.resetVideosFactory();

                    this.updateProfileVideoGalleryModel();
                },
                onVideoLinkChange: function () {
                    if (SocialMediaManager.isValidURL(this.videosFactory.link, SocialMediaCategoryType.Youtube)) {
                        this.videosFactory.isValid   = true;
                        this.videosFactory.embedLink = SocialMediaManager.extractYoutubeEmbedURL(this.videosFactory.link);
                        return
                    } else if (SocialMediaManager.isValidURL(this.videosFactory.link, SocialMediaCategoryType.Vimeo)) {
                        this.videosFactory.isValid   = true;
                        this.videosFactory.embedLink = SocialMediaManager.extractVimeoEmbedURL(this.videosFactory.link);
                        return;
                    }

                    this.videosFactory.isValid   = false;
                    this.videosFactory.embedLink = '';
                },
                isAddVideoButtonDisabled: function () {
                    return !SocialMediaManager.isVideoValid(this.videosFactory.link);
                },
                resetVideosFactory: function () {
                    this.videosFactory = {
                        link: '',
                        embedLink: '',
                        isValid: false,
                        index: null,
                        inEditMode: false
                    };
                }
            }
    }
</script>

<style lang="scss" scoped>



</style>
