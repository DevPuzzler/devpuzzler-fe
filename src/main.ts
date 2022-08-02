import { createApp } from 'vue';
import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/github.css';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'animate.css';
import './assets/scss/app.scss';
import App from './App.vue';
import 'highlight.js/styles/default.css';

createApp(App)
  .use(store)
  .use(router)
  .use(VueHighlightJS)
  .mount('#app');
