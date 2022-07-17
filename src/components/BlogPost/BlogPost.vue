<template>
      <div class="card post d-flex flex-column bg-transparent col-12 col-sm-6 col-md-4 mb-2">
        <div class="card-body bg-light pt-0 pe-0 ps-0 pb-3 text-white bg-transparent">
          <div class="card-front text-white text-center position-absolute w-100 h-100">
            <img class="card-img-top mb-2" src="https://via.placeholder.com/150" :alt="blogPost.name" />
            <h3 class="card-title ps-3 pe-3">{{ blogPost.name }}</h3>
          </div>
          <div class="card-back text-start text-center position-absolute w-100 h-100">
            <img class="card-img-top mb-2" src="https://via.placeholder.com/150" :alt="blogPost.name" />
            <p class="card-text ps-3 pe-3">{{ blogPost.excerpt }}</p>
          </div>
        </div>
      </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'blog-post',
  props: {
    blogPost: Object,
  },
});
</script>
