<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'

interface FileInfo {
    file: File,
    url: String,
}

export default defineComponent({
    data() {
        return {
            files: new Array<FileInfo>(),
        }
    },
    methods: {
        onFileSelected(e: any) {
            const selectedFiles: Array<File> = e.currentTarget.files;
            if (selectedFiles) {
                for (let i = 0; i < selectedFiles.length; i++) {
                    this.files.push({
                        file: e.currentTarget.files[i],
                        url: URL.createObjectURL(e.currentTarget.files[i]),
                    })
                }
            }
        },
    },
    setup() {
    },
    components: { Header }
})
</script>

<template>
    <div class="p-4">
        <Header title="Defect Bike"></Header>
        <div class="w-full mt-10 grid gap-8">
            <div>
                <h1 class="text-dark-600">Bike number <span class="text-dark-accent">*</span></h1>
                <input class="transition-opacity duration-200 bg-transparent w-full text-dark-600 border border-dark-600 rounded-lg p-2 mt-4 opacity-30 focus:outline-none focus:opacity-100" type="text" placeholder="Bike number">
            </div>

            <div>
                <h1 class="text-dark-600">Problem</h1>
                <select 
                    class="
                        w-full
                        text-dark-600
                        border
                        border-dark-600
                        rounded-lg
                        p-2
                        mt-4
                        opacity-30
                        bg-transparent
                        focus:outline-none focus:opacity-100
                        transition-opacity duration-200
                    " 
                    name="problem" 
                    id="problem"
                >
                    <option v-for="item in 5" :key="item" :value="`option${item}`">
                        {{`Option ${item}`}}
                    </option>
                </select>
            </div>

            <div>
                <h1 class="text-dark-600">Description</h1>
                <input class="transition-opacity duration-200 bg-transparent w-full text-dark-600 border border-dark-600 rounded-lg p-2 mt-4 opacity-30 focus:outline-none focus:opacity-100" type="text" placeholder="Description">
            </div>

            <div>
                <h1 class="text-dark-600">Images</h1>
                <div class="mt-4">
                    <div class="grid gap-4 grid-cols-4 grid-rows-2" v-if="files.length > 0">
                        <div v-for="(file, index) in files" :key="index" class="relative selected-image rounded-2xl">
                            <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover h-full w-full rounded-2xl bg-dark-400" :src="file.url" :alt="`Image${index}`">
                        </div>

                        <label class="relative selected-image flex justify-center items-center rounded-2xl bg-dark-400" for="images">
                            <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8" viewBox="0 0 26.667 26.668">
                                <path d="M-4224.166,1438.5a2.666,2.666,0,0,1,2.666,2.667v8h8a2.666,2.666,0,0,1,2.666,2.667,2.666,2.666,0,0,1-2.666,2.667h-8v8a2.666,2.666,0,0,1-2.666,2.667,2.666,2.666,0,0,1-2.667-2.667v-8h-8a2.666,2.666,0,0,1-2.667-2.667,2.666,2.666,0,0,1,2.667-2.667h8v-8A2.666,2.666,0,0,1-4224.166,1438.5Z" transform="translate(4237.5 -1438.5)" fill="#202020"/>
                            </svg>

                        </label>
                        <input @change="onFileSelected($event)" multiple hidden type="file" id="images" name="images" accept="image/png, image/jpeg">
                    </div>

                    <div class="grid gap-4 grid-cols-4 grid-rows-2" v-else>
                        <label class="relative selected-image flex justify-center items-center rounded-2xl bg-dark-400" for="images">
                            <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8" viewBox="0 0 26.667 26.668">
                                <path d="M-4224.166,1438.5a2.666,2.666,0,0,1,2.666,2.667v8h8a2.666,2.666,0,0,1,2.666,2.667,2.666,2.666,0,0,1-2.666,2.667h-8v8a2.666,2.666,0,0,1-2.666,2.667,2.666,2.666,0,0,1-2.667-2.667v-8h-8a2.666,2.666,0,0,1-2.667-2.667,2.666,2.666,0,0,1,2.667-2.667h8v-8A2.666,2.666,0,0,1-4224.166,1438.5Z" transform="translate(4237.5 -1438.5)" fill="#202020"/>
                            </svg>

                        </label>
                        <input @change="onFileSelected($event)" multiple hidden type="file" id="images" name="images" accept="image/png, image/jpeg">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
