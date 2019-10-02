<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-form ref="educationForm">
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12  class="profile-row-actions">
                        <v-btn outline small fab class="done-edit-education-step-button"
                                    v-on:click="onDoneEditEducationStepClick" :disabled="isEducationStepButtonDisabled()">
                            <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab class="cancel-edit-education-step-button" v-on:click="onCancelEditEducationStepClick">
                            <v-icon>clear</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap mt-2>
                    <v-flex xs12 sm6 md6 lg3 class="pr-2">
                        <v-text-field v-model="educationFactory.title" :rules="educationTitleRules"
                                :label="`${$t('fields.education.title.label')}*`" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="px-2">
                        <v-text-field v-model="educationFactory.institutionName" :rules="institutionNameRules"
                                    :label="`${$t('fields.education.institution.label')}*`" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="px-2">
                        <v-menu
                            content-class="date-picker-menu"
                            :close-on-content-click="false" v-model="educationFactory.isStartDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="educationFactory.startDate"
                                    :label="$t('fields.education.start-date.label')" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker
                                v-model="educationFactory.startDate"
                                type="month"
                                :locale="locale"
                                @input="educationFactory.isStartDateMenuOpen = false">
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="date-menu-container px-2">
                        <v-menu
                            content-class="date-picker-menu"
                            :close-on-content-click="false" v-model="educationFactory.isEndDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="educationFactory.endDate"
                                    :label="$t('fields.education.end-date.label')" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker
                                v-model="educationFactory.endDate"
                                type="month"
                                :locale="locale"
                                @input="educationFactory.isEndDateMenuOpen = false">
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-textarea
                        class="education-step-description-field text-area-field"
                        v-model="educationFactory.description"
                        auto-grow
                        box
                        :label="$t('fields.education.description.label')"
                        rows="1"
                        counter=500
                        :rules="descriptionRules" validate-on-blur>
                    </v-textarea>
                </v-layout>
            </v-form>
        </v-flex>
    </v-layout>
</template>


<script>
    import { mapGetters } from 'vuex';

    export default {
            props: ['educationStep', 'index'],
            data: function () {
                return {
                    educationTitleRules: [
                        v => !!v || this.$t('fields.education.title.validation-errors.required')
                    ],
                    institutionNameRules: [
                        v => !!v || this.$t('fields.education.institution.validation-errors.required')
                    ],
                    descriptionRules: [
                        v => v === '' || v.length <= 500 || this.$t('fields.education.description.validation-errors.length')
                    ],
                    educationFactory: {
                        ...this.educationStep
                    }
                };
            },
            methods: {
                onCancelEditEducationStepClick: function () {
                    this.$emit('editEducationStep', null);
                },
                onDoneEditEducationStepClick: function () {
                    var isCurrentEducationStepValid = this.isEducationStepValid(this.educationFactory);

                    if (!isCurrentEducationStepValid) {
                        return;
                    }

                    this.$emit('editEducationStep', this.educationFactory, this.index);
                },
                isEducationStepValid: function (educationStep) {
                    return educationStep.title !== '' && educationStep.institutionName !== '';
                },
                isEducationStepButtonDisabled: function () {
                    return !this.isEducationStepValid(this.educationFactory);
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
