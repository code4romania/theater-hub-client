<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-form ref="experienceForm">
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12  class="profile-row-actions">
                        <v-btn outline small fab class="edit-experience-step-button"
                                    v-on:click="onDoneAddExperienceStepClick" :disabled="isExperienceStepButtonDisabled()">
                            <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab class="edit-experience-step-button" v-on:click="onCancelAddExperienceStepClick">
                            <v-icon>clear</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap mt-2>
                    <v-flex xs12 sm6 md6 lg3 class="pr-2">
                        <v-text-field v-model="experienceFactory.position" :rules="experiencePositionRules"
                                :label="`${$t('fields.experience.position.label')}*`" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="px-2">
                        <v-text-field v-model="experienceFactory.employerName" :rules="employerNameRules"
                            :label="`${$t('fields.experience.employer.label')}*`" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="date-menu-container px-2">
                        <v-menu
                            content-class="date-picker-menu"
                            :close-on-content-click="false" v-model="experienceFactory.isStartDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="experienceFactory.startDate"
                                :label="$t('fields.experience.start-date.label')" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker
                                v-model="experienceFactory.startDate"
                                type="month"
                                :locale="locale"
                                @input="experienceFactory.isStartDateMenuOpen = false">
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="date-menu-container px-2">
                        <v-menu
                            content-class="date-picker-menu"
                            :close-on-content-click="false" v-model="experienceFactory.isEndDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="experienceFactory.endDate"
                                :label="$t('fields.experience.end-date.label')" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker
                                v-model="experienceFactory.endDate"
                                type="month"
                                :locale="locale"
                                @input="experienceFactory.isEndDateMenuOpen = false">
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-textarea
                        class="experience-step-description-field text-area-field"
                        v-model="experienceFactory.description"
                        auto-grow
                        box
                        :label="$t('fields.experience.description.label')"
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
            data: function () {
                return {
                    experiencePositionRules: [
                        v => !!v || this.$t('fields.experience.position.validation-errors.required')
                    ],
                    employerNameRules: [
                        v => !!v || this.$t('fields.experience.employer.validation-errors.required')
                    ],
                    descriptionRules: [
                        v => v === '' || v.length <= 500 || this.$t('fields.experience.description.validation-errors.length')
                    ],
                    experienceFactory: {
                        position: '',
                        employerName: '',
                        description: '',
                        startDate: new Date().toISOString().substr(0, 7),
                        endDate: new Date().toISOString().substr(0, 7),
                        isValid: false,
                        isStartDateMenuOpen: false,
                        isEndDateMenuOpen: false
                    }
                };
            },
            methods: {
                onCancelAddExperienceStepClick: function () {
                    this.$emit('addExperienceStep', null);
                },
                isExperienceStepValid: function (experienceStep) {
                    return experienceStep.position !== '' && experienceStep.employerName !== '';
                },
                isExperienceStepButtonDisabled: function () {
                    return !this.isExperienceStepValid(this.experienceFactory);
                },
                onDoneAddExperienceStepClick: function () {
                    var isCurrentExperienceStepValid = this.isExperienceStepValid(this.experienceFactory);

                    if (!isCurrentExperienceStepValid) {
                        return;
                    }

                    this.$emit('addExperienceStep', this.experienceFactory);
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
