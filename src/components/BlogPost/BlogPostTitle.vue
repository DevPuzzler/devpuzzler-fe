<template>
  <div class="container mt-2 mb-2">
    <div class="row">
      <div class="col">
        <h2 class="text-white title">{{ blogPostTitle }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'blog-post-title',
  props: {
    blogPostTitle: String,
  },
});
</script>
