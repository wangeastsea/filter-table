# usmart-filter-table

> 封装一个带有搜索框的列表组件
### npm 地址
https://www.npmjs.com/package/usmart-filter-table

### 使用方法：

#### 完整示例配置
```js
<template lang="pug">
usmart-filter-table(
    :config="list"
    :filters="filters"
    :tableList="tableList"
    :pagination="pagination"
    @listenHandleClickFilterButton="handleClickFilterButton"
    @listenHandleClickTableColumnHref="handleClickTableColumnHref"
    @listenHandleChangePaginationSize="handleChangePaginationSize"
    @listenHandleChangePaginationNum="handleChangePaginationNum"
    @listenSortChange="handleSortChange"
)
</template>
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
        // buttonKey 控制点击了哪个过滤按钮
        handleClickFilterButton(buttonKey) {
            if (buttonKey === 'search') {
                this.tableList = Array.from(Array(20), (v,k) => {
                    return {gender: '男', chineseName: 'jack'+ k}
                        }
                    )
                this.pagination.total = 100
            }
        },
        // 控制表格内的操作
        handleClickTableColumnHref() {
        },
        // 控制每页尺寸
        handleChangePaginationSize(val) {
            this.pagination.pageNum = 1
            this.pagination.pageSize = val

        },
        // 控制翻页
        handleChangePaginationNum(val) {
            this.pagination.pageNum = val
        },
        // 操作排序
        handleSortChange (sort) {
            console.log('sort ===>' , sort)
        }
    }
}
```
#### list表格参数配置
- pagination
 ```js
    pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0
    },
 ```
- filterList 条件筛选的配置
目前 支持
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
            key: 'process',
            type: 'href',
            // filter里可以过滤要展示的结果
            filter: row => {
                return '查看'
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
