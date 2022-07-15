<template>
  <section>
    <BlogPostNewest />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BlogPostNewest from '@/layouts/BlogPost/BlogPostNewest.vue';

export default defineComponent({
  name: 'blog-post-collection',
  components: {
    BlogPostNewest,
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
