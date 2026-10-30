<template>
<div>
    <h2 style="text-align: center;">发布新影片</h2>
    <a-steps :current="current" label-placement="vertical" :items="items" />
    <br>
    <br>
    <br>
    <a-button type="primary" @click="openChapterDialog">添加视频片段</a-button>
    <!-- 视频片段 -->
    <ul class="chanpterList">
        <li v-for="chapter in chapterVideoList" :key="chapter.id">
            <p>
                {{ chapter.chapterName }}
                <span class="acts">
                    <a-button type="text" @click="openVideo(chapter.id)">添加视频小节</a-button>
                    <a-button type="text" @click="openEditChapter(chapter)">编辑片段</a-button>
                    <a-popconfirm
                        title="是否删除?"
                        ok-text="删除"
                        cancel-text="取消"
                        @confirm="removeChapter(chapter.id)"
                        @cancel="cancelChapter"
                    >
                    <a href="#">删除片段</a>
                    </a-popconfirm>
                </span>
            </p>
            <ul class="chanpterList videoList">
                <li v-for="video in chapter.children" :key="video.id">
                    <p>{{ video.videoName }}
                        <span class="acts">
                            <a-popconfirm
                                title="是否删除?"
                                ok-text="删除"
                                cancel-text="取消"
                                @confirm="removeVideo(video.id)"
                                @cancel="cancelVideo"
                            >
                            <a-button type="primary" danger>删除视频</a-button>
                            </a-popconfirm>
                        </span>
                    </p>
                </li>
            </ul>
        </li>
    </ul>
    <div>
        <a-button @click="previous">上一步</a-button>
        <a-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</a-button>
    </div>
    <!-- 添加或修改视频片段弹出窗体 -->
    <a-modal v-model:open="open" title="视频片段" @ok="saveOrUpdate" cancelText="取消" okText="确定">
        <a-form :model="chapter" label-width="120px">
            <a-form-item label="片段标题">
                <a-input v-model:value="chapter.chapterName"/>
            </a-form-item>
            <a-form-item label="片段排序">
                <a-input-number v-model:value="chapter.sort" :min="0" controls-position="right"/>
            </a-form-item>
        </a-form>
    </a-modal>
    <!-- 添加和修改视频表单 -->
    <a-modal v-model:open="videoOpen" title="视频小节" @ok="saveOrUpdateVideo" cancelText="取消" okText="确定">
        
        <a-form :model="video" label-width="120px">
            <a-form-item label="视频标题">
                <a-input v-model:value="video.videoName"/>
            </a-form-item>
            <a-form-item label="视频排序">
                <a-input-number v-model:value="video.sort" :min="0" controls-position="right"/>
            </a-form-item>
            <a-form-item label="是否免费">
                <a-radio-group v-model:value="video.isFree">
                    <a-radio :value="true">免费</a-radio>
                    <a-radio :value="false">收费</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="视频上传">
                <a-upload
                    v-model:file-list="fileList"
                    action="http://localhost:8080/upload"
                    list-type="picture"
                    class="upload-list-inline"
                    @change="uploadPic">
                    <a-button type="primary">
                        <upload-outlined ></upload-outlined>
                        上 传
                    </a-button>
                </a-upload>
            </a-form-item> 
        </a-form>
    </a-modal>
</div>
</template>

<script setup lang='ts'>
 import axios from 'axios';
 import { onMounted, reactive, ref } from 'vue';
 import {useRoute,useRouter} from 'vue-router'
 import { UploadOutlined } from '@ant-design/icons-vue';
 import { message, type UploadProps } from 'ant-design-vue';

 const items = ref([{ title: '影片基本信息'},{title: '创建影片片段'},{title: '影片审核'}]);

 //步骤条激活
 let current = ref(1)

 //创建路由对象
 const route = useRoute()

 //创建路由器对象
 const router = useRouter()

 //模态窗体
 const open = ref<boolean>(false);

//创建参数
let saveBtnDisabled = ref(false)

//影片id
let courseId = ref('')

//片段视频集合
let chapterVideoList = ref([])

//封装片段数据
const chapter = reactive({chapterName:'',sort:0,movieId:''})

//视频
const video = reactive({videoName:'',sort:0,isFree:true,videoUrl:'',chapterId:''})

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
//--------------------操作------------------------
//删除小节
const removeVideo=(id:number)=>{
    axios.delete(`/movies/hxxvideo/deleteVideoInfo/${id}`).then(()=>{
        message.success('删除小节成功')
        //重新加载视频
        getChapterVideo()
    })
}

const cancelVideo=()=>{

}

const videoOpen = ref<boolean>(false);

//添加小节弹框
const openVideo=(chapterId:string)=>{
    console.log(chapterId)
    video.chapterId=chapterId
    videoOpen.value=true
}

//添加小节
const addVideo=()=>{
    axios.post('/movies/hxxvideo/addVideoInfo',video).then(()=>{
        videoOpen.value=false
        message.success('添加小节成功')
        //重新加载视频
        getChapterVideo()
    })
}

//保存或更新小节
const saveOrUpdateVideo=()=>{
    addVideo()
}
const fileList = ref<UploadProps['fileList']>([])
 const uploadPic:UploadProps['onChange']=({file})=>{
    
    if(file.response){ 
      let path = file.response.data.url
      video.videoUrl = 'http://localhost:8080'+path.substring(path.indexOf('/')).toLowerCase()
    }
 }

//----------------视频片段-------------------------
//删除片段
const removeChapter=(chapterId:string)=>{
    axios.delete(`/movies/hxxchapter/deleteChapter/${chapterId}`).then(()=>{
        message.success('视频片段删除成功')
        //重新加载片段
        getChapterVideo()
    })   
}

const cancelChapter=()=>{
    message.info('取消删除')
}

//更新片段信息-回显
const openEditChapter=(item:any)=>{
    Object.assign(chapter,item)
    //弹框
    open.value=true
}

//弹出片段窗体
const openChapterDialog=()=>{
    open.value=true
    //清空
    chapter.chapterName = ''
    chapter.sort = 0
}

//添加片段信息
const addChapter=()=>{
    //设置影片id到chapter片段中
    chapter.moviesId=courseId.value
    axios.post('/movies/hxxchapter/addChapter',chapter).then(()=>{
        open.value=false
        message.success('添加片段成功')
        //重新加载片段
        getChapterVideo()
    })
}

//修改片段
const updateChapter=()=>{
    axios.put('/movies/hxxchapter/updateChapter',chapter).then(()=>{
        open.value=false
        message.success('修改片段成功')
        //重新加载片段
        getChapterVideo()
    })
}

//保存或更新片段
const saveOrUpdate=()=>{
    if(chapter.id){
        updateChapter()
    }else{
        addChapter()
    }
}

//根据影片id查询片段和小节
const getChapterVideo=()=>{
    axios.get(`/movies/hxxchapter/getChapterVideo/${courseId.value}`).then((res)=>{
       chapterVideoList.value=res.data.data.allChapterVideo
    })
}

//上一步
const previous=()=>{
    router.push({path:'/main/filmBaseInfo',query:{id:courseId.value}})
}

//下一步
const next=()=>{
    router.push({path:'/main/publish',query:{id:courseId.value}})
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
