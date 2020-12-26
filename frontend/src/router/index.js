import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Contabilidad from '../views/Contabilidad.vue'
import Inventario from '../views/Inventario.vue'
import Logistica from '../views/Logistica.vue'
import Marketing from '../views/Marketing.vue'
import Rrhh from '../views/Rrhh.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contabilidad',
    name: 'Contabilidad',
    component: Contabilidad
  },
  {
    path: '/inventario',
    name: 'Inventario',
    component: Inventario
  },
  {
    path: '/logistica',
    name: 'Logistica',
    component: Logistica
  },
  {
    path: '/marketing',
    name: 'Marketing',
    component: Marketing
  },
  {
    path: '/recursos-humanos',
    name: 'RRHH',
    component: Rrhh
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
