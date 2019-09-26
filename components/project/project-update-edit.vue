<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-form ref="updatesForm">
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12  class="project-row-actions">
                        <v-btn outline small fab
                            class="done-edit-update-button"
                            v-on:click="onDoneEditUpdateClick"
                            :disabled="isUpdateButtonDisabled()">
                                <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab
                            class="cancel-edit-update-button"
                            v-on:click="onCancelEditUpdateClick">
                                <v-icon>clear</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 mt-3 class="project-focused-row">
                        <v-textarea
                            class="update-description-field text-area-field"
                            v-model="updatesFactory.Description"
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
    import { mapGetters } from 'vuex';

    export default {
        props: ['update', 'index'],
        data: function () {
            return {
                descriptionRules: [
                    v => v === '' || v.length <= 500 || this.$t('fields.update.description.validation-errors.length')
                ],
                updatesFactory: {
                    ...this.update
                }
            };
        },
        methods: {
            isUpdateValid: function (update) {
                return update.Description !== '' && update.Description.length <= 500;
            },
            isUpdateButtonDisabled: function () {
                return !this.isUpdateValid(this.updatesFactory);
            },
            onCancelEditUpdateClick: function () {
                this.$emit('editUpdate', null);
            },
            onDoneEditUpdateClick: function () {
                var isCurrentUpdateValid = this.isUpdateValid(this.updatesFactory);

                if (!isCurrentUpdateValid) {
                    return;
                }

                this.$emit('editUpdate', this.updatesFactory, this.index);
            }
        },
        computed: {
            ...mapGetters({
                locale: 'locale'
            })
        }
    }
</script>

<style lang="scss" scoped>

    .v-menu__activator > .v-text-field {
        overflow-x: hidden;
    }

</style>
