<template>
<div>
    <h2 style="text-align: center;">发布新影片</h2>
    <a-steps :current="current" label-placement="vertical" :items="items" />
    <br>
    <br>
    <br>
    <div class="ccInfo">
        <img :src="publish.coverImageUrl" alt="">
        <div class="main">
            <h2>{{publish.movieTitle}}</h2>
            <p>视频数量：{{publish.totalChapters}}</p>
            <h3 class="red">￥{{publish.salePrice}}</h3>
        </div>
    </div>
</div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const items = ref([{ title: '影片基本信息'},{title: '创建影片片段'},{title: '影片审核'}]);

//创建路由对象
const route = useRoute()

//步骤条激活
let current = ref(2)

//获取影片信息
const publish = reactive({
    movieTitle:'',
    salePrice:0,
    totalChapters:0,
    coverImageUrl:'',
})

//初始化
onMounted(()=>{
    if (route.query && route.query.id) {
        axios.get(`/movies/hxxmovies/getMoviesInfo/${route.query.id}`).then((res)=>{
            console.log(res.data.data.courseInfoVo);
            Object.assign(publish,res.data.data.courseInfoVo)
        })
    }
})
</script>

<style lang="css">
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}
.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>
