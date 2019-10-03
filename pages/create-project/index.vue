<template>
    <section
        class="create-project-section">
        <v-container
            id="create-project-container"
            class="main-container"
        >

            <v-stepper v-model="wizardStep" vertical>

              <v-stepper-step :complete="wizardStep > 1" step="1">{{ $t('pages.create-project.steps.general.title') }}</v-stepper-step>

              <v-stepper-content step="1" class="pl-5">
                    <v-layout row wrap>
                        <SetProjectGeneralInformation 
                            :projectGeneralInformation="generalInformation"
                            :isCreating="true"
                            @updateProjectGeneralInformation="updateProjectGeneralInformation"
                        />
                        <v-flex xs12 my-5>
                            <v-btn color="primary" @click="wizardStep = 2" :disabled="!isWizardStepValid()">
                                {{ $t('shared.content.next-button') }}
                            </v-btn>
                        </v-flex>
                    </v-layout>
              </v-stepper-content>

              <v-stepper-step :complete="wizardStep > 2" step="2">{{ $t('pages.create-project.steps.needs.title') }}</v-stepper-step>

              <v-stepper-content step="2" class="pl-5">
                  <v-layout row wrap class="pl-2 pb-5">
                        <ProjectNeeds
                            :needs="needs"
                            :isTimeline="false"
                            :saveChanges="false"
                            @initiateEditSectionSession="initiateEditSectionSession"
                            @endEditSectionSession="endEditSectionSession"
                            @updateProjectNeeds="updateProjectNeeds" />

                       <v-flex xs12 my-5>
                           <v-btn flat @click="wizardStep = 1">{{ $t('shared.content.back-button') }}</v-btn>
                           <v-btn
                                color="primary"
                                @click="createProject"
                                :disabled="isProcessing">
                                    {{ $t('shared.content.finish-button') }}
                           </v-btn>
                       </v-flex>
                       <v-flex v-if="projects.createProjectErrors">
                           <ServerSideErrors :errors="projects.createProjectErrors"/>
                       </v-flex>
                  </v-layout>
              </v-stepper-content>

			</v-stepper>


        </v-container>
    </section>
</template>


<script>
import { Helpers, HtmlHelpers, Validators } from '~/utils';
import { mapState } from 'vuex';
import SetProjectGeneralInformation from '~/components/project/set-project-general-information.vue';
import ProjectNeeds from '~/components/project/project-needs.vue';
import ServerSideErrors from '~/components/errors/server-side-errors.vue';

export default {
    components: {
        SetProjectGeneralInformation,
        ProjectNeeds,
        ServerSideErrors
    },
    layout: 'user',
    middleware: ['authenticated', 'enabled', 'user', 'get-tags'],
    data: function () {
        return {
            wizardStep: 1,
            generalInformation: {
                Visibility: 0,
                Name: '',
				Image: {},
                Date: '',
                PhoneNumber: '',
                Email: '',
                City: '',
                Budget: '',
                Currency: '',
                Description: ''
            },
            needs: [],
            isProcessing: false
        }
	},
	methods: {
        isWizardStepValid: function () {
            switch (this.wizardStep) {
                case 1:
                    return this.generalInformation.Name && this.generalInformation.Name.length <= 100 &&
                         (!this.generalInformation.PhoneNumber || Validators.isValidPhoneNumber(this.generalInformation.PhoneNumber)) &&
                         (!this.generalInformation.Email || Validators.isValidEmailAddress(this.generalInformation.Email)) &&
                         this.generalInformation.City && this.generalInformation.City.length <= 100 &&
                         (!this.generalInformation.Budget || Validators.isValidBudget(+this.generalInformation.Budget)) &&
                         (!this.generalInformation.Description || this.generalInformation.Description.length <= 500);
                default:
                    return true;
            }
        },
        updateProjectGeneralInformation: function (generalInformation) {
            this.generalInformation = Helpers.cloneObject(generalInformation);
        },
        updateProjectNeeds: function (editedNeeds) {
            this.needs = [...editedNeeds];
        },
        async createProject () {
            if (this.isProcessing) {
                return;
            }
            this.isProcessing = true;

            var createProjectFormData = new FormData();

            const needs = JSON.stringify(this.needs.map(n => {
                return {
                    Description: n.Description,
                    Tags: n.Tags.map(t => t.ID)
                };
            }));

            const image         = this.generalInformation.Image &&
                                    this.generalInformation.Image.File ? this.generalInformation.Image.File : null;
            const email         = this.generalInformation.Email || '';
            const phoneNumber   = this.generalInformation.PhoneNumber || '';
            let city            = this.generalInformation.City;

            createProjectFormData.append('Image', image);
            createProjectFormData.append('Name', this.generalInformation.Name);
            createProjectFormData.append('Description', this.generalInformation.Description);
            createProjectFormData.append('Email', email);
            createProjectFormData.append('PhoneNumber', phoneNumber);
            createProjectFormData.append('Date', this.generalInformation.Date);
            createProjectFormData.append('Budget', this.generalInformation.Budget);
            createProjectFormData.append('Currency', this.generalInformation.Currency);
            createProjectFormData.append('City', city);
            createProjectFormData.append('Visibility', this.generalInformation.Visibility);
            createProjectFormData.append('Needs', needs);
            createProjectFormData.append('DateCreated', new Date());

            await this.$store.dispatch('projects/create', createProjectFormData)
                .then(() => {
                    this.isProcessing = false;
                    if (!this.projects.createProjectErrors || this.projects.createProjectErrors.length === 0) {
                        this.$router.push({ path: `/project/${this.projects.newProject.ID}` });
                    }
                });
        },
        initiateEditSectionSession (navigateToElement, projectSection) {
            this.$store.dispatch('users/initiateEditSectionSession');

            if (navigateToElement) {
                setTimeout(() => {
                    var element = document.getElementsByClassName('highlighted-section')[0];

                    if (!HtmlHelpers.isVerticallyFullyInViewport(element)) {
                        HtmlHelpers.scrollToElement(element);
                    }
                }, 0);
            }
        },
        endEditSectionSession (projectSection) {
            this.$store.dispatch('users/endEditSectionSession');
        }
	},
    computed: {
        ...mapState([ 'projects' ])
    }
}

</script>

<style lang="scss">

    .create-project-section {

        .create-account-success {
            font-size: 20px;
        }

        .v-stepper, .v-stepper__header {
            box-shadow: none;
            -webkit-box-shadow: none;
        }
    }

</style>
