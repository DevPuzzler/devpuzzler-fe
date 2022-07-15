<template>
      <div class="card  col-12 col-sm-6 col-md-4 col-xl-3">
        <div class="card-body">
          <h1>{{ blogPost.name }}</h1>
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
