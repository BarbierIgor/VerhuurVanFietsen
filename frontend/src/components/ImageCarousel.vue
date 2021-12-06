<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['images'],

    data() {
        return {
            carouselPosition: 1,
        }
    },

    methods: {
        handleCarousel() {
            const carousel = this.$refs.carousel;

            // carousel.style.transform = `translateX(-${this.carouselPosition * 100}%)`

            console.log(this.$props.images.length)

            if (this.carouselPosition >= this.$props.images.length) {
                carousel.style.transform = `translateX(0)`
                this.carouselPosition = 1;
            } else {
                carousel.style.transform = `translateX(-${this.carouselPosition * 100}%)`
                this.carouselPosition += 1
            }
        }
    },

    computed: {
        numberOfImages () {
            return this.images
        },
    },

    setup() {
        
    },
})
</script>

<template>
    <div class="w-full bg-dark-400 rounded-lg overflow-hidden">
        <div class="relative flex overflow-hidden">
            <div @click="handleCarousel" ref="carousel" class="w-full flex transition-transform duration-1000">
                <img class="w-full rounded-lg object-cover" v-for="(image, index) in $props.images" :key="index" :src="image" alt="Image">
            </div>
            <div class="absolute flex h-4 bottom-0 bg-transparent w-full justify-between items-center">
                <span class="h-1.5 w-1/6 scale-x-75 rounded-lg bg-dark-700 bg-opacity-60 flex justify-center items-center" v-for="(image, index) in numberOfImages" :key="index">
                    <span v-if="index+1 == carouselPosition" class="w-full h-full bg-dark-400 rounded-lg"></span>
                </span>
            </div> 
        </div>
    </div>
</template>