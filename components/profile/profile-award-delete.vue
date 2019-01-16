<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-layout row>
                <v-flex xs12 sm12 md12 lg12  class="profile-row-actions">
                    <v-btn outline small fab class="done-delete-award-button" v-on:click="onDoneDeleteAwardClick">
                        <v-icon>done</v-icon>
                    </v-btn>
                    <v-btn outline small fab class="cancel-delete-award-button" v-on:click="onCancelDeleteAwardClick">
                        <v-icon>clear</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout row>
                Are you sure you wish to delete this award?
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        props: ['index'],
        methods: {
            onCancelDeleteAwardClick: function () {
                this.$emit('deleteAward', null);
            },
            onDoneDeleteAwardClick: function () {
                this.$emit('deleteAward', this.index);
            }
        }
    }
</script>
