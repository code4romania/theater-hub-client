<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-layout row mb-5 :key="i" v-for="(award, i) in profileAwardsModel.awards">
                 <v-flex>
                    <v-layout row>
                        <v-flex xs12 sm5 md5 lg5 class="pr-2">
                            <v-text-field v-model="award.title" :rules="awardTitleRules" label="Award title*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4 class="px-2">
                            <v-text-field v-model="award.issuer" :rules="awardIssuerRules" label="Issuer*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 md3 lg3 class="px-2">
                            <v-menu :close-on-content-click="false" v-model="award.isAwardDateMenuOpen" :nudge-right="40"
                                lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                <v-text-field slot="activator" type="month" v-model="award.date" label="Date" prepend-icon="event" readonly>
                                </v-text-field>
                                <v-date-picker v-model="award.date" type="month" @input="award.isAwardDateMenuOpen = false">
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-textarea
                            class="award-description-field text-area-field"
                            v-model="award.description"
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
                            v-on:click="onRemoveAwardClick(i)"
                            large
                            class="remove-icon pl-3">
                            remove_circle
                        </v-icon>
                   </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12>
            <v-btn v-on:click="onAddAwardClick" :disabled="isAddAwardButtonDisabled()" block class="add-award-button">
                Add award
            </v-btn>
        </v-flex>
    </v-layout>
</template>


<script>
    import { Helpers } from '~/utils';

    export default {
        props: ['profileAwards'],
        data: function () {
            return {
                profileAwardsModel: Helpers.cloneObject(this.profileAwards),
                awardTitleRules: [
                    v => !!v || 'Title is required'
                ],
                awardIssuerRules: [
                    v => !!v || 'Issuer is required'
                ],
                descriptionRules: [
                    v => v === '' || v.length <= 500 || "Description's maximum length is of 500 characters"
                ]
            };
        },
        methods: {
            updateProfileAwardsModel: function () {
                this.$emit('updateProfileAwards', this.profileAwardsModel);
            },
            hasRemoveIcon: function (index) {
                return index !== this.profileAwardsModel.awards.length - 1;
            },
            onRemoveAwardClick: function (index) {
                this.profileAwardsModel.awards.splice(index, 1);

                this.updateProfileAwardsModel();
            },
            isAwardValid: function (award) {
                return award.title !== '' && award.issuer !== '';
            },
            isAddAwardButtonDisabled: function () {
                return !this.isAwardValid(this.profileAwardsModel.awards[this.profileAwardsModel.awards.length - 1]);
            },
            onAddAwardClick: function () {
                var isCurrentAwardValid = this.isAwardValid(this.profileAwardsModel.awards[this.profileAwardsModel.awards.length - 1]);

                if (!isCurrentAwardValid) {
                    return;
                }

                this.profileAwardsModel.awards.push({
                    title: '',
                    issuer: '',
                    description: '',
                    date: new Date().toISOString().substr(0, 7),
                    isValid: false,
                    isAwardDateMenuOpen: false
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
