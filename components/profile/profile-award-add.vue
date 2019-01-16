<template>
    <v-layout row wrap>
        <v-flex xs12 pa-5 ma-1>
            <v-form ref="awardsForm">
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12  class="profile-row-actions">
                        <v-btn outline small fab class="done-add-award-button" v-on:click="onDoneAddAwardClick" :disabled="isAwardButtonDisabled()">
                            <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn outline small fab class="cancel-add-award-button" v-on:click="onCancelAddAwardClick">
                            <v-icon>clear</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row mt-2>
                    <v-flex xs12 sm5 md5 lg5 class="pr-2">
                        <v-text-field v-model="awardsFactory.title" :rules="awardTitleRules" label="Award title*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 class="px-2">
                        <v-text-field v-model="awardsFactory.issuer" :rules="awardIssuerRules" label="Issuer*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm3 md3 lg3 class="date-menu-container px-2">
                        <v-menu :close-on-content-click="false" v-model="awardsFactory.isAwardDateMenuOpen" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" type="month" v-model="awardsFactory.date" label="Date" prepend-icon="event" readonly>
                            </v-text-field>
                            <v-date-picker v-model="awardsFactory.date" type="month" @input="awardsFactory.isAwardDateMenuOpen = false">
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
                awardTitleRules: [
                    v => !!v || 'Title is required'
                ],
                awardIssuerRules: [
                    v => !!v || 'Issuer is required'
                ],
                descriptionRules: [
                    v => v === '' || v.length <= 500 || "Description's maximum length is of 500 characters"
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
            onCancelAddAwardClick: function () {
                this.$emit('addAward', null);
            },
            isAwardValid: function (award) {
                return award.title !== '' && award.issuer !== '';
            },
            isAwardButtonDisabled: function () {
                return !this.isAwardValid(this.awardsFactory);
            },
            onDoneAddAwardClick: function () {
                var isCurrentAwardValid = this.isAwardValid(this.awardsFactory);

                if (!isCurrentAwardValid) {
                    return;
                }

                this.$emit('addAward', this.awardsFactory);
            }
        }
    }
</script>

<style lang="scss" scoped>

    .v-menu__activator > .v-text-field {
        overflow-x: hidden;
    }

</style>
