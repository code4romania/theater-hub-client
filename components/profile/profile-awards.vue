<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-layout row mb-5 :key="i" v-for="(award, i) in profileAwardsModel.awards">
                 <v-flex xs12 ma-1 v-bind:class="{'editing-profile-row': award.inEditMode}">
                    <v-card class="elevation-1">
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex xs10 pt-3>
                                    <span class="award-title">{{ award.title }}</span>, <span class="award-issuer ml-1">{{ award.issuer }}</span>
                                    -
                                    <span class="timeline-date">{{ getTimelineDate(award.date) }}</span>
                                </v-flex>
                                <v-flex xs2 class="profile-row-actions">
                                    <v-btn outline small fab class="edit-icon" v-on:click="onEditAwardClick(award, i)">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab class="remove-icon" v-on:click="onRemoveAwardClick(i)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text v-if="award.description">
                            <p class="award-description">
                                {{ award.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                 </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 elevation-3 pa-5 ma-1>
            <v-form ref="awardsForm">
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12  class="profile-row-actions" v-if="awardsFactory.inEditMode">
                        <v-btn outline small fab class="edit-award-step-button" v-on:click="onDoneEditAwardsStepClick" :disabled="isAwardButtonDisabled()">
                            <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab class="edit-award-step-button" v-on:click="onCancelEditAwardsStepClick">
                            <v-icon>clear</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row mt-2>
                    <v-flex xs12 sm5 md5 lg5 class="pr-2">
                        <v-text-field v-model="awardsFactory.title" :rules="awardTitleRules"
                            :label="`${$t('fields.award.title.label')}*`" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 class="px-2">
                        <v-text-field v-model="awardsFactory.issuer" :rules="awardIssuerRules"
                            :label="`${$t('fields.award.issuer.label')}*`" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm3 md3 lg3 class="date-menu-container px-2">
                        <v-menu :close-on-content-click="false" v-model="awardsFactory.isAwardDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="awardsFactory.date"
                                :label="$t('fields.award.date.label')" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker
                                v-model="awardsFactory.date"
                                type="month"
                                :locale="locale"
                                @input="awardsFactory.isAwardDateMenuOpen = false">
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-textarea
                        class="award-description-field text-area-field"
                        v-model="awardsFactory.description"
                        auto-grow
                        box
                        :label="$t('fields.award.description.label')"
                        rows="1"
                        counter=500
                        :rules="descriptionRules" validate-on-blur>
                    </v-textarea>
                </v-layout>
                <v-flex xs12 mt-5 v-if="!awardsFactory.inEditMode">
                    <v-btn v-on:click="onAddAwardClick" :disabled="isAwardButtonDisabled()" block class="add-award-button">
                        {{ $t('shared.content.add-award-button') }}
                    </v-btn>
                </v-flex>
            </v-form>
        </v-flex>
    </v-layout>
</template>


<script>
    import { mapGetters } from 'vuex';
    import moment from 'moment';
    import { Helpers } from '~/utils';

    export default {
        props: ['profileAwards'],
        data: function () {
            return {
                profileAwardsModel: Helpers.cloneObject(this.profileAwards),
                awardTitleRules: [
                    v => !!v || this.$t('fields.award.title.validation-errors.required')
                ],
                awardIssuerRules: [
                    v => !!v || this.$t('fields.award.issuer.validation-errors.required')
                ],
                descriptionRules: [
                    v => v === '' || v.length <= 500 || this.$t('fields.award.description.validation-errors.length')
                ],
                awardsFactory: {
                    title: '',
                    issuer: '',
                    description: '',
                    date: new Date().toISOString().substr(0, 7),
                    isValid: false,
                    isAwardDateMenuOpen: false,
                    index: null,
                    inEditMode: false
                }
            };
        },
        methods: {
            updateProfileAwardsModel: function () {
                this.$emit('updateProfileAwards', this.profileAwardsModel);
            },
            onEditAwardClick: function (award, index) {
                this.awardsFactory = {
                    ...award,
                    index,
                    inEditMode: true
                };

                award.inEditMode = true;
                this.updateProfileAwardsModel();
            },
            onCancelEditAwardsStepClick: function () {
                this.profileAwardsModel.awards[this.awardsFactory.index].inEditMode = false;

                this.updateProfileAwardsModel();

                this.resetAwardsFactory();
            },
            onDoneEditAwardsStepClick: function () {
                var isCurrentAwardValid = this.isAwardValid(this.awardsFactory);

                if (!isCurrentAwardValid) {
                    return;
                }

                this.profileAwardsModel.awards[this.awardsFactory.index] = {
                    ...this.awardsFactory,
                    isValid: true,
                    isAwardDateMenuOpen: false,
                    inEditMode: false
                };

                this.updateProfileAwardsModel();
    
                this.resetAwardsFactory();
            },
            onRemoveAwardClick: function (index) {
                this.profileAwardsModel.awards.splice(index, 1);

                this.updateProfileAwardsModel();
            },
            isAwardValid: function (award) {
                return award.title !== '' && award.issuer !== '';
            },
            isAwardButtonDisabled: function () {
                return !this.isAwardValid(this.awardsFactory);
            },
            onAddAwardClick: function () {
                var isCurrentAwardValid = this.isAwardValid(this.awardsFactory);

                if (!isCurrentAwardValid) {
                    return;
                }

                this.profileAwardsModel.awards.push({...this.awardsFactory});

                this.resetAwardsFactory();

                this.updateProfileAwardsModel();
            },
            resetAwardsFactory: function () {
                this.$refs.awardsForm.resetValidation();

                this.awardsFactory = {
                    title: '',
                    issuer: '',
                    description: '',
                    date: new Date().toISOString().substr(0, 7),
                    isValid: false,
                    isAwardDateMenuOpen: false,
                    index: null,
                    inEditMode: false
                };
            },
            getTimelineDate (date) {
                return moment(date).format('MM/YYYY');
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
