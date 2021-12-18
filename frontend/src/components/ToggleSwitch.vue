<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        isChecked: {type: Boolean, default: false},
    },
    data() {
        return {
            toggleDark: this.$props.isChecked,
        }
    },
    mounted() {
        if (this.$props.isChecked) {
            const handle = this.$refs.toggleHandle;
            handle.style.transform = 'translate(120%)';
            this.toggleDark = true;
        }
    },
    methods: {
        handleToggleSwitch(e: any) {
            const handle = this.$refs.toggleHandle;
            if (e.currentTarget.checked) {
                handle.style.transform = `translate(120%)`;
            }
            else {
                handle.style.transform = `translate(0%)`;
            }

            this.$emit('onToggle', e.currentTarget.checked);
        },
    },
    setup() {
        
    },
})
</script>

<template>
    <div class="flex items-center toggle-switch">
        <input v-model="toggleDark" @change="handleToggleSwitch($event)" type="checkbox" hidden id="toggle-dark" :checked="toggleDark">
        <label ref="toggleBackground" for="toggle-dark" class="relative flex items-center h-6 w-12 p-0.5 bg-dark-600 rounded-full transition-colors duration-200">
            <span ref="toggleHandle" class="bg-dark-400 p-2.5 rounded-full transition-transform duration-200 ease-out"></span>
        </label>
    </div>
</template>
