<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useNetwork } from '../utils/networkComposable';
import FilterSwitch from '../components/FilterSwitch.vue';
import SearchBar from '../components/SearchBar.vue';
import data from '../utils/data.json';
import { mapState } from 'vuex';
import router from '../bootstrap/router';
import BottomNavigation from '../components/BottomNavigation.vue';
import StorageList from '../components/StorageList.vue';
import StorageListItem from '../components/StorageListItem.vue';

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
            bikeStations: {},
            loading: false,
        }
    },

    computed: mapState([
        'items'
    ]),
    

    mounted() {
        // this.$store.dispatch('loadItems');
        this.getData();
    },

    methods: {
        onSearch(value: any) {
            // this.fromChild = value
            console.log(`Parent: ${value}`)
        },
        handleMapsClick() {
            router.push({ path: '/map', params: { filter: 'all'} })
        },
        handleScanClick() {
            router.push({ path: '/scan' })
        },
        getData() {
            this.loading = true;
            setTimeout(() => {
                this.bikeStations = data;
                this.loading = false;
            }, 2000);
        },
    },

    components: {
        FilterSwitch,
        SearchBar,
        BottomNavigation,
        StorageList,
        StorageListItem,
    }
})
</script>


<template>
    <div @click="$router.go(-1)" class="w-full h-full bg-dark-900 p-4 page">
        <div class="w-full flex justify-between items-center">
            <router-link to="/map" class="h-10 w-10 bg-dark-400 rounded-full mr-4 flex justify-center items-center">
                <svg class="w-2/4 h-2/4 -ml-1" viewBox="0 0 16.192 22.396">
                    <g transform="translate(-85.87 -25.598)">
                        <line x2="11.942" transform="translate(89.392 36.796) rotate(40)" fill="none" stroke="#2e353b" stroke-linecap="round" stroke-width="5"/>
                        <line x2="11.942" transform="translate(89.392 36.796) rotate(-40)" fill="none" stroke="#2e353b" stroke-linecap="round" stroke-width="5"/>
                    </g>
                </svg>
            </router-link>
            <SearchBar class="flex-grow" v-on:childToParent="onSearch"></SearchBar>
        </div>

        <FilterSwitch class="mt-4"></FilterSwitch>

        <h1 class="text-2xl text-dark-400 font-semibold mt-4">Favorites</h1>

        <StorageList :data="bikeStations" :loading="loading" class="mt-4">
            <template v-slot="slotProps">
                <StorageListItem :bikeStation="slotProps.item"></StorageListItem>
            </template>
        </StorageList>

        <BottomNavigation></BottomNavigation>

    </div>
</template>