<template>
  <div>
    <h2 class="flex-centered-content" @click.prevent="showInput" v-show="!isInputVisible">{{ name }}</h2>
    <input v-show="isInputVisible" type="text" ref="input" maxlength="20"
           placeholder="Type new name">
    <PlayerStatus :status="status"/>
  </div>
</template>

<script>
import PlayerStatus from './PlayerStatus.vue';

export default {
  name: 'PlayerName',
  components: {
    PlayerStatus,
  },
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
    status: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isInputVisible: false,
      playerStatus: '',
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
</style>