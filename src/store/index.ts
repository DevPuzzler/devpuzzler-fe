import { createStore } from 'vuex';
import PostCategoryModule from '@/store/modules/PostCategoryModule';
import BlogPostModule from './modules/BlogPostModule';
import ApiModule from './modules/ApiModule';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ApiModule,
    BlogPostModule,
    PostCategoryModule,
  },
});
