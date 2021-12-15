<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        selectValue: {
            type: String,
            default: '',
        },
    },

    mounted() {
        console.log('mounted');
        console.log(this.$props.items?.length);
    },
    data() {
        return {
            selectedValue: 0,
            selectedItemText: 'Select an option'
        }
    },
    computed: {
        selectMaxHeight: function () {
            switch (this.$props.items.length * 12) {
                case 12:
                    console.log(`group-focus:max-h-${this.$props.items.length * 12}`)
                    return 'group-focus:max-h-12';
                    break;
                case 24:
                    console.log(`group-focus:max-h-${this.$props.items.length * 12}`)
                    return 'group-focus:max-h-24';
                    break;
                case 36:
                    console.log(`group-focus:max-h-${this.$props.items.length * 12}`)
                    return 'group-focus:max-h-36';
                    break;
                case 48:
                    console.log(`group-focus:max-h-${this.$props.items.length * 12}`)
                    return 'group-focus:max-h-48';
                    break;
                case 60:
                    console.log(`group-focus:max-h-${this.$props.items.length * 12}`)
                    return 'group-focus:max-h-60';
                    break;
                case 72:
                    console.log(`group-focus:max-h-${this.$props.items.length * 12}`)
                    return 'group-focus:max-h-72';
                    break;
            
                default:
                    console.log(`group-focus:max-h-${this.$props.items.length * 12}`)
                    return 'group-focus:max-h-96';
                    break;
            }
        },
    },
    methods: {
        handleItemSelected(e: any, itemTitle: string) {
            this.selectedItemText = itemTitle;
            this.$emit('input', this.selectedValue)
            setTimeout(() => {
                this.$refs.selectElement.blur();
            }, 200)
        },
        handleInput(value: any) {
            // console.log('test')
            // this.selectedValue = value
            this.$emit('input', 'testValue')
            // this.$emit('input', this.selectedValue)
        },
    },
    setup() {
        
    },
})
</script>

<template>
    <div class="relative h-12">
        <div class="
            absolute

            w-full
            border
            border-dark-600
            bg-dark-900
            text-dark-600
            focus:opacity-100

            rounded-lg
            mt-4
            opacity-30

            duration-500
            ease-out
            transition-all
            flex flex-col
            group
            overflow-hidden
            z-10
        "
        tabindex="0"
        ref="selectElement"
        >
            <div class="w-full h-full p-2 flex justify-between items-center">
                <p class="group-focus:font-bold transition-font-weight duration-200 ease-out">{{ selectedItemText }}</p>
                <svg class="h-4 w-4 group-focus:rotate-180 transition-transform duration-500 ease-out" viewBox="0 0 24.148 15.703">
                    <g transform="translate(3.63 11.852) rotate(-90)">
                        <line x2="11.628" y2="0.314" transform="translate(0 8.444) rotate(45)" fill="none" stroke="#7f7f7f" stroke-linecap="round" stroke-width="5"/>
                        <line y1="0.314" x2="11.628" transform="translate(-0.222 8.222) rotate(-45)" fill="none" stroke="#7f7f7f" stroke-linecap="round" stroke-width="5"/>
                    </g>
                </svg>
            </div>

            <form ref="formElement" name="custom-select" class="group-focus:overflow-y-scroll flex-col flex max-h-0 transition-max-height duration-500 ease-out pointer-events-none group-focus:pointer-events-auto" v-bind:class="selectMaxHeight">
                <div v-for="(item, index) in $props.items" :key="index" class="w-full">
                    <input class="custom-select-input peer" :value="index"  hidden type="radio" name="select" :id="`option${index}`">
                    <label @click="handleItemSelected($event, item)" class="w-full block p-2 peer-checked:bg-dark-400 peer-checked:text-dark-900 transition-colors duration-300 ease-in" :for="`option${index}`">{{ item }}</label>
                </div>
            </form>

        </div>
    </div>

</template>