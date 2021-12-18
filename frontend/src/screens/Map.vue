<script lang="ts">
/* eslint-disable no-undef */
import { computed, defineComponent, onMounted, onUpdated, reactive, ref, watch } from 'vue'
import { useGeolocation } from '../composables/useGeolocation'
import { MarkerClusterer, MarkerClustererOptions } from "@googlemaps/markerclusterer";
import { Loader } from '@googlemaps/js-api-loader'
import BottomNavigation from '../components/BottomNavigation.vue'

import createHTMLMapMarker from '../classes/CustomMarker';
import Coordinates from '../interfaces/Coordinates';
import { useStore } from 'vuex';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAde16u-_4w_GdVuNxXEGUzRoSJM5_Y9DE'
// const GOOGLE_MAPS_API_KEY = 'AIzaSyDHwfc4JAJY9LUunGaU8iM8Z5IXPi1AntI'

// TODO: Marker Cluster

export default defineComponent({
    setup() {
        const store = useStore()

        const data = reactive({showInfo: false});
        const markerLocations = [
            {lat: 50.822670, lng: 3.270039},
            {lat: 50.825355, lng: 3.280136},
            {lat: 50.818365, lng: 3.272511},
            {lat: 50.817057, lng: 3.278106},
            {lat: 50.819027, lng: 3.285213},
        ];

        const { coords } = useGeolocation();
        console.log(coords.value)
        const currPos = computed(() => ({
            lat: coords.value.latitude,
            lng: coords.value.longitude,
        }));
        const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY,  version: 'beta'});

        const mapDiv = ref(null);

        let map: google.maps.Map;
        let markers: any;
        let currPosMarker: any

        let service: any;

        onMounted(async () => {
            await loader.load();
            service = new google.maps.DistanceMatrixService();

            map = new google.maps.Map(mapDiv.value as HTMLElement, {
                mapId: 'f01f21c52ee2ebff',
                center: { lat: 50.82004350284792, lng: 3.277652756641025 },
                zoom: 15,
                heading: 0,
                disableDefaultUI: true,
                rotateControl: true,
                gestureHandling: 'greedy',
            });

            // TODO: ------------------ Distance Matrix ---------------------

            markers = markerLocations.map(async (location: any) => {
                // build request
                const origin = { lat: 50.82004350284792, lng: 3.277652756641025 };
    
                const request = {
                    origins: [origin],
                    destinations: [location],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: store.state.preferences.units === 'imperial' ? 
                        google.maps.UnitSystem.IMPERIAL :
                        google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false,
                };

                const distance = await service.getDistanceMatrix(request)

                console.log(distance)

                



                const marker = new google.maps.Marker({
                    storageId: 2,
                    // position: { lat: 50.82004350284792, lng: 3.277652756641025 },
                    position: location,
                    map: map,
                    icon: {
                        url: "src/assets/images/mapsMarker.png",
                        anchor: new google.maps.Point(17, 17),
                        labelOrigin:  new google.maps.Point(17,48),
                    },
                    clickable: true,
                    optimized: false,
                    label: {
                        text: distance.rows[0].elements[0].distance.text, 
                        color: '#DEDEDE', 
                        fontWeight: 'bold'
                    },
                });
    
                marker.addListener('click', (e: any) => {
                    console.log(marker.storageId);
                    showInfoPopup()
                })

                return marker;
            });


            // TODO: ------------------ Distance Matrix ---------------------

            // const markerCluster = new MarkerClusterer(map, markers, clusterOptions);
            // const markerCluster = new MarkerClusterer({ markers, map});


            currPosMarker = createHTMLMapMarker({
                latlng: { lat: 50.82004350284792, lng: 3.277652756641025 },
                map: map,
                img: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            });

            window.addEventListener("deviceorientation", (e: any) => {
                console.log(map.getHeading())
                map.setHeading(e.alpha);
            }, true);
        });
        
        watch(coords, (coords, prevCount) => {
            if (currPosMarker) {
                currPosMarker.setMarkerPosition({ lat: coords.latitude, lng: coords.longitude });
            }
        })


        const centerMap = (): void => {
            console.log(currPos.value)
            map.setCenter(currPos.value)
            map.setHeading(0)
            map.setTilt(0)
            map.setZoom(15)
        }

        const showInfoPopup = () => {
            data.showInfo = !data.showInfo;
        }


        return {
            data,
            currPos,
            mapDiv,
            centerMap,
        };
    },
    components: { BottomNavigation }
})
</script>

<template>
    <div class="relative h-screen w-screen">
        <div ref="mapDiv" class="h-screen w-screen"></div>
        <div class="absolute top-14 left-0 right-0 w-screen p-4 transition-all duration-200" :class="!data.showInfo ? '-translate-y-4 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'">
            <div class="w-full h-36 bg-dark-700 flex p-2 justify-between rounded-2xl">
                <div class="bg-dark-400 rounded-2xl h-30 w-24">
                    <img class="h-full" src="../assets/images/bike01.png" alt="bike" />
                </div>
                <div class="flex flex-col justify-around flex-grow pl-4">
                    <h1 class="text-dark-400">
                        Andre devaerelaan
                    </h1>
                    <p class="text-dark-600">
                        Andre devaerelaan 20
                    </p>
                    <div class="flex items-center">
                        <svg class="h-6 w-8" viewBox="0 0 24 24" fill="#dedede">
                            <path
                                d="M15,18.5c-2.51,0-4.68-1.42-5.76-3.5H15l1-2H8.58c-0.05-0.33-0.08-0.66-0.08-1s0.03-0.67,0.08-1H15l1-2H9.24 C10.32,6.92,12.5,5.5,15,5.5c1.61,0,3.09,0.59,4.23,1.57L21,5.3C19.41,3.87,17.3,3,15,3c-3.92,0-7.24,2.51-8.48,6H3l-1,2h4.06 C6.02,11.33,6,11.66,6,12s0.02,0.67,0.06,1H3l-1,2h4.52c1.24,3.49,4.56,6,8.48,6c2.31,0,4.41-0.87,6-2.3l-1.78-1.77 C18.09,17.91,16.62,18.5,15,18.5z"
                            />
                        </svg>

                        <p class="ml-2 text-dark-600">
                            €6/h
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
                            8
                        </p>
                    </div>
                </div>
                <div class="favorite-checkbox mr-2">
                    <input
                        type="checkbox"
                        hidden
                        id="checkbox1"
                        :checked="Boolean(true)"
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

        <div
            @click="$router.go(-1)"
            class="
                w-10
                h-10
                bg-dark-400
                z-10
                rounded-full
                flex
                justify-center
                items-center
                absolute
                top-4 left-4
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

        <BottomNavigation @handleMapCenter="centerMap" page='map'></BottomNavigation>
    </div>
</template>

<style>
    a[href^="http://maps.google.com/maps"],
    a[href^="https://maps.google.com/maps"],
    a[href^="https://www.google.com/maps"] {
        display: none !important;
    }
    .gm-bundled-control .gmnoprint {
        display: block;
    }
    .gmnoprint:not(.gm-bundled-control) {
        display: none;
    }
</style>