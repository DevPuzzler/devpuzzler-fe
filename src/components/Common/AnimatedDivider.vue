<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3">
        <b class="divider"></b>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'animated-divider',
});
</script>

<style scoped lang="scss">

$bg: #10111F;
$barSize: 15px;

.divider {
  width: 100%;
  height: 1px;
  display: block;
  position: relative;
  margin-bottom: 0;
  padding: 2em 0;

  &:after,
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 50%;
    left: 0;
  }

  &:before {
    background-size: $barSize;
    z-index: 1;
    background: linear-gradient(
        90deg,
        $bg 0%, $bg 5%,
        transparent 5%, transparent 10%,
        $bg 10%, $bg 15%,
        transparent 15%, transparent 20%,
        $bg 20%, $bg 25%,
        transparent 25%, transparent 30%,
        $bg 30%, $bg 35%,
        transparent 35%, transparent 40%,
        $bg 40%, $bg 45%,
        transparent 45%, transparent 50%,
        $bg 50%, $bg 55%,
        transparent 55%, transparent 60%,
        $bg 60%, $bg 65%,
        transparent 65%, transparent 70%,
        $bg 70%, $bg 75%,
        transparent 75%, transparent 80%,
        $bg 80%, $bg 85%,
        transparent 85%, transparent 90%,
        $bg 90%, $bg 95%,
        transparent 95%, transparent 100%) center;
    background-size: $barSize * 10;
    animation: bar 120s linear infinite;
  }

  &:after {
    transition: opacity 0.3s ease, animation 0.3s ease;
    background-size: 200%;
    background: linear-gradient(
        to right,
        #62efab 5%,
        #F2EA7D 15%,
        #F2EA7D 25%,
        #FF8797 35%,
        #FF8797 45%,
        #e1a4f4 55%,
        #e1a4f4 65%,
        #82fff4 75%,
        #82fff4 85%,
        #62efab 95%) 0;
    animation: bar 15s linear infinite;
  }

  @keyframes bar {
    0% { background-position: 0; }
    100% { background-position: 200%; }
  }

  &:before {
    animation-duration: 20s;
  }
  &:after {
    animation-duration: 2s;
  }

}

</style>
