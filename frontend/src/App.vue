<template>
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <v-navigation-drawer app color="primary" dark>
      <v-layout class="my-6 mx-4" style="cursor: pointer;" align-center @click="$router.push({path: '/'})">
        <img src="./assets/apeteporica.png" alt="Apeteporica" style="width: 40px; height: 40px; margin-right: 8px">
        <h1 style="font-weight: 800; color:white">APETEPORICA</h1>
      </v-layout>
      <v-list-item @click="$router.push({ path: '/contabilidad' })">
        <v-list-item-avatar>
          <v-icon> mdi-cash-multiple </v-icon>
        </v-list-item-avatar>
        <span>Contabilidad</span>
      </v-list-item>
      <v-list-item @click="$router.push({ path: '/inventario' })">
        <v-list-item-avatar>
          <v-icon> mdi-package-variant-closed </v-icon>
        </v-list-item-avatar>
        <span>Inventario</span>
      </v-list-item>
      <v-list-item @click="$router.push({ path: '/logistica' })">
        <v-list-item-avatar>
          <v-icon> mdi-truck </v-icon>
        </v-list-item-avatar>
        <span>Logistica</span>
      </v-list-item>
      <v-list-item @click="$router.push({ path: '/marketing' })">
        <v-list-item-avatar>
          <v-icon> mdi-label </v-icon>
        </v-list-item-avatar>
        <span>Marketing</span>
      </v-list-item>
      <v-list-item @click="$router.push({ path: '/recursos-humanos' })">
        <v-list-item-avatar>
          <v-icon> mdi-account-multiple </v-icon>
        </v-list-item-avatar>
        <span>Recursos Humanos</span>
      </v-list-item>

    </v-navigation-drawer>
    <v-main>
      <v-toolbar style="position: sticky; top: 0; z-index: 20" color="primary" dark flat>
        <v-btn v-if="$route.name != 'Home'" class="mx-1" icon dark @click="$router.push({path: '/'})">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h2>{{$route.name}}</h2>
      </v-toolbar>
      <router-view class="ma-6"></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  }),
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
};
</script>
