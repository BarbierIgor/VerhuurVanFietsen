<script lang="ts">
import { defineComponent } from 'vue'
import router from '../bootstrap/router';

export default defineComponent({
    props: {
        page: {type: String, default: 'home'},
    },
    methods: {
        handleMapsClick() {
            router.push({ path: '/map' })
        },
        handleScanClick() {
            router.push({ path: '/scan' })
        },
        handleMapsCenter() {
            this.$emit('handleMapCenter')
        }
    },

    setup() {
        
    },
})
</script>


<template>
    <div class="flex w-full h-20 fixed bottom-8 left-0 right-0 items-center justify-around">
            <div class="w-1/3 h-16 flex-grow"></div>
            <div class="w-fit">               
                <div @click="handleScanClick" class="relative w-20 h-20 ml-auto mr-auto flex justify-center items-center">
                    <span class="absolute bg-dark-accent w-20 h-full rounded-full opacity-30"></span>
                    <span class="absolute bg-dark-accent w-3/4 h-3/4 rounded-full"></span>

                    <svg class="absolute w-1/3 h-1/3" viewBox="0 0 27.242 27.242">
                        <g id="Group_29" data-name="Group 29" transform="translate(531.5 775)">
                            <g id="Group_28" data-name="Group 28" transform="translate(-530 -773.5)">
                            <path id="Line_6" data-name="Line 6" d="M0,8.5A1.5,1.5,0,0,1-1.5,7V0A1.5,1.5,0,0,1,0-1.5,1.5,1.5,0,0,1,1.5,0V7A1.5,1.5,0,0,1,0,8.5Z" transform="translate(0 0.5)" fill="#dedede"/>
                            <path id="Line_7" data-name="Line 7" d="M0,8.16a1.5,1.5,0,0,1-1.5-1.5V0A1.5,1.5,0,0,1,0-1.5,1.5,1.5,0,0,1,1.5,0V6.66A1.5,1.5,0,0,1,0,8.16Z" transform="translate(6.793 0) rotate(90)" fill="#dedede"/>
                            </g>
                            <g id="Group_25" data-name="Group 25" transform="translate(-505.758 -773.5) rotate(90)">
                            <path id="Line_8" data-name="Line 8" d="M0,8.16a1.5,1.5,0,0,1-1.5-1.5V0A1.5,1.5,0,0,1,0-1.5,1.5,1.5,0,0,1,1.5,0V6.66A1.5,1.5,0,0,1,0,8.16Z" transform="translate(0 0.133)" fill="#dedede"/>
                            <path id="Line_9" data-name="Line 9" d="M0,8.16a1.5,1.5,0,0,1-1.5-1.5V0A1.5,1.5,0,0,1,0-1.5,1.5,1.5,0,0,1,1.5,0V6.66A1.5,1.5,0,0,1,0,8.16Z" transform="translate(6.793 0) rotate(90)" fill="#dedede"/>
                            </g>
                            <g id="Group_26" data-name="Group 26" transform="translate(-505.758 -749.258) rotate(180)">
                            <path id="Line_8-2" data-name="Line 8" d="M0,8.16a1.5,1.5,0,0,1-1.5-1.5V0A1.5,1.5,0,0,1,0-1.5,1.5,1.5,0,0,1,1.5,0V6.66A1.5,1.5,0,0,1,0,8.16Z" transform="translate(0 0.133)" fill="#dedede"/>
                            <path id="Line_9-2" data-name="Line 9" d="M0,8.16a1.5,1.5,0,0,1-1.5-1.5V0A1.5,1.5,0,0,1,0-1.5,1.5,1.5,0,0,1,1.5,0V6.66A1.5,1.5,0,0,1,0,8.16Z" transform="translate(6.793 0) rotate(90)" fill="#dedede"/>
                            </g>
                            <g id="Group_27" data-name="Group 27" transform="translate(-530 -749.258) rotate(-90)">
                            <path id="Line_8-3" data-name="Line 8" d="M0,8.16a1.5,1.5,0,0,1-1.5-1.5V0A1.5,1.5,0,0,1,0-1.5,1.5,1.5,0,0,1,1.5,0V6.66A1.5,1.5,0,0,1,0,8.16Z" transform="translate(0 0.133)" fill="#dedede"/>
                            <path id="Line_9-3" data-name="Line 9" d="M0,8.16a1.5,1.5,0,0,1-1.5-1.5V0A1.5,1.5,0,0,1,0-1.5,1.5,1.5,0,0,1,1.5,0V6.66A1.5,1.5,0,0,1,0,8.16Z" transform="translate(6.793 0) rotate(90)" fill="#dedede"/>
                            </g>
                            <path id="Line_10" data-name="Line 10" d="M12,1.5H0A1.5,1.5,0,0,1-1.5,0,1.5,1.5,0,0,1,0-1.5H12A1.5,1.5,0,0,1,13.5,0,1.5,1.5,0,0,1,12,1.5Z" transform="translate(-523.812 -761.512)" fill="#dedede"/>
                            <path id="Line_20" data-name="Line 20" d="M0,13.5A1.5,1.5,0,0,1-1.5,12V0A1.5,1.5,0,0,1,0-1.5,1.5,1.5,0,0,1,1.5,0V12A1.5,1.5,0,0,1,0,13.5Z" transform="translate(-517.812 -767.512)" fill="#dedede"/>
                        </g>
                    </svg>

                </div>
            </div>
            


            <div v-if="$props.page == 'home'" class="w-1/3 h-16 flex justify-center items-center flex-grow">
                <div @click="handleMapsClick" class="bg-dark-400 w-12 h-12 rounded-full flex justify-center items-center">
                    <svg class="w-2/4 h-2/4" viewBox="0 0 19.047 25.773">
                        <path d="M50.626,0A9.534,9.534,0,0,0,41.1,9.523c0,5.084,8.682,15.584,9.052,16.028a.614.614,0,0,0,.944,0c.37-.445,9.052-10.944,9.052-16.028A9.534,9.534,0,0,0,50.626,0Zm0,24.186c-.77-.961-2.369-3.009-3.952-5.351-2.842-4.2-4.344-7.424-4.344-9.311a8.3,8.3,0,1,1,16.592,0c0,1.888-1.5,5.107-4.344,9.311C53,21.176,51.4,23.224,50.626,24.186Z" transform="translate(-41.103)" fill="#2e353b"/>
                        <path d="M100.824,57.5a5.285,5.285,0,1,0,4.824,5.265A5.065,5.065,0,0,0,100.824,57.5Zm0,9.245a4,4,0,1,1,3.647-3.981A3.829,3.829,0,0,1,100.824,66.745Z" transform="translate(-91.3 -52.935)" fill="#2e353b"/>
                    </svg>
                </div>
            </div>

            <div v-if="$props.page == 'map'" class="w-1/3 h-16 flex justify-center items-center flex-grow">
                <div @click="handleMapsCenter" class="bg-dark-400 w-12 h-12 rounded-full flex justify-center items-center">
                    <svg class="w-2/4 h-2/4" viewBox="0 0 20.584 21.037">
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
            </div>

        </div>
</template>