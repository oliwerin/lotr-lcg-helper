<template>
  <div class="settings-overlay">
    <div class="settings-overlay-content">
      <div class="settings-wrapper flex-row">
        <p>Number of Players</p>
        <button class="btn-settings"
          @click.prevent="backToSetPlayers">{{playersNumber}}</button>
      </div>
      <div class="settings-wrapper flex-row">
        <p>Automatic Threat Increase</p>
        <button class="btn-settings"
          @click.prevent="toggleThreatIncrease">{{increaseThreat ? 'on' : 'off'}}</button>
      </div>
      <div v-show="gameStarted" class="settings-wrapper settings-wrapper-btn-only">
        <button class="btn-settings btn-settings-small-font"
          @click.prevent="resetGame">Reset Game State</button>
      </div>
      <LabelAndValue label="Final Score" :value='score'/>
      <div class="score-settings-wrapper flex-row">
        <p>Threat Cost of Each Dead Hero</p>
        <ScrollControls
          :value="scoreModifiers.deadHeroesCost"
          :leftBtnClickHandler="() => scoreModifierSetter('DeadHeroesCost', -1)"
          :rightBtnClickHandler="() => scoreModifierSetter('DeadHeroesCost', 1)"/>
      </div>
      <div class="score-settings-wrapper flex-row">
        <p>Damage Tokens on Remaining Heroes</p>
        <ScrollControls
          :value="scoreModifiers.damageTokens"
          :leftBtnClickHandler="() => scoreModifierSetter('DamageTokens', -1)"
          :rightBtnClickHandler="() => scoreModifierSetter('DamageTokens', 1)"/>
      </div>
      <div class="score-settings-wrapper flex-row">
        <p>Victory Pool</p>
        <ScrollControls
          :value="scoreModifiers.victoryPool"
          :leftBtnClickHandler="() => scoreModifierSetter('VictoryPool', -1)"
          :rightBtnClickHandler="() => scoreModifierSetter('VictoryPool', 1)"/>
      </div>
    </div>
  </div>
</template>

<script>
import LabelAndValue from './LabelAndValue.vue';
import ScrollControls from './ScrollControls.vue';

export default {
  name: 'SettingsOverlay',
  components: {
    LabelAndValue,
    ScrollControls,
  },
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
    score: {
      type: Number,
      required: true,
    },
    scoreModifiers: {
      type: Object,
      required: true,
    },
    scoreModifierSetter: {
      type: Function,
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
  overflow: scroll;
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
    text-align: left;
    max-width: 50%;
  }
}

.score-settings-wrapper {
  margin: 20px auto;

  > p {
    font-size: 1rem;
    text-align: left;
    max-width: 50%;
  }

  .scroll-controls {
    margin: 0;
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