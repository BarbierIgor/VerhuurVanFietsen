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
        this.$store.dispatch('loadItems');
        this.getData();
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
    StorageListItem
}
})
</script>


<template>
    <div class="w-full h-full bg-dark-900 p-4">

        <SearchBar v-on:childToParent="onSearch"></SearchBar>

        <FilterSwitch class="mt-4"></FilterSwitch>

        <StorageList :data="bikeStations" :loading="loading" class="mt-8">
            <template v-slot="slotProps">
                <StorageListItem :bikeStation="slotProps.item"></StorageListItem>
            </template>
        </StorageList>

        <BottomNavigation></BottomNavigation>

    </div>
</template>