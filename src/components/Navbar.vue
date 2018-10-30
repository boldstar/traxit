<template>
    <nav class="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow-sm">
        <a class="navbar-brand col-sm-3 col-md-2 ml-3 text-left" href="/"><i class="far fa-compass mr-1"></i>TRAXIT</a>
        <!-- bread crumbs to go here -->
        <ul class="navbar-nav pr-3">
        <ul class="navbar-nav pr-3 d-flex flex-row">
            <li v-if="!loggedIn" class="pr-4" v-bind:class="{ 'is-active': isActive }">
                <router-link class="h6 link" to="/register">Sign Up</router-link>
            </li>
            <li v-if="!loggedIn" v-bind:class="{ 'is-active': isActive }">
                <router-link class="h6 link"  to="/login">Login</router-link>
            </li>
        </ul>
        <li v-if="loggedIn" class="dropdown"> 
            <i class="user fas fa-user-circle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dLabel"></i>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dLabel">
            <router-link class="dropdown-item" to="#">Profile</router-link>
            <router-link class="dropdown-item" to="/administrator">Admin</router-link>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item logout" @click="logout">Logout<i class="ml-5 fas fa-sign-out-alt"></i></a>
            </div>
        </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    data () {
        return {
        isActive: false,
        }
    },
    computed: {
        loggedIn() {
        return this.$store.getters.loggedIn
        }
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

    .logout {
        cursor: pointer;
    }

    .is-active {
        color: white;
    }

</style>