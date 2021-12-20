import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
    registerType: 'autoUpdate',
    mode: 'development',
    base: '/',
    includeAssets: ['favicon.svg'],
    manifest: {
        name: 'Bike rental',
        short_name: 'Bike rental',
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
    },
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), VitePWA(pwaOptions)],
})
