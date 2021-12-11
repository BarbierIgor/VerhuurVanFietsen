import { FirebaseApp, initializeApp } from 'firebase/app'
import {
    Auth,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    setPersistence,
    User,
    signOut,
} from 'firebase/auth'
import { Ref, ref, readonly } from 'vue'
import { CreateUser } from '../interfaces/User'
import { post } from './networkComposable'

const firebaseConfig = {
    apiKey: 'AIzaSyDHwfc4JAJY9LUunGaU8iM8Z5IXPi1AntI',
    authDomain: 'verhuur-fietsen-c124d.firebaseapp.com',
    projectId: 'verhuur-fietsen-c124d',
    storageBucket: 'verhuur-fietsen-c124d.appspot.com',
    messagingSenderId: '461585575411',
    appId: '1:461585575411:web:a801cb51c68b952415f686',
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)
const auth: Auth = getAuth()

// Important code
// userSelectedOptions.persistance
setPersistence(auth, browserLocalPersistence)

let user: Ref<User | null> = ref(auth.currentUser)

export default () => {
    const restoreAuth = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {
                auth.onAuthStateChanged(async state => {
                    console.log(state)
                    if (state) {
                        user.value = state
                    }
                    auth.currentUser?.getIdToken().then(function (idToken) {
                        var userStorageObject = {
                            userId: user.value?.uid,
                            bearerToken: idToken,
                        }
                        localStorage.setItem(
                            'userInfo',
                            JSON.stringify(userStorageObject),
                        )
                    })
                    resolve(true)
                })
            } catch (error) {
                console.error(error)
                reject(false)
            }
        })
    }
    const createUser = (name: string, email: string, password: string) => {
        const user: CreateUser = {
            name: name,
            email: email,
            password: password,
        }
        post('user/signup', user, '')
    }

    const login = (email: string, password: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
                .then(async userCredential => {
                    //   console.log(await userCredential.user.getIdToken());

                    user.value = userCredential.user
                    resolve(true)
                })
                .catch((error: { code: any; message: any }) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    reject(error)
                })
        })
    }

    // const getToken = () => {
    //     var token: string = ''
    //     auth.currentUser?.getIdToken().then(function (idToken) {
    //         token = idToken
    //     })
    //     return token
    // }

    const logout = () => {
        return signOut(auth)
    }

    return {
        createUser,
        login,
        logout,
        restoreAuth,
        // getToken,
        user: readonly(user),
    }
}
