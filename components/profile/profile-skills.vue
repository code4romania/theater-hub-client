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
                label="Your professional skills"
                hint="Select at least one skill"
                no-data-text="No results"
                color="deep-purple lighten-2"
                background-color="transparent"
                :menu-props="{maxHeight: 160}">
            </v-autocomplete>
        </v-flex>
        <v-flex xs12 mt-3>
            <v-chip close :key="i" v-for="(skill, i) in selectedSkillNames"
                                                        @input="removeSkill(skill)">{{ skill }}</v-chip>
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
                    selectedSkillNames: this.profileSkills.selectedSkills.map(s => s.Name)
                };
            },
            methods: {
                updateProfileSkillsModel: function () {
                    this.profileSkillsModel.selectedSkills = this.skills.filter(s => {
                        return this.selectedSkillNames.indexOf(s.Name) !== -1;
                    });

                    this.$emit('updateProfileSkills', this.profileSkillsModel);
                },
                removeSkill: function (item) {
                    this.profileSkillsModel.selectedSkills.splice(this.profileSkillsModel.selectedSkills.map(s => s.Name).indexOf(item), 1);
                    this.profileSkillsModel.selectedSkills = [...this.profileSkillsModel.selectedSkills];
                    this.selectedSkillNames                = this.profileSkillsModel.selectedSkills.map(s => s.Name);

                    this.updateProfileSkillsModel();
                }
            },
            computed: {
                skillNameList: function () {
                    return this.skills.map(s => s.Name).sort();
                }
            }
    }
</script>

<style lang="scss" scoped>

</style>
