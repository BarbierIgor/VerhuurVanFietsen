<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import CustomSelect from '../components/CustomSelect.vue';

interface FileInfo {
    file: File,
    url: String,
}

export default defineComponent({
    data() {
        return {
            bikeNumber: null,
            storageNumber: null,
            description: null,
            files: new Array<FileInfo>(),
        }
    },
    methods: {
        onFileSelected(e: any) {
            const selectedFiles: Array<File> = e.currentTarget.files;
            if (selectedFiles) {
                console.log(selectedFiles);
                for (let i = 0; i < selectedFiles.length; i++) {
                    this.files.push({
                        file: e.currentTarget.files[i],
                        url: URL.createObjectURL(e.currentTarget.files[i]),
                    })
                }
            }
        },
        handleImageClick(index: number) {
            console.log(this.$refs[`image${index}`]);
            const image = this.$refs[`image${index}`];

            image.style.transform = "translate(50px, 50px)";
        },
        reportProblem() {
            // Save problem to database
        }
    },
    watch: {
        problem: function (val: any) {
            console.log(val);
        }
    },
    setup() {
    },
    components: { Header, CustomSelect }
})
</script>

<template>
    <div class="p-4">
        <Header title="Other"></Header>
        <div class="w-full mt-10 grid gap-8">
            <div>
                <h1 class="text-dark-600">Bike number <span class="text-dark-accent">*</span></h1>
                <input v-model="bikeNumber" class="transition-opacity duration-200 bg-transparent w-full text-dark-600 border border-dark-600 rounded-lg p-2 mt-4 opacity-30 focus:outline-none focus:opacity-100" type="text" placeholder="Bike number">
            </div>

            <div>
                <h1 class="text-dark-600">Bike number <span class="text-dark-accent">*</span></h1>
                <input v-model="storageNumber" class="transition-opacity duration-200 bg-transparent w-full text-dark-600 border border-dark-600 rounded-lg p-2 mt-4 opacity-30 focus:outline-none focus:opacity-100" type="text" placeholder="Bike number">
            </div>

            <div>
                <h1 class="text-dark-600">Description</h1>
                <input v-model="description" class="transition-opacity duration-200 bg-transparent w-full text-dark-600 border border-dark-600 rounded-lg p-2 mt-4 opacity-30 focus:outline-none focus:opacity-100" type="text" placeholder="Description">
            </div>

            <div>
                <h1 class="text-dark-600">Images</h1>
                <div class="mt-4">
                    <transition-group name="image-grid" tag="ul" class="transition duration-1000 grid gap-4 grid-cols-4 grid-rows-2" v-if="files.length > 0">
                        <li @click="handleImageClick(index)" v-for="(file, index) in files" :key="`image${index}`" :ref="`image${index}`" class="image-grid-item relative selected-image rounded-2xl">
                            <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover h-full w-full rounded-lg bg-dark-400" :src="file.url" :alt="`Image${index}`">
                        </li>

                        <label class="relative selected-image flex justify-center items-center rounded-lg bg-dark-400" key="add" for="images">
                            <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8" viewBox="0 0 26.667 26.668">
                                <path d="M-4224.166,1438.5a2.666,2.666,0,0,1,2.666,2.667v8h8a2.666,2.666,0,0,1,2.666,2.667,2.666,2.666,0,0,1-2.666,2.667h-8v8a2.666,2.666,0,0,1-2.666,2.667,2.666,2.666,0,0,1-2.667-2.667v-8h-8a2.666,2.666,0,0,1-2.667-2.667,2.666,2.666,0,0,1,2.667-2.667h8v-8A2.666,2.666,0,0,1-4224.166,1438.5Z" transform="translate(4237.5 -1438.5)" fill="#202020"/>
                            </svg>
                        </label>
                        <input @change="onFileSelected($event)" multiple hidden type="file" id="images" name="images" key="input" accept="image/png, image/jpeg">
                    </transition-group>

                    <div class="grid gap-4 grid-cols-4 grid-rows-2" v-else>
                        <label class="relative selected-image flex justify-center items-center rounded-lg bg-dark-400" for="images">
                            <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8" viewBox="0 0 26.667 26.668">
                                <path d="M-4224.166,1438.5a2.666,2.666,0,0,1,2.666,2.667v8h8a2.666,2.666,0,0,1,2.666,2.667,2.666,2.666,0,0,1-2.666,2.667h-8v8a2.666,2.666,0,0,1-2.666,2.667,2.666,2.666,0,0,1-2.667-2.667v-8h-8a2.666,2.666,0,0,1-2.667-2.667,2.666,2.666,0,0,1,2.667-2.667h8v-8A2.666,2.666,0,0,1-4224.166,1438.5Z" transform="translate(4237.5 -1438.5)" fill="#202020"/>
                            </svg>

                        </label>
                        <input @change="onFileSelected($event)" multiple hidden type="file" id="images" name="images" accept="image/png, image/jpeg">
                    </div>
                </div>
            </div>
        </div>

        <div class="fixed bottom-6 left-0 w-full h-12 px-6">
            <button @click="reportProblem" class="bg-dark-accent w-full h-full font-semibold rounded-lg text-dark-400 text-lg">Report</button>
        </div>
    </div>
</template>

<style>
    .image-grid-item {
        transition: all 0.3s;
    }

    .image-grid-enter, .image-grid-leave-to {
        opacity: 0;
        transform: scale(0);
    }
    .image-grid-enter-to {
        opacity: 1;
        transform: scale(1);
    }

    /* .image-grid-leave-active {
        position: absolute;
    } */

    .image-grid-move {
        opacity: 1;
        transition: all 0.5s;
    }
</style>
