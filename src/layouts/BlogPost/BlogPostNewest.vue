<template>
  <section id="newest-blog-posts">
    <h1>NEWEST</h1>
    <template v-if="blogPosts.length">
      <ul>
        <li v-for="blogPost in blogPosts" :key="blogPost.id">{{ blogPost.name }}</li>
      </ul>
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { BlogPost } from '@/store/modules/BlogPostModule';

export default defineComponent({
  name: 'blog-post-newest',
  setup() {
    const store = useStore();
    const blogPosts = ref<Array<BlogPost>>([]);
    onMounted(async () => {
      setTimeout(async () => { // TODO: REMOVE AFTER ADDING LOADER
        await store.dispatch('fetchNewestBlogPosts');
        blogPosts.value = store.getters.getNewestBlogPosts;
        console.log('blog posts', blogPosts.value);
      }, 2000);
    });
    return { blogPosts };
  },
});
</script>
