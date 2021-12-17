// router.ts
import {
    createRouter,
    createWebHistory,
    NavigationGuardNext,
    RouteLocationNormalized,
    Router,
    RouteRecordRaw,
} from 'vue-router'

import useFirebase from '../composables/useFirebase'

const { user } = useFirebase()

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../screens/Home.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../screens/Login.vue'),
        meta: { requiresAuth: false },
    },
    {
        path: '/signup',
        component: () => import('../screens/SignUp.vue'),
        meta: { requiresAuth: false },
    },
    {
        path: '/map',
        component: () => import('../screens/Map.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/scan',
        component: () => import('../screens/Scan.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/bikedetails',
        name: 'BikeDetails',
        component: () => import('../screens/BikeDetails.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        component: () => import('../screens/Profile.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/profile/edit',
        component: () => import('../screens/EditProfile.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/profile/edit/password',
        component: () => import('../screens/EditPassword.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/report',
        component: () => import('../screens/ReportProblem.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/favorites',
        component: () => import('../screens/Favorites.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/wallet',
        component: () => import('../screens/Wallet.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/report/bike',
        component: () => import('../screens/ReportDefectBike.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/report/storage',
        component: () => import('../screens/ReportDefectBikeStorage.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/report/other',
        component: () => import('../screens/ReportOther.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/report/unrecognized',
        component: () => import('../screens/ReportUnrecognized.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/admin/problems',
        component: () => import('../screens/Problems.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/admin/problems/:id',
        name: 'ProblemDetails',
        component: () => import('../screens/ProblemDetail.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/admin/empty',
        component: () => import('../screens/Empty.vue'),
    },
    {
        path: '/activity',
        component: () => import('../screens/Activity.vue'),
        meta: { requireAuth: true },
    },
    {
        path: '/activity/finish',
        component: () => import('../screens/EndActivity.vue'),
        meta: { requireAuth: false },
    },
    {
        path: '/bike/:id',
        component: () => import('../screens/BikeDetails.vue'),
        meta: { requireAuth: false },
    },
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
})

// Route guard
router.beforeEach(
    (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext,
    ) => {
        // Check a property that you added to the route meta
        if (to.meta.requiresAuth && to.meta.requiresAuth == true) {
            // If user is allowed
            if (user.value) {
                next()
                // Else redirect to error or path, etc.
            } else {
                next('/login')
            }
        } else {
            next()
        }
    },
)

export default router
