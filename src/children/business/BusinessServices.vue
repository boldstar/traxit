<template>
  <div class="business-services-wrapper">
      <div class="business-services" v-if="$route.name != 'edit-business'">
            <div class="business-services-header">
               <h5>Business Services Provided</h5>
               <p>Services provided for the business</p>
            </div>
            <div class="business-services-card card shadow-sm mb-3">
                <div class="d-flex justify-content-between">
                        <div class="text-left">
                            <h5 class="mb-0">Payroll</h5>
                            <p class="text-secondary">Switch to toggle if service is provided.</p>
                        </div>
                        <div class="align-self-center">
                            <label class="switch">
                                <input type="checkbox" v-model="businessService" @change="changeActive">
                                <span class="slider round"></span>
                            </label>
                        </div>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'BusinessServices',
    data() {
        return {
            businessService: true
        }
    },
    methods: {
        changeActive() {

        }
    }
}
</script>

<style lang="scss">
    .business-services-wrapper {
    width: 100%;

    .business-services {
      
      .business-services-header {
        text-align: left;
        margin-bottom: 10px;

        h5 {
          margin-bottom: 0;
        }

        p {
          margin-bottom: 0;
        }
      }

      .business-services-section {
        margin-bottom: 30px;

        .business-services-section-header {
          text-align: left;
          padding: 10px;
        }

        ul {
          list-style: none;
          padding: 0;

          .business-services-item {
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


        .business-services-section-footer {
            padding: 10px;
          text-align: left;
        }
      }

        .business-services-card {
            padding: 20px;
            padding-bottom: 10px;
        }
    }
  }

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>