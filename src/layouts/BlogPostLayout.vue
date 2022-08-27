<template>
  <main id="blog-post" class="mt-5 text-white font-monospace" role="main">
    <div class="container">
      <section class="row blog-post__title mb-lg-5 mb-md-2">
        <div class="col">
          <h1>##POST TITLE##</h1>
        </div>
      </section>
      ## POST CONTENT ##
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'blog-post-layout',
});
</script>
