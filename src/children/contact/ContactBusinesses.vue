<template>
  <div class="contact-businesses">

      <div class="contact-businesses-header">
          <div>
              <h5>Contact Businesses</h5>
              <p>A list of the businesses belonging to the contact</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ContactBusinsses'
}
</script>

<style lang="scss">
.contact-businesses {

    .contact-businesses-header {
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
    }
}

</style>