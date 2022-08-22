import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/views/Home.vue'
// const Edit = () => import('@/views/Edit.vue')
// const Cart = () => import('@/views/Cart.vue')
// const Admin = () => import('@/views/Admin.vue')
// const Profile = () => import('@/views/Profile.vue')
// const Videokards = () => import('@/views/Videokards.vue')
// const adminVideo = () => import('@/views/AdminProducts.vue')
// const Login = () => import('@/components/LoginNew.vue')
// const Reset = () => import('@/components/Reset.vue')
// const Shipment = () => import('@/views/Shipment.vue')
import firebase from 'firebase/app'
import 'firebase/auth'
import '@//firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/products/:category',
    name: 'CategoryPage',
    component: () => import('@/views/CategoryPage.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/Auth.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { authAdmin: true },
    component: () => import('@/views/Admin.vue'),
  },
  {
    path: '/admin/products/:category',
    name: 'AdminProducts',
    meta: { authAdmin: true },
    component: () => import('@/views/Admin.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { auth: true },
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: { auth: true },
    component: () => import('@/views/About.vue'),
  },

  // {
  //   path: '/edit/:category/:id',
  //   name: 'Edit',
  //   meta: { authAdmin: true },
  //   component: Edit
  // },
  // {
  //   path: '/shipment/:category/:id',
  //   name: 'Shipment',
  //   meta: { authAdmin: true },
  //   component: Shipment
  // },
  // {
  //   path: '/product/:id',
  //   name: 'videokards',
  //   component: Videokards
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // },
  // {
  //   path: '/cart',
  //   name: 'Cart',
  //   component: Cart
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('@/views/About')
  // },
  // {
  //   path: '/reset',
  //   name: 'Reset',
  //   component: Reset
  // },
  // {
  //   path: '/contacts',
  //   name: 'Contacts',
  //   component: () => import('@/components/Contacts')
  // },
  // {
  //   path: '/delivery',
  //   name: 'Delivery',
  //   component: () => import('@/components/Delivery')
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: '404',
  //   component: () => import('@/components/404')
  // },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   meta: { auth: true },
  //   component: Profile
  // },
  // {
  //   path: '/cart/order',
  //   name: 'Order',
  //   component: () => import('@/components/CartOrder')
  // },
  // {
  //   path: '/product/:category/:id',
  //   name: 'ProductPage',
  //   component: () => import('@/views/ProductPage')
  // },
  // {
  //   path: '/admin',
  //   name: 'Admin',
  //   meta: { authAdmin: true },
  //   component: Admin
  // },
  // {
  //   path: '/admin/:id',
  //   name: 'adminVideo',
  //   meta: { authAdmin: true },
  //   component: adminVideo
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.auth)
  if (requireAuth && !(await firebase.getCurrentUser())) {
    next('/')
  } else {
    next()
  }
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.authAdmin)
  let curUser = await firebase.getCurrentUser()

  if (requireAuth && curUser.email != 'admin@admin.admin') {
    next('/')
  } else {
    next()
  }
})

export default router
