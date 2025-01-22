import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup,  
    signOut } from "firebase/auth"

import { useEffect, useState } from "react"
import auth from "../firebase.config";
import AuthContext from "../AuthContext/AuthContext";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";



function AuthProvider({children}) {
    const [user, setUser] = useState({});
    const [loader, setLoader] = useState(true);
    const axiosPublic = UseAxiosPublic()

    // sign-up
    const handleSignUp = (email, password)=>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign-in
    const handleSignin = (email, password)=>{
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // sign-out
    const handleSignOut = ()=>{
        setLoader(true);
        signOut(auth).then(() => {
            // console.log('user sign out successfully');
            setUser({});
            
          }).catch((error) => {
            console.log(error);
            
          });
    }

    // login with google
    const handleGoogleSignin = ()=>{
        setLoader(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
      

    }

    // observer for user
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            if(currentUser){
                setUser(currentUser);
                const userInfo = {email : currentUser.email};

                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    console.log(res.data);
                    
                    if(res.data.token){
                        localStorage.setItem('access-token' , res.data.token)
                        setLoader(false);
                    }
                })

            }else {
                localStorage.removeItem('access-token');
                setLoader(false);
            }
        })

        return ()=> unSubscribe()

    }, [axiosPublic])

    const authUser ={
        user,
        setUser,
        loader,
        handleSignUp,
        handleSignin,
        handleSignOut,
        handleGoogleSignin
    }
  return (
    <AuthContext.Provider value={authUser}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;