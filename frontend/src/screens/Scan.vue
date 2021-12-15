<script lang="ts">
import { defineComponent } from 'vue'
import { QrcodeStream } from 'vue3-qrcode-reader'
import router from '../bootstrap/router'

export default defineComponent({
    components: {
        QrcodeStream,
    },

    data() {
        return {
            camera: 'rear',

            noRearCamera: false,
            noFrontCamera: false,

            loading: false,
            destroyed: false,

            isNumberInputOpen: false,
            numberInput: '',
        }
    },

    methods: {
        onDecode(decodedString: string) {
            console.log(decodedString)
            router.push({ name: 'BikeDetails', params: { id: decodedString } })
        },
        handlePreviousClick(e: any) {
            router.go(-1)
        },
        async onInit(promise: any) {
            this.loading = true

            try {
                await promise
            } catch (error) {
                console.error(error)
            } finally {
                this.loading = false
            }
        },
        async reload() {
            this.destroyed = true

            await this.$nextTick()

            this.destroyed = false
        },
        handleNumberInputClick(e: any) {
            this.isNumberInputOpen = true
            this.$nextTick(() => this.$refs.numberInput.focus())
        },
        focusIn() {
            console.log('focus in')
            this.isNumberInputOpen = true
        },
        focusOut() {
            console.log('focus out')
            this.isNumberInputOpen = false
        },
        onEnter() {
            this.$nextTick(() => this.$refs.numberInput.blur())
            this.onDecode(this.numberInput)
        },
    },
})
</script>

