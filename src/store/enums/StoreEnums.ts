/* eslint no-shadow: ["error", { "allow": ["Actions", "Mutations", "Getters"] }] */
enum Actions {
  FETCH_BLOG_POSTS_FOR_CATEGORY = 'fetchBlogPostsForCategory',

  // Post Categories
  FETCH_POST_CATEGORIES = 'fetchPostCategories',
}

enum Mutations {
  // Post Categories
  SET_POST_CATEGORIES = 'setPostCategories',
  PUSH_BLOG_POSTS_TO_CATEGORY = 'pushBlogPostsToCategory',
  SET_POST_CATEGORIES_ERROR = 'setPostCategoriesError',
}

enum Getters {
  // Post Categories
  GET_POST_CATEGORIES = 'getPostCategories',
  GET_POST_CATEGORIES_ERROR = 'getPostCategoriesError',
  GET_NUMBER_OF_LOADED_POSTS_PER_CATEGORY = 'getNumberOfLoadedPostsPerCategory',
}

export { Actions, Mutations, Getters };
