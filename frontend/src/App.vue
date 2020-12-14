<template>
  <v-app>

    <v-navigation-drawer app>
      <div class="display-2 ma-3" style="font-weight: 800">DDSI</div>
      <v-list-item @click="">
        Contabilidad
      </v-list-item>
      <v-list-item @click="">
        Inventario
      </v-list-item>
      <v-list-item @click="">
        Logistica
      </v-list-item>
      <v-list-item @click="">
        Marketing
      </v-list-item>
      <v-list-item @click="">
        Recursos Humanos
      </v-list-item>
      
    </v-navigation-drawer>
    <v-main>
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
};
</script>
