<template>
  <div class="player-status-wrapper flex-centered-content">
    <div :class="classes"></div>
  </div>
</template>

<script>
import {
  PLAYER_STATUS,
} from '../constants/constants';

export default {
  name: 'PlayerStatus',
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    classes() {
      return {
        'player-status-first': this.status === PLAYER_STATUS.FIRST,
        'player-status-last': this.status === PLAYER_STATUS.LAST,
        'player-status': true,
      };
    },
  },
};
</script>

<style lang="scss">
@import "../sass/mixins";

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