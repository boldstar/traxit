<template>
    <nav class="navbar navbar-dark fixed-top bg-light flex-md-nowrap pt-3 shadow-sm justify-content-between text-secondary">
        <i class="ml-2 h5 fas fa-bars"></i>
        <i class="ml-2 h5 fas fa-bars"></i>
    </nav>
</template>

<script>
export default {
    name: 'toolbar',
    computed: {
        loggedIn() {
        return this.$store.getters.loggedIn
        }
    },
}
</script>

<style lang="scss" scoped>

nav {
    height: 40px;
    margin-top: 52px; //space for the navbar
    z-index: 0;
}

</style>