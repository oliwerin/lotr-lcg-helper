<template>
  <div class="info-bar">
    <img src="/assets/svg/button01.svg" alt=""/>
    <div class="info-bar-content flex-row">
      <div class="status-wrapper flex-row">
        <PlayerStatus status="FIRST"/>
        <p class="status-label">
          <span>First</span>
          <span>Player</span>
        </p>
      </div>
      <div class="status-wrapper flex-row">
        <PlayerStatus status="LAST"/>
        <p class="status-label">
          <span>Last</span>
          <span>Player</span>
        </p>
      </div>
      <ScrollControls
        :leftBtnClickHandler="() => btnClickHandler(-1)"
        :rightBtnClickHandler="() => btnClickHandler(1)"
        value="Group Threat"/>
    </div>
  </div>
</template>

<script>
import PlayerStatus from './PlayerStatus.vue';
import ScrollControls from './ScrollControls.vue';

export default {
  name: 'InfoBar',
  components: {
    PlayerStatus,
    ScrollControls,
  },
  props: {
    btnClickHandler: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "../sass/mixins";
@import "../sass/variables";

.info-bar {
  position: fixed;
  height: 60px;
  width: 100%;
  bottom: 0;
  left: 0;

  img {
    @include shadow;

    top: -5px;
    left: -10%;
    height: 100%;
    width: 120%;
    position: absolute;
    z-index: -1;
  }

  .scroll-controls {
    margin-top: -30px;
  }

  .scroll-controls-value {
    font-size: 1.2rem;
    width: 40px;
  }
}

.info-bar-content {
  background: $grey;
  height: 100%;
  width: 100%;
}

.status-wrapper {
  .player-status-wrapper {
    margin: 0;
  }
}

.status-label {
  margin-left: 10px;
  font-weight: bold;

  span {
    display: block;
  }
}
</style>