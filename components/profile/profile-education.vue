<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-layout row mb-5 :key="i" v-for="(step, i) in profileEducationModel.educationSteps">
                <v-flex>
                    <v-layout row>
                        <v-flex xs12 sm6 md6 lg3 class="pr-2">
                            <v-text-field v-model="step.title" :rules="educationTitleRules" label="Title*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6 lg3 class="px-2">
                            <v-text-field v-model="step.institutionName" :rules="institutionNameRules" label="Institution name*" required></v-text-field>
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
                            class="education-step-description-field text-area-field"
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
                        v-on:click="onRemoveEducationClick(i)"
                        large
                        class="remove-icon pl-3">
                        remove_circle
                    </v-icon>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12>
            <v-btn v-on:click="onAddEducationStepClick" :disabled="isEducationStepButtonDisabled()" block class="add-education-step-button">
                Add education step
            </v-btn>
        </v-flex>
    </v-layout>
</template>


<script>
    import { Helpers } from '~/utils';

    export default {
            props: ['profileEducation'],
            data: function () {
                return {
                    profileEducationModel: Helpers.cloneObject(this.profileEducation),
                    educationTitleRules: [
                        v => !!v || 'Title is required'
                    ],
                    institutionNameRules: [
                        v => !!v || 'Institution name is required'
                    ],
                    descriptionRules: [
                        v => v === '' || v.length <= 500 || "Description's maximum length is of 500 characters"
                    ]
                };
            },
            methods: {
                updateProfileEducationModel: function () {
                    this.$emit('updateProfileEducation', this.profileEducationModel);
                },
                hasRemoveIcon: function (index) {
                    return index !== this.profileEducationModel.educationSteps.length - 1;
                },
                onRemoveEducationClick: function (index) {
                    this.profileEducationModel.educationSteps.splice(index, 1);

                    this.updateProfileEducationModel();
                },
                isEducationStepValid: function (educationStep) {
                    return educationStep.title !== '' && educationStep.institutionName !== '';
                },
                isEducationStepButtonDisabled: function () {
                    return !this.isEducationStepValid(this.profileEducationModel.educationSteps[this.profileEducationModel.educationSteps.length - 1])
                },
                onAddEducationStepClick: function () {
                    var isCurrentEducationStepValid =
                        this.isEducationStepValid(this.profileEducationModel.educationSteps[this.profileEducationModel.educationSteps.length - 1]);

                    if (!isCurrentEducationStepValid) {
                        return;
                    }

                    this.profileEducationModel.educationSteps.push({
                        title: '',
                        institutionName: '',
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
