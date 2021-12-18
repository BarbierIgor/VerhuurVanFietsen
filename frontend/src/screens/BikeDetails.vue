<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '../bootstrap/router'
import Header from '../components/Header.vue'
import { get, post } from '../composables/networkComposable'
import { BikeInUsePost } from '../interfaces/BikeInUse'

export default defineComponent({
    setup() {
        const route = useRoute()
        const bike: Ref<any> = ref({})
        const userInfo = JSON.parse(localStorage.getItem('userInfo') as any)

        const getData = async () => {
            const data = await get(
                `bike/${route.params.id}`,
                userInfo.bearerToken,
            )
            bike.value = data
            console.log(data)
        }

        const rentMeClicked = async (bikeId: number) => {
            const newBikeInuse: BikeInUsePost = {
                bike: bikeId,
                user: userInfo.userId,
            }
            console.log(bikeId)
            const res = await post(
                'bikeinuse',
                newBikeInuse,
                userInfo.bearerToken,
            )
            router.push('/activity')
        }

        getData()
        return { bike, rentMeClicked }
    },
    components: { Header },
})
</script>

<template>
    <div
        class="
            relative
            bg-dark-900 bg-center bg-login-background
            h-screen
            w-screen
            p-4
            flex flex-col
            justify-between
        "
    >
        <Header></Header>

        <!-- Title -->
        <p
            v-if="bike.type == 'nonElectric'"
            class="text-5xl font-semibold text-dark-400 my-4"
        >
            Bike
        </p>
        <p
            v-if="bike.type == 'electric'"
            class="text-5xl font-semibold text-dark-400 my-4"
        >
            Electric bike
        </p>
        <p
            v-if="bike.type == 'estep'"
            class="text-5xl font-semibold text-dark-400 my-4"
        >
            Estep
        </p>

        <div
            v-if="bike.type == 'nonElectric'"
            class="w-screen -ml-4 grow overflow-hidden"
        >
            <img
                class="w-full h-full object-contain -translate-x-24"
                src="../assets/images/imageBike.png"
                alt=""
                srcset=""
            />
        </div>

        <div
            v-if="bike.type == 'electric'"
            class="w-screen -ml-4 grow overflow-hidden"
        >
            <img
                class="w-full h-full object-contain -translate-x-24"
                src="../assets/images/imageElectricBike.png"
                alt=""
                srcset=""
            />
        </div>

        <div
            v-if="bike.type == 'estep'"
            class="w-screen -ml-4 grow overflow-hidden"
        >
            <img
                class="w-full h-full object-contain -translate-x-24"
                src="../assets/images/image_step.png"
                alt=""
                srcset=""
            />
        </div>

        <!-- info -->
        <div
            class="
                h-32
                w-full
                transition-all
                duration-500
                ease-in-out
                grid
                gap-4
                grid-cols-3
                my-4
            "
        >
            <div
                class="
                    h-full
                    rounded-lg
                    bg-dark-400
                    flex flex-col
                    justify-evenly
                    items-center
                    overflow-hidden
                    transition
                    duration-500
                "
            >
                <svg class="h-6 w-6" viewBox="0 0 28 28">
                    <path
                        d="M371.189,361.709c-.144,0-.289-.009-.438-.009-.089,0-.177,0-.261,0q-.35.007-.7.028a14.027,14.027,0,0,0-12.406,9.787c-.075.233-.14.471-.2.708s-.112.471-.158.7a14,14,0,1,0,14.163-11.222Zm3.663,20.734a4.961,4.961,0,0,1-2.764,1.426v.559a.927.927,0,0,1-.927.927h-.5a.927.927,0,0,1-.927-.927v-.583a6.491,6.491,0,0,1-1.71-.578,4.237,4.237,0,0,1-1.6-1.533,4.876,4.876,0,0,1-.643-1.612.9.9,0,0,1,.1-.643.928.928,0,0,1,.648-.457l.5-.089a.8.8,0,0,1,.3,0,.922.922,0,0,1,.755.685,3.45,3.45,0,0,0,.569,1.286,2.97,2.97,0,0,0,2.344,1.086h0a3.27,3.27,0,0,0,.475-.037,2.691,2.691,0,0,0,2.354-2.778,2.345,2.345,0,0,0-.461-1.519,4.23,4.23,0,0,0-2.4-1.184c-.405-.093-.792-.182-1.174-.289a8.582,8.582,0,0,1-1.855-.746,3.672,3.672,0,0,1-1.459-1.463,4.346,4.346,0,0,1-.508-2.107c0-.093,0-.182,0-.27a5.558,5.558,0,0,1,.093-.76,4.362,4.362,0,0,1,.256-.825,4.254,4.254,0,0,1,1.123-1.529,4.174,4.174,0,0,1,1.16-.7,5.571,5.571,0,0,1,1.119-.326V366.7a.916.916,0,0,1,.061-.322.927.927,0,0,1,.7-.587,1.015,1.015,0,0,1,.168-.014h.531a.926.926,0,0,1,.9.923v.769a4.8,4.8,0,0,1,2.135.951,4.178,4.178,0,0,1,1.286,1.855.924.924,0,0,1-.736,1.221l-.489.075a.924.924,0,0,1-1.011-.615,2.423,2.423,0,0,0-.471-.848,2.538,2.538,0,0,0-1.906-.778,3.273,3.273,0,0,0-.68.075,3.115,3.115,0,0,0-.419.126,2.546,2.546,0,0,0-.974.652,2.354,2.354,0,0,0-.3.424,2.449,2.449,0,0,0,.21,2.605,2.8,2.8,0,0,0,1.063.764,9.153,9.153,0,0,0,1.818.5,8.96,8.96,0,0,1,1.85.508,4.878,4.878,0,0,1,1.487.979,4.009,4.009,0,0,1,.895,1.379,5.028,5.028,0,0,1-.974,5.1Z"
                        transform="translate(-356.751 -361.7)"
                        fill="#2e353b"
                    />
                </svg>

                <p
                    v-if="bike.type == 'nonElectric'"
                    class="text-lg font-semibold"
                >
                    € {{ bike.bikeStorage.prices.nonElectric }}/h
                </p>
                <p v-if="bike.type == 'electric'" class="text-lg font-semibold">
                    € {{ bike.bikeStorage.prices.electric }}/h
                </p>
                <p v-if="bike.type == 'estep'" class="text-lg font-semibold">
                    € {{ bike.bikeStorage.prices.estep }}/h
                </p>
            </div>

            <div
                class="
                    h-full
                    rounded-lg
                    bg-dark-400
                    flex flex-col
                    justify-evenly
                    items-center
                    overflow-hidden
                    transition
                    duration-500
                "
            >
                <!-- <p class="text-2xl font-semibold">
                    17
                </p> -->

                <svg class="w-6 h-6" viewBox="0 0 28.515 23.959">
                    <g transform="translate(3.536 3.536)">
                        <g>
                            <line
                                x2="11.942"
                                transform="translate(8.444 8.444) rotate(135)"
                                fill="none"
                                stroke="#2e353b"
                                stroke-linecap="round"
                                stroke-width="5"
                            />
                            <line
                                x2="11.942"
                                transform="translate(8.444 8.444) rotate(-135)"
                                fill="none"
                                stroke="#2e353b"
                                stroke-linecap="round"
                                stroke-width="5"
                            />
                        </g>
                        <g transform="translate(13)">
                            <line
                                x2="11.942"
                                transform="translate(8.444 8.444) rotate(135)"
                                fill="none"
                                stroke="#2e353b"
                                stroke-linecap="round"
                                stroke-width="5"
                            />
                            <line
                                x2="11.942"
                                transform="translate(8.444 8.444) rotate(-135)"
                                fill="none"
                                stroke="#2e353b"
                                stroke-linecap="round"
                                stroke-width="5"
                            />
                        </g>
                    </g>
                </svg>

                <p class="text-md font-semibold">25 km/h</p>
            </div>

            <div
                class="
                    h-full
                    rounded-lg
                    bg-dark-400
                    flex flex-col
                    justify-evenly
                    py-3
                    items-center
                    overflow-hidden
                    transition
                    duration-500
                "
            >
                <svg class="h-6 w-4" viewBox="0 0 13 25">
                    <g transform="translate(-2057 873)">
                        <path
                            d="M11.593,25H1.407A1.427,1.427,0,0,1,0,23.557V3.11A1.427,1.427,0,0,1,1.407,1.666H4.062V0H8.937V1.666h2.656A1.427,1.427,0,0,1,13,3.11V23.557A1.427,1.427,0,0,1,11.593,25ZM1.625,2.5a.824.824,0,0,0-.812.833v20a.824.824,0,0,0,.812.833h9.75a.824.824,0,0,0,.812-.833v-20a.824.824,0,0,0-.812-.833Z"
                            transform="translate(2057 -873)"
                            fill="#2e353b"
                        />
                        <path
                            d="M.812,0H9.75a.823.823,0,0,1,.812.833V11.667a.823.823,0,0,1-.812.833H.812A.823.823,0,0,1,0,11.667V.833A.823.823,0,0,1,.812,0Z"
                            transform="translate(2058.219 -861.75)"
                            fill="#46e6a6"
                        />
                    </g>
                </svg>

                <p class="text-lg text-dark-900 font-semibold">2h</p>

                <p class="text-xl text-dark-600 font-semibold">66%</p>
            </div>
        </div>

        <button
            @click="rentMeClicked(bike.id)"
            ref="startStopButton"
            class="
                w-full
                h-12
                font-bold
                rounded-lg
                text-dark-400 text-md
                transition-colors
                duration-300
                bg-dark-accent
            "
        >
            RENT ME
        </button>
    </div>
</template>
