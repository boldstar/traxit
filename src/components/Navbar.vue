<template>
    <nav class="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow-sm">
        <a class="navbar-brand ml-3 text-left" href="/"><i class="far fa-compass mr-1"></i>TRAXIT</a>
        <!-- bread crumbs to go here -->
        
        <ul class="navbar-nav mr-3 d-flex flex-row">
            <!-- only shows up at certain screen size. see media queries for "sidebar-btn" -->
            <button v-if="$route.meta.layout != 'admin'" class="bg-light sidebar-btn" data-toggle="tooltip" data-placement="bottom" title="Toggle Drawer" @click="showLinks">
                <i class="fas fa-bars"></i>
            </button>
            <div v-if="loggedIn" class="search-group" @keyup.enter="searchDatabase" :class="{'move-right': hideInput}">
                <button class="icon-btn" type="button" @click="toggleSearch"></button>
                <input type="text" class="search-input" v-model="search" :class="{'collapsed-search': hideInput}" placeholder="e.g.(John Doe, Jane Doe)">
                <i class="fa fa-search search-icon" @click="toggleSearch"></i>
                <div class="search-dropdown" :class="{'hide-dropdown': hideInput}">
                    <select v-model="category" class="search-dropdown-options">
                        <option disabled>{{option}}</option>
                        <option value="name">Name</option>
                        <option value="taxpayer">Taxpayer</option>
                        <option value="spouse">Spouse</option>
                        <option value="number">Phone #</option>
                    </select>
                </div>
            </div>
            <li v-if="loggedIn" class="dropdown align-self-center"> 
                <i class="user fas fa-user-circle" id="dLabel" @click="showDropdown"></i>
                <div class="dropdown-menu dropdown-menu-right" v-if="dropdown" :class="{'dropdown-active': dropdown}">
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
        option: 'All',
        dropdown: false,
        hideInput: true,
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
                    this.hideInput = true
                })
            } else {
                return;
            }
        },
        showDropdown() {
            this.dropdown = !this.dropdown
        },
        showLinks() {
            this.$store.commit('mobileLinks')
        },
        toggleSearch() {
            this.hideInput = !this.hideInput
            this.category = this.option
            this.search = ''
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

    .sidebar-btn {
        display: none;
        border: none;
        border-radius: 3px;
        margin-right: 5px;
        background: transparent!important;
        text-decoration: none;
        color: #ffffff;
        font-size: 1.45rem;
        text-align: center;
        outline: none;

        &:hover {
            cursor: pointer;
        }

        &:focus {
            outline: none!important;
            background: transparent!important;
        }
    }

    .dropdown-active {
        display: block!important;
    }

    .search-group {
        position: relative;
        display: block;
        margin-right: 50px;
        align-self: center;
    }

    .search-dropdown {
        position: absolute;
        top: 0;
        left: 250px;
    }

    .search-dropdown-options {
        border: none;
        background: white;
        border-radius: 0 5px 5px 0;
        height: 30px;
        color: #0077ff;
        cursor: pointer;
    }

    .search-icon {
        position: absolute;
        top: 6px;
        left: 8px;
        color: #0077ff;
        cursor: pointer;
    }

    .search-input {
        border: none;
        height: 30px;
        border-radius: 25px 0 0 25px;
        width: 300px;
        padding-left: 35px;
        transition: width .5s;
    }

    .icon-btn {
        position: absolute;
        height: 30px;
        width: 30px;
        top: 0;
        left: 0;
        border-radius: 50%;
        border: none;
        background-color: white;
        cursor: pointer;

        &:focus {
            outline: none;
        }
    }

    .collapsed-search {
        width: 0;
        visibility: hidden;
    }

    .move-right {
        margin-right: 5px;
    }

    .hide-dropdown {
        left: 0;
        display: none;
    }

    @media screen and (max-width: 950px) {
        .sidebar-btn {
            display: block!important;
        }
    }

    @media screen and (max-width: 767px) {
        .search {
            display: none;
        }
        
        .search-group {
            margin-right: 5px;
        }

        .search-input {
            max-width: 150px!important;
            border-radius: 25px;
        }

        .search-dropdown {
            display: none;
        }
    }

    

</style>