<template>
  <div>
    <h2 class="flex-centered-content" @click.prevent="showInput" v-show="!isInputVisible">{{ name }}</h2>
    <input v-show="isInputVisible" type="text" ref="input" maxlength="20"
           placeholder="Type new name">
    <div class="player-status-wrapper flex-centered-content">
      <div class="player-status player-status-first" v-show="isFirst"></div>
      <div class="player-status player-status-last" v-show="isLast && !isFirst"></div>
    </div>
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
    isFirst: {
      type: Boolean,
      required: true,
    },
    isLast: {
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
@import "../sass/mixins";

h2 {
  @include shadow;
  @include player-name-bg(145px);

  margin: auto;
  border-radius: 25px 25px 0 0;
}

.player-status-wrapper {
  @include shadow;

  background-image: url(/assets/svg/icon02.svg);
  background-size: 100%;
  width: 24px;
  height: 24px;
  margin: -7px auto -10px;
  position: relative;
  border-radius: 100%;
}

.player-status {
  width: 14px;
  height: 14px;
  background-size: 100%;
}

.player-status-first {
  background-image: url(/assets/svg/green.svg);
}

.player-status-last {
  background-image: url(/assets/svg/red.svg);
}
</style>