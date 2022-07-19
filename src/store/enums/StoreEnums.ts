/* eslint no-shadow: ["error", { "allow": ["Actions", "Mutations", "Getters"] }] */
enum Actions {
  FETCH_NEWEST_BLOG_POSTS = 'fetchNewestBlogPosts',
  FETCH_SHORT_BLOG_POSTS = 'fetchShortBlogPosts',
}

enum Mutations {
  SET_NEWEST_BLOG_POSTS = 'setNewestBlogPosts',
  SET_SHORT_BLOG_POSTS = 'setShortBlogPosts',
}

enum Getters {
  GET_NEWEST_BLOG_POSTS = 'getNewestBlogPosts',
  GET_SHORT_BLOG_POSTS = 'getShortBlogPosts',
}

export { Actions, Mutations, Getters };
