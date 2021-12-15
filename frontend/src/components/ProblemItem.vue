<script lang="ts">
import { defineComponent } from 'vue'
import { Problem } from '../interfaces/Problem'

export default defineComponent({
    props: {
        problem: {
            type: Object as () => Problem,
        },
    },
    methods: {
        handleItemClick() {
            console.log(
                `Going to problem detailpage with problem ${this.$props.problem?.id}`,
            )
            this.$router.push({
                name: 'ProblemDetails',
                params: { id: this.$props.problem?.id },
            })
        },
    },
    setup() {},
})
</script>

<template>
    <li
        v-if="$props.problem"
        :key="`${$props.problem.id}`"
        @click="handleItemClick()"
        class="flex h-28 justify-between mt-8 first:mt-0"
    >
        <div class="bg-dark-400 rounded-2xl h-30 w-24">
            <img class="h-full" src="../assets/images/bike01.png" alt="bike" />
        </div>
        <div class="flex flex-col justify-around flex-grow pl-4">
            <h1 class="text-dark-400">
                {{
                    `${$props.problem.id} - Problem: ${$props.problem.category}`
                }}
            </h1>
            <div
                v-if="$props.problem.category == 'bikestorage'"
                class="flex items-center"
            >
                <svg class="h-6 w-8" viewBox="0 0 10.988 14.868">
                    <path
                        d="M5.494,14.868a.353.353,0,0,1-.272-.128C5.009,14.484,0,8.425,0,5.494a5.494,5.494,0,0,1,10.988,0c0,2.933-5.009,8.99-5.222,9.247A.354.354,0,0,1,5.494,14.868ZM5.5,3A2.5,2.5,0,1,0,8,5.5,2.5,2.5,0,0,0,5.5,3Z"
                        fill="#dedede"
                    />
                </svg>

                <p class="ml-2 text-dark-600">
                    {{ `Bikestorage number: ${$props.problem.bikeStorage.id}` }}
                </p>
            </div>
            <div
                v-if="$props.problem.category == 'bike'"
                class="flex items-center"
            >
                <svg class="h-4 w-8" viewBox="0 0 18.005 11.675">
                    <path
                        d="M14.314,53.763a3.812,3.812,0,0,0-.89.1l-1.137-2.948h.37a2.253,2.253,0,0,0,1.552-.6l.392-.363a.421.421,0,0,0,.009-.611.461.461,0,0,0-.636-.008l-.392.359a1.341,1.341,0,0,1-.926.354H11.639a.463.463,0,0,0-.369.2.43.43,0,0,0-.052.4l.433,1.121s-.006.008-.008.008,0,.008,0,.008H5.884l-.777-1.263.844-.283a.422.422,0,0,0,.3-.472.437.437,0,0,0-.444-.353H3.334A.609.609,0,0,0,2.705,50a.952.952,0,0,0,.971.932,1.009,1.009,0,0,0,.316-.054l.246-.083.788,1.272-.605,1.752a3.805,3.805,0,0,0-.611-.069,3.729,3.729,0,0,0-2.772,1.082A3.466,3.466,0,0,0,0,57.427,3.632,3.632,0,0,0,3.57,60.87l.12,0a3.731,3.731,0,0,0,2.651-1.087,3.53,3.53,0,0,0,1.013-2.047h.723a.988.988,0,0,0,.578.21.875.875,0,0,0,.891-.858.827.827,0,0,0-.116-.422l2.521-4.125.633,1.636a3.549,3.549,0,0,0-1.961,3.144,3.693,3.693,0,1,0,3.691-3.56Zm-3.462-1.116-2.2,3.592s0,0,0,0-.005.006-.008.006L6.421,52.647h4.432Zm-5.216.405,2.241,3.616a1.132,1.132,0,0,0-.085.2H7.353a3.6,3.6,0,0,0-2.078-2.777ZM4.464,56.87a.53.53,0,0,0-.1-.129l.532-1.54A2.467,2.467,0,0,1,6.141,56.87ZM5.48,58.979a2.517,2.517,0,0,1-1.872.732A2.45,2.45,0,0,1,1.2,57.389a2.339,2.339,0,0,1,.7-1.751,2.516,2.516,0,0,1,1.79-.731h.082a2.582,2.582,0,0,1,.266.023L3.5,56.488a.855.855,0,0,0,.2,1.693.846.846,0,0,0,.776-.443H6.141A2.368,2.368,0,0,1,5.48,58.979Zm8.834.747a2.451,2.451,0,0,1-2.492-2.4,2.387,2.387,0,0,1,1.186-2.046l.845,2.186a.45.45,0,0,0,.421.282.461.461,0,0,0,.157-.028.429.429,0,0,0,.264-.558l-.85-2.2a2.58,2.58,0,0,1,.467-.043,2.4,2.4,0,1,1,0,4.807Z"
                        transform="translate(0 -49.208)"
                        fill="#dedede"
                    />
                </svg>
                <p class="ml-2 text-dark-600">
                    {{ `Bike number: ${$props.problem.bike.id}` }}
                </p>
            </div>
            <div
                v-if="$props.problem.category == 'unrecognized bike'"
                class="flex items-center"
            >
                <svg
                    class="h-4 w-8"
                    enable-background="new 0 0 24 24"
                    viewBox="0 0 24 24"
                    fill="#dedede"
                >
                    <g><rect fill="none" height="24" width="24" /></g>
                    <g>
                        <path
                            d="M11.07,12.85c0.77-1.39,2.25-2.21,3.11-3.44c0.91-1.29,0.4-3.7-2.18-3.7c-1.69,0-2.52,1.28-2.87,2.34L6.54,6.96 C7.25,4.83,9.18,3,11.99,3c2.35,0,3.96,1.07,4.78,2.41c0.7,1.15,1.11,3.3,0.03,4.9c-1.2,1.77-2.35,2.31-2.97,3.45 c-0.25,0.46-0.35,0.76-0.35,2.24h-2.89C10.58,15.22,10.46,13.95,11.07,12.85z M14,20c0,1.1-0.9,2-2,2s-2-0.9-2-2c0-1.1,0.9-2,2-2 S14,18.9,14,20z"
                        />
                    </g>
                </svg>
                <p class="ml-2 text-dark-600">
                    {{ `Bike number: ${$props.problem.bike.id}` }}
                </p>
            </div>
            <div
                v-if="$props.problem.category == 'other'"
                class="flex items-center"
            >
                <svg class="h-4 w-8" viewBox="0 0 24 24" fill="#dedede">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                    />
                </svg>
                <p class="ml-2 text-dark-600">Other problem</p>
            </div>
        </div>
        <div class="flex justify-center items-center">
            <svg class="w-4 h-4" viewBox="0 0 15.703 24.148">
                <g transform="translate(11.852 20.518) rotate(180)">
                    <line
                        x2="11.628"
                        y2="0.314"
                        transform="translate(0 8.444) rotate(45)"
                        fill="none"
                        stroke="#dedede"
                        stroke-linecap="round"
                        stroke-width="5"
                    />
                    <line
                        y1="0.314"
                        x2="11.628"
                        transform="translate(-0.222 8.222) rotate(-45)"
                        fill="none"
                        stroke="#dedede"
                        stroke-linecap="round"
                        stroke-width="5"
                    />
                </g>
            </svg>
        </div>
    </li>
</template>
