<template>
  <div class="section">
    <h2>
      {{ player.name }}
      <span v-show="isActive">(active)</span>
    </h2>
    <div class="flex-row">
      <button @click="threatLevelSetter(player.number, -3)">-3</button>
      <button @click="threatLevelSetter(player.number, -1)">-1</button>
      <div class="circle">
        <p class="circle-value">{{ player.threat }}</p>
        <p class="circle-label">THREAT</p>
      </div>
      <button @click="threatLevelSetter(player.number, 1)">+1</button>
      <button @click="threatLevelSetter(player.number, 3)">+3</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ThreatCounter',
  props: {
    threatLevelSetter: {
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
  },
};
</script>

<style lang="scss">
</style>