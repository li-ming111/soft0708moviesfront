<template>
  <a-table :columns="columns" :data-source="data" :pagination="false">
    <!-- :pagination="pagination" @change="onChange"> -->
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'avatarUrl'">
        <img :src="record.avatarUrl" alt="" style="width: 100px; height: 100px" />
      </template>

      <template v-if="column.dataIndex === 'action'">
        <a-popconfirm
          v-if="columns.length"
          title="是否删除?"
          cancelText="取消"
          okText="确定"
          @confirm="onDelete(record.id)"
        >
          <a>删除</a>
        </a-popconfirm>
        <a-button type="text" @click="updateData(record)">更新</a-button>
      </template>
    </template>
  </a-table>
  <PageView :total="total" :pageSizeOptions="['5', '7']" @change="onChange" />
</template>
<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import router from "../router";
import PageView from "./common/PageView.vue";

const columns = [
  {
    title: "演员名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "演员头衔",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "资历",
    dataIndex: "qualification",
    key: "qualification",
  },
  {
    title: "演员头像",
    dataIndex: "avatarUrl",
    key: "avatarUrl",
  },
  {
    title: "创建时间",
    key: "createTime",
    dataIndex: "createTime",
  },
  {
    title: "排序",
    key: "sort",
    dataIndex: "sort",
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "action",
  },
];

//数据源参数
const data = ref([]);

//-----------分页------------------------------
const total = ref(0);
   //分页参数
const queryParams = ref({
  current: 1,
  size: 5,
});
//事件
const onChange = (page: number, pageSize: number) => {
  queryParams.value.current = page;
  queryParams.value.size = pageSize;
  console.log("--------------->>>", page, pageSize);
  showData();
};
//加载数据
const showData = () => {
  axios({
    method: "get",
    url: "/movies/hxxactor/pageList",
    params: queryParams.value,
  }).then((res) => {
    let result = res.data;
    total.value = result.data.total;
    data.value = result.data.rows;
  });
};
//页面加载执行
onMounted(() => {
  showData();
});

//删除
const onDelete = (id: number) => {
  axios.delete(`/movies/hxxactor/delete/${id}`).then(() => {
    message.success("删除成功");
    //重新加载
    showData();
  });
};
//更新页面
const updateData = (actor: any) => {
  router.push({
    path: "/main/actorSave",
    state: {
      params: JSON.stringify(actor),
    },
  });
};
</script>
