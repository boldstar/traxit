<template>
    <nav class="bg-light sidebar" :class="{'sidebar-collapsed': !sidebarOpen}">
        <div class="sidebar-sticky d-flex flex-column">
        <ul class="nav nav-fill flex-column align-items-start">
            <li class="nav-item w-100" v-if="role != 'Outsource'"  v-bind:class="{ 'is-active': isActive && sidebarOpen }" id="dashboard">
                <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
                    <router-link class="nav-link border-right text-left pl-4 d-flex" :class="{'sidebar-collapsed-link': !sidebarOpen}" to="/"><i class="fas fa-tachometer-alt align-self-center"></i><span :class="sidebarOpen ? 'show-link' : 'hide-link'">Dashboard</span></router-link>  
                </transition> 
            </li>
            <li class="nav-item w-100" v-if="role != 'Outsource'" id="firm" v-bind:class="{ 'is-active': isActive && sidebarOpen }">
                <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">         
                    <router-link class="nav-link border-right text-left pl-4 d-flex" :class="{'sidebar-collapsed-link': !sidebarOpen}" to="/firm"><i class="fas fa-home align-self-center"></i><span :class="sidebarOpen ? 'show-link' : 'hide-link'">Firm</span></router-link>
                </transition>  
            </li>
            <li class="nav-item w-100" id="tasks" v-bind:class="{ 'is-active': isActive && sidebarOpen }">
                <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
                    <router-link class="nav-link border-right text-left pl-4 d-flex" :class="{'sidebar-collapsed-link': !sidebarOpen}" to="/tasks"><i class="fas fa-list-ul align-self-center"></i><span :class="sidebarOpen ? 'show-link' : 'hide-link'">Tasks</span></router-link>  
                </transition>
            </li>
            <li class="nav-item w-100" id="engagements" v-if="role != 'Outsource'"  v-bind:class="{ 'is-active': isActive && sidebarOpen }">
                <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
                    <router-link class="nav-link border-right text-left pl-4 d-flex" :class="{'sidebar-collapsed-link': !sidebarOpen}" to="/engagements" @click.native="filterEngagements('All')"><i class="far fa-folder-open align-self-center"></i><span :class="sidebarOpen ? 'show-link' : 'hide-link'">Engagements</span></router-link>
                </transition>
                <transition name="list">
                    <ul v-if="$route.path == '/engagements' && sidebarOpen" class="sublist" :class="{'show-sublist': $route.path == '/engagements'}">
                        <li @click="filterEngagements('In Progress')" :class="{'sublist-link' : engagementFilter == 'In Progress'}">
                            In Progress
                        </li>
                        <li @click="filterEngagements('Past Due')" :class="{'sublist-link' : engagementFilter == 'Past Due'}">
                            Past Due
                        </li>
                        <li @click="filterEngagements('Priority')" :class="{'sublist-link' : engagementFilter == 'Priority'}">
                            Priority
                        </li>
                        <li @click="filterEngagements('Pending')" :class="{'sublist-link' : engagementFilter == 'Pending'}">
                            Pending
                        </li>
                        <li @click="filterEngagements('Complete')" :class="{'sublist-link' : engagementFilter == 'Complete'}">
                            Complete
                        </li>
                    </ul> 
                </transition> 
            </li>
            <li class="nav-item w-100" id="contacts" v-if="role != 'Outsource'"  v-bind:class="{ 'is-active': isActive && sidebarOpen }"> 
                <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">            
                    <router-link class="nav-link border-right text-left pl-4 d-flex" :class="{'sidebar-collapsed-link': !sidebarOpen}" to="/contacts"><i class="fas fa-users align-self-center"></i><span :class="sidebarOpen ? 'show-link' : 'hide-link'">Contacts</span></router-link>
                </transition>  
            </li>
            <li class="nav-item w-100" id="add-new" v-if="role != 'Outsource'"  v-bind:class="{ 'is-active': isActive && sidebarOpen }">
                <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
                    <router-link class="nav-link border-right text-left pl-4 d-flex" :class="{'sidebar-collapsed-link': !sidebarOpen}" to="/add"><i class="far fa-plus-square align-self-center"></i><span :class="sidebarOpen ? 'show-link' : 'hide-link'">Add New</span></router-link>  
                </transition>
            </li>
        </ul>
        <div class="mt-auto mb-3">
            <transition name="router-animation" enter-active-class="animated bounceInLeft" leave-active-class="animated fadeOut" mode="out-in">
                <Toaster :message="successAlert" :type="'success'" v-if="successAlert" />
            </transition>   
            <transition name="router-animation" enter-active-class="animated bounceInLeft" leave-active-class="animated fadeOut" mode="out-in">
                <Toaster :message="errorMsgAlert" :type="'error'" v-if="errorMsgAlert" />
            </transition>   
        </div>
        </div>
    </nav>
