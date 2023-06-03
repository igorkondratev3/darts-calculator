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
      class="game-setup__parameter-header game-setup__parameter-header_margin_zero who-starts__header"
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
  margin-top: calc(var(--base) * 0.16);

  &__radio-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: calc(var(--base) * 0.2);
    height: calc(var(--base) * 0.2);
    outline: none;
    border: calc(var(--base) * 0.01) solid transparent;
    border-radius: 50%;
    background-color: rgb(221, 231, 231);
    transition: background-color 0.3s linear;

    &:checked {
      background-color: rgb(66, 63, 63);
    }

    &:focus {
      outline: calc(var(--base) * 0.02) solid white;
    }
  }
}

@media (max-width: 580px) {
  .who-starts {
    flex-direction: column;
    &__header {
      order: -1;
    }

    &__radio-button {
      margin-top: calc(var(--base) * 0.08);
    }
  }
}
</style>
