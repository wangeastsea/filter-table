<template lang="pug">
    el-col(
        v-if="item.permission && userAuthList[item.permission.module] && userAuthList[item.permission.module][item.permission.key]"
        :span="item.span"
        :key="item.key"
    )
        el-button(:type="item.config.type" @click="handleClickFilterButton(item.key)") {{ item.label }}
    el-col(
        v-else
        :span="item.span"
        :key="item.key"
    )
        el-button(:type="item.config.type" @click="handleClickFilterButton(item.key)") {{ item.label }}
</template>

<script>
import { findComponentsUpward } from '../utils/index.js'
export default {
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        userAuthList: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {}
    },
    methods: {
        handleClickFilterButton(buttonKey) {
            // 获取table根组件
            let usmartFilterTable = findComponentsUpward(
                this,
                'usmart-filter-table'
            )[0]
            // 执行监听方法
            usmartFilterTable.$emit(
                'listenHandleClickFilterButton', buttonKey
            )
        }
    }
}
</script>
