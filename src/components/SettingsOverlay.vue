<template>
  <div class="settings-overlay">
    <div class="settings-overlay-content">
      <div class="settings-wrapper flex-row">
        <p>Number of Players</p>
        <button class="btn-settings"
          @click.prevent="backToSetPlayers">{{playersNumber}}</button>
      </div>
      <div class="settings-wrapper flex-row">
        <p>Automatic Thret Increase</p>
        <button class="btn-settings"
          @click.prevent="toggleThreatIncrease">{{increaseThreat ? 'on' : 'off'}}</button>
      </div>
      <div v-show="gameStarted" class="settings-wrapper settings-wrapper-btn-only">
        <button class="btn-settings btn-settings-small-font"
          @click.prevent="resetGame">Reset Game State</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsOverlay',
  components: {},
  props: {
    playersNumber: {
      type: Number,
      required: true,
    },
    backToSetPlayers: {
      type: Function,
      required: true,
    },
    resetGame: {
      type: Function,
      required: true,
    },
    increaseThreat: {
      type: Boolean,
      required: true,
    },
    toggleThreatIncrease: {
      type: Function,
      required: true,
    },
    gameStarted: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "../sass/variables";
@import "../sass/mixins";

$overlay-margin-top: 90px;

.settings-overlay {
  height: calc(100% - #{$overlay-margin-top});
  width: 100%;
  background-color: $grey;
  position: fixed;
  top: $overlay-margin-top;
  left: 0;
}

.settings-overlay-content {
  padding: 20px;

  @include respond-to-large() {
    max-width: 40%;
    margin: auto;
  }
}

.settings-wrapper {
  margin-bottom: 20px;

  p {
    font-size: 1.3rem;
  }
}

.settings-wrapper-btn-only {
  display: flex;
  flex-direction: row-reverse;
}

.btn-settings {
  @include btn-default-bg(140px);
}

.btn-settings-small-font {
  font-size: 1.2rem;
}

</style>