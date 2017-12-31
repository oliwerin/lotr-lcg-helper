<template>
  <div class="settings-overlay">
    <div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsOverlay',
  components: {},
  props: {},
};
</script>

<style lang="scss">
@import "../sass/variables";

$overlay-margin-top: 90px;

.settings-overlay {
  height: calc(100% - #{$overlay-margin-top});
  width: 100%;
  background-color: $grey;
  position: fixed;
  top: $overlay-margin-top;
  left: 0;
}

</style>