<template>
    <div>
        

        <!-- this is the details of the account -->
    <div class="col-8 col-md-7 d-inline-flex flex-column pl-0 ml-2" v-if="$route.name == 'account'">
        <div class="">
            <div class="card mb-3">
                <div class="card-header text-left d-flex justify-content-between py-0">
                    <div class="d-flex h4 mt-2 align-items-center">
                        <i class="fas fa-user-circle mr-2 fa-2x"></i>
                        <strong class="card-title text-primary mt-2">Taxpayer: </strong>
                    </div>
                        <span class="card-title text-capitalize h4 mt-2 align-self-center">{{ client.first_name }} {{client.middle_initial}} {{client.last_name}}</span>
                </div>
                <ul class="list-group list-group-flush h6 text-left">
                    <li class="list-group-item justify-content-between d-flex">
                        <span class="font-weight-bold">Date Of Birth: </span>
                        {{client.dob}}
                    </li>
                    <li class="list-group-item text-capitalize justify-content-between d-flex">
                        <span class="font-weight-bold">Occupation: </span>
                        {{client.occupation}}
                    </li>
                    <li class="list-group-item justify-content-between d-flex">
                        <span class="font-weight-bold">Email: </span>
                        {{client.email}}
                    </li>
                    <li class="list-group-item justify-content-between d-flex"><span class="font-weight-bold">Cell Phone: </span>{{client.cell_phone}}</li>
                    <li class="list-group-item justify-content-between d-flex"><span class="font-weight-bold">Work Phone: </span>{{client.work_phone}}</li>
                </ul>
            </div>
        </div>
        <div class="mb-3" v-if="client.has_spouse == 1">
            <div class="card">
                <div class="card-header text-left d-flex justify-content-between py-0">
                    <div class="d-flex h4 mt-2 align-items-center">
                        <i class="fas fa-user-circle mr-2 fa-2x"></i>
                        <strong class="card-title text-primary mt-2">Spouse: </strong>
                    </div>
                        <span class="card-title text-capitalize h4 mt-2 align-self-center">{{ client.spouse_first_name }} {{client.spouse_middle_initial}} {{client.spouse_last_name}}</span>
                </div>
                <ul class="list-group list-group-flush h6 text-left">
                    <li class="list-group-item justify-content-between d-flex"><span class="font-weight-bold">Date Of Birth: </span> {{client.spouse_dob}}</li>
                    <li class="list-group-item text-capitalize justify-content-between d-flex"><span class="font-weight-bold">Occupation: </span> {{client.spouse_occupation}}</li>
                    <li class="list-group-item justify-content-between d-flex"><span class="font-weight-bold">Email: </span> {{client.spouse_email}}</li>
                    <li class="list-group-item justify-content-between d-flex"><span class="font-weight-bold">Cell Phone: </span> {{client.spouse_cell_phone}}</li>
                    <li class="list-group-item justify-content-between d-flex"><span class="font-weight-bold">Work Phone: </span> {{client.spouse_work_phone}}</li>
                </ul>
            </div>
        </div>


    </div>
        <!-- this is the address of the account contact -->
        <div class="float-right col-3 col-sm-4 ml-0 pl-0 mr-4 mb-3 mr-sm-2" v-if="$route.name == 'account'">
            <div class="card mb-3">
                <div class="card-header text-left text-primary font-weight-bold">
                        Details
                </div>
                <ul class="list-group">
                    <li class="list-group-item text-left justify-content-between d-flex">
                        <span class="font-weight-bold">Category: </span>
                        <div class="text-right">{{ client.category }}</div>
                    </li>
                    <li class="list-group-item text-left justify-content-between d-flex">
                        <span class="font-weight-bold">Referred By: </span>
                        <div class="text-capitalize">{{ client.referral_type }}</div>  
                    </li>
                    <li class="list-group-item text-left justify-content-between d-flex">
                        <span class="font-weight-bold">Address: </span>
                        <div class="text-right">{{ client.street_address }}, {{ client.city }}, {{ client.state }}, {{ client.postal_code }}</div>
                    </li>
                </ul>
            </div>

            <!-- this is the dependents belonging to the client -->
            <div class="card mb-3" v-for="dependent in client.dependents" :key="dependent.id" v-if="$route.name == 'account'">
                <div class="card-header text-left text-primary font-weight-bold d-flex justify-content-between">
                    <span>
                        Dependent
                    </span>
                    <div>
                        <router-link class="btn btn-sm btn-outline-primary mr-2" :to="'/contact/' +client.id+'/account/edit-dependent/' + dependent.id">Edit</router-link> 
                        <b-btn class="outline-secondary" size="sm" @click="modalShow = !modalShow"><i class="fas fa-trash"></i><span class="ml-2">Delete</span></b-btn> 
                    </div>
                </div>
                <div class="list-group">
                    <div class="list-group-item text-left justify-content-between d-flex">
                        <span class="font-weight-bold">
                            Name: 
                        </span>
                        <div>
                            {{ dependent.first_name }} {{ dependent.middle_name }} {{ dependent.last_name }}
                        </div>
                    </div>
                    <div class="list-group-item text-left justify-content-between d-flex">
                        <span class="font-weight-bold">
                            Date Of Birth:
                        </span>
                        <div>
                            {{ dependent.dob }}
                        </div>
                    </div>
                </div>

                <!-- this is the modal for deleting a dependent -->
                <b-modal v-model="modalShow" id="myModal" ref="myModal" hide-footer title="Delete Dependent">
                <div class="d-block text-left">
                    <h5>Are you sure you want to delete {{dependent.first_name}}?</h5>
                    <br>
                    <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
                </div>
                <div class="d-flex">
                    <b-btn class="mt-3" variant="danger" @click="modalShow = false">Cancel</b-btn>
                    <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteDependent(client, dependent.id)">Confirm</b-btn>
                </div>
                </b-modal>

            </div>
        </div>

<!-- this is where the edit contact child view shows up -->
    <router-view ></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'


export default {
    name: 'account',
    data() {
        return {
            alert: '',
            modalShow: false,
        }
    },
     components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
    ...mapGetters(['client'])
    },
    methods: {
        deleteDependent(client, id) {
            this.$store.dispatch('deleteDependent', id)
            .then(() => {
                this.modalShow = false
                this.$router.push({path: '/contact/' +this.client.id+ '/account', query: { alert: 'The dependent was succesfully deleted' }})
            })
        },
        showModal () {
            this.$refs.myModal.show()
        },
        hideModal () {
            this.$refs.myModal.hide()
        },
        isActive: function (menuItem) {
            return this.activeItem === menuItem
        },
    },
    created: function(){
    this.$store.dispatch('getDetails', this.$route.params.id);
  }
    
}
</script>

<style lang="scss">

</style>