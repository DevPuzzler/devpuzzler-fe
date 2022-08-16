<template>
  <footer class="container mt-5 p-4" id="footer">
    <div class="row">
      <div class="col-12 col-md-4 offset-md-4 d-flex flex-column row__icons">
        <div class="row__discover-title mb-3">
          <h4 class="footer-title">Find me here</h4>
        </div>
        <div class="d-flex flex-row align-items-center justify-content-evenly">
          <a href="https://github.com/DevPuzzler">
            <img class="scale-hover" width="48" src="/icons/github.svg" alt="GitHub"/>
          </a>
          <a href="#">
            <img class="scale-hover" width="32" src="/icons/twitter.svg"  alt="Twitter"/>
          </a>
          <a href="#">
            <img class="scale-hover" width="48" src="/icons/yt.svg"  alt="YouTube"/>
          </a>
        </div>
        <div class="mt-4 d-flex justify-content-center">
          <a href="#">
            <img class="scale-hover" width="192" src="/icons/bmc.svg"  alt="BuyMeCoffee"/>
          </a>
        </div>
      </div>
    </div>
    <div class="row mt-md-5 mt-4 text-center">
      <p class="text-white">Copyright © {{ new Date().getFullYear() }} DevPuzzler</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'footer',
  setup() {
    const text = 'Footer!';

    return {
      text,
    };
  },
});
</script>
