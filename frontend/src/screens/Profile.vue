<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '../bootstrap/router'
import ToggleSwitch from '../components/ToggleSwitch.vue'
import Header from '../components/Header.vue'
import SelectOverlay from '../components/SelectOverlay.vue'
import useFirebase from '../composables/useFirebase'
import { Problem } from '../interfaces/Problem'
import { get } from '../composables/networkComposable'
import { useStore } from 'vuex'
import i18n, { CURRENT_LANGUAGE, loadLocaleMessages, SUPPORT_LOCALES } from '../plugins/i18n-setup'

export default defineComponent({
    data() {
        return {
            toggleDark: true,
            measurementUnit: null,
            language: null,
            isLanguageModalActive: false,
            isDistanceUnitsModalActive: false,
            overlayActive: false,
        }
    },
    ready: {},
    methods: {
        handleEditButton(): void {
            router.push({
                name: 'Login',
                params: { goToEditProfile: 1 },
            })
        },
        handleBackButton(): void {
            router.go(-1)
        },
        handleLogoutButton() {
            const { logout } = useFirebase()
            localStorage.removeItem('userInfo')
            logout()
            router.push('/login')
        },
        handleClickReport() {},

        toggleModal(modalName: String = ''): void {
            if (modalName == 'distanceUnits') {
                if (this.isDistanceUnitsModalActive) {
                    this.isDistanceUnitsModalActive = false
                } else {
                    this.isDistanceUnitsModalActive = true
                }
            } else if (modalName == 'language') {
                if (this.isLanguageModalActive) {
                    this.isLanguageModalActive = false
                } else {
                    this.isLanguageModalActive = true
                }
            } else if (modalName == '') {
                this.isLanguageModalActive = false
                this.isDistanceUnitsModalActive = false
            }
        },
    },
    setup() {
        const { user } = useFirebase()
        const store = useStore()
        const userInfo = JSON.parse(localStorage.getItem('userInfo') as any)
        const isAdmin = userInfo.isAdmin
        const problems: Ref<any> = ref([])
        const userdb: Ref<any> = ref({})

        var data: Problem[] = []

        const getProblems = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') as any)
            data = await get('problem/all', userInfo.bearerToken)
            console.log(data)
            problems.value = data
        }

        const getData = async () => {
            const dataUserDb = await get(
                `user/${userInfo.userId}`,
                userInfo.bearerToken,
            )
            userdb.value = dataUserDb
        }

        const toggleDarkMode = (isChecked: boolean) => {
            console.log(isChecked)
            store.commit('toggleDarkMode')
        }

        const updateUnits = (unit: string): void => {
            store.commit('updateUnits', unit)
        }

        const updateLanguage = async (language: string) => {
            store.commit('updateLanguage', language)
            // console.log(SUPPORT_LOCALES)
            if (SUPPORT_LOCALES.includes(language)) {
                await loadLocaleMessages(i18n, language)
                i18n.global.locale = language
            }
        }

        const getLanguageFromLocale = (locale: string): string => {
            const languages = new Intl.DisplayNames([locale], { type: 'language' });
            // console.log(languages.of(locale))
            return languages.of(locale)
        }

        if (isAdmin) {
            getProblems()
        }
        getData()

        return {
            user,
            isAdmin,
            problems,
            toggleDarkMode,
            store,
            updateUnits,
            updateLanguage,
            userdb,
            getLanguageFromLocale,
            SUPPORT_LOCALES,
            CURRENT_LANGUAGE,
        }
    },
    components: { ToggleSwitch, Header, SelectOverlay },
})
</script>

