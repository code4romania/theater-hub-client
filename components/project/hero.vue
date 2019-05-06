<template>
  <v-container fluid pa-0>
    <v-layout row wrap class="projectHero">
      <v-flex sm6 order-sm2>
        <img class="projectHero__image" :src="require('~/assets/images/default-project-hero.jpg')">
      </v-flex>
      <v-flex sm6 order-sm1 px-5 class="projectHero__content">
        <h1 class="pb-4">Back to the Future - Contemporary Dance Show</h1>
        <v-avatar size="200px">
          <img :src="require('~/assets/images/default-avatar.svg')" v-if="!profileImage">
          <img :src="`data:image/png;base64,${profileImage}`" v-if="profileImage">
        </v-avatar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.projectHero {
  background: #000;
  color: #fff;
}

.projectHero__image {
  object-fit: cover;
  width: 100%;
  height: 420px;
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
