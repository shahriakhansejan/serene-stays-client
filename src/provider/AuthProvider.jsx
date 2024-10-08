import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true)
    // console.log(user)

    // google login
    const googleProvider = new GoogleAuthProvider()
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }


    // email-password Create Account
    const createEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInEmail = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Log Out
    const logOut = () => {
        return signOut(auth)
    }





    // Set user section
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email : userEmail };
            setUser(currentUser)
            setLoading(false)

            if(currentUser){
                axios.post('https://serene-stays-server.vercel.app/jwt',loggedUser,{withCredentials: true})
                .then(res =>{
                    // console.log('token of res', res.data)
                })
            }
            else{
                axios.post('https://serene-stays-server.vercel.app/logout', loggedUser, {withCredentials: true})
                .then(res =>{
                    // console.log(res.data)
                })
            }
            

        })
        return () => {
            unSubscribe()
        }
    }, [user])
    // manual login user section
    useEffect(() => {
        if (!user?.displayName) {
            axios.get(`https://serene-stays-server.vercel.app/users?email=${user?.email}`)
                .then(res => {
                    // console.log(res.data)
                    setUserData(res.data)
                })
        }

    }, [user?.email])

    const authValue = {
        googleLogin,
        createEmail,
        signInEmail,
        user,
        userData,
        logOut,
        loading,
    }
    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;