<script lang="ts">
import { defineComponent } from 'vue'
import router from '../bootstrap/router'

export default defineComponent({
    data() {
        return {
            firstName: null,
            lastName: null,
            email: null,
            password: null,

            showErrorMessage: false,
            errorMessage: '',
        }
    },  
    methods: {
        signUp() {
            if (
                (this.email === null || this.email === '') || 
                (this.password === null || this.password === '') || 
                (this.firstName === null || this.firstName === '') || 
                (this.lastName === null || this.password === '')
            ) {
                this.displayErrorMessage("Please fill in the required fields!")
            } else {
                router.push({path: '/'})
            }
            // router.push({path: '/'})
        },
        displayErrorMessage(message: string) {
            console.log(message);
                this.showErrorMessage = true;
                this.errorMessage = message;
            setTimeout(() => {
                this.showErrorMessage = false;
                this.errorMessage = '';
            }, 2000);
        }
    },
    setup() {
        
    },
})
</script>


<template>
    <div class="bg-dark-900 bg-center bg-login-background h-screen w-screen">
        <h1 class="text-white text-5xl leading-none pt-32 pl-8 font-semibold">
            Create an<br/> 
            account<span class="text-dark-accent text-6xl leading-none">.</span>
        </h1>

        <div class="h-3/5 w-screen bg-dark-700 absolute bottom-0 rounded-t-3xl flex items-center flex-col">
            <h1 class="text-white text-2xl pt-8 pl-8 self-start">Sign up</h1>
            <form @submit.prevent="signUp" class="flex justify-center flex-col w-full pl-8 pr-8 pt-8" novalidate>
                <div class="relative mb-6">
                    <input v-model="firstName" autocomplete="name" class="bg-transparent peer w-full h-full p-2 py-3 text-dark-600 border border-dark-600 opacity-50 focus:opacity-100 transition-opacity duration-200 rounded-lg" placeholder="First name" type="text" required>
                    <label 
                        class="
                            absolute bg-dark-700 px-2 -translate-y-2/3 opacity-100
                            peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:text-dark-600 peer-placeholder-shown:left-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:opacity-0
                            transition-all duration-200
                            left-2 text-dark-600 bg-opacity-100

                        " for="">First name</label>
                </div>

                <div class="relative mb-6">
                    <input v-model="lastName" autocomplete="family-name" class="bg-transparent peer w-full h-full p-2 py-3 text-dark-600 border border-dark-600 opacity-50 focus:opacity-100 transition-opacity duration-200 rounded-lg" placeholder="Last name" type="text" required>
                    <label 
                        class="
                            absolute bg-dark-700 px-2 -translate-y-2/3 opacity-100
                            peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:text-dark-600 peer-placeholder-shown:left-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:opacity-0
                            transition-all duration-200
                            left-2 text-dark-600 bg-opacity-100

                        " for="">Last name</label>
                </div>

                <div class="relative mb-6">
                    <input v-model="email" autocomplete="email" class="bg-transparent peer w-full h-full p-2 py-3 text-dark-600 border border-dark-600 opacity-50 focus:opacity-100 transition-opacity duration-200 rounded-lg" placeholder="Email" type="text" required>
                    <label 
                        class="
                            absolute bg-dark-700 px-2 -translate-y-2/3 opacity-100
                            peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:text-dark-600 peer-placeholder-shown:left-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:opacity-0
                            transition-all duration-200
                            left-2 text-dark-600 bg-opacity-100

                        " for="">Email</label>
                </div>

                <div class="relative mb-6">
                    <input v-model="password" autocomplete="new-password" class="bg-transparent peer w-full h-full p-2 py-3 text-dark-600 border border-dark-600 opacity-50 focus:opacity-100 transition-opacity duration-200 rounded-lg" placeholder="Password" type="password" required>
                    <label 
                        class="
                            absolute bg-dark-700 px-2 -translate-y-2/3 opacity-100
                            peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:text-dark-600 peer-placeholder-shown:left-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:opacity-0
                            transition-all duration-200
                            left-2 text-dark-600 bg-opacity-100

                        " for="">Password</label>
                </div>

                <!-- <input v-model="firstName" autocomplete="name" class="bg-transparent text-dark-600 border border-dark-600 rounded-xl p-2 mb-4" type="text" placeholder="First name">
                <input v-model="lastName" autocomplete="family-name" class="bg-transparent text-dark-600 border border-dark-600 rounded-xl p-2 mb-4" type="text" placeholder="Last name">
                <input v-model="email" autocomplete="email" class="bg-transparent text-dark-600 border border-dark-600 rounded-xl p-2 mb-4" type="text" placeholder="Email">
                <input v-model="password" autocomplete="new-password" class="bg-transparent text-dark-600 border border-dark-600 rounded-xl p-2 mb-4" type="password" placeholder="Password"> -->
                <input class="bg-dark-accent text-white rounded-lg p-2 mb-2" type="submit" value="Sign Up">
            </form>

            <p class="text-dark-600 absolute bottom-4">Already have an account? <RouterLink class="text-dark-accent" exact-active-class="text-dark-600" to="/login">Sign In</RouterLink></p>
        </div>
    </div>

    <!-- Error message -->
    <div :class="showErrorMessage ? 'translate-y-0 opacity-100' : 'opacity-0 -translate-y-full'" class="fixed top-0 left-0 p-4 w-full h-24 min-h-16 flex justify-center items-center transition-all duration-300">
        <div class="w-full h-full bg-dark-700 rounded-lg flex justify-center items-center text-dark-accent text-lg font-semibold">
            <p>{{ errorMessage }}</p>
        </div>
    </div>
</template>