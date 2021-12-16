<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'

export default defineComponent({
    data() {
        return {
            rating: 0,
            paymentMethod: 0,
        }
    },
    methods: {
        handleRating(index: number) {
            console.log(index)
            // this.rating = index

            this.rating = index
        },
        handlePaymentInput(e: any) {
            console.log('handlePaymentInput')
            const scrollView = this.$refs.scrollview
            const item = e.currentTarget.parentNode

            scrollView.scroll({
                left: item.offsetLeft,
                behavior: 'smooth'
            });
        },
        handleFinish() {
            
        },
    },
    setup() {
    },
    components: { Header }
})
</script>

<template>
    <div class="p-4">
        <Header title="End of ride"></Header>

        <!-- info -->
        <div 
            class="
                h-32 w-full
                transition-all duration-500 ease-in-out
                grid gap-4
                grid-cols-3
                mt-8
            "
        >
            <div 
                class="h-full rounded-lg bg-dark-400 flex flex-col justify-evenly items-center overflow-hidden
                    transition duration-500
                "
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
            >
                <p class="text-md font-semibold">
                    km
                </p>

                <p class="text-xl font-semibold">
                    4.3
                </p>
            </div>

            <div 
                class="h-full rounded-lg bg-dark-400 flex flex-col justify-evenly items-center overflow-hidden
                    transition duration-500
                "
            >
                <svg class="h-6 w-6" viewBox="0 0 28 28">
                    <g transform="translate(-38.132 -24)">
                        <path d="M371.189,361.709c-.144,0-.289-.009-.438-.009-.089,0-.177,0-.261,0q-.35.007-.7.028a14.027,14.027,0,0,0-12.406,9.787c-.075.233-.14.471-.2.708s-.112.471-.158.7a14,14,0,1,0,14.163-11.222Z" transform="translate(-318.619 -337.7)" fill="#2e353b"/>
                        <path d="M0,9A1,1,0,0,1-1,8V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V8A1,1,0,0,1,0,9Z" transform="translate(52 30)" fill="#dedede"/>
                        <path d="M4.5,5.5a1,1,0,0,1-.707-.293l-4.5-4.5a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l4.5,4.5A1,1,0,0,1,4.5,5.5Z" transform="translate(52.132 38)" fill="#dedede"/>
                    </g>
                </svg>

                <p class="text-lg font-semibold">
                    €5.75
                </p>
            </div>
        </div>

        <!-- Rating -->
        <div class="mt-8">
            <p class="text-dark-600 font-semibold text-lg">Please rate this ride</p>
            <div class="flex flex-row mt-4">
                <svg @click="handleRating(i)" v-for="i in 5" :key="i" class="w-6 h-6 mr-4 stroke-dark-accent transition-all duration-200" :class="rating >= i ? 'fill-dark-accent' : 'fill-transparent'" viewBox="0 0 34.06 34.048">
                    <path id="Path_54" data-name="Path 54" d="M31.188,19.328a2.866,2.866,0,0,0,.68-2.871A2.7,2.7,0,0,0,29.7,14.551l-7.778-1.178a.044.044,0,0,1-.033-.025L18.41,6a2.639,2.639,0,0,0-4.818,0l-3.478,7.347a.044.044,0,0,1-.033.025L2.3,14.551A2.7,2.7,0,0,0,.134,16.458a2.866,2.866,0,0,0,.68,2.871l5.628,5.719a.046.046,0,0,1,.012.04L5.126,33.163A2.839,2.839,0,0,0,6.195,35.9a2.579,2.579,0,0,0,2.829.213L15.981,32.3a.042.042,0,0,1,.041,0l6.957,3.813a2.579,2.579,0,0,0,2.829-.213,2.84,2.84,0,0,0,1.069-2.739l-1.329-8.075a.047.047,0,0,1,.012-.04Z" transform="translate(1.029 -3.44)"/>
                </svg>
            </div>
        </div>

        <div class="mt-8 w-full">
            <p class="text-dark-600 font-semibold text-lg">Choose payment method</p>
            <div ref="scrollview" class="w-screen -ml-4 overflow-x-scroll snap-x">
                <ul class="w-fit flex flex-nowrap items-center space-x-8 py-4 mr-24 ml-24">

                    <li class="h-32 w-48 snap-center inline-block bg-dark-600 rounded-lg">
                        <input @change="handlePaymentInput($event)" class="peer" v-model="paymentMethod" type="radio" :value="1" hidden name="payment" id="method1">
                        <label for="method1" 
                            class="
                                bg-dark-600 w-full h-full rounded-lg outline-opacity-30
                                peer-checked:outline peer-checked:outline-4 peer-checked:outline-dark-accent
                                flex flex-col justify-evenly items-center py-4
                                transition-all duration-200
                            "
                        >
                            <svg class="w-16 h-16" viewBox="0 0 46 54">
                                <g transform="translate(25.12 -422.721)">
                                    <path d="M12.216,51.323l.94-5.94-2.094-.048h-10L8.011,1.5a.578.578,0,0,1,.194-.343.569.569,0,0,1,.37-.136H25.438c5.6,0,9.461,1.159,11.478,3.446A7.842,7.842,0,0,1,38.755,7.9a12.31,12.31,0,0,1,.013,4.728l-.022.138v1.209l.946.533a6.629,6.629,0,0,1,1.915,1.452,6.744,6.744,0,0,1,1.553,3.465,14.582,14.582,0,0,1-.221,5.028,17.646,17.646,0,0,1-2.071,5.692,11.73,11.73,0,0,1-3.281,3.576A13.344,13.344,0,0,1,33.168,35.7a22.148,22.148,0,0,1-5.523.635H26.333a3.992,3.992,0,0,0-2.565.939,3.946,3.946,0,0,0-1.337,2.375l-.1.535L20.67,50.653l-.076.384a.33.33,0,0,1-.1.224.279.279,0,0,1-.173.063h-8.1Z" transform="translate(-24.262 423.548)" fill="#253b80"/>
                                    <path d="M36.669,7.667h0q-.076.485-.174.994C34.259,20.143,26.608,24.11,16.836,24.11H11.861a2.416,2.416,0,0,0-2.388,2.047h0L6.925,42.312,6.2,46.891A1.273,1.273,0,0,0,7.46,48.363h8.824a2.124,2.124,0,0,0,2.1-1.79l.087-.448L20.13,35.581,20.237,35a2.122,2.122,0,0,1,2.1-1.793h1.32c8.55,0,15.242-3.471,17.2-13.516.817-4.2.394-7.7-1.768-10.164A8.437,8.437,0,0,0,36.669,7.667Z" transform="translate(-20.36 428.358)" fill="#179bd7"/>
                                    <path d="M32.862,7.51q-.513-.149-1.056-.271t-1.119-.212a27.632,27.632,0,0,0-4.386-.32H13.009a2.119,2.119,0,0,0-2.1,1.793L8.086,26.409l-.081.522a2.416,2.416,0,0,1,2.388-2.047h4.975c9.772,0,17.423-3.968,19.659-15.448.067-.34.123-.671.174-.994a11.921,11.921,0,0,0-1.839-.776C33.2,7.613,33.032,7.56,32.862,7.51Z" transform="translate(-18.892 427.943)" fill="#222d65"/>
                                    <path d="M17.282,13.759a2.09,2.09,0,0,1,1.172-1.566,2.115,2.115,0,0,1,.911-.206H32.581a27.632,27.632,0,0,1,4.361.316q.572.091,1.113.209t1.05.268c.169.05.336.1.5.154a12.07,12.07,0,0,1,1.828.767c.662-4.194-.005-7.05-2.287-9.636C36.631,1.219,32.092,0,26.284,0H9.423A2.4,2.4,0,0,0,7.041,2.025L.018,46.283a1.443,1.443,0,0,0,1.429,1.666h10.41L14.47,31.463Z" transform="translate(-25.12 422.721)" fill="#253b80"/>
                                </g>
                            </svg>

                            <p class="font-semibold text-2xl text-dark-400">Paypal</p>

                        </label>
                    </li>

                    <li class="h-32 w-48 snap-center inline-block bg-dark-success rounded-lg">
                        <input @change="handlePaymentInput($event)" class="peer" v-model="paymentMethod" type="radio" :value="2" hidden name="payment" id="method2">
                        <label for="method2" 
                            class="
                                bg-dark-600 w-full h-full rounded-lg outline-opacity-30
                                peer-checked:outline peer-checked:outline-4 peer-checked:outline-dark-accent
                                flex flex-col justify-evenly items-center py-4
                                transition-all duration-200
                            "
                        >
                            <svg class="w-24 h-16" viewBox="0 0 90 36">
                                <g transform="translate(-3680.8 -277.75)">
                                    <path d="M116.949,64.4H89.118L86.27,67.624,77.088,78.048h0l-2.847,3.224H46.765l2.776-3.26,1.317-1.54,2.776-3.26H41a4.292,4.292,0,0,0-4.2,4.334h0v9.17A4.269,4.269,0,0,0,41,91.051H89.473a10.689,10.689,0,0,0,7.011-3.224l7.332-8.382Z" transform="translate(3644 222.699)" fill="#004e91"/>
                                    <path d="M140.249,37.036a4.292,4.292,0,0,1,4.2,4.334v9.17a4.269,4.269,0,0,1-4.2,4.334H127.615l2.812-3.224h0l1.388-1.612,2.812-3.224H106.795L91.954,63.651H64.3L84.124,41.084l.747-.86A10.854,10.854,0,0,1,91.918,37h48.331Z" transform="translate(3626.351 240.75)" fill="#fd0"/>
                                </g>
                            </svg>


                            <p class="font-semibold text-2xl text-dark-400">Bancontact</p>

                        </label>
                    </li>

                    <li class="relative h-32 w-48 snap-center inline-block bg-dark-600 rounded-lg">
                        <input @change="handlePaymentInput($event)" class="peer" v-model="paymentMethod" type="radio" :value="3" hidden name="payment" id="method3">
                        <label for="method3" 
                            class="
                                bg-dark-600 w-full h-full rounded-lg outline-opacity-30
                                peer-checked:outline peer-checked:outline-4 peer-checked:outline-dark-accent
                                flex flex-col justify-evenly items-center py-4
                                transition-all duration-200
                            "
                        >
                            <svg class="w-24 h-16" viewBox="0 0 114 37">
                                <g transform="translate(-81.166 -105.048)">
                                    <path d="M442.767,146.544h-9.26l5.792-35.817h9.259Z" transform="translate(-312.193 -5.03)" fill="#00579f"/>
                                    <path d="M592.956,106.573a22.817,22.817,0,0,0-8.305-1.525c-9.144,0-15.584,4.877-15.623,11.85-.076,5.144,4.61,8,8.115,9.717,3.582,1.753,4.8,2.9,4.8,4.459-.036,2.4-2.895,3.506-5.561,3.506a18.428,18.428,0,0,1-8.688-1.905l-1.219-.572-1.3,8.04a28.179,28.179,0,0,0,10.327,1.906c9.716,0,16.042-4.8,16.117-12.232.037-4.077-2.438-7.2-7.773-9.754-3.239-1.639-5.222-2.744-5.222-4.421.038-1.524,1.678-3.086,5.334-3.086a15.731,15.731,0,0,1,6.9,1.371l.838.38,1.259-7.734Z" transform="translate(-428.886)" fill="#00579f"/>
                                    <path d="M804.848,133.855c.763-2.058,3.7-10.021,3.7-10.021-.039.076.761-2.1,1.218-3.429l.647,3.086s1.753,8.573,2.134,10.364Zm11.43-23.128h-7.163c-2.209,0-3.887.647-4.84,2.972l-13.754,32.845h9.716s1.6-4.421,1.943-5.373H814.07c.266,1.257,1.1,5.373,1.1,5.373h8.574l-7.47-35.817Z" transform="translate(-628.583 -5.03)" fill="#00579f"/>
                                    <path d="M188.7,110.727l-9.068,24.424-.991-4.953c-1.677-5.716-6.935-11.926-12.8-15.013l8.306,31.322h9.792l14.555-35.779Z" transform="translate(-74.992 -5.03)" fill="#00579f"/>
                                    <path d="M96.216,110.727h-14.9l-.152.724c11.622,2.972,19.318,10.135,22.481,18.746l-3.239-16.459c-.533-2.287-2.172-2.935-4.191-3.01Z" transform="translate(0 -5.03)" fill="#faa61a"/>
                                </g>
                            </svg>


                            <p class="font-semibold text-2xl text-dark-400">Visa</p>

                        </label>
                    </li>

                    <li class="relative h-32 w-48 snap-center inline-block bg-dark-600 rounded-lg">
                        <input @change="handlePaymentInput($event)" class="peer" v-model="paymentMethod" type="radio" :value="4" hidden name="payment" id="method4">
                        <label for="method4" 
                            class="
                                bg-dark-600 w-full h-full rounded-lg outline-opacity-30
                                peer-checked:outline peer-checked:outline-4 peer-checked:outline-dark-accent
                                flex flex-col justify-evenly items-center py-4
                                transition-all duration-200
                            "
                        >
                            <svg class="w-6 h-6" viewBox="0 0 28 28">
                                <path d="M371.189,361.709c-.144,0-.289-.009-.438-.009-.089,0-.177,0-.261,0q-.35.007-.7.028a14.027,14.027,0,0,0-12.406,9.787c-.075.233-.14.471-.2.708s-.112.471-.158.7a14,14,0,1,0,14.163-11.222Zm3.663,20.734a4.961,4.961,0,0,1-2.764,1.426v.559a.927.927,0,0,1-.927.927h-.5a.927.927,0,0,1-.927-.927v-.583a6.491,6.491,0,0,1-1.71-.578,4.237,4.237,0,0,1-1.6-1.533,4.876,4.876,0,0,1-.643-1.612.9.9,0,0,1,.1-.643.928.928,0,0,1,.648-.457l.5-.089a.8.8,0,0,1,.3,0,.922.922,0,0,1,.755.685,3.45,3.45,0,0,0,.569,1.286,2.97,2.97,0,0,0,2.344,1.086h0a3.27,3.27,0,0,0,.475-.037,2.691,2.691,0,0,0,2.354-2.778,2.345,2.345,0,0,0-.461-1.519,4.23,4.23,0,0,0-2.4-1.184c-.405-.093-.792-.182-1.174-.289a8.582,8.582,0,0,1-1.855-.746,3.672,3.672,0,0,1-1.459-1.463,4.346,4.346,0,0,1-.508-2.107c0-.093,0-.182,0-.27a5.558,5.558,0,0,1,.093-.76,4.362,4.362,0,0,1,.256-.825,4.254,4.254,0,0,1,1.123-1.529,4.174,4.174,0,0,1,1.16-.7,5.571,5.571,0,0,1,1.119-.326V366.7a.916.916,0,0,1,.061-.322.927.927,0,0,1,.7-.587,1.015,1.015,0,0,1,.168-.014h.531a.926.926,0,0,1,.9.923v.769a4.8,4.8,0,0,1,2.135.951,4.178,4.178,0,0,1,1.286,1.855.924.924,0,0,1-.736,1.221l-.489.075a.924.924,0,0,1-1.011-.615,2.423,2.423,0,0,0-.471-.848,2.538,2.538,0,0,0-1.906-.778,3.273,3.273,0,0,0-.68.075,3.115,3.115,0,0,0-.419.126,2.546,2.546,0,0,0-.974.652,2.354,2.354,0,0,0-.3.424,2.449,2.449,0,0,0,.21,2.605,2.8,2.8,0,0,0,1.063.764,9.153,9.153,0,0,0,1.818.5,8.96,8.96,0,0,1,1.85.508,4.878,4.878,0,0,1,1.487.979,4.009,4.009,0,0,1,.895,1.379,5.028,5.028,0,0,1-.974,5.1Z" transform="translate(-356.751 -361.7)" fill="#dedede"/>
                            </svg>
                            <p class="font-semibold text-xl text-dark-400 text-center">
                                Wallet <br>
                                <span>{{ '€27' }}</span>
                            </p>
                        </label>
                    </li>
                </ul>
            </div>
        </div>


        <div class="fixed bottom-4 px-4 left-0 w-full flex flex-col items-end">
            <p class="text-dark-400 text-center leading-tight mb-6">
                Please put your bike back inside a bike rack before finishing
            </p>
            <button 
                ref="startStopButton"
                class="
                    w-full h-12 px-6 font-bold rounded-lg text-dark-400 text-md
                    transition-colors duration-300 bg-dark-accent
                "
                @click="handleFinish"
            >
                FINISH
            </button>
        </div>

    </div>
</template>