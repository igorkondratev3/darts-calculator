<script setup>
import { RouterView } from 'vue-router';
import { useUsersStore } from '@/stores/users.js'
const usersStore = useUsersStore();
if (localStorage.getItem('userP1')) 
  usersStore.login('P1', JSON.parse(localStorage.getItem('userP1')));
  if (localStorage.getItem('userP2')) 
  usersStore.login('P2', JSON.parse(localStorage.getItem('userP2')));
</script>

<template>
  <RouterView />
</template>

<style></style>
