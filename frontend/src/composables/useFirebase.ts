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
    updateProfile,
    updateEmail,
    updatePassword,
} from 'firebase/auth'
import {
    getStorage,
    ref as refFirebase,
    uploadBytesResumable,
    getDownloadURL,
    listAll,
    deleteObject,
} from 'firebase/storage'
import { Ref, ref, readonly } from 'vue'
import { AddImageProblem } from '../interfaces/Problem'
import { CreateUser } from '../interfaces/User'
import { post, put } from './networkComposable'

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

    const editName = (displayName: string) => {
        try {
            if (auth.currentUser) {
                updateProfile(auth.currentUser, { displayName: displayName })
            }
        } catch (error) {
            console.log('???')
            console.error(error)
        }
    }

    const editEmail = (email: string) => {
        if (auth.currentUser) {
            updateEmail(auth.currentUser, email)
        }
    }

    const editPassword = (password: string) => {
        if (auth.currentUser) {
            updatePassword(auth.currentUser, password)
        }
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

    const uploadProblemImage = (problemId: number, file: any) => {
        const storage = getStorage()
        console.log(file)
        // Create the file metadata
        // @type {any}
        const metadata = {
            contentType: 'image/jpeg',
        }

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = refFirebase(
            storage,
            `problemImages/${problemId}/${file.name}`,
        )
        const uploadTask = uploadBytesResumable(storageRef, file, metadata)

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            'state_changed',
            snapshot => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                }
            },
            error => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break
                    case 'storage/canceled':
                        // User canceled the upload
                        break

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    const userInfo = JSON.parse(
                        localStorage.getItem('userInfo') as any,
                    )
                    const imageUrl: AddImageProblem = { imageUrl: downloadURL }
                    console.log('File available at', downloadURL)
                    put(
                        `problem/addimage/${problemId}`,
                        imageUrl,
                        userInfo.bearerToken,
                    )
                })
            },
        )
    }

    const deleteProblemImage = (problemId: number) => {
        const storage = getStorage()
        // Create a reference to the file to delete
        const listRef = refFirebase(storage, `problemImages/${problemId}`)

        // Find all the prefixes and items.
        listAll(listRef)
            .then(res => {
                res.items.forEach(item => {
                    console.log(item.fullPath)
                    const imageRef = refFirebase(storage, item.fullPath)
                    deleteObject(imageRef)
                        .then(() => {
                            // File deleted successfully
                            console.log('delete succesfull')
                        })
                        .catch(error => {
                            // Uh-oh, an error occurred!
                            console.error('delete unsuccesfull')
                        })
                })
            })
            .catch(error => {
                // Uh-oh, an error occurred!
                console.error(error)
            })
    }

    const uploadProfileImage = (userId: string, file: any) => {
        const storage = getStorage()
        console.log(file)
        // Create the file metadata
        // @type {any}
        const metadata = {
            contentType: 'image/jpeg',
        }

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = refFirebase(
            storage,
            `profileImages/${userId}/${file.name}`,
        )
        const uploadTask = uploadBytesResumable(storageRef, file, metadata)

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            'state_changed',
            snapshot => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                }
            },
            error => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break
                    case 'storage/canceled':
                        // User canceled the upload
                        break

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    console.log(downloadURL)
                    if (auth.currentUser) {
                        updateProfile(auth.currentUser, {
                            photoURL: downloadURL,
                        })
                    }
                })
            },
        )
    }

    return {
        createUser,
        login,
        logout,
        restoreAuth,
        // getToken,
        editName,
        editEmail,
        editPassword,
        uploadProblemImage,
        deleteProblemImage,
        uploadProfileImage,
        user: readonly(user),
    }
}
