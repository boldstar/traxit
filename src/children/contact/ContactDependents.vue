<template>
  <div class="contact-dependents">

    <div class="contact-dependents-header">
        <div>
            <h5>Contact Dependents</h5>
            <p>A list of the dependents belonging to the contact</p>
        </div>
        <router-link :to="{path: '/contact/' + clientDetails.id + '/add-dependent'}" class="btn btn-sm btn-secondary">Add Dependent</router-link>
    </div>

    <div class="contact-dependent-content" v-if="dependents.length > 0">
        <div class="contact-dependent-card card shadow-sm" v-for="(dependent, index) in dependents" :key="index">
            <h5>{{dependent.first_name}}</h5>
            <ul class="contact-dependent-details">
                <li class="contact-dependent-details-item">
                    <div>
                        <span>Middle Name:</span>
                        <span>{{dependent.middle_name}}</span>
                    </div>
                </li>
                <li class="contact-dependent-details-item">
                    <div>
                        <span>Last Name:</span>
                        <span>{{dependent.last_name}}</span>
                    </div>
                </li>
                <li class="contact-dependent-details-item">
                    <div>
                        <span>Date of Birth:</span>
                        <span>{{dependent.dob | formatDate}}</span>
                    </div>
                </li>
            </ul>
            <div class="contact-dependent-btns">
                <div>
                    <router-link class="btn" :to="{path: '/contact/' + dependent.client_id + '/account/dependent/' + dependent.id}">Edit</router-link>
                </div>
                <button class="btn btn-danger" @click="requestDelete(dependent)">Delete</button>
            </div>
        </div>
    </div>

    <div class="card shadow-sm p-3" v-else>
        <span class="font-weight-bold">There are currently no dependents listed</span>
    </div>

    <!-- this is the modal for deleting a dependent -->
    <b-modal v-model="modal" id="myModal" ref="myModal" hide-footer title="Delete Dependent">
        <div class="d-block text-left" v-if="selectedDependent">
            <h5>Are you sure you want to delete {{selectedDependent.first_name}}?</h5>
            <br>
            <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
        </div>
        <div class="d-flex">
            <b-btn class="mt-3" variant="danger" @click="closeModal">Cancel</b-btn>
            <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteDependent">Confirm</b-btn>
        </div>
    </b-modal>

  </div>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
    name: 'ContactDependents',
    props: ['clientDetails', 'dependents'],
    data() {
        return {
            modal: false,
            selectedDependent: null
        }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    methods: {
        closeModal() {
            this.modal = false
            this.selectedDependent = null
        },
        requestDelete(dependent) {
            this.modal = true
            this.selectedDependent = dependent
        },
        deleteDependent() {

        }
    }
}
</script>

<style lang="scss">
.contact-dependents {

    .contact-dependents-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        div {
        text-align: left;

            h5 {
                margin-bottom: 0;
            }

            p {
                margin-bottom: 0;
                font-weight: 500;
            }
        }

        a {
            align-self: center;
            font-weight: bold;
        }
    }

    div {

        .contact-dependent-card {
            text-align: left;
            margin-bottom: 15px;

            h5 {
                margin-bottom: 0;
                padding: 10px;
            }

            .contact-dependent-details {
                list-style: none;
                padding: 0;
                margin: 0;
                margin-bottom: 10px;

                .contact-dependent-details-item {
                    padding: 10px;
                    padding-left: 15px;

                    div {
                        display: flex;
                        justify-content: space-between;
                        max-width: 350px;
                        width: 100%;

                        span {

                            &:nth-of-type(even) {
                                font-weight: bold;
                            }
                        }
                    }

                    &:nth-of-type(even) {
                        background: rgb(243, 243, 243);
                    }
                }

            }

            .contact-dependent-btns {
                display: flex;
                justify-content: space-between;
                padding: 10px;

                div {

                    a {
                        background: rgb(230, 230, 230);
                        border-radius: 5px;
                        margin-left: 10px;
                        font-weight: bold;
                        color: black;

                        &:hover {
                            text-decoration: none;
                        }
                    }
                }
            }
        }
    }
}
</style>