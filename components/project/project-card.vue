<template>
  <v-layout
      column fill-height
      class="mb-4 project"
      v-bind:class="{'border': has_border}"
    >
    <v-img
      v-if="project_image"
      :src="project_image"
      aspect-ratio="1.7"
    ></v-img>
    <v-img
      v-if="!project_image"
      :src="require('~/assets/images/main_image.png')"
      aspect-ratio="1.7"
    ></v-img>
    <v-card-title primary-title>
      <div>
        <h4>
          {{ project_title }}
        </h4>
        <div class="project__abstract d-flex">
          <p>{{ project_abstract }}</p>
          <p
            v-if="project_initiator"
            class="bold"
          >
            {{ $t('shared.content.project-initiator') }}
            <nuxt-link :to="`/profile/${project_username}`">
                <span>{{ project_initiator }}</span>
            </nuxt-link>
          </p>
          <p
            v-if="project_city"
            class="bold"
          >
            {{ $t('shared.content.city') }} {{ project_city }}
          </p>
        </div>
      </div>
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-btn
        class="view-project-button"
        color="primary"
        :to="`/project/${project_id}`"
        depressed ripple>
        {{ $t('shared.content.view-project-link') }}
      </v-btn>
    </v-card-actions>
  </v-layout>
</template>


<script>
export default {
  props: {
    project_id: {
      type: String,
      default: ''
    },
    project_username: {
      type: String,
      default: ''
    },
    project_url: {
      type: String,
      default: ''
    },
    project_title: {
      type: String,
      default: ''
    },
    project_image: {
      type: String,
      default: ''
    },
    project_abstract: {
      type: String,
      default: ''
    },
    project_initiator: {
      type: String,
      default: ''
    },
    project_city: {
      type: String,
      default: ''
    },
    has_border: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.project {
  padding: 5px;

  &.border {
    border: 2px solid rgba(151, 151, 151, 0.6);
  }

  h4 {
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: #777;
  }
  a {
    color: #000;
    text-decoration-color: #777;
  }
  &__abstract {
    flex-direction: column;
  }
  .bold {
    font-weight: 700;
  }
  .view-project-button {
    text-transform: initial;
  }
}
</style>
