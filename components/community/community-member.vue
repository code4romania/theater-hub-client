<template>
    <v-layout column justify-center class="text-xs-center">
        <v-flex xs12 class="member-avatar-container member-information-container">
            <nuxt-link :to="`/profile/${member.Username}`">
                <v-avatar size="160px">
                    <img :src="require('~/assets/images/default-avatar.svg')" v-if="!member.ProfileImage" />
                    <img :src="member.ProfileImage" v-if="member.ProfileImage" />
                </v-avatar>
            </nuxt-link>
        </v-flex>
        <v-flex xs12
            v-if="showName"
            class="member-name-container member-information-container mt-1">
            <nuxt-link :to="`/profile/${member.Username}`">
                <span class="member-name">{{ member.FullName }}</span>
            </nuxt-link>
        </v-flex>
        <v-flex xs12
            v-if="member.Skills && member.Skills.length !== 0"
            class="member-skills-container member-information-container mt-1">
            <v-chip
                :key="j"
                v-on:click="() => handleSkillClick(skill)"
                v-for="(skill, j) in member.Skills"
                v-bind:class="{'clickable': hasClickableSkills}"
                class="member-skill skill secondary-color mr-2">
                    {{ skill.Name }}
            </v-chip>
            <v-chip
                v-if="member.Surplus"
                class="skill-surplus skill secondary-color mr-2">
                {{ member.Surplus }}
            </v-chip>
        </v-flex>
    </v-layout>
</template>

<script>

    export default {
        props: ['member', 'hasClickableSkills', 'showName'],
        methods: {
            handleSkillClick: function (skill) {
                if (!this.hasClickableSkills) {
                    return;
                }

                this.$emit('handleSkillClick', skill);
            }
        },
        mounted: function () {
        }
    }
</script>

<style lang="scss">

    .member-avatar-container {

        img {
            border: 8px solid rgba(151, 151, 151, 0.6);
        }
    }

    .member-information-container > * {
		text-decoration: none;
        color: initial;
    }

    .member-name {
        color: #AE2760;
        text-decoration: underline;
    }

    .member-skills-container {
        display: flex;
        justify-content: center;
    }

    .member-skills-container > a {
        display: flex;
    }

    .member-skill {
        width: 80px;
        height: 20px;

        .v-chip__content.clickable {
            cursor: pointer;
        }
    }

    .skill-surplus {
        width: 25px;
        height: 20px;
    }

</style>
