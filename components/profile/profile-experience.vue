<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-layout row mb-5 :key="i" v-for="(step, i) in profileExperienceModel.experienceSteps">
                <v-flex>
                    <v-layout row>
                        <v-flex xs12 sm6 md6 lg3 class="pr-2">
                            <v-text-field v-model="step.position" :rules="experiencePositionRules" label="Position*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6 lg3 class="px-2">
                            <v-text-field v-model="step.employerName" :rules="employerNameRules" label="Employer name*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6 lg3 class="px-2">
                            <v-menu :close-on-content-click="false" v-model="step.isStartDateMenuOpen" :nudge-right="40"
                                lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                <v-text-field slot="activator" type="month" v-model="step.startDate" label="Start Date" prepend-icon="event" readonly>
                                </v-text-field>
                                <v-date-picker v-model="step.startDate" type="month" @input="step.isStartDateMenuOpen = false">
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs12 sm6 md6 lg3 class="px-2">
                            <v-menu :close-on-content-click="false" v-model="step.isEndDateMenuOpen" :nudge-right="40"
                                lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                <v-text-field slot="activator" type="month" v-model="step.endDate" label="End Date" prepend-icon="event" readonly>
                                </v-text-field>
                                <v-date-picker v-model="step.endDate" type="month" @input="step.isEndDateMenuOpen = false">
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-textarea
                            class="experience-step-description-field text-area-field"
                            v-model="step.description"
                            auto-grow
                            box
                            label="Description"
                            rows="1"
                            counter=500
                            :rules="descriptionRules" validate-on-blur>
                        </v-textarea>
                    </v-layout>
                </v-flex>
                <v-flex xs2 d-flex v-if="hasRemoveIcon(i)">
                    <v-icon
                        v-on:click="onRemoveExperienceClick(i)"
                        large
                        class="remove-icon pl-3">
                        remove_circle
                    </v-icon>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12>
            <v-btn v-on:click="onAddExperienceStepClick" :disabled="isExperienceStepButtonDisabled()" block class="add-experience-step-button">
                Add experience step
            </v-btn>
        </v-flex>
    </v-layout>
</template>


<script>
    import { Helpers } from '~/utils';

    export default {
            props: ['profileExperience'],
            data: function () {
                return {
                    profileExperienceModel: Helpers.cloneObject(this.profileExperience),
                    experiencePositionRules: [
                        v => !!v || 'Position is required'
                    ],
                    employerNameRules: [
                        v => !!v || 'Employer name is required'
                    ],
                    descriptionRules: [
                        v => v === '' || v.length <= 500 || "Description's maximum length is of 500 characters"
                    ]
                };
            },
            methods: {
                updateProfileExperienceModel: function () {
                    this.$emit('updateProfileExperience', this.profileExperienceModel);
                },
                hasRemoveIcon: function (index) {
                    return index !== this.profileExperienceModel.experienceSteps.length - 1;
                },
                onRemoveExperienceClick: function (index) {
                    this.profileExperienceModel.experienceSteps.splice(index, 1);

                    this.updateProfileExperienceModel();
                },
                isExperienceStepValid: function (experienceStep) {
                    return experienceStep.position !== '' && experienceStep.employerName !== '';
                },
                isExperienceStepButtonDisabled: function () {
                    return !this.isExperienceStepValid(this.profileExperienceModel.experienceSteps[this.profileExperienceModel.experienceSteps.length - 1])
                },
                onAddExperienceStepClick: function () {
                    var isCurrentExperienceStepValid =
                        this.isExperienceStepValid(this.profileExperienceModel.experienceSteps[this.profileExperienceModel.experienceSteps.length - 1]);

                    if (!isCurrentExperienceStepValid) {
                        return;
                    }

                    this.profileExperienceModel.experienceSteps.push({
                        position: '',
                        employerName: '',
                        description: '',
                        startDate: new Date().toISOString().substr(0, 7),
                        endDate: new Date().toISOString().substr(0, 7),
                        isValid: false,
                        isStartDateMenuOpen: false,
                        isEndDateMenuOpen: false
                    });
                }
            }
    }
</script>

<style lang="scss" scoped>

    .v-menu__activator > .v-text-field {
        overflow-x: hidden;
    }

</style>
