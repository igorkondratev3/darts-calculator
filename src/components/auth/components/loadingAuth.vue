<template>
  <div class="loading-auth"></div>
</template>

<style>
.loading-auth {
  display: flex;
  flex-direction: column;
  width: var(--authWIdth);
  height: var(--authHeight);
  margin: 0px calc(var(--base) * 0.04);
  padding: calc(var(--base) * 0.16);
  padding-top: 0px;
  border-radius: calc(var(--base) * 0.16);
  overflow: auto;
  background-color: rgb(182, 195, 197);
}
</style>
