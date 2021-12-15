<script lang="ts">
import { defineComponent } from 'vue'
import router from '../bootstrap/router'
import Header from '../components/Header.vue'
import useFirebase from '../composables/useFirebase'
import { getAuth } from 'firebase/auth'

export default defineComponent({
    data() {
        return {
            currentPassword: null,
            newPassword: null,
            confirmedNewPassword: null,
        }
    },
    methods: {
        async savePassword() {
            try {
                const { editPassword } = useFirebase()
                if (
                    this.newPassword === this.confirmedNewPassword &&
                    this.newPassword !== null &&
                    this.newPassword !== ''
                ) {
                    editPassword(this.newPassword)
                    console.log('Password saved!')
                    router.push({
                        path: '/profile/edit',
                    })
                }
            } catch (error) {
                console.error(error)
            }
        },
    },
    setup() {},
    components: { Header },
})
</script>

<template>
    <div class="p-4">
        <Header title="Change password"></Header>

        <form class="w-full mt-10 grid gap-8">
            <input type="text" autocomplete="username" hidden />
            <!-- <div>
                <h1 class="text-dark-600">Current password</h1>
                <input
                    v-model="currentPassword"
                    class="
                        transition-opacity
                        duration-200
                        bg-transparent
                        w-full
                        text-dark-600
                        border border-dark-600
                        rounded-lg
                        p-2
                        mt-4
                        opacity-30
                        focus:outline-none focus:opacity-100
                    "
                    type="password"
                    autocomplete="current-password"
                    placeholder="Current password"
                />
            </div> -->

            <div>
                <h1 class="text-dark-600">New password</h1>
                <input
                    v-model="newPassword"
                    class="
                        transition-opacity
                        duration-200
                        bg-transparent
                        w-full
                        text-dark-600
                        border border-dark-600
                        rounded-lg
                        p-2
                        mt-4
                        opacity-30
                        focus:outline-none focus:opacity-100
                    "
                    type="password"
                    autocomplete="new-password"
                    placeholder="New password"
                />
            </div>

            <div>
                <h1 class="text-dark-600">Confirm new password</h1>
                <input
                    v-model="confirmedNewPassword"
                    class="
                        transition-opacity
                        duration-200
                        bg-transparent
                        w-full
                        text-dark-600
                        border border-dark-600
                        rounded-lg
                        p-2
                        mt-4
                        opacity-30
                        focus:outline-none focus:opacity-100
                    "
                    type="password"
                    autocomplete="new-password"
                    placeholder="Confirm new password"
                />
            </div>
        </form>

        <div class="fixed bottom-6 left-0 w-full h-12 px-6">
            <button
                @click="savePassword"
                class="
                    bg-dark-accent
                    w-full
                    h-full
                    font-semibold
                    rounded-lg
                    text-dark-400 text-lg
                "
            >
                Save password
            </button>
        </div>
    </div>
</template>
