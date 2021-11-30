<script setup lang="ts">
  import 'animate.css';
</script>

<template>

  <router-view v-slot="{ Component }">
    <transition name="router-anim" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
      <component :is="Component"/>
    </transition>
  </router-view>
  
</template>

<style>
</style>
