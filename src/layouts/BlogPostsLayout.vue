<template>
  <main id="blogPosts">

    <template v-if="newestBlogPostsLoaded">
      <section id="newestBlogPosts" class="blog-posts newest mt-4">
        <BlogPostTitle blogPostTitle="Newest Posts"/>
        <BlogPostsCollection :blogPosts="newestBlogPosts" />
      </section>

      <AnimatedDivider />

    </template>
    <Loader v-else text="Loading newest posts..." loaderClasses="mt-5"/>

    <template v-if="newestBlogPostsLoaded">
      <template v-if="shortBlogPostsLoaded">
        <section id="shortBlogPosts" class="blog-posts short mt-4">
          <BlogPostTitle blogPostTitle="Short Tips"/>
          <BlogPostsCollection :blogPosts="shortBlogPosts" />
        </section>

        <AnimatedDivider />

      </template>
      <Loader v-else text="Loading short tips..." loaderClasses="mt-5" />
    </template>

  </main>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, ref,
} from 'vue';
import AnimatedDivider from '@/components/Common/AnimatedDivider.vue';
import BlogPostsCollection from '@/components/BlogPost/BlogPostsCollection.vue';
import BlogPostTitle from '@/components/BlogPost/BlogPostTitle.vue';
import { Actions, Getters } from '@/store/enums/StoreEnums';
import { useStore } from 'vuex';
import Loader from '@/components/Common/Loader.vue';

export default defineComponent({
  name: 'blog-post-collection',
  components: {
    Loader,
    AnimatedDivider,
    BlogPostsCollection,
    BlogPostTitle,
  },
  setup() {
    const store = useStore();
    const isNewestBlogPostsLoading = ref<boolean>(false);
    const newestBlogPostsLoaded = ref<boolean>(false);
    const shortBlogPostsLoaded = ref<boolean>(false);

    onMounted(async () => {
      await store.dispatch(Actions.FETCH_NEWEST_BLOG_POSTS, {});
      newestBlogPostsLoaded.value = true;

      setTimeout(async () => {
        await store.dispatch(Actions.FETCH_SHORT_BLOG_POSTS, {});
        shortBlogPostsLoaded.value = true;
      }, 1000);
    });
    return {
      isNewestBlogPostsLoading,
      newestBlogPostsLoaded,
      shortBlogPostsLoaded,
      newestBlogPosts: computed(() => store.getters[Getters.GET_NEWEST_BLOG_POSTS]),
      shortBlogPosts: computed(() => store.getters[Getters.GET_SHORT_BLOG_POSTS]),
    };
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
