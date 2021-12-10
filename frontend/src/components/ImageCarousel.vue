<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['images'],

    data() {
        return {
            carouselPosition: 1,
            touchStartPosition: 0,
            touchPosition: 0,
            isDragging: false,
        }
    },

    methods: {
        handleCarousel(index: number | null = null) {
            console.log('HandleCarousel')
            const carousel = this.$refs.carousel;

            if (index != null) {
                    console.log(`translateX(-${index * 100}vw) translateX(${index * 2}rem)`);
                    carousel.style.transform = `translateX(-${index * 100}vw) translateX(${index * 2}rem)`;
                    this.carouselPosition = index + 1;
            } else {
                if (this.carouselPosition >= this.$props.images.length) {
                    console.log(`translateX(0)`);
                    carousel.style.transform = `translateX(0)`;
                    this.carouselPosition = 1;
                } else {
                    console.log(`translateX(-calc(${this.carouselPosition * 100}vh - ${this.carouselPosition * 2}rem))`)
                    carousel.style.transform = `translateX(-${this.carouselPosition * 100}vw) translateX(${this.carouselPosition * 2}rem)`;
                    this.carouselPosition += 1
                }
            }
            
        },
        handleTouch(e: any) {
            this.isDragging = true;
            this.touchPosition = e.touches[0].clientX
            const carousel = this.$refs.carousel;
            const originalTouchPos = this.touchStartPosition;
            const newTouchPos = this.touchPosition;

            let difference = 0;

            if (newTouchPos < originalTouchPos) {
                console.log('Scroll right')
                difference = -(originalTouchPos - newTouchPos)
            } else if (newTouchPos > originalTouchPos) {
                console.log('Scroll left')
                difference = newTouchPos - originalTouchPos
            }

            if (this.carouselPosition == this.$props.images.length && difference < 0) {
                console.log('final image')
                console.log(`translateX(-${(this.carouselPosition -1) * 100}vw) translateX(${(this.carouselPosition -1) * 2}rem) translateX(${difference / 5}px)`)
                carousel.style.transform = `translateX(-${(this.carouselPosition -1) * 100}vw) translateX(${(this.carouselPosition -1) * 2}rem) translateX(${difference / 5}px)`
            } else if (this.carouselPosition == 1 && difference > 0) {
                console.log('first image')
                carousel.style.transform = `translateX(-${(this.carouselPosition -1) * 100}vw) translateX(${(this.carouselPosition -1) * 2}rem) translateX(${difference / 5}px)`
            } else {
                console.log(`translateX(-${(this.carouselPosition -1) * 100}vw) translateX(${(this.carouselPosition -1) * 2}rem) translateX(${difference}px)`)
                carousel.style.transform = `translateX(-${(this.carouselPosition -1) * 100}vw) translateX(${(this.carouselPosition -1) * 2}rem) translateX(${difference}px)`
            }
            
        },
        handleTouchEnd() {
            this.isDragging = false;
            console.log(`StartPosition = ${this.touchStartPosition}`)
            console.log(`EndPosition = ${this.touchPosition}`)
            console.log(`Difference = ${Math.abs(this.touchStartPosition - this.touchPosition)}`)

            if (this.carouselPosition == this.$props.images.length) {
                if (this.touchStartPosition < this.touchPosition) {
                    this.handleCarousel(this.carouselPosition - 2);
                    return
                } else {
                    this.handleCarousel(this.carouselPosition - 1);
                    return
                }
            }

            if (this.carouselPosition == 1) {
                if (this.touchStartPosition < this.touchPosition) {
                    this.handleCarousel(this.carouselPosition -1);
                    return
                } else {
                    this.handleCarousel(this.carouselPosition);
                    return
                }
            }

            if (Math.abs(this.touchStartPosition - this.touchPosition) > 150) {
                if(this.touchStartPosition < this.touchPosition) {
                    this.handleCarousel(this.carouselPosition - 2);
                } else {
                    this.handleCarousel(this.carouselPosition);
                }
            } else {
                console.log('Gesture distance less than 200')
                this.handleCarousel(this.carouselPosition -1);
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
    <div class="w-full h-48 bg-dark-900 rounded-lg ">
        <div class="relative flex h-full rounded-lg overflow-hidden">
            <!-- @click="handleCarousel(null)"  -->
            <div 
                @touchstart="touchPosition = $event.touches[0].clientX; touchStartPosition = $event.touches[0].clientX" 
                @touchend="handleTouchEnd()" 
                @touchmove="handleTouch($event)" 
                ref="carousel" 
                class="h-full bg-dark-900 flex" 
                :class="isDragging ? '' : 'transition duration-500 ease-out'"
            >
                <div v-for="(image, index) in $props.images" :key="index" class="bg-dark-700 h-full w-[calc(100vw-2rem)] flex justify-center items-center overflow-hidden">
                    <img class="w-full h-full object-cover" :src="image" alt="Image">
                </div>
            </div>

            <div class="absolute flex h-4 bottom-0 bg-transparent w-full justify-between items-center">
                <span @click="handleCarousel(index)" class="h-1.5 w-1/2 scale-x-75 rounded-lg bg-dark-700 bg-opacity-60 flex justify-center items-center" v-for="(image, index) in numberOfImages" :key="index">
                    <span v-if="index+1 == carouselPosition" class="w-full h-full bg-dark-400 rounded-lg"></span>
                </span>
            </div> 
        </div>
    </div>
</template>