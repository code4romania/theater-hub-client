<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-layout row>
                <v-flex xs12 sm12 md12 lg12  class="profile-row-actions">
                    <v-btn outline small fab class="done-delete-education-step-button" v-on:click="onDoneDeleteEducationStepClick">
                        <v-icon>done</v-icon>
                    </v-btn>
                    <v-btn outline small fab class="cancel-delete-education-step-button" v-on:click="onCancelDeleteEducationStepClick">
                        <v-icon>clear</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout row>
                Are you sure you wish to delete this education step?
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        props: ['index'],
        methods: {
            onCancelDeleteEducationStepClick: function () {
                this.$emit('deleteEducationStep', null);
            },
            onDoneDeleteEducationStepClick: function () {
                this.$emit('deleteEducationStep', this.index);
            }
        }
    }
</script>
