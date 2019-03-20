<template>
    <v-layout row wrap>

        <v-layout row wrap class="mt-4">
            <v-flex xs4>
                <span class="field-title">{{ $t('shared.content.locale-setting') }}</span>
            </v-flex>
            <v-flex xs8>
                <v-radio-group v-model="localeSettingModel" @change="updateLocaleSettingModel"
                                                                                row class="ml-3 mt-0 pt-0">
                    <v-radio :key="i" :value="l.ID" :label="$t(`application-data.${l.Name.toLowerCase()}`)"
                                                                            v-for="(l, i) in locales"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>

    </v-layout>
</template>


<script>

    import { mapGetters } from 'vuex';

    export default {
        props: ['localeSetting'],
        data: function () {
            return {
                localeSettingModel: this.localeSetting
            };
        },
        methods: {
            updateLocaleSettingModel: function () {
                this.$emit('updateLocaleSetting', this.localeSettingModel);
            }
        },
        computed: {
            ...mapGetters({
                locales: 'applicationData/locales'
            })
        }
    }

</script>

<style lang="scss" scoped>

</style>
