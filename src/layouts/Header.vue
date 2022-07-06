<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col p-3">
          <img src="../assets/logo.png" height="50" width="50" alt="DevPuzzler logo"/>
        </div>
      </div>
    </div>
    <nav class="nav nav-justified pb-2">
      <div class="container">
        <div class="row">
            <ul class="nav justify-content-center offset-2 col-8">
              <li class="nav-item">
                <router-link
                  class="nav-link light-text fw-bold" :to="{name: 'blog-post-collection'}">
                  Home</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link light-text fw-bold" :to="{name: 'blogpost'}">Post</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link light-text fw-bold" :to="{name: 'random'}">Random</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link light-text fw-bold" to="/">Opinionated</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link light-text fw-bold" to="/">Articles</router-link>
              </li>
            </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'header-main',
});

</script>
