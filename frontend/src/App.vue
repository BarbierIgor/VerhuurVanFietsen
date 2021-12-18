<template>
    <router-view></router-view>
</template>

<style></style>
<script lang="ts">
import 'animate.css'
import data from './utils/data.json'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'App',

    beforeCreate() {
        const store = useStore();
        store.commit('initializePreferences');
    }
})
</script>
