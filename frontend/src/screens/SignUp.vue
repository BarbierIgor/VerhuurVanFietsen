<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
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
            <div class="flex justify-center flex-col w-full pl-8 pr-8 pt-4">
                <input v-model="firstName" class="bg-transparent text-dark-600 border border-dark-600 rounded-xl p-2 mb-4" type="text" placeholder="First name">
                <input v-model="lastName" class="bg-transparent text-dark-600 border border-dark-600 rounded-xl p-2 mb-4" type="text" placeholder="Last name">
                <input v-model="email" class="bg-transparent text-dark-600 border border-dark-600 rounded-xl p-2 mb-4" type="text" placeholder="Email">
                <input v-model="password" class="bg-transparent text-dark-600 border border-dark-600 rounded-xl p-2 mb-4" type="password" placeholder="Password">
                <input class="bg-dark-accent text-white rounded-lg p-2 mb-2" type="button" value="Sign Up">
            </div>

            <p class="text-dark-600 absolute bottom-4">Already have an account? <RouterLink class="text-dark-accent" exact-active-class="text-dark-600" to="/login">Sign In</RouterLink></p>
            <!-- <p class="text-dark-600 absolute bottom-4">Already have an account? <a href="#" class="text-dark-accent">Sign in</a></p> -->
        </div>
    </div>
</template>