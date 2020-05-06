<template>
  <div class="contact-settings">

      <div class="contact-settings-header">
          <div>
              <h5>Contact Settings</h5>
              <p>A list of the settings available for the selected contact</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ContactSettings'
}
</script>

<style lang="scss">
.contact-settings {

    .contact-settings-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

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