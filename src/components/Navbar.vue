<template>
    <nav class="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow-sm">
        <a class="navbar-brand col-sm-3 col-md-2 ml-3 text-left" href="/"><i class="far fa-compass mr-1"></i>TRAXIT</a>
        <!-- bread crumbs to go here -->
        
        <ul class="navbar-nav mr-3 d-flex flex-row">
            <li v-if="loggedIn" class="mr-3">
                <div class="input-group input-group-sm" @keyup.enter="searchDatabase">
                    <div class="input-group-prepend">
                        <select v-model="category" class="btn text-primary font-weight-bold">
                            <option disabled>{{option}}</option>
                            <option value="name">Name</option>
                            <option value="taxpayer">Taxpayer</option>
                            <option value="spouse">Spouse</option>
                            <option value="number">Phone #</option>
                        </select>
                    </div>
                    <input type="text" placeholder="Enter Keyword.." class="form-control search-input" v-model="search">
                    <div class="input-group-append">
                        <button class="btn btn-light text-primary search-btn" @click="searchDatabase"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </li>
            <li v-if="loggedIn" class="dropdown align-self-center"> 
                <i class="user fas fa-user-circle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dLabel"></i>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dLabel">
                    <router-link class="dropdown-item" to="/profile">Profile</router-link>
                    <div v-if="$can('delete', admin)">
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
        option: 'All'
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
            if(this.search != '') {
                this.$store.dispatch('searchDatabase', { keyword: this.search, category: this.category})
                .then(() => {
                    this.$router.push({path: '/search', query: {keyword: this.search }})
                    this.search = ''
                    this.category = this.option
                })
            } else {
                return;
            }
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

    .search-input {
        background-color: rgba(255, 255, 255, 0.5);

        &:focus {
            background-color: white;
            outline: none!important;
        }
    }

    .search-btn {
        padding: 1px 5px !important;
        font-size: 1.15rem !important;
    }

    input::placeholder {
        color: white;
        font-weight: 600 !important;
    }


</style>