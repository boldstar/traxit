<template>
  <div id="app">
    
    <Navbar />

    <Toolbar class="toolbar"  />

    <MobileLinks v-if="mobileLinks" />

    <transition name="router-animation" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
      <Sidebar class="sidebar-collapse" />
    </transition>

<!-- this section is controling the main content section -->
    <div class="d-flex main-wrapper page-wrapper">
      <main role="main" class="flex-fill px-3 main">
        <Setup v-if="setupTour && !setupTour.setup_tour && role == 'Admin'" />   
        <!-- this is where the pages are being rendered -->
        <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
         <slot />
        </transition>
      </main>
    </div>
        
    <notify-modal v-if="notify"></notify-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import Toolbar from '@/components/Toolbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import NotifyModal from '@/components/NotifyModal.vue'
import MobileLinks from '@/components/MobileLinks.vue'
import Setup from '@/components/Setup.vue'

export default {
  components: {
    Navbar,
    Toolbar,
    Sidebar,
    NotifyModal,
    MobileLinks,
    Setup
  },
  data () {
    return {
      closedSidebar: ['col-lg-12', 'page-wrapper'],
      openSidebar: ['col-lg-10', 'page-wrapper'],
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    toggleSidebar() {
      return this.$store.getters.sidebarOpen
    },
    ...mapGetters(['notify', 'mobileLinks', 'setupTour', 'role']),
  },
  created() {
    if(localStorage.getItem('access_token') != null) {
      this.$store.dispatch('checkGracePeriod');
    }
  }
}
</script>



<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');


//this is the transition between router views
.page-wrapper {
  animation-duration: .5s;
  transition: margin-left .5s;
}

.toolbar {
  margin-left: 215px;
  margin-right: 0;
}

.main-wrapper {
  margin-left: 215px;
  margin-right: 0;
}

.main {
  padding-top: 110px;
}


@media screen and (max-width: 950px) {
  .sidebar-collapse {
    display: none;
  }

  .toolbar {
    display: none!important;
  }

  .main-wrapper {
    margin-left: 0!important;
  }

  .main {
    padding-top: 70px!important;
  }
}

</style>
