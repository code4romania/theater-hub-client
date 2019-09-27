<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-form ref="needsForm">
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12  class="project-row-actions">
                        <v-btn outline small fab
                            class="done-edit-need-button"
                            v-on:click="onDoneEditNeedClick"
                            :disabled="isNeedButtonDisabled()">
                                <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab
                            class="cancel-edit-need-button"
                            v-on:click="onCancelEditNeedClick">
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
        props: ['need', 'index'],
        data: function () {
            return {
                descriptionRules: [
                    v => v === '' || v.length <= 500 || this.$t('fields.need.description.validation-errors.length')
                ],
                needsFactory: {
                    ...this.need,
                    Tags: this.need.Tags.map(t => t.ID)
                }
            };
        },
        methods: {
            isNeedValid: function (need) {
                return need.Description !== '' && need.Description.length <= 500;
            },
            isNeedButtonDisabled: function () {
                return !this.isNeedValid(this.needsFactory);
            },
            onCancelEditNeedClick: function () {
                this.$emit('editNeed', null);
            },
            onDoneEditNeedClick: function () {
                var isCurrentNeedValid = this.isNeedValid(this.needsFactory);

                if (!isCurrentNeedValid) {
                    return;
                }

                this.$emit('editNeed', this.needsFactory, this.index);
            }
        },
        computed: {
            ...mapGetters({
                locale: 'locale',
                projectNeedTags: 'applicationData/projectNeedTags'
            })
        }
    }
</script>

<style lang="scss">

    [name="important-need-checkbox"] {
        margin-top: 0px;
        padding-top: 0px;
        max-width: 40px;
    }

    .v-menu__activator > .v-text-field {
        overflow-x: hidden;
    }

    .important-need-checkbox-label {
        cursor: pointer;
    }

</style>
