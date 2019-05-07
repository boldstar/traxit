<template>
    <div class="setup">
        <div class="step-slide">
            <carousel ref="carousel" :per-page="1" :mouse-drag="false" :loop="false" :navigationEnabled="true" :paginationEnabled="true" class="steps-carousel"  :navigationNextLabel='`<i class="fas fa-arrow-alt-circle-right fa-3x text-primary"></i>`' :navigationPrevLabel='`<i class="fas fa-arrow-alt-circle-left fa-3x text-primary"></i>`' :paginationActiveColor="'#0077ff'" :paginationColor="'black'">
                <slide v-for="step in $setUp" :key="step.step" class="step" ref="slide">
                    <div :class="step.class"></div>
                    <account-setup v-if="step.id == 'account'" v-model="account" :error="formError" @change="formError = false"></account-setup>
                    <div class="step-header">{{step.header}}</div>
                    <h6 class="step-slogan">{{step.slogan}}</h6>
                    <button type="button" @click="startGuide" v-if="step.id == 'intro'" class="btn btn-primary step-btn">Start Guide</button>
                    <button type="button" @click="validateForm" v-if="step.id == 'account'" class="btn btn-primary step-btn" :disabled="setupState">
                        <span v-if="setupState">Adding...</span>
                        <span v-if="!setupState">Add Details</span>
                    </button>
                    <button type="button" @click="uploadContacts" v-if="step.id == 'contact'" class="btn btn-primary step-btn">Upload Contacts</button>
                    <button type="button" @click="createWorkflow" v-if="step.id == 'workflow'" class="btn btn-primary step-btn">Create Workflow</button>
                    <button type="button" @click="startTraxit" v-if="step.id == 'complete'" class="btn btn-primary step-btn">Start TRAXIT</button>
                    <button class="btn btn-link step-btn" v-if="step.id != 'intro' && step.id != 'complete'" @click="nextStep">Skip For Now</button>
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
import AccountSetup from '@/components/AccountSetup.vue'
import {mapGetters} from 'vuex'
export default {
    name: 'Setup',
    data() {
        return {
            account: {
                business_name: '',
                email: '',
                phone: '',
            },
            formError: false
        }
    },
    components: {
        ContactSetupModal,
        WorkflowSetupModal,
        AccountSetup
    },
    computed: {
      ...mapGetters(['modalState', 'workflowModalState', 'setupTour', 'role', 'setupState'])  
    },
    methods: {
        validateForm() {
             for( var key in this.account) {
                if(this.account[key] == null || this.account[key] == '') {
                    this.formError = true
                    return
                }
            }
            this.addAccount()
        },
        startGuide() {
            this.$refs.carousel.goToPage(1);
        },
        addAccount() {
            this.$store.dispatch('setupAccountDetails', {
                business_name: this.account.business_name,
                email: this.account.email,
                phone: this.account.phone
            })
        },
        uploadContacts() {
            this.$store.commit('uploadModal')
        },
        createWorkflow() {
            this.$store.commit('setupWorkflowModal')
        },
        startTraxit() {
            this.$store.dispatch('completeSetup')
        },
        nextStep() {
            const index = this.$refs.slide[0].$parent.currentPage
            this.$refs.carousel.goToPage(index + 1)
        }
    },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

    .setup {
        font-family: 'Source Sans Pro', sans-serif!important;
        z-index: 999;
        position: absolute;
        top: 53px;
        left: 0;
        background: white;
        height: calc(100% - 53px);
        width: 100%;
        display: flex;
        align-items: center;
    }

    .step-slide {
        margin: 0 auto;
        display: flex;
        transition: all 1s;
        margin-bottom: 50px;
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
    .account-img {
        background-image: url('../assets/traxit_logo_official.png');
        height: 100px;
        width: 75%;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin: 0 auto;
        border-radius: 5px;
        margin-bottom: 50px;
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
