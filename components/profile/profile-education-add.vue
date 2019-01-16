<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-form ref="educationForm">
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12  class="profile-row-actions">
                        <v-btn outline small fab class="edit-education-step-button"
                                        v-on:click="onDoneAddEducationStepClick" :disabled="isEducationStepButtonDisabled()">
                            <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab class="edit-education-step-button" v-on:click="onCancelAddEducationStepClick">
                            <v-icon>clear</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row mt-2>
                    <v-flex xs12 sm6 md6 lg3 class="pr-2">
                        <v-text-field v-model="educationFactory.title" :rules="educationTitleRules" label="Title*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="px-2">
                        <v-text-field v-model="educationFactory.institutionName" :rules="institutionNameRules" label="Institution name*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="px-2">
                        <v-menu :close-on-content-click="false" v-model="educationFactory.isStartDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="educationFactory.startDate" label="Start Date" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker v-model="educationFactory.startDate" type="month" @input="educationFactory.isStartDateMenuOpen = false">
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg3 class="date-menu-container px-2">
                        <v-menu :close-on-content-click="false" v-model="educationFactory.isEndDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="educationFactory.endDate" label="End Date" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker v-model="educationFactory.endDate" type="month" @input="educationFactory.isEndDateMenuOpen = false">
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
            data: function () {
                return {
                    educationTitleRules: [
                        v => !!v || 'Title is required'
                    ],
                    institutionNameRules: [
                        v => !!v || 'Institution name is required'
                    ],
                    descriptionRules: [
                        v => v === '' || v.length <= 500 || "Description's maximum length is of 500 characters"
                    ],
                    educationFactory: {
                        title: '',
                        institutionName: '',
                        description: '',
                        startDate: new Date().toISOString().substr(0, 7),
                        endDate: new Date().toISOString().substr(0, 7),
                        isValid: false,
                        isStartDateMenuOpen: false,
                        isEndDateMenuOpen: false,
                        index: null,
                        inEditMode: false
                    }
                };
            },
            methods: {
                onCancelAddEducationStepClick: function () {
                    this.$emit('addEducationStep', null);
                },
                isEducationStepValid: function (educationStep) {
                    return educationStep.title !== '' && educationStep.institutionName !== '';
                },
                isEducationStepButtonDisabled: function () {
                    return !this.isEducationStepValid(this.educationFactory);
                },
                onDoneAddEducationStepClick: function () {
                    var isCurrentEducationStepValid = this.isEducationStepValid(this.educationFactory);

                    if (!isCurrentEducationStepValid) {
                        return;
                    }

                    this.$emit('addEducationStep', this.educationFactory);
                }
            }
    }
</script>

<style lang="scss" scoped>

    .v-menu__activator > .v-text-field {
        overflow-x: hidden;
    }

</style>
