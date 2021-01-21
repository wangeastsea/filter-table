<template lang="pug">
    el-col(
        :span="item.span"
        :key="item.key"
    )
        el-form-item(
            :label="item.label"
            :prop="item.key"
            :label-width="item.labelWidth || '110px'"
        )
            // input输入类型
            el-input(
                v-if="item.type==='input'"
                v-model.trim="filters[item.key]"
            )
            // input 范围输入
            template(v-else-if="item.type === 'range-input'")
                el-input.range-input(
                    v-model.trim="filters[item.config.key1]"
                    clearable
                )
                span &nbsp;-&nbsp;
                el-input.range-input(
                    v-model.trim="filters[item.config.key2]"
                    clearable
                )
            // select 单选
            el-select(
                v-if="item.type==='select'"
                v-model="filters[item.key]"
                clearable)
                el-option(
                    v-for="option in item.options"
                    :key="option.key"
                    :value="option.val"
                    :label="option.label")
            // select 多选
            el-select(
                v-if="item.type==='select-multiple'"
                v-model="filters[item.key]"
                multiple clearable)
                el-option(
                    v-for="option in item.options"
                    :key="option.key"
                    :value="option.val"
                    :label="option.label"
                    :disabled="option.disabled")
            // 所有date类型
            template(v-if="item.type==='datePicker'")
                el-date-picker(
                    v-if="item.config.type==='datetimerange'"
                    v-model="filters[item.key]"
                    :type="item.config.type"
                    :range-separator="item.config.rangeSeparator"
                    :start-placeholder="item.config.startPlaceholder"
                    :end-placeholder="item.config.endPlaceholder"
                    :value-format="item.config.valueFormat"
                    :default-time="['00:00:00', '23:59:59']")
                el-date-picker(
                    v-else-if="item.config.type==='daterange'"
                    v-model="filters[item.key]"
                    :type="item.config.type"
                    :range-separator="item.config.rangeSeparator"
                    :start-placeholder="item.config.startPlaceholder"
                    :end-placeholder="item.config.endPlaceholder"
                    :value-format="item.config.valueFormat"
                )
                el-date-picker(
                    v-else-if="item.config.type==='year'"
                    v-model="filters[item.key]"
                    :type="item.config.type"
                    placeholder="选择年份"
                    :value-format="item.config.valueFormat"
                    :picker-options="item.config.pickerOptions"
                    :default-value="item.config.defaultValue")
                el-date-picker(
                    v-else="item.config.type"
                    v-model="filters[item.key]"
                    :value-format="item.config.valueFormat"
                    :type="item.config.type"
                    placeholder="选择日期")
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        filters: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>

<style scoped lang="scss">
.el-col {
    border-radius: 4px;
    .range-input.el-input {
        width: 100px;
    }
}
</style>
