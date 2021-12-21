<script lang="ts">
import { defineComponent } from 'vue'
import router from '../bootstrap/router'
import useFirebase from '../composables/useFirebase'

export default defineComponent({
    data() {
        return {
            firstName: null,
            lastName: null,
            email: null,
            password: null,

            showErrorMessage: false,
            errorMessage: '',

            showPassword: false,
        }
    },
    methods: {
        async signUp() {
            const { createUser } = useFirebase()
            if (
                this.email === null ||
                this.email === '' ||
                this.password === null ||
                this.password === '' ||
                this.firstName === null ||
                this.firstName === '' ||
                this.lastName === null ||
                this.password === ''
            ) {
                this.displayErrorMessage('Please fill in the required fields!')
            } else {
                await createUser(this.firstName, this.email, this.password)
                router.push({ path: '/login' })
            }
            // router.push({path: '/'})
        },
        displayErrorMessage(message: string) {
            console.log(message)
            this.showErrorMessage = true
            this.errorMessage = message
            setTimeout(() => {
                this.showErrorMessage = false
                this.errorMessage = ''
            }, 2000)
        },
        togglePassword() {
            this.showPassword = !this.showPassword
        },
    },
    setup() {

        return {

        }
    },
})
</script>

<template>
    <div class="bg-dark-900 bg-center bg-login-background h-screen w-screen">
        <h1 class="text-white text-5xl leading-none pt-32 pl-8 font-semibold">
            Create an<br />
            account<span class="text-dark-accent text-6xl leading-none">.</span>
        </h1>

        <div
            class="
                h-3/5
                w-screen
                bg-dark-700
                absolute
                bottom-0
                rounded-t-3xl
                flex
                items-center
                flex-col
            "
        >
            <h1 class="text-white text-2xl pt-8 pl-8 self-start">{{ $t('signup.SIGN_UP') }}</h1>
            <form
                @submit.prevent="signUp"
                class="flex justify-center flex-col w-full pl-8 pr-8 pt-8"
                novalidate
            >
                <div class="relative mb-6">
                    <input
                        v-model="firstName"
                        autocomplete="name"
                        class="
                            bg-transparent
                            peer
                            w-full
                            h-full
                            p-2
                            py-3
                            text-dark-600
                            border border-dark-600
                            opacity-50
                            focus:opacity-100
                            transition-opacity
                            duration-200
                            rounded-lg
                        "
                        :placeholder="$t('signup.FIRST_NAME')"
                        type="text"
                        required
                    />
                    <label
                        class="
                            absolute
                            bg-dark-700
                            px-2
                            -translate-y-2/3
                            opacity-100
                            peer-placeholder-shown:bg-opacity-0
                            peer-placeholder-shown:text-dark-600
                            peer-placeholder-shown:left-0
                            peer-placeholder-shown:translate-y-0
                            peer-placeholder-shown:opacity-0
                            transition-all
                            duration-200
                            left-2
                            text-dark-600
                            bg-opacity-100
                        "
                        for=""
                        >{{ $t('signup.FIRST_NAME') }}</label
                    >
                </div>

                <div class="relative mb-6">
                    <input
                        v-model="lastName"
                        autocomplete="family-name"
                        class="
                            bg-transparent
                            peer
                            w-full
                            h-full
                            p-2
                            py-3
                            text-dark-600
                            border border-dark-600
                            opacity-50
                            focus:opacity-100
                            transition-opacity
                            duration-200
                            rounded-lg
                        "
                        :placeholder="$t('signup.LAST_NAME')"
                        type="text"
                        required
                    />
                    <label
                        class="
                            absolute
                            bg-dark-700
                            px-2
                            -translate-y-2/3
                            opacity-100
                            peer-placeholder-shown:bg-opacity-0
                            peer-placeholder-shown:text-dark-600
                            peer-placeholder-shown:left-0
                            peer-placeholder-shown:translate-y-0
                            peer-placeholder-shown:opacity-0
                            transition-all
                            duration-200
                            left-2
                            text-dark-600
                            bg-opacity-100
                        "
                        for=""
                        >{{ $t('signup.LAST_NAME') }}</label
                    >
                </div>

                <div class="relative mb-6">
                    <input
                        v-model="email"
                        autocomplete="email"
                        class="
                            bg-transparent
                            peer
                            w-full
                            h-full
                            p-2
                            py-3
                            text-dark-600
                            border border-dark-600
                            opacity-50
                            focus:opacity-100
                            transition-opacity
                            duration-200
                            rounded-lg
                        "
                        :placeholder="$t('signin.EMAIL')"
                        type="text"
                        required
                    />
                    <label
                        class="
                            absolute
                            bg-dark-700
                            px-2
                            -translate-y-2/3
                            opacity-100
                            peer-placeholder-shown:bg-opacity-0
                            peer-placeholder-shown:text-dark-600
                            peer-placeholder-shown:left-0
                            peer-placeholder-shown:translate-y-0
                            peer-placeholder-shown:opacity-0
                            transition-all
                            duration-200
                            left-2
                            text-dark-600
                            bg-opacity-100
                        "
                        for=""
                        >{{ $t('signin.EMAIL') }}</label
                    >
                </div>

                <div class="relative mb-6">
                    <input
                        v-model="password"
                        autocomplete="new-password"
                        class="
                            bg-transparent
                            peer
                            w-full
                            h-full
                            p-2
                            py-3
                            text-dark-600
                            border border-dark-600
                            opacity-50
                            focus:opacity-100
                            transition-opacity
                            duration-200
                            rounded-lg
                        "
                        :placeholder="$t('signup.PASSWORD')"
                        :type="showPassword ? 'text' : 'password'"
                        required
                    />
                    <label
                        class="
                            absolute
                            bg-dark-700
                            px-2
                            -translate-y-2/3
                            opacity-100
                            peer-placeholder-shown:bg-opacity-0
                            peer-placeholder-shown:text-dark-600
                            peer-placeholder-shown:left-0
                            peer-placeholder-shown:translate-y-0
                            peer-placeholder-shown:opacity-0
                            transition-all
                            duration-200
                            left-2
                            text-dark-600
                            bg-opacity-100
                        "
                        for=""
                        >{{ $t('signup.PASSWORD') }}</label
                    >

                    <span
                        @click="togglePassword"
                        class="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            font-semibold
                            text-sm
                            overflow-hidden
                            rounded-md
                            py-1
                            w-14
                            transition-all
                            duration-200
                        "
                        :class="
                            showPassword
                                ? 'bg-dark-accent text-dark-400'
                                : 'bg-dark-600 text-dark-900'
                        "
                    >
                        <div
                            class="
                                flex
                                justify-start
                                items-center
                                w-28
                                transition-transform
                                duration-200
                            "
                            :class="
                                showPassword
                                    ? '-translate-x-14'
                                    : 'translate-x-0'
                            "
                        >
                            <p class="text-center w-14">show</p>
                            <p class="text-center w-14">hide</p>
                        </div>
                    </span>
                </div>

                <input
                    class="bg-dark-accent text-white rounded-lg p-2 mb-2"
                    type="submit"
                    :value="$t('signup.SIGN_UP')"
                />
            </form>

            <p class="text-dark-600 absolute bottom-4">
                {{ $t('signup.ALREADY_HAVE_ACCOUNT') }}
                <RouterLink
                    class="text-dark-accent"
                    exact-active-class="text-dark-600"
                    to="/login"
                    >{{ $t('signin.LOGIN') }}</RouterLink
                >
            </p>
        </div>
    </div>

    <!-- Error message -->
    <div
        :class="
            showErrorMessage
                ? 'translate-y-0 opacity-100'
                : 'opacity-0 -translate-y-full'
        "
        class="
            fixed
            top-0
            left-0
            p-4
            w-full
            h-24
            min-h-16
            flex
            justify-center
            items-center
            transition-all
            duration-300
        "
    >
        <div
            class="
                w-full
                h-full
                bg-dark-700
                rounded-lg
                flex
                justify-center
                items-center
                text-dark-accent text-lg
                font-semibold
            "
        >
            <p>{{ errorMessage }}</p>
        </div>
    </div>
</template>
