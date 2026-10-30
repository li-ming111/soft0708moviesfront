<template>
    <a-layout>
       <headerView></headerView>
      <a-layout>
        <!-- 左侧树 -->
        <silderView></silderView>
        <a-layout style="padding: 0 24px 24px">
          <a-breadcrumb style="margin: 16px 0">
          </a-breadcrumb>
          <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
          >
            <router-view/>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </template>
  <script setup lang="ts">
  import headerView from './common/HeaderView.vue'
  import silderView from './common/SilderView.vue'
  </script>
  <style>
  #components-layout-demo-top-side-2 .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }
  
  .ant-row-rtl #components-layout-demo-top-side-2 .logo {
    float: right;
    margin: 16px 0 16px 24px;
  }
  
  .site-layout-background {
    background: #fff;
  }
  </style>