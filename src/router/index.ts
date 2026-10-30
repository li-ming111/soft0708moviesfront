import {createRouter,createWebHistory} from 'vue-router'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {name:"login",path:'/',component:()=>import('../views/LoginView.vue')},
        {name:"main",path:'/main',component:()=>import('../views/MainView.vue'),
           children:[
               {name:"movie",path:'movie',component:()=>import('../views/common/MovieView.vue')},
               {name:"actor",path:'actor',component:()=>import('../views/ActorView.vue')},
               {name:"actorSave",path:'actorSave',component:()=>import('../views/ActorSaveView.vue')},
               {name:"movieSubject",path:'movieSubject',component:()=>import('../views/MovieSubjectView.vue')},
               {name:"movieSubjectSave",path:'movieSubjectSave',component:()=>import('../views/MovieSubjectSaveView.vue')},
               {name:"filmList",path:'filmList',component:()=>import('../views/FilmListView.vue')},
               {name:"filmBaseInfo",path:'filmBaseInfo',component:()=>import('../views/FilmBaseInfoView.vue')},
               {name:"chapter",path:'chapter',component:()=>import('../views/FilmChapterView.vue')},
               {name:"publish",path:'publish',component:()=>import('../views/PublishView.vue')},
               {name:"videoPlayer",path:'videoPlayer',component:()=>import('../views/MovieVideoPlayer.vue')},
               {name:"videoList",path:'videoList',component:()=>import('../views/VideoViewList.vue')},
           ]
        },
    ]
})
//导出
export default router