<template>
  <div class="business-owner-wrapper">
      <div class="business-owner" v-if="$route.name != 'edit-business'">
        <div class="business-owner-header">
          <h5>Business Owner</h5>
          <p>Contact details for the business</p>
        </div>

        <div class="business-owner-section card shadow-sm">
          <div class="business-owner-section-header">
            <h5>Details</h5>
          </div>
          <ul class="business-owner-section-list">
            <li class="business-owner-item">
              <div>
                <span>Owner:</span>
                <span class="font-weight-bold">{{ contact.last_name }}, {{contact.first_name}} <span v-if="contact.has_spouse == true">&</span> <span v-if="contact.last_name != contact.spouse_last_name && contact.has_spouse == true && contact.spouse_last_name != null"> {{contact.spouse_last_name}},</span> {{ contact.spouse_first_name }}</span>
              </div>
            </li>
            <li class="business-owner-item">
              <div>
                <span >Taxpayer Phone:</span>
                <span class="font-weight-bold">{{contact.phone}}</span>
              </div>
            </li>
            <li class="business-owner-item">
              <div>
                <span >Taxpayer Email:</span>
                <span class="font-weight-bold">{{contact.email}}</span>
              </div>
            </li>
            <li class="business-owner-item">
              <div>
                <span >Spouse Phone:</span>
                <span class="font-weight-bold">{{contact.spouse_phone}}</span>
              </div>
            </li>
            <li class="business-owner-item">
              <div>
                <span >Spouse Email:</span>
                <span class="font-weight-bold">{{contact.spouse_email}}</span>
              </div>
            </li>
          </ul>
          <div class="business-owner-section-footer">
            <router-link :to="'/contact/' +contact.id+ '/account'" class="btn btn-sm btn-primary font-weight-bold">View Contact</router-link>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'BusinessOwner',
    props: ['contact']
}
</script>

<style lang="scss">
.business-owner-wrapper {
    width: 100%;

    .business-owner {
      
      .business-owner-header {
        text-align: left;
        margin-bottom: 10px;

        h5 {
          margin-bottom: 0;
        }

        p {
          margin-bottom: 0;
        }
      }

      .business-owner-section {
        margin-bottom: 30px;

        .business-owner-section-header {
          text-align: left;
          padding: 10px;
        }

        ul {
          list-style: none;
          padding: 0;

          .business-owner-item {
            padding: 10px;

            div {
              max-width: 400px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              margin-left: 10px;
            }

            &:nth-of-type(even) {
                background: rgb(243, 243, 243);
            }
          }
        }

        .business-owner-section-footer {
          padding: 10px;
          text-align: left;
        }
      }
    }
  }

</style>