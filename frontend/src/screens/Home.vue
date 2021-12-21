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

import Header from '../components/Header.vue'

// import { provideI18n } from "../plugins/i18n";
// import { useI18n } from "../plugins/i18n";
import i18n from 'vue-i18n'


export default defineComponent({
    components: {
    FilterSwitch,
    SearchBar,
    BottomNavigation,
    StorageList,
    StorageListItem,
    Header
},
    setup() {
        const store = useStore()
        
        console.log(store.state.preferences.units)
        const bikeStorages: Ref<any> = ref([])
        var data: BikeStorage[] = []
        const onSearch = (value: any) => {
            const filteredData = data.filter(bikeStorage =>
                bikeStorage.street.toLowerCase().includes(value.toLowerCase()),
            )
            bikeStorages.value = filteredData
            console.log(filteredData)
        }
        const handleMapsClick = () => {
            router.push({ path: '/map', params: { filter: 'all' } })
        }
        const handleScanClick = () => {
            router.push({ path: '/scan' })
        }

        // const bikeStorages: BikeStorage[] = []
        const getData = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') as any)
            data = await get('bikestorage/all', userInfo.bearerToken)
            console.log(bikeStorages)
            bikeStorages.value = data

        }
        getData()
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
