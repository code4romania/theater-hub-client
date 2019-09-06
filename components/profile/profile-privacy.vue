<template>
    <v-layout row wrap>
        <v-layout row wrap class="section-visibility-row mt-4">
            <v-flex xs4>
                <span class="field-title">{{ $t('shared.content.profile-visibility') }}</span>
            </v-flex>
            <v-flex xs8>
                <v-radio-group
                    v-model="profilePrivacyModel.profileVisibility"
                    @change="updateProfilePrivacyModel"
                    row class="ml-3 mt-0 pt-0">
                        <v-radio :key="0" :value="0" :label="$t('application-data.everyone')"></v-radio>
                        <v-radio :key="1" :value="1" :label="$t('application-data.community')"></v-radio>
                        <v-radio :key="2" :value="2" :label="$t('application-data.private')"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="section-visibility-row mt-4">
            <v-flex xs4>
                <span class="field-title">{{ $t('shared.content.email-visibility') }}</span>
            </v-flex>
            <v-flex xs8>
                <v-radio-group
                    v-model="profilePrivacyModel.emailVisibility"
                    @change="updateProfilePrivacyModel"
                    row class="ml-3 mt-0 pt-0">
                        <v-radio :key="0" :value="0" :label="$t('application-data.everyone')"></v-radio>
                        <v-radio :key="1" :value="1" :label="$t('application-data.community')"></v-radio>
                        <v-radio :key="2" :value="2" :label="$t('application-data.private')"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="section-visibility-row mt-4">
            <v-flex xs4>
                <span class="field-title">{{ $t('shared.content.birth-date-visibility') }}</span>
            </v-flex>
            <v-flex xs8>
                <v-radio-group
                    v-model="profilePrivacyModel.birthDateVisibility"
                    @change="updateProfilePrivacyModel"
                    row class="ml-3 mt-0 pt-0">
                        <v-radio :key="0" :value="0" :label="$t('application-data.everyone')"></v-radio>
                        <v-radio :key="1" :value="1" :label="$t('application-data.community')"></v-radio>
                        <v-radio :key="2" :value="2" :label="$t('application-data.private')"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="section-visibility-row mt-4">
            <v-flex xs4>
                <span class="field-title">{{ $t('shared.content.phone-number-visibility') }}</span>
            </v-flex>
            <v-flex xs8>
                <v-radio-group v-model="profilePrivacyModel.phoneNumberVisibility" @change="updateProfilePrivacyModel" row class="ml-3 mt-0 pt-0">
                    <v-radio :key="0" :value="0" :label="$t('application-data.everyone')"></v-radio>
                    <v-radio :key="1" :value="1" :label="$t('application-data.community')"></v-radio>
                    <v-radio :key="2" :value="2" :label="$t('application-data.private')"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
    </v-layout>
</template>


<script>
    import { Helpers } from '~/utils';

    export default {
        props: ['profilePrivacy'],
        data: function () {
            return {
                profilePrivacyModel: Helpers.cloneObject(this.profilePrivacy)
            };
        },
        methods: {
            updateProfilePrivacyModel: function () {
                this.$emit('updateProfilePrivacy', this.profilePrivacyModel);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
