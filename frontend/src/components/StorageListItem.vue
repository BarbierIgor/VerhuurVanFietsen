<script lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import {
    computed,
    defineComponent,
    onMounted,
    onUnmounted,
    reactive,
    ref,
    unref,
} from 'vue'
import { useStore } from 'vuex'
import { useGeolocation } from '../composables/useGeolocation'
import BikeStorage from '../interfaces/BikeStorage'
import Coordinates from '../interfaces/Coordinates'

const GOOGLE_MAPS_API_KEY = 'AIzaSyAde16u-_4w_GdVuNxXEGUzRoSJM5_Y9DE'

export default defineComponent({
    props: {
        bikeStorage: {
            type: Object as () => BikeStorage,
        },
    },
    methods: {},
    setup(props) {
        const store = useStore()
        const state = reactive({
            distance:
                store.state.preferences.units === 'metric' ? '0 km' : '0 mi',
        })

        const { coords } = useGeolocation()
        console.log(unref(coords).latitude)

        // TODO: ------------------------------------------

        const loader = new Loader({
            apiKey: GOOGLE_MAPS_API_KEY,
            version: 'beta',
        })
        let service: any

        const getDistances = async () => {
            await loader.load()
            service = new google.maps.DistanceMatrixService()
            var destinationCoords = { lat: 0, lng: 0 }
            var originCoords = { lat: 0, lng: 0 }

            if (props.bikeStorage !== undefined)
                if (props.bikeStorage.location) {
                    destinationCoords = {
                        lat: props.bikeStorage.location.lat,
                        lng: props.bikeStorage.location.long,
                    }
                } else {
                    destinationCoords = { lat: 0, lng: 0 }
                }

            if (coords) {
                originCoords = {
                    lat: coords.value.latitude,
                    lng: coords.value.longitude,
                }
            }

            console.log(`Origin: ${originCoords}`)
            console.log(`Destination: ${destinationCoords.lat}`)

            const request = {
                // origins: [{lat: 50.928, lng: 3.25738}],
                origins: [originCoords],
                destinations: [destinationCoords],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem:
                    store.state.preferences.units === 'imperial'
                        ? google.maps.UnitSystem.IMPERIAL
                        : google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false,
            }

            await service.getDistanceMatrix(
                request,
                (res: any, status: string) => {
                    if (status == 'OK') {
                        if (res.rows[0].elements[0].status === 'OK') {
                            state.distance =
                                res.rows[0].elements[0].distance.text
                        }
                        console.log(res)
                    }
                },
            )
        }

        // TODO: ------------------------------------------

        const isFavorite = (id: number) => {
            // if (store.state.favorites.includes(id)) {
            //     return true
            // } else {
            //     return false
            // }
            console.log(store.state.favorites)
            console.log(store.state.favorites.includes(id))
            return store.state.favorites.includes(id)
        }

        const handleFavorite = (e: any, id: number) => {
            store.commit('addRemoveFavorites', id)
        }
        getDistances()

        return {
            store,
            state,
            handleFavorite,
            isFavorite,
        }
    },
})
</script>

