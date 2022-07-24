import { Actions, Mutations, Getters } from '@/store/enums/StoreEnums';
import axios from 'axios';
import { ApiResponse, GetRequestParameters } from '@/store/modules/ApiModule';
import { BlogPost } from '@/store/modules/BlogPostModule';

export interface PostCategory {
  id: number,
  name: string,
  description: string,
  createdAt: string,
  blog_posts: Array<BlogPost>
}

export interface PostCategoriesApiResponse extends ApiResponse {
  data: Array<PostCategory>
}

export interface PostCategoryApiResponse extends ApiResponse {
  data: PostCategory
}

export interface PostCategoryCollectionGetRequestParameters extends GetRequestParameters {
  includePosts: boolean,
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
      state.postCategories = postCategories;
    },
    [Mutations.SET_POST_CATEGORIES_ERROR](state: PostCategoryState, error: unknown): void {
      console.log('state error', error);
      state.error = error;
    },
  },
  actions: {
    [Actions.FETCH_POST_CATEGORIES]({ commit }: any,
      {
        limit = 6, offset = 0, orderBy = 'created_at', sortOrder = 'desc', includePosts = true,
      }: PostCategoryCollectionGetRequestParameters): void {
      axios.get(`${process.env.VUE_APP_API_URL}/api/posts/categories?orderBy=${orderBy}&sortOrder=${sortOrder}&limit=${limit}&offset=${offset}&include_posts=${includePosts ? 1 : 0}`)
        .then(({ data }) => data)
        .then((postCategoriesResponse: PostCategoriesApiResponse): void => {
          console.log('blogPostsResponse.data', postCategoriesResponse.data);
          commit(Mutations.SET_POST_CATEGORIES, postCategoriesResponse.data);
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
        (postCategory: PostCategory) => postCategory.blog_posts?.length
      );
    },
  },
};
