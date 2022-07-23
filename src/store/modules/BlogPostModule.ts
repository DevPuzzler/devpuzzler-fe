import { Actions, Mutations, Getters } from '@/store/enums/StoreEnums';
import axios from 'axios';
import { ApiResponse, GetRequestParameters } from '@/store/modules/ApiModule';

export interface BlogPost {
  id: number,
  name: string,
  excerpt: string,
  categoryId: number,
  content: string
}

export interface BlogPostsState {
  newestBlogPosts: Array<BlogPost>;
  shortBlogPosts: Array<BlogPost>;
}

export interface BlogPostsApiResponse extends ApiResponse {
  data: Array<BlogPost>
}

export interface BlogPostApiResponse extends ApiResponse {
  data: BlogPost
}

export interface GetBlogPostCollectionGetRequestParameters extends GetRequestParameters{
  includeCategory: boolean,
}

export default {
  state: (): BlogPostsState => ({
    newestBlogPosts: [],
    shortBlogPosts: [],
  }),
  mutations: {
    [Mutations.SET_NEWEST_BLOG_POSTS](state: BlogPostsState, blogPosts: []): void {
      console.log('set new blog posts', blogPosts);
      state.newestBlogPosts = blogPosts;
    },
    [Mutations.SET_SHORT_BLOG_POSTS](state: BlogPostsState, blogPosts: []): void {
      console.log('short blog posts', blogPosts);
      state.shortBlogPosts = blogPosts;
    },
  },
  actions: {
    async [Actions.FETCH_NEWEST_BLOG_POSTS]({ commit }: any,
      {
        limit = 6, offset = 0, orderBy = 'created_at', sortOrder = 'desc', includeCategory = false,
      }: GetBlogPostCollectionGetRequestParameters): Promise<void> {
      return axios.get(`${process.env.VUE_APP_API_URL}/api/posts?orderBy=${orderBy}&sortOrder=${sortOrder}&includeCategory=${includeCategory}&limit=${limit}&offset=${offset}`)
        .then(({ data }) => data)
        .then((blogPostsResponse: BlogPostsApiResponse): void => {
          commit(Mutations.SET_NEWEST_BLOG_POSTS, blogPostsResponse.data);
        })
        .catch((response) => {
          console.log('error response new blog posts', response);
        });
    },
    [Actions.FETCH_SHORT_BLOG_POSTS]({ commit }: any,
      {
        limit = 6, offset = 0, orderBy = 'created_at', sortOrder = 'desc', includeCategory = false,
      }: GetBlogPostCollectionGetRequestParameters): void {
      axios.get(`${process.env.VUE_APP_API_URL}/api/posts?orderBy=${orderBy}&sortOrder=${sortOrder}&includeCategory=${includeCategory}&limit=${limit}&offset=${offset}`)
        .then(({ data }) => data)
        .then((blogPostsResponse: BlogPostsApiResponse): void => {
          commit(Mutations.SET_SHORT_BLOG_POSTS, blogPostsResponse.data);
        })
        .catch((response) => {
          console.log('error response short blog posts', response);
        });
    },
  },
  getters: {
    [Getters.GET_NEWEST_BLOG_POSTS](state: BlogPostsState): Array<BlogPost> {
      return state.newestBlogPosts;
    },
    [Getters.GET_SHORT_BLOG_POSTS](state: BlogPostsState): Array<BlogPost> {
      return state.shortBlogPosts;
    },
  },
};
