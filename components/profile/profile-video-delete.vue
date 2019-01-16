<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-layout row>
                <v-flex xs12 sm12 md12 lg12  class="profile-row-actions">
                    <v-btn outline small fab class="done-delete-video-button" v-on:click="onDoneDeleteVideoClick">
                        <v-icon>done</v-icon>
                    </v-btn>
                    <v-btn outline small fab class="cancel-delete-video-button" v-on:click="onCancelDeleteVideoClick">
                        <v-icon>clear</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout row>
                Are you sure you wish to delete this video?
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        props: ['index'],
        methods: {
            onCancelDeleteVideoClick: function () {
                this.$emit('deleteVideo', null);
            },
            onDoneDeleteVideoClick: function () {
                this.$emit('deleteVideo', this.index);
            }
        }
    }
</script>
