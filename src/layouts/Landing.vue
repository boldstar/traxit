<template>
  <div id="app">
    <div class="landing">

        <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          <slot />
        </transition>

    </div>

          
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
  created() {
    setTimeout(() => {
      hopscotch.endTour(true)
    }, 1000)
  }
}
</script>



<style lang="scss" scoped>

.landing {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page-wrapper {
  animation-duration: .5s;
}

</style>
