<template>
    <v-layout row wrap pt-1 pb-3 class="server-side-errors-list">
        <v-flex :key="i" v-for="(error, i) in errors" xs12 py-1>
            {{ error.message }}
        </v-flex>
    </v-layout>
</template>

<script>

export default {
    props: ['errors']
}

</script>

<style lang="scss" scoped>

    .server-side-errors-list {
        color: #F00;
    }

</style>
