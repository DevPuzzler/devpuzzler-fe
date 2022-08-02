import { Actions } from '@/store/enums/StoreEnums';
import axios from 'axios';
import { ApiResponse, GetRequestParameters } from '@/store/modules/ApiModule';

export type BlogPost = {
  id: number,
  name: string,
  excerpt: string,
  categoryId: number,
  content: string
}

export interface BlogPostCollection {
  blogPosts: Array<BlogPost>
}

export interface BlogPostsApiResponse extends ApiResponse {
  data: Array<BlogPost>
}

export interface BlogPostApiResponse extends ApiResponse {
  data: BlogPost
}

export interface GetBlogPostCollectionGetRequestParameters extends GetRequestParameters{
  includeCategory: number,
  categoryId: number,
}

export default {
  state: (): Record<never, never> => ({}),
  mutations: {},
  actions: {
    async [Actions.FETCH_BLOG_POSTS_FOR_CATEGORY]({ commit }: any,
      {
        limit = 6, offset = 0, orderBy = 'created_at', sortOrder = 'desc', includeCategory = 0, categoryId = 1,
      }: GetBlogPostCollectionGetRequestParameters): Promise<Array<BlogPost> | void> {
      console.log('offset', offset);
      return axios.get(
        `${process.env.VUE_APP_API_URL}/api/posts?
        order_by=${orderBy}&
        sort_order=${sortOrder}&
        include_category=${includeCategory}&
        limit=${limit}&
        offset=${offset}&
        category_id=${categoryId}`,
      )
        .then(({ data }) => data)
        .then((blogPostsResponse: BlogPostsApiResponse): Array<BlogPost> => blogPostsResponse.data)
        .catch((response) => {
          console.log('error response new blog posts', response);
        });
    },
  },
  getters: {},
};
