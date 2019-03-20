<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-form ref="addVideoForm">
                <v-flex xs12 sm12 md12 lg12  class="profile-row-actions" v-if="videosFactory.inEditMode">
                    <v-btn outline small fab class="done- edit-video-button"
                                    v-on:click="onDoneEditVideoClick" :disabled="isAddVideoButtonDisabled()">
                        <v-icon>done</v-icon>
                    </v-btn>
                    <v-btn outline small fab class="cancel-edit-video-button" v-on:click="onCancelEditVideoClick">
                        <v-icon>clear</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs12>
                    {{ $t('shared.content.video-message') }}
                </v-flex>
                <v-flex xs12 mt-3 class="video-link-row profile-focused-row">
                    <v-text-field
                        v-model="videosFactory.link"
                        :rules="videoLinkRules"
                        :label="$t('fields.video.label')"
                        v-on:change="onVideoLinkChange()"
                        validate-on-blur required>
                    </v-text-field>
                </v-flex>
                <v-flex xs12>
                    <iframe v-if="videosFactory.isValid" :src="videosFactory.embedLink" width="420" height="315" allowfullscreen></iframe>
                </v-flex>
            </v-form>
        </v-flex>
    </v-layout>
</template>


<script>
    import { SocialMediaManager } from '~/utils';
    import { SocialMediaCategoryType } from '~/store/entities';

    export default {
            props: ['video', 'index'],
            data: function () {
                return {
                    videoLinkRules: [
                        v => !v || (!!v && SocialMediaManager.isVideoValid(v)) || this.$t('fields.video.validation-errors.invalid')
                    ],
                    videosFactory: {
                        ...this.video,
                        embedLink: SocialMediaManager.extractEmbedURLFromUnknownProvider(this.video.link),
                        isValid: true
                    }
                };
            },
            methods: {
                onCancelEditVideoClick: function () {
                    this.$emit('editVideo', null);
                },
                onDoneEditVideoClick: function () {
                    var isCurrentVideoValid = SocialMediaManager.isVideoValid(this.videosFactory.link);

                    if (!isCurrentVideoValid) {
                        return;
                    }

                    this.$emit('editVideo', this.videosFactory, this.index);
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
                }
            }
    }
</script>