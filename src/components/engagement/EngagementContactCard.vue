<template>
  <div class="engagement-contact-card card">
      <span class="card-header bg-white">Contact Info</span>
      <div class="contact-card-section">
          <span>Taxpayer</span>
            <ul>
                <li><i class="fas fa-envelope"></i><span class="span_email" v-if="contact.email" @click="mailTo(contact.email)">{{contact.email}}</span>
                <span v-else>None</span></li>
                <li><i class="fas fa-phone"></i><span v-if="contact.cell_phone">{{contact.cell_phone}}</span>
                <span v-else>None</span></li>
            </ul>
      </div>
      <div class="contact-card-section has_spouse" v-if="contact.has_spouse">
          <span>Spouse</span>
            <ul>
                <li><i class="fas fa-envelope"></i><span class="span_email" v-if="contact.spouse_email" @click="mailTo(contact.spouse_email)">{{contact.spouse_email}}</span>
                <span v-else>None</span></li>
                <li><i class="fas fa-phone"></i><span v-if="contact.spouse_cell_phone">{{contact.spouse_cell_phone}}</span>
                <span v-else>None</span></li>
            </ul>
      </div>
      <div class="card-footer bg-white">
          <router-link :to="{path: '/contact/' + contact.id + '/account'}">View Contact <i class="fas fa-sign-in-alt"></i></router-link>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'EngagementContactCard',
    props: ['contact', 'engagement'],
    computed: {
        ...mapGetters(['accountDetails'])
    },
    methods: {
        mailTo(email) {
            window.location.href = "mailto:" + email + '?subject=' + this.accountDetails.business_name + ' Questions';
        }
    }
}
</script>

<style lang="scss">
.engagement-contact-card {
    margin-top: 20px;

    span {
        font-weight: bold;
        font-size: .8em;
        color: #0077ff;
    }

    .contact-card-section {
        text-align: left;

        span {
            color: black;
            padding: 5px;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
    
            li {
                font-size: .85em;
                text-align: left;
                padding: 5px;
                padding-left: 7px;
                
                &:nth-of-type(odd) {
                    background: #f3f3f3;
                }

                i {
                    color: #0077ff!important;
                    margin-right: 5px;
                }
                
                span {
                    font-weight: bold;
                    color: black;
                    padding: 0;
                }

                .span_email {
                    cursor: pointer;
                }
            }
        }
    }

    .has_spouse {
        border-top: 1px solid lightgray;
    }

    div {

        a {
            font-size: .8em;
            font-weight: bold;
        }
    }

}
</style>