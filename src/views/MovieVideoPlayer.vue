<template>
    <div>
        <h2>影片列表</h2>
        <a-form layout="inline">
        <a-form-item label="影片名称">
          <a-input v-model:value="formState.movieTitle" />
        </a-form-item>
    
        <a-form-item label="影片状态">
            <a-select
                ref="select"
                v-model:value="formState.status"
                style="width: 120px"
                allowClear="true">
                <a-select-option value="Normal">已发布</a-select-option>
                <a-select-option value="Draft">未发布</a-select-option>
            </a-select>
        </a-form-item>
        <a-space>
          <a-button type="primary" @click="showData()">查询</a-button>
          <a-button >取消</a-button>
        </a-space>
      </a-form>
    
      <!-- 数据表格 -->
      <a-table :columns="columns" :data-source="data" :pagination="pagination" @change="onChange">
        <template #bodyCell="{ column, record }">
           <template v-if="column.dataIndex === 'action'">
            <a-space>
                <a-button type="primary" @click="moviesChapter(record.id)">影片片段信息</a-button>
            </a-space>
           </template>
         </template>
     </a-table>
    </div>
    </template>
    
    <script setup lang='ts'>
    import { reactive } from 'vue';
    import axios from 'axios';
    import {onMounted,ref} from 'vue'
    import router from '../router';
    
    const columns = [
       {
          title: '影片名称',
         dataIndex: 'movieTitle',
         key: 'movieTitle',
       },
       {
         title: '影片状态',
         dataIndex: 'status',
         key: 'status',
       },
       {
         title: '视频数量',
         dataIndex: 'totalChapters',
         key: 'totalChapters',
       },
       {
         title: '创建时间',
         key: 'gmtCreate',
         dataIndex: 'gmtCreate',
       },
       {
         title: '浏览数量',
         key: 'views',
         dataIndex: 'views',
       },
       {
         title: '操作',
         key: 'action',
         dataIndex: 'action',
       },
     ];
    
    interface FormState {
      movieTitle: string;
      status: string;
    }
    
    const formState = reactive<FormState>({
        movieTitle: '',
        status: '',
    });

    //返回影片片段页面
   const moviesChapter=(id:string)=>{        
        router.push({path:'/main/videoList',query:{id:id}})
   }
    
    //数据源参数
    const data = ref([])
    
    //-----------分页------------------------------
    const pagination = ref({
            total:0,
            current:1,
            pageSize:5,
            showr:true,
            pageSizeOptions:['5','4','6'],
            showQuickJumper:true,
            showSizeChanger:true,
            onShowSizeChange:pageSizeChange,
            onChange:pageChange,
         })
    
         //页码变化
         function pageSizeChange(current:number,pageSize:number){
            pagination.value.current = current
            pagination.value.pageSize = pageSize
         }
         //点击下一页
         function pageChange(page:number, pageSize:number){
           pagination.value.current = page
           pagination.value.pageSize = pageSize
         }
         
         //当前页码变化
         const onChange = (pagination:any) => {
            
          showData({
            page:pagination.current,
            size:pagination.pageSize
          })
        };
    
       //加载数据
       const showData=(param?:any)=>{
          //判断参数
          if(!param){
                param={
                    page:1,
                    size:pagination.value.pageSize
            }
          }
          //执行
          axios({
            method:'get',
            url:`/movies/hxxmovies/pageMoviesByCondition`,
            params:{current:param.page,size:param.size,title:formState.movieTitle},
          }).then(res=>{
            let r = res.data;
            console.log('-------r-------->>',res.data);
            pagination.value.total = r.data.total
            data.value = r.data.rows
            
          })
       }
    
       //页面加载执行
       onMounted(()=>{
         showData(null)
       })
    </script>
    
    <style lang="css">
    
    </style>
    