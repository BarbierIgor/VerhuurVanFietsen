<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import SearchBar from '../components/SearchBar.vue'
import StorageList from '../components/StorageList.vue'
import ProblemItem from '../components/ProblemItem.vue'
import data from '../utils/problems.json'

interface Problem {
    id: Number,
    adres: String,
    distance: Number, 
    category: String,
    brokenPart: String,
    description: String,
    date: String,
    bikeNumber: Number,
    images: Array<String>,
}

export default defineComponent({
    
    data() {
        return {
            loading: false,
            problems: new Array<Problem>(),
        }
    },

    mounted() {
        this.getData()
    },

    methods: {
        onSearch(value: String) {
            console.log(value)
        },
        getData() {
            console.log('Getting data')
            this.loading = true;
            setTimeout(() => {
                this.problems = data;
                this.loading = false;
            }, 500);
        },
    },

    setup() {

    },
    components: { Header, SearchBar, StorageList, ProblemItem }
})
</script>

<template>
    <div class="p-4">
        <Header title="Problems"></Header>
        <SearchBar class="mt-4" v-on:childToParent="onSearch" :isProfile="false"></SearchBar>

        <!-- Filter -->
        <div class="mt-4 h-8 bg-dark-accent rounded-full inline-flex  items-center px-4">
            <p class="text-dark-400 font-semibold mr-4">Choose category</p>
            <svg class="w-4 h-4" viewBox="0 0 14.243 9.243">
                <g transform="translate(2.121 2.121)">
                    <line x2="4.95" y2="5" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3"/>
                    <line x1="4.95" y2="5" transform="translate(5.05)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3"/>
                </g>
            </svg>
        </div>

        <StorageList :data="problems" :loading="loading" class="mt-8">
            <template v-slot="slotProps">
                <!-- <StorageListItem :bikeStation="slotProps.bikeStation"></StorageListItem> -->
                <ProblemItem :problem="slotProps.item"></ProblemItem>
            </template>
        </StorageList>
    </div>
</template>