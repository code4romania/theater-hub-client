<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-form ref="awardsForm">
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12  class="profile-row-actions">
                        <v-btn outline small fab class="done-edit-award-button"
                                    v-on:click="onDoneEditAwardClick" :disabled="isAwardButtonDisabled()">
                            <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab class="cancel-edit-award-step-button" v-on:click="onCancelEditAwardClick">
                            <v-icon>clear</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap mt-2>
                    <v-flex xs12 sm6 md5 lg5 class="pr-2">
                        <v-text-field v-model="awardsFactory.title" :rules="awardTitleRules"
                            :label="`${$t('fields.award.title.label')}*`" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4 lg4 class="px-2">
                        <v-text-field v-model="awardsFactory.issuer" :rules="awardIssuerRules"
                            :label="`${$t('fields.award.issuer.label')}*`" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md3 lg3 class="date-menu-container px-2">
                        <v-menu
                            content-class="date-picker-menu"
                            :close-on-content-click="false" v-model="awardsFactory.isAwardDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="awardsFactory.date"
                                :label="`${$t('fields.award.date.label')}*`" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker
                                v-model="awardsFactory.date"
                                :max="currentDate"
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
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        props: ['award', 'index'],
        data: function () {
            return {
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
                    ...this.award
                },
                currentDate: new Date().toISOString()
            };
        },
        methods: {
            onCancelEditAwardClick: function () {
                this.$emit('editAward', null);
            },
            onDoneEditAwardClick: function () {
                var isCurrentAwardValid = this.isAwardValid(this.awardsFactory);

                if (!isCurrentAwardValid) {
                    return;
                }

                this.$emit('editAward', this.awardsFactory, this.index);
            },
            isAwardValid: function (award) {
                return award.title !== '' && award.issuer !== '' && award.date;
            },
            isAwardButtonDisabled: function () {
                return !this.isAwardValid(this.awardsFactory);
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
