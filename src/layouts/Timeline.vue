<template>
  <div class="timeline container">
    <div class="timeline__card">
      <div class="timeline__card-content-top">
        <h3>Title</h3>
      </div>
      <div class="timeline__card-content-bottom">
        <p>2022-02-02</p>
      </div>
    </div>
    <div class="timeline__card reversed">
      <div class="timeline__card-content-top">
        <h3>Title</h3>
      </div>
      <div class="timeline__card-content-bottom">
        <p>2022-02-02</p>
      </div>
    </div>
    <div class="timeline__card">
      <div class="timeline__card-content-top">
        <h3>Title</h3>
      </div>
      <div class="timeline__card-content-bottom">
        <p>2022-02-02</p>
      </div>
    </div>
    <div class="timeline__card">
      <div class="timeline__card-content-top">
        <h3>Title</h3>
      </div>
      <div class="timeline__card-content-bottom">
        <p>2022-02-02</p>
      </div>
    </div>
    <div class="timeline__card">
      <div class="timeline__card-content-top">
        <h3>Title</h3>
      </div>
      <div class="timeline__card-content-bottom">
        <p>2022-02-02</p>
      </div>
    </div>
    <div class="timeline__card">
      <div class="timeline__card-content-top">
        <h3>Title</h3>
      </div>
      <div class="timeline__card-content-bottom">
        <p>2022-02-02</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'time-line',
});
</script>

<style scoped lang="scss">

  .timeline {
    margin: auto;
    overflow: scroll;
    position: relative;
    max-height: 500px;
    padding: 40px 10px;
    border-radius: 10px;
    -webkit-box-shadow: 0 0 30px 4px rgba(255,255,255,0.75);
    -moz-box-shadow: 0 0 30px 4px rgba(255,255,255,0.75);
    box-shadow: 0 0 30px 4px rgba(255,255,255,0.75);
    display: flex;
    flex-direction: row;
    p {
      margin: 0;
      padding: 0;
    }
    h3 {
      margin: 0;
      padding: 0;
    }
    &__card {
      min-width: 400px;
      position: relative;
      clip-path: ellipse(60% 100% at 50% 0%);
      display: flex;
      flex-direction: column;
      height: 100px;
      &-content-top {
        height: 50px;
        border-bottom: 1px solid white;
      }
      &-content-bottom {
        height: 50px;
      }
      &.reversed {
        flex-direction: column-reverse;
        .timeline__card-content-top {
          border-top: 1px solid white;
          border-bottom: 0;
          height: 51px;
        }
        .timeline__card-content-top {
          height: 49px;
        }
      }
      .content {
        width: 50%;
        color: rgba(230, 230, 230, 1);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0;
        position: relative;
        //&__text {
        //  display: flex;
        //  flex-direction: column;
        //}
      }
    }
  }
</style>
