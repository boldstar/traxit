<template>
    <nav class="navbar fixed-top bg-light flex-md-nowrap shadow-sm justify-content-between">
        <button class="bg-light" @click="handleClick">
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
        open () {
            return this.$store.state.sidebarOpen
        }
    },
    methods: {
        handleClick () {
            this.$store.dispatch('toggleSidebar')
        }
    }
}
</script>

<style lang="scss" scoped>

nav {
    height: 40px;
    margin-top: 52px; //space for the navbar
    z-index: 1;
}

button {
    border: 1px solid rgba(128, 128, 128, 0.322);
    border-radius: 3px;
    text-decoration: none;
    color: #a1a1a1;
    font-size: 1.0rem;
    text-align: center;

    &:hover {
        cursor: pointer;
    }
}

</style>