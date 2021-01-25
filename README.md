# filter-table

> 封装一个带有搜索框的列表组件

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

### npm 地址
https://www.npmjs.com/package/usmart-filter-table
### 表格的使用方式：

- type === innerHtml

```js
// tableColumns里的配置:
{
            label: '当前处理时长',
            key: 'handleTime',
            type: 'innerHtml',
            filter: row => {
                const { createdTime, updatedTime } = row
                if (getHour(createdTime, updatedTime) > 1) {
                    let innerHtml = `<div class="rowsColor">${timeDiff(
                        createdTime,
                        updatedTime
                    )}</div>`
                    return innerHtml
                } else {
                    return timeDiff(createdTime, updatedTime)
                }
            }
        }
```
