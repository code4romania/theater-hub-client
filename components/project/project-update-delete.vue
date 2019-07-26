<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-layout row>
                <v-flex xs12 sm12 md12 lg12  class="profile-row-actions">
                    <v-btn outline small fab class="done-delete-need-button" v-on:click="onDoneDeleteUpdateClick">
                        <v-icon>done</v-icon>
                    </v-btn>
                    <v-btn outline small fab class="cancel-delete-need-button" v-on:click="onCancelDeleteUpdateClick">
                        <v-icon>clear</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout row>
                {{ $t('pages.project.delete-update-message') }}
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        props: ['index'],
        methods: {
            onCancelDeleteUpdateClick: function () {
                this.$emit('deleteUpdate', null);
            },
            onDoneDeleteUpdateClick: function () {
                this.$emit('deleteUpdate', this.index);
            }
        }
    }
</script>
