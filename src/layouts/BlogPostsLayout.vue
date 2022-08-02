<template>
  <main id="blogPosts">

    <template v-if="postCategoriesError">
      <div class="container mt-5">
        <div class="row">
          <div class="col-6 offset-3">
            <div class="card text-center bg-danger text-white">
              <div class="card-body">
                <h2>
                  Unfortunately, error occurred while fetching posts... <br />
                  Please, try refreshing page.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <template v-if="postCategories.length">
        <template v-for="postCategory in postCategories" :key="postCategory.id">
            <section id="shortBlogPosts" class="blog-posts short mt-4">

              <h1>{{ postCategory.name }}</h1>

              <BlogPostsCollection
                v-if="postCategory.blogPosts?.length"
                :blogPosts="postCategory.blogPosts"
              />

              <button
                v-if="!isLoadingMorePosts"
                class="btn btn-danger"
                @click="loadMorePosts(postCategory.id)">
                Load more
              </button>
              <Loader v-else text="Loading more posts..." />

              <AnimatedDivider />

            </section>
        </template>
      </template>
      <template v-else>
        <Loader text="Loading posts" loaderClasses="mt-5"/>
      </template>
    </template>

  </main>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, ref,
} from 'vue';
import AnimatedDivider from '@/components/Common/AnimatedDivider.vue';
import BlogPostsCollection from '@/components/BlogPost/BlogPostsCollection.vue';
import { Actions, Getters, Mutations } from '@/store/enums/StoreEnums';
import { useStore } from 'vuex';
import Loader from '@/components/Common/Loader.vue';

export default defineComponent({
  name: 'blog-post-collection',
  components: {
    Loader,
    AnimatedDivider,
    BlogPostsCollection,
  },
  setup() {
    const store = useStore();
    const isLoadingMorePosts = ref<boolean>(false);

    onMounted(async () => {
      if (!store.getters[Getters.GET_POST_CATEGORIES].length) {
        await store.dispatch(Actions.FETCH_POST_CATEGORIES, { limit: 4, limitPosts: 3 });
      }
    });

    const loadMorePosts = async (categoryId: number) => {
      isLoadingMorePosts.value = true;
      const blogPosts = await store.dispatch(
        Actions.FETCH_BLOG_POSTS_FOR_CATEGORY,
        {
          limit: 6,
          categoryId,
          offset: store.getters[Getters.GET_NUMBER_OF_LOADED_POSTS_PER_CATEGORY](categoryId),
        },
      );
      store.commit(Mutations.PUSH_BLOG_POSTS_TO_CATEGORY, { categoryId, blogPosts });
      isLoadingMorePosts.value = false;
    };

    return {
      postCategories: computed(() => store.getters[Getters.GET_POST_CATEGORIES]),
      postCategoriesError: computed(() => store.getters[Getters.GET_POST_CATEGORIES_ERROR]),
      loadMorePosts,
      isLoadingMorePosts,
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
