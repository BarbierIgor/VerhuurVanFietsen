<script lang="ts">
/* eslint-disable no-undef */
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
import MapComponent from '../components/MapComponent.vue'

import createHTMLMapMarker from '../classes/CustomMarker'
import Coordinates from '../interfaces/Coordinates'
import { useStore } from 'vuex'
import Location from '../interfaces/Location'
import BikeStorage from '../interfaces/BikeStorage'
import { get } from '../composables/networkComposable'
import useFirebase from '../composables/useFirebase'

export default defineComponent({
    setup() {},
    components: { BottomNavigation, MapComponent },
})
</script>

<template>
    <div class="relative h-screen w-screen">
        <MapComponent />
        <div
            @click="$router.back()"
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
                top-4
                left-4
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

        <BottomNavigation @handleMapCenter="0" page="map"></BottomNavigation>
    </div>
</template>

<style>
a[href^="http://maps.google.com/maps"],
    a[href^="https://maps.google.com/maps"],
    a[href^="https://www.google.com/maps"]
{
    display: none !important;
}
.gm-bundled-control .gmnoprint {
    display: block;
}
.gmnoprint:not(.gm-bundled-control) {
    display: none;
}
</style>
