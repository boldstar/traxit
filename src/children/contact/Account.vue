<template>
    <div class="contact-account">
        <div class="contact-account-header">
            <h5>General Info</h5>
            <p>The general information for the selected contact</p>
        </div>

        <div class="contact-card card shadow-sm">
            <h5>Tax Payer</h5>
            <div class="contact-card-content">
                <ul class="contact-list">
                    <li class="contact-list-item">
                        <div>
                            <span>Name:</span>
                            <span class="font-weight-bold">{{client.last_name}}, {{client.first_name}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Email:</span>
                            <span class="font-weight-bold">{{client.email}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Cell Phone:</span>
                            <span class="font-weight-bold">{{client.cell_phone}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Work Phone:</span>
                            <span class="font-weight-bold">{{client.work_phone}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Date of Birth:</span>
                            <span class="font-weight-bold">{{client.dob | formatDate }}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Occupation:</span>
                            <span class="font-weight-bold">{{client.occupation}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <h5>Spouse</h5>
            <div class="contact-card-content">
                <ul class="contact-list">
                    <li class="contact-list-item">
                        <div>
                            <span>Name:</span>
                            <span class="font-weight-bold">{{client.spouse_last_name}}, {{client.spouse_first_name}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Email:</span>
                            <span class="font-weight-bold">{{client.spouse_email}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Cell Phone:</span>
                            <span class="font-weight-bold">{{client.spouse_cell_phone}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Work Phone:</span>
                            <span class="font-weight-bold">{{client.spouse_work_phone}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Date of Birth:</span>
                            <span class="font-weight-bold">{{client.spouse_dob | formatDate }}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Occupation:</span>
                            <span class="font-weight-bold">{{client.spouse_occupation}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <router-link class="contact-edit-btn" :to="{path: '/contact/' + client.id + '/account/edit'}">Edit Info</router-link>
        </div>
        <!-- list of businesses -->
        <Business :businesses="businesses"  :client="client" />

        <!-- this is where the edit contact child view shows up -->
        <router-view></router-view>

         <!-- this is the modal for deleting a dependent
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
        </b-modal> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Business from '@/components/contact/Business'


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
        Business
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
    ...mapGetters(['client']),
        businesses() {
            return this.client.businesses
        }
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
.contact-account {
    display: flex;
    flex-direction: column;
    width: 100%;

    .contact-account-header {
        text-align: left;
        margin-bottom: 15px;

        h5 {
            margin-bottom: 0;
        }

        p {
            color: rgb(122, 122, 122);
            font-weight: 500;
            margin-bottom: 0;
        }
    }

    .contact-card {
        text-align: left;
        padding-bottom: 10px;
         
         h5 {
             padding: 10px;
             padding-bottom: 0;
         }

        .contact-card-content {
            
            .contact-list {
                list-style: none;
                padding: 0;

                .contact-list-item {
                    padding: 10px;
                    padding-left: 20px;

                    div {
                        max-width: 350px;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                    }

                    &:nth-of-type(even) {
                        background: rgb(243, 243, 243);
                    }
                }
            }
        }

        .contact-edit-btn {
            background: rgb(224, 224, 224);
            border-radius: 5px;
            color: black;
            font-weight: bold;
            padding: 10px 20px;
            align-self: flex-start;
            margin-left: 10px;

            &:hover {
                text-decoration: none;
            }
        }
    }
}
</style>