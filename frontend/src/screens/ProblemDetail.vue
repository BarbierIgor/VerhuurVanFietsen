<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import data from '../utils/problems.json'
import ImageCarousel from '../components/ImageCarousel.vue'

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
            problem: {
                type: new Array<Problem>(),
            },
            loading: false,
        }
    },

    mounted() {
        this.getData();
    },

    methods: {
        getData() {
            console.log('Getting data')
            this.loading = true;
            setTimeout(() => {
                this.problem = data.find((item: Problem) => item.id === Number(this.$route.params.id));
                this.loading = false;
            }, 500);
        },
    },

    setup() {
    },
    components: { Header, ImageCarousel }
})
</script>

<template>
    <div class="p-4">
        <Header class="mb-4" :title="problem.adres"></Header>

        <ImageCarousel :images="problem.images"></ImageCarousel>

        <div class="grid gap-4 w-full mt-4">
            <div>
                <h2 class="text-dark-600 py-1">Problem category</h2>
                <p class="text-dark-400">Defect bike</p>
            </div>

            <div>
                <h2 class="text-dark-600 py-1">Broken part</h2>
                <p class="text-dark-400">Wheel</p>
            </div>

            <div>
                <h2 class="text-dark-600 py-1">Description</h2>
                <p class="text-dark-400 max-h-24 overflow-y-scroll">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat sit amet neque at facilisis. In semper nec orci non ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare at sem sed dictum. Mauris gravida enim eget commodo congue. </p>
            </div>

            <div>
                <h2 class="text-dark-600 py-1">Date</h2>
                <p class="text-dark-400">07/12/2021</p>
            </div>

            <div>
                <h2 class="text-dark-600 py-1">Bike number</h2>
                <p class="text-dark-400">0123456</p>
            </div>

            <div class="fixed bottom-6 left-0 w-full h-12 px-6">
                <button @click="reportProblem" class="bg-dark-accent w-full h-full font-semibold rounded-lg text-dark-400 text-lg">Solve problem</button>
            </div>
        </div>
    </div>
</template>