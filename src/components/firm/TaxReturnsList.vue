<template>
  <div class="taxreturns-list">
      <h5>Tax Returns List</h5>
      <span class="text-secondary">A list of the tax returns filtered by the chosen variable.</span>
      <div class="taxreturns-list-content">
          <div class="taxreturns-list-header">
              <span>Header</span>
          </div>
          <table class="table bg-white border">
              <thead>
                  <tr> 
                    <th>Name</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <th>Name</th>
                  </tr>
              </tbody>
          </table>
          <div class="taxreturns-list-footer">
              <span>Footer</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'TaxReturnsList',
    props: ['engagements']
}
</script>

<style lang="scss">
    .taxreturns-list {
        width: 100%;
        text-align: left;

        h5 {
            margin-bottom: 0;
        }

        span {
            font-weight: bold;
        }

        .taxreturns-list-content {
            margin: 10px 0;

            .taxreturns-list-header {
                padding: 10px;
                background: white;
                border: 2px solid lightgray;
            }

            .table {
                margin-bottom: 0!important;
            }

            .taxreturns-list-footer {
                padding: 10px;
                background: rgb(233, 233, 233);
            }
        }
    }
</style>