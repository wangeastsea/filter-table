# usmart-filter-table

> 封装一个带有搜索框的列表组件
### npm 地址
https://www.npmjs.com/package/usmart-filter-table

### 使用方法：
#### 组件可以支持的参数：
- config 丢入配置文件
- tableList 接口返回的数组数据
- filters 查询参数对象
- filtersHide 是否隐藏搜索框
- selection 是否有选择框
- pageHide 是否隐藏分页组件名，默认false
- resetIndex 自定义序号，默认根据pageSize和pageNum来
- headerIsWrap 表头是否可以换行,默认false ==》 label: '客户|姓名',
- height Table 的高度，默认为自动高度。Table 的高度会受控于外部样式
- SerialNumName 序号的名称，默认是序号
- loading 是否添加loading，默认false
- pagination 分页参数
- paginationFixed 是否固定， 默认true固定
#### 完整示例配置
```js
<template lang="pug">
usmart-filter-table(
    :config="list"
    :tableList="tableList"
    :filters="filters"
    :filtersHide="false"
    :pageHide="false"
    :pagination="pagination"
    :selection="true"
    :loading="loading"
    @listenHandleClickFilterButton="handleClickFilterButton"
    @listenHandleClickTableColumnHref="handleClickTableColumnHref"
    @listenHandleChangePaginationSize="handleChangePaginationSize"
    @listenHandleChangePaginationNum="handleChangePaginationNum"
    @listenSortChange="handleSortChange"
    @listenHandleSelectionChange="handleSelectionChange"
)
</template>
import list from './list'
export default {
    name: 'app',

    data () {
        return {
            // 分页参数
            pagination: {
                pageNum: 1,
                pageSize: 20,
                total: 0
            },
            // 查询参数
            filters: list.filters,
            // 配置项
            list: list,
            tableList: [],
            // 是否有加载loading
            loading: false,
            // 是否隐藏搜索框
            filtersHide: false,
            // 是否隐藏分页组件
            pageHide: false,
            // 是否可勾选
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
```
#### list参数配置
- filterList 条件筛选的配置
    - input
    ```js

        {
            label: '资金账号',
            key: 'chineseName',
            labelWidth: '70px',
            type: 'input', // input，range-input
            span: 3
        }

    ```
    - range-input
    ```js
          {
            label: 'MV比例',
            key: 'mvRate',
            labelWidth: '100px',
            type: 'range-input',
            rate: 'rate',
            config: {
                key1: 'mvStart',
                key2: 'mvEnd'
            },
            span: 8
        },
    ```
    - select
    ```js
     {
            label: '市场',
            key: 'exchangeType',
            type: 'select',
            options: exchangeTypeMapList,
            labelWidth: '50px',
            span: 6
        },
    ```
    - select-multiple
    ```js
    {
            label: '用户证件归属',
            key: 'countryTypes',
            labelWidth: '150px',
            type: 'select-multiple',
            options: [
                {
                    key: 1,
                    label: '大陆',
                    val: 1
                },
                {
                    key: 2,
                    label: '香港',
                    val: 2
                },
                {
                    key: 3,
                    label: '海外',
                    val: 3
                }
            ],
            span: 8
        },
    ```
    - datePicker - datetimerange
    ```js
    {
            label: '更新时间：',
            key: 'marketTime',
            type: 'datePicker',
            config: {
                type: 'datetimerange',
                rangeSeparator: '至',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期'
            },
            span: 16
        },
    ```
    - datePicker - daterange
    ```js
      {
            label: '除息日',
            key: 'exDividendDate',
            type: 'datePicker',
            config: {
                type: 'daterange',
                rangeSeparator: '-',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期',
                valueFormat: 'yyyy-MM-dd'
            },
            labelWidth: '70px',
            span: 12
        },
    ```


- buttonList 按钮列表

```js
const buttonList = [
        {
            label: '查询',
            key: 'search',
            type: 'button',
            config: {
                type: 'primary'
            },
            span: 3
        },
        {
            label: '重置',
            key: 'reset',
            type: 'button',
            config: {
                type: 'primary'
            },
            span: 3
        }
    ]

```

- filters 筛选值


```js
const filtersHandle = filterList => {
    return filterList.reduce((obj, item) => {
        obj[item.key] = ''
        return obj
    }, {})
}
const filters = filtersHandle(filterList)


```
- tableColumns 表格的每列key

```js
const tableColumns = [
        {
            label: '客户姓名',
            key: 'chineseName',
            filter: row => {
                return row['chineseName'] || row['englishName'] || {}
            }
        },
        {
            label: '性别',
            key: 'gender',
            // 是否可排序
            sortable: true
        },
        {
            label: '操作',
            key: 'process',
            type: 'href',
            // filter里可以过滤要展示的结果
            filter: row => {
                return '查看'
            }
        }
    ]
```
来一个完整的🌰： list 文件

```js
const filtersHandle = filterList => {
    return filterList.reduce((obj, item) => {
        obj[item.key] = ''
        return obj
    }, {})
}
const filterList =
    [
        {
            label: '性别',
            key: 'gender',
            type: 'select',
            labelWidth: '70px',
            span: 5,
            options: [
                {
                    label: '全部',
                    val: ''
                },
                {
                    label: '男',
                    val: '1'
                },
                {
                    label: '女',
                    val: '0'
                },
                {
                    label: '中性',
                    val: '2'
                }
            ]
        },
        {
            label: '客户姓名',
            key: 'chineseName',
            labelWidth: '70px',
            type: 'input',
            span: 5
        },
        {
            label: '客户申请时间',
            key: 'startApplyTime',
            labelWidth: '100px',
            type: 'datePicker',
            config: {
                type: 'datetime'
            },
            span: 8
        }
    ]

const buttonList = [
    {
        label: '查询',
        key: 'search',
        type: 'button',
        config: {
            type: 'primary'
        },
        span: 3
    },
    {
        label: '重置',
        key: 'reset',
        type: 'button',
        config: {
            type: 'primary'
        },
        span: 3
    }
]

const tableColumns = [
    {
        label: '客户姓名',
        key: 'chineseName',
        filter: row => {
            return row['chineseName'] || row['englishName'] || {}
        }
    },
    {
        label: '性别',
        key: 'gender',
        sortable: true
    },
    {
        label: '操作',
        key: 'view',
        type: 'moreHref',
        // filter里可以过滤要展示的结果
        filter: row => {
            return [
                {
                    label: '禁用',
                    key: 'disable'
                },
                {
                    label: '启用',
                    key: 'disable'
                }
            ]
        }
    }
]
const filters = filtersHandle(filterList)

export default {
    filterList,
    tableColumns,
    buttonList,
    filters
}

```

![image.png](https://upload-images.jianshu.io/upload_images/5016475-a39224b7cf2ddcd9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
