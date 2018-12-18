<template>
    <v-layout row wrap>
        <v-layout row wrap class="section-visibility-row mt-4">
            <v-flex xs3>
                <span class="field-title">Profile visibility:</span>
            </v-flex>
            <v-flex xs9>
                <v-radio-group v-model="profilePrivacyModel.profileVisibility" @change="updateProfilePrivacyModel" row class="ml-3 mt-0 pt-0">
                    <v-radio :key="0" :value="0" :label="`Everyone`"></v-radio>
                    <v-radio :key="1" :value="1" :label="`Community`"></v-radio>
                    <v-radio :key="2" :value="2" :label="`Private`"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="section-visibility-row mt-4">
            <v-flex xs3>
                <span class="field-title">Email visibility:</span>
            </v-flex>
            <v-flex xs9>
                <v-radio-group v-model="profilePrivacyModel.emailVisibility" @change="updateProfilePrivacyModel" row class="ml-3 mt-0 pt-0">
                    <v-radio :key="0" :value="0" :label="`Everyone`"></v-radio>
                    <v-radio :key="1" :value="1" :label="`Community`"></v-radio>
                    <v-radio :key="2" :value="2" :label="`Private`"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="section-visibility-row mt-4">
            <v-flex xs3>
                <span class="field-title">Birth date visibility:</span>
            </v-flex>
            <v-flex xs9>
                <v-radio-group v-model="profilePrivacyModel.birthDateVisibility" @change="updateProfilePrivacyModel" row class="ml-3 mt-0 pt-0">
                    <v-radio :key="0" :value="0" :label="`Everyone`"></v-radio>
                    <v-radio :key="1" :value="1" :label="`Community`"></v-radio>
                    <v-radio :key="2" :value="2" :label="`Private`"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="section-visibility-row mt-4">
            <v-flex xs3>
                <span class="field-title">Phone number visibility:</span>
            </v-flex>
            <v-flex xs9>
                <v-radio-group v-model="profilePrivacyModel.phoneNumberVisibility" @change="updateProfilePrivacyModel" row class="ml-3 mt-0 pt-0">
                    <v-radio :key="0" :value="0" :label="`Everyone`"></v-radio>
                    <v-radio :key="1" :value="1" :label="`Community`"></v-radio>
                    <v-radio :key="2" :value="2" :label="`Private`"></v-radio>
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