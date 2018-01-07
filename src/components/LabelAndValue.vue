<template>
  <div class="label-and-value flex-row">
    <button 
      v-if="labelClickHandler" 
      @click.prevent="labelClickHandler"
      class="btn label">{{label}}</button>
    <p v-if="!labelClickHandler" class="label flex-centered-content">{{label}}</p>
    <p class="value flex-centered-content">{{value}}</p>
  </div>
</template>

<script>
export default {
  name: 'LabelAndValue',
  components: {},
  props: {
    label: {
      type: String,
      required: true,
    },
    labelClickHandler: {
      type: Function,
      required: false,
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
@import "../sass/variables";

.label-and-value {
  width: 165px;
  height: 50px;
  position: relative;
}

.label {
  @include btn-default-bg(150px);
  @include shadow;

  font-size: 1.3rem;
  font-weight: bold;
}

.value {
  @include shadow;

  position: absolute;
  background-image: url(/assets/svg/icon01.svg);
  background-size: 100%;
  border-radius: 100%;
  height: 50px;
  width: 50px;
  right: -25px;
  top: 0;
  margin: 0;
  color: $red;
  font-size: 2.5rem;
  font-weight: bold;
}
</style>
