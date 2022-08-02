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
                class="btn btn-danger"
                @click="loadMorePosts(postCategory.id)">
                Load more
              </button>

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
  computed, defineComponent, onMounted,
} from 'vue';
import AnimatedDivider from '@/components/Common/AnimatedDivider.vue';
import BlogPostsCollection from '@/components/BlogPost/BlogPostsCollection.vue';
import { Actions, Getters } from '@/store/enums/StoreEnums';
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

    onMounted(async () => {
      await store.dispatch(Actions.FETCH_POST_CATEGORIES, { limit: 4, limitPosts: 3 });
    });

    const loadMorePosts = (categoryId: number) => {
      console.log('categoryId', categoryId);
    };

    return {
      postCategories: computed(() => store.getters[Getters.GET_POST_CATEGORIES]),
      postCategoriesError: computed(() => store.getters[Getters.GET_POST_CATEGORIES_ERROR]),
      loadMorePosts,
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
