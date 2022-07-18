<template>
  <section id="blogPostsNewest" class="blog-posts newest mt-4">
    <template v-if="blogPosts.length && isContentLoaded">
      <BlogPostTitle blogPostTitle="Newest Posts"/>
      <BlogPostsCollection :blogPosts="blogPosts" />
    </template>
    <Loader v-if="!isContentLoaded" text="Loading Newest Posts"/>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { BlogPost as BlogPostInterface } from '@/store/modules/BlogPostModule';
import { Actions, Getters } from '@/store/enums/StoreEnums';
import BlogPostsCollection from '@/components/BlogPost/BlogPostsCollection.vue';
import BlogPostTitle from '@/components/BlogPost/BlogPostTitle.vue';
import Loader from '@/components/Common/Loader.vue';

export default defineComponent({
  name: 'blog-post-newest',
  components: {
    BlogPostsCollection,
    BlogPostTitle,
    Loader,
  },
  setup() {
    const store = useStore();
    const blogPosts = ref<Array<BlogPostInterface>>([]);
    const isContentLoaded = ref<boolean>(false);
    onMounted(async () => {
      setTimeout(async () => { // TODO: TO BE REMOVED AFTER TESTING
        await store.dispatch(Actions.FETCH_NEWEST_BLOG_POSTS);
        blogPosts.value = store.getters[Getters.GET_NEWEST_BLOG_POSTS];
        isContentLoaded.value = true;
        console.log('blog posts', blogPosts.value);
      }, 4000);
    });
    return { blogPosts, isContentLoaded };
  },
});
</script>
