<template>
    <div class="contact-account">
        <div class="contact-account-header">
            <h5>General Info</h5>
            <p>The general information for the selected contact</p>
        </div>

        <div class="contact-card card shadow-sm" v-if="$route.name == 'account'">
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
            <router-link class="contact-edit-btn" :to="{path: '/contact/' + client.id + '/account/edit'}">Edit Contact</router-link>
        </div>

        <!-- this is where the edit contact child view shows up -->
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'account',
    data() {
        return {
            alert: '',
            modalShow: false,
        }
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