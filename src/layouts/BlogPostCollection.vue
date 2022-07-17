<template>
  <section>
    <BlogPostNewest />
    <ShortBlogPosts />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BlogPostNewest from '@/layouts/BlogPost/NewestBlogPosts.vue';
import ShortBlogPosts from '@/layouts/BlogPost/ShortBlogPosts.vue';

export default defineComponent({
  name: 'blog-post-collection',
  components: {
    BlogPostNewest,
    ShortBlogPosts,
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
