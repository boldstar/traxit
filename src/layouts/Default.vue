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
      <main role="main" class="flex-fill bg-light" :class="{'px-3 main': $route.name != 'dashboard'}">

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

        <transition name="router-animation" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight" mode="out-in">
          <BrowserHistory v-if="browserHistory" :key="browserHistory" />
        </transition>

        <div class="timesheet-bg" v-if="timesheet" @click="toggleTimesheet"></div>
        <div class="timesheet-bg" v-if="browserHistory" @click="toggleBrowserHistory"></div>
      </main>
    </div>
        
    <approval-modal @reset-modal="resetApprovalModal" @close-modal="closeApprovalModal"></approval-modal>    
    <notify-modal v-if="notify"></notify-modal>
    <delete-modal></delete-modal>
    <rubex-integration-modal :modal="true" @reset_modal="resetRubexModal" @close-modal="closeRubexModal"></rubex-integration-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/layout/Navbar.vue'
import Toolbar from '@/components/layout/Toolbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import NotifyModal from '@/components/modals/NotifyModal.vue'
import MobileLinks from '@/components/layout/MobileLinks.vue'
import Setup from '@/components/onboard/Setup.vue'
import Timesheet from '@/components/tsheets/Timesheet.vue'
import BrowserHistory from '@/components/browser/BrowserHistory.vue'
import ApprovalModal from '@/components/modals/ApprovalModal.vue'
import RubexIntegrationModal from '../components/modals/RubexIntegrationModal.vue'
export default {
  props: ['admin'],
  components: {
    Navbar,
    Toolbar,
    Sidebar,
    NotifyModal,
    MobileLinks,
    Setup,
    Timesheet,
    BrowserHistory,
    ApprovalModal,
    RubexIntegrationModal
  },
  data () {
    return {
      
    RubexIntegrationModalclosedSidebar: ['col-lg-12', 'page-wrapper'],
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
    ...mapGetters(['notify', 'mobileLinks', 'setupTour', 'role', 'subscribeView', 'timesheet', 'sidebarOpen', 'browserHistory']),
  },
  methods: {
    toggleTimesheet() {
      this.$store.commit('toggleTimesheet')
    },
    toggleBrowserHistory() {
      this.$store.commit('BROWSER_HISTORY')
    },
    resetApprovalModal() {
      this.$store.commit('showAutomationApprovalModal', null)
    },
    closeApprovalModal() {
      this.$store.commit('showAutomationApprovalModal', null)
    },
    resetRubexModal() {
      this.$store.dispatch('showRubexIntegrationModal', null)
    },
    closeRubexModal() {
      this.$store.dispatch('showRubexIntegrationModal', null)
    }
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
        this.$store.dispatch('checkGracePeriod')
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
  height: 100vh;
}

.main-wrapper-collapsed {
  margin-left: 50px!important;
}

.main {
  padding-top: 110px;
  overflow-y: auto;
  height: 100%;
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
