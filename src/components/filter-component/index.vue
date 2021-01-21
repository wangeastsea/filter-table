<template lang="pug">
    el-form.search-box
        el-row(:gutter="20")
            filter-control(
                    v-for="(item, index) in filterList"
                    :item="item"
                    :key="index"
                    :filters="filters"
            )
            filter-button(
                v-for="(item, index) in buttonList"
                :item="item"
                :key="index+100"
                :userAuthList="userAuthList"
            )
</template>

<script>
import filterButton from './filter-button.vue'
import filterControl from './filter-control.vue'
export default {
    props: {
        filterList: {
            type: Array,
            default: () => []
        },
        filters: {
            type: Object,
            default: () => ({})
        },
        buttonList: {
            type: Array,
            default: () => []
        }
    },
    components: {
        filterButton,
        filterControl
    },
    data() {
        return {
            userAuthList: {}
        }
    },
    // computed: {
    //     ...mapState({
    //         // 获取全局权限列表
    //         // userAuthList:Object
    //         //     admin-server:Object
    //         //     config-manager:Object
    //         //     config-manager-admin:Object
    //         // 一个按钮的配置🌰如下：
    //         // {
    //         //         key: 'deal',
    //         //         label: '审核',
    //         //         permission: {
    //         //             module: 'stock-capital-server',
    //         //             key: 'admin-recharge-openacct-init'
    //         //         }
    //         // }
    //         userAuthList: (state = {}) => {
    //             const { userAuthList = {} } = state
    //             return userAuthList
    //         }
    //     })
    // }
}
</script>

<style scoped lang="scss">
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
</style>
