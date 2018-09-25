<template>
  <div class="page-wrapper d-flex justify-content-center mt-5">
    <div class="d-flex flex-row" v-if="$route.name == 'add'">
      <div class="card-style card-body bg-light border shadow-sm mx-5 py-5 px-5">
        <div class="h3 mb-4 font-weight-bold">
          Contact
        </div>
        <i class="text-primary fas fa-user-circle fa-7x mb-4 mt-3"></i>
        <div class="mt-3">
          <router-link to="add/contact" class="btn btn-style">Create</router-link>
        </div>
      </div>
      <div class="card-style card-body bg-light border shadow-sm mx-3 py-5">
        <div class="h3 mb-4 font-weight-bold">
          Engagement
        </div>
        <i class="text-primary far fa-folder-open fa-7x mb-4 mt-3"></i>
        <div class="mt-3">
          <router-link to="add/engagement" class="btn btn-style">Create</router-link>
        </div>
      </div>
    </div>
    <router-view v-if="$route.path == 'add/contact' || 'add/engagement'"></router-view>
  </div>
</template>

<script>


export default {
  name: 'add',
  
}
</script>

<style lang="scss" scoped>

.card-style {
  width: 250px;
  border-radius: 10px;
}
 
.btn-style {
  border: 2px solid black;
  border-radius: 15px;
  padding: 10px 30px;
  font-weight: bold;
  letter-spacing: 1px;

  &:hover {
    background: #0077ff86;
  }
} 

</style>
