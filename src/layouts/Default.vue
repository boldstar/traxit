<template>
  <div id="app">

    <Navbar />

    <Sidebar v-show="loggedIn" />

<!-- this section is controling the main content section -->
    <div class="d-flex col-lg-10 ml-auto page-wrapper">
      <main role="main" class="col-lg-12 col-md-8 ml-sm-auto px-3">   
        <!-- this is where the pages are being rendered -->
        <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
         <slot />
        </transition>
      </main>
    </div>
        
          
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Navbar,
    Sidebar,
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },
}
</script>



<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');


//this is the transition between router views
.page-wrapper {
  animation-duration: .5s;
}


</style>
