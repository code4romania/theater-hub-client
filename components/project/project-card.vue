<template>
  <v-layout column class="mb-4 project">
    <a :href="project_url">
      <v-img :src="project_image" aspect-ratio="1.7"></v-img>
    </a>
    <v-card-title primary-title>
      <div>
        <h4>
          <a :href="project_url">{{ project_title }}</a>
        </h4>
        <div v-if="$route.path !== '/project'" class="project__abstract d-flex">
          <p>{{ project_abstract }}</p>
          <p  class="bold">
            {{ $t('shared.content.project-initiator') }}
            <nuxt-link :to="`/profile/`">
                <span>{{ project_initiator }}</span>
            </nuxt-link>
          </p>
          <p class="bold">
            {{ $t('shared.content.requested-roles') }} {{ project_roles_number }}
          </p>
        </div>
      </div>
    </v-card-title>
    <v-card-actions v-if="$route.path !== '/project'" class="justify-center">
      <v-btn
        class="view-project-button"
        color="primary"
        :href="project_url"
        depressed ripple>
        {{ $t('shared.content.view-project-link') }}
      </v-btn>
    </v-card-actions>
  </v-layout>
</template>


<script>
export default {
  props: {
    project_url: {
      type: String,
      default: ''
    },
    project_title: {
      type: String,
      default: 'Hello World'
    },
    project_image: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1554317280-a89ec28bf9bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
    },
    project_abstract: {
      type: String,
      default:
        'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy'
    },
    project_initiator: {
      type: String,
      default: 'John Doe'
    },
    project_roles_number: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.project {
  border: 2px solid rgba(151, 151, 151, 0.6);
  padding: 5px;

  h4 {
    margin-bottom: 10px;
  }
  a {
    color: #000;
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
