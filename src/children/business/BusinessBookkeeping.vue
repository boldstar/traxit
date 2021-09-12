<template>
  <div class="business-bookkeeping-wrapper">
      <div class="business-bookkeeping" v-if="$route.name != 'edit-business'">
            <div class="business-bookkeeping-header">
               <h5>Business Bookkeeping</h5>
               <p>Bookkeeping account tracking for the business</p>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'BusinessBookkeeping'
}
</script>

<style lang="scss">
.business-bookkeeping-wrapper {
    width: 100%;

    .business-bookkeeping {
      
      .business-bookkeeping-header {
        text-align: left;
        margin-bottom: 10px;

        h5 {
          margin-bottom: 0;
        }

        p {
          margin-bottom: 0;
        }
      }

      .business-bookkeeping-section {
        margin-bottom: 30px;

        .business-bookkeeping-section-header {
          text-align: left;
          padding: 10px;
        }

        ul {
          list-style: none;
          padding: 0;

          .business-bookkeeping-item {
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

        .business-bookkeeping-section-footer {
          padding: 10px;
          text-align: left;
        }
      }
    }
  }
</style>