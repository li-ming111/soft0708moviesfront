<template>
  <a-tree
    v-model:selectedKeys="selectedKeys"
    :load-data="onLoadData"
    :tree-data="treeData"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TreeProps } from 'ant-design-vue';
import { onMounted } from 'vue';
import axios from 'axios';

const selectedKeys = ref<string[]>([]);
const treeData = ref<TreeProps['treeData']>([]);

//加载一级菜单
onMounted(() => {
  axios.get('/movies/hxxsubject/getFirstSubject').then(res => {
    treeData.value = res.data.data.items;
  });
})

const onLoadData: TreeProps['loadData'] = (treeNode:any) => {
  return new Promise<void>(resolve => {
    if (treeNode.dataRef.children) {
      resolve();
      return;
    }
    setTimeout(() => {
      axios.get(`/movies/hxxsubject/getSecondSubject/${treeNode.dataRef.id}`)
        .then(res => {
          console.log(res.data.data.items);
          treeNode.dataRef.children = res.data.data.items;
          treeData.value = [...treeData.value as any];
          resolve();
        })
      
    }, 1000);
  });
};
</script>

