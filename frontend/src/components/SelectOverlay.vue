<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            active: false,
        }
    },
    methods: {
        handleOverlayClick() {
            console.log('Close overlay')
            this.$emit('toggleModal');
        },
    },
    setup() {
        
    },
})
</script>

<template>
    <div  
        class="
            w-screen h-screen fixed top-0 left-0
        " 
        :class="
            $props.isActive ? 
                'backdrop-filter backdrop-blur-sm pointer-events-auto' : 
                'backdrop-filter backdrop-blur-none pointer-events-none' 
            "
        >
        <div 
            class="
                absolute top-0 left-0 
                w-full h-full 
                transition-all duration-300 ease-out 
                flex justify-center items-center
            " 
            :class="
                $props.isActive ?
                    'opacity-70 pointer-events-auto bg-dark-900' : 
                    'opacity-0 pointer-events-none bg-transparent'
            "
        >
        </div>
        <div @click.self="handleOverlayClick" class="absolute top-0 left-0 w-full h-full flex justify-center items-center transition-opacity duration-300" :class="$props.isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'">
            <div 
                :class="
                    $props.isActive ?
                        'translate-y-0 opacity-100':
                        '-translate-y-12 opacity-0'
                " 
                class="w-3/5 h-auto rounded-lg bg-dark-400 p-4 -mt-24 transition duration-300">
                <h1 v-if="$props.title != ''" class="text-dark-900 font-semibold text-lg mb-4">{{ $props.title }}</h1>
                <slot></slot>               
            </div>
        </div>
    </div>
</template>