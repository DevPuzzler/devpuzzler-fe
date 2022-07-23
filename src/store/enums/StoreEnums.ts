/* eslint no-shadow: ["error", { "allow": ["Actions", "Mutations", "Getters"] }] */
enum Actions {
  // Blog Posts
  FETCH_NEWEST_BLOG_POSTS = 'fetchNewestBlogPosts',
  FETCH_SHORT_BLOG_POSTS = 'fetchShortBlogPosts',

  // Post Categories
  FETCH_POST_CATEGORIES = 'fetchPostCategories',
}

enum Mutations {
  // Blog Posts
  SET_NEWEST_BLOG_POSTS = 'setNewestBlogPosts',
  SET_SHORT_BLOG_POSTS = 'setShortBlogPosts',

  // Post Categories
  SET_POST_CATEGORIES = 'setPostCategories',
}

enum Getters {
  // Blog Posts
  GET_NEWEST_BLOG_POSTS = 'getNewestBlogPosts',
  GET_SHORT_BLOG_POSTS = 'getShortBlogPosts',

  // Post Categories
  GET_POST_CATEGORIES = 'getPostCategories',
}

export { Actions, Mutations, Getters };