<template>
    <div class="grid grid-cols-1 p-4 justify-center w-screen h-screen gap-4">
        <div class="grid grid-cols-1 justify-center w-full gap-4">
            <Header></Header>

            <!-- profile picture -->
            <picture class="flex justify-center w-full">
                <img
                    v-if="user?.photoURL"
                    class="rounded-full bg-dark-600 w-36 h-36"
                    :src="user.photoURL"
                    alt="Profile Picture"
                />
                <img
                    v-if="!user?.photoURL"
                    class="rounded-full bg-dark-600 w-36 h-36"
                    src="../assets/images/default-profile.png"
                    alt="Profile Picture"
                />
            </picture>

            <!-- Name -->
            <h1 class="text-3xl font-bold my-4 text-dark-400 text-center">
                {{ user?.displayName }}
            </h1>

            <!-- Edit Button -->
            <div class="flex justify-center">
                <div
                    @click="handleEditButton"
                    class="
                        flex
                        items-center
                        bg-dark-accent
                        py-1
                        px-4
                        rounded-full
                        cursor-pointer
                    "
                >
                    <p class="text-dark-400 font-bold">Edit profile</p>
                    <svg
                        class="w-4 h-4 ml-4 rotate-180"
                        viewBox="0 0 15.515 23.959"
                    >
                        <g
                            id="Group_52"
                            data-name="Group 52"
                            transform="translate(3.536 3.535)"
                        >
                            <line
                                id="Line_3"
                                data-name="Line 3"
                                x2="11.942"
                                transform="translate(0 8.444) rotate(45)"
                                fill="none"
                                stroke="#dedede"
                                stroke-linecap="round"
                                stroke-width="5"
                            />
                            <line
                                id="Line_4"
                                data-name="Line 4"
                                x2="11.942"
                                transform="translate(0 8.444) rotate(-45)"
                                fill="none"
                                stroke="#dedede"
                                stroke-linecap="round"
                                stroke-width="5"
                            />
                        </g>
                    </svg>
                </div>
            </div>
            <div class="flex justify-center">
                <div
                    @click="handleLogoutButton"
                    class="
                        flex
                        items-center
                        bg-dark-accent
                        py-1
                        px-4
                        rounded-full
                        cursor-pointer
                    "
                >
                    <p class="text-dark-400 font-bold">Logout</p>
                    <svg
                        class="w-4 h-4 ml-4 rotate-180"
                        viewBox="0 0 15.515 23.959"
                    >
                        <g
                            id="Group_52"
                            data-name="Group 52"
                            transform="translate(3.536 3.535)"
                        >
                            <line
                                id="Line_3"
                                data-name="Line 3"
                                x2="11.942"
                                transform="translate(0 8.444) rotate(45)"
                                fill="none"
                                stroke="#dedede"
                                stroke-linecap="round"
                                stroke-width="5"
                            />
                            <line
                                id="Line_4"
                                data-name="Line 4"
                                x2="11.942"
                                transform="translate(0 8.444) rotate(-45)"
                                fill="none"
                                stroke="#dedede"
                                stroke-linecap="round"
                                stroke-width="5"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>

        <div
            class="
                grid grid-cols-1
                justify-center
                w-full
                gap-4
                overflow-y-scroll
            "
        >
            <!-- Report a problem -->
            <router-link
                to="/report"
                @click="handleClickReport"
                class="flex items-center my-4 py-2"
            >
                <svg class="w-6 h-6" viewBox="0 0 29.009 26.802">
                    <g data-name="Report icon" transform="translate(2.505 2.5)">
                        <g
                            data-name="Path 32"
                            transform="translate(-7.395 -9.846)"
                            fill="none"
                            stroke-linecap="round"
                        >
                            <path
                                d="M15.64,12a4.347,4.347,0,0,1,7.51,0L30.8,25.111a4.347,4.347,0,0,1-3.755,6.537H11.749a4.347,4.347,0,0,1-3.755-6.537Z"
                                stroke="none"
                            />
                            <path
                                d="M 19.39530944824219 9.846347808837891 C 17.93721008300781 9.846347808837891 16.4791088104248 10.56525230407715 15.64039039611816 12.00306129455566 L 7.9940185546875 25.11112213134766 C 6.303508758544922 28.00914192199707 8.393899917602539 31.64858245849609 11.74893951416016 31.64858245849609 L 27.04167938232422 31.64858245849609 C 30.39671897888184 31.64858245849609 32.48711013793945 28.00914192199707 30.79660034179688 25.11112213134766 L 23.15023040771484 12.00306129455566 C 22.31151008605957 10.56525230407715 20.85340881347656 9.846347808837891 19.39530944824219 9.846347808837891 M 19.39530944824219 7.346340179443359 C 21.85787963867188 7.346340179443359 24.0688591003418 8.616260528564453 25.30967903137207 10.7433910369873 L 32.95605087280273 23.85144233703613 C 34.20652770996094 25.99513244628906 34.21514129638672 28.55973052978516 32.97908020019531 30.71176147460938 C 31.74300956726074 32.86379241943359 29.52342987060547 34.14858245849609 27.04167938232422 34.14858245849609 L 11.74893951416016 34.14858245849609 C 9.267189025878906 34.14858245849609 7.047609329223633 32.86379241943359 5.811538696289062 30.71176147460938 C 4.575477600097656 28.55973052978516 4.584091186523438 25.99513244628906 5.834568023681641 23.85144233703613 L 13.4809398651123 10.74338150024414 C 14.72175979614258 8.616260528564453 16.9327392578125 7.346340179443359 19.39530944824219 7.346340179443359 Z"
                                stroke="none"
                                fill="#e64650"
                            />
                        </g>
                        <path
                            data-name="Line 27"
                            d="M-1.769,6.851A1.231,1.231,0,0,1-3,5.62V-1.769A1.231,1.231,0,0,1-1.769-3,1.231,1.231,0,0,1-.537-1.769V5.62A1.231,1.231,0,0,1-1.769,6.851Z"
                            transform="translate(13.769 7.183)"
                            fill="#e64650"
                        />
                        <path
                            data-name="Path 31"
                            d="M1.231,0A1.231,1.231,0,1,1,0,1.231,1.231,1.231,0,0,1,1.231,0Z"
                            transform="translate(10.769 16.466)"
                            fill="#e64650"
                        />
                    </g>
                </svg>
                <!-- <p class="text-md text-dark-400 mx-4">{{ $t('home.HOME_TITLE') }}</p> -->
                <p class="text-md text-dark-400 mx-4">Report a problem</p>
                <svg class="w-4 h-4" viewBox="0 0 9.519 14.795">
                    <g data-name="Group 82" transform="translate(2.121 2.121)">
                        <path
                            data-name="Line 3"
                            d="M7.461,1.5H0A1.5,1.5,0,0,1-1.5,0,1.5,1.5,0,0,1,0-1.5H7.461A1.5,1.5,0,0,1,8.961,0,1.5,1.5,0,0,1,7.461,1.5Z"
                            transform="translate(5.276 5.276) rotate(135)"
                            fill="#dedede"
                        />
                        <path
                            data-name="Line 4"
                            d="M7.461,1.5H0A1.5,1.5,0,0,1-1.5,0,1.5,1.5,0,0,1,0-1.5H7.461A1.5,1.5,0,0,1,8.961,0,1.5,1.5,0,0,1,7.461,1.5Z"
                            transform="translate(5.276 5.276) rotate(-135)"
                            fill="#dedede"
                        />
                    </g>
                </svg>
            </router-link>

            <!-- Section Admin -->
            <div v-if="isAdmin" class="my-2">
                <h1 class="text-dark-600">Admin</h1>
                <router-link
                    to="/admin/problems"
                    class="flex w-full items-center justify-between py-2"
                >
                    <div class="flex items-center">
                        <svg class="w-4 h-4" viewBox="0 0 21.283 19.784">
                            <g transform="translate(2.505 2.5)">
                                <g
                                    transform="translate(-7.395 -9.846)"
                                    fill="none"
                                    stroke-linecap="round"
                                >
                                    <path
                                        d="M12.986,11.309a2.948,2.948,0,0,1,5.092,0L23.263,20.2a2.948,2.948,0,0,1-2.546,4.433H10.347A2.948,2.948,0,0,1,7.8,20.2Z"
                                        stroke="none"
                                    />
                                    <path
                                        d="M 15.5323600769043 9.846347808837891 C 14.54364204406738 9.846347808837891 13.55492401123047 10.33382797241211 12.98619842529297 11.30878829956055 L 7.801288604736328 20.19719696044922 C 6.654979705810547 22.16230773925781 8.072439193725586 24.63016891479492 10.34745979309082 24.63016891479492 L 20.71726989746094 24.63016891479492 C 22.99227905273438 24.63016891479492 24.40973854064941 22.16230773925781 23.26342964172363 20.19719696044922 L 18.07852935791016 11.30878829956055 C 17.50979995727539 10.33382797241211 16.52108001708984 9.846347808837891 15.5323600769043 9.846347808837891 M 15.53235912322998 7.346347808837891 C 17.49163818359375 7.346347808837891 19.2507495880127 8.356727600097656 20.23796844482422 10.04910850524902 L 25.42287826538086 18.93751907348633 C 26.41778945922852 20.64308929443359 26.42463874816895 22.68355941772461 25.44120025634766 24.39575958251953 C 24.45775985717773 26.10795783996582 22.69179916381836 27.13016891479492 20.71726989746094 27.13016891479492 L 10.34745979309082 27.13016891479492 C 8.372919082641602 27.13016891479492 6.606958389282227 26.10795783996582 5.623519897460938 24.39575958251953 C 4.640079498291016 22.68354797363281 4.646928787231445 20.64308929443359 5.641839981079102 18.93752861022949 L 10.82674980163574 10.04910850524902 C 11.8139591217041 8.356727600097656 13.57306861877441 7.346347808837891 15.53235912322998 7.346347808837891 Z"
                                        stroke="none"
                                        fill="#dedede"
                                    />
                                </g>
                                <path
                                    d="M-2.165,3.68A.835.835,0,0,1-3,2.845v-5.01A.835.835,0,0,1-2.165-3a.835.835,0,0,1,.835.835v5.01A.835.835,0,0,1-2.165,3.68Z"
                                    transform="translate(10.302 5.836)"
                                    fill="#dedede"
                                />
                                <path
                                    d="M.835,0A.835.835,0,1,1,0,.835.835.835,0,0,1,.835,0Z"
                                    transform="translate(7.302 11.166)"
                                    fill="#dedede"
                                />
                            </g>
                        </svg>

                        <p class="mx-4 justify-self-start text-dark-400">
                            Problems
                        </p>
                    </div>

                    <div class="flex items-center">
                        <p class="mx-4 justify-self-start text-dark-accent">
                            {{ problems.length }}
                        </p>
                        <svg class="w-4 h-4" viewBox="0 0 9.519 14.795">
                            <g transform="translate(2.121 2.121)" opacity="0.5">
                                <line
                                    data-name="Line 3"
                                    x2="7.461"
                                    transform="translate(5.276 5.276) rotate(135)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="3"
                                />
                                <line
                                    data-name="Line 4"
                                    x2="7.461"
                                    transform="translate(5.276 5.276) rotate(-135)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="3"
                                />
                            </g>
                        </svg>
                    </div>
                </router-link>

                <router-link
                    to="/admin/empty"
                    class="flex w-full items-center justify-between py-2"
                >
                    <div class="flex items-center">
                        <svg class="w-4" viewBox="0 0 24 15.562">
                            <path
                                d="M19.08,55.279a5.081,5.081,0,0,0-1.187.129l-1.515-3.929h.494a3,3,0,0,0,2.069-.8l.523-.484a.561.561,0,0,0,.013-.815.615.615,0,0,0-.848-.011l-.523.479a1.787,1.787,0,0,1-1.234.472H15.515a.617.617,0,0,0-.492.26.573.573,0,0,0-.069.538l.577,1.494s-.007.011-.011.011,0,.011,0,.011H7.843L6.807,50.952l1.125-.377a.562.562,0,0,0,.4-.63.583.583,0,0,0-.591-.47H4.444a.812.812,0,0,0-.837.793A1.268,1.268,0,0,0,4.9,51.51a1.345,1.345,0,0,0,.422-.072l.328-.11,1.051,1.7-.807,2.335a5.073,5.073,0,0,0-.815-.093,4.971,4.971,0,0,0-3.694,1.442A4.62,4.62,0,0,0,0,60.164a4.841,4.841,0,0,0,4.757,4.588l.161,0a4.974,4.974,0,0,0,3.534-1.449A4.706,4.706,0,0,0,9.8,60.578h.963a1.316,1.316,0,0,0,.77.28,1.167,1.167,0,0,0,1.188-1.144,1.1,1.1,0,0,0-.155-.563l3.361-5.5.844,2.181a4.731,4.731,0,0,0-2.614,4.191,4.923,4.923,0,1,0,4.92-4.745Zm-4.614-1.487L11.54,58.58s0,0,0,0-.007.007-.01.007l-2.968-4.79h5.907Zm-6.953.54,2.988,4.82a1.509,1.509,0,0,0-.113.268H9.8a4.8,4.8,0,0,0-2.77-3.7ZM5.95,59.421a.706.706,0,0,0-.138-.172L6.521,57.2a3.289,3.289,0,0,1,1.665,2.225Zm1.355,2.812a3.355,3.355,0,0,1-2.5.976,3.266,3.266,0,0,1-3.21-3.1,3.118,3.118,0,0,1,.934-2.333,3.354,3.354,0,0,1,2.386-.975l.109,0a3.441,3.441,0,0,1,.355.03l-.717,2.074a1.14,1.14,0,0,0,.27,2.256,1.127,1.127,0,0,0,1.035-.59H8.186A3.156,3.156,0,0,1,7.305,62.233Zm11.775,1a3.268,3.268,0,0,1-3.321-3.2A3.182,3.182,0,0,1,17.34,57.3l1.127,2.913a.6.6,0,0,0,.562.376.615.615,0,0,0,.21-.037.572.572,0,0,0,.352-.744l-1.133-2.928a3.439,3.439,0,0,1,.623-.057,3.206,3.206,0,1,1,0,6.407Z"
                                transform="translate(0 -49.208)"
                                fill="#dedede"
                            />
                        </svg>
                        <p class="mx-4 justify-self-start text-dark-400">
                            Empty storages
                        </p>
                    </div>

                    <div class="flex items-center">
                        <p class="mx-4 justify-self-start text-dark-accent">
                            10
                        </p>
                        <svg class="w-4 h-4" viewBox="0 0 9.519 14.795">
                            <g transform="translate(2.121 2.121)" opacity="0.5">
                                <line
                                    data-name="Line 3"
                                    x2="7.461"
                                    transform="translate(5.276 5.276) rotate(135)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="3"
                                />
                                <line
                                    data-name="Line 4"
                                    x2="7.461"
                                    transform="translate(5.276 5.276) rotate(-135)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="3"
                                />
                            </g>
                        </svg>
                    </div>
                </router-link>
            </div>

            <!-- Section Account -->
            <div class="my-2">
                <h1 class="text-dark-600">Account</h1>
                <router-link
                    to="/favorites"
                    class="flex w-full items-center justify-between py-2"
                >
                    <div class="flex items-center">
                        <svg class="w-4 h-4" viewBox="0 0 24 21.207">
                            <g transform="translate(0 -27.5)">
                                <g transform="translate(0 0)" fill="none">
                                    <path
                                        d="M22.01,29.506a6.8,6.8,0,0,0-9.631.005l-.371.371-.381-.381A6.809,6.809,0,0,0,0,34.314a6.751,6.751,0,0,0,2,4.813L11.276,48.4a1.041,1.041,0,0,0,.736.3,1.059,1.059,0,0,0,.736-.3L22,39.142a6.815,6.815,0,0,0,.01-9.637Z"
                                        stroke="none"
                                    />
                                    <path
                                        d="M 6.803464889526367 29.50001907348633 C 5.520265579223633 29.50001907348633 4.315944671630859 29.99961853027344 3.409564971923828 30.90956878662109 C 2.500585556030273 31.81854629516602 1.999996185302734 33.0274658203125 1.999996185302734 34.31361770629883 C 1.999996185302734 35.59684753417969 2.501396179199219 36.8029670715332 3.41462516784668 37.71260833740234 L 12.01229858398438 46.31027984619141 L 20.58533477783203 37.72784805297852 C 21.49397468566895 36.81919860839844 21.99637603759766 35.60829925537109 21.99998474121094 34.31820678710938 C 22.0035457611084 33.03953552246094 21.50376510620117 31.83159637451172 20.59549522399902 30.91971588134766 C 19.6865348815918 30.01076889038086 18.47941589355469 29.51017761230469 17.19650650024414 29.51017761230469 C 15.91000556945801 29.51017761230469 14.70208549499512 30.01157760620117 13.79246520996094 30.92477798461914 L 12.00762557983398 32.70967864990234 L 10.21260547637939 30.91465759277344 C 9.300354957580566 30.00241851806641 8.089634895324707 29.50001907348633 6.803464889526367 29.50001907348633 M 6.803464889526367 27.50001907348633 C 8.626174926757812 27.50001907348633 10.3372049331665 28.21083831787109 11.62681579589844 29.50043869018555 L 12.00760555267334 29.8812255859375 L 12.37823486328125 29.51058578491211 C 13.66276550292969 28.22097778320312 15.37886524200439 27.51017761230469 17.19650650024414 27.51017761230469 C 19.01414489746094 27.51017761230469 20.72517585754395 28.22097778320312 22.00970458984375 29.50550842285156 C 23.29423522949219 30.79512786865234 24.00504493713379 32.50613784790039 23.99997520446777 34.32378768920898 C 23.99489593505859 36.14142608642578 23.28915596008301 37.85244750976562 21.99954605102539 39.14205551147461 L 12.74886512756348 48.40288543701172 C 12.55086517333984 48.59581756591797 12.28684520721436 48.7075080871582 12.01268577575684 48.7075080871582 C 11.73343563079834 48.7075080871582 11.46941566467285 48.59581756591797 11.27648544311523 48.40288543701172 L 2.000415802001953 39.12681579589844 C 0.7108058929443359 37.8422966003418 -3.814697265625e-06 36.13126754760742 -3.814697265625e-06 34.31361770629883 C -3.814697265625e-06 32.49598693847656 0.7057361602783203 30.78497695922852 1.995346069335938 29.49535751342773 C 3.279874801635742 28.20575714111328 4.985815048217773 27.50001907348633 6.803464889526367 27.50001907348633 Z"
                                        stroke="none"
                                        fill="#dedede"
                                    />
                                </g>
                            </g>
                        </svg>

                        <p class="mx-4 justify-self-start text-dark-400">
                            Favorites
                        </p>
                    </div>

                    <svg class="w-4 h-4" viewBox="0 0 9.519 14.795">
                        <g transform="translate(2.121 2.121)" opacity="0.5">
                            <line
                                data-name="Line 3"
                                x2="7.461"
                                transform="translate(5.276 5.276) rotate(135)"
                                fill="none"
                                stroke="#dedede"
                                stroke-linecap="round"
                                stroke-width="3"
                            />
                            <line
                                data-name="Line 4"
                                x2="7.461"
                                transform="translate(5.276 5.276) rotate(-135)"
                                fill="none"
                                stroke="#dedede"
                                stroke-linecap="round"
                                stroke-width="3"
                            />
                        </g>
                    </svg>
                </router-link>

                <router-link
                    to="/wallet"
                    class="flex w-full items-center justify-between py-2"
                >
                    <div class="flex items-center">
                        <svg class="w-4 h-4" viewBox="0 0 22 22">
                            <g
                                id="Coin_Outline"
                                data-name="Coin Outline"
                                transform="translate(-172 -446)"
                            >
                                <path
                                    id="Path_18"
                                    data-name="Path 18"
                                    d="M367.064,361.707c-.1,0-.206-.007-.313-.007-.063,0-.126,0-.186,0q-.25.005-.5.02a10.02,10.02,0,0,0-8.862,6.991c-.053.166-.1.336-.143.506s-.08.336-.113.5a10,10,0,1,0,10.117-8.016Z"
                                    transform="translate(-183.751 85.3)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-width="2"
                                />
                                <path
                                    id="Path_19"
                                    data-name="Path 19"
                                    d="M367.095,373.554a2.835,2.835,0,0,1-1.579.815v.32a.53.53,0,0,1-.53.53H364.7a.53.53,0,0,1-.53-.53v-.333a3.709,3.709,0,0,1-.977-.33,2.421,2.421,0,0,1-.913-.876,2.785,2.785,0,0,1-.368-.921.512.512,0,0,1,.056-.368.53.53,0,0,1,.37-.261l.285-.051a.458.458,0,0,1,.17,0,.527.527,0,0,1,.431.391,1.97,1.97,0,0,0,.325.735,1.7,1.7,0,0,0,1.34.621h0a1.869,1.869,0,0,0,.272-.021,1.538,1.538,0,0,0,1.345-1.587,1.34,1.34,0,0,0-.264-.868,2.417,2.417,0,0,0-1.371-.676c-.232-.053-.453-.1-.671-.165a4.905,4.905,0,0,1-1.06-.426,2.1,2.1,0,0,1-.834-.836,2.483,2.483,0,0,1-.29-1.2c0-.053,0-.1,0-.154a3.175,3.175,0,0,1,.053-.434,2.491,2.491,0,0,1,.146-.471,2.431,2.431,0,0,1,.642-.874,2.384,2.384,0,0,1,.663-.4,3.182,3.182,0,0,1,.639-.186v-.431a.523.523,0,0,1,.035-.184.53.53,0,0,1,.4-.336.58.58,0,0,1,.1-.008h.3a.529.529,0,0,1,.514.527V365a2.743,2.743,0,0,1,1.22.543,2.388,2.388,0,0,1,.735,1.06.528.528,0,0,1-.421.7l-.28.043a.528.528,0,0,1-.578-.352,1.385,1.385,0,0,0-.269-.485,1.45,1.45,0,0,0-1.089-.445,1.87,1.87,0,0,0-.389.043,1.78,1.78,0,0,0-.24.072,1.455,1.455,0,0,0-.557.373,1.344,1.344,0,0,0-.173.242,1.4,1.4,0,0,0,.12,1.489,1.6,1.6,0,0,0,.607.437,5.233,5.233,0,0,0,1.039.285,5.119,5.119,0,0,1,1.057.29,2.788,2.788,0,0,1,.85.559,2.291,2.291,0,0,1,.511.788,2.873,2.873,0,0,1-.557,2.916Z"
                                    transform="translate(-181.863 87.376)"
                                    fill="#dedede"
                                    stroke="#dedede"
                                    stroke-width="1"
                                />
                            </g>
                        </svg>
                        <p class="mx-4 justify-self-start text-dark-400">
                            Wallet
                        </p>
                    </div>

                    <div class="flex items-center">
                        <p class="mx-4 justify-self-start text-dark-600">
                            € {{ userdb.wallet }}
                        </p>
                        <svg class="w-4 h-4" viewBox="0 0 9.519 14.795">
                            <g transform="translate(2.121 2.121)" opacity="0.5">
                                <line
                                    data-name="Line 3"
                                    x2="7.461"
                                    transform="translate(5.276 5.276) rotate(135)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="3"
                                />
                                <line
                                    data-name="Line 4"
                                    x2="7.461"
                                    transform="translate(5.276 5.276) rotate(-135)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="3"
                                />
                            </g>
                        </svg>
                    </div>
                </router-link>
            </div>

            <!-- Section Preferences -->
            <div class="my-2">
                <h1 class="text-dark-600">Preferences</h1>
                <!-- Language -->
                <div
                    @click="toggleModal('language')"
                    class="flex w-full items-center justify-between py-2"
                >
                    <div class="flex items-center">
                        <svg class="w-4 h-4" viewBox="0 0 20 20">
                            <path
                                id="language-svgrepo-com"
                                d="M10,19a9,9,0,1,0-9-9A9,9,0,0,0,10,19Zm0,0c2.455,0,3.273-4.091,3.273-9S12.455,1,10,1,6.727,5.091,6.727,10,7.545,19,10,19ZM1.818,13.273H18.182M1.818,6.727H18.182"
                                fill="none"
                                stroke="#dedede"
                                stroke-width="2"
                            />
                        </svg>
                        <p class="mx-4 justify-self-start text-dark-400">
                            Language
                        </p>
                    </div>

                    <div class="flex items-center">
                        <p
                            class="
                                mx-4
                                justify-self-start
                                text-dark-600
                                capitalize
                            "
                        >
                            <!-- {{ store.state.preferences.language }} -->
                            {{ getLanguageFromLocale(CURRENT_LANGUAGE) }}
                        </p>
                        <svg class="w-4 h-4" viewBox="0 0 9.519 14.795">
                            <g transform="translate(2.121 2.121)" opacity="0.5">
                                <line
                                    data-name="Line 3"
                                    x2="7.461"
                                    transform="translate(5.276 5.276) rotate(135)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="3"
                                />
                                <line
                                    data-name="Line 4"
                                    x2="7.461"
                                    transform="translate(5.276 5.276) rotate(-135)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="3"
                                />
                            </g>
                        </svg>
                    </div>
                </div>

                <!-- Dark mode -->
                <div class="flex w-full items-center justify-between py-2">
                    <div class="flex items-center">
                        <svg class="w-4 h-4" viewBox="0 0 22.099 24">
                            <g transform="translate(-30.7 -11.3)">
                                <g
                                    data-name="Group 57"
                                    transform="translate(30.7 11.3)"
                                >
                                    <path
                                        data-name="Path 17"
                                        d="M42.7,35.3a12,12,0,1,1,0-24q.6,0,1.206.059a1,1,0,0,1,.809.574,1.021,1.021,0,0,1-.078.991,9.976,9.976,0,0,0,7.258,15.536,1.005,1.005,0,0,1,.731,1.564A12,12,0,0,1,42.7,35.3Zm-.613-21.97a9.989,9.989,0,1,0,7.861,16.835A11.99,11.99,0,0,1,42.087,13.33Z"
                                        transform="translate(-30.7 -11.3)"
                                        fill="#dedede"
                                    />
                                </g>
                            </g>
                        </svg>

                        <p class="mx-4 justify-self-start text-dark-400">
                            Dark mode
                        </p>
                    </div>

                    <ToggleSwitch
                        @onToggle="toggleDarkMode($event)"
                        :is-checked="store.state.preferences.darkMode"
                    ></ToggleSwitch>
                </div>

                <!-- Distance units -->
                <div
                    @click="toggleModal('distanceUnits')"
                    class="flex w-full items-center justify-between py-2"
                >
                    <div class="flex items-center">
                        <svg class="w-4 h-4" viewBox="0 0 25.117 25">
                            <g transform="translate(-4.44 -574.859)">
                                <g
                                    data-name="Group 64"
                                    transform="translate(1 557.359)"
                                >
                                    <g
                                        data-name="Group 63"
                                        transform="translate(4 18)"
                                    >
                                        <path
                                            data-name="Path 21"
                                            d="M23.856,545.978,18.381,540.5a.49.49,0,0,0-.693,0L.144,558.048a.49.49,0,0,0,0,.694l5.474,5.475a.487.487,0,0,0,.349.143.508.508,0,0,0,.349-.143L23.86,546.671A.494.494,0,0,0,23.856,545.978ZM21.234,547.9h0l-2.41-2.376a.49.49,0,1,0-.689.7l2.405,2.371-1.062,1.062-1.131-1.131a.49.49,0,0,0-.693.694l1.131,1.131L17.737,551.4l-2.39-2.386a.49.49,0,0,0-.693.694l2.39,2.386L16,553.139l-1.131-1.131a.49.49,0,0,0-.693.694l1.131,1.131L14.235,554.9,11.869,552.5a.49.49,0,1,0-.7.689l2.376,2.41L12.5,556.642l-1.151-1.151a.49.49,0,0,0-.693.694l1.151,1.151-1.048,1.048-2.164-2.13a.49.49,0,0,0-.689.7l2.159,2.125-4.082,4.083-4.776-4.776,16.85-16.852,4.776,4.776Z"
                                            transform="translate(0 -540.359)"
                                            fill="none"
                                            stroke="#dedede"
                                            stroke-width="1"
                                        />
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <p class="mx-4 justify-self-start text-dark-400">
                            Distance units
                        </p>
                    </div>

                    <div class="flex items-center">
                        <p
                            class="
                                mx-4
                                justify-self-start
                                text-dark-600
                                capitalize
                            "
                        >
                            {{ store.state.preferences.units }}
                        </p>
                        <svg class="w-4 h-4" viewBox="0 0 9.519 14.795">
                            <g transform="translate(2.121 2.121)" opacity="0.5">
                                <line
                                    data-name="Line 3"
                                    x2="7.461"
                                    transform="translate(5.276 5.276) rotate(135)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="3"
                                />
                                <line
                                    data-name="Line 4"
                                    x2="7.461"
                                    transform="translate(5.276 5.276) rotate(-135)"
                                    fill="none"
                                    stroke="#dedede"
                                    stroke-linecap="round"
                                    stroke-width="3"
                                />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <SelectOverlay
            v-on:toggleModal="toggleModal('distanceUnits')"
            :isActive="isDistanceUnitsModalActive"
            ref="overlayActive"
            title="Distance units"
        >
            <div class="w-full">
                <!-- <h1 class="text-dark-900 font-semibold text-lg mb-4">Measurement Unit</h1> -->
                <form class="justify-around items-center flex-col">
                    <label
                        class="w-full flex justify-between items-center py-2"
                        for="metric"
                    >
                        <p>Metric</p>
                        <input
                            class="peer group"
                            v-model="measurementUnit"
                            @input="updateUnits('metric')"
                            hidden
                            type="radio"
                            id="metric"
                            name="units"
                            value="metric"
                            :checked="
                                store.state.preferences.units === 'metric'
                            "
                        />
                        <span
                            class="
                                border-2
                                peer-checked:border-dark-accent
                                border-dark-600
                                w-4
                                h-4
                                rounded-full
                                tranistion
                                duration-300
                                flex
                                justify-center
                                items-center
                                before:tranistion
                                before:duration-300
                                before:w-2
                                before:h-2
                                before:block
                                before:rounded-full
                                peer-checked:before:bg-dark-accent
                            "
                        >
                        </span>
                    </label>

                    <label
                        class="w-full flex justify-between items-center py-2"
                        for="imperial"
                    >
                        <p>Imperial</p>
                        <input
                            class="peer group"
                            v-model="measurementUnit"
                            type="radio"
                            hidden
                            @input="updateUnits('imperial')"
                            id="imperial"
                            name="units"
                            value="imperial"
                            :checked="
                                store.state.preferences.units === 'imperial'
                            "
                        />
                        <span
                            class="
                                border-2
                                peer-checked:border-dark-accent
                                border-dark-600
                                w-4
                                h-4
                                rounded-full
                                tranistion
                                duration-300
                                flex
                                justify-center
                                items-center
                                before:tranistion
                                before:duration-300
                                before:w-2
                                before:h-2
                                before:block
                                before:rounded-full
                                peer-checked:before:bg-dark-accent
                            "
                        >
                        </span>
                    </label>
                </form>
            </div>
        </SelectOverlay>

        <SelectOverlay
            v-on:toggleModal="toggleModal('language')"
            :isActive="isLanguageModalActive"
            :title="`Language${language != null ? ' - ' + language : ''}`"
        >
            <div class="w-full">
                <form
                    class="
                        justify-around
                        items-center
                        flex-col
                        overflow-y-scroll
                        max-h-52
                    "
                >
                    <div
                        class="
                            relative
                            w-full
                            rounded-lg
                            flex
                            justify-start
                            items-center
                            pb-3
                        "
                        v-for="(locale, index) in SUPPORT_LOCALES"
                        :key="index"
                    >
                        <input
                            v-model="language"
                            :value="getLanguageFromLocale(locale)"
                            class="peer"
                            name="language"
                            @input="updateLanguage(locale)"
                            hidden
                            type="radio"
                            :id="getLanguageFromLocale(locale)"
                        />
                        <label
                            class="
                                w-full
                                h-full
                                bg-dark-600 bg-opacity-10
                                rounded-lg
                                flex
                                justify-start
                                items-center
                                p-2
                                pl-4
                                transition
                                duration-300
                                ease-in
                                peer-checked:bg-dark-accent
                                peer-checked:text-dark-400
                                peer-checked:bg-opacity-100
                                capitalize
                            "
                            :for="getLanguageFromLocale(locale)"
                        >
                            <p>{{ getLanguageFromLocale(locale) }}</p>
                        </label>
                    </div>

                </form>
            </div>
        </SelectOverlay>
    </div>
</template>
