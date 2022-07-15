/* eslint no-shadow: ["error", { "allow": ["Actions", "Mutations", "Getters"] }] */
enum Actions {
  FETCH_NEWEST_BLOG_POSTS = 'fetchNewestBlogPosts',
}

enum Mutations {
  SET_NEWEST_BLOG_POSTS = 'setNewestBlogPosts',
}

enum Getters {
  GET_NEWEST_BLOG_POSTS = 'getNewestBlogPosts',
}

export { Actions, Mutations, Getters };
