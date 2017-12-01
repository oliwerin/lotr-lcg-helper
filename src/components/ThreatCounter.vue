<template>
  <div class="section">
    <PlayerName 
      :nameSetter="nameSetter" 
      :name="player.name"
      :number="player.number"
      :markAsActive="markAsActive"
      :isActive="isActive"/>
    <div class="flex-row">
      <button @click.prevent="threatLevelSetter(player.number, -3)">-3</button>
      <button @click.prevent="threatLevelSetter(player.number, -1)">-1</button>
      <div class="circle">
        <p class="circle-value">{{ player.threat }}</p>
        <p class="circle-label">THREAT</p>
      </div>
      <button @click.prevent="threatLevelSetter(player.number, 1)">+1</button>
      <button @click.prevent="threatLevelSetter(player.number, 3)">+3</button>
      </div>
  </div>
</template>

<script>
import PlayerName from './PlayerName.vue';

export default {
  name: 'ThreatCounter',
  components: {
    PlayerName,
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
    isActive: {
      type: Boolean,
      required: true,
    },
    markAsActive: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss">
  /* styles */
</style>