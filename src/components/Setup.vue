<template>
    <div class="setup">
        <div class="step-slide">
            <carousel ref="carousel" :per-page="1" :mouse-drag="false" :loop="false" :navigationEnabled="true" :paginationEnabled="true" class="steps-carousel"  :navigationNextLabel='`<i class="fas fa-arrow-alt-circle-right fa-3x text-primary"></i>`' :navigationPrevLabel='`<i class="fas fa-arrow-alt-circle-left fa-3x text-primary"></i>`' :paginationActiveColor="'#0077ff'" :paginationColor="'black'">
                <slide v-for="step in $setUp" :key="step.step" class="step" ref="slide">
                    <div :class="step.class"></div>
                    <div class="step-header">{{step.header}}</div>
                    <h6 class="step-slogan">{{step.slogan}}</h6>
                    <button type="button" @click="startGuide" v-if="step.id == 'intro'" class="btn btn-primary step-btn">Start Guide</button>
                    <button type="button" @click="uploadContacts" v-if="step.id == 'contact'" class="btn btn-primary">Upload Contacts</button>
                    <button type="button" @click="createWorkflow" v-if="step.id == 'workflow'" class="btn btn-primary">Create Workflow</button>
                    <a @click="startTraxit" href="/" v-if="step.id == 'complete'" class="btn btn-primary">Start TRAXIT</a>
                    <button class="btn btn-link" v-if="step.id != 'intro' && step.id != 'complete'" @click="nextStep">Skip For Now</button>
                </slide>
            </carousel>
        </div>

        <contact-setup-modal v-if="modalState"></contact-setup-modal>
        <workflow-setup-modal v-if="workflowModalState"></workflow-setup-modal>
    </div>
</template>

<script>
import ContactSetupModal from '@/components/ContactSetupModal.vue'
import WorkflowSetupModal from '@/components/WorkflowSetupModal.vue'
import {mapGetters} from 'vuex'
export default {
    name: 'Setup',
    components: {
        ContactSetupModal,
        WorkflowSetupModal
    },
    computed: {
      ...mapGetters(['modalState', 'workflowModalState'])  
    },
    methods: {
        startGuide() {
            this.$refs.carousel.goToPage(1);
        },
        uploadContacts() {
            this.$store.commit('uploadModal')
        },
        createWorkflow() {
            this.$store.commit('setupWorkflowModal')
        },
        startTraxit() {
            localStorage.setItem('setup-done', true)
        },
        nextStep() {
            const index = this.$refs.slide[0].$parent.currentPage
            this.$refs.carousel.goToPage(index + 1)
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

    .setup {
        font-family: 'Source Sans Pro', sans-serif!important;
        z-index: 10000;
        position: absolute;
        top: 53px;
        left: 0;
        background: white;
        height: calc(100% - 53px);
        width: 100%;
    }

    .step-slide {
        margin: 0 auto;
        display: flex;
        transition: all 1s;
        margin-top: 50px;
    }

    .steps-carousel {
        width: 600px!important;
        margin: 0 auto;
        box-shadow: 0 1px 10px rgba(0,0,0,250);
        border-radius: 10px;
        background: white;
    }

    .step {
        margin-top: 10px;
    }

    .intro-img {
        background-image: url('../assets/taskillustration.png');
        height: 300px;
        width: 100%;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin: 0 auto;
    }
    .workflow-img {
        background-image: url('../assets/workflow-img.png');
        height: 300px;
        width: 90%;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin: 0 auto;
    }
    .contact-img {
        background-image: url('../assets/contact-img.png');
        height: 300px;
        width: 90%;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin: 0 auto;
    }
    .addnew-img {
        background-image: url('../assets/add-new-img.png');
        height: 300px;
        width: 90%;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin: 0 auto;
        border-radius: 5px;
    }
    .welcome-img {
        background-image: url('../assets/Welcome.png');
        height: 300px;
        width: 100%;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin: 0 auto;
        border-radius: 5px;
    }

    .step-header {
        font-size: 1.5rem;
        margin: 10px;
        font-weight: bold;
    }

    .step-slogan {
        margin-bottom: 10px;
    }

    .step-btn {
        margin-bottom: 10px;
    }

    .details {
        width: 75%;
        margin: 0 auto;

    }
</style>
