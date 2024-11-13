import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

import { db } from "./firebaseConfig";

const auth = getAuth();

// Register a new user
const registerUser = async (email, password, userName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: userName });
    console.log("User registered: ", userCredential.user.uid);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Error registering user: ", error.message);
    return { user: null, error: error.message };
  }
};

// Login a user
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in: ", userCredential.user.uid);
    const userDocRef = doc(db, "Users", userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);
    console.log("User data: ", userDoc.data(), userCredential.user);

    return {
      user: userCredential.user,
      role: userDoc.data().role,
      error: null,
    };
  } catch (error) {
    console.error("Error logging in user: ", error.message);
    return { user: null, error: error.message };
  }
};

//log out
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("jalo");
    return { user: null, error: null };
  } catch (error) {
    console.error("No jalo", error.message);
    return { error: error.message };
  }
};

const createUser = async (user) => {
  try {
    console.log(user);
    const userData = {
      name: user.displayName,
      created: Timestamp.now(),
      role: "client",
    };

    await setDoc(doc(db, "Users", user.uid), userData);
    console.log("Usuario registrado con éxito:");
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
};



  

export { registerUser, loginUser, logoutUser, createUser, auth};
