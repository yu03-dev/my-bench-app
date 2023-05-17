// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { computed } from 'vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeApp.vue')
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: () => import('../views/MyPage.vue'),
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
  },
  {
    path: '/:pathMatch(.*)*',
    name: "NotFound",
    component: () => import('../views/NotFound.vue')
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const isAuth = computed(() => {
  return store.getters.getIsAuth
})

router.beforeEach((to, from, next) => {
  if (to.name == 'MyPage' && !isAuth.value) {
    next('/signin')
  } else {
    next()
  }
})

export default router
