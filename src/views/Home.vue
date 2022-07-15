<template>
  <div class="home">
    <Header />
    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import Header from '@/layouts/Header.vue';
import BlogPostCollection from '@/layouts/BlogPostCollection.vue';
import Timeline from '@/layouts/Timeline.vue';
import BlogPost from '@/layouts/BlogPostLayout.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    BlogPostCollection,
  },
  setup() {
    const activeComponent = shallowRef(Timeline);
    return {
      activeComponent,
      Timeline,
      BlogPost,
    };
  },
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}
.slide-enter-to {
  position: absolute;
  right: 0;
}
.slide-enter-from {
  position: absolute;
  right: -100%;
}
.slide-leave-to {
  position: absolute;
  left: -100%;
}
.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>
