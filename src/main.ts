import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
//import { compileString } from 'sass'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import * as Icons from '@ant-design/icons-vue'
//全局组件：分页
import PageView from './views/common/PageView.vue'

const app = createApp(App)
//注册
app.component('PageView',PageView)
//加载
app.use(Antd).use(router).mount('#app')
//图标
const icons:any = Icons
for(const i in icons){
    app.component(i,icons[i])
}


//请求拦截器
axios.interceptors.request.use(config=>{
    return config
},error=>{
    return Promise.reject(error)
})

//响应拦截器
axios.interceptors.response.use(res=>{
    return res
},error=>{
    return Promise.reject(error)
})

//配置后端访问地址
axios.defaults.baseURL=import.meta.env.VITE_APP_BASE_API

//输出环境
console.log('环境',import.meta.env.VITE_ENV)
console.log('服务器',import.meta.env.VITE_APP_BASE_API)