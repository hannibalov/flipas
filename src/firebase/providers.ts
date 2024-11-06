import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import {firebaseAuth} from './config'

const googleProvider = new GoogleAuthProvider()

export const isLoggedIn = () => firebaseAuth.currentUser !== null

export const signInWithGoogle = async () => {
  signInWithPopup(firebaseAuth, googleProvider).catch(function (error) {
    alert(error.message)
  })
}

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  firebaseSignInWithEmailAndPassword(firebaseAuth, email, password).catch(function (error) {
    alert(error.message)
  })
}

export const signUpWithEmailAndPassword = async (email: string, password: string) => {
  createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then(function (_user) {
      signInWithEmailAndPassword(email, password)
    })
    .catch(function (error) {
      alert(error.message)
    })
}

export const onUserLoggedIn = (setIsSignedIn: (signedIn: boolean) => void) => {
  firebaseAuth.onAuthStateChanged(function (user) {
    if (user) {
      setIsSignedIn(true)
    } else {
      setIsSignedIn(false)
    }
  })
}

export const logoutFirebase = async () => await firebaseAuth.signOut()
