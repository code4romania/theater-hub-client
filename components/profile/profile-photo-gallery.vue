<template>
    <v-layout row wrap>
        <v-flex xs12 mb-3>
            <span class="field-title">Photo gallery</span>
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
                        maxFilesize: 1,
                        addRemoveLinks: true,
                        acceptedMimeTypes: 'image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon',
                        thumbnailEventHandler: (dataUrl, id) => {
                            this.profilePhotoGallery.photoGallery.push({
                                'Image': dataUrl,
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