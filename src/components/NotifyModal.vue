<template>
    <div >
        <!-- this is the modal to notify client of status -->
      <b-modal v-model="notifyModal" hide-footer hide-header>
        <div class="d-flex justify-content-between mb-2">
          <h4 class="text-primary font-weight-bold">Notify Contact</h4>
          <i class="far fa-envelope text-primary fa-2x"></i>
        </div>
        <div class="py-4 bg-light" v-if="!processing">
          <span class="font-weight-bold bg-light message">Would You Like To Notify The Contact Of The Following Status Update?</span>
          <div class="mt-3">
            <span class="font-weight-bold text-primary">"{{ taskForNotification.title }}"</span>
          </div>
        </div>
        <div v-if="processing" class="py-4 mb-5">
          <div class="mail-container mt-5">
              <div class="box">
                  <div class="border one"></div>
                  <div class="border two"></div>
                  <div class="border three"></div>
                  <div class="border four"></div>
                  <div class="line one"></div>
                  <div class="line two"></div>
                  <div class="line three"></div>
              </div>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-4">
          <button type="button" class="btn btn-primary btn-sm" @click="selectTo = true" :disabled="processing" v-if="!selectTo">
            <span v-if="!processing">Yes, Send Email</span>
            <span v-if="processing">Sending Mail...</span>
          </button>
          <div class="d-flex" v-if="selectTo && !processing">
            <button type="button" class="btn btn-primary btn-sm" @click="sendMail('both')">Both</button>
            <p class="h5  mx-2">|</p>
            <button type="button" class="btn btn-info btn-sm" @click="sendMail('taxpayer')">Tax Payer</button>
            <p class="h5  mx-2">|</p>
            <button type="button" class="btn btn-secondary btn-sm" @click="sendMail('spouse')">Spouse</button>
          </div>
          <button type="button" class="btn btn-danger btn-sm" @click="closeModal()" v-if="!processing">No Thanks</button>
        </div>
      </b-modal>
    </div>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { mapGetters } from 'vuex'

export default {
    name: 'NotifyModal',
    data() {
      return {
        notifyModal: true,
        selectTo: false
      }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
      ...mapGetters(['taskForNotification', 'processing'])
    },
    methods: {
      closeModal() {
        this.$store.commit('notifyClientModal')
      },
      sendMail(send_to) {
        this.selectTo = false
        this.$store.dispatch('notifyClient', {task: this.taskForNotification, send_to: send_to})
      }
    },
}
</script>

<style scoped>

 .message {
   font-size: .8rem;
 }

 .mail-container {
    height:50px;
    width:40px;
    position:absolute;
    left:0;
    right:0;
    top:20px;
    bottom:0;
    margin:auto;
}
.mail-container::after {
    content:'Sending';
    color:#0077ff;
    font-weight:700;
    position:absolute;
    bottom:-20px;
    left:-5px;
}
.box {
    position:relative;
    height:50px;
    width:40px;
    animation: box 5s infinite linear;
}

.border {
    background:#0077ff;
    position:absolute;
}

.border.one {
    height:4px;
    top:0;
    left:0;
    animation: border-one 5s infinite linear;
}

.border.two {
    top:0;
    right:0;
    height:100%;
    width:4px;
    animation: border-two 5s infinite linear;
}

.border.three {
    bottom:0;
    right:0;
    height:4px;
    width:100%;
    animation: border-three 5s infinite linear;
}

.border.four {
    bottom:0;
    left:0;
    height:100%;
    width:4px;
    animation: border-four 5s infinite linear;
}

.line {
    height:4px;
    background:#0077ff;
    position:absolute;
    width:0%;
    left:25%;
}

.line.one {
    top:25%;
    width:0%;
    animation: line-one 5s infinite linear;
}

.line.two {
    top:45%;
    animation: line-two 5s infinite linear;
}

.line.three {
    top:65%;
    animation: line-three 5s infinite linear;
}

@keyframes border-one {
    0%   {width:0;}
    10%  {width:100%;}
    100% {width:100%;}
}

@keyframes border-two {
    0%   {height:0;}
    10%  {height:0%;}
    20%  {height:100%;}
    100% {height:100%;}
}

@keyframes border-three {
    0%   {width:0;}
    20%  {width:0%;}
    30%  {width:100%;}
    100% {width:100%;}
}

@keyframes border-four {
    0%   {height:0;}
    30%  {height:0%;}
    40%  {height:100%;}
    100% {height:100%;}
}

@keyframes line-one {
    0%   {left:25%;width:0;}
    40%  {left:25%;width:0%;}
    43%  {left:25%;width:50%;}
    52%  {left:25%;width:50%;}
    54%  {left:25%;width:0% }
    55%  {right:25%;left:auto;}
    63%  {width:10%;right:25%;left:auto;}
    100% {width:10%;right:25%;left:auto;}
}

@keyframes line-two {
    0%   {width:0;}
    42%  {width:0%;}
    45%  {width:50%;}
    53%  {width:50%;}
    54%  {width:0% }
    60%  {width:50%}
    100% {width:50%;}
}

@keyframes line-three {
    0%   {width:0;}
    45%  {width:0%;}
    48%  {width:50%;}
    51%  {width:50%;}
    52%  {width:0% }
    100% {width:0%;}
}

@keyframes box {
    0%   {opacity:1;margin-left:0px;height:50px;width:40px;}
    55%  {margin-left:0px;height:50px;width:40px;}
    60%  {margin-left:0px;height:35px;width:50px;}
    74%  {msthin-left:0;}
    80%  {margin-left:-50px;opacity:1;}
    90% {height:35px;width:50px;margin-left:50px;opacity:0;}
    100% {opacity:0;}
}

</style>




