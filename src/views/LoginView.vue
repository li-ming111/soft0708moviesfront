<template>
    <div>
       <a-row class="login">
          <a-col :span="8" :offset="8" class="login-main">
            <h1 style="text-align:center">
              <VideoCameraOutlined style="color:blue"/>&nbsp;在线影院系统
            </h1>
            <a-form :model="loginForm" name="basic" autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed">
                 <a-form-item label="" name="mobile" :rules="[{required:true,message:'请输入手机号'}]">
                    <a-input v-model:value="loginForm.mobile" plcaeholder="手机号码"></a-input>
                 </a-form-item>
                 <a-form-item label="" name="code" :rules="[{required:true,message:'请输入验证码'}]">
                  <a-input v-model:value="loginForm.code">
                    <template #addonAfter>
                      <a @click="sendCode">获取验证码</a>
                    </template>
                  </a-input>
               </a-form-item>
               <a-form-item>
                <a-button type="primary" block html-type="submit">登录</a-button>
             </a-form-item>
            </a-form>
          </a-col>
       </a-row>
    </div>
    </template>
    
    <script setup lang="ts">
    import router from '../router';
    import { notification } from 'ant-design-vue';
    import axios from 'axios';
    import { reactive } from 'vue';

    const loginForm = reactive({
      mobile: '13936439780',
      code: '',
    });

    const sendCode=()=>{
      axios.get('/user/send').then(res=>{
        let data = res.data
        console.log(data.data.msg)
        if(data){
          notification['success']({message:'发送成功'})
          loginForm.code = data.data.msg
        }else{
          notification['error']({message:data.message})
        }
      })
    }

    const onFinish = (values:any) => {//登录
        axios.get(`/user/login/${values.code}`).then(res=>{
        let data = res.data
        if(data.success){
          notification.success({message:"信息"})
          router.push({path:'/main'})
        }else{
          notification.error({message:data.message})
        }       
        })
    };
    
    const onFinishFailed = (errorInfo:any) => {//登录错误
      console.log('Failed:', errorInfo);
    };
    
    </script>
    
    <style lang="css">
    .login-main h1 {
        font-size: 25px;
        font-weight: bold;
        }
        .login-main {
        margin-top: 100px;
        padding: 30px 30px 20px;
        border: 2px solid grey;
        border-radius: 10px;
        background-color: #fcfcfc;
    }
    </style>
    