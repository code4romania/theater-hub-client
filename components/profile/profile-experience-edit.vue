<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-form ref="experienceForm">
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12  class="profile-row-actions" v-if="experienceFactory.inEditMode">
                        <v-btn outline small fab class="edit-experience-step-button"
                                        v-on:click="onDoneEditExperienceStepClick" :disabled="isExperienceStepButtonDisabled()">
                            <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab class="edit-experience-step-button" v-on:click="onCancelEditExperienceStepClick">
                            <v-icon>clear</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row mt-2>
                    <v-flex xs12 sm6 md6 lg3 class="pr-2">
                        <v-text-field v-model="experienceFactory.position" :rules="experiencePositionRules" label="Position*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="px-2">
                        <v-text-field v-model="experienceFactory.employerName" :rules="employerNameRules" label="Employer name*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="date-menu-container px-2">
                        <v-menu :close-on-content-click="false" v-model="experienceFactory.isStartDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="experienceFactory.startDate" label="Start Date" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker v-model="experienceFactory.startDate" type="month" @input="experienceFactory.isStartDateMenuOpen = false">
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="date-menu-container px-2">
                        <v-menu :close-on-content-click="false" v-model="experienceFactory.isEndDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="experienceFactory.endDate" label="End Date" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker v-model="experienceFactory.endDate" type="month" @input="experienceFactory.isEndDateMenuOpen = false">
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
                        label="Description"
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

    export default {
            props: ['experienceStep', 'index'],
            data: function () {
                return {
                    experiencePositionRules: [
                        v => !!v || 'Position is required'
                    ],
                    employerNameRules: [
                        v => !!v || 'Employer name is required'
                    ],
                    descriptionRules: [
                        v => v === '' || v.length <= 500 || "Description's maximum length is of 500 characters"
                    ],
                    experienceFactory: {
                        ...this.experienceStep
                    }
                };
            },
            methods: {
                onCancelEditExperienceStepClick: function () {
                    this.$emit('editExperienceStep', null);
                },
                onDoneEditExperienceStepClick: function () {
                    var isCurrentExperienceStepValid = this.isExperienceStepValid(this.experienceFactory);

                    if (!isCurrentExperienceStepValid) {
                        return;
                    }

                    this.$emit('editExperienceStep', this.experienceFactory, this.index);
                },
                isExperienceStepValid: function (experienceStep) {
                    return experienceStep.position !== '' && experienceStep.employerName !== '';
                },
                isExperienceStepButtonDisabled: function () {
                    return !this.isExperienceStepValid(this.experienceFactory);
                }
            }
    }
</script>

<style lang="scss" scoped>

    .v-menu__activator > .v-text-field {
        overflow-x: hidden;
    }

</style>
