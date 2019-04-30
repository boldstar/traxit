<template>
  <div id="app">

    <Navbar />

    <div class="admin d-flex justify-content-center">
      <main class="col-lg-12 px-0">
        <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          
            <slot />
         
        </transition>
      </main>
    </div>

          
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import adminTour from '../plugins/adminTourObj.js'
import adminSetup from '../plugins/adminTourSetup.js'

export default {
  components: {
    Navbar,
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    },
  },
  mounted() {
    // start tour if local storage admin_tour_complete is not set
      if(!localStorage.getItem('admin_tour_complete')) {
        adminSetup.init(adminTour)
      }
  },
  created() {
    hopscotch.endTour(true)
  }
}
</script>



<style lang="scss">

main {
  padding-top: 35px;
  overflow-x: hidden;
}

.page-wrapper {
  animation-duration: .5s;
}

</style>
