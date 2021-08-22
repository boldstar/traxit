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

    <delete-modal></delete-modal>
          
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue'

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

main {
  padding-top: 35px;
  overflow-x: hidden;
}

.page-wrapper {
  animation-duration: .5s;
}

</style>
