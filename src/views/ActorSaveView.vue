<template>
   <a-form
     :model="formState"
     name="basic"
     :label-col="{ span: 8 }"
     :wrapper-col="{ span: 16 }"
     autocomplete="off"
     @finish="onFinish"
     @finishFailed="onFinishFailed"
   >
     <a-form-item label="演员名称" :rules="[{ required: true, message: '请输入演员名称!' }]"
     >
       <a-input v-model:value="formState.name" />
     </a-form-item>
 
     <a-form-item label="演员排序">
       <a-input v-model:value="formState.sort" />
     </a-form-item>
 
     <a-form-item label="演员头衔">
      <a-input v-model:value="formState.title" />
     </a-form-item>

     <a-form-item label="演员资历">
      <a-input v-model:value="formState.qualification" />
     </a-form-item>

     <a-form-item label="演员简介">
      <a-input v-model:value="formState.biography" />
     </a-form-item>

     <a-form-item label="演员头像">
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
 
     <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
       <a-button type="primary" html-type="submit">
         {{ formState?.id?'更新':'保存' }}
       </a-button>
     </a-form-item>
   </a-form>
 </template>
 <script lang="ts" setup>
 import axios from 'axios';
import { reactive,onMounted,ref } from 'vue';
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';

 //接口
 interface FormState {
   id?:number
   name: string;
   sort: number;
   title: number;
   biography: string;
   qualification: string;
   avatarUrl:string;
 }
 //数据参数对象
 const formState = reactive<FormState>({
   name:'',
   sort:1,
   title:0,
   biography:'',
   qualification:'',
   avatarUrl:''
 });

 const router = useRouter()
 //----------------上传图片-----------------
 const fileList = ref<UploadProps['fileList']>([])
 const uploadPic:UploadProps['onChange']=({file})=>{
    
    if(file.response){ 
      let path = file.response.data.url
      formState.avatarUrl = 'http://localhost:8080'+path.substring(path.indexOf('/')).toLowerCase()
    }
 }

 //保存
 const saveOk=(actor:FormState)=>{
   axios.post('/movies/hxxactor/save',actor)
   message.success('保存成功')
   router.push('/main/actor')
 }

 //更新
 const updateOk=(actor:FormState)=>{
   axios.put('/movies/hxxactor/update',actor)
   message.success('更新成功')
   router.push('/main/actor')
}

 //保存或更新
 const onFinish = () => {
   if(formState.id){
      updateOk(formState)
   }else{
      saveOk(formState)
   }
 };

 //操作失败
 const onFinishFailed = (errorInfo: any) => {
   console.log('Failed:', errorInfo);
 };

 //获取更新的数据
 onMounted(()=>{
   let actorData = history.state.params
   if(actorData){
      Object.assign(formState,JSON.parse(actorData))
      fileList.value?.push({
        uid: formState.id+'',
        name: 'image.jpg',
        status: 'done',
        url: formState.avatarUrl,
      })
   }
 })


 </script>
 
 