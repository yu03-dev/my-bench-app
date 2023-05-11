// Composables
import { createRouter, createWebHistory } from 'vue-router'
import MyPage from '../views/MyPage.vue'
import store from '../store'

const routes = [
  {
    path: '/mypage',
    component: MyPage,
    beforeEnter: (to, from, next) => {
      if(store.getters.getIsAuth) {
        next()
      } else {
        next('/signin')
      }
    }
    
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomeApp.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  store
})

export default router
