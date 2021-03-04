<template lang="pug">
.table-wrap
    el-table(
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        ref="sortTable"
        v-bind="$attrs"
    )
        el-table-column(
            v-if="selection"
            type="selection"
        )
        el-table-column(
            type="index"
            :index="resetIndex ? i => i + 1 : i => (pageNum - 1) * pageSize + i + 1"
            :label="SerialNumName || '序号'"
            align="center"
        )
        el-table-column(
            v-for="item in tableColumns"
            :key="item.key"
            :label="item.label"
            :width="item.width"
            :prop="item.key"
            :render-header="renderheader"
            :sortable="item.sortable"
            align="center"
        )
            template(slot-scope="scope")
                template(v-if="item.type === 'href'")
                    template(v-if="typeof item.filter(scope.row) === 'object'")
                        span(style="color: item.filter(scope.row).color") {{ item.filter(scope.row).data }}
                    template(v-else)
                        template(v-if="item.permission")
                            a(
                                v-if="userAuthList[item.permission.module] && userAuthList[item.permission.module][item.permission.key]"
                                @click="handleClickTableColumnHref(item.key, scope.row, item.permission.key)"
                                class="blue") {{ item.filter(scope.row) }}
                        template(v-else)
                            //- p 解决排列问题
                            p(v-if="item.domType === 'p'")
                                a(class="blue" @click="handleClickTableColumnHref(item.key, scope.row)") {{ item.filter(scope.row) }}
                            template(v-else)
                                a(class="blue" @click="handleClickTableColumnHref(item.key, scope.row)") {{ item.filter(scope.row) }}


                template(v-else-if="item.type === 'moreHref'")
                    template(
                        v-for="href in item.filter(scope.row)")
                        template(v-if="href.permission")
                            //- p 解决排列问题
                            p(v-if="href.domType === 'p'")
                                a(
                                    v-if="userAuthList[href.permission.module] && userAuthList[href.permission.module][href.permission.key]"
                                    class="blue"
                                    @click="handleClickTableColumnHref(href.key, scope.row, href.permission.key)") {{ href.label }}
                            span(v-else-if="href.domType === 'span'") {{ href.label }}
                            template(v-else)
                                template(v-if="href.reviewPermission")
                                    a(
                                        v-if="userAuthList[href.permission.module] && userAuthList[href.permission.module][href.permission.key] && scope.row[href.reviewPermission.key].includes(userName)"
                                        class="blue"
                                        @click="handleClickTableColumnHref(href.key, scope.row, href.permission.key)") {{ href.label }}
                                template(v-else)
                                    a(
                                        v-if="userAuthList[href.permission.module] && userAuthList[href.permission.module][href.permission.key]"
                                        class="blue"
                                        @click="handleClickTableColumnHref(href.key, scope.row, href.permission.key)") {{ href.label }}
                        template(v-else)
                            p(v-if="href.domType === 'p'")
                                a(
                                    class="blue"
                                    @click="handleClickTableColumnHref(href.key, scope.row)") {{ href.label }}
                            span(v-else-if="href.domType === 'span'") {{ href.label }}
                            template(v-else)
                                a(
                                    class="blue"
                                    @click="handleClickTableColumnHref(href.key, scope.row)") {{ href.label }}
                template(v-else-if="item.type === 'innerHtml'")
                    div(v-html="item.filter ? item.filter(scope.row) : scope.row[item.key]")
                span(v-else) {{ item.filter ? item.filter(scope.row) : scope.row[item.key] }}
        slot(name="more-col")
</template>

<script>
export default {
    props: {
        selection: {
            type: Boolean,
            default: false
        },
        resetIndex: {
            type: Number,
            default: 0
        },
        SerialNumName: {
            type: String,
            default: ''
        },
        tableColumns: {
            type: Array,
            default: () => []
        },
        headerIsWrap: {
            //头部标题是否换行，true:换行，false:不换，例如：标题one | 标题two
            type: Boolean,
            default: true
        },
        pageNum: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            userAuthList: {}
        }
    },
    // computed: {
    //     ...mapState({
    //         userName: state => state.login.userInfo.userName,
    //         userAuthList: (state = {}) => {
    //             // 获取全局权限列表
    //             // userAuthList:Object
    //             //     admin-server:Object
    //             //     config-manager:Object
    //             //     config-manager-admin:Object
    //             // 一个按钮的配置🌰如下：
    //             // {
    //             //         key: 'deal',
    //             //         label: '审核',
    //             //         permission: {
    //             //             module: 'stock-capital-server',
    //             //             key: 'admin-recharge-openacct-init'
    //             //         }
    //             // }
    //             const { userAuthList = {} } = state
    //             return userAuthList
    //         }
    //     })
    // },
    methods: {
        // form methods
        // 切换全选状态 留着父级调用，不可删除
        toggleAllSelection() {
            this.$refs.sortTable.toggleAllSelection()
        },
        handleSelectionChange(val) {
            // 往外层组件触发
            this.$parent.$emit('listenHandleSelectionChange', val)
        },
        // 可排序的监听事件
        handleSortChange(val) {
            this.$parent.$emit('listenSortChange', val)
        },
        handleClickTableColumnHref(columnKey, row, permissionKey) {
            // 往外层组件触发
            this.$parent.$emit(
                'listenHandleClickTableColumnHref',
                columnKey,
                row,
                permissionKey
            )
        },
        // 是否允许tab换行
        renderheader(h, { column, $index }) {
            if (this.headerIsWrap) {
                return h('span', {}, [
                    h('span', {}, column.label.split('|')[0]),
                    h('br'),
                    h('span', {}, column.label.split('|')[1])
                ])
            }
            return column.label
        }
    }
}
</script>

<style scoped lang="scss">
.table-wrap {
    padding-top: 20px;
}
.blue {
    color: #409eff;
}
a {
    padding: 5px;
}
</style>
