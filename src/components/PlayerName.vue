<template>
  <div class="player-name-wrapper">
    <h2 @click.prevent="showInput" v-show="!isInputVisible">
      {{ name }}
      <span v-show="isActive">(active)</span>
    </h2>
    <input v-show="isInputVisible" type="text" ref="input" maxlength="20"
           placeholder="Type player name">
    <button v-show="!isActive && !isInputVisible" class="btn-small"
            @click.prevent="markAsActive(number)">mark as active</button>
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
    markAsActive: {
      type: Function,
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
.player-name-wrapper {
  margin-bottom: 1.5rem;
}
</style>