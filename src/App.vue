
<template>
  <div id="app">
    <h1>{{ title }}</h1>
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
        :isActive="player.number === activePlayer"
        :player="player"
      />
      <div class="section flex-row">
        <button @click="setTurn(-1)">-1</button>
        <div class="circle circle-small">
          <p class="circle-value">{{ turn }}</p>
          <p class="circle-label">TURN</p>
        </div>
        <button @click="setTurn(1)">+1</button>
      </div>
      <div class="section flex-column">
        <button @click="advanceTurn">next turn</button>
        <label><input v-model="increaseThreat" type="checkbox">increase threat</label>
        <button class="btn-small" @click="resetGame">reset game</button>
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
  data() {
    return {
      title: 'Lord of the Rings LCG Helper',
      gameStarted: false,
      turn: 1,
      increaseThreat: true,
      players: [],
      activePlayer: null,
    };
  },
  methods: {
    startGame(playersCount) {
      this.players = [];

      for (let i = 1; i <= playersCount; i += 1) {
        this.players.push({
          number: i,
          name: `Player ${i}`,
          threat: INITIAL_THREAT,
        });
      }

      this.setInitialGameState();
    },

    setInitialGameState() {
      this.turn = 1;
      this.activePlayer = 1;
      this.gameStarted = true;
    },

    setPlayerThreatLevel(playerNumber, modifier) {
      this.players[playerNumber - 1].threat += modifier;
    },

    setPlayerName(playerNumber, name) {
      this.players[playerNumber - 1].name = name;
    },

    setTurn(modifier) {
      this.turn += modifier;
      this.changeActivePlayer(modifier > 0);
    },

    advanceTurn() {
      this.turn += 1;
      this.changeActivePlayer();

      if (this.increaseThreat) {
        this.players = this.players
          .map(player => Object.assign({}, player, { threat: player.threat + 1 }));
      }
    },

    resetGame() {
      this.setInitialGameState();
      this.players = this.players
        .map(player => Object.assign({}, player, { threat: INITIAL_THREAT }));
    },

    backToSetPlayers() {
      this.gameStarted = false;
    },

    changeActivePlayer(clockwise = true) {
      this.activePlayer += clockwise ? 1 : -1;

      if (this.activePlayer === 0) {
        this.activePlayer = this.players.length;
      } else if (this.activePlayer === this.players.length + 1) {
        this.activePlayer = 1;
      }
    },
  },
};
</script>

<style lang="scss">
@import "sass/main";

#app {
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
  font-weight: bold;
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
</style>
