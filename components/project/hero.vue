<template>
  <v-container fluid pa-0>
    <v-layout row wrap class="projectHero">
      <v-flex
        sm6 order-sm2>
        <v-img
          v-if="image"
          class="projectHero__image"
          :src="image"
        ></v-img>
        <v-img
            v-if="!image"
            class="projectHero__image"
            :src="require('~/assets/images/main_image.png')"
            aspect-ratio="1.7"
        ></v-img>
      </v-flex>
      <v-flex sm6 class="projectHero__content" align-end>
        <v-layout row>
          <v-layout
            row
            align-center
            class="name-container"
          >
            <v-chip
                v-if="isCompleted"
                class="ml-0 completed-project-tag"
                text-color="#FFF"
                color="#27AE60"
                label small
            >
                {{ $t('application-data.completed') }}
            </v-chip>
            <h1>
              {{ title }}
            </h1>
          </v-layout>
          <v-flex xs12 class="projectHero__initiator">
            <v-avatar size="200px">
              <img :src="require('~/assets/images/default-avatar.svg')" v-if="!initiatorImage">
              <img :src="initiatorImage" v-if="initiatorImage">
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['title', 'image', 'initiatorName', 'initiatorImage', 'isCompleted']
};
</script>

<style lang="scss" scoped>

.name-container {
  top: calc(50% - 20px);
  position: absolute;
}

h1 {
  text-decoration: underline;
  font-size: 30px;
}

.projectHero {
  background: #000;
  color: #fff;
}

.projectHero__image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-height: 400px;
  margin-bottom: -6px;
}

.projectHero__content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  min-height: 300px;
}

.projectHero__content  > div {
    max-width: 800px;
    width: 100%;
}

.projectHero__content .v-avatar {
  bottom: -100px;
  background: #fff;
  border: 3px solid #e1e1e1;
  margin-right: 10px;
}

.projectHero__initiator {
  display: flex;
  align-items: flex-end;
}

</style>
