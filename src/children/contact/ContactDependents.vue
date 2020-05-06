<template>
  <div class="contact-dependents">

      <div class="contact-dependents-header">
          <div>
              <h5>Contact Dependents</h5>
              <p>A list of the dependents belonging to the contact</p>
          </div>
          <router-link :to="{path: '/contact/' + clientDetails.id + '/add-dependent'}" class="btn btn-sm btn-secondary">Add Dependent</router-link>
      </div>

  </div>
</template>

<script>
export default {
    name: 'ContactDependents',
    props: ['clientDetails']
}
</script>

<style lang="scss">
.contact-dependents {

    .contact-dependents-header {
        display: flex;
        justify-content: space-between;

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

        a {
            align-self: center;
            font-weight: bold;

            &:hover {
                text-decoration: none;
            }
        }
    }
}
</style>