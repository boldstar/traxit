<template>
    <nav class="navbar fixed-top bg-light flex-md-nowrap shadow-sm justify-content-between">
        <button class="bg-light">
            <i class="fas fa-bars"></i>
        </button>
        <button class="bg-light">
            <i class="fas fa-bars"></i>
        </button>
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

button {
    display: inline-block;
    border: none;
    text-decoration: none;
    color: #a1a1a1;
    font-size: 1.0rem;
    text-align: center;

    &:hover {
        cursor: pointer;
    }
}

</style>