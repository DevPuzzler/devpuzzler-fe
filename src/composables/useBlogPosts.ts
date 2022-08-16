import { useStore } from 'vuex';
import { Actions, Getters, Mutations } from '@/store/enums/StoreEnums';

type loadMoreBlogPostsPerCategoryType = {
  (categoryId: number, limitPosts: number): Promise<void>;
};

export interface useBlogPostsInterface {
  loadMoreBlogPostsPerCategory: loadMoreBlogPostsPerCategoryType,
}
export default function useBlogPosts(): useBlogPostsInterface {
  const store = useStore();

  const loadMoreBlogPostsPerCategory = async (
    categoryId: number, limitPosts: number,
  ): Promise<void> => {
    store.dispatch(
      Actions.FETCH_BLOG_POSTS_FOR_CATEGORY,
      {
        limit: limitPosts,
        categoryId,
        offset: store.getters[Getters.GET_NUMBER_OF_LOADED_POSTS_PER_CATEGORY](categoryId),
      },
    ).then((blogPosts) => {
      console.log('blog posts', blogPosts);
      store.commit(Mutations.PUSH_BLOG_POSTS_TO_CATEGORY, { categoryId, blogPosts, limitPosts });
    });
  };

  return {
    loadMoreBlogPostsPerCategory,
  };
}
