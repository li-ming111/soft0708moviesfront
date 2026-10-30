<template>
<div>
    <a-layout-sider width="200" height="100%" style="background: #fff">
        <a-menu
          v-model:selectedKeys="checkedKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }">
          <a-menu-item key="/main">
            <router-link to="/main"><coffee-outlined/>欢迎</router-link>
          </a-menu-item>
          <a-menu-item key="/main/movie">
            <router-link to="/main/movie"><usergroup-add-outlined />在线影院系统</router-link>
          </a-menu-item>
          <a-sub-menu key="/admin/adminMainView">
            <template #title>
              <span>
                <SolutionOutlined />演员信息              
              </span>
            </template>
            <a-menu-item key="/admin/actor">
              <router-link to="/main/actor"><TeamOutlined />演员列表</router-link>
            </a-menu-item>
            <a-menu-item key="/admin/actorSave">
              <router-link to="/main/actorSave"><TeamOutlined />添加演员</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="/admin/moviesSubject">
            <template #title>
              <span>
                <PlayCircleOutlined />影片分类              
              </span>
            </template>
            <a-menu-item key="/admin/movieSubject">
              <router-link to="/main/movieSubject"><TeamOutlined />影片分类列表</router-link>
            </a-menu-item>
            <a-menu-item key="/admin/movieSubjectSave">
              <router-link to="/main/movieSubjectSave"><TeamOutlined />添加影片分类</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="/admin/moviesFilmList">
            <template #title>
              <span>
                <VideoCameraAddOutlined />影片管理              
              </span>
            </template>
            <a-menu-item key="/admin/filmList">
              <router-link to="/main/filmList"><TableOutlined />影片列表</router-link>
            </a-menu-item>
            <a-menu-item key="/admin/filmBaseInfo">
              <router-link to="/main/filmBaseInfo"><PlaySquareOutlined />编辑影片基本信息</router-link>
            </a-menu-item>
            <a-menu-item key="/admin/filmBaseInfo">
              <router-link to="/main/videoPlayer"><PlaySquareOutlined />视频播放</router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
</div>
</template>

<script setup lang="ts">
  import router from '../../router';
  import { ref, watch } from 'vue';

    let checkedKeys = ref([''])
    //监听
    watch(()=>router.currentRoute.value.path,(newValue)=>{
      checkedKeys.value = []
      checkedKeys.value.push(newValue)
    },{immediate:true})
      
</script>

<style lang="css">

</style>
