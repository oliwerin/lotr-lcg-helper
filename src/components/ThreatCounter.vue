<template>
  <div class="threat-counter">
    <PlayerName
      :nameSetter="nameSetter" 
      :name="player.name"
      :number="player.number"
      :isFirst="isFirst"
      :isLast="isLast"/>
    <ScrollControls
      :leftBtnClickHandler="decreaseThreatLevel"
      :rightBtnClickHandler="increaseThreatLevel"
      :value="player.threat"/>
    <button
      v-show="!isFirst" 
      class="btn btn-make-first"
      @click.prevent="makeFirst(player.number)">Make First</button>
  </div>
</template>

<script>
import PlayerName from './PlayerName.vue';
import ScrollControls from './ScrollControls.vue';

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
    isFirst: {
      type: Boolean,
      required: true,
    },
    isLast: {
      type: Boolean,
      required: true,
    },
    makeFirst: {
      type: Function,
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

.btn-make-first {
  @include btn-default-bg(123px);

  font-size: 1.3rem;
}
</style>