<template>
  <div id="app">

    <div class="reset">

        <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          <slot />
        </transition>

    </div>

          
  </div>
</template>


<style lang="scss" scoped>

.reset {
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
