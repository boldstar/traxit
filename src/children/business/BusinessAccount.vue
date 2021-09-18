<template>
  <div class="business-account-wrapper">
    <div class="business-account" v-if="$route.name != 'edit-business'">
        <div class="business-account-header">
          <h5>Business Details</h5>
          <p>The general details about the business</p>
        </div>

        <div class="business-account-section card shadow-sm">
          <div class="business-account-section-header">
            <h5>Business</h5>
          </div>
          <ul class="business-account-section-list">
            <li class="business-account-item">
              <div>
                <span >Name:</span>
                <span class="font-weight-bold">{{business.business_name}}</span>
              </div>
            </li>
            <li class="business-account-item">
              <div>
                <span >EIN:</span>
                <span class="font-weight-bold">{{business.ein}}</span>
              </div>
            </li>
            <li class="business-account-item">
              <div>
                <span >Tax Return Type:</span>
                <span class="font-weight-bold">{{business.tax_return_type}}</span>
              </div>
            </li>
            <li class="business-account-item">
              <div>
                <span >State Tax ID:</span>
                <span class="font-weight-bold">{{business.state_tax_id}}</span>
              </div>
            </li>
            <li class="business-account-item">
              <div>
                <span >XT Number:</span>
                <span class="font-weight-bold">{{business.xt_number}}</span>
              </div>
            </li>
            <li class="business-account-item">
              <div>
                <span >RT Number:</span>
                <span class="font-weight-bold">{{business.rt_number}}</span>
              </div>
            </li>
            <li class="business-account-item">
              <div>
                <span >Formation Date:</span>
                <span class="font-weight-bold">{{business.formation_date}}</span>
              </div>
            </li>
            <li class="business-account-item">
              <div>
                <span >TWC Account:</span>
                <span class="font-weight-bold">{{business.twc_account}}</span>
              </div>
            </li>
            <li class="business-account-item">
              <div>
                <span >QB Password:</span>
                <span class="font-weight-bold">{{business.qb_password}}</span>
              </div>
            </li>
            <li class="business-account-item">
              <div>
                <span>Phone:</span>
                <span class="font-weight-bold">{{business.phone}}</span>
              </div>
            </li>
            <li class="business-account-item">
              <div>
                <span>Email:</span>
                <span class="font-weight-bold">{{business.email}}</span>
              </div>
            </li>
            <li class="business-account-item text-right">
              <div>
                <span>Address:</span>
                <span class="font-weight-bold" v-if="business.address">{{business.address}} <br>{{business.city}}, {{business.state}} {{business.postal_code}}</span>
                <span class="font-weight-bold" v-else>None</span>
              </div>
            </li>
          </ul>
          <div class="business-account-section-footer">
            <router-link :to="'/business/' +business.id+ '/details/edit'" class="btn btn-secondary btn-sm font-weight-bold">Edit</router-link>
          </div>
        </div>
    </div>

    <div v-else>
      <router-view  
        :business="business"
      >
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BusinessAccount',
    props: ['business']
}
</script>

<style lang="scss">

  .business-account-wrapper {
    width: 100%;

    .business-account {
      
      .business-account-header {
        text-align: left;
        margin-bottom: 10px;

        h5 {
          margin-bottom: 0;
        }

        p {
          margin-bottom: 0;
        }
      }

      .business-account-section {
        margin-bottom: 30px;

        .business-account-section-header {
          text-align: left;
          padding: 10px;
        }

        ul {
          list-style: none;
          padding: 0;

          .business-account-item {
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

        .business-account-section-footer {
          padding: 10px;
          text-align: left;
        }
      }
    }
  }

</style>