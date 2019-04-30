<template>
    <div class="nuxt-wrapper">
        <Header />
        <main>
        <v-content>
            <nuxt />
        </v-content>
        </main>
    </div>
</template>

<script>
import Header from '~/components/shared/header.vue';

export default {
    components: {
        Header
    }
}
</script>

<style lang="scss" scoped>

</style>
