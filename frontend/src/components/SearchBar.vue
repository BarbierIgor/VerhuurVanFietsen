<script lang="ts">
import { defineComponent } from 'vue'
import router from '../bootstrap/router'

export default defineComponent({
    methods: {
        handleSearch(e: any) {
            const value = e.currentTarget.value;
            this.$emit('childToParent', value);
            if (value != '' && !undefined) {
                console.log(value);
            }
        },
        handleProfileClick() {
            router.push({path: '/profile'});
        },
    },

    setup() {
        return {

        }
    },
})
</script>

<template>
    <div class="relative bg-dark-accent h-10 ml-4 mr-4 rounded-full">
        <input v-on:keyup.enter="handleSearch($event)" class="relative w-full h-full rounded-full bg-dark-400 pl-12" type="text" placeholder="Find a bike station">
        <img @click="handleProfileClick()" class="absolute right-1.5 h-8 w-8 rounded-full bg-dark-900 top-1.5 -mt-0.5" src="../assets/images/profile_pic.png"/>

        <svg  class="absolute top-2.5 left-2.5 -mt-0.5 h-6 w-6" viewBox="0 0 75.749 75.749">
            <g>
                <path d="M74.795,70.55,53.061,48.783a29.4,29.4,0,0,0,6.862-18.893A29.963,29.963,0,1,0,29.946,59.6a30.011,30.011,0,0,0,18.6-6.432L70.355,74.994a3.141,3.141,0,0,0,4.44-4.444ZM6.365,29.906a23.582,23.582,0,0,1,47.162,0,23.582,23.582,0,0,1-47.162,0Z" transform="translate(0 -0.2)" fill="#2E353B"/>
            </g>
        </svg>

    </div>
</template>
