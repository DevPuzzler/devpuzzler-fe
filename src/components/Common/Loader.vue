<template>
  <div class="loader" :class="loaderClasses">
    <p class="text">{{ text }}</p>
    <span class="dot no1"></span>
    <span class="dot no2"></span>
    <span class="dot no3"></span>
    <span class="dot no4"></span>
    <span class="dot no5"></span>
    <span class="dot no6"></span>
    <span class="dot no7"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'loader',
  props: {
    text: { type: String, default: 'Loading' },
    loaderClasses: { type: String, default: '', required: false },
  },
});
</script>

<style scoped lang="scss">

/*
 * Loading Dots
 * Can we use pseudo elements here instead :after?
 */
.loader {
  p.text {
    color: #ccc;
    margin: 0;
    font: .8em verdana;
    text-transform: uppercase;
    letter-spacing: .1em;
  }
  .dot {
    display: inline-block;
    vertical-align: middle;
    width: .6em;
    height: .6em;
    margin: .19em;
    border-radius: .6em;
    animation: loading 1s infinite alternate;
    &.no1 {
      background: #007DB6;
    }

    &.no2 {
      background: #008FB2;
      animation-delay: 0.2s;
    }

    &.no3 {
      background: #009B9E;
      animation-delay: 0.4s;
    }

    &.no4 {
      background: #00A77D;
      animation-delay: 0.6s;
    }

    &.no5 {
      background: #00B247;
      animation-delay: 0.8s;
    }

    &.no6 {
      background: #5AB027;
      animation-delay: 1.0s;
    }

    &.no7 {
      background: #A0B61E;
      animation-delay: 1.2s;
    }
  }
}

@keyframes loading {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
