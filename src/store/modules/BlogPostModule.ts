import { Actions, Mutations, Getters } from '@/store/enums/StoreEnums';

export interface BlogPost {
  name: string,
  excerpt: string,
  categoryId: number,
  content: string
}

export interface State {
  newestBlogPosts: Array<BlogPost>;
}

export default {
  state: (): State => ({
    newestBlogPosts: [],
  }),
  mutations: {
    [Mutations.SET_NEWEST_BLOG_POSTS](state: State, blogPosts: []): void {
      state.newestBlogPosts = blogPosts;
    },
  },
  actions: {
    [Actions.FETCH_NEWEST_BLOG_POSTS]({ commit }: any): void {
      // TODO: fetch data via request
      commit(Mutations.SET_NEWEST_BLOG_POSTS, [
        {
          id: 1,
          name: 'sample name',
          excerpt: 'some excerpt',
          content: '<h1>sample 1 content</h1>',
          category_id: 1,
        },
        {
          id: 2,
          name: 'sample second',
          excerpt: 'some excerpt second',
          content: '<h1>sample second content</h1>',
          category_id: 1,
        },
      ]);
    },
  },
  getters: {
    [Getters.GET_NEWEST_BLOG_POSTS](state: State): Array<any> {
      return state.newestBlogPosts;
    },
  },
};
