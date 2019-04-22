<template>
  <v-app>  
        <section>
            <v-container v-if="error.statusCode === 404" fluid page-not-found-container class="mt-5 pa-5 page-not-found-container">
                <v-layout row wrap>
                    <v-flex>
                        <h1 class="mb-3">{{ $t('pages.errors.not-found-title') }}</h1>
                    </v-flex>
                    <v-flex xs12>
                        <p>
                            {{ $t('pages.errors.not-found-description') }}
                        </p> 
                    </v-flex>
                </v-layout>
            </v-container>
            
            <v-container v-if="error.statusCode === 500" fluid error-page-container class="mt-5 pa-5 error-page-container">
                <v-layout row wrap>
                    <v-flex>
                        <h1 class="mb-3">{{ $t('pages.errors.error-title') }}</h1>
                    </v-flex>
                    <v-flex xs12>
                        <p>
                            {{ $t('pages.errors.error-description') }}
                        </p> 
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
    </v-app>
</template>

<script>

    export default {
        props: ['error']
    }

</script>
