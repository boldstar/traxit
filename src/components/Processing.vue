<template>
    <div class="processing">
        <!-- this is the modal to confirm or cancel the delete for the engagement -->
      <b-modal v-model="startProcess" hide-footer hide-header>
        <div class="d-block text-center my-3">
          <h1>Processing...</h1>
          <div class="parent-bar">
          <div class="child-bar" v-bind:style="{ width: progress + '%'}">
          <span>{{ progress + '%' }}</span>
          </div>
        </div>
        <span class="font-weight-bold" v-if="done">Almost Done!</span>
        </div>
      </b-modal>
    </div>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
    name: 'processing',
    data() {
      return {
        startProcess: true,
        progress: 0,
        done: false
      }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    methods: {
      startProgress() {
        var vm = this
        var width = 20
        var increase = setInterval(() => {
          vm.progress += width
          if(vm.progress >= 100) {
            clearInterval(increase);
            this.done = true
          }
      }, 200)
      }
    },
    mounted() {
      this.startProgress()
    }

}
</script>

<style scoped>

  .parent-bar {
    height: 25px;
    width: 100%;
    background: gray;
    display: flex;
    z-index: -1;
  }

  .child-bar {
    height: 20px;
    background: #0077ff;
    color:  white;
    align-self: center;
    z-index: 0;
  }

</style>




