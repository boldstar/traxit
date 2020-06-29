<template>
    <div class="contact-account">
        <div class="contact-account-header" v-if="$route.name == 'account'">
            <h5>General Info</h5>
            <p>The general information for the selected contact</p>
        </div>

        <div class="contact-card card shadow-sm mb-4" v-if="$route.name == 'account'">
            <h5>Tax Payer</h5>
            <div class="contact-card-content">
                <ul class="contact-list">
                    <li class="contact-list-item">
                        <div>
                            <span>Name:</span>
                            <span class="font-weight-bold">{{clientDetails.last_name}}, {{clientDetails.first_name}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Email:</span>
                            <span class="font-weight-bold">{{clientDetails.email}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Cell Phone:</span>
                            <span class="font-weight-bold">{{clientDetails.cell_phone}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Work Phone:</span>
                            <span class="font-weight-bold">{{clientDetails.work_phone}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Date of Birth:</span>
                            <span class="font-weight-bold">{{clientDetails.dob | formatDate }}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Occupation:</span>
                            <span class="font-weight-bold">{{clientDetails.occupation}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <h5 v-if="clientDetails.has_spouse">Spouse</h5>
            <div class="contact-card-content" v-if="clientDetails.has_spouse">
                <ul class="contact-list">
                    <li class="contact-list-item">
                        <div>
                            <span>Name:</span>
                            <span class="font-weight-bold"><span v-if="clientDetails.spouse_last_name">{{clientDetails.spouse_last_name}},</span> {{clientDetails.spouse_first_name}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Email:</span>
                            <span class="font-weight-bold">{{clientDetails.spouse_email}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Cell Phone:</span>
                            <span class="font-weight-bold">{{clientDetails.spouse_cell_phone}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Work Phone:</span>
                            <span class="font-weight-bold">{{clientDetails.spouse_work_phone}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Date of Birth:</span>
                            <span class="font-weight-bold">{{clientDetails.spouse_dob | formatDate }}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Occupation:</span>
                            <span class="font-weight-bold">{{clientDetails.spouse_occupation}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <router-link class="contact-edit-btn" :to="{path: '/contact/' + clientDetails.id + '/account/edit'}">Edit Contact</router-link>
        </div>

        <div class="contact-card card shadow-sm mb-3" v-if="$route.name == 'account'">
            <h5>Details</h5>
            <div class="contact-card-content">
                <ul class="contact-list">
                    <li class="contact-list-item">
                        <div>
                            <span>Address: </span>
                            <span class="font-weight-bold text-right" v-if="clientDetails.street_address">{{clientDetails.street_address}} <br>{{clientDetails.city}} {{clientDetails.state}}, {{clientDetails.postal_code}}</span>
                            <span class="font-weight-bold" v-else>N/A</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Referred By: </span>
                            <span class="font-weight-bold">{{clientDetails.referral_type}}</span>
                        </div>
                    </li>
                    <li class="contact-list-item">
                        <div>
                            <span>Category: </span>
                            <span class="font-weight-bold">{{clientDetails.category}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <router-link class="contact-edit-btn" :to="{path: '/contact/' + clientDetails.id + '/account/edit'}">Edit Details</router-link>
        </div>

        <!-- this is where the edit contact child view shows up -->
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'account',
    props: ['clientDetails']
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