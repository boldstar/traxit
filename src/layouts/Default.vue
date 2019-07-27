<template>
  <div>
    
    <Navbar />

    <Toolbar class="toolbar"  />

    <MobileLinks v-if="mobileLinks" />

    <transition name="router-animation" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
      <Sidebar class="sidebar-collapse" />
    </transition>

<!-- this section is controling the main content section -->
    <div class="d-flex main-wrapper page-wrapper" :class="{'main-wrapper-collapsed': !sidebarOpen }">
      <main role="main" class="flex-fill px-3 main">

        <!-- this is if they have not done a setup tour -->
        <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
         <Setup v-if="$can('delete', admin) && setupTour"/>
        </transition>


        <!-- this is where the pages are being rendered -->
        <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          <slot v-if="!setupTour" />
        </transition>

        <transition name="router-animation" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight" mode="out-in">
          <Timesheet v-if="timesheet" :key="timesheet" />
        </transition>

        <div class="timesheet-bg" v-if="timesheet" @click="toggleTimesheet"></div>
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
import Timesheet from '@/components/Timesheet.vue'

export default {
  props: ['admin'],
  components: {
    Navbar,
    Toolbar,
    Sidebar,
    NotifyModal,
    MobileLinks,
    Setup,
    Timesheet
  },
  data () {
    return {
      closedSidebar: ['col-lg-12', 'page-wrapper'],
      openSidebar: ['col-lg-10', 'page-wrapper'],
      showTour: false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    toggleSidebar() {
      return this.$store.getters.sidebarOpen
    },
    ...mapGetters(['notify', 'mobileLinks', 'setupTour', 'role', 'subscribeView', 'timesheet', 'sidebarOpen']),
  },
  methods: {
    toggleTimesheet() {
      this.$store.commit('toggleTimesheet')
    },
  },
  watch: {
    subscribeView: function(val) {
      if(val && typeof(val) ===  'string') {
        this.$store.dispatch('destroyToken')
      }
    }
  },
  mounted() {
    if(this.$route.query && this.$route.query.code) {
        localStorage.tsheets_code = this.$route.query.code
        localStorage.tsheets_state = this.$route.query.state
        this.$router.replace({'query': null})
        this.$store.dispatch('requestTsheetsToken')
    }
  },
  created() {
    this.$store.dispatch('getAccountDetails')
    if(localStorage.getItem('access_token') != null) {
      this.$store.dispatch('getTours')
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
  transition: margin-left .5s;
}

.toolbar-collapsed {
  margin-left: 50px!important;
}

.main-wrapper {
  margin-left: 215px;
  margin-right: 0;
}

.main-wrapper-collapsed {
  margin-left: 50px!important;
}

.main {
  padding-top: 110px;
}

.timesheet-bg {
  font-family: 'Source Sans Pro', sans-serif!important;
  z-index: 100;
  position: absolute;
  top: 52px;
  left: 0;
  background: rgba(0, 0, 0, 0.37);
  height: calc(100% - 52px);
  width: 100%;
  display: flex;
  align-items: center;
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
