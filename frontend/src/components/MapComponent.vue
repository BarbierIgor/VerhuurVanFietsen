<script lang="ts">
import {
    computed,
    defineComponent,
    onMounted,
    onUpdated,
    reactive,
    Ref,
    ref,
    watch,
} from 'vue'
import { useGeolocation } from '../composables/useGeolocation'
import {
    MarkerClusterer,
    MarkerClustererOptions,
} from '@googlemaps/markerclusterer'
import { Loader } from '@googlemaps/js-api-loader'
import BottomNavigation from '../components/BottomNavigation.vue'

import createHTMLMapMarker from '../classes/CustomMarker'
import Coordinates from '../interfaces/Coordinates'
import { useStore } from 'vuex'
import Location from '../interfaces/Location'
import BikeStorage from '../interfaces/BikeStorage'
import { get } from '../composables/networkComposable'
import useFirebase from '../composables/useFirebase'

const GOOGLE_MAPS_API_KEY = 'AIzaSyAde16u-_4w_GdVuNxXEGUzRoSJM5_Y9DE'

export default defineComponent({
    setup() {
        const datashow = reactive({ showInfo: false })
        // forca a reload, sometimes this page is buggy if it is not reloaded
        if (!localStorage.getItem('foo')) {
            localStorage.setItem('foo', 'no reload')
            location.reload()
        } else {
            localStorage.removeItem('foo')
        }

        const { user } = useFirebase()
        const { coords } = useGeolocation()
        const store = useStore()
        const mapDiv = ref()
        const loader = new Loader({
            apiKey: GOOGLE_MAPS_API_KEY,
            version: 'beta',
        })
        var map: any
        var currentPos: Location = {
            lat: 0,
            long: 0,
        }
        var markers: any
        var data: BikeStorage[] = []
        const bikeStorages: Ref<any> = ref([])
        const selectodStorage: Ref<any> = ref({})
        var showInfo = false
        const loadMap = async () => {
            navigator.geolocation.getCurrentPosition(async position => {
                currentPos.lat = position.coords.latitude
                currentPos.long = position.coords.longitude

                await loader.load()
                const service = new google.maps.DistanceMatrixService()
                map = new google.maps.Map(mapDiv.value as HTMLElement, {
                    mapId: 'f01f21c52ee2ebff',
                    center: { lat: currentPos.lat, lng: currentPos.long },
                    zoom: 15,
                    heading: 0,
                    disableDefaultUI: true,
                    rotateControl: true,
                    gestureHandling: 'greedy',
                })

                if (user.value?.photoURL) {
                    createHTMLMapMarker({
                        latlng: { lat: currentPos.lat, lng: currentPos.long },
                        map: map,
                        img: user.value?.photoURL,
                    })
                } else {
                    createHTMLMapMarker({
                        latlng: { lat: currentPos.lat, lng: currentPos.long },
                        map: map,
                        img: 'https://firebasestorage.googleapis.com/v0/b/verhuur-fietsen-c124d.appspot.com/o/assets%2Fdefault-profile.png?alt=media&token=75c03ead-c367-469d-a5dc-43aba411546c',
                    })
                }
                getData()
            })
        }

        function distance(lat1: any, lat2: any, lon1: any, lon2: any) {
            // The math module contains a function
            // named toRadians which converts from
            // degrees to radians.
            lon1 = (lon1 * Math.PI) / 180
            lon2 = (lon2 * Math.PI) / 180
            lat1 = (lat1 * Math.PI) / 180
            lat2 = (lat2 * Math.PI) / 180

            // Haversine formula
            let dlon = lon2 - lon1
            let dlat = lat2 - lat1
            let a =
                Math.pow(Math.sin(dlat / 2), 2) +
                Math.cos(lat1) *
                    Math.cos(lat2) *
                    Math.pow(Math.sin(dlon / 2), 2)

            let c = 2 * Math.asin(Math.sqrt(a))

            // Radius of earth in kilometers. Use 3956
            // for miles
            let r = 6371

            // calculate the result
            return c * r
        }

        const getData = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') as any)
            data = await get('bikestorage/all', userInfo.bearerToken)
            data.forEach(item => {
                const distanceBetween = distance(
                    item.location.lat,
                    currentPos.lat,
                    item.location.long,
                    currentPos.long,
                )
                item.distance = Math.round(distanceBetween * 10) / 10
            })
            bikeStorages.value = data
            data.map(async (storage: BikeStorage) => {
                if (storage.distance) {
                    const marker = new google.maps.Marker({
                        position: {
                            lat: storage.location.lat,
                            lng: storage.location.long,
                        },
                        map: map,
                        icon: {
                            url: 'https://firebasestorage.googleapis.com/v0/b/verhuur-fietsen-c124d.appspot.com/o/assets%2FmapsMarker.png?alt=media&token=f6b4cf56-114a-403f-9baf-13222cc54e9e',
                            anchor: new google.maps.Point(17, 17),
                            labelOrigin: new google.maps.Point(17, 48),
                        },
                        clickable: true,
                        optimized: false,
                        label: {
                            text: `${storage.distance?.toString()} km`,
                            color: '#DEDEDE',
                            fontWeight: 'bold',
                        },
                    })

                    marker.addListener('click', (e: any) => {
                        console.log(storage)
                        selectodStorage.value = storage
                        showInfoPopup()
                    })

                    return marker
                }
            })
        }
        const showInfoPopup = () => {
            datashow.showInfo = !datashow.showInfo
        }
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
        loadMap()
        // getData()
        return { mapDiv, datashow, selectodStorage, isFavorite, handleFavorite }
    },
})
</script>

<template>
    <div ref="mapDiv" class="h-screen w-screen"></div>
    <div
        class="
            absolute
            top-14
            left-0
            right-0
            w-screen
            p-4
            transition-all
            duration-200
        "
        :class="
            !datashow.showInfo
                ? '-translate-y-4 opacity-0 pointer-events-none'
                : 'translate-y-0 opacity-100 pointer-events-auto'
        "
    >
        <div
            class="w-full h-36 bg-dark-700 flex p-2 justify-between rounded-2xl"
        >
            <div class="bg-dark-400 rounded-2xl h-30 w-30">
                <img
                    class="h-full"
                    src="../assets/images/bikeStorage.png"
                    alt="bike"
                />
            </div>
            <div class="flex flex-col justify-around flex-grow pl-4">
                <h1 class="text-dark-400">{{ selectodStorage.street }}</h1>
                <p class="text-dark-600">
                    {{ selectodStorage.street }}
                    {{ selectodStorage.houseNumber }}
                </p>
                <div class="flex items-center">
                    <p class="ml-2 text-dark-600">
                        {{ selectodStorage.city }}
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
                        {{ selectodStorage.bikesAvailable }}
                    </p>
                </div>
            </div>
            <div class="favorite-checkbox mr-2">
                <input
                    type="checkbox"
                    hidden
                    @change="handleFavorite($event, selectodStorage.id)"
                    id="checkbox1"
                    :checked="isFavorite(selectodStorage.id)"
                />
                <label for="checkbox1">
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
        </div>
    </div>
</template>
