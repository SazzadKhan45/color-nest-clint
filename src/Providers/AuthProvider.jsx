import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider, // import this
} from "firebase/auth";

// create Google provider properly
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // better start as true

  // Login with Google
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Register user (email & password)
  const registerUserEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update user profile correctly
  const userProfileUpdate = (userProfile) => {
    return updateProfile(auth.currentUser, userProfile);
  };

  // Login with email & password
  const loginUserEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Send password reset email
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Logout user
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //Observe auth state changes
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  //Context value
  const authInfo = {
    user,
    loading,
    setUser,
    setLoading,
    loginWithGoogle,
    registerUserEmailPassword,
    userProfileUpdate,
    loginUserEmailPassword,
    resetPassword,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
