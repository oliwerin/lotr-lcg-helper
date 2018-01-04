<template>
  <div class="app">
    <div class="heading-wrapper flex-centered-content"> 
      <h1>Threat Tracker</h1>
      <img class="heading-bg" src="/assets/svg/button01.svg" alt=""/>
      <button
        class="btn btn-settings"
        @click.prevent="isSettingsOverlayVisible = !isSettingsOverlayVisible"></button>
    </div>
    <ul v-if="!gameStarted">
      <li v-for="n in 4" :key="n">
        <button 
          class="btn btn-number-of-players"
          @click.prevent="startGame(n)">{{n}} Player{{n > 1 ? "s" : ""}}</button>
      </li>
    </ul>
    <div v-if="gameStarted">      
      <div class="threat-counters-wrapper">
        <ThreatCounter v-for="player in players" 
          :key="player.number"
          :nameSetter="setPlayerName"
          :threatLevelSetter="setPlayerThreatLevel"
          :makeFirst="makeFirst"
          :status="playerStatus(player.number)"
          :player="player"
        />
      </div>
      <div class="turn-controls flex-row">
        <button 
          class="btn btn-prev-turn" 
          @click.prevent="prevTurn"></button>
        <LabelAndValue
          label="Next Turn"
          :value="turn"
          :labelClickHandler="advanceTurn"/>
      </div>
      <InfoBar/>
      <div v-show="false">
        <label>
          <input v-model="increaseThreat" type="checkbox">increase threat
        </label>
        <button @click.prevent="resetGame">reset game</button>
        <p class="score">Score*: <b>{{ score }}</b></p>
        <p>*it's not the final score</p>
        <button @click.prevent="backToSetPlayers">number of players</button>
      </div>
    </div>
    <transition name="fade">
      <SettingsOverlay v-show="isSettingsOverlayVisible"/>
    </transition>
  </div>
</template>

<script>
import ThreatCounter from './components/ThreatCounter.vue';
import SettingsOverlay from './components/SettingsOverlay.vue';
import LabelAndValue from './components/LabelAndValue.vue';
import InfoBar from './components/InfoBar.vue';

import {
  PLAYER_STATUS,
  INITIAL_THREAT,
} from './constants/constants';

export default {
  name: 'app',
  components: {
    ThreatCounter,
    SettingsOverlay,
    LabelAndValue,
    InfoBar,
  },
  data() {
    return {
      isSettingsOverlayVisible: false,
    };
  },
  computed: {
    turn() {
      return this.$store.state.status.turn;
    },

    players() {
      return this.$store.state.players;
    },

    firstPlayer() {
      return this.$store.state.status.activePlayer;
    },

    lastPlayer() {
      return this.$store.getters.lastPlayer;
    },

    increaseThreat: {
      get() {
        return this.$store.state.status.increaseThreat;
      },
      set() {
        this.$store.commit('toggleIncreaseThreat');
      },
    },

    gameStarted() {
      return this.$store.state.status.gameStarted;
    },

    score() {
      return this.$store.getters.score;
    },
  },
  methods: {
    startGame(playersCount) {
      this.$store.commit('setInitialGameState');
      this.$store.commit('initializePlayers', {
        playersCount,
      });
    },

    advanceTurn() {
      this.$store.commit('nextTurn');
      this.$store.commit('setAllThreatLevels');
    },

    resetGame() {
      this.$store.commit('setInitialGameState');
      this.$store.commit('setAllThreatLevels', {
        threat: INITIAL_THREAT,
      });
    },

    backToSetPlayers() {
      this.$store.commit('finishGame');
    },

    prevTurn() {
      this.$store.commit('prevTurn');
    },

    toggleThreatIncrease() {
      this.$store.commit('toggleIncreaseThreat');
    },

    setPlayerThreatLevel(playerNumber, modifier) {
      this.$store.commit('setPlayerThreatLevel', {
        playerNumber,
        modifier,
      });
    },

    setPlayerName(playerNumber, name) {
      this.$store.commit('setPlayerName', {
        playerNumber,
        name,
      });
    },

    makeFirst(playerNumber) {
      this.$store.commit('makePlayerFirst', {
        playerNumber,
      });
    },

    playerStatus(playerNumber) {
      if (playerNumber === this.$store.state.status.activePlayer) {
        return PLAYER_STATUS.FIRST;
      } else if ((this.$store.state.status.activePlayer === 1 &&
        playerNumber === this.$store.state.players.length) ||
        playerNumber === this.$store.state.status.activePlayer - 1) {
        return PLAYER_STATUS.LAST;
      }

      return PLAYER_STATUS.DEFAULT;
    },
  },
};
</script>

<style lang="scss">
@import "sass/main";

.app {
  font-family: 'Ringbearer Medium', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: auto;

  @include respond-to-large() {
    max-width: 40%;
  }
}

.heading-wrapper {
  @include shadow;

  position: relative;
  margin: 25px auto;
  height: 40px;
  width: 230px;

  &::before,
  .btn-settings {
    @include shadow;

    content: "";
    display: block;
    height: 50px;
    width: 50px;
    position: absolute;
    background-size: 100%;
    border-radius: 100%;
  }

  &::before {
    background-image: url(/assets/svg/button04.svg);
    left: -25px;
  }

  .btn-settings {
    background-image: url(/assets/svg/button03.svg);
    right: -25px;
  }
}

.heading-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}

.threat-counters-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.btn-number-of-players {
  @include btn-default-bg(190px);
}

.turn-controls {
  position: relative;
  width: 165px;
  height: 50px;
}

.btn-prev-turn {
  @include shadow;

  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-image: url(/assets/svg/button02.svg);
  background-size: 100%;
  position: absolute;
  left: -60px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
