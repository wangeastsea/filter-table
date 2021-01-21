<template lang="pug">
filterTable(
    :config="list"
    :filters="filters"
    :tableList="tableList"
    :pagination="pagination"
    @listenHandleClickFilterButton="handleClickFilterButton"
    @listenHandleClickTableColumnHref="handleClickTableColumnHref"
    @listenHandleChangePaginationSize="handleChangePaginationSize"
    @listenHandleChangePaginationNum="handleChangePaginationNum"
)
</template>

<script>
import filterTable from './components/main.vue'
import list from './list'
export default {
    name: 'app',
    components: {
        filterTable
    },
    data () {
        return {
            pagination: {
                pageNum: 1,
                pageSize: 20,
                total: 0
            },
            filters: list.fitlers,
            list: list,
            tableList: [],
        }
    },
    created() {
        this.tableList = Array.from(Array(100), (v,k) => {
                return {gender: '男', chineseName: 'jack'+ k}
            }
        )
        this.pagination.total = 100

    },
    methods: {
        handleClickFilterButton() {
        },
        handleClickTableColumnHref() {
        },
        handleChangePaginationSize(val) {
            this.pagination.pageNum = 1
            this.pagination.pageSize = val

        },
        handleChangePaginationNum(val) {
            console.log('handleChangePaginationNum - outside', val)
            console.log('this.pagination.pageSize', this.pagination.pageSize)
            console.log('this.pagination.total', this.pagination.total)
            this.pagination.pageNum = val
        }
    }
}
</script>

<style lang="scss">

</style>
