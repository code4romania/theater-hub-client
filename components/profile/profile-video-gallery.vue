<template>
    <v-layout row wrap>
        <v-flex xs12 pt-4 v-if="hasVideoGallery" class="video-gallery-row">
            <v-layout row wrap
                :key="`video-${videoIndex}`" v-for="(video, videoIndex) in videoGallery"
                @mouseover="video.isHovered = true"  @mouseout="video.isHovered = false">
                <v-layout row wrap v-if="!video.inEditMode && !video.inDeleteMode" class="profile-row-actions-container">
                    <v-flex xs12 sm10 md10 lg10 pa-1>
                        <iframe class="video-iframe" :src="video.embedLink" width="420" height="315" allowfullscreen></iframe>
                    </v-flex>
                    <v-flex xs12 sm2 md2 lg2 class="profile-row-actions" v-if="videoIndex === 0 || video.isHovered">
                        <v-btn outline small fab class="edit-icon" v-on:click="onEditVideoClick(video, videoIndex)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn outline small fab class="remove-icon" v-on:click="onDeleteVideoClick(video, videoIndex)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-flex xs12 class="elevation-2 edited-profile-section" v-if="video.inEditMode">
                    <ProfileVideoEdit :video="video" :index="videoIndex" @editVideo="editVideo" />
                </v-flex>
                <v-flex xs12 class="elevation-2 edited-profile-section" v-if="video.inDeleteMode">
                    <ProfileVideoDelete :index="videoIndex" @deleteVideo="deleteVideo"/>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 mt-4 pb-4 v-if="!hasVideoGallery" class="video-gallery-row">
            {{ $t('pages.profile.no-videos-description') }}
        </v-flex>
        <v-btn outline :light="false" class="add-video-btn add-entity-btn" v-if="!isAddingVideo" v-on:click.native="onAddVideoClick()">
            <v-icon>add</v-icon> {{ $t('shared.content.add-video-button') }}
        </v-btn>
        <v-card mt-4 class="elevation-2 timeline-message-card edited-profile-section" v-if="isAddingVideo">
            <ProfileVideoAdd @addVideo="addVideo"/>
        </v-card>
    </v-layout>
</template>

<script>
	import ProfileVideoAdd from '~/components/profile/profile-video-add.vue';
	import ProfileVideoEdit from '~/components/profile/profile-video-edit.vue';
    import ProfileVideoDelete from '~/components/profile/profile-video-delete.vue';
    import { Helpers, SocialMediaManager } from '~/utils';
    import { ProfileSectionType } from '~/store/entities';

    export default {
        components: {
            ProfileVideoAdd,
            ProfileVideoEdit,
            ProfileVideoDelete
        },
        props: ['videoGallery', 'saveChanges'],
		data: function () {
            return {
                editedVideoGallery: [...this.videoGallery],
                isAddingVideo: false,
                isEditingVideo: false,
                isDeletingVideo: false
            };
		},
		methods: {
            onAddVideoClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(true);
                this.cloneEditedVideoGallery();
                this.isAddingVideo = true;
            },
            onEditVideoClick: function (video, index) {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(true);
                this.cloneEditedVideoGallery();
                this.isEditingVideo = true;
                video.inEditMode = true;
            },
            onDeleteVideoClick: function (video, index) {
                this.cancelAllUnsavedChanges();
                this.initiateProfileSectionEditSession(true);
                this.cloneEditedVideoGallery();
                this.isDeletingVideo = true;
                video.inDeleteMode = true;
            },
            addVideo: function (video) {
                let newVideo = {};

                if (video) {
                    newVideo = {
                        link: video.link,
                        embedLink: SocialMediaManager.extractEmbedURLFromUnknownProvider(video.link),
                        isHovered: false,
                        inEditMode: false,
                        inDeleteMode: false
                    };
                }

                if (video && this.saveChanges) {
                    var request = {
                        Video: video.link
                    };

                    this.$store.dispatch('videos/create', request).then((response) => {
                        newVideo.id = this.$store.state.videos.newUserVideo.ID;

                        this.editedVideoGallery.push(newVideo);

                        this.updateVideoGallery();
                        this.showSnackbar(this.$t('pages.profile.snackbar-messages.update-video-gallery'));
                    });
                } else if (video) {
                    this.editedVideoGallery.push(newVideo);

                    this.updateVideoGallery();
                }

                this.isAddingVideo = false;
                this.endProfileSectionEditSession();
            },
            editVideo: function (video, index) {
                if (video && this.saveChanges) {
                    var request = {
                        ID: video.id,
                        Video: video.link
                    };

                    this.$store.dispatch('videos/update', request).then(() => {
                        this.editedVideoGallery[index].link = video.link;
                        this.editedVideoGallery[index].embedLink =
                                            SocialMediaManager.extractEmbedURLFromUnknownProvider(video.link);

                        this.updateVideoGallery();
                        this.showSnackbar(this.$t('pages.profile.snackbar-messages.update-video-gallery'));
                    });
                } else if (video) {
                        this.editedVideoGallery[index].link = video.link;
                        this.editedVideoGallery[index].embedLink = SocialMediaManager.extractEmbedURLFromUnknownProvider(video.link);

                        this.updateVideoGallery();
                }

                this.videoGallery.forEach(v => {
                    v.inEditMode = false;
                });
                this.isEditingVideo = false;
                this.endProfileSectionEditSession();
            },
            deleteVideo: function (index) {
                if (index !== null && this.saveChanges) {
                    var id = this.editedVideoGallery[index].id;

                    this.$store.dispatch('videos/delete', id).then(() => {
                        this.editedVideoGallery.splice(index, 1);

                        this.updateVideoGallery();
                        this.showSnackbar(this.$t('pages.profile.snackbar-messages.update-video-gallery'));
                    });
                } else if (index !== null) {
                    this.editedVideoGallery.splice(index, 1);
                    this.updateVideoGallery();
                }

                this.videoGallery.forEach(v => {
                    v.inDeleteMode = false;
                });
                this.isDeletingVideo = false;
                this.endProfileSectionEditSession();
            },
            cancelAllUnsavedChanges: function () {
                this.isAddingVideo               = false;
                this.isEditingVideo              = false;
                this.isDeletingVideo             = false;
                this.endProfileSectionEditSession();
            },
            cloneEditedVideoGallery: function () {
                this.editedVideoGallery = Helpers.cloneObject(this.videoGallery);
            },
            initiateProfileSectionEditSession: function (navigateToElement) {
                this.$emit('initiateProfileSectionEditSession', navigateToElement, ProfileSectionType.VideoGallery);
            },
            endProfileSectionEditSession: function () {
                this.$emit('endProfileSectionEditSession', ProfileSectionType.VideoGallery);
            },
            updateVideoGallery: function () {
                this.$emit('updateVideoGallery', this.editedVideoGallery);
            },
            showSnackbar: function (snackbarText) {
                this.$emit('showSnackbar', snackbarText);
            },
            hasVideoGallery: function () {
                return this.videoGallery.length !== 0;
            }
		}
    }

</script>

<style lang="scss" scoped>



</style>