</template>

<script>
import Toaster from '@/components/Toaster.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'sidebar',
    components: {
        Toaster
    },
    data () {
        return {
        isActive: false,
        role: localStorage.getItem('role')
        }
    },
    computed: {
        ...mapGetters(['successAlert', 'errorAlert', 'errorMsgAlert', 'engagementFilter', 'sidebarOpen'])
    },
    methods: {
        filterEngagements(filter) {
            this.$store.commit('changeEngagementFilter', filter)
        }
    }
}
</script>

<style lang="scss" scoped>

    .list-enter-active, .list-leave-active {
        transition: opacity 1s;
        min-height: 215px;
        height: 100%;
    }
    .list-enter, .list-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        height: 0;
    }

    .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 100; /* Behind the navbar */
        padding: 52px 0 0; /* Height of navbar */
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
        width: 215px!important;
        transition: width .5s;
    }

    .sidebar-collapsed {
        width: 50px!important;
    }

    .sidebar-collapsed-link {
        padding-left: 13px!important;
    }

    .show-link {
        visibility: visible!important;
        display: block;
        transition: all .5s;
        opacity: 1;
    }
    
    .hide-link {
        visibility: hidden!important;
        display: none;
        opacity: 0;
    }

    .sidebar-sticky {
        position: relative;
        top: 0;
        height: calc(100vh - 52px);
        padding-top: .5rem;
        overflow-x: hidden;
        overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */

        i {
            margin-right: 10px;
            font-size: 16px;
        }

        .title {
            font-size: 16px;
        }
    }

    @supports ((position: -webkit-sticky) or (position: sticky)) {
        .sidebar-sticky {
            position: -webkit-sticky;
            position: sticky;
        }
    }



    .sidebar .nav-link {
        font-size: 19px;
        font-weight: 600;
        color: rgb(0, 0, 0);
        list-style: none;
        letter-spacing: .05em;
        transition-duration: .3s;
        padding-top: 20px;
        padding-bottom: 20px;
        transition: .5s;

        i {
            font-size: 22px;
        }

        &:hover {
            background:rgb(223, 231, 253);
        }
    }

    

    .is-active {
        background: rgb(223, 231, 253);

        i {
            color: #0077ff;
        }

        &:after {
            content: " ";
            position: absolute;
            height: 0;
            width: 0;
            border-bottom: 15px solid transparent;
            border-top: 15px solid transparent;
            border-right: 15px solid white;
            margin-top: 0;
            left: 200px;
            transition: 1s;
        }

    }


    .sidebar-heading {
        font-size: 1.0rem;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: .2em;
    }

    .nav {
        margin-top: 32px!important;
    }

    .sublist {
        list-style: none;
        text-align: right;
        background: #fff;
        padding: 10px;
        font-weight: bold;
        border-right: 1px solid rgb(231, 231, 231);
        transition: all .5s;

        li {
            margin-right: 20px;
            margin-bottom: 8px;
            position: relative;
        
            &:hover {
                cursor: pointer;
            }

            &:before {
                content: "";
                position: absolute;
                left: 12px;
                margin-top: 8px;
                height: 10px;
                width: 10px;
                box-sizing: border-box;
                border-radius: 50%;
                background: rgb(231, 231, 231);
            }

        }

    }

    .sublist-link {
        color: #0077ff;

        &:after {
            content: " ";
            position: absolute;
            height: 0;
            width: 0;
            border-bottom: 8px solid transparent;
            border-top: 8px solid transparent;
            border-right: 8px solid rgb(231, 231, 231);
            margin-top: 5px;
            left: 196px;
            transition: 1s;
        }
    }

</style>

