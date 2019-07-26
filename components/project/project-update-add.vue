<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-form ref="updatesForm">
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12  class="project-row-actions">
                        <v-btn outline small fab
                            class="done-add-update-button"
                            v-on:click="onDoneAddUpdateClick"
                            :disabled="isUpdateButtonDisabled()">
                                <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab
                            class="cancel-add-update-button"
                            v-on:click="onCancelAddUpdateClick">
                                <v-icon>clear</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 mt-3 class="project-focused-row">
                        <v-textarea
                            class="update-description-field text-area-field"
                            v-model="updatesFactory.description"
                            auto-grow
                            box
                            :label="$t('fields.update.description.label')"
                            rows="1"
                            counter=500
                            :rules="descriptionRules" validate-on-blur>
                        </v-textarea>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-flex>
    </v-layout>
</template>


<script>
    export default {
        data: function () {
            return {
                descriptionRules: [
                    v => v === '' || v.length <= 500 || this.$t('fields.update.description.validation-errors.length')
                ],
                updatesFactory: {
                    description: ''
                }
            };
        },
        methods: {
            isUpdateValid: function (update) {
                return update.description !== '' && update.description.length <= 500;
            },
            isUpdateButtonDisabled: function () {
                return !this.isUpdateValid(this.updatesFactory);
            },
            onCancelAddUpdateClick: function () {
                this.$emit('addUpdate', null);
            },
            onDoneAddUpdateClick: function () {
                var isCurrentUpdateValid = this.isUpdateValid(this.updatesFactory);

                if (!isCurrentUpdateValid) {
                    return;
                }

                this.$emit('addUpdate', this.updatesFactory);
            }
        }
    }
</script>
