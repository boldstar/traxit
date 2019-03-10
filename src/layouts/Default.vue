<template>
  <div id="app">
    
    <Navbar />

    <Toolbar class="ml-auto" v-bind:class="[!toggleSidebar ? closedSidebar : '', openSidebar]" />

    <transition name="router-animation" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
      <Sidebar v-if="toggleSidebar" />
    </transition>

<!-- this section is controling the main content section -->
    <div class="d-flex ml-auto page-wrapper" v-bind:class="[!toggleSidebar ? closedSidebar : '', openSidebar]">
      <main role="main" class="col-lg-12 col-md-8 ml-sm-auto px-3">   
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
import Navbar from '@/components/Navbar.vue'
import Toolbar from '@/components/Toolbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import NotifyModal from '@/components/NotifyModal.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Navbar,
    Toolbar,
    Sidebar,
    NotifyModal
  },
  data () {
    return {
      closedSidebar: ['col-lg-12', 'page-wrapper'],
      openSidebar: ['col-lg-10', 'page-wrapper']
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    toggleSidebar() {
      return this.$store.getters.sidebarOpen
    },
    ...mapGetters(['notify'])
  },
  created() {
    this.$store.dispatch('checkGracePeriod');
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



</style>
