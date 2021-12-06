<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        active: Boolean,
    },

    data() {
        return {
            filter: null,
            sliderWidth: 0,
            latestLabelPosition: 0,
        }
    },

    mounted () {
        const form: HTMLElement | unknown = this.$refs.filterswitch
        this.$refs.slider.style.width = `${this.$refs.checkbox1.nextSibling.offsetWidth}px`;
    },

    methods: {
        handleCheckboxChange(e: any) {
            const sliderSpan: any = this.$refs.slider;
            const label: HTMLElement = e.currentTarget.nextSibling;

            const sliderX: number = sliderSpan.getBoundingClientRect().x
            const labelX: number = label.getBoundingClientRect().x

            if (this.latestLabelPosition == 0) {
                this.latestLabelPosition = sliderX
            }
            
            let xDifference = Math.abs(labelX - sliderX);

            if (sliderX < labelX) {
                sliderSpan.style.transform = `translateX(${sliderX + xDifference - this.latestLabelPosition}px)`;
            } else {
                sliderSpan.style.transform = `translateX(${sliderX - xDifference - this.latestLabelPosition}px)`;
            }

            sliderSpan.style.width = `${label.offsetWidth}px`;
        },
    },

    setup() {
        return {

        }
    },
})
</script>


<template>
        <div class="bg-dark-400 h-10 rounded-full p-1">
            <form ref="filterSwitch" class="relative custom-radiobuttons h-full w-full flex justify-between items-center">
                <input v-model="filter" @change="handleCheckboxChange($event)" class="hidden" ref="checkbox1" checked type="radio" name="type" value="all" id="all">
                <label class="z-10 flex-auto rounded-full text-center align-bottom" for="all">all</label>
                <input v-model="filter" @change="handleCheckboxChange($event)" class="hidden" ref="checkbox2" type="radio" name="type" value="normal" id="normal">
                <label class="z-10 flex-auto rounded-full text-center" for="normal">normal</label>
                <input v-model="filter" @change="handleCheckboxChange($event)" class="hidden" ref="checkbox3" type="radio" name="type" value="electric" id="electric">
                <label class="z-10 flex-auto rounded-full text-center" for="electric">electric</label>
                <input v-model="filter" @change="handleCheckboxChange($event)" class="hidden" ref="checkbox4" type="radio" name="type" value="estep" id="estep">
                <label class="z-10 flex-auto rounded-full text-center" for="estep">e-step</label>

                <span ref="slider" class="z-0 absolute h-full rounded-full bg-dark-accent transition-transform-width duration-200 ease-out "></span>
            </form>
        </div>
</template>