<template>
  <template v-if="blogPosts.length">
    <div class="container d-flex flex-wrap justify-content-around">
    <BlogPost
        v-for="blogPost in blogPosts"
        :blogPost="blogPost"
        :key="blogPost.id"
      />
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BlogPost from '@/components/BlogPost/BlogPost.vue';

export default defineComponent({
  name: 'blog-posts-collection',
  components: {
    BlogPost,
  },
  props: {
    blogPosts: Array,
  },
});
</script>