<template>
    <div class="h-screen w-screen relative">
        <!-- Camera View -->
        <qrcode-stream
            @init="onInit"
            v-if="!destroyed"
            @decode="onDecode"
            class="h-screen"
        >
            <div class="flex justify-between items-center p-4">
                <!-- Previous button -->
                <div
                    @click="handlePreviousClick($event)"
                    class="
                        w-10
                        h-10
                        bg-dark-400
                        z-10
                        rounded-full
                        flex
                        justify-center
                        items-center
                    "
                >
                    <svg class="w-2/4 h-2/4 -ml-1" viewBox="0 0 16.192 22.396">
                        <g
                            id="Group_37"
                            data-name="Group 37"
                            transform="translate(-85.87 -25.598)"
                        >
                            <line
                                id="Line_3"
                                data-name="Line 3"
                                x2="11.942"
                                transform="translate(89.392 36.796) rotate(40)"
                                fill="none"
                                stroke="#2e353b"
                                stroke-linecap="round"
                                stroke-width="5"
                            />
                            <line
                                id="Line_4"
                                data-name="Line 4"
                                x2="11.942"
                                transform="translate(89.392 36.796) rotate(-40)"
                                fill="none"
                                stroke="#2e353b"
                                stroke-linecap="round"
                                stroke-width="5"
                            />
                        </g>
                    </svg>
                </div>

                <!-- Number Input -->
                <div
                    @click="handleNumberInputClick($event)"
                    class="
                        w-16
                        h-10
                        p-2
                        rounded-full
                        bg-dark-400
                        flex
                        justify-center
                        items-center
                        transition-transform-width
                        duration-300
                        ease-out
                    "
                    v-bind:class="isNumberInputOpen ? 'w-44' : 'w-16'"
                >
                    <input
                        @keydown.enter="onEnter"
                        v-model="numberInput"
                        ref="numberInput"
                        @focusin="focusIn"
                        @focusout="focusOut"
                        placeholder="Enter bike number"
                        class="w-full h-full rounded-full px-4 bg-transparent"
                        type="number"
                        v-show="isNumberInputOpen"
                    />

                    <svg
                        class="h-4"
                        v-show="!isNumberInputOpen"
                        viewBox="0 0 473.4 289.7"
                    >
                        <g transform="translate(-19.3 -210.4)">
                            <path
                                d="M19.3,236.6V473.9c0,14.5,12.4,26.2,27.7,26.2H465c15.3,0,27.7-11.8,27.7-26.2V236.6c0-14.5-12.4-26.2-27.7-26.2H47C31.7,210.4,19.3,222.1,19.3,236.6Zm448.9,0V473.9c0,.5-1.2,1.7-3.2,1.7H47c-2.1,0-3.2-1.2-3.2-1.7V236.6c0-.5,1.1-1.7,3.2-1.7H465C467,234.9,468.2,236.1,468.2,236.6Z"
                            />
                            <circle
                                cx="14.8"
                                cy="14.8"
                                r="14.8"
                                transform="translate(90.1 277.8)"
                            />
                            <path
                                d="M165.3,307.4h0a14.8,14.8,0,1,0,0-29.6h0a14.8,14.8,0,1,0,0,29.6Z"
                            />
                            <circle
                                cx="14.8"
                                cy="14.8"
                                r="14.8"
                                transform="translate(211 277.8)"
                            />
                            <circle
                                cx="14.8"
                                cy="14.8"
                                r="14.8"
                                transform="translate(271.4 277.8)"
                            />
                            <circle
                                cx="14.8"
                                cy="14.8"
                                r="14.8"
                                transform="translate(331.9 277.8)"
                            />
                            <circle
                                cx="14.8"
                                cy="14.8"
                                r="14.8"
                                transform="translate(392.3 277.8)"
                            />
                            <circle
                                cx="14.8"
                                cy="14.8"
                                r="14.8"
                                transform="translate(120.3 340.4)"
                            />
                            <circle
                                cx="14.8"
                                cy="14.8"
                                r="14.8"
                                transform="translate(180.8 340.4)"
                            />
                            <circle
                                cx="14.8"
                                cy="14.8"
                                r="14.8"
                                transform="translate(241.2 340.4)"
                            />
                            <path
                                d="M316.4,370h0a14.8,14.8,0,1,0,0-29.6h0a14.8,14.8,0,1,0,0,29.6Z"
                            />
                            <circle
                                cx="14.8"
                                cy="14.8"
                                r="14.8"
                                transform="translate(362.1 340.4)"
                            />
                            <path
                                d="M138.3,417.9a12.291,12.291,0,0,0,12.3,12.3H361.4a12.3,12.3,0,0,0,0-24.6H150.6A12.291,12.291,0,0,0,138.3,417.9Z"
                            />
                        </g>
                    </svg>
                </div>
            </div>

            <!-- No camera errors -->
            <p class="" v-if="noFrontCamera">
                You don't seem to have a front camera on your device
            </p>

            <p class="" v-if="noRearCamera">
                You don't seem to have a rear camera on your device
            </p>

            <transition
                name="loading"
                enter-active-class="duration-150 ease-in"
                enter-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="duration-150 ease-out"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    class="
                        text-4xl text-dark-400
                        font-bold
                        text-center
                        mt-24
                        absolute
                        top-10
                        left-1/2
                        -translate-x-1/2
                    "
                    v-show="loading"
                >
                    Loading...
                </div>
            </transition>

            <!-- Guiding brackets -->
            <transition
                name="loading"
                enter-active-class="duration-350 ease-in"
                enter-class="opacity-0"
                enter-to-class="opacity-50"
            >
                <div
                    class="fixed mt-24 w-screen flex items-center"
                    v-show="!loading"
                >
                    <svg class="m-4" viewBox="0 0 354.658 354.658">
                        <g
                            id="Group_127"
                            data-name="Group 127"
                            transform="translate(-21.5 -184.5)"
                        >
                            <g
                                id="Group_123"
                                data-name="Group 123"
                                transform="translate(24 187)"
                            >
                                <line
                                    id="Line_28"
                                    data-name="Line 28"
                                    y2="46"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="5"
                                />
                                <line
                                    id="Line_29"
                                    data-name="Line 29"
                                    y2="46.008"
                                    transform="translate(46.008 0) rotate(90)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="5"
                                />
                            </g>
                            <g
                                id="Group_126"
                                data-name="Group 126"
                                transform="translate(24 536.658) rotate(-90)"
                            >
                                <line
                                    id="Line_28-2"
                                    data-name="Line 28"
                                    y2="46.008"
                                    transform="translate(0 0)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="5"
                                />
                                <line
                                    id="Line_29-2"
                                    data-name="Line 29"
                                    y2="46.008"
                                    transform="translate(46.008 0) rotate(90)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="5"
                                />
                            </g>
                            <g
                                id="Group_124"
                                data-name="Group 124"
                                transform="translate(373.658 187) rotate(90)"
                            >
                                <line
                                    id="Line_28-3"
                                    data-name="Line 28"
                                    y2="46.008"
                                    transform="translate(0 0)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="5"
                                />
                                <line
                                    id="Line_29-3"
                                    data-name="Line 29"
                                    y2="46.008"
                                    transform="translate(46.008 0) rotate(90)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="5"
                                />
                            </g>
                            <g
                                id="Group_125"
                                data-name="Group 125"
                                transform="translate(373.658 536.658) rotate(180)"
                            >
                                <line
                                    id="Line_28-4"
                                    data-name="Line 28"
                                    y2="46.008"
                                    transform="translate(0 0)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="5"
                                />
                                <line
                                    id="Line_29-4"
                                    data-name="Line 29"
                                    y2="46.008"
                                    transform="translate(46.008 0) rotate(90)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="5"
                                />
                            </g>
                        </g>
                    </svg>
                </div>
            </transition>
        </qrcode-stream>
    </div>
</template>
