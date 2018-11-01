<template>
    <div class="container-fluid">
        <div class="row">
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
              <div class="sidebar-sticky">
                <ul class="nav nav-fill flex-column align-items-start mt-5">
                  <li class="nav-item w-100"  v-bind:class="{ 'is-active': isActive }">                                        
                      <router-link class="nav-link border-right text-left pl-4" to="/"><span><i class="fas fa-tachometer-alt"></i></span>Dashboard</router-link>    
                  </li>
                  <li class="nav-item w-100"  v-bind:class="{ 'is-active': isActive }">                                        
                      <router-link class="nav-link border-right text-left pl-4" to="/firm"><span><i class="fas fa-home"></i></span>Firm</router-link>    
                  </li>
                  <li class="nav-item w-100"  v-bind:class="{ 'is-active': isActive }">                                        
                      <router-link class="nav-link border-right text-left pl-4" to="/tasks"><span><i class="fas fa-list-ul"></i></span>Tasks</router-link>  
                  </li>
                  <li class="nav-item w-100"  v-bind:class="{ 'is-active': isActive }">                                  
                      <router-link class="nav-link border-right text-left pl-4" to="/engagements"><span><i class="far fa-folder-open"></i></span>Engagements</router-link>  
                  </li>
                  <li class="nav-item w-100"  v-bind:class="{ 'is-active': isActive }">                                  
                      <router-link class="nav-link border-right text-left pl-4" to="/contacts"><span><i class="fas fa-users"></i></span>Contacts</router-link>  
                  </li>
                  <li class="nav-item w-100"  v-bind:class="{ 'is-active': isActive }">                                  
                      <router-link class="nav-link border-right text-left pl-4" to="/add"><span><i class="far fa-plus-square"></i></span>Add New</router-link>  
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
</template>

<script>
export default {
    name: 'sidebar',
    data () {
        return {
        isActive: false,
        }
  },
}
</script>

<style lang="scss" scoped>

    .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 100; /* Behind the navbar */
        padding: 35px 0 0; /* Height of navbar */
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);

    }

    .sidebar-sticky {
        position: relative;
        top: 0;
        height: calc(100vh - 48px);
        padding-top: .5rem;
        overflow-x: hidden;
        overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */

        i {
            margin-right: 10px;
            font-size: 16px;
        }

        .title {
            font-size: 16px;
        }
    }

    @supports ((position: -webkit-sticky) or (position: sticky)) {
        .sidebar-sticky {
            position: -webkit-sticky;
            position: sticky;
        }
    }



    .sidebar .nav-link {
        font-size: 19px;
        font-weight: 600;
        color: rgb(0, 0, 0);
        list-style: none;
        letter-spacing: .05em;
        transition-duration: .3s;
        padding-top: 20px;
        padding-bottom: 20px;
        transition: .5s;

        i {
            font-size: 22px;
        }

        &:hover {
            background:rgb(223, 231, 253);
        }
    }

    .is-active {
        background:rgb(223, 231, 253);
        border-left: 5px solid #0077ff;

        i {
            color: #0077ff;
        }

    }


    .sidebar-heading {
        font-size: 1.0rem;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: .2em;
    }

</style>

