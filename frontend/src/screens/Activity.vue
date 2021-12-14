<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            isActivityActive: false,
        }
    },
    methods: {
        handleActivityStartStop() {
            console.log('test')
            this.isActivityActive = !this.isActivityActive;
        },
    },
    setup() {
        
    },
})
</script>

<template>
    <div class="relative h-screen w-screen">
        <!-- map -->
        <div class="w-full h-full bg-dark-900 opacity-20">

        </div>

        <!-- content -->
        <div 
            class="
                w-full h-full p-4 
                absolute top-0 left-0
            "
        >
            <div class="flex items-center" >    
                <div 
                    @click="$router.go(-1)" 
                    class="h-10 w-10 bg-dark-400 rounded-full mr-4 flex justify-center items-center transition-all duration-500"
                    :class="isActivityActive ? 'scale-0 opacity-0' : 'scale-100 opacity-100'"
                >
                    <!-- :class="isActivityActive ? '-translate-x-18' : 'translate-x-0'" -->
                    <svg class="w-2/4 h-2/4 -ml-1" viewBox="0 0 16.192 22.396">
                        <g transform="translate(-85.87 -25.598)">
                            <line x2="11.942" transform="translate(89.392 36.796) rotate(40)" fill="none" stroke="#2e353b" stroke-linecap="round" stroke-width="5"/>
                            <line x2="11.942" transform="translate(89.392 36.796) rotate(-40)" fill="none" stroke="#2e353b" stroke-linecap="round" stroke-width="5"/>
                        </g>
                    </svg>
                </div>
                <div 
                    class="h-10 w-20 bg-dark-400 rounded-full mr-4 flex justify-evenly items-center transition-transform duration-500"
                    :class="isActivityActive ? '-translate-x-14' : 'translate-x-0'"    
                >
                    <div>
                        <svg class="h-6 w-4" viewBox="0 0 13 25">
                            <g transform="translate(-2057 873)">
                                <path d="M11.593,25H1.407A1.427,1.427,0,0,1,0,23.557V3.11A1.427,1.427,0,0,1,1.407,1.666H4.062V0H8.937V1.666h2.656A1.427,1.427,0,0,1,13,3.11V23.557A1.427,1.427,0,0,1,11.593,25ZM1.625,2.5a.824.824,0,0,0-.812.833v20a.824.824,0,0,0,.812.833h9.75a.824.824,0,0,0,.812-.833v-20a.824.824,0,0,0-.812-.833Z" transform="translate(2057 -873)" fill="#2e353b"/>
                                <path d="M.812,0H9.75a.823.823,0,0,1,.812.833V11.667a.823.823,0,0,1-.812.833H.812A.823.823,0,0,1,0,11.667V.833A.823.823,0,0,1,.812,0Z" transform="translate(2058.219 -861.75)" fill="#46e6a6"/>
                            </g>
                        </svg>
                    </div>

                    <div>
                        <p class="text-xs text-dark-900">2h</p>
                        <p class="text-xs text-dark-600">66%</p>
                    </div>
                </div>
            </div>


            <div class="fixed bottom-6 left-0 w-full px-6 flex flex-col items-end">

                <div class="bg-dark-400 w-12 h-12 rounded-full flex justify-center items-center mb-6">
                    <svg class="w-2/5 h-2/5" viewBox="0 0 20.584 21.037">
                        <g transform="translate(1 1)">
                            <g transform="translate(3.31 3.536)" fill="none">
                                <path d="M5.982,0A5.982,5.982,0,1,1,0,5.982a6.155,6.155,0,0,1,.8-3A5.9,5.9,0,0,1,5.982,0Z" stroke="none"/>
                                <path d="M 5.982109069824219 -9.5367431640625e-07 C 3.692559242248535 -9.5367431640625e-07 1.703418731689453 1.286238670349121 0.8028287887573242 2.986688613891602 C 0.2524290084838867 4.012518882751465 -9.5367431640625e-07 4.96782922744751 -9.5367431640625e-07 5.982109069824219 C -9.5367431640625e-07 9.28593921661377 2.678278923034668 11.96421909332275 5.982109069824219 11.96421909332275 C 9.28593921661377 11.96421909332275 11.96421909332275 9.28593921661377 11.96421909332275 5.982109069824219 C 11.96421909332275 2.678278923034668 9.28593921661377 -9.5367431640625e-07 5.982109069824219 -9.5367431640625e-07 M 5.982109069824219 -2.000000953674316 C 10.38345909118652 -2.000000953674316 13.96421909332275 1.580759048461914 13.96421909332275 5.982109069824219 C 13.96421909332275 10.38345909118652 10.38345909118652 13.96421909332275 5.982109069824219 13.96421909332275 C 1.580759048461914 13.96421909332275 -2.000000953674316 10.38345909118652 -2.000000953674316 5.982109069824219 C -2.000000953674316 4.636691093444824 -1.660500526428223 3.349104881286621 -0.962005615234375 2.045754432678223 C 0.3422393798828125 -0.4120845794677734 3.067317008972168 -2.000000953674316 5.982109069824219 -2.000000953674316 Z" stroke="none" fill="#2e353b"/>
                            </g>
                            <line y1="2.266" transform="translate(9.292)" fill="none" stroke="#2e353b" stroke-linecap="round" stroke-width="2"/>
                            <line y1="2.266" transform="translate(9.292 16.771)" fill="none" stroke="#2e353b" stroke-linecap="round" stroke-width="2"/>
                            <line y1="2.266" transform="translate(18.584 9.745) rotate(90)" fill="none" stroke="#2e353b" stroke-linecap="round" stroke-width="2"/>
                            <line y1="2.266" transform="translate(2.266 9.745) rotate(90)" fill="none" stroke="#2e353b" stroke-linecap="round" stroke-width="2"/>
                            <circle cx="3.167" cy="3.167" r="3.167" transform="translate(6.125 6.703)" fill="#2e353b"/>
                        </g>
                    </svg>
                </div>

                <!-- info -->
                <div 
                    class="
                        h-32 w-full
                        transition-all duration-500 ease-in-out
                        grid gap-4
                        grid-cols-3
                    "
                    :class="
                        isActivityActive ?
                        'max-h-32 opacity-100 pointer-events-auto mb-4' :
                        'max-h-0 opacity-0 pointer-events-none mb-0'
                    "
                >
                    <div 
                        class="h-full rounded-lg bg-dark-400 flex flex-col justify-evenly items-center overflow-hidden
                            transition duration-500
                        "
                        :class="isActivityActive ? 'opacity-100' : 'opacity-0' "
                    >
                        <svg class="h-6 w-6" viewBox="0 0 28 28">
                            <path d="M371.189,361.709c-.144,0-.289-.009-.438-.009-.089,0-.177,0-.261,0q-.35.007-.7.028a14.027,14.027,0,0,0-12.406,9.787c-.075.233-.14.471-.2.708s-.112.471-.158.7a14,14,0,1,0,14.163-11.222Zm3.663,20.734a4.961,4.961,0,0,1-2.764,1.426v.559a.927.927,0,0,1-.927.927h-.5a.927.927,0,0,1-.927-.927v-.583a6.491,6.491,0,0,1-1.71-.578,4.237,4.237,0,0,1-1.6-1.533,4.876,4.876,0,0,1-.643-1.612.9.9,0,0,1,.1-.643.928.928,0,0,1,.648-.457l.5-.089a.8.8,0,0,1,.3,0,.922.922,0,0,1,.755.685,3.45,3.45,0,0,0,.569,1.286,2.97,2.97,0,0,0,2.344,1.086h0a3.27,3.27,0,0,0,.475-.037,2.691,2.691,0,0,0,2.354-2.778,2.345,2.345,0,0,0-.461-1.519,4.23,4.23,0,0,0-2.4-1.184c-.405-.093-.792-.182-1.174-.289a8.582,8.582,0,0,1-1.855-.746,3.672,3.672,0,0,1-1.459-1.463,4.346,4.346,0,0,1-.508-2.107c0-.093,0-.182,0-.27a5.558,5.558,0,0,1,.093-.76,4.362,4.362,0,0,1,.256-.825,4.254,4.254,0,0,1,1.123-1.529,4.174,4.174,0,0,1,1.16-.7,5.571,5.571,0,0,1,1.119-.326V366.7a.916.916,0,0,1,.061-.322.927.927,0,0,1,.7-.587,1.015,1.015,0,0,1,.168-.014h.531a.926.926,0,0,1,.9.923v.769a4.8,4.8,0,0,1,2.135.951,4.178,4.178,0,0,1,1.286,1.855.924.924,0,0,1-.736,1.221l-.489.075a.924.924,0,0,1-1.011-.615,2.423,2.423,0,0,0-.471-.848,2.538,2.538,0,0,0-1.906-.778,3.273,3.273,0,0,0-.68.075,3.115,3.115,0,0,0-.419.126,2.546,2.546,0,0,0-.974.652,2.354,2.354,0,0,0-.3.424,2.449,2.449,0,0,0,.21,2.605,2.8,2.8,0,0,0,1.063.764,9.153,9.153,0,0,0,1.818.5,8.96,8.96,0,0,1,1.85.508,4.878,4.878,0,0,1,1.487.979,4.009,4.009,0,0,1,.895,1.379,5.028,5.028,0,0,1-.974,5.1Z" transform="translate(-356.751 -361.7)" fill="#2e353b"/>
                        </svg>

                        <p class="text-lg font-semibold">
                            €5.75
                        </p>
                    </div>

                    <div 
                        class="h-full rounded-lg bg-dark-400 flex flex-col justify-evenly items-center overflow-hidden
                            transition duration-500
                        "
                        :class="isActivityActive ? 'opacity-100' : 'opacity-0' "
                    >
                        <p class="text-2xl font-semibold">
                            17
                        </p>

                        <p class="text-md font-semibold">
                            km/h
                        </p>
                    </div>

                    <div 
                        class="h-full rounded-lg bg-dark-400 flex flex-col justify-evenly items-center overflow-hidden
                            transition duration-500
                        "
                        :class="isActivityActive ? 'opacity-100' : 'opacity-0' "
                    >
                        <svg class="h-6 w-6" viewBox="0 0 28 28">
                            <path d="M371.189,361.709c-.144,0-.289-.009-.438-.009-.089,0-.177,0-.261,0q-.35.007-.7.028a14.027,14.027,0,0,0-12.406,9.787c-.075.233-.14.471-.2.708s-.112.471-.158.7a14,14,0,1,0,14.163-11.222Zm3.663,20.734a4.961,4.961,0,0,1-2.764,1.426v.559a.927.927,0,0,1-.927.927h-.5a.927.927,0,0,1-.927-.927v-.583a6.491,6.491,0,0,1-1.71-.578,4.237,4.237,0,0,1-1.6-1.533,4.876,4.876,0,0,1-.643-1.612.9.9,0,0,1,.1-.643.928.928,0,0,1,.648-.457l.5-.089a.8.8,0,0,1,.3,0,.922.922,0,0,1,.755.685,3.45,3.45,0,0,0,.569,1.286,2.97,2.97,0,0,0,2.344,1.086h0a3.27,3.27,0,0,0,.475-.037,2.691,2.691,0,0,0,2.354-2.778,2.345,2.345,0,0,0-.461-1.519,4.23,4.23,0,0,0-2.4-1.184c-.405-.093-.792-.182-1.174-.289a8.582,8.582,0,0,1-1.855-.746,3.672,3.672,0,0,1-1.459-1.463,4.346,4.346,0,0,1-.508-2.107c0-.093,0-.182,0-.27a5.558,5.558,0,0,1,.093-.76,4.362,4.362,0,0,1,.256-.825,4.254,4.254,0,0,1,1.123-1.529,4.174,4.174,0,0,1,1.16-.7,5.571,5.571,0,0,1,1.119-.326V366.7a.916.916,0,0,1,.061-.322.927.927,0,0,1,.7-.587,1.015,1.015,0,0,1,.168-.014h.531a.926.926,0,0,1,.9.923v.769a4.8,4.8,0,0,1,2.135.951,4.178,4.178,0,0,1,1.286,1.855.924.924,0,0,1-.736,1.221l-.489.075a.924.924,0,0,1-1.011-.615,2.423,2.423,0,0,0-.471-.848,2.538,2.538,0,0,0-1.906-.778,3.273,3.273,0,0,0-.68.075,3.115,3.115,0,0,0-.419.126,2.546,2.546,0,0,0-.974.652,2.354,2.354,0,0,0-.3.424,2.449,2.449,0,0,0,.21,2.605,2.8,2.8,0,0,0,1.063.764,9.153,9.153,0,0,0,1.818.5,8.96,8.96,0,0,1,1.85.508,4.878,4.878,0,0,1,1.487.979,4.009,4.009,0,0,1,.895,1.379,5.028,5.028,0,0,1-.974,5.1Z" transform="translate(-356.751 -361.7)" fill="#2e353b"/>
                        </svg>

                        <p class="text-lg font-semibold">
                            €5.75
                        </p>
                    </div>
                </div>

                <button 
                    ref="startStopButton"
                    @click="handleActivityStartStop"
                    class="
                        w-full h-12 px-6 font-bold rounded-lg text-dark-400 text-md
                        transition-colors duration-300
                    "
                    :class="isActivityActive ? 'bg-dark-accent' : 'bg-dark-success'"
                >
                    {{ isActivityActive ? 'STOP' : 'START'}}
                </button>
            </div>

        </div>

    </div>
</template>