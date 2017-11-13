<template>
  <div>
    <h2 @click="showInput" v-show="!isInputVisible">
      {{ name }}
      <span v-show="isActive">(active)</span>
    </h2>
    <input type="text" v-show="isInputVisible" ref="input" maxlength="20">
  </div>
</template>

<script>
export default {
  name: 'PlayerName',
  props: {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    nameSetter: {
      type: Function,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isInputVisible: false,
    };
  },
  methods: {
    showInput() {
      this.isInputVisible = true;
      this.$nextTick(() => this.$refs.input.focus());
    },

    hideInput() {
      this.isInputVisible = false;
    },
  },
  mounted() {
    const blur = () => {
      const newName = this.$refs.input.value.trim();

      if (newName) {
        this.$props.nameSetter(this.$props.number, newName);
      }

      this.hideInput();
    };

    this.$refs.input.addEventListener('blur', () => blur());
    this.$refs.input.addEventListener('keydown', (event) => {
      // on enter
      if (event.keyCode === 13) {
        blur();
      }
    });
  },
};
</script>

<style lang="scss">
</style>