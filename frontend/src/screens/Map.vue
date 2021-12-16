<script lang="ts">
/* eslint-disable no-undef */
import { computed, defineComponent, onMounted, onUpdated, ref } from 'vue'
import { useGeolocation } from '../composables/useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'
import BottomNavigation from '../components/BottomNavigation.vue'

const GOOGLE_MAPS_API_KEY = 'AIzaSyAde16u-_4w_GdVuNxXEGUzRoSJM5_Y9DE'
// const GOOGLE_MAPS_API_KEY = 'AIzaSyDHwfc4JAJY9LUunGaU8iM8Z5IXPi1AntI'

export default defineComponent({
    methods: {
        handleMapCenter() {
            console.log('Centering map')
            this.centerMap
        },
    },

    setup() {
        const markers = [
            {lat: 50.822670, lng: 3.270039},
            {lat: 50.825355, lng: 3.280136},
            {lat: 50.818365, lng: 3.272511},
            {lat: 50.817057, lng: 3.278106},
            {lat: 50.819027, lng: 3.285213},
        ]

        // const { coords } = useGeolocation();
        const { coords } = useGeolocation();
        console.log(coords.value)
        const currPos = computed(() => ({
            lat: coords.value.latitude,
            lng: coords.value.longitude,
        }));
        const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
        const mapDiv = ref(null);

        let map: google.maps.Map;

        onMounted(async () => {
            await loader.load();
            map = new google.maps.Map(mapDiv.value, {
                mapId: '220791bae99d37e0',
                // center: currPos.value,
                center: { lat: 50.82004350284792, lng: 3.277652756641025 },
                zoom: 15,
                disableDefaultUI: true,
                rotateControl: true,
                gestureHandling: 'greedy',
            });

            markers.map((coordinates) => {
                const marker = new google.maps.Marker({
                    storageId: 1234,
                    // position: { lat: 50.82004350284792, lng: 3.277652756641025 },
                    position: coordinates,
                    map: map,
                    icon: {
                        url: "src/assets/images/mapsMarker.png",
                        anchor: new google.maps.Point(17, 17),
                        labelOrigin:  new google.maps.Point(17,48),
                    },
                    clickable: true,
                    optimized: false,
                    label: {text: '560m', color: '#DEDEDE', fontWeight: 'bold'},
                });
    
                marker.addListener('click', () => {
                    console.log(marker.storageId);
                })
            })

            window.addEventListener("deviceorientation", (e: any) => {console.log(e)}, true);
        });


        const centerMap = (): void => {
            console.log(currPos.value)
            map.setCenter(currPos.value)
            map.setZoom(15)
        }
        
        // const getCoordsFromAddress = (address: string) => {
        //     const geocoder = new google.maps.Geocoder()
        //     geocoder.geocode({ address: address }, function (results: any, status: any) {
        //         console.log(results)
        //     })
        // }

        return {
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