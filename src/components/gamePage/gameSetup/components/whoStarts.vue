<script setup>
defineProps({
  whoStarts: String
});
defineEmits(['update:whoStarts']);
</script>

<template>
  <div class="game-setup__who-starts who-starts">
    <input
      class="who-starts__radio-button"
      type="radio"
      name="whoStarts"
      value="nameP1"
      :checked="whoStarts === 'nameP1'"
      @change="$emit('update:whoStarts', 'nameP1')"
    />
    <h3
      class="game-setup__parameter-header game-setup__parameter-header_margin_zero"
    >
      Кто начинает
    </h3>
    <input
      class="who-starts__radio-button"
      type="radio"
      name="whoStarts"
      value="nameP2"
      :checked="whoStarts === 'nameP2'"
      @change="$emit('update:whoStarts', 'nameP2')"
    />
  </div>
</template>

<style lang="scss">
.who-starts {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;

  &__radio-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    outline: none;
    border: 1px solid transparent;
    border-radius: 50%;
    background-color: rgb(221, 231, 231);
    transition: background-color 0.3s linear;

    &:checked {
      background-color: rgb(66, 63, 63);
    }

    &:focus {
      outline: 2px solid white;
    }
  }
}
</style>
