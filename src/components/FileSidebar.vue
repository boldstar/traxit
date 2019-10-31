<template>
    <div class="file-sidebar" >
        <div class="card shadow-sm p-2 pb-0">
            <div class="card-body p-0 d-flex flex-column">
                <ul class="p-0 text-left mb-0 file-btn-list">
                    <li class="m-0 mb-2 file-btn-wrapper">
                        <button class="btn btn-block bg-white font-weight-bold d-flex justify-content-between" @click="changeItem('Inbox')" :class="{'selected-item': selected === 'Inbox'}">Inbox<i class="fas fa-inbox align-self-center text-primary"></i>
                        <span class="badge badge-danger file-badge" v-if="inbox_length > 0">{{inbox_length}}</span>
                        </button>
                    </li>
                    <li class="m-0 file-btn-wrapper">
                        <button class="btn btn-block bg-white font-weight-bold d-flex justify-content-between" @click="changeItem('Archive')" :class="{'selected-item': selected === 'Archive'}">Archive<i class="fas fa-archive align-self-center text-primary"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FileSidebar',
    props: ['selected', 'inbox_length'],
    methods: {
        changeItem(item) {
            this.$emit('change-item', item)
        }
    }
}
</script>

<style lang="scss">
    .file-sidebar {
        width: 200px;
        min-height: 80vh;
        z-index: 100;
        margin-left: 2px;
    }

    .file-btn-list {
        list-style: none;
    }

    .file-btn-wrapper {
        position: relative;

        .file-badge {
            position: absolute;
            right: 3px;
            top: 3px;
            font-size: .7rem!important;
        }
    }


    .selected-item {
        box-shadow: 0 0 5px 0 rgba(0,0,0,.5);
    }
</style>
