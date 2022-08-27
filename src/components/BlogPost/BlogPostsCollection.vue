<template>
  <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1 g-4 blog-post">
    <template v-if="blogPosts?.length">
      <BlogPost
        v-for="blogPost in blogPosts"
        :blogPost="blogPost"
        :key="blogPost.id"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BlogPost from '@/components/BlogPost/BlogPostListItem.vue';

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
