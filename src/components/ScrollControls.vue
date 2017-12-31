<template>
  <div class="scroll-controls flex-row">
    <button 
      class="btn-scroll-controls"
      @click.prevent="leftBtnClickHandler">-</button>
    <p class="scroll-controls-value">{{ value }}</p>
    <button
      class="btn-scroll-controls"
      @click.prevent="rightBtnClickHandler">+</button>
  </div>
</template>

<script>
export default {
  name: 'ScrollControls',
  components: {},
  props: {
    leftBtnClickHandler: {
      type: Function,
      required: true,
    },
    rightBtnClickHandler: {
      type: Function,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "../sass/mixins";

.scroll-controls {
  @include scroll-bg(145px);

  background-size: 100%;
  margin-bottom: 7px;
}

.btn-scroll-controls {
  font-size: 3rem;
  font-weight: bold;
  width: 50px;
  background: transparent;
}

.scroll-controls-value {
  font-size: 4rem;
  font-weight: bold;
}
</style>
