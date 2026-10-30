<template>
    <a-carousel arrows autoplay>
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
          <left-circle-outlined />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <right-circle-outlined />
        </div>
      </template>
      <div v-for="item in data" :key="item">
        <a-image :src="item" alt="" :width="800"/>
      </div>
    </a-carousel>
  </template>
  <script lang="ts" setup>
  import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';
  import pic1 from '@/assets/images/pic1.jpeg';
  import pic2 from '@/assets/images/pic2.webp';
  import pic3 from '@/assets/images/pic3.webp';
  import pic4 from '@/assets/images/pic4.jpg';
  import pic5 from '@/assets/images/pic5.jpg';

  const data = ref([])
  data.value = [pic1, pic2, pic3, pic4, pic5]
  
  
  </script>
  <style scoped>
  /* For demo */
  :deep(.slick-slide) {
    text-align: center;
    height: 460px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }
  
  :deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    transition: ease all 0.3s;
    opacity: 0.3;
    z-index: 1;
  }
  :deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
  }
  :deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #fff;
    opacity: 0.5;
  }
  
  :deep(.slick-slide h3) {
    color: #fff;
  }
  </style>
  