import { Actions, Mutations, Getters } from '@/store/enums/StoreEnums';

export interface BlogPost {
  id: number,
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
          excerpt: 'some excerpt some excerpt some excerpt some excerpt',
          content: '<h1>sample 1 content </h1>',
          category_id: 1,
        },
        {
          id: 2,
          name: 'sample second',
          excerpt: 'some excerpt second some excerpt second some excerpt second',
          content: '<h1>sample second content</h1>',
          category_id: 1,
        },
        {
          id: 3,
          name: 'sample third',
          excerpt: 'some excerpt third some excerpt third some excerpt third some excerpt third',
          content: '<h1>sample this content</h1>',
          category_id: 1,
        },
        {
          id: 4,
          name: 'sample fourth',
          excerpt: 'some excerpt fourth some excerpt fourth some excerpt fourth some excerpt fourth some excerpt fourth',
          content: '<h1>sample fourth content</h1>',
          category_id: 1,
        },
        {
          id: 5,
          name: 'sample fifth',
          excerpt: 'some excerpt fifth',
          content: '<h1>sample fifth content</h1>',
          category_id: 1,
        },
        {
          id: 6,
          name: 'sample sixth',
          excerpt: 'some excerpt sixth some excerpt sixth some excerpt sixth some excerpt sixth some excerpt sixth some excerpt sixth',
          content: '<h1>sample sixth content</h1>',
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
