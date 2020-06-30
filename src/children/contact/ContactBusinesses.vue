<template>
  <div class="contact-businesses">

      <div class="contact-businesses-header">
          <div>
              <h5>Contact Businesses</h5>
              <p>A list of the businesses belonging to the contact</p>
          </div>
          <router-link :to="{path: '/contact/' + clientDetails.id + '/account/business/' + 0}" class="btn btn-sm btn-secondary align-self-center font-weight-bold">Add Business</router-link>
      </div>

      <div class="contact-business-content" v-if="businesses.length > 0">
          <div class="contact-business-card card shadow-sm" v-for="(business, index) in businesses" :key="index">
              <h5>{{business.business_name}}</h5>
              <ul class="contact-business-details">
                  <li class="contact-business-details-item">
                      <div>
                          <span>Phone Number:</span>
                          <span>{{business.phone_number}}</span>
                      </div>
                  </li>
                  <li class="contact-business-details-item">
                      <div>
                          <span>Fax Number:</span>
                          <span>{{business.fax_number}}</span>
                      </div>
                  </li>
                  <li class="contact-business-details-item">
                      <div>
                          <span>Email:</span>
                          <span>{{business.email}}</span>
                      </div>
                  </li>
                  <li class="contact-business-details-item">
                      <div>
                          <span>Address:</span>
                          <span>{{business.address}}, {{business.city}} {{business.state}} {{business.postal_code}}</span>
                      </div>
                  </li>
              </ul>
              <div class="contact-business-btns">
                  <div>
                    <router-link class="btn" :to="{path: '/contact/' + business.client_id + '/account/business/' + business.id}">Edit</router-link>
                    <router-link class="btn" :to="{path: '/business/' + business.id + '/details'}">View</router-link>
                  </div>
                  <button class="btn btn-danger" @click="deleteBusiness(business.id)">Delete</button>
              </div>
          </div>
      </div>

      <div class="card shadow-sm p-3 font-weight-bold" v-else>
          <span>There are currently no businesses listed</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ContactBusinsses',
    props: ['businesses', 'clientDetails'],
    methods: {
        deleteBusiness(id) {
            this.$emit('delete-business', id)
        }
    }
}
</script>

<style lang="scss">
.contact-businesses {

    .contact-businesses-header {
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
    }

    div {

        .contact-business-card {
            text-align: left;
            margin-bottom: 15px;

            h5 {
                margin-bottom: 0;
                padding: 10px;
            }

            .contact-business-details {
                list-style: none;
                padding: 0;
                margin: 0;
                margin-bottom: 10px;

                .contact-business-details-item {
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

            .contact-business-btns {
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