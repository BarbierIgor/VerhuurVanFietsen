<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>

<template>
    <div class="relative h-screen w-screen">
        <!-- map -->
        <div class="w-full h-full bg-dark-400 opacity-20">

        </div>

        <!-- content -->
        <div 
            class="
                w-full h-full p-4 
                absolute top-0 left-0
            "
        >
            <div class="flex items-center" >    
                <div @click="$router.go(-1)" class="h-10 w-10 bg-dark-400 rounded-full mr-4 flex justify-center items-center">
                    <svg class="w-2/4 h-2/4 -ml-1" viewBox="0 0 16.192 22.396">
                        <g transform="translate(-85.87 -25.598)">
                            <line x2="11.942" transform="translate(89.392 36.796) rotate(40)" fill="none" stroke="#2e353b" stroke-linecap="round" stroke-width="5"/>
                            <line x2="11.942" transform="translate(89.392 36.796) rotate(-40)" fill="none" stroke="#2e353b" stroke-linecap="round" stroke-width="5"/>
                        </g>
                    </svg>
                </div>
                <div class="h-10 w-20 bg-dark-400 rounded-full mr-4 flex justify-evenly items-center">
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


                    <!-- <svg class="w-2/4 h-2/4" viewBox="0 0 19.047 25.773">
                        <path d="M50.626,0A9.534,9.534,0,0,0,41.1,9.523c0,5.084,8.682,15.584,9.052,16.028a.614.614,0,0,0,.944,0c.37-.445,9.052-10.944,9.052-16.028A9.534,9.534,0,0,0,50.626,0Zm0,24.186c-.77-.961-2.369-3.009-3.952-5.351-2.842-4.2-4.344-7.424-4.344-9.311a8.3,8.3,0,1,1,16.592,0c0,1.888-1.5,5.107-4.344,9.311C53,21.176,51.4,23.224,50.626,24.186Z" transform="translate(-41.103)" fill="#2e353b"/>
                        <path d="M100.824,57.5a5.285,5.285,0,1,0,4.824,5.265A5.065,5.065,0,0,0,100.824,57.5Zm0,9.245a4,4,0,1,1,3.647-3.981A3.829,3.829,0,0,1,100.824,66.745Z" transform="translate(-91.3 -52.935)" fill="#2e353b"/>
                    </svg> -->
                </div>

                <button class="w-full h-12 px-6 bg-dark-success font-bold rounded-lg text-dark-400 text-md">START</button>
            </div>

        </div>

    </div>
</template>