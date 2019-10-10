<template>
  <v-layout column mb-5 class="project">
      <v-flex xs12>
        <nuxt-link :to="`/project/${id}`">
            <v-img
                v-if="image"
                :src="image"
                aspect-ratio="1.7"
            ></v-img>
            <v-img
                v-if="!image"
                :src="require('~/assets/images/main_image.png')"
                aspect-ratio="1.7"
            ></v-img>
        </nuxt-link>
      </v-flex>
      <v-flex xs12 mt-2>
        <nuxt-link :to="`/project/${id}`">
            <h3 class="other-project-name">
                <v-chip
                    v-if="isCompleted"
                    class="ml-0 completed-project-tag"
                    text-color="#FFF"
                    color="#27AE60"
                    label small
                >
                    {{ $t('application-data.completed') }}
                </v-chip>
                {{ name }}
            </h3>
        </nuxt-link>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
    props: {
        id: {
            type: String
        },
        name: {
            type: String
        },
        image: {
            type: String
        },
        isCompleted: {
            type: Boolean
        }
    }
}
</script>

<style lang="scss" scoped>

    h3 {
        color: #000;
        text-decoration: underline;
        text-decoration-color: #000;
        font-size: 20px;
    }

</style>