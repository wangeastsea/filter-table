<template lang="pug">
.filter-table-wrap
    filter-component(
        v-if="!filtersHide"
        :filters="filters"
        :filterList="config.filterList"
        :buttonList="config.buttonList"
    )
    table-component(
        v-loading="loading"
        :data="tableList"
        :height="height"
        border
        :selection="selection"
        :resetIndex="resetIndex"
        :SerialNumName="SerialNumName"
        :tableColumns="config.tableColumns"
        :headerIsWrap="headerIsWrap"
        :pageNum="pagination.pageNum"
        :pageSize="pagination.pageSize"
        ref="sortTable"
    )
    el-pagination(
        :class="paginationFixed ? 'fixed' : ''"
        @size-change="handleChangePaginationSize"
        @current-change="handleChangePaginationNum"
        :page-sizes="[10, 20, 50, 100]"
        :current-page.sync="pagination.pageNum"
        :page-size="pagination.pageSize"
        v-show="!pageHide"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total")
</template>

<script>
import filterComponent from './filter-component/index.vue'
import tableComponent from './table-component'
export default {
    name: 'usmart-filter-table',
    props: {
        // 包括搜索列表和tableColumn的配置
        config: {
            type: Object
        },
        // 列表数据
        tableList: {
            type: Array
        },
        // filters 对象是搜索的条件值 v-modle
        filters: {
            type: Object
        },
        // 是否隐藏搜索框
        filtersHide: {
            type: Boolean
        },
        // 是否有选择框
        selection: {
            type: Boolean
        },
        // 是否隐藏分页组件名
        pageHide: {
            type: Boolean
        },
        // 自定义序号
        resetIndex: {
            type: String
        },
        //头部标题是否换行，true:换行，false:不换，例如：标题one | 标题two
        headerIsWrap: {
            type: Boolean
        },
        // Table 的高度，默认为自动高度。Table 的高度会受控于外部样式
        height: {
            type: String
        },
        // 序号的名称，默认是序号
        SerialNumName: {
            type: String
        },
        // 是否添加loading
        loading: {
            type: Boolean
        },
        // 分页组件
        pagination: {
            type: Object
        },
        paginationFixed: {
            type: Boolean,
            default: true
        }
    },
    components: {
        filterComponent,
        tableComponent
    },
    methods: {
        // 切换全选状态 供父级调用，不可删除
        toggleAllSelection() {
            this.$refs.sortTable.toggleAllSelection()
        },
        // pagenation methods
        handleChangePaginationSize(val) {
            console.log('handleChangePaginationSize==>', val)
            this.$emit('listenHandleChangePaginationSize', val)
        },
        handleChangePaginationNum(val) {
            this.$emit('listenHandleChangePaginationNum', val)
        }
    }
}
</script>

<style scoped lang="scss">
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
    .el-col-8 {
        width: 347px;
    }
    .el-col-6 {
        width: 300px;
        .el-select {
            width: auto;
        }
    }
    .el-col-16 {
        width: 530px;
    }
    .el-col-2 {
        width: auto;
    }
}
.el-col {
    border-radius: 4px;
    .range-input.el-input {
        width: 100px;
    }
}
.blue {
    color: #409eff;
}
.green {
    color: #70b603;
}
.yellow {
    color: #f59a23;
}
.red {
    color: #f52349;
}
.deepRed {
    color: #a60014;
}
.filter-table-wrap.fixed {
    padding-bottom: 50px;
}
.filter-table-wrap {
    padding: 15px;
    min-height: 500px;
    .search-box.el-form {
        display: flex;
        flex-wrap: wrap;
    }
    .extand {
        .el-form-item {
            width: 25%;
        }
    }
    .el-pagination {
        text-align: right;
    }
    .el-pagination.fixed {
        z-index: 10;
        background: #fff;
        position: fixed;
        right: 70px;
        bottom: 30px;
    }
}
</style>
