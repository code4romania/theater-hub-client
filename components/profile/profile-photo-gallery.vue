<template>
    <v-layout row wrap>
        <v-flex xs12 mb-3>
            <dropzone id="photo-gallery-dropzone" ref="photoGalleryDropzone"
                :options="photoGalleryDropzoneOptions"
                :destroyDropzone="true"
                :duplicateCheck="true"
                width="200px" height="80px">
                <div class="dz-message" data-dz-message><span>{{ $t('fields.photo-dropzone.label') }}</span></div>
                <div
                    v-if="this.profilePhotoGallery.photoGallery.length !== 0"
                    class="add-images-item"
                >
                    <span>{{ $t('fields.photo-dropzone.label') }}</span>
                </div>
            </dropzone>
        </v-flex>
    </v-layout>
</template>


<script>
    import Dropzone from 'nuxt-dropzone';
    import { mapGetters } from 'vuex';
    import 'nuxt-dropzone/dropzone.css';
    import { Helpers } from '~/utils';

    export default {
            components: {
                Dropzone
            },
            props: ['profilePhotoGallery'],
            data: function () {
                return {
                    profilePhotoGalleryModel: Helpers.cloneObject(this.profilePhotoGallery),
                    totalFileSize: 0,
                    photoGalleryDropzoneOptions: {
                        url: '/',
                        maxFilesize: 5,
                        maxFiles: 10,
                        thumbnailHeight: 200,
                        createImageThumbnails: true,
                        addRemoveLinks: true,
                        autoProcessQueue: false,
                        dictRemoveFile: this.$t('fields.photo-dropzone.photo-remove-button'),
                        dictMaxFilesExceeded: this.$t('fields.photo-dropzone.validation-errors.count'),
                        acceptedMimeTypes: 'image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon',
                        initializePhotoGallery: (dropzone) => {
                            this.profilePhotoGallery.photoGallery.forEach(photo => {
                                var file     = { url: photo.ThumbnailLocation, size: photo.Size * 1000 * 1000, upload: { uuid: photo.ID } };
                                dropzone.emit('addedfile', file);
                                dropzone.emit('thumbnail', file, file.url);
                                dropzone.createThumbnailFromUrl(file, file.url, null, null);
                                dropzone.emit('complete', file);
                                dropzone.files.push(file);

                                this.totalFileSize += photo.Size;
                            });
                        },
                        addFileEventHandler: (file) => {
                            var ids = this.profilePhotoGallery.photoGallery.map(p => p.ID);
                            var fileSize = file.size / (1024 * 1024);

                            if (ids.indexOf(file.upload.uuid) !== -1 ||
                                this.profilePhotoGallery.photoGallery.length >= this.photoGalleryDropzoneOptions.maxFiles ||
                                fileSize > this.photoGalleryDropzoneOptions.maxFilesize) {
                                return;
                            }

                            this.profilePhotoGallery.photoGallery.push({
                                'ID': file.upload.uuid,
                                'File': file
                            });
                        },
                        removedfileEventHandler: (file) => {
                            this.profilePhotoGallery.photoGallery = this.profilePhotoGallery.photoGallery.filter(p => p.ID !== file.upload.uuid);
                        },
                        init: function () {
                            this.on('addedfile', (file) => {
                                this.options.addFileEventHandler(file);
                            });

                            this.on('thumbnail', (file, dataUrl) => {
                                file.thumbnail = dataUrl;
                            });

                            this.on('removedfile', (file) => {
                                this.options.removedfileEventHandler(file);
                            });

                            this.on('sending', () => {
                                return false;
                            });

                            this.options.initializePhotoGallery(this);
                        },
                        resize: function (file, width, height) {
                            var trgWidth = this.options.thumbnailHeight * file.width / file.height;
                            var trgX = 0;

                            if (trgWidth  > this.options.thumbnailHeight * 3) {
                                trgX = (trgWidth - this.options.thumbnailHeight * 3) / 2;
                                trgWidth = this.options.thumbnailHeight * 3;
                            }

                            return {
                                srcWidth: file.width,
                                srcHeight: file.height,
                                trgX,
                                trgWidth,
                                trgHeight: this.options.thumbnailHeight
                            };
                        },
                        maxfilesreached: function () {
                            console.log('maxfilesreached');
                        },
                        maxfilesexceeded: function (file) {
                            console.log('maxfilesexceeded');
                        }
                    }
                };
            },
            methods: {
                updateProfilePhotoGalleryModel: function () {
                    this.$emit('updateProfilePhotoGallery', this.profilePhotoGalleryModel);
                }
            },
            computed: {
                ...mapGetters({
                    maxFileSize: 'applicationData/maxFileSize',
                    maxPhotoGalleryFileCount: 'applicationData/maxPhotoGalleryFileCount'
                })
            }
    }
</script>

<style lang="scss">

    #photo-gallery-dropzone {
        flex-wrap: wrap-reverse;
        flex-direction: row-reverse;

        .dz-progress {
            display: none;
        }

        .dz-image img  {
            height: 200px;
            object-fit: cover;
        }

        .add-images-item {
            width: 200px;
            height: 200px;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ae2760;
            color: #FFF;
            cursor: pointer;
            pointer-events: none;
            border-radius: 5px;
        }

    }

</style>
