<template>
  <section id="blogPostsNewest" class="blog-posts short-tips mt-4">
    <template v-if="blogPosts.length && isContentLoaded">
      <BlogPostTitle blogPostTitle="Short Tips" />
      <BlogPostsCollection :blogPosts="blogPosts" />
    </template>
    <Loader v-if="!isContentLoaded" text="Loading Short Tips"/>
  </section>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, computed,
} from 'vue';
import { useStore } from 'vuex';
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
    const isContentLoaded = ref<boolean>(false);
    onMounted(async () => {
      await store.dispatch(Actions.FETCH_SHORT_BLOG_POSTS, 6);
      isContentLoaded.value = true;
    });
    return {
      blogPosts: computed(() => store.getters[Getters.GET_SHORT_BLOG_POSTS]),
      isContentLoaded,
    };
  },
});
</script>
