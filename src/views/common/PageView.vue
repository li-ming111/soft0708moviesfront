<template>
  <a-pagination
    :total="total"
    :current="current"
    :pageSize="pageSize"
    :pageSizeOptions="pageSizeOptions"
    show-size-changer
    :show-quick-jumper="showQuickJumper"
    :show-sizer="showSizer"
    @change="handleChange"
  />
</template>
<script setup lang="ts">
import { PropType, ref } from "vue";
//参数属性
defineProps({
  total: {//总页数
    type: Number as PropType<number>,
    required: true,
  },
  pageSize: {//每页显示条数
    type: Number as PropType<number>,
    required: false,
  },
  current: {//当前页码
    type: Number as PropType<number>,
    default: 1,
    required: false,
  },
  pageSizeOptions: {//每页显示条数选择器
    type: String as PropType<string>,
    default: ["5", "10", "20"],
  },
  showSizer: {//是否显示每页条数选择器
    type: Boolean as PropType<boolean>,
    default: true,
  },
  showQuickJumper: {//是否显示跳转页码
    type: Boolean as PropType<boolean>,
    default: true,
  },
  onChange: {//分页改变的事件方法
    type: Function as PropType<(page: number, pageSize: number) => void>,
    default: () => {},
  },
});
//当前页码
const current = ref<number>(1);
const pageSize = ref<number>(5);
//分页改变的事件方法，传递给父组件
const emit = defineEmits(["change"]);
//当前页码改变
const handleChange = (_current: number, _pageSize: number) => {
  current.value = _current;
  pageSize.value = _pageSize;
  emit("change", _current, _pageSize);
};
</script>