<template>
    <li
        v-if="$props.bikeStorage"
        :key="`${$props.bikeStorage.id}`"
        class="flex h-28 justify-between mt-8 first:mt-0"
    >
        <div class="bg-dark-400 rounded-3xl h-30 w-30">
            <img
                class="h-full"
                src="../assets/images/bikeStorage.png"
                alt="bike"
            />
        </div>
        <div class="flex flex-col justify-around flex-grow pl-4">
            <h1 class="text-dark-400">
                {{
                    `${$props.bikeStorage.street} ${$props.bikeStorage.houseNumber}`
                }}
            </h1>
            <div class="flex items-center">
                <svg class="h-4 w-4" viewBox="0 0 16 16">
                    <path
                        d="M365,361.705c-.083,0-.165-.005-.25-.005-.051,0-.1,0-.149,0q-.2,0-.4.016a8.016,8.016,0,0,0-7.089,5.593c-.043.133-.08.269-.115.4s-.064.269-.091.4A8,8,0,1,0,365,361.705Zm2.093,11.848a2.835,2.835,0,0,1-1.579.815v.32a.53.53,0,0,1-.53.53H364.7a.53.53,0,0,1-.53-.53v-.333a3.709,3.709,0,0,1-.977-.33,2.421,2.421,0,0,1-.913-.876,2.785,2.785,0,0,1-.368-.921.512.512,0,0,1,.056-.368.53.53,0,0,1,.37-.261l.285-.051a.458.458,0,0,1,.17,0,.527.527,0,0,1,.431.391,1.97,1.97,0,0,0,.325.735,1.7,1.7,0,0,0,1.34.621h0a1.869,1.869,0,0,0,.272-.021,1.538,1.538,0,0,0,1.345-1.587,1.34,1.34,0,0,0-.264-.868,2.417,2.417,0,0,0-1.371-.676c-.232-.053-.453-.1-.671-.165a4.905,4.905,0,0,1-1.06-.426,2.1,2.1,0,0,1-.834-.836,2.483,2.483,0,0,1-.29-1.2c0-.053,0-.1,0-.154a3.175,3.175,0,0,1,.053-.434,2.491,2.491,0,0,1,.146-.471,2.431,2.431,0,0,1,.642-.874,2.384,2.384,0,0,1,.663-.4,3.182,3.182,0,0,1,.639-.186v-.431a.523.523,0,0,1,.035-.184.53.53,0,0,1,.4-.336.58.58,0,0,1,.1-.008h.3a.529.529,0,0,1,.514.527V365a2.743,2.743,0,0,1,1.22.543,2.388,2.388,0,0,1,.735,1.06.528.528,0,0,1-.421.7l-.28.043a.528.528,0,0,1-.578-.352,1.385,1.385,0,0,0-.269-.485,1.45,1.45,0,0,0-1.089-.445,1.87,1.87,0,0,0-.389.043,1.78,1.78,0,0,0-.24.072,1.455,1.455,0,0,0-.557.373,1.344,1.344,0,0,0-.173.242,1.4,1.4,0,0,0,.12,1.489,1.6,1.6,0,0,0,.607.437,5.233,5.233,0,0,0,1.039.285,5.119,5.119,0,0,1,1.057.29,2.788,2.788,0,0,1,.85.559,2.291,2.291,0,0,1,.511.788,2.873,2.873,0,0,1-.557,2.916Z"
                        transform="translate(-356.751 -361.7)"
                        fill="#dedede"
                    />
                </svg>

                <p class="ml-2 text-dark-600">
                    {{ `${$props.bikeStorage.prices.nonElectric} / Hr` }}
                </p>
            </div>

            <div class="flex items-center">
                <svg class="h-4 w-4" viewBox="0 0 10.988 14.868">
                    <path
                        d="M5.494,14.868a.353.353,0,0,1-.272-.128C5.009,14.484,0,8.425,0,5.494a5.494,5.494,0,0,1,10.988,0c0,2.933-5.009,8.99-5.222,9.247A.354.354,0,0,1,5.494,14.868ZM5.5,3A2.5,2.5,0,1,0,8,5.5,2.5,2.5,0,0,0,5.5,3Z"
                        fill="#dedede"
                    />
                </svg>

                <p class="ml-2 text-dark-600">
                    {{ $props.bikeStorage.distance }} km
                </p>
            </div>

            <div class="flex items-center">
                <svg class="h-4 w-8" viewBox="0 0 18.005 11.675">
                    <path
                        d="M14.314,53.763a3.812,3.812,0,0,0-.89.1l-1.137-2.948h.37a2.253,2.253,0,0,0,1.552-.6l.392-.363a.421.421,0,0,0,.009-.611.461.461,0,0,0-.636-.008l-.392.359a1.341,1.341,0,0,1-.926.354H11.639a.463.463,0,0,0-.369.2.43.43,0,0,0-.052.4l.433,1.121s-.006.008-.008.008,0,.008,0,.008H5.884l-.777-1.263.844-.283a.422.422,0,0,0,.3-.472.437.437,0,0,0-.444-.353H3.334A.609.609,0,0,0,2.705,50a.952.952,0,0,0,.971.932,1.009,1.009,0,0,0,.316-.054l.246-.083.788,1.272-.605,1.752a3.805,3.805,0,0,0-.611-.069,3.729,3.729,0,0,0-2.772,1.082A3.466,3.466,0,0,0,0,57.427,3.632,3.632,0,0,0,3.57,60.87l.12,0a3.731,3.731,0,0,0,2.651-1.087,3.53,3.53,0,0,0,1.013-2.047h.723a.988.988,0,0,0,.578.21.875.875,0,0,0,.891-.858.827.827,0,0,0-.116-.422l2.521-4.125.633,1.636a3.549,3.549,0,0,0-1.961,3.144,3.693,3.693,0,1,0,3.691-3.56Zm-3.462-1.116-2.2,3.592s0,0,0,0-.005.006-.008.006L6.421,52.647h4.432Zm-5.216.405,2.241,3.616a1.132,1.132,0,0,0-.085.2H7.353a3.6,3.6,0,0,0-2.078-2.777ZM4.464,56.87a.53.53,0,0,0-.1-.129l.532-1.54A2.467,2.467,0,0,1,6.141,56.87ZM5.48,58.979a2.517,2.517,0,0,1-1.872.732A2.45,2.45,0,0,1,1.2,57.389a2.339,2.339,0,0,1,.7-1.751,2.516,2.516,0,0,1,1.79-.731h.082a2.582,2.582,0,0,1,.266.023L3.5,56.488a.855.855,0,0,0,.2,1.693.846.846,0,0,0,.776-.443H6.141A2.368,2.368,0,0,1,5.48,58.979Zm8.834.747a2.451,2.451,0,0,1-2.492-2.4,2.387,2.387,0,0,1,1.186-2.046l.845,2.186a.45.45,0,0,0,.421.282.461.461,0,0,0,.157-.028.429.429,0,0,0,.264-.558l-.85-2.2a2.58,2.58,0,0,1,.467-.043,2.4,2.4,0,1,1,0,4.807Z"
                        transform="translate(0 -49.208)"
                        fill="#dedede"
                    />
                </svg>
                <p class="ml-2 text-dark-600">
                    {{ $props.bikeStorage.bikesAvailable }}
                </p>
            </div>
        </div>
        <div class="favorite-checkbox cursor-pointer">
            <input
                type="checkbox"
                hidden
                @change="handleFavorite($event, $props.bikeStorage.id)"
                :id="`checkbox${$props.bikeStorage.id}`"
                :checked="isFavorite($props.bikeStorage.id)"
            />
            <label :for="`checkbox${$props.bikeStorage.id}`">
                <svg class="h-full w-6" viewBox="0 0 24 21.208">
                    <g transform="translate(0 -27.5)">
                        <path
                            class="
                                transition-colors
                                duration-200
                                fill-current
                                text-dark-400
                            "
                            d="M22.01,29.506a6.8,6.8,0,0,0-9.631.005l-.371.371-.381-.381A6.809,6.809,0,0,0,0,34.314a6.751,6.751,0,0,0,2,4.813L11.276,48.4a1.041,1.041,0,0,0,.736.3,1.059,1.059,0,0,0,.736-.3L22,39.142a6.815,6.815,0,0,0,.01-9.637Z"
                        />
                    </g>
                </svg>
            </label>
        </div>
    </li>
</template>
