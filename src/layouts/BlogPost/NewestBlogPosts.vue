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
import { Actions, Getters } from '@/store/enums/StoreEnums';

export default defineComponent({
  name: 'blog-post-newest',
  setup() {
    const store = useStore();
    const blogPosts = ref<Array<BlogPost>>([]);
    onMounted(async () => {
      setTimeout(async () => { // TODO: REMOVE AFTER ADDING LOADER
        await store.dispatch(Actions.FETCH_NEWEST_BLOG_POSTS);
        blogPosts.value = store.getters[Getters.GET_NEWEST_BLOG_POSTS];
        console.log('blog posts', blogPosts.value);
      }, 2000);
    });
    return { blogPosts };
  },
});
</script>
