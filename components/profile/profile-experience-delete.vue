<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-layout row>
                <v-flex xs12 sm12 md12 lg12  class="profile-row-actions">
                    <v-btn outline small fab class="done-delete-experience-step-button" v-on:click="onDoneDeleteExperienceStepClick">
                        <v-icon>done</v-icon>
                    </v-btn>
                    <v-btn outline small fab class="cancel-delete-experience-step-button" v-on:click="onCancelDeleteExperienceStepClick">
                        <v-icon>clear</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout row>
                {{ $t('pages.profile.delete-experience-message') }}
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        props: ['index'],
        methods: {
            onCancelDeleteExperienceStepClick: function () {
                this.$emit('deleteExperienceStep', null);
            },
            onDoneDeleteExperienceStepClick: function () {
                this.$emit('deleteExperienceStep', this.index);
            }
        }
    }
</script>
