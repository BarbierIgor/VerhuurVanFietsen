<script lang="ts">
import { defineComponent } from 'vue'
import useFirebase from '../composables/useFirebase'
import router from '../bootstrap/router'
import Header from '../components/Header.vue'
import CustomSelect from '../components/CustomSelect.vue'

import { NewBikeUnrecognizedProblem } from '../interfaces/Problem'
import { post } from '../composables/networkComposable'

export default defineComponent({
    data() {
        return {
            bikeNumber: null,
        }
    },
    methods: {
        handleImageClick(index: number) {
            console.log(this.$refs[`image${index}`])
            const image = this.$refs[`image${index}`]

            image.style.transform = 'translate(50px, 50px)'
        },
        async reportProblem() {
            console.log(this.bikeNumber)
            const userInfo = JSON.parse(localStorage.getItem('userInfo') as any)
            if (this.bikeNumber !== null) {
                try {
                    const problem: NewBikeUnrecognizedProblem = {
                        category: 'bikeUnrecognizedProblem',
                        bikeId: this.bikeNumber,
                    }
                    const res = await post(
                        'problem',
                        problem,
                        userInfo.bearerToken,
                    )
                    console.log(res)
                    router.push({ path: '/report' })
                } catch (error) {
                    console.error(error)
                }
            } else {
                console.error('fill in all the necessary fields!')
            }
        },
    },
    watch: {
        problem: function (val: any) {
            console.log(val)
        },
    },
    setup() {},
    components: { Header, CustomSelect },
})
</script>

<template>
    <div class="p-4">
        <Header title="Unrecognized Bike"></Header>
        <div class="w-full mt-10 grid gap-8">
            <div>
                <h1 class="text-dark-600">
                    Bike number <span class="text-dark-accent">*</span>
                </h1>
                <input
                    v-model="bikeNumber"
                    class="
                        transition-opacity
                        duration-200
                        bg-transparent
                        w-full
                        text-dark-600
                        border border-dark-600
                        rounded-lg
                        p-2
                        mt-4
                        opacity-30
                        focus:outline-none focus:opacity-100
                    "
                    type="text"
                    placeholder="Bike number"
                />
            </div>
        </div>

        <div class="fixed bottom-6 left-0 w-full h-12 px-6">
            <button
                @click="reportProblem"
                class="
                    bg-dark-accent
                    w-full
                    h-full
                    font-semibold
                    rounded-lg
                    text-dark-400 text-lg
                "
            >
                Report
            </button>
        </div>
    </div>
</template>

<style>
.image-grid-item {
    transition: all 0.3s;
}

.image-grid-enter,
.image-grid-leave-to {
    opacity: 0;
    transform: scale(0);
}
.image-grid-enter-to {
    opacity: 1;
    transform: scale(1);
}

/* .image-grid-leave-active {
        position: absolute;
    } */

.image-grid-move {
    opacity: 1;
    transition: all 0.5s;
}
</style>
