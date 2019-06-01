<template>
    <v-layout column justify-center class="text-xs-center">
        <v-flex xs12 class="member-avatar-container member-information-container">
            <nuxt-link :to="`/profile/${member.Username}`">
                <v-avatar size="160px">
                    <img :src="require('~/assets/images/default-avatar.svg')" v-if="!member.ProfileImage" />
                    <img :src="member.ProfileImage.Location" v-if="member.ProfileImage" />
                </v-avatar>
            </nuxt-link>
        </v-flex>
        <v-flex xs12 class="member-name-container member-information-container mt-1">
            <nuxt-link :to="`/profile/${member.Username}`">
                <span>{{ member.FullName }}</span>
            </nuxt-link>
        </v-flex>
        <v-flex xs12 class="member-skills-container member-information-container mt-1">
            <nuxt-link :to="`/profile/${member.Username}`">
                <v-chip :key="j" v-for="(skill, j) in member.Skills"
                            class="member-skill skill secondary-color mr-2">{{ skill }}</v-chip>
                <v-chip v-if="member.Surplus" class="skill-surplus skill secondary-color mr-2">
                    {{ member.Surplus }}
                </v-chip>
            </nuxt-link>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        props: ['member'],
        methods: {
        }
    }
</script>

<style lang="scss">
    
    .community-member {
        display: flex;
        justify-content: center;
    }

    .member-avatar-container {

        img {
            border: 8px solid rgba(151, 151, 151, 0.6);
        }
    }

    .member-information-container > * {
		text-decoration: none;
        color: initial;
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

        .v-chip__content {
            cursor: pointer;
        }
    }

    .skill-surplus {
        width: 25px;
        height: 20px;
    }

</style>