<template>
<div>
    <a-layout-header class="header">
      <div style="float: right; color: white;">
        您好：{{  }}&nbsp;&nbsp;
        <a-button type="link" @click="exit">
          退出登录
        </a-button>
      </div>
        <a-menu
          v-model:selectedKeys="checkedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }">
          <a-menu-item key="/main">
            <router-link to="/main"><coffee-outlined/>欢迎</router-link>
          </a-menu-item>
          <a-menu-item key="/main/movie">
            <router-link to="/main/movie"><usergroup-add-outlined />在线影院系统</router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-header>
</div>
</template>

<script setup lang="ts">
  import { ref,watch } from 'vue';
  import router from '../../router';

        const checkedKeys=ref(['/main/welcome'])
        //监听
        watch(()=>router.currentRoute.value.path,newValue=>{
          checkedKeys.value = []
          checkedKeys.value.push(newValue)
        },{immediate:true})

        const exit=()=>{
            router.push({path:'/'})
        }

</script>

<style lang="css">

</style>
