<template>
  <v-container fluid pa-0>
    <v-layout row wrap class="projectHero">
      <v-flex
        v-if="image && image.ThumbnailLocation"
        sm6 order-sm2>
        <img
          class="projectHero__image"
          :src="image.ThumbnailLocation"
        >
      </v-flex>
      <v-flex sm6 px-5 class="projectHero__content">
        <h1>{{ title }}</h1>
        <v-layout row>
          <v-flex xs12 class="projectHero__initiator">
            <v-avatar size="200px">
              <img :src="require('~/assets/images/default-avatar.svg')" v-if="!initiatorImage">
              <img :src="initiatorImage.ThumbnailLocation" v-if="initiatorImage">
            </v-avatar>
            <v-layout row wrap>
              <span class="label ml-2">{{ $t('pages.project.initiator') }}</span>
              <span class="initiator-name ml-2">{{ initiatorName }}</span>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['title', 'image', 'initiatorName', 'initiatorImage']
};
</script>

<style lang="scss" scoped>

h1 {
  text-decoration: underline;
  font-size: 30px;
  top: calc(50% - 20px);
  position: absolute;
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
