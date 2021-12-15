<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '../bootstrap/router'
import Header from '../components/Header.vue'
import ImageCarousel from '../components/ImageCarousel.vue'
import { get, remove } from '../composables/networkComposable'
import useFirebase from '../composables/useFirebase'
import { Problem } from '../interfaces/Problem'

export default defineComponent({
    // data() {
    //     return {
    //         problem: {
    //             type: new Array<Problem>(),
    //         },
    //         loading: false,
    //     }
    // },
    // mounted() {
    //     this.getData()
    // },
    // methods: {
    //     getData() {
    //         console.log('Getting data')
    //         this.loading = true
    //         setTimeout(() => {
    //             this.problem = data.find(
    //                 (item: Problem) =>
    //                     item.id === Number(this.$route.params.id),
    //             )
    //             this.loading = false
    //         }, 500)
    //     },
    // },
    setup() {
        const route = useRoute()
        const problem: Ref<any> = ref({})
        const userInfo = JSON.parse(localStorage.getItem('userInfo') as any)

        const getData = async () => {
            const data = await get(
                `problem/${route.params.id}`,
                userInfo.bearerToken,
            )
            console.log(data)
            problem.value = data
        }

        const problemSolved = async (id: number) => {
            const { deleteProblemImage } = useFirebase()
            const res = await remove(`problem/${id}`, userInfo.bearerToken)
            console.log(res)

            deleteProblemImage(id)
            router.push({ path: '/admin/problems' })
        }

        getData()
        return { problem, problemSolved }
    },
    components: { Header, ImageCarousel },
})
</script>

<template>
    <div class="p-4">
        <Header class="mb-4" :title="problem.category"></Header>

        <ImageCarousel :images="problem.imageUrls"></ImageCarousel>

        <div class="grid gap-4 w-full mt-4">
            <div>
                <h2 class="text-dark-600 py-1">Problem category</h2>
                <p class="text-dark-400">{{ problem.category }}</p>
            </div>

            <!-- <div>
                <h2 class="text-dark-600 py-1">Broken part</h2>
                <p class="text-dark-400">Wheel</p>
            </div> -->

            <div v-if="problem.description != null">
                <h2 class="text-dark-600 py-1">Description</h2>
                <p class="text-dark-400 max-h-24 overflow-y-scroll">
                    {{ problem.description }}
                </p>
            </div>

            <div>
                <h2 class="text-dark-600 py-1">Date</h2>
                <p class="text-dark-400">{{ problem.date }}</p>
            </div>

            <div v-if="problem.category == 'bike'">
                <h2 class="text-dark-600 py-1">Bike number</h2>
                <p class="text-dark-400">{{ problem.bike.id }}</p>
            </div>

            <div v-if="problem.category == 'bikestorage'">
                <h2 class="text-dark-600 py-1">Bikestorage number</h2>
                <p class="text-dark-400">{{ problem.bikeStorage.id }}</p>
            </div>

            <div v-if="problem.category == 'unrecognized bike'">
                <h2 class="text-dark-600 py-1">Bike number</h2>
                <p class="text-dark-400">{{ problem.bike.id }}</p>
            </div>

            <div class="fixed bottom-6 left-0 w-full h-12 px-6">
                <button
                    @click="problemSolved(problem.id)"
                    class="
                        bg-dark-accent
                        w-full
                        h-full
                        font-semibold
                        rounded-lg
                        text-dark-400 text-lg
                    "
                >
                    Solve problem
                </button>
            </div>
        </div>
    </div>
</template>
