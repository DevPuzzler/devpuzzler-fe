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
    setNewestBlogPosts(state: State, blogPosts: []): void {
      console.log('in setting', blogPosts);
      state.newestBlogPosts = blogPosts;
    },
  },
  actions: {
    fetchNewestBlogPosts({ commit }: any): void {
      // TODO: fetch data via request
      commit('setNewestBlogPosts', [
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
    getNewestBlogPosts(state: State): Array<any> {
      return state.newestBlogPosts;
    },
  },
};
