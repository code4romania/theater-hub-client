<template>
  <v-container fluid pa-0>
    <v-layout row wrap class="projectHero">
      <v-flex sm6 order-sm2>
        <img class="projectHero__image" :src="image">
      </v-flex>
      <v-flex sm6 order-sm1 px-5 class="projectHero__content">
        <h1>{{ title }}</h1>
        <v-avatar size="200px">
          <img :src="require('~/assets/images/default-avatar.svg')" v-if="!initiatorImage">
          <img :src="initiatorImage" v-if="initiatorImage">
        </v-avatar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['title', 'image', 'initiatorImage']
};
</script>

<style lang="scss" scoped>

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
}

.projectHero__content .v-avatar {
  bottom: -50px;
  background: #fff;
  border: 3px solid #e1e1e1;
}
</style>
