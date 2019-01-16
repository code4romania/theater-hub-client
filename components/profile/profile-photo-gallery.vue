<template>
    <v-layout row wrap>
        <v-flex xs12 mb-3>
            <dropzone id="photo-gallery-dropzone" ref="photoGalleryDropzone"
                :options="photoGalleryDropzoneOptions" :destroyDropzone="true" :duplicateCheck="true"
                width="200px" height="80px">
                <div class="dz-message" data-dz-message><span>Click or drop files here</span></div>
            </dropzone>
        </v-flex>
    </v-layout>
</template>


<script>
    import Dropzone from 'nuxt-dropzone';
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
                    photoGalleryDropzoneOptions: {
                        url: '/',
                        maxFilesize: 2,
                        addRemoveLinks: true,
                        acceptedMimeTypes: 'image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon',
                        initializePhotoGallery: (dropzone) => {
                            this.profilePhotoGallery.photoGallery.forEach(photo => {
                                var fileSize = atob(photo.Image).length;
                                var file     = { url: `data:image/;base64,${photo.Image}`, size: fileSize, upload: { uuid: photo.ID } };
                                dropzone.emit('addedfile', file);
                                dropzone.emit('thumbnail', file, file.url);
                                dropzone.createThumbnailFromUrl(file, file.url, null, null);
                                dropzone.emit('complete', file);
                                dropzone.files.push(file);
                            });
                        },
                        thumbnailEventHandler: (dataUrl, id) => {
                            var ids = this.profilePhotoGallery.photoGallery.map(p => p.ID);

                            if (ids.indexOf(id) !== -1) {
                                return;
                            }

                            this.profilePhotoGallery.photoGallery.push({
                                'Image': dataUrl.replace('data:image/png;base64,', ''),
                                'ID': id
                            });
                        },
                        removedfileEventHandler: (file) => {
                            this.profilePhotoGallery.photoGallery = this.profilePhotoGallery.photoGallery.filter(p => p.ID !== file.upload.uuid);
                        },
                        init: function () {
                            this.on('thumbnail', (file, dataUrl) => {
                                this.options.thumbnailEventHandler(dataUrl, file.upload.uuid);
                            });

                            this.on('removedfile', (file) => {
                                this.options.removedfileEventHandler(file);
                            });

                            this.options.initializePhotoGallery(this);
                        }
                    }
                };
            },
            methods: {
                updateProfilePhotoGalleryModel: function () {
                    this.$emit('updateProfilePhotoGallery', this.profilePhotoGalleryModel);
                }
            }
    }
</script>

<style lang="scss" scoped>

</style>
