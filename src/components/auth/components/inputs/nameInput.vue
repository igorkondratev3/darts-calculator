<script setup>
import { ref, onActivated } from 'vue';

defineEmits(['updateParameter']);

const nameInput = ref(null);
onActivated(() => {
  nameInput.value.focus();
});

const name = ref('');
</script>

<template>
  <input
    type="text"
    class="auth__input"
    :class="{
      'auth__input_border-valid': name
    }"
    placeholder="Имя"
    maxlength="30"
    required
    data-type="name"
    ref="nameInput"
    v-model="name"
    @input="$emit('updateParameter', 'name', name)"
  />
</template>

<style>
/*стили в рожительском компоненте*/
</style>
