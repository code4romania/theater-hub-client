<template>
    <v-layout row wrap>
        <v-flex xs12 id="skills-autocomplete-wrapper">
            <v-autocomplete
                v-model="profileSkillsModel.selectedSkills"
                @input="updateProfileSkillsModel"
                :items="skills"
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
            <v-chip close :key="i" v-for="(skill, i) in profileSkillsModel.selectedSkills"
                                                        @input="removeSkill(skill)">{{ skill }}</v-chip>
        </v-flex>
    </v-layout>
</template>


<script>
    import { Helpers } from '~/utils';
    import { skills } from '~/store/constants/mockdata';

    export default {
            props: ['profileSkills'],
            data: function () {
                return {
                    profileSkillsModel: Helpers.cloneObject(this.profileSkills),
                    skills: skills.sort()
                };
            },
            methods: {
                updateProfileSkillsModel: function () {
                    this.$emit('updateProfileSkills', this.profileSkillsModel);
                },
                removeSkill: function (item) {
                    this.profileSkillsModel.selectedSkills.splice(this.profileSkillsModel.selectedSkills.indexOf(item), 1);
                    this.profileSkillsModel.selectedSkills = [...this.profileSkillsModel.selectedSkills];
                    this.updateProfileSkillsModel();
                }
            }
    }
</script>

<style lang="scss" scoped>

</style>
