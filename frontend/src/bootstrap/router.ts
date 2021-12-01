// router.ts
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    component: () => import('../screens/Home.vue'),
    meta: { requiresAuth: true}
  },
  { 
    path: '/login', 
    component: () => import('../screens/Login.vue'),
    meta: { requiresAuth: false }
  },
  { 
    path: '/signup', 
    component: () => import('../screens/SignUp.vue'),
    meta: { requiresAuth: false } 
  },
  { 
    path: '/map', 
    component: () => import('../screens/Map.vue'), 
    meta: { requiresAuth: true }
  },
  { 
    path: '/scan', 
    component: () => import('../screens/Scan.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/bikedetails', 
    component: () => import('../screens/BikeDetails.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/profile', 
    component: () => import('../screens/Profile.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/profile/edit', 
    component: () => import('../screens/EditProfile.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/report', 
    component: () => import('../screens/ReportProblem.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/favorites', 
    component: () => import('../screens/Favorites.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/wallet', 
    component: () => import('../screens/Wallet.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/report/bike', 
    component: () => import('../screens/ReportDefectBike.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/report/storage', 
    component: () => import('../screens/ReportDefectBike.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/report/unknown', 
    component: () => import('../screens/ReportDefectBike.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/report/other', 
    component: () => import('../screens/ReportDefectBike.vue'),
    meta: { requiresAuth: true }
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

// Route guard
// router.beforeEach(
//   (
//     route: RouteLocationNormalized,
//     from: RouteLocationNormalized,
//     next: NavigationGuardNext,
//   ) => {
//     // Check a property that you added to the route meta
//     if (route.meta.SOMETHING) {
//       // If user is allowed
//       var userIsAllowed = true
//       if (userIsAllowed) {
//         next()
//         // Else redirect to error or path, etc.
//       } else {
//         router.push(from.path)
//       }
//     }
//   },
// )

export default router
