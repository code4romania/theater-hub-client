<template>
    <v-layout row wrap>
        <v-flex xs12 id="skills-autocomplete-wrapper">
            <v-autocomplete
                v-model="selectedSkillNames"
                @input="updateProfileSkillsModel"
                :items="skillNameList"
                chips
                multiple
                persistent-hint
                :label="$t('fields.select-skills.label')"
                :hint="$t('fields.select-skills.hint')"
                :no-data-text="$t('fields.select-skills.no-results')"
                color="#AE2760"
                background-color="transparent"
                :menu-props="{maxHeight: 200}">
            </v-autocomplete>
        </v-flex>
        <v-flex xs12 mt-3 class="skills-row">
            <v-chip close :key="i" v-for="(skill, i) in sortedSelectedSkillNames" @input="removeSkill(skill)"
                                                                    class="skill secondary-color mr-2">{{ skill }}</v-chip>
        </v-flex>
    </v-layout>
</template>


<script>
    import { Helpers } from '~/utils';

    export default {
            props: ['profileSkills', 'skills'],
            data: function () {
                return {
                    profileSkillsModel: Helpers.cloneObject(this.profileSkills),
                    selectedSkillNames: [],
                    localizedSkills: []
                };
            },
            methods: {
                updateProfileSkillsModel: function () {
                    this.profileSkillsModel.selectedSkills = this.skills.filter(s => {
                        return this.selectedSkillNames.indexOf(this.$t(`application-data.skills.${s.ID}`)) !== -1;
                    });

                    this.$emit('updateProfileSkills', this.profileSkillsModel);
                },
                removeSkill: function (item) {
                    this.profileSkillsModel.selectedSkills
                                        .splice(this.profileSkillsModel.selectedSkills.map(s => this.$t(`application-data.skills.${s.ID}`)).indexOf(item), 1);
                    this.profileSkillsModel.selectedSkills = [...this.profileSkillsModel.selectedSkills];

                    this.selectedSkillNames                = this.profileSkillsModel.selectedSkills
                                        .map(s => this.$t(`application-data.skills.${s.ID}`)).sort();

                    this.updateProfileSkillsModel();
                }
            },
            computed: {
                skillNameList: function () {
                    return this.localizedSkills.map(s => s.Name).sort();
                },
                sortedSelectedSkillNames: function () {
                    return this.selectedSkillNames.sort();
                }
            },
            mounted: function () {
                this.localizedSkills = this.skills.map(s => {
                        return {
                            ...s,
                            Name: this.$t(`application-data.skills.${s.ID}`)
                        };
                    }).sort((s1, s2) => s2.Name > s1.Name ? -1 : 1);

                this.selectedSkillNames = this.profileSkills.selectedSkills.map(s => this.$t(`application-data.skills.${s.ID}`)).sort();
            }
    }
</script>

<style lang="scss">
</style>
