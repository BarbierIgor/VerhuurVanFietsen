<script lang="ts">
import { defineComponent } from 'vue'
import router from '../bootstrap/router'
import Header from '../components/Header.vue'

export default defineComponent({
    data() {
        return {
            firstName: null,
            lastName: null,
            email: null,
        }
    },

    methods: {
        saveChanges() {
            router.push({ path: '/profile' })
        },
    },
    setup() {
    },
    components: { Header }
})
</script>


<template>
    <div class="grid grid-cols-1 p-4 justify-center w-screen gap-4">
        <Header></Header>

        <!-- profile picture -->
        <picture class="flex justify-center w-full">
            <div class="relative rounded-full w-36 h-36">
                <img class="rounded-full bg-dark-600 w-full" src="../assets/images/profile_pic.png" alt="Profile Picture">
                <input type="file" name="selectImage" accept="image/png, image/jpeg" hidden id="selectImage">
                <label for="selectImage" class="absolute bottom-0 right-0 w-10 h-10 bg-dark-accent rounded-full flex justify-center items-center">
                    <svg class="w-1/2 h-1/2" viewBox="0 0 14.501 13.593">
                        <g transform="translate(-2 -2.503)">
                            <g transform="translate(2 2.503)">
                                <path d="M11.034,2.5a1.359,1.359,0,0,1,1.153.64l.919,1.473h1.431A1.964,1.964,0,0,1,16.5,6.58v7.553A1.964,1.964,0,0,1,14.538,16.1H3.964A1.964,1.964,0,0,1,2,14.133V6.58A1.964,1.964,0,0,1,3.964,4.616H5.516l.835-1.437A1.36,1.36,0,0,1,7.526,2.5ZM9.251,6.732a3.323,3.323,0,1,0,3.323,3.323A3.323,3.323,0,0,0,9.251,6.732Zm0,.906a2.417,2.417,0,1,1-2.417,2.417A2.417,2.417,0,0,1,9.251,7.639Z" transform="translate(-2 -2.503)" fill="#dedede"/>
                            </g>
                        </g>
                    </svg>
                </label>
            </div>
        </picture>

        <h1 class="text-3xl font-bold my-4 text-dark-400 text-center">
            Felix Vandemaele
        </h1>

        <!-- Form -->
        <div class="w-full mt-0 grid gap-4">
            <div>
                <h1 class="text-dark-600">First name</h1>
                <input v-model="firstName" class="transition-opacity duration-200 bg-transparent w-full text-dark-600 border border-dark-600 rounded-lg p-2 mt-4 opacity-30 focus:outline-none focus:opacity-100" type="text" placeholder="First name">
            </div>

            <div>
                <h1 class="text-dark-600">Last name</h1>
                <input v-model="lastName" class="transition-opacity duration-200 bg-transparent w-full text-dark-600 border border-dark-600 rounded-lg p-2 mt-4 opacity-30 focus:outline-none focus:opacity-100" type="text" placeholder="Last name">
            </div>

            <div>
                <h1 class="text-dark-600">Email</h1>
                <input v-model="email" class="transition-opacity duration-200 bg-transparent w-full text-dark-600 border border-dark-600 rounded-lg p-2 mt-4 opacity-30 focus:outline-none focus:opacity-100" type="text" placeholder="Email">
            </div>
        </div>

        <router-link class="flex w-full items-center justify-between py-2" to="/profile/edit/password">
            <div class="flex items-center">s
                <p class="justify-self-start text-dark-400 font-bold">Change password</p>
            </div>

            <div class="flex items-center">
                <svg class="w-4 h-4" viewBox="0 0 9.519 14.795">
                    <g transform="translate(2.121 2.121)" opacity="0.5">
                        <line data-name="Line 3" x2="7.461" transform="translate(5.276 5.276) rotate(135)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="3"/>
                        <line data-name="Line 4" x2="7.461" transform="translate(5.276 5.276) rotate(-135)" fill="none" stroke="#dedede" stroke-linecap="round" stroke-width="3"/>
                    </g>
                </svg>
            </div>
        </router-link>

        <div class="fixed bottom-6 left-0 w-full h-12 px-6">
            <button @click="saveChanges" class="bg-dark-accent w-full h-full font-semibold rounded-lg text-dark-400 text-lg">Save changes</button>
        </div>        



    </div>
</template>
