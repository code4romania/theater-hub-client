<template>
  <section>
    <v-container v-if="error.statusCode === 404" fluid page-not-found-container class="mt-5 pa-5 page-not-found-container">
        <v-layout row wrap>
            <v-felx>
                <h1 class="mb-3">Page not found</h1>
            </v-felx>
            <v-flex xs12>
                <p>
                    The page you are looking for does not exist!
                </p> 
            </v-flex>
        </v-layout>
    </v-container>
    
    <v-container v-if="error.statusCode === 500" fluid error-page-container class="mt-5 pa-5 error-page-container">
        <v-layout row wrap>
            <v-felx>
                <h1 class="mb-3">An unexpected error has occured</h1>
            </v-felx>
            <v-flex xs12>
                <p>
                    Please try again.
                </p> 
            </v-flex>
        </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>
