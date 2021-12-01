<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useNetwork } from '../utils/networkComposable';
import FilterSwitch from '../components/FilterSwitch.vue';
import SearchBar from '../components/SearchBar.vue';
import jsonData from '../utils/data.json';
import { mapState } from 'vuex';
import router from '../bootstrap/router';
import BottomNavigation from '../components/BottomNavigation.vue';
import BicycleStorageList from '../components/BicycleStorageList.vue';

interface BikeStation {
    id: number,
    street: string,
    available: number,
    cost: number,
    category: string,
    image: string,
    favorite: boolean
}

export default defineComponent({
    setup() {

    },

    data() {
        return {
            fromchild: '',
        }
    },

    computed: mapState([
        'items'
    ]),
    

    mounted() {
        this.$store.dispatch('loadItems');
    },

    methods: {
        onSearch(value: any) {
            this.fromChild = value
            console.log(`Parent: ${value}`)
        },
        handleMapsClick() {
            router.push({ path: '/map', params: { filter: 'all'} })
        },
        handleScanClick() {
            router.push({ path: '/scan' })
        },
    },

    components: {
    FilterSwitch,
    SearchBar,
    BottomNavigation,
    BicycleStorageList
}
})
</script>


<template>
    <div class="w-full h-full bg-dark-900 pt-4 page">

        <SearchBar v-on:childToParent="onSearch"></SearchBar>

        <FilterSwitch></FilterSwitch>

        <BicycleStorageList></BicycleStorageList>

        <BottomNavigation></BottomNavigation>

    </div>
</template>