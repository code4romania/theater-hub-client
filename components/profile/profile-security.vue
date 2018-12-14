<template>
    <v-layout row wrap>
        <v-layout row wrap class="section-visibility-row mt-4">
            <v-flex xs3>
                <span class="field-title">Profile visibility:</span>
            </v-flex>
            <v-flex xs9>
                <v-radio-group v-model="profileSecurityModel.profileVisibility" row class="ml-3 mt-0 pt-0">
                    <v-radio :key="1" :value="1" :label="`Everyone`"></v-radio>
                    <v-radio :key="2" :value="2" :label="`Logged users`"></v-radio>
                    <v-radio :key="3" :value="3" :label="`Only me`"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="section-visibility-row mt-4">
            <v-flex xs3>
                <span class="field-title">Email visibility:</span>
            </v-flex>
            <v-flex xs9>
                <v-radio-group v-model="profileSecurityModel.emailVisibility" row class="ml-3 mt-0 pt-0">
                    <v-radio :key="1" :value="1" :label="`Everyone`"></v-radio>
                    <v-radio :key="2" :value="2" :label="`Logged users`"></v-radio>
                    <v-radio :key="3" :value="3" :label="`Only me`"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="section-visibility-row mt-4">
            <v-flex xs3>
                <span class="field-title">Birth date visibility:</span>
            </v-flex>
            <v-flex xs9>
                <v-radio-group v-model="profileSecurityModel.birthDateVisibility" row class="ml-3 mt-0 pt-0">
                    <v-radio :key="1" :value="1" :label="`Everyone`"></v-radio>
                    <v-radio :key="2" :value="2" :label="`Logged users`"></v-radio>
                    <v-radio :key="3" :value="3" :label="`Only me`"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="section-visibility-row mt-4">
            <v-flex xs3>
                <span class="field-title">Phone number visibility:</span>
            </v-flex>
            <v-flex xs9>
                <v-radio-group v-model="profileSecurityModel.phoneNumberVisibility" row class="ml-3 mt-0 pt-0">
                    <v-radio :key="1" :value="1" :label="`Everyone`"></v-radio>
                    <v-radio :key="2" :value="2" :label="`Logged users`"></v-radio>
                    <v-radio :key="3" :value="3" :label="`Only me`"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
    </v-layout>
</template>


<script>
    import { Helpers } from '~/utils';

    export default {
            props: ['profileSecurity'],
            data: function () {
                return {
                    profileSecurityModel: Helpers.cloneObject(this.profileSecurity)
                };
            },
            methods: {
                updateProfileSecurityModel: function () {
                    this.$emit('updateProfileSecurity', this.profileSecurityModel);
                }
            }
    }
</script>

<style lang="scss" scoped>

</style>