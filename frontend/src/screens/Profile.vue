<script lang="ts">
import { defineComponent } from 'vue'
import router from '../bootstrap/router';

export default defineComponent({
    methods: {
        handleBackButton() {
            router.go(-1);
        },
    },
    setup() {
        
    },
})
</script>


<template>
    <div class="grid grid-cols-1 p-4 justify-center w-screen">
            <div @click="handleBackButton()" class="col-span-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="15.515" height="23.959" viewBox="0 0 15.515 23.959">
                    <g id="Group_52" data-name="Group 52" transform="translate(3.536 3.535)">
                        <line id="Line_3" data-name="Line 3" x2="11.942" transform="translate(0 8.444) rotate(45)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="5"/>
                        <line id="Line_4" data-name="Line 4" x2="11.942" transform="translate(0 8.444) rotate(-45)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="5"/>
                    </g>
                </svg>
            </div>

            <!-- profile picture -->
            <picture class="flex justify-center w-full">
                <img class="rounded-full bg-dark-600 w-44" src="../assets/images/profile_pic.png" alt="Profile Picture">
            </picture>
    </div>
</template>