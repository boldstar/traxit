<template>
    <nav class="navbar navbar-dark fixed-top bg-secondary flex-md-nowrap p-0 shadow">
        
    </nav>
</template>

<script>
export default {
    name: 'toolbar',
    data () {
        return {
        isActive: false,
        name: '',
        }
    },
    computed: {
        loggedIn() {
        return this.$store.getters.loggedIn
        }
    },
    created() {
        this.$store.dispatch('retrieveName')
        .then(response => {
            this.name = response.data.name
        })
    },
     methods: {
        logout() {
            this.$store.dispatch('destroyToken')
            .then(response => {
                    this.$router.push('/login')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .navbar-nav .dropdown-menu {
        position: absolute;
    }

    .navbar-brand {
        padding-top: .75rem;
        padding-bottom: .75rem;
        font-size: 1.2rem;
        // background-color: rgba(0, 0, 0, .25); this can change the color of the navbar brand
        // box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25); this adds a line inbetween navbar and navbar brand
    }

    .navbar .form-control {
        padding: .75rem 1rem;
        border-width: 0;
        border-radius: 0;
    }


    .nav-link {
        text-decoration: none;
    }
    
    .link {
        color: rgb(219, 218, 218);
    }

    .user {
        font-size: 30px;
        color: white;

        &:hover {
            color: rgb(233, 233, 233);
            cursor: pointer;
        }

    }

    .is-active {
        color: white;
    }

</style>