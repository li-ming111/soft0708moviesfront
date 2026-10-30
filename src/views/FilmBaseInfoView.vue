<template>
    <div>
        <h2 style="text-align: center;">发布新影片</h2>
        <a-steps :current="current" label-placement="vertical" :items="items" />
        <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="影片标题">
                <a-input v-model:value="formState.movieTitle" placeholder="示例:战争片-长津湖"></a-input>
            </a-form-item>
            <a-form-item label="影片分类">
                <!-- 一级分类 -->
                <a-select
                    ref="select"
                    v-model:value="formState.subjectParentId"
                    style="width: 120px"
                    placeholder="一级分类"
                    @change="subjectLevelOneChanged"
                    :options="subjectOneList.map((item:SelectProps['options'])=>({value:item.id,label:item.title}))">
                </a-select> 
                <!-- 二级分类 -->
                <a-select v-model:value="formState.subjectId" placeholder="二级分类"
                 :options="subjectTwoList.map((item:SelectProps['options'])=>({value:item.id,label:item.title}))">
                </a-select> 
            </a-form-item>
            <!-- 影片主演 -->
            <a-form-item label="影片主演">
                <a-select v-model:value="formState.actorId" placeholder="请选择"
                :options="actorList.map((item:SelectProps['options'])=>({value:item.id,label:item.name}))">
                </a-select>
            </a-form-item>
            
            <a-form-item label="视频总数">
                <a-input-number :min="0" v-model:value="formState.totalChapters" constrols-position="right"
                  placeholder="填写影片视频总数"/>
            </a-form-item>

            <a-form-item label="影片简介">
                <a-textarea v-model:value="formState.description" :rows="4" />
            </a-form-item>

            <a-form-item label="影片海报">
                <a-upload
                    v-model:file-list="fileList"
                    action="http://localhost:8080/upload"
                    list-type="picture"
                    class="upload-list-inline"
                    @change="uploadPic"
                    >
                    <a-button>
                        <upload-outlined></upload-outlined>
                        upload
                    </a-button>
                </a-upload>
            </a-form-item>

            <a-form-item label="影片价格">
                <a-input-number :min="0" v-model:value="formState.salePrice" constrols-position="right"
                  placeholder="免费影片请设置0元"/>
            </a-form-item>

            <a-form-item >
                <a-button type="primary" :disabled="saveBtnDisabled" @click="saveOrUpdate">保存并下一步</a-button>
            </a-form-item>

        </a-form>


    </div>
  </template>
  <script lang="ts" setup>
  import { ref,reactive, onMounted } from 'vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { message, type UploadProps } from 'ant-design-vue';
  import { useRoute,useRouter } from 'vue-router';
  import axios from 'axios';
  import type { SelectProps } from 'ant-design-vue';
  
  //步骤条
  const items = ref([{ title: '影片基本信息'},{title: '创建影片片段'},{title: '影片审核'}]);

  //步骤条激活
  let current = ref(0)

  //创建路由对象
  const route = useRoute()

  //创建路由器对象
  const router = useRouter()

  //创建接口 
  interface FormState {
    id?:number;
    movieTitle:string;
    subjectId:string;
    subjectParentId:string;
    actorId:string;
    totalChapters:number;
    description:string;
    coverImageUrl:string;
    salePrice:number;
  }
  //实体对象
  const formState = reactive<FormState>({
    movieTitle: '',
    subjectId: '',
    subjectParentId:'',
    actorId:'',
    totalChapters:0,
    description:'',
    coverImageUrl:'',
    salePrice:0
  });

  //演员数组
  let actorList = ref([])
  //一级分类
  let subjectOneList = ref([])
  //二级分类
  let subjectTwoList = ref([])

  //设置按钮状态
  let saveBtnDisabled = ref(false)
  //影片id参数
  let moviesId = ref('')

  //初始化
  onMounted(()=>{
    if(route.query && route.query.id){
        moviesId.value=route.query.id
        //调用根据id查询影片
        getInfo()
    }else{
        //初始化所有演员
        getListActor()
        //初始化一级分类数据
        getOneSubject()
    }
  })

  //-------------功能函数编写----------------
  //调用根据id查询影片
  const getInfo=()=>{
    axios.get(`/movies/hxxmovies/getMoviesInfo/${moviesId.value}`).then(res=>{
        //初始化一级分类
        getOneSubject()
        subjectLevelOneChanged(res.data.data.courseInfoVo.subjectParentId)
        //初始化演员
        getListActor()
        //获取影片基本信息
        Object.assign(formState,res.data.data.courseInfoVo)
        //回填图片        
        fileList.value?.push({
            uid: formState.id?.toString() || '-1',
            name: 'image.jpg',
            status: 'done',
            url: formState.coverImageUrl,
        })     
    })
  }

  //点击一级分类显示对应的二级分类
  const subjectLevelOneChanged=(value:string)=>{
    //value表示一级分类id
    axios.get(`/movies/hxxsubject/getSecondSubject/${value}`).then(res=>{
        subjectTwoList.value=res.data.data.items
    })
  }

  //获取一级分类数据
  const getOneSubject=()=>{
        axios.get('/movies/hxxsubject/getFirstSubject').then(res=>{
            subjectOneList.value=res.data.data.items
        })
    }

    //获取所有演员
    const getListActor=()=>{
        axios.get('/movies/hxxactor/list').then(res=>{
            actorList.value=res.data.data.items
        })
    }

    //添加影片
    const addCourse=()=>{
        axios.post('/movies/hxxmovies/addMoviesInfo',formState).then(res=>{
            message.success('影片添加成功')
            console.log('===========>>>',res.data);            
            //返回影片片段页面
            router.push({
                path:'/main/chapter',
                query:{id:res.data.data.moviesId}
            })
        })
    }

    //修改影片
    const updateCourse=()=>{
        axios.put('/movies/hxxmovies/updateMoviesInfo',formState).then(()=>{
            message.success('修改影片成功')
            //返回影片片段页面
            router.push({
                path:'/main/chapter',
                query:{id:formState.id}
            })
        })
    }

    //保存或更新影片信息
    const saveOrUpdate=()=>{
        if(formState.id){
            updateCourse()
        }else{
            addCourse()
        }
    }

  //----------------上传图片-----------------
 const fileList = ref<UploadProps['fileList']>([])
 const uploadPic:UploadProps['onChange']=({file})=>{
    
    if(file.response){ 
      let path = file.response.data.url
      formState.coverImageUrl = 'http://localhost:8080'+path.substring(path.indexOf('/')).toLowerCase()
    }
 }

  </script>
  
  