<template>
    <nav class="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow-sm">
        <a class="navbar-brand ml-3 text-left" href="/" id="logo"><img src="../assets/traxit_logo_white_official.png" class="logo"/></a>
        <!-- bread crumbs to go here -->
        
        <ul class="navbar-nav mr-3 d-flex flex-row">
            <div v-if="loggedIn && !setupTour && onTrial" class="mobile">
                <div class="dropdown mr-3">
                    <div class="indicator"></div>
                    <button class="btn btn-sm btn-light dropdown-toggle font-weight-bold" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Getting Started
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <router-link class="dropdown-item setup-link" to="/administrator/account">Account Details</router-link>
                        <router-link class="dropdown-item setup-link" to="/contacts">Upload Contacts</router-link>
                        <router-link class="dropdown-item setup-link" to="/administrator/workflows">Create Workflow</router-link>
                        <router-link class="dropdown-item setup-link" to="/add">Start Engagement</router-link>
                        <router-link class="dropdown-item setup-link" to="/administrator/subscription">Subscribe</router-link>
                    </div>
                </div>
            </div>
            <!-- only shows up at certain screen size. see media queries for "sidebar-btn" -->
            <button v-if="$route.meta.layout != 'admin'" class="bg-light sidebar-btn" data-toggle="tooltip" data-placement="bottom" title="Toggle Drawer" @click="showLinks">
                <i class="fas fa-bars"></i>
            </button>
            <div v-if="loggedIn" class="search-group" @keyup.enter="searchDatabase" :class="{'move-right': hideInput}">
                <button class="icon-btn" type="button" @click="toggleSearch"></button>
                <input type="text" class="search-input" v-model="search" :class="{'collapsed-search': hideInput}" placeholder="Enter keyword" ref="search">
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
import {mapGetters} from 'vuex'
import {trialPeriod} from '../plugins/session.js'
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
            date: null,
            onTrial: false
        }
    },
    computed: {
        ...mapGetters(['setupTour', 'trial']),
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
            setTimeout(() => {
                this.$refs.search.focus()
            }, 1000)
        },
        checkTrialDate() {
            setTimeout(() => {
                if(this.trial) {
                    this.onTrial = trialPeriod(this.trial.date)
                }   else this.onTrial = false
            }, 3000)
        }
    },
    mounted() {
        this.checkTrialDate()
    },
    created() {
        this.category = this.option
        if(localStorage.getItem('access_token') != null) {
            this.$store.dispatch('getTours')
            this.$store.dispatch('getTrialDate')
        }
    }
}
</script>

<style lang="scss" scoped>
    .navbar-nav .dropdown-menu {
        position: absolute;
        z-index: 1000;
    }

    .logo {
        height: 22px;
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
        background-color: white;
        width: 300px;
        padding-left: 35px;
        transition: width .5s;
        
        &::placeholder {
            color: #a9a9a9;
        }
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

    .indicator {
        z-index: 10000;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: red;
        position: absolute;
        left: -2px;
        top: -2px;
    }

    .setup-link {
        font-weight: bold;

         &:before{
            content: "";
            position: absolute;
            height: 15px;
            width: 15px;
            left: 5px;
            margin-top: 5px;
            background-color: #0077ff;
            border-radius: 50%;
        }

        &:after {
            content: "";
            position: absolute;
            left: 10px;
            z-index: -2;
            height: 40px;
            border: 3px solid black;
        }

        &:first-child:after {
           height: 20px;
           top: 30px; 
        }
        
        &:last-child:after {
           border-color: transparent; 
        }
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
            display: none!important;
        }

        .mobile {
            display: none!important;
        }
    }

    

</style>