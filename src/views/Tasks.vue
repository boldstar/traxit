<template>
  <div class="page-wrapper mt-1">
<!-- this is the user tasks header -->
      <div class="card bg-light mb-3">
        <div class="d-flex justify-content-between card-body">
          <div class="h2 align-self-center">
            <i class="fas fa-tasks"></i>
          </div>
          <p class="h2 align-self-center">Tasks | 3</p>
          <button class="btn btn-sm btn-outline-success align-self-center" >Add Task</button>
        </div>
      </div>
<!-- this is the list of the assigned user tasks -->
    <table class="table table-hover">
      <thead class="bg-primary text-light">
        <tr>
          <th scope="col"><input type="checkbox"></th>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody class="table-bordered">
        <tr>
          <th scope="row"><input type="checkbox"></th>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row"><input type="checkbox"></th>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row"><input type="checkbox"></th>
          <td>3</td>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserTasks',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>