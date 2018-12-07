<template>
    <nav class="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow-sm">
        <a class="navbar-brand col-sm-3 col-md-2 ml-3 text-left" href="/"><i class="far fa-compass mr-1"></i>TRAXIT</a>
        <!-- bread crumbs to go here -->
        
        <ul class="navbar-nav mr-3 d-flex flex-row">
            <li v-if="loggedIn" class="mr-3">
                <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                    <select v-model="category" class="btn btn-light text-primary">
                        <option disabled>{{option}}</option>
                        <option value="name">Name</option>
                        <option value="number">Phone #</option>
                    </select>
                </div>
                <input type="text" placeholder="Type Here.." class="form-control" v-model="search">
                <div class="input-group-append">
                    <router-link class="btn btn-secondary" to="/search" @click.native="searchDatabase" @keyup.enter.native="searchDatabase">Search</router-link>
                </div>
                </div>
            </li>
            <li v-if="loggedIn" class="dropdown align-self-center"> 
                <i class="user fas fa-user-circle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dLabel"></i>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dLabel">
                    <router-link class="dropdown-item" to="/profile">Profile</router-link>
                    <div v-if="$can('read', admin)">
                        <router-link class="dropdown-item" to="/administrator/account">Admin</router-link>
                    </div>
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
    props: ['admin'],
    data () {
        return {
        isActive: false,
        search: '',
        category: '',
        option: 'Choose..'
        }
    },
    computed: {
        loggedIn() {
        return this.$store.getters.loggedIn
        },
    },
     methods: {
        logout() {
            this.$store.dispatch('destroyToken')
            .then(response => {
                    this.$router.push('/login')
            })
        },
        searchDatabase() {
            this.$store.dispatch('searchDatabase', { keyword: this.search, category: this.category})
            .then(() => {
                this.$router.push({path: '/search', query: {keyword: this.search }})
                this.search = ''
                this.category = this.option
            })
        }
    },
    created() {
        this.category = this.option
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
        color: #0077ff;
        background-color: rgba(187, 187, 187, 0.486);
    }

    input .search{
        border-radius: 100px;
    }

</style>