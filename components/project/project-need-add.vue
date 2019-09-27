<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-form ref="needsForm">
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12  class="project-row-actions">
                        <v-btn outline small fab
                            class="done-add-need-button"
                            v-on:click="onDoneAddNeedClick"
                            :disabled="isAddNeedButtonDisabled()">
                                <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab
                            class="cancel-add-need-button"
                            v-on:click="onCancelAddNeedClick">
                                <v-icon>clear</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 mt-3 class="project-focused-row">
                        <v-textarea
                            class="need-description-field text-area-field"
                            v-model="needsFactory.Description"
                            auto-grow
                            box
                            :label="$t('fields.need.description.label')"
                            rows="1"
                            counter=500
                            :rules="descriptionRules" validate-on-blur>
                        </v-textarea>
                    </v-flex>
                    <v-flex xs12>
                        <v-checkbox
                            :key="index"
                            v-for="(tag, index) in projectNeedTags"
                            v-model="needsFactory.Tags"
                            :label="$t(`application-data.${tag.ID.toLowerCase()}`)"
                            :value="tag.ID"
                            class="tag-checkbox"
                        ></v-checkbox>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-flex>
    </v-layout>
</template>


<script>
    import { mapGetters } from 'vuex';

    export default {
        data: function () {
            return {
                descriptionRules: [
                    v => v === '' || v.length <= 500 || this.$t('fields.need.description.validation-errors.length')
                ],
                needsFactory: {
                    Description: '',
                    Tags: []
                }
            };
        },
        computed: {
            ...mapGetters({
                projectNeedTags: 'applicationData/projectNeedTags'
            })
        },
        methods: {
            isNeedValid: function (need) {
                return need.Description !== '' && need.Description.length <= 500;
            },
            isAddNeedButtonDisabled: function () {
                return !this.isNeedValid(this.needsFactory);
            },
            onCancelAddNeedClick: function () {
                this.$emit('addNeed', null);
            },
            onDoneAddNeedClick: function () {
                var isCurrentNeedValid = this.isNeedValid(this.needsFactory);

                if (!isCurrentNeedValid) {
                    return;
                }

                this.$emit('addNeed', this.needsFactory);
            }
        }
    }
</script>

<style lang="scss">

    [name="important-need-checkbox"] {
        margin-top: 0px;
        padding-top: 0px;
        max-width: 40px;
    }

    .important-need-label {
        cursor: pointer;
    }

    .tag-checkbox {
        display: inline-block;
        margin-right: 20px;
    }

</style>
