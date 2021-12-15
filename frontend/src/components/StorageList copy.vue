<script lang="ts">
import { defineComponent } from 'vue'
import data from '../utils/data.json'
import StorageListItem from './StorageListItem.vue';

export default defineComponent({
    data() {
        return {
            bikeStations: {},
            loading: false,
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.loading = true;
            setTimeout(() => {
                this.bikeStations = data;
                this.loading = false;
            }, 2000);
        },
        handleFavorite(e: any, id: string) {
            console.log(e.currentTarget.checked);
            console.log(id);
        }
    },
    setup() {
    },
    components: { StorageListItem }
})
</script>

<template>

    <div class="h-auto w-full">
        <ul class="w-full" v-show="!loading">
            <!-- <StorageListItem v-for="bikeStation in bikeStations" :key="bikeStation.id" :bikeStation="bikeStation" button="detail"></StorageListItem> -->
            <slot v-for="bikeStation in bikeStations" :key="bikeStation.id" :bikeStation="bikeStation"></slot>
            <!-- <slot v-for="bikeStation in bikeStations" :key="bikeStation.id" :bikeStation="bikeStation"></slot> -->
        </ul>


        <ul class="w-full" v-show="loading">
            <li v-for="bikeStation in 3" :key="bikeStation" class="animate-pulse flex h-28 justify-between mt-8 first:mt-0">
                <div class="bg-dark-600 rounded-2xl h-30 w-24">
                    <!-- <img class="h-full" src="../assets/images/bike01.png" alt="bike"> -->
                </div>
                <div class="flex flex-col justify-around flex-grow pl-4">
                    <h1 class="bg-dark-600 h-4 w-3/4 rounded-md"></h1>
                    <p class="bg-dark-600 h-3 w-2/4 rounded-md"></p>
                    <div class="flex items-center">
                        <p class="bg-dark-600 h-4 w-1/3 rounded-md"></p>
                    </div>
                    <div class="flex items-center">
                        <p class="bg-dark-600 h-3 w-1/3 rounded-md"></p>
                    </div>

                </div>
                <div class="h-full w-6 flex justify-center items-center">
                    <div class="rounded-full w-6 h-6 bg-dark-600"></div>
                </div>

            </li>
        </ul>

    </div>
</template>