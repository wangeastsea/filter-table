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
            key: 'gender'
        },
        {
            label: '操作',
            key: 'process',
            type: 'href',
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
