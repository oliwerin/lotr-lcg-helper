<template>
  <div class='app'>
    <h1>Lord of the Rings LCG Helper</h1>
    <ul v-if="!gameStarted">
      <li v-for="n in 4" :key="n">
        <button @click="startGame(n)">{{n}} player</button>
      </li>
    </ul>
    <div v-if="gameStarted">
      <button class="btn-small" @click="backToSetPlayers">set players number</button>
      <ThreatCounter v-for="player in players" 
        :key="player.number"
        :nameSetter="setPlayerName"
        :threatLevelSetter="setPlayerThreatLevel"
        :markAsActive="markAsActive"
        :isActive="player.number === activePlayer"
        :player="player"
      />
      <div class="section flex-row">
        <button @click="prevTurn">-1</button>
        <div class="circle circle-small">
          <p class="circle-value">{{ turn }}</p>
          <p class="circle-label">TURN</p>
        </div>
        <button @click="nextTurn">+1</button>
      </div>
      <div class="section flex-column">
        <button @click="advanceTurn">next turn</button>
        <label><input v-model="increaseThreat" type="checkbox">increase threat</label>
        <button class="btn-small" @click="resetGame">reset game</button>
        <p class="score">Score*: <b>{{ score }}</b></p>
        <p>*doesn't include heroes wounds/threat and victory pool</p>
      </div>
    </div>
  </div>
</template>

<script>
import ThreatCounter from './components/ThreatCounter.vue';

const INITIAL_THREAT = 25;

export default {
  name: 'app',
  components: {
    ThreatCounter,
  },
  computed: {
    turn() {
      return this.$store.state.status.turn;
    },

    players() {
      return this.$store.state.players;
    },

    activePlayer() {
      return this.$store.state.status.activePlayer;
    },

    increaseThreat() {
      return this.$store.state.status.increaseThreat;
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

    nextTurn() {
      this.$store.commit('nextTurn');
    },

    prevTurn() {
      this.$store.commit('prevTurn');
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

    markAsActive(playerNumber) {
      this.$store.commit('markPlayerAsActive', {
        playerNumber,
      });
    },
  },
};
</script>

<style lang="scss">
@import "sass/main";

.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  margin: auto;
  padding: 2rem;

  @include respond-to-large() {
    max-width: 40%;
  }
}

.section {
  padding: 2rem 0;
  border-bottom: 1px solid $secondary-color;

  &:last-child {
    border: none;
  }
}

.flex-row {
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: space-between;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circle {
  margin: auto;
  border-radius: 100%;
  border: 1px solid $secondary-color;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 3rem;
  height: 7rem;
  width: 7rem;
}

.circle-value,
.circle-label {
  margin: 0;
  padding: 0;
}

.circle-value {
  line-height: 1;
}

.circle-label {
  font-size: 1.2rem;
  text-transform: uppercase;
}

.circle-small {
  font-size: 2rem;
  width: 5rem;
  height: 5rem;

  .circle-label {
    font-size: 1rem;
  }
}

.btn-small {
  font-size: 1.2rem;
  padding: 0.8rem;
}

.score {
  font-size: 1.3rem;
  margin-bottom: 0;
  text-transform: uppercase;
}
</style>
