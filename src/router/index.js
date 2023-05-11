// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeApp.vue')
  },
  {
    path: '/mypage',
    component: () => import('../views/MyPage.vue'),
    requiresAuth: true
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
  routes
})

const store = useStore()

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.getIsAuth) {
    next('/signin')
  } else {
    next()
  }
})

export default router
