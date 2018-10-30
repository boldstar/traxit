<template>
  <div id="app">

    <Navbar />

    <div class="admin d-flex justify-content-center">
      <main role="main" class="col-lg-10">
        <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          
            <slot />
         
        </transition>
      </main>
    </div>

          
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    },
  },
}
</script>



<style lang="scss">

.page-wrapper {
  animation-duration: .5s;
}

</style>
