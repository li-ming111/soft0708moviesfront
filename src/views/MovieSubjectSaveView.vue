<template>
<div>
    <a-space>
        <h2>信息描述</h2>
        <a-tag color="#2db7f5"><h3>Excel模板说明</h3></a-tag>
        <a-tag color="processing" >
           <a :href="download" target="_blank"><h3><DownloadOutlined />模板下载</h3></a> 
        </a-tag>
    </a-space>
    <br>
    <a-space>
        <h2>选择Excel</h2>
        <a-tag color="#2db7f5"><h3>选取文件</h3></a-tag>
        <a-tag color="processing" >
            <a-upload
            name="file"
            action="http://localhost:8080/movies/hxxsubject/addSubject"
            @change="handleChange"
            :beforeUpload="beforeUpload"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              上传影片分类
            </a-button>
          </a-upload>
        </a-tag>
    </a-space>
    
</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';

//下载的图片参数
const download = ref('/excel.jpg')

//检查文件类型
const beforeUpload = (file: UploadProps) => {
    let sufix = file.name
    sufix = sufix?.slice(sufix.lastIndexOf('.')+1)
    if(sufix==='xlsx') return true
    message.error(`文件上传失败`);
    return false;
};

//上传
const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    console.log('正在上传...');
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} 文件上传成功`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 文件上传失败`);
  }
};


</script>

<style lang="css">

</style>
