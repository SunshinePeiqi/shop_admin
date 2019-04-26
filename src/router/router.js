import Vue from 'vue'

// 导入路由
import VueRouter from 'vue-router'

// 引入子组件
import Login from '@/components/login/Login.vue'
import Home from '@/components/home/Home.vue'

// 安装
Vue.use(VueRouter)

// 实例化路由
const router = new VueRouter({
  routes: [
    { path: '/', component: Login },
    { path: '/login', name: 'login', component: Login },
    { path: '/home', name: 'home', component: Home }
  ]
})

// 导航守卫 => 登录拦截
router.beforeEach((to, from, next) => {
  // 1. 判断访问的是不是登录页面
  if (to.path === '/login') {
    next()
  } else {
    // 如果访问的不是登录页面
    // 2. 判断是否已经登录过
    let token = localStorage.getItem('token')

    token ? next() : next('/login')
  }
})

// 导出
export default router
