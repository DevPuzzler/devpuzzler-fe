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
  blogPosts: Array<BlogPost>
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
    [Mutations.SET_POST_CATEGORIES](state: PostCategoryState, postCategories: []): void {
      console.log('setpostcategories', postCategories);
      state.postCategories = postCategories.map(
        (postCategory: PostCategory): PostCategory => <PostCategory>objectKeysCamelCase(
          postCategory,
        ),
      );
    },
    [Mutations.SET_POST_CATEGORIES_ERROR](state: PostCategoryState, error: unknown): void {
      console.log('state error', error);
      state.error = error;
    },
  },
  actions: {
    [Actions.FETCH_POST_CATEGORIES]({ commit }: any,
      {
        limit = 6, offset = 0, orderBy = 'created_at', sortOrder = 'desc', includePosts = true, limitPosts,
      }: PostCategoryCollectionGetRequestParameters): void {
      axios.get(
        `${process.env.VUE_APP_API_URL}/api/posts/categories?
        orderBy=${orderBy}&
        sortOrder=${sortOrder}&
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
          console.log('convertedPostCategories', convertedPostCategories);
          commit(Mutations.SET_POST_CATEGORIES, convertedPostCategories);
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
  },
};
