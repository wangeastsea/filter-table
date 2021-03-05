<template lang="pug">
usmart-filter-table(
    :config="list"
    :tableList="tableList"
    :filters="filters"
    :filtersHide="filtersHide"
    :pageHide="pageHide"
    :pagination="pagination"
    :selection="selection"
    :loading="loading"
    @listenHandleClickFilterButton="handleClickFilterButton"
    @listenHandleClickTableColumnHref="handleClickTableColumnHref"
    @listenHandleChangePaginationSize="handleChangePaginationSize"
    @listenHandleChangePaginationNum="handleChangePaginationNum"
    @listenSortChange="handleSortChange"
    @listenHandleSelectionChange="handleSelectionChange"
)
</template>

<script>
import list from './list'
export default {
    name: 'app',
    data () {
        return {
            pagination: {
                pageNum: 1,
                pageSize: 20,
                total: 0
            },
            filters: list.filters,
            list: list,
            tableList: [],
            loading: false,
            filtersHide: false,
            pageHide: false,
            selection: false
        }
    },
    created() {
        // 模拟请求数据
        this.fetchData(100).then((list) => {
            this.tableList = list
        })
    },
    methods: {
        // 模仿接口返回的数据
        getData() {
            this.fetchData(100).then((list) => {
                this.tableList = list
            })
        },
        handleClickFilterButton(buttonKey) {
            console.log('filters===>', this.filters)
            console.log('buttonKey ===>', buttonKey)
            if (buttonKey === 'search') {
                this.pagination.pageNum = 1
                this.fetchData(100).then((list) => {
                    this.tableList = list
                })
            }
        },
        handleClickTableColumnHref(hrefKey) {
            console.log('hrefKey===>', hrefKey)
        },
        handleSelectionChange (val) {
            console.log('selected-val',val)
        },
        // 改变每页面显示条数
        handleChangePaginationSize(val) {
            this.pagination.pageNum = 1
            this.pagination.pageSize = val
            this.getData()
        },
        // 翻页操作
        handleChangePaginationNum(val) {
            this.pagination.pageNum = val
            this.getData()
        },
        handleSortChange (sort) {
            console.log('sort ===>' , sort)
        },
        // 模拟数据返回, 一个返回接口数据的api
        fetchData (total) {
            this.loading = true
            let num = this.pagination.pageSize
            this.pagination.total = total
            return new Promise((resolve) => {
                setTimeout(() => {
                    let list = Array.from(Array(num), (v,k) => {
                            return {gender: 'nv', chineseName: 'jack'+ k}
                        }
                    )
                    this.loading = false
                    resolve(list)
                }, 2000)
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="scss">

</style>
