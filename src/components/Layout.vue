<script setup lang="ts">
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Sidebar from "./Sidebar.vue";
</script>

<template>
  <v-container>
    <Header />
    <v-row>
      <Sidebar />
      <v-col md="9">
        <slot />
      </v-col>
    </v-row>
    <Footer />
  </v-container>
</template>
