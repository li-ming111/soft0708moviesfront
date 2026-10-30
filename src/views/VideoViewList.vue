<template>
    <div>
        <!-- 视频片段 -->
        <ul class="chanpterList">
            <li v-for="chapter in chapterVideoList" :key="chapter.id">
                <p>
                    {{ chapter.chapterName }}
                </p>
                <ul class="chanpterList videoList">
                    <li v-for="video in chapter.children" :key="video.id">
                        <p>{{ video.videoName }}
                            <span class="acts">
                                <a-button type="primary" @click="playVideo(video.videoUrl)">播放视频</a-button>
                            </span>
                        </p>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- 视频播放位置 -->
        <div id="mse"></div>
    </div>
    </template>
    
    <script setup lang='ts'>
     import axios from 'axios';
     import { onMounted, reactive, ref } from 'vue';
     import {useRoute} from 'vue-router'
     import  Player from 'xgplayer';
     import 'xgplayer/dist/index.min.css';
    
     //创建路由对象
     const route = useRoute()
    
    //影片id
    let courseId = ref('')
    
    //片段视频集合
    let chapterVideoList = ref([])
    
    //封装片段数据
    const chapter = reactive({chapterName:'',sort:0,movieId:''})
    
    //初始化加载
    onMounted(()=>{
        console.log('route.query----------->>>',route.query)
        if(route.query && route.query.id){
            //获取影片id
            courseId.value = route.query.id.toString()
            //设置外键值
            chapter.movieId = courseId.value
            //根据影片id获取片段信息
            getChapterVideo()
        }
    })
    //根据影片id查询片段和小节
    const getChapterVideo=()=>{
        axios.get(`/movies/hxxchapter/getChapterVideo/${courseId.value}`).then((res)=>{
           chapterVideoList.value=res.data.data.allChapterVideo
        })
    }

    //播放视频
    const playVideo=(url:string)=>{
        new Player({
            id: 'mse',
            url: url
        })
    }
    
    </script>
    
    <style lang="css">
    .chanpterList{
        position: relative;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .chanpterList li{
        position: relative;
    }
    .chanpterList p{
        float: left;
        font-size: 20px;
        margin: 10px 0;
        padding: 10px;
        height: 70px;
        line-height: 50px;
        width: 100%;
        border: 1px solid #DDD;
    }
    .chanpterList .acts {
        float: right;
        font-size: 14px;
    }
    .videoList{
        padding-left: 50px;
    }
    .videoList p{
        float: left;
        font-size: 14px;
        margin: 10px 0;
        padding: 10px;
        height: 50px;
        line-height: 30px;
        width: 100%;
        border: 1px dotted #DDD;
    }
    </style>
    