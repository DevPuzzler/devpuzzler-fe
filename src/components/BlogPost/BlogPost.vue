<template>
  <div class="col">
    <router-link :to="{ name: 'blogpost' }" class="text-decoration-none">
    <div class="card h-100">
        <div class="card-body text-start">
            <h3 class="card-title">{{ blogPost.title }}</h3>
            <p class="card-text mt-3">{{ blogPost.excerpt }}</p>
        </div>
        <div class="card-footer text-end">
          <small class="text-muted">
            {{ displayDate(blogPost.createdAt) }}
          </small>
        </div>
    </div>
      </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'blog-post',
  props: {
    blogPost: Object,
  },
  setup() {
    const displayDate = (createdAt: Date) => {
      return new Date(createdAt).toISOString().split('T')[0];
    };

    return {
      displayDate,
    };
  },
});
</script>
