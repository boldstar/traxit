<template>
    <div class="processing" v-if="processing">
        <div class="processing-inner"></div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'processing-bar',
    computed: {
        ...mapGetters(['processing'])
    }
}
</script>

<style lang="scss" scoped>
    
.processing {
  height: 5px;
  left: 0;
  width: 100%;
  position: absolute;
  background: #0077ff;
  top: 0;

  .processing-inner {
    height: 5px;
    position: absolute;
    background: white;
    width: 100px;
    left: 0;
    animation: run liner infinate alternate 2s;
    -webkit-animation: run 2s linear infinite alternate;
  }

  @-webkit-keyframes run {
    0% { left: 0;}
    50%{ left : 100%;}
    100%{ left: 0;}
  }

  @keyframes run {
    0% { left: 0;}
    50%{ left : 100%;}
    100%{ left: 0;}
  }
}
</style>
