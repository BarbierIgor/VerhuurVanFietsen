<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        title: { type: String, value: '' },
    },
})
</script>

<template>
    <div class="col-span-full flex items-center justify-center relative">
        <div
            @click="$router.back()"
            class="w-8 h-8 flex items-center justify-center cursor-pointer"
        >
            <svg class="w-4 h-4" viewBox="0 0 15.515 23.959">
                <g
                    id="Group_52"
                    data-name="Group 52"
                    transform="translate(3.536 3.535)"
                >
                    <line
                        id="Line_3"
                        data-name="Line 3"
                        x2="11.942"
                        transform="translate(0 8.444) rotate(45)"
                        fill="none"
                        stroke="#dedede"
                        stroke-linecap="round"
                        stroke-width="5"
                    />
                    <line
                        id="Line_4"
                        data-name="Line 4"
                        x2="11.942"
                        transform="translate(0 8.444) rotate(-45)"
                        fill="none"
                        stroke="#dedede"
                        stroke-linecap="round"
                        stroke-width="5"
                    />
                </g>
            </svg>
        </div>
        <h1
            class="flex-grow text-center text-2xl font-bold text-dark-400"
            v-if="$props.title != ''"
        >
            {{ $props.title }}
        </h1>
        <div class="w-6 h-6"></div>
    </div>
</template>
