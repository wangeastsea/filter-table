<template lang="pug">
usmart-filter-table(
    :config="list"
    :tableList="tableList"
    :filtersHide="true"
    :pageHide="true"
    @listenHandleClickFilterButton="handleClickFilterButton"
    @listenHandleClickTableColumnHref="handleClickTableColumnHref"
    @listenHandleChangePaginationSize="handleChangePaginationSize"
    @listenHandleChangePaginationNum="handleChangePaginationNum"
    @listenSortChange="handleSortChange"
)
</template>

<script>
// import filterTable from './components/main.vue'
import list from './list'
export default {
    name: 'app',
    // components: {
    //     filterTable
    // },
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
        this.tableList = Array.from(Array(20), (v,k) => {
                return {gender: '男', chineseName: 'jack'+ k}
            }
        )
        this.pagination.total = 100

    },
    methods: {
        handleClickFilterButton(buttonKey) {
            if (buttonKey === 'search') {
                this.tableList = Array.from(Array(20), (v,k) => {
                    return {gender: '男', chineseName: 'jack'+ k}
                        }
                    )
                this.pagination.total = 100
            }
        },
        handleClickTableColumnHref() {
        },
        handleChangePaginationSize(val) {
            this.pagination.pageNum = 1
            this.pagination.pageSize = val

        },
        handleChangePaginationNum(val) {
            this.pagination.pageNum = val
        },
        handleSortChange (sort) {
            console.log('sort ===>' , sort)
        }
    }
}
</script>

<style lang="scss">

</style>
