<script lang="ts">
import { defineComponent, onMounted, ref, Ref, reactive } from 'vue'
import { useNetwork } from '../utils/networkComposable'
import FilterSwitch from '../components/FilterSwitch.vue'
import SearchBar from '../components/SearchBar.vue'
import data from '../utils/data.json'
import { mapState, useStore } from 'vuex'
import router from '../bootstrap/router'
import BottomNavigation from '../components/BottomNavigation.vue'
import StorageList from '../components/StorageList.vue'
import StorageListItem from '../components/StorageListItem.vue'
import useFirebase from '../composables/useFirebase'
import { get } from '../composables/networkComposable'
import BikeStorage from '../interfaces/BikeStorage'
import store from '../store'

export default defineComponent({
    components: {
        FilterSwitch,
        SearchBar,
        BottomNavigation,
        StorageList,
        StorageListItem,
    },
    setup() {
        // force a reload, can be buggy when coming from map page when its not reloaded.
        if (!localStorage.getItem('foo')) {
            localStorage.setItem('foo', 'no reload')
            location.reload()
        } else {
            localStorage.removeItem('foo')
        }
        const store = useStore()
        console.log(store.state.preferences.units)
        const bikeStorages: Ref<any> = ref([])
        var ownlat: number
        var ownlong: number
        var data: BikeStorage[] = []
        navigator.geolocation.getCurrentPosition(position => {
            ownlat = position.coords.latitude
            ownlong = position.coords.longitude
            getData()
        })
        const onSearch = (value: any) => {
            const filteredData = data.filter(bikeStorage =>
                bikeStorage.street.toLowerCase().includes(value.toLowerCase()),
            )
            bikeStorages.value = filteredData
            console.log(filteredData)
        }
        const handleMapsClick = () => {
            router.push({
                path: '/map',
                params: { filter: 'all' },
            })
        }
        const handleScanClick = () => {
            router.push({ path: '/scan' })
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
                    ownlat,
                    item.location.long,
                    ownlong,
                )
                item.distance = Math.round(distanceBetween * 10) / 10
            })

            data.sort((a, b) => (a.distance || 0) - (b.distance || 0))

            console.log(bikeStorages)
            bikeStorages.value = data
        }
        return { onSearch, handleScanClick, handleMapsClick, bikeStorages }
    },
})
</script>

<template>
    <div class="w-full h-full bg-dark-900 p-4">
        <SearchBar v-on:childToParent="onSearch"></SearchBar>

        <!-- <FilterSwitch class="mt-4"></FilterSwitch> -->

        <StorageList :data="bikeStorages" :loading="false" class="mt-8">
            <template v-slot="slotProps">
                <StorageListItem
                    :bikeStorage="slotProps.item"
                ></StorageListItem>
            </template>
        </StorageList>

        <BottomNavigation></BottomNavigation>
    </div>
</template>
