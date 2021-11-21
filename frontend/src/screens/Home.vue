<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>


<template>
    <div class="w-screen h-screen bg-dark-900 pt-4">
        <!-- Search bar -->
        <div class="relative bg-dark-accent h-10 ml-4 mr-4 rounded-full">
            <input class="relative w-full h-full rounded-full bg-dark-400 pl-12" type="text" placeholder="Find a bike station">
            <img class="absolute right-1.5 h-8 w-8 rounded-full bg-dark-900 top-1.5 -mt-0.5" src="../assets/images/profile_pic.png"/>

            <svg class="absolute top-2.5 left-2.5 -mt-0.5 h-6 w-6" viewBox="0 0 75.749 75.749">
                <g>
                    <path d="M74.795,70.55,53.061,48.783a29.4,29.4,0,0,0,6.862-18.893A29.963,29.963,0,1,0,29.946,59.6a30.011,30.011,0,0,0,18.6-6.432L70.355,74.994a3.141,3.141,0,0,0,4.44-4.444ZM6.365,29.906a23.582,23.582,0,0,1,47.162,0,23.582,23.582,0,0,1-47.162,0Z" transform="translate(0 -0.2)" fill="#2E353B"/>
                </g>
            </svg>

        </div>

        <!-- Filter buttons -->
        <div class="relative bg-dark-400 h-10 ml-4 mr-4 mt-4 rounded-full">
            <form class="custom-radiobuttons h-full w-full flex justify-between items-center pl-1 pr-1">
                <input class="hidden" checked type="radio" name="type" value="all" id="all">
                <label class="flex-auto pt-1 pb-1 rounded-full text-center align-bottom" for="all">all</label>
                <input class="hidden" type="radio" name="type" value="normal" id="normal">
                <label class="flex-auto pt-1 pb-1 rounded-full text-center" for="normal">normal</label>
                <input class="hidden" type="radio" name="type" value="electric" id="electric">
                <label class="flex-auto pt-1 pb-1 rounded-full text-center" for="electric">electric</label>
                <input class="hidden" type="radio" name="type" value="estep" id="estep">
                <label class="flex-auto pt-1 pb-1 rounded-full text-center" for="estep">e-step</label>
            </form>
        </div>

        <!-- Content -->
        <div class="h-auto w-full pl-4 pr-4 mt-8">
            <ul class="w-full">
                <li v-for="item in 20" :key="item" class="flex h-28 justify-between mt-4">
                    <div class="bg-dark-400 rounded-2xl">
                        <img class="" src="../assets/images/bike01.png" alt="">
                    </div>
                    <div class="flex flex-col justify-around flex-grow pl-4">
                        <h1 class="text-dark-400">124 - Stationstraat</h1>
                        <p class="text-dark-600">stationstraat</p>
                        <div class="flex items-center">

                            <svg class="h-6 w-8" viewBox="0 0 10.988 14.868">
                                <path d="M5.494,14.868a.353.353,0,0,1-.272-.128C5.009,14.484,0,8.425,0,5.494a5.494,5.494,0,0,1,10.988,0c0,2.933-5.009,8.99-5.222,9.247A.354.354,0,0,1,5.494,14.868ZM5.5,3A2.5,2.5,0,1,0,8,5.5,2.5,2.5,0,0,0,5.5,3Z" fill="#dedede"/>
                            </svg>

                            <p class="ml-2 text-dark-600">1.2km</p>
                        </div>
                        <div class="flex items-center">
                            <svg class="h-4 w-8" viewBox="0 0 18.005 11.675">
                                <path d="M14.314,53.763a3.812,3.812,0,0,0-.89.1l-1.137-2.948h.37a2.253,2.253,0,0,0,1.552-.6l.392-.363a.421.421,0,0,0,.009-.611.461.461,0,0,0-.636-.008l-.392.359a1.341,1.341,0,0,1-.926.354H11.639a.463.463,0,0,0-.369.2.43.43,0,0,0-.052.4l.433,1.121s-.006.008-.008.008,0,.008,0,.008H5.884l-.777-1.263.844-.283a.422.422,0,0,0,.3-.472.437.437,0,0,0-.444-.353H3.334A.609.609,0,0,0,2.705,50a.952.952,0,0,0,.971.932,1.009,1.009,0,0,0,.316-.054l.246-.083.788,1.272-.605,1.752a3.805,3.805,0,0,0-.611-.069,3.729,3.729,0,0,0-2.772,1.082A3.466,3.466,0,0,0,0,57.427,3.632,3.632,0,0,0,3.57,60.87l.12,0a3.731,3.731,0,0,0,2.651-1.087,3.53,3.53,0,0,0,1.013-2.047h.723a.988.988,0,0,0,.578.21.875.875,0,0,0,.891-.858.827.827,0,0,0-.116-.422l2.521-4.125.633,1.636a3.549,3.549,0,0,0-1.961,3.144,3.693,3.693,0,1,0,3.691-3.56Zm-3.462-1.116-2.2,3.592s0,0,0,0-.005.006-.008.006L6.421,52.647h4.432Zm-5.216.405,2.241,3.616a1.132,1.132,0,0,0-.085.2H7.353a3.6,3.6,0,0,0-2.078-2.777ZM4.464,56.87a.53.53,0,0,0-.1-.129l.532-1.54A2.467,2.467,0,0,1,6.141,56.87ZM5.48,58.979a2.517,2.517,0,0,1-1.872.732A2.45,2.45,0,0,1,1.2,57.389a2.339,2.339,0,0,1,.7-1.751,2.516,2.516,0,0,1,1.79-.731h.082a2.582,2.582,0,0,1,.266.023L3.5,56.488a.855.855,0,0,0,.2,1.693.846.846,0,0,0,.776-.443H6.141A2.368,2.368,0,0,1,5.48,58.979Zm8.834.747a2.451,2.451,0,0,1-2.492-2.4,2.387,2.387,0,0,1,1.186-2.046l.845,2.186a.45.45,0,0,0,.421.282.461.461,0,0,0,.157-.028.429.429,0,0,0,.264-.558l-.85-2.2a2.58,2.58,0,0,1,.467-.043,2.4,2.4,0,1,1,0,4.807Z" transform="translate(0 -49.208)" fill="#dedede"/>
                            </svg>
                            <p class="ml-2 text-dark-600">12</p>
                        </div>

                    </div>
                    <svg class="h-full w-6" viewBox="0 0 24 21.208">
                        <g transform="translate(0 -27.5)">
                            <path d="M22.01,29.506a6.8,6.8,0,0,0-9.631.005l-.371.371-.381-.381A6.809,6.809,0,0,0,0,34.314a6.751,6.751,0,0,0,2,4.813L11.276,48.4a1.041,1.041,0,0,0,.736.3,1.059,1.059,0,0,0,.736-.3L22,39.142a6.815,6.815,0,0,0,.01-9.637Z" fill="#dedede"/>
                        </g>
                    </svg>

                </li>
                <li></li>
                <li></li>
            </ul>

        </div>
        <!-- <nav class="fixed bottom-20 w-full">
            <div class="relative h-16 w-16 top-8 left-8 -ml-4 -mt-4">
                <div class="absolute h-full w-full bg-dark-accent rounded-full opacity-50">

                </div>
                <div class="absolute h-5/6 w-5/6 top-8 left-8 -ml-4 -mt-4 bg-dark-accent rounded-full flex items-center justify-center">
                    <svg class="w-3/6 h-3/6" viewBox="0 0 27.242 27.242">
                        <g transform="translate(531.5 775)">
                            <g transform="translate(-530 -773.5)">
                            <line y1="7" transform="translate(0 0.5)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="3"/>
                            <line y1="6.66" transform="translate(6.793 0) rotate(90)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="3"/>
                            </g>
                            <g  transform="translate(-505.758 -773.5) rotate(90)">
                            <line y1="6.66" transform="translate(0 0.133)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="3"/>
                            <line y1="6.66" transform="translate(6.793 0) rotate(90)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="3"/>
                            </g>
                            <g  transform="translate(-505.758 -749.258) rotate(180)">
                            <line y1="6.66" transform="translate(0 0.133)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="3"/>
                            <line y1="6.66" transform="translate(6.793 0) rotate(90)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="3"/>
                            </g>
                            <g  transform="translate(-530 -749.258) rotate(-90)">
                            <line y1="6.66" transform="translate(0 0.133)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="3"/>
                            <line y1="6.66" transform="translate(6.793 0) rotate(90)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="3"/>
                            </g>
                            <line x2="12" transform="translate(-523.812 -761.512)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="3"/>
                            <line y2="12" transform="translate(-517.812 -767.512)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="3"/>
                        </g>
                    </svg>
                </div>

            </div>
        </nav> -->

        <!-- <div class="bg-dark-400 h-10 ml-4 mr-4 rounded-full flex justify-between content-center">
            <svg class="m-1 ml-2 p-1" viewBox="0 0 75.749 75.749">
                <g>
                    <path d="M74.795,70.55,53.061,48.783a29.4,29.4,0,0,0,6.862-18.893A29.963,29.963,0,1,0,29.946,59.6a30.011,30.011,0,0,0,18.6-6.432L70.355,74.994a3.141,3.141,0,0,0,4.44-4.444ZM6.365,29.906a23.582,23.582,0,0,1,47.162,0,23.582,23.582,0,0,1-47.162,0Z" transform="translate(0 -0.2)" fill="#2E353B"/>
                </g>
            </svg>
            <input class="w-full h-full rounded-full bg-transparent" type="text">
            <router-link class="" to="/">
                <img class="h-10 w-10 rounded-full object-cover" src="../assets/images/profile_pic.png"/>
            </router-link>

        </div> -->
    </div>
</template>