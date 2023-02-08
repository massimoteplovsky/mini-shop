<script setup lang="ts">
import { toRefs } from "vue";
// Components
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Sidebar from "./Sidebar.vue";

interface ILayoutProps {
  withSidebar?: boolean;
}

const props = withDefaults(defineProps<ILayoutProps>(), {
  withSidebar: true,
});
const { withSidebar } = toRefs(props);
</script>

<template>
  <v-container>
    <Header />
    <v-row>
      <Sidebar v-if="withSidebar" />
      <v-col :md="withSidebar ? 9 : 12">
        <slot />
      </v-col>
    </v-row>
    <Footer />
  </v-container>
</template>
