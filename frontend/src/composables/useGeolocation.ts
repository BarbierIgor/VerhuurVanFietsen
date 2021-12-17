import { onMounted, onUnmounted, Ref, ref } from "vue";

export function useGeolocation() {
    const coords: Ref = ref({latitude: 0, longitude: 0})
    const isSupported: boolean = 'navigator' in window && 'geolocation' in navigator

    let watcher: number | null = null
    onMounted(() => {
        if (isSupported) {
            watcher = navigator.geolocation.watchPosition(
                position => (coords.value = position.coords)
            )
        }
    })

    onUnmounted(() => {
        if (watcher) navigator.geolocation.clearWatch(watcher)
    })

    return {
        coords,
        isSupported,
    }
}