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
        // console.log(this.problem)
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
    </div>
</template>