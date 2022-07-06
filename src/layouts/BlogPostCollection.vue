<template>
  <section>
    <h2>The newest shit</h2>
    <Timeline />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Timeline from '@/layouts/Timeline.vue';

export default defineComponent({
  name: 'blog-post-collection',
  components: {
    Timeline,
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
