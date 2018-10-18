<template>
  <div class="page-wrapper mt-1">
    <!-- this is the header section of the firm overview -->
    <div class="card mb-3 shadow-sm">
        <div class="d-flex justify-content-between card-body">
          <div class="h2 align-self-center m-0">
            <i class="fas fa-home text-primary"></i>
          </div>
          <p class="h2 align-self-center">Firm</p>
          <div class="align-self-center">
            <button class="btn btn-sm btn-outline-primary"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
          </div>
        </div>
      </div>


    <div class="row">
      <!-- this is the list of events to the left side of the firm over view -->
      <div class="col-3">
        <div class="card">
          <div class="card-header text-left">
            <strong>Status</strong>
          </div>
          <ul class="list-group h5">
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 m-0 active">
              <i class="fas fa-exclamation-triangle"></i>Inactive
              <span class="badge badge-danger badge-pill">25</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 m-0">
              <i class="far fa-thumbs-up"></i>Active
              <span class="badge badge-success badge-pill">300</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 m-0">
              <i class="far fa-question-circle"></i>Pending
              <span class="badge badge-warning badge-pill">20</span>
            </li>
          </ul>
        </div>
        <br>
      
        <div class="card">
          <div class="card-header text-left">
            <strong>Active</strong>
          </div>
          <ul class="list-group h5">
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 m-0">
              <i class="far fa-handshake"></i>Recieved
              <span class="badge badge-primary badge-pill">14</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 m-0">
              <i class="fas fa-print"></i>Scan
              <span class="badge badge-success badge-pill">2</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 m-0">
              <i class="fas fa-clipboard-list"></i>Preparation
              <span class="badge badge-danger badge-pill">20</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 m-0">
              <i class="fas fa-search"></i>Review
              <span class="badge badge-secondary badge-pill">25</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 m-0">
              <i class="fas fa-clipboard-check"></i>2nd Review
              <span class="badge badge-success badge-pill">30</span>
            </li>
          </ul>
        </div>

        <br>

        <div class="card">
          <div class="card-header text-left">
            <strong>Closures</strong>
          </div>
          <ul class="list-group h5">
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 m-0">
              <i class="fas fa-file-signature"></i>Awaiting Signature
              <span class="badge badge-info badge-pill">10</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 m-0">
              <i class="fas fa-flag-checkered"></i>Complete
              <span class="badge badge-primary badge-pill">120</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- this is the list for what ever event has been selected over to the right -->
      <div class="col">
        <table class="table">
          <thead class="thead bg-primary text-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody class="table-bordered">
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'FirmView',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
