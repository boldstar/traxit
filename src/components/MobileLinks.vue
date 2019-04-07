<template>
    <nav class="bg-light sidebar">
        <div class="sidebar-sticky d-flex flex-column">
            <ul class="nav nav-fill flex-column align-items-start">
                <li class="nav-item w-100" v-if="role != 'Outsource'"  v-bind:class="{ 'is-active': isActive }" @click="closeSidebar">                                        
                    <router-link class="nav-link border-right text-left pl-4" to="/"><span><i class="fas fa-tachometer-alt"></i></span>Dashboard</router-link>   
                </li>
                <li class="nav-item w-100" v-if="role != 'Outsource'"  v-bind:class="{ 'is-active': isActive }" @click="closeSidebar">                                        
                    <router-link class="nav-link border-right text-left pl-4" to="/firm"><span><i class="fas fa-home"></i></span>Firm</router-link>  
                </li>
                <li class="nav-item w-100"  v-bind:class="{ 'is-active': isActive }" @click="closeSidebar">
                    <router-link class="nav-link border-right text-left pl-4" to="/tasks"><span><i class="fas fa-list-ul"></i></span>Tasks</router-link>  
                </li>
                <li class="nav-item w-100" v-if="role != 'Outsource'"  v-bind:class="{ 'is-active': isActive }" @click="closeSidebar">                                  
                    <router-link class="nav-link border-right text-left pl-4" to="/engagements"><span><i class="far fa-folder-open"></i></span>Engagements</router-link>  
                </li>
                <li class="nav-item w-100" v-if="role != 'Outsource'"  v-bind:class="{ 'is-active': isActive }" @click="closeSidebar">                                  
                    <router-link class="nav-link border-right text-left pl-4" to="/contacts"><span><i class="fas fa-users"></i></span>Contacts</router-link>  
                </li>
                <li class="nav-item w-100" v-if="role != 'Outsource'"  v-bind:class="{ 'is-active': isActive }" @click="closeSidebar">                                  
                    <router-link class="nav-link border-right text-left pl-4" to="/add"><span><i class="far fa-plus-square"></i></span>Add New</router-link>  
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import Toaster from '@/components/Toaster.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'mobile-links',
    data () {
        return {
        isActive: false,
        role: localStorage.getItem('role')
        }
    },
    computed: {
        ...mapGetters(['successAlert', 'errorAlert', 'errorMsgAlert'])
    },
    methods: {
        closeSidebar() {
            this.$store.commit('mobileLinks');
        }
    }
}
</script>

<style lang="scss" scoped>

.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 52px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    width: 215px!important;
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

}

.nav {
    margin-top: 32px!important;
}

@media screen and (max-width: 450px) {
        .sidebar .nav-link {
            font-size: 16px;
            padding-top: 15px;
            padding-bottom: 15px;

            i {
                font-size: 18px;
            }

            &:hover {
                background:rgb(223, 231, 253);
        }
    }
}

</style>

