import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const INITIAL_THREAT = 25;

export const store = new Vuex.Store({
  state: {
    status: {
      turn: 1,
      activePlayer: 1,
      gameStarted: false,
      increaseThreat: true,
    },
    players: [],
  },
  getters: {
    score: state => state.players.length ? 
      state.players.reduce(
        (acc, player) => acc + player.threat, 0
      ) + (state.status.turn * 10) : 0,
    lastPlayer: state => state.status.activePlayer - 1 > 0 ? 
      state.status.activePlayer - 1 : state.players.length,
  },
  mutations: {
    setInitialGameState: state => state.status = Object.assign({}, state.status, {
      turn: 1,
      activePlayer: 1,
      gameStarted: true,
    }),

    initializePlayers: (state, payload) => {
      state.players = [];

      for (let i = 1; i <= payload.playersCount; i += 1) {
        state.players.push({
          number: i,
          name: `Player ${i}`,
          threat: INITIAL_THREAT,
        });
      }
    },

    finishGame: state => state.status.gameStarted = false,

    nextTurn: state => state.status = Object.assign({}, state.status, {
      turn: state.status.turn + 1,
      activePlayer: state.status.activePlayer === state.players.length ?
        1 : state.status.activePlayer + 1,
    }),

    prevTurn: state => state.status = Object.assign({}, state.status, {
      turn: state.status.turn - 1 > 0 ? state.status.turn - 1 : state.status.turn,
      activePlayer: state.status.activePlayer === 1 ?
        state.players.length : state.status.activePlayer - 1,
    }),

    setAllThreatLevels: (state, payload) => {
      state.players = payload.forcedIncrese || state.status.increaseThreat ? 
        state.players.map(player => Object.assign({}, player, {
          threat: payload && payload.threat ? payload.threat : player.threat + payload.modifier,
        })) : state.players;
    },

    setPlayerThreatLevel: (state, payload) => {
      state.players = state.status.increaseThreat ? 
        state.players.map(player => {
          if (payload.playerNumber === player.number) {
            return Object.assign({}, player, {
              threat: player.threat += payload.modifier,
            });
          }

          return player;
        }) : state.players;
    },

    setPlayerName: (state, payload) => {
      state.players = state.players.map(player => {
        const name = payload.name.trim();

        if (payload.playerNumber === player.number && name) {
          return Object.assign({}, player, { name });
        }

        return player;
      });
    },

    toggleIncreaseThreat: state => 
      state.status.increaseThreat = !state.status.increaseThreat,

    makePlayerFirst: (state, payload) => state.status.activePlayer = payload.playerNumber,
  },
});