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
            categories: [
                'category 1',
                'category 2',
                'category 3',
                'category 4',

            ]
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
        handleSelect(e: any) {
            console.log(e);
        }
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
        <div class="relative">
            <div class="mt-4 h-8 w-3/5 bg-dark-accent rounded-2xl inline-flex peer items-center px-4 justify-around" tabindex="0">
                <p class="text-dark-400 font-semibold">Choose category</p>
                <svg class="w-4 h-4" viewBox="0 0 14.243 9.243">
                    <g transform="translate(2.121 2.121)">
                        <line x2="4.95" y2="5" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3"/>
                        <line x1="4.95" y2="5" transform="translate(5.05)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3"/>
                    </g>
                </svg>
            </div>

            <div 
                class="
                    bg-dark-400 w-3/5 rounded-2xl mt-2 transition-all duration-300
                    peer-focus:max-h-48 max-h-0
                    peer-focus:opacity-100 opacity-0
                    absolute
                    overflow-hidden
                "  
            >
                <div v-for="(category, index) in categories" :key="index" class="w-full">
                    <input @change="handleSelect($event)" class="peer" :value="category" type="radio" hidden name="category" :id="`item${index}`">
                    <label :for="`item${index}`" class="block p-2 px-4 w-full text-dark-900 peer-checked:bg-dark-accent peer-checked:text-dark-400 transition-colors duration-200">{{ category }}</label>
                </div>
            </div>
        </div>

        <StorageList :data="problems" :loading="loading" class="mt-8">
            <template v-slot="slotProps">
                <ProblemItem :problem="slotProps.item"></ProblemItem>
            </template>
        </StorageList>
    </div>
</template>