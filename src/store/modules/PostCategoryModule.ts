import { Actions, Mutations, Getters } from '@/store/enums/StoreEnums';
import axios from 'axios';
import { ApiResponse, GetRequestParameters } from '@/store/modules/ApiModule';
import { BlogPost } from '@/store/modules/BlogPostModule';
import useArrayHelper from '@/composables/helpers/useArrayHelper';
import useObjectHelper from '@/composables/helpers/useObjectHelper';

const { objectKeysCamelCase } = useObjectHelper();
const { objectsArrayKeysCamelCase } = useArrayHelper();

export type PostCategory = {
  id: number,
  name: string,
  description: string,
  createdAt: string,
  blogPosts: Array<BlogPost>,
  hasCategoryMorePosts: boolean,
}

export interface PostCategoriesApiResponse extends ApiResponse {
  data: Array<PostCategory>
}

export interface PostCategoryApiResponse extends ApiResponse {
  data: PostCategory
}

export interface PostCategoryCollectionGetRequestParameters extends GetRequestParameters {
  includePosts: boolean | null,
  limitPosts: number | null
}

export interface PostCategoryState {
  postCategories: Array<PostCategory>,
  error: unknown,
}

export default {
  state: (): PostCategoryState => ({
    postCategories: [],
    error: null,
  }),
  mutations: {
    [Mutations.SET_POST_CATEGORIES](
      state: PostCategoryState,
      { postCategories, limitPosts }: unknown,
    ): void {
      state.postCategories = postCategories.map(
        (postCategory: PostCategory): PostCategory => {
          // eslint-disable-next-line no-param-reassign
          postCategory.hasCategoryMorePosts = postCategory.blogPosts.length === limitPosts;
          return <PostCategory>objectKeysCamelCase(postCategory);
        },
      );
    },
    [Mutations.PUSH_BLOG_POSTS_TO_CATEGORY](
      state: PostCategoryState,
      { categoryId, blogPosts, limitPosts }: unknown,
    ): void {
      const foundPostCategory = state.postCategories
        .find((postCategory: PostCategory) => postCategory.id === categoryId);

      if (foundPostCategory) {
        if (blogPosts.length) {
          // eslint-disable-next-line no-unused-expressions
          foundPostCategory.blogPosts.push(...<BlogPost[]>objectsArrayKeysCamelCase(blogPosts));
        }
        foundPostCategory.hasCategoryMorePosts = blogPosts.length === limitPosts;
      }
    },
    [Mutations.SET_POST_CATEGORIES_ERROR](state: PostCategoryState, error: unknown): void {
      console.log('state error', error);
      state.error = error;
    },
  },
  actions: {
    [Actions.FETCH_POST_CATEGORIES]({ commit }: any,
      {
        limit = 6, offset = 0, orderBy = 'created_at', sortOrder = 'desc', includePosts = true, limitPosts = 3,
      }: PostCategoryCollectionGetRequestParameters): void {
      axios.get(
        `${process.env.VUE_APP_API_URL}/api/posts/categories?
        order_by=${orderBy}&
        sort_order=${sortOrder}&
        limit=${limit}&
        offset=${offset}&
        include_posts=${includePosts ? 1 : 0}&
        limit_posts=${limitPosts}`,
      )
        .then(({ data }) => data)
        .then((postCategoriesResponse: PostCategoriesApiResponse): void => {
          const convertedPostCategories = postCategoriesResponse.data.map(
            (postCategory: PostCategory) => {
              const convertedPostCategory = <PostCategory>objectKeysCamelCase(postCategory);
              convertedPostCategory.blogPosts = <BlogPost[]>objectsArrayKeysCamelCase(
                convertedPostCategory.blogPosts,
              );

              return convertedPostCategory;
            },
          );
          commit(
            Mutations.SET_POST_CATEGORIES,
            { postCategories: convertedPostCategories, limitPosts },
          );
        })
        .catch((response) => {
          console.log('error response short blog posts', response);
          commit(Mutations.SET_POST_CATEGORIES_ERROR, response.data);
        });
    },
  },
  getters: {
    [Getters.GET_POST_CATEGORIES](state: PostCategoryState): Array<PostCategory> {
      return state.postCategories.filter(
        (postCategory: PostCategory) => postCategory.blogPosts?.length,
      );
    },
    [Getters.GET_NUMBER_OF_LOADED_POSTS_PER_CATEGORY]:
      (state: PostCategoryState) => (categoryId: number): number | undefined => state.postCategories
        .find((postCategory) => postCategory.id === categoryId)?.blogPosts.length,
  },
};
