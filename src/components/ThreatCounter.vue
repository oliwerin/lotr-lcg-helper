<template>
  <div :class=classes>
    <PlayerName
      :nameSetter="nameSetter" 
      :name="player.name"
      :number="player.number"
      :status="status"/>
    <ScrollControls
      :leftBtnClickHandler="decreaseThreatLevel"
      :rightBtnClickHandler="increaseThreatLevel"
      :value="player.threat"/>
    <button
      v-show="isNotFirst" 
      class="btn btn-make-first"
      @click.prevent="makeFirst(player.number)">Make First</button>
  </div>
</template>

<script>
import PlayerName from './PlayerName.vue';
import ScrollControls from './ScrollControls.vue';
import { PLAYER_STATUS } from '../constants/constants';

export default {
  name: 'ThreatCounter',
  components: {
    PlayerName,
    ScrollControls,
  },
  props: {
    threatLevelSetter: {
      type: Function,
      required: true,
    },
    nameSetter: {
      type: Function,
      required: true,
    },
    player: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    makeFirst: {
      type: Function,
      required: true,
    },
    onePlayerGame: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    increaseThreatLevel() {
      this.$props.threatLevelSetter(this.$props.player.number, 1);
    },
    decreaseThreatLevel() {
      this.$props.threatLevelSetter(this.$props.player.number, -1);
    },
  },
  computed: {
    classes() {
      return {
        'threat-counter': true,
        'threat-counter-one-player': this.onePlayerGame,
      };
    },
    isNotFirst() {
      return this.status !== PLAYER_STATUS.FIRST;
    },
  },
};
</script>

<style lang="scss">
@import "../sass/mixins";

.threat-counter {
  width: 50%;
  min-height: 160px;

  &:first-child {
    margin: auto;
  }
}

.threat-counter-one-player {
  min-height: auto;
}

.btn-make-first {
  @include btn-default-bg(123px);

  font-size: 1.3rem;
}
</style>